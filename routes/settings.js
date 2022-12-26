const express = require("express");
const router = express.Router();

const { getSettings } = require("../controller/settings");
router.route("/").get(getSettings);

module.exports = router;
