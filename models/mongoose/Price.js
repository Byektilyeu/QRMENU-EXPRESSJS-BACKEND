const mongoose = require("mongoose");

// Price Schema -> mongoDB
const PriceSchema = new mongoose.Schema({
  objID: {
    type: Number,
    required: [true, "objID zaaval oruulna uu"],
  },
  identOrderMenu: {
    type: Number,
    required: [true, "identOrderMenu price zaaval oruulna uu"],
  },
  priceOrderMenu: {
    type: Number,
  },
});

module.exports = mongoose.model("Price", PriceSchema);
