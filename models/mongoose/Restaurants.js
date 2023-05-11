const mongoose = require("mongoose");

const RestaurantsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name zaaval oruulna uu"],
  },
  ID: {
    type: Number,
    required: [true, "id zaaval oruulna uu"],
  },

  objID: {
    type: Number,
    required: [true, "objID zaaval oruulna uu"],
  },
});

module.exports = mongoose.model("Restaurants", RestaurantsSchema);
