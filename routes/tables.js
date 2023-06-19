const express = require("express");
const router = express.Router();

const { getTablesMongodb } = require("../controller/mongoDBContollers/tables");
router.route("/").post(getTablesMongodb);

module.exports = router;
