const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
    const email = 'eamjism@gmail.com';      // сюда поставь нужный email
    const plainPassword = 'oleg2110';    // сюда поставь нужный пароль

    // Хешируем пароль
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    // Создаем админа в базе
    const admin = await prisma.admin.create({
        data: {
            email,
            password: hashedPassword,
        },
    });

    console.log('Admin created:', admin);
}

main()
    .catch(e => {
        console.error('Error creating admin:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
