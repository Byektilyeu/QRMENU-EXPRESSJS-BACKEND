const mongoose = require("mongoose");

// ModiSchemeDetails Schema -> mongoDB
const ModifiersSchema = new mongoose.Schema({
  objID: {
    type: Number,
    required: [true, "objID zaaval oruulna uu"],
  },
  max_one_dish: {
    type: Number,
  },
  use_limited_qnt: {
    type: Boolean,
  },
  modi_group_id: {
    type: Number,
  },
  menu_item_id: {
    type: Number,
  },
  id: {
    type: Number,
  },
  name: {
    type: String,
  },
  code: {
    type: Number,
  },
});

module.exports = mongoose.model("Modifiers", ModifiersSchema);
