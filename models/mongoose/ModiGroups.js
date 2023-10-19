const mongoose = require("mongoose");

// ModiSchemeDetails Schema -> mongoDB
const ModiGroupsSchema = new mongoose.Schema({
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
  modi_group_type: {
    type: String,
  },
  name: {
    type: String,
  },
  code: {
    type: Number,
  },
});

module.exports = mongoose.model("ModiGroups", ModiGroupsSchema);
