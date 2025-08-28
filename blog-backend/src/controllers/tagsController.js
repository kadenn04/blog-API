const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();


async function allTagsGet(req, res, next) {
    try {
        const allTags = await prisma.tag.findMany({
            include: {
                posts: true,
                notes: true,
            }
        })
        res.json(allTags)
    } catch(err) {
        next(err);
    }
}
async function newTagPost(req, res, next) {
    const { name } = req.body;
    try {
        const newTag = await prisma.tag.create({
            data: {
                name: name
            }
        })
        res.json(newTag)
    } catch(err) {
        next(err);
    }
}

async function addPostToTag(req, res ,next) {
    const { postId } = req.body;
    const { tagId } = req.params;
    try {
        const updatedTag = await prisma.tag.update({
            where: {
                id: parseInt(tagId),
            },
            data: {
                posts: {
                connect: {
                    id: parseInt(postId),
                },
                },
            },
            })
        res.json(updatedTag)
    } catch(err) {
        next(err);
    }
}

async function addNoteToTag(req, res ,next) {
    const { noteId } = req.body;
    const { tagId } = req.params;
    try {
        const updatedTag = await prisma.tag.update({
            where: {
                id: parseInt(tagId),
            },
            data: {
                notes: {
                connect: {
                    id: parseInt(noteId),
                },
                },
            },
            })
        res.json(updatedTag)
    } catch(err) {
        next(err);
    }
}

module.exports = {
    allTagsGet,
    newTagPost,
    addPostToTag,
    addNoteToTag
}