const express = require("express");
const router = express.Router();
const {
  getModiSchemeDetails,
} = require("../controller/mongoDBContollers/modiSchemeDetails");
router.route("/").post(getModiSchemeDetails);

module.exports = router;
