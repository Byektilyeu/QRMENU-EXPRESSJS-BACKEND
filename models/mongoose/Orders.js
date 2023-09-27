const mongoose = require("mongoose");

const OrdersSchema = new mongoose.Schema({
  objID: {
    type: Number,
  },
  shiftNum: {
    type: Number,
  },
  visit: {
    type: Number,
    unique: true,
  },
  status: {
    type: Number,
  },
  transiactionInfo: {
    paymentName: {
      type: String,
    },
    order_id: {
      type: String,
    },
    amount: {
      type: String,
    },
    approval_code: {
      type: String,
    },
    rrn: {
      type: String,
    },
    pan: {
      type: String,
    },
    date_time: {
      type: String,
    },
    terminal_id: {
      type: String,
    },
    payment_request_id: {
      type: String,
    },
  },
  orderDetails: {
    orderVisit: {
      type: Number,
    },
    orderNumber: {
      type: Number,
    },
    orderGuid: {
      type: String,
    },
    products: [
      {
        id: Number,
        quantity: Number,
        name: String,
        image: String,
        price: Number,
      },
    ],
  },
  payOrder: {
    dDTD: {
      type: String,
    },
    orderAmount: {
      type: Number,
    },
    checkNum: {
      type: Number,
    },
    closedDate: {
      type: String,
    },
    cashierID: {
      type: Number,
    },
    deletedDate: {
      type: String,
    },
    deletedPerson: {
      type: String,
    },
  },
});

module.exports = mongoose.model("Orders", OrdersSchema);
