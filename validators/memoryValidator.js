const { body } = require("express-validator");

const memoryValidator = [
  body("title")
    .trim()
    .notEmpty().withMessage("Title is required.")
    .isLength({ min: 3, max: 100 }).withMessage("Title must be 3–100 characters."),

  body("content")
    .trim()
    .notEmpty().withMessage("Content is required.")
    .isLength({ min: 10 }).withMessage("Content must be at least 10 characters."),
];

module.exports = memoryValidator;