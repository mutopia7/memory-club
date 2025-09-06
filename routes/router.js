const { Router } = require("express");
const router = Router();
const userController = require("../controllers/userController");
const viewController = require("../controllers/viewController");
const session = require("express-session");
const passport = require("../config/passport");
const pgSession = require("connect-pg-simple")(session);
const pool = require("../db/pool");
const role = require("../middleware/role");
const signUpValidator = require("../validators/signUpValidator");
const memoryValidator = require("../validators/memoryValidator");
const flash = require("connect-flash");
const csrf = require("csurf");

router.use(session({
  store: new pgSession({ pool, tableName: "session", createTableIfMissing: true  }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 day
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  },
}));
router.use(passport.session());

router.use(flash());

// middleware for easy access to flash on all pages
router.use((req, res, next) => {
  res.locals.loginErrors = req.flash("loginErrors")[0] || {};
  res.locals.oldInput = req.flash("oldInput")[0] || {};
  next();
});

//Enabling CSRF
router.use(csrf());

// All views have access to the csrfToken
router.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
});


router.get("/log-in", viewController.logInRender)
// router.post("/log-in", passport.authenticate("local", {
//     successRedirect: "/",
//     failureRedirect: "/log-in"
// }))
router.post("/log-in", (req, res, next) => {
  passport.authenticate("local", function(err, user, info) {
    if (err) { return next(err); }

    if (!user) {
      // Creating Errors Objects for Each Field
      const errors = {};
      if (info.message === "Incorrect username") {
        errors.username = info.message;
      } else if (info.message === "Incorrect password") {
        errors.password = info.message;
      } else {
        errors.general = info.message;
      }

      // Save errors and previous username value for the form
      req.flash("loginErrors", errors);
      req.flash("oldInput", { username: req.body.username });

      return res.redirect("/log-in");
    }

    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect("/");
    });
  })(req, res, next);
});


router.get("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

router.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

// routers

router.get("/", viewController.indexRender);

router.get("/sign-up", viewController.signUpRender);
router.post("/sign-up", signUpValidator ,userController.signUpPost);

router.get("/new-memory", role.isVip, viewController.newMemoryRender);
router.post("/new-memory", memoryValidator , userController.newMemoryPost);

router.get("/account", viewController.accountRender);
router.post("/account", userController.changeRolePost);

router.post("/posts/:id/delete", role.isAdmin, userController.deletePostHandler)

// 404 handler
router.use((req, res, next) => {
  res.status(404).render("404", { currentUser: req.user });
});

// Global error handler
router.use((err, req, res, next) => {
  console.error(err.stack); // Server error log
  res.status(err.status || 500).render("error", {
    currentUser: req.user,
    message: err.message || "Something went wrong on the server.",
    status: err.status || 500
  });
});


module.exports = router;