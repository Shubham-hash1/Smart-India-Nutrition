import React, { useState } from 'react';
import { motion } from 'framer-motion';

const getNutritionInfo = (title) => {
    return {
        calories: Math.floor(title.length * 12 + 40) + " kcal",
        protein: Math.floor(title.length * 1.2) + "g",
        carbs: Math.floor(title.length * 2.0) + "g",
        fat: Math.floor(title.length * 0.4) + "g",
    };
};

const FoodCard = ({ item, isExercise, user, onEdit, onDelete }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const itemKey = item.food_key || item.key || "default";
    
    // Exercises shouldn't have nutritional value.
    if (isExercise) {
        return (
            <div className='flex flex-col items-center w-[140px] gap-2 p-2 rounded-xl transition-all hover:bg-white/5 hover:-translate-y-1 hover:shadow-lg hover:shadow-green-500/10 cursor-pointer relative'>
                <div className="w-[120px] h-[120px] rounded-xl overflow-hidden shadow-md shadow-black/40 ring-1 ring-white/10 group relative">
                    <img
                        src={`/food-images/${itemKey}.jpg`}
                        onError={(e) => {
                            e.target.onerror = null; 
                            e.target.src = "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=120&q=60";
                        }}
                        alt={item.title}
                        className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-110'
                    />
                    
                    {user && (
                        <div className="absolute top-1.5 right-1.5 flex gap-1 z-10">
                            <button
                                onClick={(e) => { e.stopPropagation(); onEdit(item); }}
                                style={{
                                    background: "rgba(255, 255, 255, 0.95)",
                                    border: "none",
                                    borderRadius: "50%",
                                    width: "22px",
                                    height: "22px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    cursor: "pointer",
                                    fontSize: "10px",
                                    boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
                                }}
                                title="Edit"
                            >
                                ✏️
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); onDelete(item); }}
                                style={{
                                    background: "rgba(255, 255, 255, 0.95)",
                                    border: "none",
                                    borderRadius: "50%",
                                    width: "22px",
                                    height: "22px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    cursor: "pointer",
                                    fontSize: "10px",
                                    boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
                                }}
                                title="Delete"
                            >
                                🗑️
                            </button>
                        </div>
                    )}
                </div>
                <p className='text-sm text-center font-medium text-[rgba(31,41,55,0.9)]'>{item.title}</p>
            </div>
        );
    }

    const nutrition = item.calories ? {
        calories: item.calories + " kcal",
        protein: item.protein + "g",
        carbs: item.carbs + "g",
        fat: item.fat + "g"
    } : getNutritionInfo(item.title);

    return (
        <div 
            className='relative w-[140px] h-[160px] cursor-pointer group'
            style={{ perspective: 1000 }}
            onClick={() => setIsFlipped(!isFlipped)}
        >
            <motion.div
                className="w-full h-full relative"
                style={{ transformStyle: "preserve-3d" }}
                initial={false}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
            >
                {/* Front Side */}
                <div 
                    className="absolute w-full h-full flex flex-col items-center gap-2 p-2 rounded-xl bg-transparent transition-all hover:shadow-lg hover:shadow-green-500/10"
                    style={{ backfaceVisibility: "hidden" }}
                >
                    <div className="w-[120px] h-[120px] rounded-xl overflow-hidden shadow-md shadow-black/40 ring-1 ring-white/10 relative">
                        <img
                            src={`/food-images/${itemKey}.jpg`}
                            onError={(e) => {
                                e.target.onerror = null; 
                                e.target.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=120&q=60";
                            }}
                            alt={item.title}
                            className='h-full w-full object-cover transition-transform duration-300 hover:scale-110'
                        />
                        
                        {user && (
                            <div className="absolute top-1.5 right-1.5 flex gap-1 z-10">
                                <button
                                    onClick={(e) => { e.stopPropagation(); onEdit(item); }}
                                    style={{
                                        background: "rgba(255, 255, 255, 0.95)",
                                        border: "none",
                                        borderRadius: "50%",
                                        width: "22px",
                                        height: "22px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        cursor: "pointer",
                                        fontSize: "10px",
                                        boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
                                    }}
                                    title="Edit"
                                >
                                    ✏️
                                </button>
                                <button
                                    onClick={(e) => { e.stopPropagation(); onDelete(item); }}
                                    style={{
                                        background: "rgba(255, 255, 255, 0.95)",
                                        border: "none",
                                        borderRadius: "50%",
                                        width: "22px",
                                        height: "22px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        cursor: "pointer",
                                        fontSize: "10px",
                                        boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
                                    }}
                                    title="Delete"
                                >
                                    🗑️
                                </button>
                            </div>
                        )}
                    </div>
                    <p className='text-sm text-center font-medium text-[rgba(31,41,55,0.9)]'>{item.title}</p>
                </div>

                {/* Back Side */}
                <div 
                    className="absolute w-full h-[140px] flex flex-col items-center justify-center p-3 rounded-xl bg-white shadow-md border border-green-200 top-2"
                    style={{ 
                        backfaceVisibility: "hidden", 
                        transform: "rotateY(180deg)",
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
                    }}
                >
                    <h3 className="text-sm font-bold text-green-700 mb-2 border-b border-green-200 w-full text-center pb-1">Nutrition</h3>
                    <div className="flex flex-col w-full text-xs gap-1 text-gray-700">
                        <div className="flex justify-between border-b border-gray-100 pb-1"><span>Cal:</span> <span className="font-semibold text-gray-900">{nutrition.calories}</span></div>
                        <div className="flex justify-between border-b border-gray-100 pb-1"><span>Pro:</span> <span className="font-semibold text-gray-900">{nutrition.protein}</span></div>
                        <div className="flex justify-between border-b border-gray-100 pb-1"><span>Carb:</span> <span className="font-semibold text-gray-900">{nutrition.carbs}</span></div>
                        <div className="flex justify-between"><span>Fat:</span> <span className="font-semibold text-gray-900">{nutrition.fat}</span></div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default FoodCard;
