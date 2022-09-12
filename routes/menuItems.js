const express = require("express");
const router = express.Router();

//buh menu-nuudiig controller-ees import hiij bna
const { getMenuItems } = require("../controller/menuItems");
router.route("/").get(getMenuItems);

module.exports = router;
