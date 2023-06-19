const mongoose = require("mongoose");

// Categories Schema -> mongoDB
const CategoriesSchema = new mongoose.Schema({
  objID: {
    type: Number,
    required: [true, "objID zaaval oruulna uu"],
  },
  // 1
  Name: {
    type: String,
    unique: true,
  },
  // 2
  Ident: {
    type: Number,
    required: [true, "category ident zaaval oruulna uu"],
  },
  // 3
  Comment: {
    type: String,
  },
  // 4
  genname0450: {
    type: String,
  },
  // 5
  genname0409: {
    type: String,
  },
});

module.exports = mongoose.model("Categories", CategoriesSchema);
