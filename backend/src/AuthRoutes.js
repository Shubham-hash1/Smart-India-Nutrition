const express = require("express");
const router = express.Router();
const { signup, login, verifyOtp, getMe } = require("./Authcontroller");
const { protect } = require("./Authmiddleware");

router.post("/signup", signup);
router.post("/login", login);
router.post("/verify-otp", verifyOtp);
router.get("/me", protect, getMe);

module.exports = router;