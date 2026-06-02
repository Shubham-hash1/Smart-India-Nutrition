import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const getNutritionInfo = (title) => {
    return {
        calories: Math.floor(title.length * 12 + 40) + " kcal",
        protein: Math.floor(title.length * 1.2) + "g",
        carbs: Math.floor(title.length * 2.0) + "g",
        fat: Math.floor(title.length * 0.4) + "g",
    };
};

const resolveFoodImage = (itemKey) => {
    if (!itemKey) return "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=120&q=60";
    
    const key = itemKey.toLowerCase().trim();
    
    // Explicit manual mappings for key mismatches to existing public images
    const manualMapping = {
        // West
        "sprouted_chana_west": "sprouted_chana_west.png",
        "besan_chilla_west": "besan_chilla.jpg",
        "daal_baati_west": "daal_baati.png",
        "mango_west": "alphonso_mango.jpg",
        "chickoo_west": "chickoo.jpg",
        "custard_apple_west": "custard_apple.jpg",
        "shira_west": "shira_west.jpg",
        "bajra_roti_west": "bajra_roti.jpg",
        "thepla_west": "thepla.jpg",
        "ragda_west": "white_peas.jpg",
        "peanuts_west": "peanuts.jpg",
        "cashews_west": "cashew.jpg",
        "dates_west": "dates.jpg",
        
        // East
        "prawn_east": "prawn_east.png",
        "fish_stew_east": "fish_stew_east.png",
        "roasted_chhena_east": "roasted_chhena_east.png",
        "bamboo_shoot_east": "bamboo_shoot.jpg",
        "banana_flower_east": "banana_flower.jpg",
        "litchi_east": "litchi.jpg",
        "poppy_seeds_east": "poppy_seeds.jpg",
        "muri_upma_east": "muri_east.jpg",
        "litti_east": "litti_east.png",
        
        // South
        "ellu_podi_south": "ellu.jpg",
        "sambar_dal_south": "sambar_dal_south.png",
        "urad_dal_south": "kootu_south.jpg",
        "kollu_sundal_south": "kollu_sundal_south.png",
        "coconut_south": "coconut.jpg",
        "tamarind_south": "tamarind.jpg",
        "cardamom_south": "cardamom.jpg",
        "curry_tea_south": "curry_leaves_tea.jpg",
        "dosa_south": "dosa_south.png",
        
        // North
        "paneer_north": "paneer.jpg",
        "moong_dal_north": "moong_dal_north.png",
        "rajma_north": "rajma_north.png",
        "roasted_chana_north": "roasted_chana_north.png",
        "spinach_north": "spinach.jpg",
        "carrot_north": "carrot.jpg",
        "roti_north": "roti.jpg",
        "suji_north": "suji_halwa_north.jpg",
        "almonds_north": "almonds.jpg",
        "walnuts_north": "walnuts.jpg",
        "ajwain_water_north": "ajwain_water.jpg",
        "makki_roti_north": "makki_north.jpg",
        "mishri_water_north": "mishri_north.jpg",
    };
    
    if (manualMapping[key]) {
        return `/food-images/${manualMapping[key]}`;
    }
    
    return `/food-images/${itemKey}.jpg`;
};

const FoodCard = ({ item, isExercise, user, onEdit, onDelete }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const itemKey = item.food_key || item.key || "default";

    const [imgSrc, setImgSrc] = useState(() => resolveFoodImage(itemKey));
    const [fallbackStep, setFallbackStep] = useState(0);

    useEffect(() => {
        setImgSrc(resolveFoodImage(itemKey));
        setFallbackStep(0);
    }, [itemKey]);

    const handleImgError = () => {
        if (fallbackStep === 0) {
            // Step 1 fallback: Try stripping regional suffix
            const strippedKey = itemKey.replace(/_(west|east|south|north)$/i, "");
            if (strippedKey !== itemKey) {
                setImgSrc(`/food-images/${strippedKey}.jpg`);
                setFallbackStep(1);
                return;
            }
        }
        
        // Final fallback: generic Unsplash photo
        const defaultFallback = isExercise 
            ? "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=120&q=60"
            : "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=120&q=60";
            
        if (imgSrc !== defaultFallback) {
            setImgSrc(defaultFallback);
            setFallbackStep(2);
        }
    };
    
    // Exercises shouldn't have nutritional value.
    if (isExercise) {
        return (
            <div className='flex flex-col items-center w-[140px] gap-2 p-2 rounded-xl transition-all hover:bg-white/5 hover:-translate-y-1 hover:shadow-lg hover:shadow-green-500/10 cursor-pointer relative'>
                <div className="w-[120px] h-[120px] rounded-xl overflow-hidden shadow-md shadow-black/40 ring-1 ring-white/10 group relative">
                    <img
                        src={imgSrc}
                        onError={handleImgError}
                        alt={item.title}
                        className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-110'
                    />
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
                            src={imgSrc}
                            onError={handleImgError}
                            alt={item.title}
                            className='h-full w-full object-cover transition-transform duration-300 hover:scale-110'
                        />
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
