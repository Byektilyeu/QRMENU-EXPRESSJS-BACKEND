const express = require("express");
const router = express.Router();

const { getPrice } = require("../controller/price");
router.route("/").get(getPrice);

module.exports = router;
