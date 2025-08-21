const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

function parseIds(req, res, next) {
    if (req.params) {
        const { postId, commentId } = req.params;

        if (postId) {
            req.params.postId = parseInt(postId);
        }
        if (commentId) {
            req.params.commentId = parseInt(commentId);
        }
    }
    next()
}

async function allPostsGet(req, res, next) {
    try {
        const allPosts = await prisma.post.findMany();
        res.status(200).json(allPosts);
    } catch(err) {
        next(err)
    }
}

async function newPostPost(req, res, next) {
    const { title, content } = req.body;
    try {
        const newPost = await prisma.post.create({
            data: {
                title: title,
                content: content,
                authorId: 1
            }
        });
        res.json(newPost);
    } catch(err) {
        next(err)
    }
}

async function postGet(req, res, next) {
    const { postId } = req.params;
    try {
        const post = await prisma.post.findUnique({
            where: {
                id: postId,
            }, 
            include: {
                comments: true,
            }
        })
        res.json(post);
    } catch (err) {
        next(err);
    }
}

async function editPostPost(req, res, next) {
    const { postId } = req.params;
    const { title, content, published } = req.body;
    try {
        const updatedPost = await prisma.post.update({
            where: {
                id: postId,
            },
            data: {
                title: title,
                content: content,
                published: published
            }
        })
        res.json(updatedPost);
    } catch (err) {
        next(err);
    }
}

async function deletePostPost(req, res, next) {
    const { postId } = req.params;
    try {
        const deletedPost = await prisma.post.delete({
            where: {
                id: postId,
            }
        })
        res.json(deletedPost);
    } catch(err) {
        next(err);
    }
}

module.exports = {
    parseIds,
    allPostsGet,
    newPostPost,
    postGet,
    editPostPost,
    deletePostPost
}