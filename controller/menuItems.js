const MyError = require("../utils/myError");
const asyncHandler = require("express-async-handler");

exports.getMenuItems = asyncHandler(async (req, res, next) => {
  const menuItems = await req.db.MenuItems.findAll();
  res.status(200).json({
    success: true,
    data: menuItems,
  });
});
