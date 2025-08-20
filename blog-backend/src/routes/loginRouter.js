const { Router } = require("express"); 
const loginController = require("../controllers/loginController.js");


const loginRouter = Router();

loginRouter.post("/", loginController.loginPost);
loginRouter.get("/protected", loginController.protectedPath, (req, res, next) => {
    res.send({msg: "You got through!", user: req.user});
});

module.exports = loginRouter;