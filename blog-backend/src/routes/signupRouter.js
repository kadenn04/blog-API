const signupController = require("../controllers/signupController");
const { Router } = require("express");
const signupRouter = Router();

signupRouter.get("/", signupController.signupPost);

module.exports = signupRouter;