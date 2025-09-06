const pool = require("./pool")

async function getAllPosts() {
    const { rows } = await pool.query("SELECT * FROM posts")
    return rows
}

async function createUser(firstname, lastname, username, password) {
    await pool.query("INSERT INTO users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4)", [firstname, lastname, username, password])
}

async function createPost(user, title, content) {
    await pool.query("INSERT INTO posts (user_id, title, content, author) VALUES ($1, $2, $3, $4)", [user.id, title, content, user.first_name])    
}

async function updateUserRole(role, userId) {
    await pool.query("UPDATE users SET role = $1 WHERE id = $2",[role, userId])
}

async function deletePost(postId) {
    await pool.query("DELETE FROM posts WHERE id = $1", [postId])
}

module.exports = {
    getAllPosts,
    createUser,
    createPost,
    updateUserRole,
    deletePost
}