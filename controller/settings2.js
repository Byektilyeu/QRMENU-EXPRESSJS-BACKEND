const Settings = require("../models/mongoose/Settings");
const asyncHandler = require("express-async-handler");

exports.createSettings = asyncHandler(async (req, res, next) => {
  const settings = await Settings.create(req.body);

  res.status(200).json({
    success: true,
    data: settings,
  });
});
