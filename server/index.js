require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Настройка загрузок
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename:    (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

// Подключение маршрутов
const adminRoutes = require('./routes/admin');

// ==== API ROUTES ==== //

// Файлы
app.use('/api/uploads', express.static(uploadDir));

// Админка
app.use('/api/admin', adminRoutes);

// Получить все журналы
app.get('/api/journals', async (req, res) => {
    try {
        const journals = await prisma.journal.findMany({
            orderBy: [{ year: 'desc' }, { month: 'desc' }],
        });
        res.json(journals);
    } catch (error) {
        console.error('Ошибка при получении журналов:', error);
        res.status(500).json({ error: 'Ошибка при получении журналов' });
    }
});

// Получить один журнал и его статьи
app.get('/api/journals/:id', async (req, res) => {
    const journalId = parseInt(req.params.id, 10);
    if (isNaN(journalId)) {
        return res.status(400).json({ error: "Некорректный ID" });
    }

    try {
        const journal = await prisma.journal.findUnique({
            where: { id: journalId },
            include: {
                articles: {
                    where: { status: 'approved' },
                    orderBy: { createdAt: 'asc' }
                }
            }
        });

        if (!journal) {
            return res.status(404).json({ error: "Журнал не найден" });
        }

        res.json(journal);
    } catch (err) {
        console.error('Ошибка при получении журнала:', err);
        res.status(500).json({ error: "Ошибка сервера" });
    }
});

// Получить все одобренные статьи
app.get('/api/articles', async (req, res) => {
    try {
        const articles = await prisma.article.findMany({
            where: { status: 'approved' },
            include: { journal: true },
            orderBy: { createdAt: 'desc' },
        });
        res.json(articles);
    } catch (err) {
        console.error('Ошибка при получении статей:', err);
        res.status(500).json({ error: 'Ошибка при получении статей' });
    }
});

// Корневой API-маршрут
app.get('/api', (req, res) => {
    res.json({
        status: "success",
        message: "API работает",
        endpoints: {
            getArticles: "GET /api/articles",
            getJournals: "GET /api/journals",
            getJournalById: "GET /api/journals/:id",
            uploads: "/api/uploads/:file",
            admin: "/api/admin"
        }
    });
});

// ==== CLIENT SPA FALLBACK (если нужен) ==== //
// Если ты запускаешь фронт отдельно через NGINX, можно отключить это
const frontendPath = path.join(__dirname, '..', 'client', 'build');
if (fs.existsSync(frontendPath)) {
    app.use(express.static(frontendPath));
    app.get('*', (req, res) => {
        res.sendFile(path.join(frontendPath, 'index.html'));
    });
}

// 404 обработчик
app.use((req, res) => {
    res.status(404).json({
        error: "Not Found",
        message: `Route ${req.method} ${req.originalUrl} not found`
    });
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});
