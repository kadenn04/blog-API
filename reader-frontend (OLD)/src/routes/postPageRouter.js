const Router = require("express");
const postPageController = require("../controllers/postPageController")

const postPageRouter = Router();

postPageRouter.get("/:postId", postPageController.postPageGet);

module.exports = postPageRouter;