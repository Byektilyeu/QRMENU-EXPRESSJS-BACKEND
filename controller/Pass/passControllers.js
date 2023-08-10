const asyncHandler = require("express-async-handler");
const axios = require("axios");
const Orders = require("../../models/mongoose/Orders");

// create order pass
// Төлбөрийн нэхэмжлэл үүсгээд QR-н утга авах зориулалттай.
exports.createOrderPass = asyncHandler(async (req, res, next) => {
  const data = JSON.stringify({
    ecommerce_token: req.body.ecommerce_token,
    amount: req.body.amount,
    callback_url: req.body.callback_url,
  });

  const create_order_config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://ecomstg.pass.mn/openapi/v1/ecom/create_order",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  let createOrderResponse = await axios(create_order_config);

  res.status(200).json({
    success: true,
    data: JSON.stringify(createOrderResponse.data),
  });
});

// order inquiry
// Нэхэмжлэлийн төлөвийг төлсөн эсэхийг шалгах зориулалттай.
exports.orderInquiryPass = asyncHandler(async (req, res, next) => {
  console.log(
    "order inquiry body +++++++++++++++++++++++++++++++++ > ",
    req.body
  );
  const data = JSON.stringify({
    ecommerce_token: req.body.ecommerce_token,
    order_id: req.body.order_id,
  });

  const order_inquiry_config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://ecomstg.pass.mn/openapi/v1/ecom/order_inquiry",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  let orderInquiryResponse = await axios(order_inquiry_config);
  console.log(
    "order inquiry response +++++++++++++++++++++++++++++++++- > ",
    JSON.stringify(orderInquiryResponse.data)
  );

  res.status(200).json({
    success: true,
    data: JSON.stringify(orderInquiryResponse.data),
  });
});

// // test
// exports.testPass = asyncHandler(async (req, res, next) => {
//   console.log("testPass body +++++++++++++++++++++++++++++++++ > ", req.body);

//   res.status(200).json({
//     success: true,
//   });
// });

// get pass orders
exports.testPass = asyncHandler(async (req, res, next) => {
  const data = Orders.find({ "transiactionInfo.paymentName": "pass" });
  console.log("testpass: ", data);
  res.status(200).json({
    success: true,
  });
});
