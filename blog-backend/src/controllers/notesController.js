const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

function parseIds(req, res, next) {
    if (req.params) {
        const { noteId, commentId } = req.params;

        if (noteId) {
            req.params.noteId = parseInt(noteId);
        }
        if (commentId) {
            req.params.commentId = parseInt(commentId);
        }
    }
    next()
}

async function allNotesGet(req, res, next) {
    try {
        const allNotes = await prisma.note.findMany(
            {include: {
                comments: true,
                tags: true,
            }}
        );
        res.status(200).json(allNotes);
    } catch(err) {
        next(err)
    }
}

async function newNotePost(req, res, next) {
    const { content } = req.body;
    try {
        const newNote = await prisma.note.create({
            data: {
                content: content,
                authorId: 1
            }
        });
        res.json(newNote);
    } catch(err) {
        next(err)
    }
}

async function noteGet(req, res, next) {
    const { noteId } = req.params;
    try {
        const note = await prisma.note.findUnique({
            where: {
                id: noteId,
            }, 
            include: {
                comments: true,
                tags: true
            }
        })
        res.json(note);
    } catch (err) {
        next(err);
    }
}

async function editNotePost(req, res, next) {
    const { noteId } = req.params;
    const { content } = req.body;
    try {
        const updatedNote = await prisma.note.update({
            where: {
                id: noteId,
            },
            data: {
                content: content,
            }
        })
        res.json(updatedNote);
    } catch (err) {
        next(err);
    }
}

async function deleteNotePost(req, res, next) {
    const { noteId } = req.params;
    try {
        const deletedNote = await prisma.note.delete({
            where: {
                id: noteId,
            }
        })
        res.json(deletedNote);
    } catch(err) {
        next(err);
    }
}

module.exports = {
    parseIds,
    allNotesGet,
    newNotePost,
    noteGet,
    editNotePost,
    deleteNotePost
}