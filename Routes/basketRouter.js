const express = require("express");
const basketController = require("../Controllers/basketController");

const router = express.Router({ mergeParams: true });

router.get("/:username", basketController.getBasket);
router.post("/", basketController.addToBasket);
router.post("/toorder", basketController.basketToOrder);

module.exports = router;
