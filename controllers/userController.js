const db = require("../db/queries")
const bcrypt = require("bcryptjs")
const { validationResult } = require("express-validator")


async function signUpPost(req, res, next) {
    const { firstname, lastname, username, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        // Convert errors to object { fieldName: "error message" }
        const mappedErrors = {};
        errors.array().forEach(err => {
            mappedErrors[err.path] = err.msg;
        })
        return res.status(400).render("sign-up", { errors: mappedErrors, oldInput: { firstname, lastname, username } })
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.createUser(firstname, lastname, username, hashedPassword)
        res.redirect("/")
    } catch (err) {
        return next(err)
    }
}

async function newMemoryPost(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        // Convert errors to object { fieldName: "error message" }
        const mappedErrors = {};
        errors.array().forEach(err => {
            mappedErrors[err.path] = err.msg;
        })
        return res.status(400).render("new-memory", { errors: mappedErrors, oldInput: req.body })
    }

    try {
        const { title, content } = req.body;
        const user = req.user;
        await db.createPost(user, title, content);
        res.redirect("/")
    } catch (err) {
        return next(err)
    }
}

async function changeRolePost(req, res, next) {
    try {
        const role = req.body.role;
        const userId = req.user.id;
        await db.updateUserRole(role, userId);
        req.user.role = role;
        res.redirect("/account")
    } catch (err) {
        return next(err)
    }
}

async function deletePostHandler(req, res, next) {
    try {
        const postId = req.params.id;
        await db.deletePost(postId);
        res.redirect("/")
    } catch (err) {
        return next(err)
    }
}

module.exports = {
    signUpPost,
    newMemoryPost,
    changeRolePost,
    deletePostHandler
}