const express = require("express");
const router = express.Router();

const { createOrder, updateOrder } = require("../controller/orders");

router.route("/createorder").post(createOrder);
router.route("/updateorder").post(updateOrder);

module.exports = router;
