const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

async function postCommentsGet (req, res, next) {
    const { postId } = req.params; 
    try {
        const comments = await prisma.comment.findMany({
            where: {postId: postId},
        })
        res.json(comments);
    } catch(err) {
        next(err);
    }
}

async function postCommentPost (req, res, next) {
    const { postId } = req.params; 
    const { name, email, content } = req.body;
    try {
        const comment = await prisma.comment.create({
            data: {
                name: name,
                email: email,
                content: content,
                postId: postId,
            }
        })
        res.json(comment);
    } catch(err) {
        next(err);
    }
}

async function deleteCommentPost(req, res, next) {
    const { commentId } = req.params;
    try {
        const comment = await prisma.comment.delete({
            where: {
                id: commentId
            }
        })
        res.json(comment);
    } catch(err) {
        next(err);
    }
}

async function editCommentPost(req, res, next) {
    const { commentId } = req.params;
    const { name, email, content} = req.body;
    try {
        const comment = await prisma.comment.update({
            where: {
                id: commentId
            }, data: {
                name: name,
                email: email,
                content: content
            }
        })
        res.json(comment);
    } catch(err) {
        next(err);
    }
}

module.exports = {
    postCommentsGet,
    postCommentPost,
    deleteCommentPost,
    editCommentPost
}