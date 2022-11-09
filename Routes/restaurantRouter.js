const express = require("express");
const restaurantController = require("../Controllers/restuarantController");

const router = express.Router({ mergeParams: true });

router.get("/", restaurantController.getRestuarants);

module.exports = router;
