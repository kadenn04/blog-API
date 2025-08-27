const tagsController = require("../controllers/tagsController.js");
const { Router } = require("express");
const tagsRouter = Router();

tagsRouter.post("/new", tagsController.newTagPost)
tagsRouter.post("/:tagId/addPost", tagsController.addPostToTag)
tagsRouter.get("/", tagsController.allTagsGet)


module.exports = tagsRouter;