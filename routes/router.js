const { Router } = require("express");
const router = Router();
const userController = require("../controllers/userController");
const viewController = require("../controllers/viewController");
const session = require("express-session");
const passport = require("../config/passport");
const pgSession = require("connect-pg-simple")(session);
const pool = require("../db/pool");
const role = require("../middleware/role");
const signUpValidation = require("../validators/signUpValidation")

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


router.get("/log-in", viewController.logInRender)
router.post("/log-in", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/log-in"
}))

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
router.post("/sign-up", signUpValidation ,userController.signUpPost);

router.get("/new-memory", role.isAuth, role.isVip, viewController.newMemoryRnder);
router.post("/new-memory", userController.newMemoryPost);

router.get("/account", viewController.accountRender);
router.post("/account", userController.changeRolePost);


module.exports = router;