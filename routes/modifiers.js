const express = require("express");
const router = express.Router();
const { getModifiers } = require("../controller/mongoDBContollers/modifiers");
router.route("/").post(getModifiers);

module.exports = router;
