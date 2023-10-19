const express = require("express");
const router = express.Router();
const {
  getModiSchemes,
} = require("../controller/mongoDBContollers/modiShcemes");
router.route("/").post(getModiSchemes);

module.exports = router;
