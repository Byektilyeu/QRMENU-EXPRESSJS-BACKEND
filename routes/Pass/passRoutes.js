const express = require("express");
const router = express.Router();

const {
  createOrderPass,
  orderInquiryPass,
  testPass,
  voidOrder,
} = require("../../controller/Pass/passControllers");

router.route("/testpass").post(testPass);
router.route("/createorderpass").post(createOrderPass);
router.route("/order_inquiry_pass").post(orderInquiryPass);
router.route("/order_void_pass").post(voidOrder);

module.exports = router;
