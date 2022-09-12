const MyError = require("../utils/myError");
const asyncHandler = require("express-async-handler");

exports.getHallPlans = asyncHandler(async (req, res, next) => {
  const hallPlans = await req.db.HallPlans.findAll();
  res.status(200).json({
    success: true,
    count: hallPlans.length,
    data: hallPlans,
  });
});
