const mongoose = require("mongoose");

// ModiSchemeDetails Schema -> mongoDB
const ModiSchemeDetailsSchema = new mongoose.Schema({
  objID: {
    type: Number,
    required: [true, "objID zaaval oruulna uu"],
  },
  id: {
    type: Number,
  },
  up_limit: {
    type: Number,
  },
  down_limit: {
    type: Number,
  },
  use_down_limit: {
    type: Boolean,
  },
  use_up_limit: {
    type: Boolean,
  },
  sort_num: {
    type: Number,
  },
  changes_price: {
    type: Boolean,
  },
  default_modifier: {
    type: Number,
  },
  modi_group_id: {
    type: Number,
  },
  modi_scheme_id: {
    type: Number,
  },
});

module.exports = mongoose.model("ModiSchemeDetails", ModiSchemeDetailsSchema);
