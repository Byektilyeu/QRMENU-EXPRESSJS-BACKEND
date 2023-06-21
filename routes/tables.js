const express = require("express");
const router = express.Router();

const {
  getTablesMongodb,
  getTables,
} = require("../controller/mongoDBContollers/tables");

router.route("/").post(getTables);
router.route("/db").post(getTablesMongodb);

module.exports = router;
