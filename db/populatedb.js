require("dotenv").config();
const { Client } = require("pg");

console.log("DATABASE_URL:", process.env.DATABASE_URL);

const SQL = `
-- ===== tables =====

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'normal' CHECK (role IN ('normal', 'vip', 'admin'))
);

CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    author VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ===== sample data =====

INSERT INTO users (first_name, last_name, username, password, role)
VALUES
('Ali', 'Ahmadi', 'ali123', 'hashedpassword1', 'normal'),
('Sara', 'Rezayi', 'sara_rz', 'hashedpassword2', 'vip'),
('Admin', 'User', 'admin01', 'hashedpassword3', 'admin')
ON CONFLICT (username) DO NOTHING;

INSERT INTO posts (user_id, title ,content, author)
VALUES
(1, 'sample', 'hey this is my first post', 'Ali'),
(1, 'count', 'hey, this is my second post😃', 'Ali'),
(2, 'emotion','Im happy to be here!', 'Sara'),
(1, 'first car', 'my first car was bmw', 'Ali'),
(3, 'first love', 'My first love''s name is hana','Admin')
ON CONFLICT DO NOTHING;

`;



async function populateDb() {
    let client;

    if (process.env.DATABASE_URL) {
        console.log("in databse")
        client = new Client({
            connectionString: process.env.DATABASE_URL,
            ssl: { rejectUnauthorized: false }
        });
    } else {
        client = new Client({
            host: process.env.HOST,
            user: process.env.USER,
            database: process.env.DATABASE,
            port: process.env.DB_PORT
        });
    }

    await client.connect();

    
    try {
        const res = await client.query("SELECT COUNT(*) AS count FROM users");
        if (parseInt(res.rows[0].count) > 0) {
            console.log("DB already populated, skipping.");
            await client.end();
            return;
        }
    } catch (err) {
        // جدول وجود ندارد یا خطا، ادامه به ایجاد جدول‌ها و داده‌ها
        console.log("users table not found, populating DB...");
    }

    try {
        await client.query(SQL);
    } catch (err) {
        console.error("Error populating DB:", err);
    } finally {
        await client.end();
    }
    console.log("DB populated successfully.");
}




module.exports = populateDb;