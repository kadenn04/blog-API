const { Router } = require("express");
const postsController = require("../controllers/postsController.js");

const postsRouter = Router();

postsRouter.get("/", postsController.allPostsGet);
postsRouter.post("/new", postsController.newPostPost);

module.exports = postsRouter;