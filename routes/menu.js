const express = require("express");
const router = express.Router();

//buh menu-nuudiig controller-ees import hiij bna
const { getMenu } = require("../controller/mongoDBContollers/menu");
router.route("/").post(getMenu);

module.exports = router;
