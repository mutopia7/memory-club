const db = require("../db/queries")

async function indexRender(req, res) {
    const posts = await db.getAllPosts();
    
    res.render("index", { posts: posts, user: req.user})
}

function signUpRender(req, res) {
    res.render("sign-up")
}

function logInRender(req, res) {
    res.render("log-in")
}

function newMemoryRnder(req, res) {
    res.render("new-memory")
}

function accountRender(req, res) {
    res.render("account", {role: req.user.role})
}

module.exports = {
    indexRender,
    signUpRender,
    logInRender,
    newMemoryRnder,
    accountRender
}