const db = require("../db/queries")
const bcrypt = require("bcryptjs")

async function signUpPost(req, res, next) {
    try {
    const { firstname, lastname, username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.createUser(firstname, lastname,username, hashedPassword)
    res.redirect("/")
    } catch (err) {
        return next(err)
    }
}

module.exports = {
    signUpPost
}