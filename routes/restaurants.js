const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/protect");

const {
  createRestaurant,
  getRestaurants,
  getRestaurant,
} = require("../controller/mongoDBContollers/restaurants");

router.route("/getrestaurants").post(getRestaurants);
router
  .route("/createrestaurant")
  .post(protect, authorize("admin"), createRestaurant);
router.route("/getrestaurant").post(protect, authorize("admin"), getRestaurant);

module.exports = router;
