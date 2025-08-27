const { Router } = require("express");
const notesController = require("../controllers/notesController.js");
const commentsController = require("../controllers/commentsController.js");

const notesRouter = Router();

notesRouter.get("/", notesController.allNotesGet);
notesRouter.post("/new", notesController.newNotePost);

notesRouter.param("noteId", notesController.parseIds);

notesRouter.post("/:noteId/edit", notesController.editNotePost);
notesRouter.post("/:noteId/delete", notesController.deleteNotePost);
notesRouter.get("/:noteId", notesController.noteGet);

notesRouter.post("/:noteId/comments/:commentId/delete", commentsController.deleteCommentPost)
notesRouter.post("/:noteId/comments/:commentId/edit", commentsController.editCommentPost)
notesRouter.post("/:noteId/comments/new", commentsController.commentPost);
notesRouter.get("/:noteId/comments", commentsController.commentsGet);


module.exports = notesRouter;