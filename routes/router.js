const { Router } = require("express");
const router = Router();
const userController = require("../controllers/userController");
const viewController = require("../controllers/viewController");
const session = require("express-session");
const passport = require("../config/passport");

router.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
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

router.get("/", viewController.indexRender)

router.get("/sign-up", viewController.signUpRender)
router.post("/sign-up", userController.signUpPost)



module.exports = router;