const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

async function allPostsGet(req, res, next) {
    try {
        const allPosts = await prisma.post.findMany();
        res.status(200).json(allPosts);
    } catch(err) {
        next(err)
    }
}



async function newPostPost(req, res, next) {
    try {
        const newPost = await prisma.post.create({
            data: {
                title: 'This is the title',
                content: 'This is the content',
                authorId: 1
            }
        });
        res.json(newPost);
    } catch(err) {
        next(err)
    }
}

module.exports = {
    allPostsGet,
    newPostPost
}