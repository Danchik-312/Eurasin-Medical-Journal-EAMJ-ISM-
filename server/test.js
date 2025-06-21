console.log("Тест: Начало выполнения");

require('dotenv').config();
console.log("Переменные окружения загружены");

const { PrismaClient } = require('@prisma/client');
console.log("Prisma импортирован");

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error']
});
console.log("Prisma клиент создан");

async function main() {
    console.log("Попытка подключения к базе данных...");
    await prisma.$connect();
    console.log("Подключение к базе данных успешно!");

    const users = await prisma.user.findMany();
    console.log("Пользователи:", users);
}

main()
    .catch(e => {
        console.error("Ошибка в основном скрипте:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
        console.log("Prisma отключен");
    });