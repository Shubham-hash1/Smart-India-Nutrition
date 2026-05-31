const express = require("express");
const { getFoods, createFood, deleteFood, updateFood } = require("./FoodController");
const { protect } = require("./Authmiddleware");

const router = express.Router();

router.route("/")
  .get(getFoods)
  .post(protect, createFood);

router.route("/:id")
  .put(protect, updateFood)
  .delete(protect, deleteFood);

module.exports = router;
