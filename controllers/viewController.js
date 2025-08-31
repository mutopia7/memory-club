const db = require("../db/queries")

async function indexRender(req,res) {
    const posts = await db.getAllPosts();
    
    res.render("index", { posts: posts, user: req.user})
}

function signUpRender(req,res){
    res.render("sign-up")
}

function logInRender(req,res){
    res.render("log-in")
}


module.exports = {
    indexRender,
    signUpRender,
    logInRender
}