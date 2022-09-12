const MyError = require("../utils/myError");
const asyncHandler = require("express-async-handler");

exports.getRKOrderMenu = asyncHandler(async (req, res, next) => {
  const orderMenu = await req.db.RKOrderMenu.findAll();
  res.status(200).json({
    success: true,
    data: orderMenu,
  });
});
