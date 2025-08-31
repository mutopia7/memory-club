const db = require("../db/queries")

async function indexRender(req,res) {
    const posts = await db.getAllPosts();
    res.render("index", { posts: posts})
}

function signUpRender(req,res){
    res.render("sign-up")
}



module.exports = {
    indexRender,
    signUpRender
}