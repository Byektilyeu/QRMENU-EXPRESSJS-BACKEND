const Restaurants = require("../models/mongoose/Restaurants");
const asyncHandler = require("express-async-handler");

exports.createRestaurant = asyncHandler(async (req, res, next) => {
  const restaurant = await Restaurants.create(req.body);

  res.status(200).json({
    success: true,
    data: restaurant,
  });
});

exports.getRestaurants = asyncHandler(async (req, res, next) => {
  const restaurant = await Restaurants.find();

  res.status(200).json({
    success: true,
    data: restaurant,
  });
});

exports.getRestaurant = asyncHandler(async (req, res, next) => {
  const result = await Restaurants.find({ objID: req.body.objID });

  res.status(200).json({
    success: true,
    data: result,
  });
});
