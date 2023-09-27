const express = require("express");
const router = express.Router();

const {
  getSystemInfo,
  createOrder,
  payOrder,
  saveOrder,
  deleteReceipt,
} = require("../controller/mongoDBContollers/orderRkeeper");

router.route("/getsysteminfo").post(getSystemInfo);
router.route("/createorder").post(createOrder);
router.route("/payorder").post(payOrder);
router.route("/saveorder").post(saveOrder);
router.route("/deletereceipt").post(deleteReceipt);

module.exports = router;
