const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const { AppError } = require('../utils/errorHandler');
const logger = require('../utils/logger');

const prisma = new PrismaClient();

const adminAuth = async (req, res, next) => {
    try {
        // Получение токена из заголовка
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            throw new AppError('Требуется авторизация', 401, 'AUTH_HEADER_MISSING');
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            throw new AppError('Нет токена', 401, 'TOKEN_MISSING');
        }

        // Верификация токена
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Проверка роли
        if (decoded.role !== 'admin') {
            throw new AppError('Доступ запрещён', 403, 'ACCESS_DENIED');
        }

        // Проверка существования администратора в базе
        const admin = await prisma.admin.findUnique({
            where: { id: decoded.adminId },
            select: { id: true, email: true }
        });

        if (!admin) {
            throw new AppError('Администратор не найден', 404, 'ADMIN_NOT_FOUND');
        }

        // Добавление информации об администраторе в запрос
        req.admin = admin;

        // Логирование успешной аутентификации
        logger.info(`Admin authenticated: ${admin.email} (ID: ${admin.id})`);

        next();
    } catch (error) {
        // Специфичная обработка ошибок JWT
        if (error.name === 'TokenExpiredError') {
            return next(new AppError('Токен истёк', 401, 'TOKEN_EXPIRED'));
        }
        if (error.name === 'JsonWebTokenError') {
            return next(new AppError('Неверный токен', 401, 'INVALID_TOKEN'));
        }

        // Передача других ошибок в центральный обработчик
        next(error);
    }
};

module.exports = adminAuth;