const { pool } = require("./Db");

// @desc    Get calorie logs for a specific date
// @route   GET /api/calories
// @access  Private
const getCalorieLogs = async (req, res, next) => {
  try {
    const userId = req.user.id;
    // Default to current local date if not specified
    const { date } = req.query;
    
    let query = `
      SELECT id, food_name, calories, protein, carbs, fat, quantity, log_date 
      FROM calorie_logs 
      WHERE user_id = $1 AND log_date = $2 
      ORDER BY created_at ASC
    `;
    
    const targetDate = date || new Date().toISOString().split('T')[0];
    const result = await pool.query(query, [userId, targetDate]);

    res.status(200).json({
      success: true,
      date: targetDate,
      logs: result.rows
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add a calorie log entry
// @route   POST /api/calories
// @access  Private
const createCalorieLog = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { food_name, calories, protein, carbs, fat, quantity, date } = req.body;

    if (!food_name || calories === undefined) {
      return res.status(400).json({
        success: false,
        message: "Food name and calories are required."
      });
    }

    const logDate = date || new Date().toISOString().split('T')[0];

    const result = await pool.query(
      `INSERT INTO calorie_logs (user_id, food_name, calories, protein, carbs, fat, quantity, log_date) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [
        userId,
        food_name,
        parseInt(calories, 10),
        parseFloat(protein) || 0,
        parseFloat(carbs) || 0,
        parseFloat(fat) || 0,
        parseFloat(quantity) || 1.0,
        logDate
      ]
    );

    res.status(201).json({
      success: true,
      log: result.rows[0]
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a calorie log entry
// @route   DELETE /api/calories/:id
// @access  Private
const deleteCalorieLog = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const logId = req.params.id;

    // Check if the log belongs to this user
    const checkRes = await pool.query(
      "SELECT id FROM calorie_logs WHERE id = $1 AND user_id = $2",
      [logId, userId]
    );

    if (checkRes.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Log entry not found or unauthorized."
      });
    }

    await pool.query("DELETE FROM calorie_logs WHERE id = $1", [logId]);

    res.status(200).json({
      success: true,
      message: "Log entry deleted successfully."
    });
  } catch (error) {
    next(error);
  }
};

const updateCalorieLog = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const logId = req.params.id;
    const { food_name, calories, protein, carbs, fat, quantity, date } = req.body;

    if (!food_name || calories === undefined) {
      return res.status(400).json({
        success: false,
        message: "Food name and calories are required."
      });
    }

    const logDate = date || new Date().toISOString().split('T')[0];

    const result = await pool.query(
      `UPDATE calorie_logs SET 
        food_name = $1, 
        calories = $2, 
        protein = $3, 
        carbs = $4, 
        fat = $5, 
        quantity = $6, 
        log_date = $7 
      WHERE id = $8 AND user_id = $9 RETURNING *`,
      [
        food_name,
        parseInt(calories, 10),
        parseFloat(protein) || 0,
        parseFloat(carbs) || 0,
        parseFloat(fat) || 0,
        parseFloat(quantity) || 1.0,
        logDate,
        logId,
        userId
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Log entry not found or unauthorized."
      });
    }

    res.status(200).json({
      success: true,
      log: result.rows[0],
      message: "Log entry updated successfully."
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getCalorieLogs, createCalorieLog, deleteCalorieLog, updateCalorieLog };
