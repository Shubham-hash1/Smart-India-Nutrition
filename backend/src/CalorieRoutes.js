const express = require("express");
const { getCalorieLogs, createCalorieLog, deleteCalorieLog, updateCalorieLog } = require("./CalorieController");
const { protect } = require("./Authmiddleware");

const router = express.Router();

router.use(protect); // All calorie log routes are private

router.route("/")
  .get(getCalorieLogs)
  .post(createCalorieLog);

router.route("/:id")
  .put(updateCalorieLog)
  .delete(deleteCalorieLog);

module.exports = router;
