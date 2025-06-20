const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();

const prisma = new PrismaClient();

// Middleware авторизации администратора
function adminAuth(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Нет токена' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role !== 'admin') {
            return res.status(403).json({ error: 'Доступ запрещён' });
        }
        req.admin = decoded;
        next();
    } catch (err) {
        res.status(403).json({ error: 'Неверный токен' });
    }
}

// Настройка multer для загрузки файлов
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Папка должна существовать
    },
    filename: (req, file, cb) => {
        const unique = Date.now() + '-' + file.originalname;
        cb(null, unique);
    },
});
const upload = multer({ storage });

/* ------------------ РЕГИСТРАЦИЯ АДМИНА ------------------ */
router.post('/register', async (req, res) => {
    const { email, password } = req.body;

    try {
        const existing = await prisma.admin.findUnique({ where: { email } });
        if (existing) return res.status(400).json({ error: 'Такой админ уже есть' });

        const hashed = await bcrypt.hash(password, 10);
        const admin = await prisma.admin.create({
            data: { email, password: hashed },
        });

        res.status(201).json({ message: 'Админ создан', id: admin.id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Ошибка регистрации' });
    }
});

/* ------------------ ВХОД АДМИНА ------------------ */
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const admin = await prisma.admin.findUnique({ where: { email } });
        if (!admin) return res.status(401).json({ error: 'Админ не найден' });

        const valid = await bcrypt.compare(password, admin.password);
        if (!valid) return res.status(401).json({ error: 'Неверный пароль' });

        const token = jwt.sign(
            { adminId: admin.id, email: admin.email, role: 'admin' },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Ошибка входа' });
    }
});

/* ------------------ ДОБАВЛЕНИЕ СТАТЬИ АДМИНОМ ------------------ */
router.post('/articles', adminAuth, upload.single('file'), async (req, res) => {
    const { title, author, pages, journalId } = req.body;
    const fileUrl = req.file ? `/uploads/${req.file.filename}` : null;

    try {
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
        res.status(201).json(article);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Ошибка при добавлении статьи' });
    }
});

/* ------------------ ПОЛУЧИТЬ ВСЕ ОЖИДАЮЩИЕ СТАТЬИ ------------------ */
router.get('/articles/pending', adminAuth, async (req, res) => {
    try {
        const articles = await prisma.article.findMany({
            where: { status: 'pending' },
            include: {
                user: true,
                journal: true,
            },
        });
        res.json(articles);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Ошибка при получении статей' });
    }
});

/* ------------------ ПОДТВЕРДИТЬ СТАТЬЮ ------------------ */
router.post('/articles/:id/approve', adminAuth, async (req, res) => {
    try {
        const updated = await prisma.article.update({
            where: { id: Number(req.params.id) },
            data: { status: 'approved' },
        });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: 'Ошибка при обновлении статьи' });
    }
});

module.exports = router;
