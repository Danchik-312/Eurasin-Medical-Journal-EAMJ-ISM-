require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { PrismaClient } = require('@prisma/client');
const logger = require('./utils/logger');
const { errorHandler, notFoundHandler, AppError } = require('./utils/errorHandler');
const { validatePagination } = require('./middleware/validate');

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
    origin: 'http://localhost:3000', // Укажите явно
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Логирование входящих запросов
app.use((req, res, next) => {
    logger.info(`${req.method} ${req.originalUrl}`);
    next();
});

// Настройка multer для загрузки файлов
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Разрешенные типы файлов
const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
];

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const sanitized = file.originalname.replace(/[^a-zA-Z0-9.]/g, '-');
        const unique = `${Date.now()}-${sanitized}`;
        cb(null, unique);
    }
});

const fileFilter = (req, file, cb) => {
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new AppError(
            'Недопустимый тип файла. Разрешены только PDF и Word документы',
            400,
            'INVALID_FILE_TYPE'
        ), false);
    }
};

const limits = {
    fileSize: 50 * 1024 * 1024, // 50MB
    files: 1
};

const upload = multer({ storage, fileFilter, limits });

// Обработчик ошибок Multer
app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return next(new AppError('Размер файла превышает 50MB', 413, 'FILE_TOO_LARGE'));
        }
        return next(new AppError('Ошибка загрузки файла', 400, 'FILE_UPLOAD_ERROR'));
    }
    next(err);
});

// Статика для загрузок
app.use('/uploads', express.static(uploadDir));

// Подключение роутов
// const adminRoutes = require('./routes/admin');
// app.use('/admin', adminRoutes);

// =============== Основные роуты ===============

// Подача статьи (пользователь)
app.post('/submit-article', upload.single('file'), async (req, res, next) => {
    try {
        const { title, authors, description, pages, journalId, userId } = req.body;
        const file = req.file;

        // Валидация обязательных полей
        if (!title || !authors || !description || !file) {
            throw new AppError('Все обязательные поля должны быть заполнены', 400, 'MISSING_FIELDS');
        }

        const article = await prisma.article.create({
            data: {
                title,
                authors,
                description,
                pages,
                fileUrl: `/uploads/${file.filename}`,
                status: 'pending',
                journalId: journalId ? parseInt(journalId) : null,
                userId: userId ? parseInt(userId) : null
            }
        });

        res.status(201).json({
            success: true,
            data: article
        });
    } catch (error) {
        next(error);
    }
});

// Получение статей (публичный) с пагинацией
app.get('/articles', validatePagination, async (req, res, next) => {
    try {
        const { status, page = 1, limit = 10 } = req.query;
        const pageInt = parseInt(page);
        const limitInt = parseInt(limit);
        const skip = (pageInt - 1) * limitInt;

        const where = status ? { status } : {};

        const [articles, total] = await Promise.all([
            prisma.article.findMany({
                where,
                skip,
                take: limitInt,
                include: { journal: true, user: true },
                orderBy: { createdAt: 'desc' }
            }),
            prisma.article.count({ where })
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
        next(new AppError('Ошибка при получении статей', 500, 'ARTICLES_FETCH_ERROR'));
    }
});

// Корневой роут
app.get('/', (req, res) => {
    res.json({
        status: "success",
        message: "Backend server is running",
        apiEndpoints: {
            submitArticle: "POST /submit-article",
            getArticles: "GET /articles",
            admin: "/admin"
        }
    });
});

// Обработка 404
app.use(notFoundHandler);

// Обработка ошибок
app.use(errorHandler);

// Запуск сервера
const server = app.listen(PORT, () => {
    logger.info(`Server started on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
    await prisma.$disconnect();
    server.close(() => {
        logger.info('Server gracefully shutdown');
        process.exit(0);
    });
});

process.on('SIGTERM', async () => {
    await prisma.$disconnect();
    server.close(() => {
        logger.info('Server gracefully shutdown');
        process.exit(0);
    });
});