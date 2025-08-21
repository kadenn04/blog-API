const { PrismaClient } = require('./generated/prisma');
const prisma = new PrismaClient();

async function main() {
    try{
        const users = await prisma.post.create({
            data: {
                title: "My second post.",
                content: "Learning react is hard.",
                authorId: 1
            }
        });
        console.log(users);
    } catch(err) {
        console.log("ERR found")
        console.log(err)
    }
}

main()