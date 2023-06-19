const express = require("express");
const router = express.Router();

//buh menu-nuudiig controller-ees import hiij bna
const { getMenuItems } = require("../controller/mongoDBContollers/menuItems");
router.route("/").post(getMenuItems);

module.exports = router;
