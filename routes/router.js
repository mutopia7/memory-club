const { Router } = require("express");
const router = Router();
const userController = require("../controllers/userController")
const viewController = require("../controllers/viewController")

router.get("/", viewController.indexRender)

module.exports = router;