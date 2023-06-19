const express = require("express");
const router = express.Router();

//buh menu-nuudiig controller-ees import hiij bna
const {
  getCategoriesMongodb,
} = require("../controller/mongoDBContollers/categories");
router.route("/").post(getCategoriesMongodb);

module.exports = router;
