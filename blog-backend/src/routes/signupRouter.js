const signupController = require("../controllers/signupController");
const { Router } = require("express");
const signupRouter = Router();

signupRouter.get("/", 
    (req,res,next) => {
        console.log(req.body);
        console.log("1!");
        next();
        }, signupController.signupPost);

module.exports = signupRouter;