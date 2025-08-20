const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();
const passport = require("../authenticators/loginAuthenticator");
require("dotenv").config();
const jwt = require('jsonwebtoken')

// const passportLocal = passport.authenticate("local", {session: false}, 
//     (err, user, info) => {
//         if (err) return next(err);
//         if (!user) return res.status(401).json({message: "Invalid credentials" });

//         const payload = { sub: user.id, username: user.username };
//         const token = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: '1h'});
//         res.json({token});
//     }
// );


const passportLocal = passport.authenticate("local", {session: false})

function createAndVerifyToken(req, res, next) {
    const payload = {sub: req.user.id, username: req.user.username}
    const token = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: "1d"});
    res.json({token});
    next();
}


const loginPost = [passportLocal, createAndVerifyToken];

const protectedPath = passport.authenticate("jwt", {session: false});

module.exports = {
    loginPost,
    protectedPath
}