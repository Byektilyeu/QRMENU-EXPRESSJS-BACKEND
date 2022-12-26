const MyError = require("../utils/myError");
const asyncHandler = require("express-async-handler");

exports.getMenu = asyncHandler(async (req, res, next) => {
  // sqlite-iig query bishij data avj bna
  const [result] = await req.db.sequelize.query(
    // `SELECT * FROM price_value WHERE mainParentIdent = ${req.body.category}`
    // "SELECT * FROM MenuItems JOIN Price ON MenuItems.menuIdent = Price.menuPriceObjectID"
    `SELECT * FROM price_value`
  );

  res.status(200).json({
    success: true,
    count: result.length,
    data: result,
  });
});

exports.getCategoryMenu = asyncHandler(async (req, res, next) => {
  const value = req.body.category;
  const [categMenu] = await req.db.sequelize.query(
    // `SELECT * FROM price_value WHERE mainParentIdent = ${req.body.category}`
    `SELECT * FROM price_value WHERE mainParentIdent = ${req.body.category}`
  );

  res.status(200).json({
    success: true,
    counttttt: categMenu.length,
    data: categMenu,
  });
});
