const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const { connectDB } = require("./src/Db");
const authRoutes = require("./src/AuthRoutes");
const blogRoutes = require("./src/BlogRoutes");
const aiRoutes = require("./src/AiRoutes");
const foodRoutes = require("./src/FoodRoutes");
const calorieRoutes = require("./src/CalorieRoutes");

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/foods", foodRoutes);
app.use("/api/calories", calorieRoutes);

app.get("/", (req, res) => res.json({ message: "🌿 NutriSmart API running" }));

// Simple error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Server error",
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

connectDB();

module.exports = app;