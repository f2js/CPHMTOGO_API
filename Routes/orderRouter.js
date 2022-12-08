const express = require("express");
const orderController = require("../Controllers/orderController");

const router = express.Router({ mergeParams: true });

router.post("/create", orderController.createOrder);


module.exports = router;
