const express = require("express");
const menuController = require("../Controllers/menuController");

const router = express.Router({ mergeParams: true });

router.post("/", menuController.getMenuFromRestaurant);

module.exports = router;
