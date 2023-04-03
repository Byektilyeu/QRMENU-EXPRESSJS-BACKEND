const express = require("express");
const router = express.Router();

const { createSettings } = require("../controller/settings2");

router.route("/createsettings").post(createSettings);

module.exports = router;
