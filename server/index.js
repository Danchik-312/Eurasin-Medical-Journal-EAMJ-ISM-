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

// Настройка multer
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

const upload = multer({ storage });

// Статика для загрузок
app.use('/uploads', express.static(uploadDir));

// Подключение роутов для админки
const adminRoutes = require('./routes/admin');
app.use('/admin', adminRoutes);

// Публичный маршрут для получения всех одобренных статей
app.get('/articles', async (req, res) => {
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

// Пример корневого роута
app.get('/', (req, res) => {
    res.json({
        status: "success",
        message: "Backend server is running",
        apiEndpoints: {
            submitArticle: "POST /submit-article",
            getArticles: "GET /articles",
            adminPanel: "/admin",
            uploads: "/uploads/:filename"
        }
    });
});

// Обработка 404
app.use((req, res) => {
    res.status(404).json({
        error: "Not found",
        message: `Route ${req.method} ${req.path} does not exist`
    });
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
