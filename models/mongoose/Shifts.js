const mongoose = require("mongoose");

// Price Schema -> mongoDB
const ShiftsSchema = new mongoose.Schema({
  objID: {
    type: Number,
    required: [true, "objID zaaval oruulna uu"],
  },
  shiftNum: {
    type: Number,
  },
  shiftDate: {
    type: String,
  },
  shiftStartDate: {
    type: String,
  },
  shiftEndDate: {
    type: String,
  },
});

module.exports = mongoose.model("Shifts", ShiftsSchema);
