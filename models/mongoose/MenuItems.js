const mongoose = require("mongoose");

// Menu items Schema -> mongoDB
const MenuItemsSchema = new mongoose.Schema({
  objID: {
    type: Number,
    required: [true, "objID zaaval oruulna uu"],
  },
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
  modiSchemeID: {
    type: Number,
  },
  saleObjectType: {
    type: String,
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
