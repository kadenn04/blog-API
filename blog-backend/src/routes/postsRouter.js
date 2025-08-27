const { Router } = require("express");
const postsController = require("../controllers/postsController.js");
const commentsController = require("../controllers/commentsController.js");

const postsRouter = Router();

postsRouter.get("/", postsController.allPostsGet);
postsRouter.post("/new", postsController.newPostPost);

postsRouter.param("postId", postsController.parseIds);

postsRouter.post("/:postId/edit", postsController.editPostPost);
postsRouter.post("/:postId/delete", postsController.deletePostPost);
postsRouter.get("/:postId", postsController.postGet);

postsRouter.post("/:postId/comments/:commentId/delete", commentsController.deleteCommentPost)
postsRouter.post("/:postId/comments/:commentId/edit", commentsController.editCommentPost)
postsRouter.post("/:postId/comments/new", commentsController.commentPost);
postsRouter.get("/:postId/comments", commentsController.commentsGet);


module.exports = postsRouter;