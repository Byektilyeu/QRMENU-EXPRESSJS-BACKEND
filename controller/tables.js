const MyError = require("../utils/myError");
const asyncHandler = require("express-async-handler");

exports.getTable = asyncHandler(async (req, res, next) => {
  // sqlite-iig query bishij data avj bna
  const [table] = await req.db.sequelize.query(
    `SELECT * FROM Tables WHERE Tables.tablesIdent = ${req.body.tableIdent}`
  );

  res.status(200).json({
    success: true,
    count: table.length,
    data: table,
  });
});

exports.getHallPlansTables = asyncHandler(async (req, res, next) => {
  const [getTables] = await req.db.sequelize.query(
    // `SELECT * FROM price_value WHERE mainParentIdent = ${req.body.category}`
    `SELECT * FROM Tables WHERE tablesMainParentIdent = ${req.body.hallPlansIdent}`
  );

  res.status(200).json({
    success: true,
    count: getTables.length,
    data: getTables,
  });
});
