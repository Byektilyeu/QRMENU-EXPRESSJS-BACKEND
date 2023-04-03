const MyError = require("../utils/myError");
const asyncHandler = require("express-async-handler");
const axios = require("axios");

// get access token
exports.getMonpayToken = asyncHandler(async (req, res, next) => {
  const config = {
    method: "post",
    url: "https://z-wallet.monpay.mn/v2/oauth/token?client_id=Kj2xErwGObqGOCYA&client_secret=x9yPmgLxqmvh5CZL&grant_type=client_credentials",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  };

  let response = await axios(config);

  console.log(" PAID ", response);
  res.status(200).json({
    success: true,
    data: response.data,
    status: response.status,
    statusText: response.statusText,
  });
});

// create an invoice
exports.createInvoice = asyncHandler(async (req, res, next) => {
  const token = req.body.token;
  const hallplanID = req.body.hallplanID;
  const tableID = req.body.tableID;
  const totalPrice = req.body.totalPrice;
  // console.log("table -- ", req.body);
  const data = JSON.stringify({
    redirectUri: `http://10.0.0.101:3000/${hallplanID}/${tableID}/orderresult`,
    // redirectUri: `https://rkeeper.mn/`,
    amount: 1,
    receiver: "rkeeper_test",
    invoiceType: "P2B",
    description: "Demo",
  });
  const config = {
    method: "post",
    url: "https://z-wallet.monpay.mn/v2/api/oauth/invoice",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    data,
  };

  let response = await axios(config);

  // console.log("create invoice result ==> " + response);
  res.status(200).json({
    success: true,
    data: response.data,
  });
});

// check invoice
exports.checkInvoice = asyncHandler(async (req, res, next) => {
  console.log("body ======> ", req.body);
  const invoiceID = req.body.invoiceID;
  const token = req.body.token;
  const config = {
    method: "get",
    url: `https://z-wallet.monpay.mn/v2/api/oauth/invoice/${invoiceID}`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  let response = await axios(config);

  res.status(200).json({
    success: true,
    data: response.data,
  });
});
