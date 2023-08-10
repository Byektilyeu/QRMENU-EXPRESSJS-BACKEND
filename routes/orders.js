const express = require("express");
const router = express.Router();

const {
  insertOrderDetails,
  insertOrderTransiactionInfo,
  insertPayOrder,
  getShiftOrders,
} = require("../controller/mongoDBContollers/orders");

router.route("/insertorderdetails").post(insertOrderDetails);
router.route("/insertordertransiactioninfo").post(insertOrderTransiactionInfo);
router.route("/insertpayorder").post(insertPayOrder);
router.route("/getshiftorders").post(getShiftOrders);

module.exports = router;
