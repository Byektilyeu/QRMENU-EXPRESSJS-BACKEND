const express = require("express");
const router = express.Router();

const { getShiftData } = require("../controller/mongoDBContollers/shifts");

router.route("/getshift").post(getShiftData);

module.exports = router;
