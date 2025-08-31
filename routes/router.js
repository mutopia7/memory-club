const { Router } = require("express");
const router = Router();
const userController = require("../controllers/userController")
const viewController = require("../controllers/viewController")

router.get("/", viewController.indexRender)

router.get("/sign-up", viewController.signUpRender)
router.post("/sign-up", userController.signUpPost)

module.exports = router;