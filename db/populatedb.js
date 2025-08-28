require("dotenv").config();
const { Client } = require("pg");

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
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ===== sample data =====

INSERT INTO users (first_name, last_name, username, password, role)
VALUES
('Ali', 'Ahmadi', 'ali123', 'hashedpassword1', 'normal'),
('Sara', 'Rezayi', 'sara_rz', 'hashedpassword2', 'vip'),
('Admin', 'User', 'admin01', 'hashedpassword3', 'admin')
ON CONFLICT (username) DO NOTHING;

INSERT INTO posts (user_id, content)
VALUES
(1, 'سلام! این اولین پست منه 😃'),
(1, 'hey, this is second post😃'),
(2, 'من تازه عضو ویژه شدم. خوشحالم اینجام!'),
(3, 'ادمین اینجاست! قوانین رو رعایت کنید.')
ON CONFLICT DO NOTHING;

`;



async function populateDb() {
    let client;

    if (process.env.DATABASE_URL) {
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

    // بررسی اینکه جدول movies پر است یا نه
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