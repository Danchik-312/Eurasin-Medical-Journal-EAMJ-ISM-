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
