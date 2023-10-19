const express = require("express");
const router = express.Router();
const { getModiGroups } = require("../controller/mongoDBContollers/modiGroups");
router.route("/").post(getModiGroups);

module.exports = router;
