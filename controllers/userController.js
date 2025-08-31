const db = require("../db/queries")
const bcrypt = require("bcryptjs")

async function signUpPost(req, res, next) {
    try {
        const { firstname, lastname, username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.createUser(firstname, lastname, username, hashedPassword)
        res.redirect("/")
    } catch (err) {
        return next(err)
    }
}

async function newMemoryPost(req, res, next) {
    try {
        const { title, content} = req.body;
        const user = req.user;
        await db.createPost(user, title, content);
        res.redirect("/")
    } catch (err) {
        return next(err)
    }
}

async function changeRolePost(req, res, next) {
    try {
        const role = req.body.role;
        const userId = req.user.id;
        await db.updateUserRole(role, userId);
        res.send(`your currnet role is ${role}`)
    } catch (err) {
        return next(err)
    }
}

module.exports = {
    signUpPost,
    newMemoryPost,
    changeRolePost
}