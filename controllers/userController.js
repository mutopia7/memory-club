const db = require("../db/queries")

async function signUpPost(req, res, next) {
    try {
    const { firstname, lastname, username, password } = req.body;
    await db.createUser(firstname, lastname,username, password)
    res.redirect("/")
    } catch (err) {
        return next(err)
    }
}

module.exports = {
    signUpPost
}