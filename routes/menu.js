const express = require("express");
const router = express.Router();

//buh menu-nuudiig controller-ees import hiij bna
const { getMenu, createMenu } = require("../controller/menu");
router.route("/").get(getMenu);

module.exports = router;
