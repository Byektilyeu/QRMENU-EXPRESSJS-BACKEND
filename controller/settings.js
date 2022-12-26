const MyError = require("../utils/myError");
const asyncHandler = require("express-async-handler");

exports.getSettings = asyncHandler(async (req, res, next) => {
  const settings = await req.db.Settings.findAll();
  res.status(200).json({
    success: true,
    data: settings,
  });
});
