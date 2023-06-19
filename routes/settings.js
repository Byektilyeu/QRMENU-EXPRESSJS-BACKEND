const express = require("express");
const router = express.Router();

const {
  createSettings,
  getSettings,
} = require("../controller/mongoDBContollers/settings");

router.route("/createsettings").post(createSettings);
router.route("/getsettings").post(getSettings);

module.exports = router;
