const mongoose = require("mongoose");

// Settings Schema -> mongoDB
const SettingsSchema = new mongoose.Schema({
  IP: {
    type: String,
    required: [true, "ip address zaaval oruulna uu"],
  },
  port: {
    type: Number,
    required: [true, "port zaaval oruulna uu"],
  },
  username: {
    type: String,
    required: [true, "username zaaval oruulna uu"],
  },
  password: {
    type: String,
    required: [true, "password zaaval oruulna uu"],
  },
  stationID: {
    type: String,
    required: [true, "stationID zaaval oruulna uu"],
  },
  paymentID: {
    type: String,
    required: [true, "paymentID zaaval oruulna uu"],
  },
  waiterID: {
    type: String,
    required: [true, "waiterID zaaval oruulna uu"],
  },
  stationCode: {
    type: Number,
    required: [true, "stationCode zaaval oruulna uu"],
  },
  objID: {
    type: Number,
    required: [true, "objID zaaval oruulna uu"],
  },
  cashierCode: {
    type: Number,
    required: [true, "cashierCode zaaval oruulna uu"],
  },
  orderType: {
    type: Number,
    required: [true, "orderType zaaval oruulna uu"],
  },
  passToken: {
    type: String,
  },
  managerID: {
    type: String,
  },
  managerPassword: {
    type: String,
  },
  deleteReasonID: {
    type: String,
  },
});

module.exports = mongoose.model("Settings", SettingsSchema);
