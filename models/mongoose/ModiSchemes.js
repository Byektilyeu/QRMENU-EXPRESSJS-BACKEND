const mongoose = require("mongoose");

// ModiSchemes Schema -> mongoDB
const ModiSchemesSchema = new mongoose.Schema({
  objID: {
    type: Number,
    required: [true, "objID zaaval oruulna uu"],
  },
  id: {
    type: Number,
  },
  itemIdent: {
    type: Number,
  },
  name: {
    type: String,
  },
  code: {
    type: Number,
  },
});

module.exports = mongoose.model("ModiSchemes", ModiSchemesSchema);
