const express = require("express");
const orderController = require("../Controllers/orderController");

const router = express.Router({ mergeParams: true });

//TODO CHANGE TO USE THE HBASE VERSION

// For all
router.post("/user", orderController.getUserOrders);
router.post("/admin", orderController.getAllOrders);

//For specific restaurant
router.post("/restaurant", orderController.getAllRestaurantOrders);
router.post("/restaurant/pending", orderController.getPendingOrders);

router.post("/create", orderController.createOrder);
router.post("/updatestatus", orderController.updateOrderStatus);

module.exports = router;
