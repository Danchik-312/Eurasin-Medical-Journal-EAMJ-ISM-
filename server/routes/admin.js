const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
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
    const { email, password, name, position } = req.body;

    try {
        const existing = await prisma.admin.findUnique({ where: { email } });
        if (existing) return res.status(400).json({ error: 'Такой админ уже есть' });

        const hashed = await bcrypt.hash(password, 10);
        const admin = await prisma.admin.create({
            data: { email, password: hashed, name, position },
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
            {
                adminId: admin.id,
                email: admin.email,
                role: 'admin',
                name: admin.name,
                position: admin.position,
            },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.json({
            token,
            name: admin.name,
            position: admin.position,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Ошибка входа' });
    }
});

/* ------------------ ПРОФИЛЬ АДМИНА ------------------ */
router.get('/adminProfile', adminAuth, async (req, res) => {
    try {
        const admin = await prisma.admin.findUnique({
            where: { id: req.admin.adminId },
            select: {
                id: true,
                email: true,
                name: true,
                position: true,
                createdAt: true,
            },
        });
        if (!admin) return res.status(404).json({ error: 'Админ не найден' });
        res.json(admin);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Ошибка при получении профиля' });
    }
});

/* ------------------ ДОБАВЛЕНИЕ СТАТЬИ АДМИНОМ ------------------ */
router.post('/articles', adminAuth, upload.single('file'), async (req, res) => {
    const { title, authors, pages, journalId, description } = req.body;
    const fileUrl = req.file ? `/uploads/${req.file.filename}` : null;

    if (!title || !authors || !pages || !journalId) {
        return res.status(400).json({ error: 'Укажите title, authors, pages и journalId' });
    }

    try {
        const article = await prisma.article.create({
            data: {
                title,
                authors,
                pages,
                fileUrl,
                status: 'approved',
                description: description || '',
                journal: {
                    connect: {
                        id: Number(journalId),
                    },
                },
            },
        });
        res.status(201).json(article);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Ошибка при добавлении статьи' });
    }
});

/* ------------------ РЕДАКТИРОВАНИЕ СТАТЬИ ------------------ */
router.put('/articles/:id', adminAuth, async (req, res) => {
    const { title, authors, pages } = req.body;

    try {
        const updated = await prisma.article.update({
            where: { id: Number(req.params.id) },
            data: {
                title,
                authors,
                pages,
            },
        });

        res.json(updated);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Ошибка при обновлении статьи' });
    }
});

/* ------------------ УДАЛЕНИЕ СТАТЬИ ------------------ */
router.delete('/articles/:id', adminAuth, async (req, res) => {
    const articleId = parseInt(req.params.id, 10);

    try {
        await prisma.article.delete({
            where: { id: articleId },
        });
        res.status(200).json({ message: 'Статья удалена' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Не удалось удалить статью' });
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

/* ------------------ ПОЛУЧИТЬ ВСЕ УТВЕРЖДЁННЫЕ СТАТЬИ ------------------ */
router.get('/articles', adminAuth, async (req, res) => {
    try {
        const articles = await prisma.article.findMany({
            where: { status: 'approved' },
            include: { journal: true },
            orderBy: { createdAt: 'desc' },
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

/* ------------------ ПОЛУЧИТЬ ВСЕ ЖУРНАЛЫ ------------------ */
router.get('/journals', adminAuth, async (req, res) => {
    try {
        const journals = await prisma.journal.findMany({
            include: {
                articles: true,
            },
            orderBy: {
                year: 'desc',
            },
        });

        res.json(journals);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Ошибка при получении журналов' });
    }
});

/* ------------------ ДОБАВЛЕНИЕ ЖУРНАЛА ------------------ */
router.post('/journals', adminAuth, async (req, res) => {
    const { issue, year, month, description, publicationDate } = req.body;

    if (!issue || !year || !month || month < 1 || month > 12) {
        return res.status(400).json({ error: 'Укажите issue, year и корректный month (1-12)' });
    }

    try {
        const newJournal = await prisma.journal.create({
            data: {
                issue: Number(issue),
                year: Number(year),
                month: Number(month),
                description: description ? description.trim() : null,
                publicationDate: publicationDate ? new Date(publicationDate) : null,
            },
        });

        res.status(201).json(newJournal);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Ошибка при добавлении журнала' });
    }
});

/* ------------------ РЕДАКТИРОВАНИЕ ЖУРНАЛА ------------------ */
router.put('/journals/:id', adminAuth, async (req, res) => {
    const journalId = Number(req.params.id);
    const { issue, year, month, description, publicationDate } = req.body;

    if (!issue || !year || !month || month < 1 || month > 12) {
        return res.status(400).json({ error: 'Укажите issue, year и корректный month (1-12)' });
    }

    try {
        const updatedJournal = await prisma.journal.update({
            where: { id: journalId },
            data: {
                issue: Number(issue),
                year: Number(year),
                month: Number(month),
                description: description ? description.trim() : null,
                publicationDate: publicationDate ? new Date(publicationDate) : null,
            },
        });
        res.json(updatedJournal);
    } catch (err) {
        console.error(err);
        if (err.code === 'P2025') {
            res.status(404).json({ error: 'Журнал не найден' });
        } else {
            res.status(500).json({ error: 'Ошибка при обновлении журнала' });
        }
    }
});

/* ------------------ УДАЛЕНИЕ ЖУРНАЛА ------------------ */
router.delete('/journals/:id', adminAuth, async (req, res) => {
    const journalId = parseInt(req.params.id, 10);

    try {
        await prisma.journal.delete({
            where: { id: journalId },
        });

        res.status(200).json({ message: 'Журнал удалён' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Не удалось удалить журнал' });
    }
});

module.exports = router;
