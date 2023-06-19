const asyncHandler = require("express-async-handler");
const MenuItems = require("../../models/mongoose/MenuItems");

// ******************************************** get hall plans --> mongoDB *****************************************************
exports.getMenu = asyncHandler(async (req, res, next) => {
  const objectID = req.body.objID;
  MenuItems.aggregate([
    {
      $lookup: {
        from: "prices",
        localField: "menuIdent",
        foreignField: "identOrderMenu",
        as: "Price",
      },
    },
    {
      $match: {
        Price: {
          $ne: [],
        },
        objID: objectID,
      },
    },
    {
      $replaceRoot: {
        newRoot: {
          $mergeObjects: [{ $arrayElemAt: ["$Price", 0] }, "$$ROOT"],
        },
      },
    },
    { $project: { Price: 0 } },
  ]).exec((err, menu) => {
    if (err) {
      console.error(err);
    } else {
      res.status(200).json({
        success: true,
        data: menu,
      });
    }
  });
});
