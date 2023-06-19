const express = require("express");
const router = express.Router();

const { getPrice } = require("../controller/mongoDBContollers/price");
router.route("/").post(getPrice);

module.exports = router;
