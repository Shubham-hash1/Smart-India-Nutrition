const express = require("express");
const { chat, estimateFood } = require("./AiController");

const router = express.Router();

router.post("/chat", chat);
router.post("/estimate-food", estimateFood);

module.exports = router;
