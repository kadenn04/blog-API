const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

async function allUsersGet(req, res, next) {
    try {
        const allUsers = await prisma.user.findMany();
        res.json(allUsers);
    } catch(err) {
        next(err);
    }
}

async function newUserPost(req, res, next) {
    try {
        const newUser = await prisma.user.create({
            data: {
                email: req.body.email,
                name: req.body.name
            }
        })
        res.json(newUser);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    allUsersGet,
    newUserPost,
}