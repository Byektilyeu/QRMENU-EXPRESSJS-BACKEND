const express = require("express");
const router = express.Router();
const { getHallPlansTables } = require("../controller/tables");
router.route("/tables").post(getHallPlansTables);

const { getHallPlans } = require("../controller/hallPlans");
router.route("/").get(getHallPlans);

module.exports = router;
