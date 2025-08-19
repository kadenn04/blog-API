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
    const { name, email } = req.body
    try {
        const newUser = await prisma.user.create({
            data: {
                email: email,
                name: name,
            }
        })
        res.json(newUser);
    } catch (err) {
        next(err);
    }
}

async function deleteUserPost(req, res ,next) {
    const { userid } = req.params;
    try {
        const deleteUser = await prisma.user.delete({
            where: {
                id: (parseInt(userid))
            }
        })
        res.json(deleteUser);
    } catch (err) {
        next(err)
    }
}

module.exports = {
    allUsersGet,
    newUserPost,
    deleteUserPost
}