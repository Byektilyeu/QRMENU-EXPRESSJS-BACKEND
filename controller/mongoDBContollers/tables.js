const asyncHandler = require("express-async-handler");
const Table = require("../../models/mongoose/Table");

// get table list ->  mongodb
exports.getTablesMongodb = asyncHandler(async (req, res, next) => {
  const objectID = req.body.objID;
  const hallPlansIdent = req.body.hallPlansIdent;

  const tablesDB = await Table.find({
    objID: objectID,
    tableMainParentIdent: hallPlansIdent,
  });
  // console.log("tablesDB", tablesDB);

  res.status(200).json({
    success: true,
    data: tablesDB,
  });
});
