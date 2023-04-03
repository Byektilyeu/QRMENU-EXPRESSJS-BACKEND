const MyError = require("../utils/myError");
const asyncHandler = require("express-async-handler");

exports.getCategList = asyncHandler(async (req, res, next) => {
  const categList = await req.db.CategList.findAll();
  // console.log(
  //   "categList__+================================================================+_",
  //   categList
  // );
  res.status(200).json({
    success: true,
    data: categList,
  });
});
