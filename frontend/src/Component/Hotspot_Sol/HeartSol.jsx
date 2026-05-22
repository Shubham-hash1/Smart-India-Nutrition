import React, { useState } from 'react';
import RegionFilter from '../Common/RegionFilter';
import { getFilteredItemsForDisease } from '../../Data/deseasefood';
import FoodCard from '../Common/FoodCard';

const HeartSol = ({ category, onBack }) => {
    const [selectedRegion, setSelectedRegion] = useState("All India");

    let heading = "";

    if (category?.toLowerCase() === "exercises") {
        heading = "Exercises you should do";
    } else if (category) {
        heading = `Foods for ${category}`;
    }

    if (!category) return null;

    const itemsToDisplay = getFilteredItemsForDisease("Heart", category, selectedRegion);

    return (
        <div className='m-2.5'>
            
            {/* 🔙 Back Button */}
            <div className="flex justify-center mb-8">
                <button 
                    onClick={onBack}
                    className="px-6 py-2 bg-[#3b82f6] text-[#ffffff] font-bold rounded-lg hover:bg-[#bfdbfe] transition-colors"
                >
                    &larr; Back to Categories
                </button>
            </div>

            {/* 🧠 Heading */}
            <h1 className='text-5xl font-bold text-center mb-8 text-[#1f2937]'>
                {heading}
            </h1>
            
            {category !== "Exercises" && (
                <RegionFilter selectedRegion={selectedRegion} onSelectRegion={setSelectedRegion} />
            )}

            {/* 📦 Items Grid */}
            <div className='flex gap-4 flex-wrap justify-center'>
                {
                    itemsToDisplay.map((item, index) => (
                        <FoodCard key={index} item={item} isExercise={category === "Exercises" || category === "Exercise"} />
                    ))
                }
            </div>
        </div>
    );
};

export default HeartSol;