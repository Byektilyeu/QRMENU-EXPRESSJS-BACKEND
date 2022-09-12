const express = require("express");
const router = express.Router();

const { getTable } = require("../controller/tables");
router.route("/").post(getTable);

module.exports = router;
