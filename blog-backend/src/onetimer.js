const { PrismaClient } = require('./generated/prisma');
const prisma = new PrismaClient();

async function main() {
    try{
        const users = await prisma.user.findUnique({
            where: {
                username: 'kdn135'
            }
        });
        if (!users) {
            console.log("here!");
        }
        console.log(users);
    } catch(err) {
        console.log("ERR found")
        console.log(err)
    }
}

main()