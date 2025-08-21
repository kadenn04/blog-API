const Router = require("express");
const loginController = require("../controllers/loginController.js");

const loginRouter = Router();

loginRouter.get("/", loginController.loginGet);
loginRouter.post("/", login)

module.exports = loginRouter;