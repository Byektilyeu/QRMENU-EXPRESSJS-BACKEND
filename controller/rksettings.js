const MyError = require("../utils/myError");
const asyncHandler = require("express-async-handler");

exports.getSettings = asyncHandler(async (req, res, next) => {
  const settings = await req.db.Settings.findAll();
  console.log("Settings +++++++++++> " + settings);
  res.status(200).json({
    success: true,
    data: settings,
  });
});
