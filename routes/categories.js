const express = require("express");
const router = express.Router();

const {
  getCategoriesMongodb,
} = require("../controller/mongoDBContollers/categories");
router.route("/").post(getCategoriesMongodb);

module.exports = router;
