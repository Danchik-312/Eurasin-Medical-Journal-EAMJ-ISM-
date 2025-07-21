const express = require('express');
const router = express.Router();
const prisma = require('../prisma/client'); // путь к твоему клиенту Prisma

// GET /journals — получить список журналов
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

module.exports = router;
