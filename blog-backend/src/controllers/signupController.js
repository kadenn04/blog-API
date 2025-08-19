const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const validateSignup = [
    body('username').trim()
    .notEmpty().withMessage("Username can not be empty.")
    .isLength({min: 4, max: 16}).withMessage("Username must be between 4 and 16 characters")
    .matches(/^[a-zA-Z0-9-]+$/).withMessage("Username must be alphanumeric and can contain hyphens").withMessage("Username must be alphanumeric and can contain hyphens")
    .custom(async value => {
        try{
        const alreadyExistingUsername = await prisma.user.findUnique({
            where: {username: value }
        });
        if (alreadyExistingUsername) {
            return false
        } else {
            return true
        }} catch (err) {
            throw new Error("Username already exists");
        }
    }).withMessage("Username already exists"),
    body('email')
    .notEmpty().withMessage("Email can not be empty.")
    .isEmail().withMessage("Must be a valid email.")
    .custom(async value => {
        try {
        const alreadyExistingEmail = await prisma.user.findUnique({
            where: {username: value }
        });
        if (alreadyExistingEmail) {
            return false
        } else {
            return true
        }} catch (err) {
            throw new Error("Username already email");
        }
    }).withMessage("Email already exists"),
    body('password').trim()
    .isStrongPassword()
    .withMessage(`Password must be greater than 8
        and contain at least one upperacse letter, 
        one lowercase letter, one number, and one symbol.`)
    .escape(),
    body('confirmPassword', 'Passwords do not match.').custom(
        (value, {req}) => {
            return (value === req.body.password)
        }
    )
]

async function addUserPost(req, res, next) {
    const errors = validationResult(req);
    const {username, email, password} = req.body;
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                username: username,
                email: email,
                password: hashedPassword
            }
        })
        console.log("hi?");
        res.json(user);
    } catch(err) {
        next(err);
    }
}

const signupPost = [validateSignup, addUserPost]

module.exports = {
    signupPost,
}