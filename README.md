# Memory Club 🧠✨

A full-stack **Node.js + Express + PostgreSQL** project built as part of [The Odin Project](https://www.theodinproject.com/) curriculum.  
The application implements authentication, authorization, role-based access control, and CRUD operations for posts (called "memories").  

---

## Home Page
https://dazzling-cat-memory-club.up.railway.app/

## 🚀 Features

- **User Authentication**  
  Secure login & signup system using `passport.js` with local strategy. Passwords are hashed with `bcryptjs`.

- **Role-Based Access Control**  
  - **Normal User**: Can view all posts with authors’ names.  
  - **VIP User**: Can create new posts.  
  - **Admin User**: Can delete posts.  

- **Session Management**  
  Sessions are stored securely in PostgreSQL using `connect-pg-simple` with cookies configured for security (`httpOnly`, `sameSite`, `secure`).

- **Validation & Sanitization**  
  Form inputs are validated and sanitized using `express-validator`. Each input field displays its own error message for a better UX.

- **Flash Messages**  
  Friendly error messages displayed on the login and signup pages.

- **Security Enhancements**  
  - HTTP headers hardened with `helmet`.  
  - Input sanitized to prevent XSS.  
  - (Optional) CSRF protection can be added with `csurf`.

- **Database Relations**  
  - `users` table with `id`, `firstname`, `lastname`, `username`, `password`, `role`.  
  - `posts` table with `id`, `user_id`, `title`, `content`, `author`, `created_at`.  
  - Posts are tied to users via foreign key relation.

- **Error Handling**  
  - Custom **404 Not Found** page.  
  - Global error handler to catch and render errors gracefully.

---

## 📂 Project Structure

```
.
├── app.js                 # Main application entry
├── routes/
│   └── router.js          # Routes & middleware setup
├── controllers/           # Controllers (user & view logic)
├── middleware/            # Role-based access control
├── validators/            # Input validation schemas
├── db/
│   ├── pool.js            # Database connection pool
│   ├── queries.js         # Query functions
│   └── populatedb.js      # DB initialization with sample data
├── views/                 # EJS templates
│   ├── index.ejs
│   ├── sign-up.ejs
│   ├── log-in.ejs
│   ├── account.ejs
│   ├── new-memory.ejs
│   └── partials/          # Header, footer, post partials
├── public/                # Static assets (CSS, reset, styles)
└── README.md              # This file
```

---

## 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/memory-club.git
   cd memory-club
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**  
   Create a `.env` file in the root directory with:
   ```
   DATABASE_URL=your_postgres_url
   SESSION_SECRET=your_secret_key
   NODE_ENV=development
   ```

4. **Populate the database**
   ```bash
   node ./db/populatedb.js
   ```

5. **Run the application**
   ```bash
   npm start
   ```
   The app will be running at **http://localhost:5000**

---


## 🔮 Future Improvements

- ✅ Implement CSRF protection tokens on all forms.  
- ✅ Add profile pictures for users.  
- ✅ Enable editing posts.  



## 👨‍💻 Author

Created with ❤️ by [RASOOL](https://github.com/mutopia7)  

