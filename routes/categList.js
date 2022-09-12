const express = require("express");
const router = express.Router();
const { getCategoryMenu } = require("../controller/menu");
router.route("/").post(getCategoryMenu);
//buh menu-nuudiig controller-ees import hiij bna
const { getCategList } = require("../controller/categList");
router.route("/").get(getCategList);

// // "/api/v1/categories/:id/menu"

module.exports = router;
