const express = require("express");
const restaurantController = require("../Controllers/restaurantController");

const router = express.Router({ mergeParams: true });

router.get("/", restaurantController.getRestaurants);

module.exports = router;
