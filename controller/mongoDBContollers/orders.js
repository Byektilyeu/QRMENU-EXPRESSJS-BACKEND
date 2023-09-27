const Orders = require("../../models/mongoose/Orders");
const asyncHandler = require("express-async-handler");

exports.insertOrderDetails = asyncHandler(async (req, res, next) => {
  console.log("insertOrderDetails", req.body);
  Orders.findOne({ visit: req.body.visit })
    .then((doc) => {
      if (doc === null) {
        Orders.insertMany({
          objID: req.body.objID,
          shiftNum: req.body.shiftNum,
          visit: req.body.visit,
          status: req.body.status,
          transiactionInfo: {
            paymentName: "",
            order_id: "",
            amount: "",
            approval_code: "",
            rrn: "",
            pan: "",
            date_time: "",
            terminal_id: "",
            payment_request_id: "",
          },
          orderDetails: {
            orderVisit: req.body.orderVisit,
            orderNumber: req.body.orderNumber,
            orderGuid: req.body.orderGuid,
            products: req.body.products,
          },
          payOrder: {
            dDTD: "",
            orderAmount: 0,
            checkNum: 0,
            closedDate: "",
            cashierID: 0,
            deletedDate: "",
            deletedPerson: "",
          },
        });
      } else {
        Orders.findOneAndUpdate(
          { visit: req.body.visit },
          {
            $set: {
              status: req.body.status,
              orderDetails: {
                orderVisit: req.body.orderVisit,
                orderGuid: req.body.orderGuid,
                products: req.body.products,
              },
            },
          },
          { new: true, runValidators: true },
          (err, doc) => {
            if (err) {
              console.log("error", err);
            }
          }
        );
      }
    })
    .catch((err) => {
      console.log(err);
    });

  res.status(200).json({
    success: true,
  });
});

// exports.getOrder = asyncHandler(async (req, res, next) => {
//   res.status(200).json({
//     success: true,
//   });
// });

// exports.updateOrder = asyncHandler(async (req, res, next) => {
//   // console.log("req.params.id ==>", req.body);
//   // const order = await Orders.findOne({ orderGuid: req.body.orderGuid });
//   const order = await Orders.updateMany(
//     { orderGuid: req.body.orderGuid },
//     { orderAmount: req.body.orderAmount, products: req.body.products }
//   );
//   res.status(200).json({
//     success: true,
//     data: order,
//   });
// });

exports.insertOrderTransiactionInfo = asyncHandler(async (req, res, next) => {
  console.log("insertOrderPass : ", req.body);
  Orders.findOne({ visit: req.body.visit })
    .then((doc) => {
      if (doc !== null) {
        Orders.findOneAndUpdate(
          { visit: req.body.visit },
          {
            $set: {
              status: req.body.status,
              transiactionInfo: {
                paymentName: req.body.paymentName,
                order_id: req.body.extra_data.order_id,
                amount: req.body.extra_data.amount,
                approval_code: req.body.extra_data.approval_code,
                rrn: req.body.extra_data.rrn,
                pan: req.body.extra_data.pan,
                date_time: req.body.extra_data.date_time,
                terminal_id: req.body.extra_data.terminal_id,
                payment_request_id: req.body.extra_data.payment_request_id,
              },

              payOrder: {
                dDTD: "",
                orderAmount: 0,
                checkNum: 0,
                closedDate: "",
                cashierID: 0,
                deletedDate: "",
                deletedPerson: "",
              },
            },
          },
          { new: true, runValidators: true },
          (err, doc) => {
            if (err) {
              console.log("error", err);
            }
          }
        );
      } else {
        res.status(400).json({
          success: false,
          error: "Уучлаарай таны захиалгын мэдээлэл олдохгүй байна!!!",
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

exports.insertPayOrder = asyncHandler(async (req, res, next) => {
  console.log("insert pay order data ===> ", req.body);
  Orders.findOne({ visit: req.body.visit })
    .then((doc) => {
      if (doc !== null) {
        Orders.findOneAndUpdate(
          { visit: req.body.visit },
          {
            $set: {
              status: req.body.status,
              payOrder: {
                dDTD: req.body.dDTD,
                orderAmount: req.body.orderAmount,
                checkNum: req.body.checkNum,
                closedDate: req.body.closedDate,
                cashierID: 0,
                deletedDate: "",
                deletedPerson: "",
              },
            },
          },
          { new: true, runValidators: true },
          (err, doc) => {
            if (err) {
              console.log("error", err);
            }
          }
        );
      } else {
        res.status(400).json({
          success: false,
          error: "Уучлаарай таны захиалгын мэдээлэл олдохгүй байна!!!",
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

exports.deleteReceiptSuccess = asyncHandler(async (req, res, next) => {
  Orders.findOne({ visit: req.body.visit })
    .then((doc) => {
      if (doc !== null) {
        Orders.findOneAndUpdate(
          { visit: req.body.visit },
          {
            $set: {
              status: req.body.status,
              payOrder: {
                cashierID: req.body.cashierID,
                deletedDate: req.body.deletedDate,
                deletedPerson: req.body.deletedPerson,
              },
            },
          },
          { new: true, runValidators: true },
          (err, doc) => {
            if (err) {
              console.log("error", err);
            }
          }
        );
      } else {
        res.status(400).json({
          success: false,
          error: "Уучлаарай таны захиалгын мэдээлэл олдохгүй байна!!!",
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

// void // get order list
exports.getShiftOrders = asyncHandler(async (req, res, next) => {
  const shiftOrders = await Orders.find({
    objID: req.body.objID,
    shiftNum: req.body.shiftNum,
  });
  res.status(200).json({
    success: true,
    data: shiftOrders,
  });
});

// void get order
exports.getVoidOrder = asyncHandler(async (req, res, next) => {
  const voidOrder = await Orders.find({
    objID: req.body.objID,
    shiftNum: req.body.shiftNum,
    visit: req.body.visit,
  });
  console.log("voidOrder", voidOrder);
  res.status(200).json({
    success: true,
    data: voidOrder,
  });
});
