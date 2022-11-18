const express = require("express");
const menuController = require("../Controllers/menuController");

const router = express.Router({ mergeParams: true });

router.get("/:id", menuController.getResturantMenu);

module.exports = router;
