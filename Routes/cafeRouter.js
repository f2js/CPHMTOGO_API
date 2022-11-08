const express = require("express");
const restuarantController = require("../Controllers/restuarantController");

const router = express.Router({ mergeParams: true });

router.get("/", restuarantController.getRestuarants);

module.exports = router;
