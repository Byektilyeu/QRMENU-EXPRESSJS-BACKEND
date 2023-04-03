const express = require("express");
const router = express.Router();

const {
  getMonpayToken,
  checkInvoice,
  createInvoice,
} = require("../controller/monpay");

router.route("/getmonpaytoken").post(getMonpayToken);
router.route("/createinvoice").post(createInvoice);
router.route("/checkinvoice").post(checkInvoice);

module.exports = router;
