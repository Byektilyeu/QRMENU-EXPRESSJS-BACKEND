const mongoose = require("mongoose");

// Hall plans Schema -> mongoDB
const HallPlansSchema = new mongoose.Schema({
  objID: {
    type: Number,
    required: [true, "objID zaaval oruulna uu"],
  },
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
