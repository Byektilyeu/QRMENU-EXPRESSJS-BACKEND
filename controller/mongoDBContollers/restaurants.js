const Restaurants = require("../../models/mongoose/Restaurants");
const asyncHandler = require("express-async-handler");

// create new restaurant, update restaurant data
exports.createRestaurant = asyncHandler(async (req, res, next) => {
  //   const restaurant = await Restaurants.create(req.body);
  Restaurants.findOne({ objID: req.body.objID })
    .then((doc) => {
      if (doc === null) {
        Restaurants.insertMany({
          name: req.body.name,
          ID: req.body.ID,
          objID: req.body.objID,
        });
      } else {
        Restaurants.findOneAndUpdate(
          { objID: req.body.objID },
          {
            $set: {
              name: req.body.name,
              ID: req.body.ID,
              objID: req.body.objID,
            },
          },
          { new: true, runValidators: true },
          (err, doc) => {
            if (err) {
              console.log("error", err);
            }
            // console.log("updated", doc);
          }
        );
      }
    })
    .catch((err) => {
      console.log(err);
    });

  res.status(200).json({
    success: true,
  });
});

// get restaurant lists -> mongoDB
exports.getRestaurants = asyncHandler(async (req, res, next) => {
  const restaurant = await Restaurants.find();

  res.status(200).json({
    success: true,
    data: restaurant,
  });
});

// get restaurant data -> mongoDB
exports.getRestaurant = asyncHandler(async (req, res, next) => {
  const result = await Restaurants.find({ objID: req.body.objID });

  res.status(200).json({
    success: true,
    data: result,
  });
});
