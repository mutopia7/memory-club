const db = require("../db/queries")

async function indexRender(req,res) {
    const posts = await db.getAllPosts();
    res.render("index", { posts: posts})
}

module.exports = {
    indexRender
}