const express = require("express");
const router = express.Router();

const {
  createRestaurant,
  getRestaurants,
  getRestaurant,
} = require("../controller/mongoDBContollers/restaurants");

router.route("/getrestaurants").post(getRestaurants);
router.route("/createrestaurant").post(createRestaurant);
router.route("/getrestaurant").post(getRestaurant);

module.exports = router;
