const { pool } = require("./Db");

// @desc    Get all foods
// @route   GET /api/foods
// @access  Public
const getFoods = async (req, res, next) => {
  try {
    const result = await pool.query("SELECT * FROM foods ORDER BY created_at DESC");
    res.status(200).json({
      success: true,
      count: result.rows.length,
      foods: result.rows
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new food item
// @route   POST /api/foods
// @access  Private (Authenticated users)
const createFood = async (req, res, next) => {
  try {
    const {
      category_type, // 'disease' or 'age'
      target_name,   // e.g. 'Diabetes', 'Obesity', 'Toddler'
      nutrient_type, // 'Proteins', 'Vitamins', 'Carbohydrates', 'Minerals', 'Exercises'
      title,
      region,        // 'Common', 'North', 'South', 'East', 'West'
      calories,
      protein,
      carbs,
      fat,
      description
    } = req.body;

    if (!category_type || !target_name || !nutrient_type || !title) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields: category_type, target_name, nutrient_type, and title."
      });
    }

    // Auto-generate key from title
    const food_key = title.toLowerCase().trim().replace(/[^a-z0-9]+/g, '_').replace(/(^_+|_+$)/g, '');

    const result = await pool.query(
      `INSERT INTO foods (category_type, target_name, nutrient_type, title, food_key, region, calories, protein, carbs, fat, description) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
      [
        category_type,
        target_name,
        nutrient_type,
        title,
        food_key,
        region || 'Common',
        parseInt(calories, 10) || 0,
        parseFloat(protein) || 0,
        parseFloat(carbs) || 0,
        parseFloat(fat) || 0,
        description || ''
      ]
    );

    res.status(201).json({
      success: true,
      food: result.rows[0]
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a food item
// @route   DELETE /api/foods/:id
// @access  Private
const deleteFood = async (req, res, next) => {
  try {
    const foodId = req.params.id;
    const result = await pool.query("DELETE FROM foods WHERE id = $1 RETURNING id", [foodId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Food item not found." });
    }

    res.status(200).json({
      success: true,
      message: "Food item deleted successfully."
    });
  } catch (error) {
    next(error);
  }
};

const updateFood = async (req, res, next) => {
  try {
    const foodId = req.params.id;
    const {
      category_type,
      target_name,
      nutrient_type,
      title,
      region,
      calories,
      protein,
      carbs,
      fat,
      description
    } = req.body;

    if (!category_type || !target_name || !nutrient_type || !title) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields."
      });
    }

    const food_key = title.toLowerCase().trim().replace(/[^a-z0-9]+/g, '_').replace(/(^_+|_+$)/g, '');

    const result = await pool.query(
      `UPDATE foods SET 
        category_type = $1, 
        target_name = $2, 
        nutrient_type = $3, 
        title = $4, 
        food_key = $5, 
        region = $6, 
        calories = $7, 
        protein = $8, 
        carbs = $9, 
        fat = $10, 
        description = $11 
      WHERE id = $12 RETURNING *`,
      [
        category_type,
        target_name,
        nutrient_type,
        title,
        food_key,
        region || 'Common',
        parseInt(calories, 10) || 0,
        parseFloat(protein) || 0,
        parseFloat(carbs) || 0,
        parseFloat(fat) || 0,
        description || '',
        foodId
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Food item not found." });
    }

    res.status(200).json({
      success: true,
      food: result.rows[0],
      message: "Food item updated successfully."
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getFoods, createFood, deleteFood, updateFood };
