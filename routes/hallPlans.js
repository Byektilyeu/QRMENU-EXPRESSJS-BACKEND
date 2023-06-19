const express = require("express");
const router = express.Router();
const {
  getHallPlans,
  getHallPlansMongodb,
} = require("../controller/mongoDBContollers/hallPlans");
router.route("/").post(getHallPlans);
router.route("/db").post(getHallPlansMongodb);

module.exports = router;
