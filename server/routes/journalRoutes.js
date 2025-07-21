const express = require('express');
const router = express.Router();
const prisma = require('../prisma/client'); // Обнови путь при необходимости

// GET /journals — получить список всех журналов
router.get('/', async (req, res) => {
    try {
        const journals = await prisma.journal.findMany({
            orderBy: [
                { year: 'desc' },
                { month: 'desc' },
            ],
        });
        res.json(journals);
    } catch (error) {
        console.error('Ошибка при получении журналов:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

// GET /journals/:id — получить один журнал и его опубликованные статьи
router.get('/:id', async (req, res) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ error: 'Неверный ID журнала' });
    }

    try {
        const journal = await prisma.journal.findUnique({
            where: { id },
            include: {
                articles: {
                    where: { status: 'published' },
                    orderBy: { pages: 'asc' }, // предполагается, что pages — строка
                },
            },
        });

        if (!journal) {
            return res.status(404).json({ error: 'Журнал не найден' });
        }

        res.json(journal);
    } catch (error) {
        console.error('Ошибка при получении журнала:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

module.exports = router;
