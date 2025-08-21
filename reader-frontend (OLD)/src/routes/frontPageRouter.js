const Router = require("express");
const frontPageController = require("../controllers/frontPageController.js");

const frontPageRouter = Router();

frontPageRouter.get("/", frontPageController.getFrontPageGet)

module.exports = frontPageRouter;