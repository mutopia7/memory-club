const { body } = require("express-validator");

const signUpValidation = [
  // First name
  body("firstname")
    .trim()
    .escape() // Prevent XSS
    .isAlpha("en-US", { ignore: " -" }) // Letters only (plus spaces or dashes for compound names)
    .withMessage("First name must only contain letters.")
    .isLength({ min: 2, max: 20 })
    .withMessage("First name must be between 2 and 20 characters."),

  // Last name
  body("lastname")
    .trim()
    .escape()
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("Last name must only contain letters.")
    .isLength({ min: 2, max: 20 })
    .withMessage("Last name must be between 2 and 20 characters."),

  // Username
  body("username")
    .trim()
    .escape()
    .isAlphanumeric()
    .withMessage("Username must contain only letters and numbers.")
    .isLength({ min: 3, max: 15 })
    .withMessage("Username must be between 3 and 15 characters.")
    .toLowerCase(), // Usernames are all lowercase.

  // Password
  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long.")
    .matches(/\d/)
    .withMessage("Password must contain at least one number.")
];

module.exports = signUpValidation