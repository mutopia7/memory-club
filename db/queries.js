const pool = require("./pool")

async function getAllPosts() {
    const { rows } = await pool.query("SELECT * FROM posts")
    return rows
}

module.exports = {
    getAllPosts
}