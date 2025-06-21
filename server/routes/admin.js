const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();
const adminAuth = require('../middleware/adminAuth');
const { AppError } = require('../utils/errorHandler');
const { validatePagination } = require('../middleware/validate');

const prisma = new PrismaClient();

// Настройка multer для загрузки файлов в админке (если нужно)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    },
});
const upload = multer({ storage });

/* ------------------ РЕГИСТРАЦИЯ АДМИНА ------------------ */
const saltRounds = 10;

router.post('/register', async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const existing = await prisma.admin.findUnique({ where: { email } });
        if (existing) {
            throw new AppError('Такой админ уже есть', 400, 'ADMIN_EXISTS');
        }

        // Хеширование пароля
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const admin = await prisma.admin.create({
            data: {
                email,
                password: hashedPassword  // Сохраняем хеш, а не открытый пароль
            },
        });

        res.status(201).json({
            success: true,
            message: 'Админ создан',
            adminId: admin.id
        });
    } catch (error) {
        next(error);
    }
});

/* ------------------ ВХОД АДМИНА ------------------ */
router.post('/login', async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const admin = await prisma.admin.findUnique({ where: { email } });
        if (!admin) {
            throw new AppError('Админ не найден', 404, 'ADMIN_NOT_FOUND');
        }

        const valid = await bcrypt.compare(password, admin.password);
        if (!valid) {
            throw new AppError('Неверный пароль', 401, 'INVALID_PASSWORD');
        }

        const token = jwt.sign(
            {
                adminId: admin.id,
                email: admin.email,
                role: 'admin'
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
        );

        res.json({
            success: true,
            token,
            admin: {
                id: admin.id,
                email: admin.email
            }
        });
    } catch (error) {
        next(error);
    }
});

/* ------------------ ДОБАВЛЕНИЕ СТАТЬИ АДМИНОМ ------------------ */
router.post('/articles', adminAuth, upload.single('file'), async (req, res, next) => {
    const { title, author, pages, journalId } = req.body;
    const fileUrl = req.file ? `/uploads/${req.file.filename}` : null;

    try {
        if (!title || !author || !journalId) {
            throw new AppError('Необходимо указать название, автора и журнал', 400, 'MISSING_FIELDS');
        }

        const article = await prisma.article.create({
            data: {
                title,
                author,
                pages,
                fileUrl,
                status: 'approved',
                journal: { connect: { id: Number(journalId) } },
            },
        });

        res.status(201).json({
            success: true,
            data: article
        });
    } catch (error) {
        next(error);
    }
});

/* ------------------ ПОЛУЧИТЬ ВСЕ ОЖИДАЮЩИЕ СТАТЬИ (с пагинацией) ------------------ */
router.get('/articles/pending', adminAuth, validatePagination, async (req, res, next) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const pageInt = parseInt(page);
        const limitInt = parseInt(limit);
        const skip = (pageInt - 1) * limitInt;

        const [articles, total] = await Promise.all([
            prisma.article.findMany({
                where: { status: 'pending' },
                skip,
                take: limitInt,
                include: {
                    user: true,
                    journal: true,
                },
                orderBy: { createdAt: 'desc' }
            }),
            prisma.article.count({ where: { status: 'pending' } })
        ]);

        const totalPages = Math.ceil(total / limitInt);

        res.json({
            success: true,
            data: articles,
            pagination: {
                totalItems: total,
                currentPage: pageInt,
                itemsPerPage: limitInt,
                totalPages,
                nextPage: pageInt < totalPages ? pageInt + 1 : null,
                prevPage: pageInt > 1 ? pageInt - 1 : null
            }
        });
    } catch (error) {
        next(new AppError('Ошибка при получении статей на модерации', 500, 'PENDING_ARTICLES_ERROR'));
    }
});

/* ------------------ ПОДТВЕРДИТЬ СТАТЬЮ ------------------ */
router.post('/articles/:id/approve', adminAuth, async (req, res, next) => {
    try {
        const articleId = parseInt(req.params.id);

        const updated = await prisma.article.update({
            where: { id: articleId },
            data: { status: 'approved' },
        });

        res.json({
            success: true,
            data: updated
        });
    } catch (error) {
        next(new AppError('Ошибка при подтверждении статьи', 500, 'APPROVE_ARTICLE_ERROR'));
    }
});

module.exports = router;