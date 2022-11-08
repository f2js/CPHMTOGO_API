const express = require("express");
const userController = require("../Controllers/userController");

const router = express.Router({ mergeParams: true });

router.post("/signup", userController.signUp);
router.post("/login", userController.login);

module.exports = router;
