const Orders = require("../models/mongoose/Orders");
const asyncHandler = require("express-async-handler");

exports.createOrder = asyncHandler(async (req, res, next) => {
  const order = await Orders.create(req.body);

  res.status(200).json({
    success: true,
    data: order,
  });
});

// exports.getOrder = asyncHandler(async (req, res, next) => {
//   res.status(200).json({
//     success: true,
//   });
// });

exports.updateOrder = asyncHandler(async (req, res, next) => {
  // console.log("req.params.id ==>", req.body);
  // const order = await Orders.findOne({ orderGuid: req.body.orderGuid });
  const order = await Orders.updateMany(
    { orderGuid: req.body.orderGuid },
    { orderAmount: req.body.orderAmount, products: req.body.products }
  );
  res.status(200).json({
    success: true,
    data: order,
  });
});
