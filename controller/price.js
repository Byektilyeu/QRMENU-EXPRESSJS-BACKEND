const MyError = require("../utils/myError");
const asyncHandler = require("express-async-handler");

exports.getPrice = asyncHandler(async (req, res, next) => {
  const price = await req.db.Price.findAll();
  res.status(200).json({
    success: true,
    data: price,
  });
});
