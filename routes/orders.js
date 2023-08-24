const express = require("express");
const router = express.Router();

const {
  insertOrderDetails,
  insertOrderTransiactionInfo,
  insertPayOrder,
  getShiftOrders,
  getVoidOrder,
} = require("../controller/mongoDBContollers/orders");

router.route("/insertorderdetails").post(insertOrderDetails);
router.route("/insertordertransiactioninfo").post(insertOrderTransiactionInfo);
router.route("/insertpayorder").post(insertPayOrder);
router.route("/getshiftorders").post(getShiftOrders);
router.route("/getvoidorder").post(getVoidOrder);

module.exports = router;
