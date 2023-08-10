const express = require("express");
const router = express.Router();

const {
  getSystemInfo,
  createOrder,
  payOrder,
  saveOrder,
} = require("../controller/mongoDBContollers/orderRkeeper");

router.route("/getsysteminfo").post(getSystemInfo);
router.route("/createorder").post(createOrder);
router.route("/payorder").post(payOrder);
router.route("/saveorder").post(saveOrder);

module.exports = router;
