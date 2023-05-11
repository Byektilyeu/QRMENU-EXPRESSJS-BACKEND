const mongoose = require("mongoose");

const MenuItemsSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  menuIdent: {
    type: Number,
  },
  code: {
    type: Number,
  },
  altName: {
    type: String,
  },
  modiSchema: {
    type: Number,
  },
  mainParentIdent: {
    type: Number,
  },
  comment: {
    type: String,
  },
  genname0450: {
    type: String,
  },
  genname0409: {
    type: String,
  },
  genForWeb: {
    type: String,
  },
  genSortForWeb: {
    type: String,
  },
});

module.exports = mongoose.model("MenuItems", MenuItemsSchema);
