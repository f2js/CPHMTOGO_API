const express = require("express");
const userController = require("../Controllers/userController");
const JWTverify = require("../middleware/verifyToken");

const router = express.Router({ mergeParams: true });

router.post("/signup", userController.signUp);
router.post("/login", userController.login);

const USE_AUTH = !process.env["SKIP_AUTH"];

if (USE_AUTH) {
  router.use(JWTverify);
}

// Endpoints below this line require authentication

router.get("/allUsers", userController.getAllUsers);
router.get("/user", userController.getUser);
router.delete("/user", userController.deleteUser);

module.exports = router;
