const { PrismaClient } = require('./generated/prisma');
const prisma = new PrismaClient();

async function main() {
    const users = await prisma.user.deleteMany();
    console.log(users);
}

main()