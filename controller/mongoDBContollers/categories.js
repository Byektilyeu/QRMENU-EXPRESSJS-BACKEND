const asyncHandler = require("express-async-handler");
const Categories = require("../../models/mongoose/Categories");

// mongoDB-ээс категориудыг авах
exports.getCategoriesMongodb = asyncHandler(async (req, res, next) => {
  const objectID = req.body.objID;
  const categoriesDB = await Categories.find({ objID: objectID });
  //   console.log(categoriesDB);

  res.status(200).json({
    success: true,
    data: categoriesDB,
  });
});
