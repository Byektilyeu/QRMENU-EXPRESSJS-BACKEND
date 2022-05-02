const MyError = require("../utils/myError");
const asyncHandler = require("express-async-handler");

exports.getMenu = asyncHandler(async (req, res, next) => {
  const menu = await req.db.Menu.findAll();
  console.log(
    "menu____________________________________________________________________",
    menu
  );
  res.status(200).json({
    success: true,
    data: menu,
  });
});

exports.createMenu = asyncHandler(async (req, res, next) => {
  // const menu = await req.db.Menu.findAll();

  console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++", req.body);
  console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++", req.db);
  const menu = await req.db.Menu.create(req.body);
  res.status(200).json({
    success: true,
    data: menu,
  });
});
