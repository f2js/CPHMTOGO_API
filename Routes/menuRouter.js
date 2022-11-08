const express = require("express");
const menuController = require("../Controllers/menuController");

const router = express.Router({ mergeParams: true });

router.post("/", menuController.getMenuFromCafe);

module.exports = router;
