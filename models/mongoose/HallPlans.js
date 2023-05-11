const mongoose = require("mongoose");

const HallPlansSchema = new mongoose.Schema({
  HallPlansMainParentIdent: {
    type: Number,
    required: [true, "hallplans main parent ident zaaval oruulna uu"],
  },
  hallplansIdent: {
    type: Number,
    required: [true, "hallplansIdent zaaval oruulna uu"],
  },
});

module.exports = mongoose.model("Hallplans", HallPlansSchema);
