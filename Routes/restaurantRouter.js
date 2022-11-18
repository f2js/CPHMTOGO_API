const express = require("express");
const restaurantController = require("../Controllers/restaurantController");

const router = express.Router();

router.get("/", restaurantController.getRestaurants);
router.get("/:id", restaurantController.getRestaurant);
router.get("/tag/:tag", restaurantController.getRestaurantByTag);
router.get("/location/:city", restaurantController.getRestaurantsByCity);

router.post("/", restaurantController.createRestaurant);

module.exports = router;
