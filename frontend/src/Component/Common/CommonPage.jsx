import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../Context/AuthContext';
import { useLanguage } from '../../Context/LanguageContext';
import FoodCard from './FoodCard';
import RegionFilter from './RegionFilter';

import carbsImg from "../../Images/commonNutritions/cabrohydrate.jpg";
import protienImg from "../../Images/commonNutritions/protien.jpg";
import vitaminImg from "../../Images/commonNutritions/vitamin.jpg";
import mineralsImg from "../../Images/commonNutritions/minerals.jpg";

const CommonPage = () => {
  const location = useLocation();
  const path = location.pathname.toLowerCase();
  const { user, token } = useAuth();
  const { t } = useLanguage();

  // Core navigation states
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState("All India");

  // Dynamic database foods states
  const [allFoods, setAllFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  // New food form states
  const [newFoodTitle, setNewFoodTitle] = useState('');
  const [newFoodRegion, setNewFoodRegion] = useState('Common');
  const [newFoodCalories, setNewFoodCalories] = useState('');
  const [newFoodProtein, setNewFoodProtein] = useState('');
  const [newFoodCarbs, setNewFoodCarbs] = useState('');
  const [newFoodFat, setNewFoodFat] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Edit food states
  const [editingFood, setEditingFood] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editFoodTitle, setEditFoodTitle] = useState('');
  const [editFoodRegion, setEditFoodRegion] = useState('Common');
  const [editFoodCalories, setEditFoodCalories] = useState('');
  const [editFoodProtein, setEditFoodProtein] = useState('');
  const [editFoodCarbs, setEditFoodCarbs] = useState('');
  const [editFoodFat, setEditFoodFat] = useState('');

  const handleOpenEdit = (food) => {
    setEditingFood(food);
    setEditFoodTitle(food.title);
    setEditFoodRegion(food.region || 'Common');
    setEditFoodCalories(food.calories || '');
    setEditFoodProtein(food.protein || '');
    setEditFoodCarbs(food.carbs || '');
    setEditFoodFat(food.fat || '');
    setShowEditModal(true);
  };

  const handleEditFoodSubmit = async (e) => {
    e.preventDefault();
    if (!editFoodTitle.trim() || !editingFood || isSubmitting) return;

    setIsSubmitting(true);
    const updatedFoodItem = {
      category_type: editingFood.category_type,
      target_name: editingFood.target_name,
      nutrient_type: editingFood.nutrient_type,
      title: editFoodTitle,
      region: editFoodRegion,
      calories: editFoodCalories ? parseInt(editFoodCalories, 10) : 120,
      protein: editFoodProtein ? parseFloat(editFoodProtein) : 4.0,
      carbs: editFoodCarbs ? parseFloat(editFoodCarbs) : 15.0,
      fat: editFoodFat ? parseFloat(editFoodFat) : 2.0,
      description: editingFood.description || ''
    };

    try {
      const res = await fetch(`https://nutrismart-backend-cm7b.onrender.com/api/foods/${editingFood.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedFoodItem)
      });
      const data = await res.json();
      if (data.success) {
        setAllFoods(allFoods.map(f => f.id === editingFood.id ? data.food : f));
        setShowEditModal(false);
        setEditingFood(null);
      } else {
        alert(data.message || "Failed to update food");
      }
    } catch (error) {
      console.error("Failed to update food record:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteFood = async (food) => {
    if (!window.confirm(`Are you sure you want to delete "${food.title}"?`)) return;
    try {
      const res = await fetch(`https://nutrismart-backend-cm7b.onrender.com/api/foods/${food.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (data.success) {
        setAllFoods(allFoods.filter(f => f.id !== food.id));
      } else {
        alert(data.message || "Failed to delete food");
      }
    } catch (error) {
      console.error("Failed to delete food record:", error);
    }
  };

  // Get active target (disease or age group) from pathname
  const getTargetParams = () => {
    if (path.includes("adult")) return { type: "age", name: "Adult" };
    if (path.includes("child")) return { type: "age", name: "Child" };
    if (path.includes("teen")) return { type: "age", name: "Teen" };
    if (path.includes("toddler")) return { type: "age", name: "Toddler" };
    if (path.includes("oldage")) return { type: "age", name: "OldAge" };

    if (path.includes("obesity")) return { type: "disease", name: "Obesity" };
    if (path.includes("diabetes")) return { type: "disease", name: "Diabetes" };
    if (path.includes("heart")) return { type: "disease", name: "Heart" };
    if (path.includes("stomach")) return { type: "disease", name: "Stomach" };
    if (path.includes("nutritional")) return { type: "disease", name: "Nutritional" };
    if (path.includes("hypertension")) return { type: "disease", name: "Hypertension" };
    if (path.includes("thyroid")) return { type: "disease", name: "Thyroid" };
    if (path.includes("pcod")) return { type: "disease", name: "PCOD / PCOS" };
    if (path.includes("liver")) return { type: "disease", name: "Liver Health" };
    
    return null;
  };

  const target = getTargetParams();

  useEffect(() => {
    fetchFoods();
  }, [path]);

  const fetchFoods = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://nutrismart-backend-cm7b.onrender.com/api/foods');
      const data = await res.json();
      if (data.success) {
        setAllFoods(data.foods);
      }
    } catch (error) {
      console.error("Failed to load dynamic foods from DB:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddFoodSubmit = async (e) => {
    e.preventDefault();
    if (!newFoodTitle.trim() || !target || isSubmitting) return;

    setIsSubmitting(true);
    const newFoodItem = {
      category_type: target.type,
      target_name: target.name,
      nutrient_type: selectedCategory,
      title: newFoodTitle,
      region: newFoodRegion,
      calories: newFoodCalories ? parseInt(newFoodCalories, 10) : 120,
      protein: newFoodProtein ? parseFloat(newFoodProtein) : 4.0,
      carbs: newFoodCarbs ? parseFloat(newFoodCarbs) : 15.0,
      fat: newFoodFat ? parseFloat(newFoodFat) : 2.0,
      description: ''
    };

    try {
      const res = await fetch('https://nutrismart-backend-cm7b.onrender.com/api/foods', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newFoodItem)
      });
      const data = await res.json();
      if (data.success) {
        setAllFoods([data.food, ...allFoods]);
        setNewFoodTitle('');
        setNewFoodCalories('');
        setNewFoodProtein('');
        setNewFoodCarbs('');
        setNewFoodFat('');
        setNewFoodRegion('Common');
        setShowAddModal(false);
      }
    } catch (error) {
      console.error("Failed to add food record:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!target) return <div className="p-8 text-center text-red-500">Error: Invalid Category.</div>;

  // Filter foods for this view
  const getFilteredItems = () => {
    if (!selectedCategory) return [];

    let filtered = allFoods.filter(f => 
      f.category_type === target.type && 
      f.target_name === target.name && 
      f.nutrient_type.toLowerCase() === selectedCategory.toLowerCase()
    );

    if (selectedCategory.toLowerCase() === "exercises") {
      return filtered;
    }

    return filtered.filter(f => {
      if (selectedRegion === "All India") return true;
      return f.region === selectedRegion || f.region === "Common";
    });
  };

  const currentItems = getFilteredItems();

  // If a category is active, render the Solutions Grid
  if (selectedCategory) {
    const isExercise = selectedCategory.toLowerCase() === "exercises";
    return (
      <div className="max-w-screen-xl mx-auto px-6 py-10" style={{ minHeight: "80vh" }}>
        
        {/* Back and Add controls */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px", flexWrap: "wrap", gap: "12px" }}>
          <button 
            onClick={() => setSelectedCategory(null)}
            className="px-6 py-2 bg-gray-500 text-white font-bold rounded-lg hover:bg-gray-600 transition-colors"
            style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}
          >
            &larr; {t("back")} to Categories
          </button>
          
          {user && (
            <button 
              onClick={() => setShowAddModal(true)}
              className="px-6 py-2 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 transition-colors"
              style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}
            >
              + Add dynamic recommendation
            </button>
          )}
        </div>

        <h1 className="text-4xl font-bold text-center mb-8 text-[var(--text-primary)]">
          {isExercise ? "Exercises suggested for " : "Recommended foods for "}{target.name} ({selectedCategory})
        </h1>

        {!isExercise && (
          <div className="mb-8">
            <RegionFilter selectedRegion={selectedRegion} onSelectRegion={setSelectedRegion} />
          </div>
        )}

        {loading ? (
          <div className="text-center py-20 text-[var(--text-secondary)]">{t("loading")}</div>
        ) : currentItems.length === 0 ? (
          <div className="text-center py-20 text-[var(--text-secondary)]">
            No recommendations logged yet. {user ? "Click '+ Add dynamic recommendation' to add one!" : "Register or log in to add foods!"}
          </div>
        ) : (
          <div className="flex gap-6 flex-wrap justify-center mt-10">
            {currentItems.map((item) => (
              <FoodCard 
                key={item.id} 
                item={item} 
                isExercise={isExercise} 
                user={user}
                onEdit={handleOpenEdit}
                onDelete={handleDeleteFood}
              />
            ))}
          </div>
        )}

        {/* Dynamic add food modal */}
        <AnimatePresence>
          {showAddModal && (
            <div style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(0, 0, 0, 0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 50,
              padding: "20px",
              boxSizing: "border-box"
            }}>
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                style={{
                  background: "var(--bg-primary)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "20px",
                  padding: "24px",
                  width: "100%",
                  maxWidth: "450px",
                  boxShadow: "0 10px 40px rgba(0,0,0,0.3)"
                }}
              >
                <h3 className="text-xl font-bold mb-4">Add Dynamic Recommendation</h3>
                <form onSubmit={handleAddFoodSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", color: "var(--text-secondary)", marginBottom: "4px" }}>Title *</label>
                    <input
                      type="text"
                      required
                      value={newFoodTitle}
                      onChange={(e) => setNewFoodTitle(e.target.value)}
                      placeholder="e.g. Green Tea / Almonds"
                      style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid var(--border-color)", background: "var(--bg-secondary)", color: "var(--text-primary)", boxSizing: "border-box" }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "12px", color: "var(--text-secondary)", marginBottom: "4px" }}>Region *</label>
                    <select
                      value={newFoodRegion}
                      onChange={(e) => setNewFoodRegion(e.target.value)}
                      style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid var(--border-color)", background: "var(--bg-secondary)", color: "var(--text-primary)" }}
                    >
                      <option value="Common">Common (All regions)</option>
                      <option value="North">North India</option>
                      <option value="South">South India</option>
                      <option value="East">East India</option>
                      <option value="West">West India</option>
                    </select>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "12px", color: "var(--text-secondary)", marginBottom: "4px" }}>Calories (kcal)</label>
                      <input
                        type="number"
                        value={newFoodCalories}
                        onChange={(e) => setNewFoodCalories(e.target.value)}
                        placeholder="120"
                        style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid var(--border-color)", background: "var(--bg-secondary)", color: "var(--text-primary)", boxSizing: "border-box" }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "12px", color: "var(--text-secondary)", marginBottom: "4px" }}>Protein (g)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={newFoodProtein}
                        onChange={(e) => setNewFoodProtein(e.target.value)}
                        placeholder="4.0"
                        style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid var(--border-color)", background: "var(--bg-secondary)", color: "var(--text-primary)", boxSizing: "border-box" }}
                      />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "12px", color: "var(--text-secondary)", marginBottom: "4px" }}>Carbs (g)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={newFoodCarbs}
                        onChange={(e) => setNewFoodCarbs(e.target.value)}
                        placeholder="15.0"
                        style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid var(--border-color)", background: "var(--bg-secondary)", color: "var(--text-primary)", boxSizing: "border-box" }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "12px", color: "var(--text-secondary)", marginBottom: "4px" }}>Fat (g)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={newFoodFat}
                        onChange={(e) => setNewFoodFat(e.target.value)}
                        placeholder="2.0"
                        style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid var(--border-color)", background: "var(--bg-secondary)", color: "var(--text-primary)", boxSizing: "border-box" }}
                      />
                    </div>
                  </div>

                  <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "10px" }}>
                    <button
                      type="button"
                      onClick={() => setShowAddModal(false)}
                      style={{ padding: "10px 20px", borderRadius: "8px", border: "1px solid var(--border-color)", background: "transparent", color: "var(--text-secondary)", cursor: "pointer" }}
                    >
                      {t("cancel")}
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      style={{ padding: "10px 24px", borderRadius: "8px", border: "none", background: "var(--accent-color)", color: "#ffffff", fontWeight: 750, cursor: "pointer" }}
                    >
                      {isSubmitting ? "Adding..." : t("save")}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Dynamic edit food modal */}
        <AnimatePresence>
          {showEditModal && (
            <div style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(0, 0, 0, 0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 50,
              padding: "20px",
              boxSizing: "border-box"
            }}>
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                style={{
                  background: "var(--bg-primary)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "20px",
                  padding: "24px",
                  width: "100%",
                  maxWidth: "450px",
                  boxShadow: "0 10px 40px rgba(0,0,0,0.3)"
                }}
              >
                <h3 className="text-xl font-bold mb-4">Edit Dynamic Recommendation</h3>
                <form onSubmit={handleEditFoodSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", color: "var(--text-secondary)", marginBottom: "4px" }}>Title *</label>
                    <input
                      type="text"
                      required
                      value={editFoodTitle}
                      onChange={(e) => setEditFoodTitle(e.target.value)}
                      placeholder="e.g. Green Tea / Almonds"
                      style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid var(--border-color)", background: "var(--bg-secondary)", color: "var(--text-primary)", boxSizing: "border-box" }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "12px", color: "var(--text-secondary)", marginBottom: "4px" }}>Region *</label>
                    <select
                      value={editFoodRegion}
                      onChange={(e) => setEditFoodRegion(e.target.value)}
                      style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid var(--border-color)", background: "var(--bg-secondary)", color: "var(--text-primary)" }}
                    >
                      <option value="Common">Common (All regions)</option>
                      <option value="North">North India</option>
                      <option value="South">South India</option>
                      <option value="East">East India</option>
                      <option value="West">West India</option>
                    </select>
                  </div>

                  {!isExercise && (
                    <>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                        <div>
                          <label style={{ display: "block", fontSize: "12px", color: "var(--text-secondary)", marginBottom: "4px" }}>Calories (kcal)</label>
                          <input
                            type="number"
                            value={editFoodCalories}
                            onChange={(e) => setEditFoodCalories(e.target.value)}
                            placeholder="120"
                            style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid var(--border-color)", background: "var(--bg-secondary)", color: "var(--text-primary)", boxSizing: "border-box" }}
                          />
                        </div>
                        <div>
                          <label style={{ display: "block", fontSize: "12px", color: "var(--text-secondary)", marginBottom: "4px" }}>Protein (g)</label>
                          <input
                            type="number"
                            step="0.1"
                            value={editFoodProtein}
                            onChange={(e) => setEditFoodProtein(e.target.value)}
                            placeholder="4.0"
                            style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid var(--border-color)", background: "var(--bg-secondary)", color: "var(--text-primary)", boxSizing: "border-box" }}
                          />
                        </div>
                      </div>

                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                        <div>
                          <label style={{ display: "block", fontSize: "12px", color: "var(--text-secondary)", marginBottom: "4px" }}>Carbs (g)</label>
                          <input
                            type="number"
                            step="0.1"
                            value={editFoodCarbs}
                            onChange={(e) => setEditFoodCarbs(e.target.value)}
                            placeholder="15.0"
                            style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid var(--border-color)", background: "var(--bg-secondary)", color: "var(--text-primary)", boxSizing: "border-box" }}
                          />
                        </div>
                        <div>
                          <label style={{ display: "block", fontSize: "12px", color: "var(--text-secondary)", marginBottom: "4px" }}>Fat (g)</label>
                          <input
                            type="number"
                            step="0.1"
                            value={editFoodFat}
                            onChange={(e) => setEditFoodFat(e.target.value)}
                            placeholder="2.0"
                            style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid var(--border-color)", background: "var(--bg-secondary)", color: "var(--text-primary)", boxSizing: "border-box" }}
                          />
                        </div>
                      </div>
                    </>
                  )}

                  <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "10px" }}>
                    <button
                      type="button"
                      onClick={() => { setShowEditModal(false); setEditingFood(null); }}
                      style={{ padding: "10px 20px", borderRadius: "8px", border: "1px solid var(--border-color)", background: "transparent", color: "var(--text-secondary)", cursor: "pointer" }}
                    >
                      {t("cancel")}
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      style={{ padding: "10px 24px", borderRadius: "8px", border: "none", background: "var(--accent-color)", color: "#ffffff", fontWeight: 750, cursor: "pointer" }}
                    >
                      {isSubmitting ? "Saving..." : t("save")}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    );
  }

  // ── Render Category Cards page ──
  const nutritionData = [
    {
      image: protienImg,
      title: "Proteins",
      description: "Build muscles and repair tissues"
    },
    {
      image: carbsImg,
      title: "Carbohydrates",
      description: "Main energy source"
    },
    {
      image: vitaminImg,
      title: "Vitamins",
      description: "Boost immunity"
    },
    {
      image: mineralsImg,
      title: "Minerals",
      description: "Strong bones and blood"
    },
    {
      image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=500&q=60",
      title: "Exercises",
      description: "Physical activities for well-being"
    }
  ];

  return (
    <div style={{ background: "var(--bg-primary)", color: "var(--text-primary)", minHeight: "80vh" }}>
      <div className="max-w-screen-xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-extrabold text-center mb-4">{target.name} Diet Care</h1>
        <p className="text-center text-[var(--text-secondary)] mb-12 max-w-lg mx-auto">
          Choose a nutritional category to view detailed food guides tailored specifically for {target.name} metabolic management.
        </p>
        
        <div className="flex flex-wrap justify-center gap-8">
          {nutritionData.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -6, boxShadow: "0 15px 30px var(--shadow-color)" }}
              onClick={() => setSelectedCategory(item.title)}
              style={{
                width: "220px",
                background: "var(--bg-secondary)",
                border: "1px solid var(--border-color)",
                borderRadius: "20px",
                overflow: "hidden",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column"
              }}
            >
              <div style={{ width: "100%", height: "140px", overflow: "hidden" }}>
                <img 
                  src={item.image} 
                  alt={item.title} 
                  style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                />
              </div>
              <div style={{ padding: "16px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <h3 style={{ fontSize: "16px", fontWeight: 700, margin: "0 0 6px 0" }}>{item.title}</h3>
                  <p style={{ fontSize: "12px", color: "var(--text-secondary)", margin: 0, lineHeight: 1.4 }}>
                    {item.description}
                  </p>
                </div>
                <span style={{ fontSize: "12px", color: "var(--accent-text)", fontWeight: 700, marginTop: "12px", display: "inline-block" }}>
                  View Foods &rarr;
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommonPage;