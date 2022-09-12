const express = require("express");
const router = express.Router();

const { getRKOrderMenu } = require("../controller/rKOrderMenu");
router.route("/").get(getRKOrderMenu);

module.exports = router;
