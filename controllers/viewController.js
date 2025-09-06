const db = require("../db/queries")

async function indexRender(req, res) {
    const posts = await db.getAllPosts();
    const reversed = posts.reverse();
    res.render("index", { posts: reversed, user: req.user})
}

function signUpRender(req, res) {
    res.render("sign-up", { errors: {}, oldInput: {}, user: req.user })
}

function logInRender(req, res) {
    res.render("log-in")
}

function newMemoryRender(req, res) {
    res.render("new-memory",{ errors: {}, oldInput: {}, user: req.user })
}

function accountRender(req, res) {
    res.render("account", {role: req.user.role, user: req.user})
}

module.exports = {
    indexRender,
    signUpRender,
    logInRender,
    newMemoryRender,
    accountRender
}