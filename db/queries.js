const pool = require("./pool")

async function getAllPosts() {
    const { rows } = await pool.query("SELECT * FROM posts")
    return rows
}

async function createUser(firstname, lastname, username, password) {
    await pool.query("INSERT INTO users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4)", [firstname, lastname, username, password])
}

module.exports = {
    getAllPosts,
    createUser
}