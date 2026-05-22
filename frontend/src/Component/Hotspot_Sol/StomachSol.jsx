import React, { useState } from 'react';
import RegionFilter from '../Common/RegionFilter';
import { getFilteredItemsForDisease } from '../../Data/deseasefood';
import FoodCard from '../Common/FoodCard';


const StomachSol = ({ category, onBack }) => {
    const [selectedRegion, setSelectedRegion] = useState("All India");

    let heading = "";

    if (category === "Exercises") {
        heading = "Exercise you should do";
    } else if (category) {
        heading = `Food you should take for ${category}`;
    }

    if (!category) return null;

    const filteredItems = getFilteredItemsForDisease("Stomach", category, selectedRegion);

    return (
        <div className='m-2.5'>
            <div className="flex justify-center mb-8">
                <button 
                    onClick={onBack}
                    className="px-6 py-2 bg-[#3b82f6] text-[#ffffff] font-bold rounded-lg hover:bg-[#bfdbfe] transition-colors"
                >
                    &larr; Back to Categories
                </button>
            </div>
            
            <h1 className='text-5xl font-bold text-center mb-8 text-[#1f2937]'>
                {heading}
            </h1>
            
            {category !== "Exercises" && (
                <RegionFilter selectedRegion={selectedRegion} onSelectRegion={setSelectedRegion} />
            )}

            <div className='flex gap-4 flex-wrap justify-center'>
                {
                    filteredItems.map((item, index) => (
                        <FoodCard key={index} item={item} isExercise={category === "Exercises" || category === "Exercise"} />
                    ))
                }
            </div>
        </div>
    )
}

export default StomachSol;