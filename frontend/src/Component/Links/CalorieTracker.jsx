import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../Context/AuthContext';
import { useLanguage } from '../../Context/LanguageContext';

// Hardcoded fallback estimation database for common Indian & Western foods
const offlineFoodDb = {
  roti: { calories: 85, protein: 3.0, carbs: 18.0, fat: 0.5 },
  chapati: { calories: 85, protein: 3.0, carbs: 18.0, fat: 0.5 },
  rice: { calories: 130, protein: 2.5, carbs: 28.0, fat: 0.2 },
  dal: { calories: 100, protein: 7.0, carbs: 18.0, fat: 1.0 },
  oats: { calories: 150, protein: 5.0, carbs: 27.0, fat: 2.0 },
  paneer: { calories: 265, protein: 18.0, carbs: 1.2, fat: 20.0 },
  tofu: { calories: 76, protein: 8.0, carbs: 1.9, fat: 4.8 },
  idli: { calories: 40, protein: 1.5, carbs: 8.0, fat: 0.1 },
  dosa: { calories: 120, protein: 3.0, carbs: 25.0, fat: 2.0 },
  uttapam: { calories: 180, protein: 4.0, carbs: 35.0, fat: 3.0 },
  sattu: { calories: 160, protein: 10.0, carbs: 25.0, fat: 2.5 },
  litti_chokha: { calories: 280, protein: 8.0, carbs: 48.0, fat: 6.0 },
  liti_chaukha: { calories: 280, protein: 8.0, carbs: 48.0, fat: 6.0 },
  dal_baati_churma: { calories: 480, protein: 12.0, carbs: 64.0, fat: 19.0 },
  kafal: { calories: 50, protein: 0.5, carbs: 12.0, fat: 0.1 },
  hisalu: { calories: 55, protein: 0.6, carbs: 13.0, fat: 0.2 },
  hissar: { calories: 55, protein: 0.6, carbs: 13.0, fat: 0.2 },
  buransh: { calories: 45, protein: 0.2, carbs: 11.0, fat: 0.0 },
  burans: { calories: 45, protein: 0.2, carbs: 11.0, fat: 0.0 },
  apple: { calories: 52, protein: 0.3, carbs: 14.0, fat: 0.2 },
  banana: { calories: 89, protein: 1.1, carbs: 22.8, fat: 0.3 },
  milk: { calories: 62, protein: 3.2, carbs: 4.8, fat: 3.3 },
  egg: { calories: 78, protein: 6.3, carbs: 0.6, fat: 5.3 },
  salad: { calories: 25, protein: 1.0, carbs: 4.0, fat: 0.2 },
  chicken: { calories: 165, protein: 31.0, carbs: 0.0, fat: 3.6 }
};

const getOfflineEstimate = (foodName, qty) => {
  const normalized = foodName.toLowerCase().trim().replace(/[\s\-]+/g, '_');
  const found = offlineFoodDb[normalized];
  if (found) {
    return {
      calories: Math.round(found.calories * qty),
      protein: parseFloat((found.protein * qty).toFixed(1)),
      carbs: parseFloat((found.carbs * qty).toFixed(1)),
      fat: parseFloat((found.fat * qty).toFixed(1))
    };
  }
  // Fallback formula if not in local dictionary
  const baseCal = Math.min(300, Math.max(50, foodName.length * 12 + 40));
  return {
    calories: Math.round(baseCal * qty),
    protein: parseFloat((qty * (foodName.length * 0.4)).toFixed(1)),
    carbs: parseFloat((qty * (foodName.length * 1.5)).toFixed(1)),
    fat: parseFloat((qty * (foodName.length * 0.2)).toFixed(1))
  };
};

const CalorieTracker = () => {
  const { user, token } = useAuth();
  const { t } = useLanguage();

  // Core logs state
  const [logs, setLogs] = useState([]);
  const [foodsList, setFoodsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [estimating, setEstimating] = useState(false);

  // Daily target calorie goal
  const [targetCalories, setTargetCalories] = useState(() => {
    return parseInt(localStorage.getItem('calorie_target') || '2000', 10);
  });

  // BMR calculator form states
  const [gender, setGender] = useState('male');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [activity, setActivity] = useState('1.2');
  const [showCalculator, setShowCalculator] = useState(false);

  // Add meal form states
  const [foodName, setFoodName] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [selectedFoodId, setSelectedFoodId] = useState('');

  // Editing meal states
  const [editingLogId, setEditingLogId] = useState(null);
  const [editQuantity, setEditQuantity] = useState('1');

  // Date
  const [selectedDate, setSelectedDate] = useState(() => {
    return new Date().toISOString().split('T')[0];
  });

  // View-Only Mock Data for anonymous users
  const getMockLogs = () => [
    { id: 'mock-1', food_name: 'Moong Dal Khichdi', calories: 250, protein: 9.0, carbs: 45.0, fat: 3.0, quantity: 1.5, log_date: selectedDate },
    { id: 'mock-2', food_name: 'Apple', calories: 52, protein: 0.3, carbs: 14.0, fat: 0.2, quantity: 1.0, log_date: selectedDate },
    { id: 'mock-3', food_name: 'Kafal (Antioxidant Wild Berries)', calories: 50, protein: 0.5, carbs: 12.0, fat: 0.1, quantity: 2.0, log_date: selectedDate }
  ];

  useEffect(() => {
    fetchLogs();
    fetchFoods();
  }, [selectedDate, user]);

  const fetchFoods = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/foods');
      const data = await res.json();
      if (data.success) {
        setFoodsList(data.foods.filter(f => f.nutrient_type !== 'Exercises'));
      }
    } catch (error) {
      console.error("Failed to fetch foods list", error);
    }
  };

  const fetchLogs = async () => {
    setLoading(true);
    if (user) {
      try {
        const res = await fetch(`http://localhost:5000/api/calories?date=${selectedDate}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success) {
          setLogs(data.logs);
        }
      } catch (error) {
        console.error("Failed to fetch calorie logs", error);
      }
    } else {
      // Mock logs for view only mode
      setLogs(getMockLogs());
    }
    setLoading(false);
  };

  const handleCalculateBMR = (e) => {
    e.preventDefault();
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseFloat(age);
    const act = parseFloat(activity);

    if (!w || !h || !a) return;

    let bmr = 0;
    if (gender === 'male') {
      bmr = 88.362 + (13.397 * w) + (4.799 * h) - (5.677 * a);
    } else {
      bmr = 447.593 + (9.247 * w) + (3.098 * h) - (4.330 * a);
    }

    const tdee = Math.round(bmr * act);
    setTargetCalories(tdee);
    localStorage.setItem('calorie_target', tdee.toString());
    setShowCalculator(false);
  };

  const handleQuickFoodSelect = (e) => {
    const foodId = e.target.value;
    setSelectedFoodId(foodId);
    if (!foodId) return;

    const selectedFood = foodsList.find(f => f.id.toString() === foodId);
    if (selectedFood) {
      setFoodName(selectedFood.title);
    }
  };

  const handleAddMeal = async (e) => {
    e.preventDefault();
    if (!foodName || !user) return;

    const qtyVal = parseFloat(quantity) || 1.0;
    setEstimating(true);

    // 1. Resolve Calories and Macros
    let finalCalories = 0;
    let finalProtein = 0;
    let finalCarbs = 0;
    let finalFat = 0;

    // A. Check if matching in DB
    const dbMatch = foodsList.find(f => f.title.toLowerCase().trim() === foodName.toLowerCase().trim());
    if (dbMatch) {
      finalCalories = dbMatch.calories;
      finalProtein = dbMatch.protein;
      finalCarbs = dbMatch.carbs;
      finalFat = dbMatch.fat;
    } else {
      // B. Query Backend AI Estimator
      try {
        const aiRes = await fetch('http://localhost:5000/api/ai/estimate-food', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
          },
          body: JSON.stringify({ food_name: foodName, quantity: 1 }) // Estimate base values (qty=1)
        });
        const aiData = await aiRes.json();
        if (aiData.success && aiData.nutrition) {
          finalCalories = aiData.nutrition.calories;
          finalProtein = aiData.nutrition.protein;
          finalCarbs = aiData.nutrition.carbs;
          finalFat = aiData.nutrition.fat;
        } else {
          throw new Error("AI returned failure response");
        }
      } catch (err) {
        console.warn("AI estimation failed/unconfigured. Falling back to local dictionary.", err);
        // C. Local Dictionary Fallback
        const localEst = getOfflineEstimate(foodName, 1.0);
        finalCalories = localEst.calories;
        finalProtein = localEst.protein;
        finalCarbs = localEst.carbs;
        finalFat = localEst.fat;
      }
    }

    // Prepare Log record (Backend expects base values which are scaled by quantity in logs)
    const newLog = {
      food_name: foodName,
      calories: finalCalories,
      protein: finalProtein,
      carbs: finalCarbs,
      fat: finalFat,
      quantity: qtyVal,
      date: selectedDate
    };

    try {
      const res = await fetch('http://localhost:5000/api/calories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newLog)
      });
      const data = await res.json();
      if (data.success) {
        setLogs([...logs, data.log]);
      }
    } catch (error) {
      console.error("Failed to log calorie meal", error);
    } finally {
      setEstimating(false);
      setFoodName('');
      setQuantity('1');
      setSelectedFoodId('');
    }
  };

  const handleEditSubmit = async (e, log) => {
    e.preventDefault();
    if (!user) return;

    const newQty = parseFloat(editQuantity) || 1.0;

    try {
      const res = await fetch(`http://localhost:5000/api/calories/${log.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          food_name: log.food_name,
          calories: log.calories,
          protein: log.protein,
          carbs: log.carbs,
          fat: log.fat,
          quantity: newQty,
          date: selectedDate
        })
      });
      const data = await res.json();
      if (data.success) {
        setLogs(logs.map(l => l.id === log.id ? data.log : l));
        setEditingLogId(null);
      }
    } catch (error) {
      console.error("Failed to update log", error);
    }
  };

  const handleDeleteLog = async (id) => {
    if (!user) return;
    try {
      const res = await fetch(`http://localhost:5000/api/calories/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setLogs(logs.filter(log => log.id !== id));
      }
    } catch (error) {
      console.error("Failed to delete log", error);
    }
  };

  // Math totals
  const totalConsumed = logs.reduce((sum, log) => sum + (log.calories * log.quantity), 0);
  const totalProtein = logs.reduce((sum, log) => sum + ((log.protein || 0) * log.quantity), 0);
  const totalCarbs = logs.reduce((sum, log) => sum + ((log.carbs || 0) * log.quantity), 0);
  const totalFat = logs.reduce((sum, log) => sum + ((log.fat || 0) * log.quantity), 0);

  const remainingCalories = Math.max(0, targetCalories - totalConsumed);
  const percentConsumed = Math.min(100, (totalConsumed / targetCalories) * 100);

  // Macro target helpers
  const targetProtein = Math.round((targetCalories * 0.2) / 4);
  const targetCarbs = Math.round((targetCalories * 0.5) / 4);
  const targetFat = Math.round((targetCalories * 0.3) / 9);

  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--bg-primary)",
      color: "var(--text-primary)",
      padding: "80px 20px 40px",
      fontFamily: "'DM Sans', sans-serif",
      transition: "all 0.3s"
    }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        
        {/* Title Header */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h1 style={{ fontFamily: "'Inter', sans-serif", fontSize: "36px", fontWeight: 800, margin: 0 }}>
            🍳 {t("trackerTitle")}
          </h1>
          <p style={{ color: "var(--text-secondary)", marginTop: "8px", fontSize: "16px" }}>
            {t("trackerDesc")}
          </p>
          
          {/* Date Selector */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px", marginTop: "20px" }}>
            <button
              onClick={() => {
                const prev = new Date(selectedDate);
                prev.setDate(prev.getDate() - 1);
                setSelectedDate(prev.toISOString().split('T')[0]);
              }}
              style={{ padding: "6px 12px", border: "1px solid var(--border-color)", background: "var(--bg-secondary)", color: "var(--text-primary)", borderRadius: "8px", cursor: "pointer" }}
            >
              &larr;
            </button>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              style={{
                padding: "6px 12px",
                borderRadius: "8px",
                border: "1px solid var(--border-color)",
                background: "var(--bg-secondary)",
                color: "var(--text-primary)",
                fontFamily: "inherit",
                fontWeight: 600,
                outline: "none"
              }}
            />
            <button
              onClick={() => {
                const next = new Date(selectedDate);
                next.setDate(next.getDate() + 1);
                setSelectedDate(next.toISOString().split('T')[0]);
              }}
              style={{ padding: "6px 12px", border: "1px solid var(--border-color)", background: "var(--bg-secondary)", color: "var(--text-primary)", borderRadius: "8px", cursor: "pointer" }}
            >
              &rarr;
            </button>
          </div>
        </div>

        {/* Info Banner for Anonymous Users */}
        {!user && (
          <div style={{
            background: "rgba(239, 68, 68, 0.08)",
            border: "1px solid rgba(239, 68, 68, 0.2)",
            borderRadius: "16px",
            padding: "16px 20px",
            textAlign: "center",
            marginBottom: "30px",
            fontSize: "14px",
            color: "#ef4444",
            fontWeight: 500
          }}>
            ⚠️ **View-Only Mode**: Log in to calculate BMR, log meals, edit quantities, and delete logs. Showing simulated records below.
          </div>
        )}

        {/* Dashboard Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px", marginBottom: "40px" }}>
          
          {/* Circle Ring / Satiety card */}
          <div style={{
            background: "var(--bg-secondary)",
            border: "1px solid var(--border-color)",
            borderRadius: "24px",
            padding: "30px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 20px var(--shadow-color)"
          }}>
            <h3 style={{ margin: "0 0 20px 0", fontSize: "18px", fontWeight: 700 }}>Calories Summary</h3>
            <div style={{ position: "relative", width: "160px", height: "160px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              
              {/* SVG circular progress */}
              <svg width="160" height="160" style={{ transform: "rotate(-90deg)" }}>
                <circle cx="80" cy="80" r="70" stroke="var(--border-color)" strokeWidth="12" fill="transparent" />
                <motion.circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="var(--accent-color)"
                  strokeWidth="12"
                  fill="transparent"
                  strokeDasharray={440}
                  animate={{ strokeDashoffset: 440 - (440 * percentConsumed) / 100 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </svg>
              
              <div style={{ position: "absolute", textAlign: "center" }}>
                <span style={{ fontSize: "28px", fontWeight: 800 }}>{Math.round(totalConsumed)}</span>
                <p style={{ margin: 0, fontSize: "11px", color: "var(--text-secondary)", fontWeight: 500 }}>of {targetCalories} kcal</p>
              </div>
            </div>

            <div style={{ display: "flex", gap: "30px", marginTop: "24px", width: "100%", justifyContent: "space-around" }}>
              <div style={{ textAlign: "center" }}>
                <span style={{ fontSize: "14px", color: "var(--text-secondary)", fontWeight: 500 }}>{t("calRemaining")}</span>
                <h4 style={{ margin: "4px 0 0 0", fontSize: "18px", color: "var(--accent-text)", fontWeight: 800 }}>
                  {remainingCalories} <span style={{ fontSize: "11px" }}>kcal</span>
                </h4>
              </div>
              <div style={{ width: "1px", background: "var(--border-color)" }} />
              <div style={{ textAlign: "center" }}>
                <span style={{ fontSize: "14px", color: "var(--text-secondary)", fontWeight: 500 }}>Percentage</span>
                <h4 style={{ margin: "4px 0 0 0", fontSize: "18px", fontWeight: 800 }}>{Math.round(percentConsumed)}%</h4>
              </div>
            </div>

            {user && (
              <button
                onClick={() => setShowCalculator(!showCalculator)}
                style={{
                  marginTop: "20px",
                  background: "transparent",
                  border: "1px solid var(--border-color)",
                  color: "var(--text-secondary)",
                  padding: "8px 16px",
                  borderRadius: "8px",
                  fontSize: "12px",
                  fontWeight: 600,
                  cursor: "pointer"
                }}
              >
                ⚙️ Adjust Target / Calculate BMR
              </button>
            )}
          </div>

          {/* Macros Card */}
          <div style={{
            background: "var(--bg-secondary)",
            border: "1px solid var(--border-color)",
            borderRadius: "24px",
            padding: "30px",
            boxShadow: "0 4px 20px var(--shadow-color)"
          }}>
            <h3 style={{ margin: "0 0 24px 0", fontSize: "18px", fontWeight: 700 }}>Macronutrients</h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {/* Protein */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", fontWeight: 500, marginBottom: "6px" }}>
                  <span>🥩 Protein</span>
                  <span style={{ color: "var(--text-secondary)" }}>{Math.round(totalProtein)}g / {targetProtein}g</span>
                </div>
                <div style={{ height: "8px", background: "var(--border-color)", borderRadius: "4px", overflow: "hidden" }}>
                  <motion.div
                    style={{ height: "100%", background: "#f59e0b", borderRadius: "4px" }}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, (totalProtein / targetProtein) * 100)}%` }}
                    transition={{ duration: 0.6 }}
                  />
                </div>
              </div>

              {/* Carbs */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", fontWeight: 500, marginBottom: "6px" }}>
                  <span>🍞 Carbohydrates</span>
                  <span style={{ color: "var(--text-secondary)" }}>{Math.round(totalCarbs)}g / {targetCarbs}g</span>
                </div>
                <div style={{ height: "8px", background: "var(--border-color)", borderRadius: "4px", overflow: "hidden" }}>
                  <motion.div
                    style={{ height: "100%", background: "#3b82f6", borderRadius: "4px" }}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, (totalCarbs / targetCarbs) * 100)}%` }}
                    transition={{ duration: 0.6 }}
                  />
                </div>
              </div>

              {/* Fat */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", fontWeight: 500, marginBottom: "6px" }}>
                  <span>🥑 Fat</span>
                  <span style={{ color: "var(--text-secondary)" }}>{Math.round(totalFat)}g / {targetFat}g</span>
                </div>
                <div style={{ height: "8px", background: "var(--border-color)", borderRadius: "4px", overflow: "hidden" }}>
                  <motion.div
                    style={{ height: "100%", background: "#ef4444", borderRadius: "4px" }}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, (totalFat / targetFat) * 100)}%` }}
                    transition={{ duration: 0.6 }}
                  />
                </div>
              </div>
            </div>

            <div style={{ marginTop: "24px", padding: "12px", background: "var(--bg-primary)", border: "1px solid var(--border-color)", borderRadius: "12px", fontSize: "12px", color: "var(--text-secondary)", lineHeight: 1.5 }}>
              *Target macros are based on a balanced diet profile (50% Carb, 20% Protein, 30% Fat).
            </div>
          </div>
        </div>

        {/* BMR Calculator Form */}
        <AnimatePresence>
          {showCalculator && user && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              style={{
                background: "var(--bg-secondary)",
                border: "1px solid var(--border-color)",
                borderRadius: "24px",
                padding: "24px",
                marginBottom: "30px"
              }}
            >
              <h3 style={{ margin: "0 0 16px 0", fontSize: "18px" }}>BMR Calorie Goal Calculator</h3>
              <form onSubmit={handleCalculateBMR} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "6px" }}>{t("gender")}</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid var(--border-color)", background: "var(--bg-primary)", color: "var(--text-primary)" }}
                  >
                    <option value="male">{t("male")}</option>
                    <option value="female">{t("female")}</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "6px" }}>{t("weight")}</label>
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="e.g. 70"
                    required
                    style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid var(--border-color)", background: "var(--bg-primary)", color: "var(--text-primary)", boxSizing: "border-box" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "6px" }}>{t("height")}</label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="e.g. 175"
                    required
                    style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid var(--border-color)", background: "var(--bg-primary)", color: "var(--text-primary)", boxSizing: "border-box" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "6px" }}>{t("age")}</label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="e.g. 25"
                    required
                    style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid var(--border-color)", background: "var(--bg-primary)", color: "var(--text-primary)", boxSizing: "border-box" }}
                  />
                </div>
                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "6px" }}>{t("activity")}</label>
                  <select
                    value={activity}
                    onChange={(e) => setActivity(e.target.value)}
                    style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid var(--border-color)", background: "var(--bg-primary)", color: "var(--text-primary)" }}
                  >
                    <option value="1.2">{t("activitySedentary")}</option>
                    <option value="1.375">{t("activityLight")}</option>
                    <option value="1.55">{t("activityModerate")}</option>
                    <option value="1.725">{t("activityVery")}</option>
                  </select>
                </div>
                <div style={{ gridColumn: "1 / -1", display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "10px" }}>
                  <button
                    type="button"
                    onClick={() => setShowCalculator(false)}
                    style={{ padding: "10px 20px", borderRadius: "8px", border: "1px solid var(--border-color)", background: "transparent", color: "var(--text-secondary)", cursor: "pointer" }}
                  >
                    {t("cancel")}
                  </button>
                  <button
                    type="submit"
                    style={{ padding: "10px 24px", borderRadius: "8px", border: "none", background: "var(--accent-color)", color: "#ffffff", fontWeight: 750, cursor: "pointer" }}
                  >
                    {t("calcBtn")}
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Input/List Split Layout */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
          
          {/* Add Log Form */}
          <div style={{
            background: "var(--bg-secondary)",
            border: "1px solid var(--border-color)",
            borderRadius: "24px",
            padding: "24px",
            height: "fit-content"
          }}>
            <h3 style={{ margin: "0 0 20px 0", fontSize: "18px", fontWeight: 700 }}>{t("addMeal")}</h3>
            
            {user ? (
              <form onSubmit={handleAddMeal} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                
                {/* Quick Select Dropdown */}
                {foodsList.length > 0 && (
                  <div>
                    <label style={{ display: "block", fontSize: "12px", color: "var(--text-secondary)", marginBottom: "4px" }}>{t("quickAdd")}</label>
                    <select
                      value={selectedFoodId}
                      onChange={handleQuickFoodSelect}
                      style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid var(--border-color)", background: "var(--bg-primary)", color: "var(--text-primary)", fontSize: "13px" }}
                    >
                      <option value="">-- Choose Food from Database --</option>
                      {foodsList.map(food => (
                        <option key={food.id} value={food.id}>{food.title}</option>
                      ))}
                    </select>
                  </div>
                )}

                <div>
                  <label style={{ display: "block", fontSize: "12px", color: "var(--text-secondary)", marginBottom: "4px" }}>{t("foodName")} *</label>
                  <input
                    type="text"
                    required
                    value={foodName}
                    onChange={(e) => setFoodName(e.target.value)}
                    placeholder="e.g. Dosa / Oats / Kafal"
                    style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid var(--border-color)", background: "var(--bg-primary)", color: "var(--text-primary)", boxSizing: "border-box" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", color: "var(--text-secondary)", marginBottom: "4px" }}>{t("servings")} / Quantity *</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="1"
                    style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid var(--border-color)", background: "var(--bg-primary)", color: "var(--text-primary)", boxSizing: "border-box" }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={estimating}
                  style={{
                    marginTop: "10px",
                    background: "var(--accent-color)",
                    border: "none",
                    color: "#ffffff",
                    padding: "12px",
                    borderRadius: "8px",
                    fontSize: "14px",
                    fontWeight: 700,
                    cursor: "pointer",
                    opacity: estimating ? 0.7 : 1
                  }}
                >
                  {estimating ? "Estimating Nutrition via AI..." : "Log Meal"}
                </button>
              </form>
            ) : (
              <div style={{ textAlign: "center", padding: "20px 0", color: "var(--text-secondary)" }}>
                <p style={{ margin: "0 0 16px 0", fontSize: "14px" }}>Log in to record your daily meals, BMR levels, and calculate custom metrics.</p>
              </div>
            )}
          </div>

          {/* Today's Logs list */}
          <div style={{
            background: "var(--bg-secondary)",
            border: "1px solid var(--border-color)",
            borderRadius: "24px",
            padding: "24px",
            display: "flex",
            flexDirection: "column"
          }}>
            <h3 style={{ margin: "0 0 20px 0", fontSize: "18px", fontWeight: 700 }}>{t("todayMeals")}</h3>
            
            {loading ? (
              <div style={{ textAlign: "center", padding: "40px", color: "var(--text-secondary)" }}>{t("loading")}</div>
            ) : logs.length === 0 ? (
              <div style={{ textAlign: "center", padding: "40px", color: "var(--text-secondary)", fontSize: "14px" }}>
                {t("noMeals")}
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", overflowY: "auto", maxHeight: "380px", paddingRight: "4px" }}>
                {logs.map((log) => {
                  const logCalories = Math.round(log.calories * log.quantity);
                  const isEditing = editingLogId === log.id;

                  return (
                    <motion.div
                      key={log.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      style={{
                        background: "var(--bg-primary)",
                        border: "1px solid var(--border-color)",
                        padding: "12px 16px",
                        borderRadius: "14px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px"
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                          <h4 style={{ margin: 0, fontSize: "14px", fontWeight: 600 }}>{log.food_name}</h4>
                          <span style={{ fontSize: "11px", color: "var(--text-secondary)" }}>
                            Qty: {log.quantity}x | P: {Math.round(log.protein * log.quantity)}g, C: {Math.round(log.carbs * log.quantity)}g, F: {Math.round(log.fat * log.quantity)}g
                          </span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <span style={{ fontSize: "14px", fontWeight: 700 }}>{logCalories} kcal</span>
                          {user && (
                            <div style={{ display: "flex", gap: "4px" }}>
                              <button
                                onClick={() => {
                                  setEditingLogId(isEditing ? null : log.id);
                                  setEditQuantity(log.quantity.toString());
                                }}
                                style={{
                                  background: "transparent",
                                  border: "none",
                                  color: "var(--accent-text)",
                                  fontSize: "12px",
                                  cursor: "pointer",
                                  fontWeight: "bold"
                                }}
                              >
                                ✏️
                              </button>
                              <button
                                onClick={() => handleDeleteLog(log.id)}
                                style={{
                                  background: "rgba(239, 68, 68, 0.1)",
                                  border: "none",
                                  color: "#ef4444",
                                  width: "22px",
                                  height: "22px",
                                  borderRadius: "50%",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  fontSize: "11px",
                                  cursor: "pointer"
                                }}
                              >
                                &times;
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Editing panel */}
                      {isEditing && (
                        <form onSubmit={(e) => handleEditSubmit(e, log)} style={{ display: "flex", gap: "8px", alignItems: "center", borderTop: "1px dashed var(--border-color)", paddingTop: "8px", marginTop: "4px" }}>
                          <label style={{ fontSize: "11px", color: "var(--text-secondary)" }}>Change Qty:</label>
                          <input
                            type="number"
                            step="0.1"
                            value={editQuantity}
                            onChange={(e) => setEditQuantity(e.target.value)}
                            style={{
                              width: "60px",
                              padding: "4px 8px",
                              borderRadius: "6px",
                              border: "1px solid var(--border-color)",
                              background: "var(--bg-secondary)",
                              color: "var(--text-primary)",
                              fontSize: "12px"
                            }}
                            required
                          />
                          <button
                            type="submit"
                            style={{
                              padding: "4px 10px",
                              borderRadius: "6px",
                              border: "none",
                              background: "var(--accent-color)",
                              color: "#ffffff",
                              fontSize: "11px",
                              cursor: "pointer",
                              fontWeight: "bold"
                            }}
                          >
                            {t("save")}
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditingLogId(null)}
                            style={{
                              padding: "4px 10px",
                              borderRadius: "6px",
                              border: "1px solid var(--border-color)",
                              background: "transparent",
                              color: "var(--text-secondary)",
                              fontSize: "11px",
                              cursor: "pointer"
                            }}
                          >
                            {t("cancel")}
                          </button>
                        </form>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default CalorieTracker;
