const asyncHandler = require("express-async-handler");
const Shifts = require("../../models/mongoose/Shifts");

// get table list ->  mongodb
exports.getShiftData = asyncHandler(async (req, res, next) => {
  const objectID = req.body.objID;

  const shift = await Shifts.find({
    objID: objectID,
  });

  res.status(200).json({
    success: true,
    data: shift,
  });
});
