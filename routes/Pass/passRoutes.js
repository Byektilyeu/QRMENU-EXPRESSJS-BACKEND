const express = require("express");
const router = express.Router();

const {
  createOrderPass,
  orderInquiryPass,
  testPass,
} = require("../../controller/Pass/passControllers");

router.route("/testpass").post(testPass);
router.route("/createorderpass").post(createOrderPass);
router.route("/order_inquiry_pass").post(orderInquiryPass);

module.exports = router;
