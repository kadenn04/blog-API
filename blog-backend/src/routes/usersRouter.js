const { Router } = require("express");
const usersController = require("../controllers/usersController.js");

const usersRouter = Router();

usersRouter.get("/", usersController.allUsersGet)
usersRouter.post("/new", usersController.newUserPost);
usersRouter.post("/delete/:userid", usersController.deleteUserPost);

module.exports = usersRouter;