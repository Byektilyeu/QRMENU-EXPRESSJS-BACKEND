const mongoose = require("mongoose");

const OrdersSchema = new mongoose.Schema({
  // 1
  orderVisit: {
    type: Number,
    required: [true, "order visit zaaval oruulna uu"],
    unique: true,
  },
  // 2
  orderNumber: {
    type: Number,
    required: [true, "order number zaaval oruulna uu"],
  },
  // 3
  orderAmount: {
    type: Number,
    required: [true, "order amount zaaval oruulna uu"],
  },
  // 4
  orderGuid: {
    type: String,
    required: [true, "order guid zaaval oruulna uu"],
  },
  // 5
  payments: [
    {
      paymentID: String,
      amount: Number,
      paymentStatus: Boolean,
      invoiceNumber: Number,
    },
  ],
  // 6
  dDTD: {
    type: Number,
    unique: true,
  },
  // 7
  products: [
    {
      id: Number,
      quantity: Number,
      name: String,
      image: String,
      price: Number,
    },
  ],
});

module.exports = mongoose.model("Orders", OrdersSchema);
