const mongoose = require("mongoose");

// Tables Schema -> mongoDB
const TableSchema = new mongoose.Schema({
  objID: {
    type: Number,
    required: [true, "objID zaaval oruulna uu"],
  },
  tableIdent: {
    type: Number,
    required: [true, "tableIdent zaaval oruulna uu"],
  },
  tableMainParentIdent: {
    type: Number,
    required: [true, "tableMainParentIdent zaaval oruulna uu"],
  },
  tableCode: {
    type: Number,
    required: [true, "tableCode zaaval oruulna uu"],
  },
  tableName: {
    type: String,
    // required: [true, "tableName zaaval oruulna uu"],
  },
});

module.exports = mongoose.model("Table", TableSchema);
