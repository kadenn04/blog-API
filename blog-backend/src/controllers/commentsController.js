const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

async function commentsGet (req, res, next) {
    const { postId, noteId } = req.params; 
    try {
        if (postId) {
            const comments = await prisma.comment.findMany({
                where: {postId: postId},
            })
        } else {
            const comments = await prisma.comment.findMany({
            where: {noteId: noteId},
        })
        }
        res.json(comments);
    } catch(err) {
        next(err);
    }
}

async function commentPost (req, res, next) {
    const { postId, noteId } = req.params; 
    const { name, email, content } = req.body;
    try {
        let comment;
        if (postId) {
            comment = await prisma.comment.create({
                data: {
                    name: name,
                    email: email,
                    content: content,
                    postId: postId,
                }
            })
        } else {
            comment = await prisma.comment.create({
            data: {
                name: name,
                email: email,
                content: content,
                noteId: noteId,
            }
            })
        }
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
    commentsGet,
    commentPost,
    deleteCommentPost,
    editCommentPost
}