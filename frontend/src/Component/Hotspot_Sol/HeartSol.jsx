import React, { useState } from 'react';
import RegionFilter from '../Common/RegionFilter';
import { getFilteredItemsForDisease } from '../../Data/deseasefood';


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
                    className="px-6 py-2 bg-[#c4a484] text-[#0f0e0d] font-bold rounded-lg hover:bg-[#e8d5b7] transition-colors"
                >
                    &larr; Back to Categories
                </button>
            </div>

            {/* 🧠 Heading */}
            <h1 className='text-5xl font-bold text-center mb-8 text-[#f0e8dc]'>
                {heading}
            </h1>
            
            {category !== "Exercises" && (
                <RegionFilter selectedRegion={selectedRegion} onSelectRegion={setSelectedRegion} />
            )}

            {/* 📦 Items Grid */}
            <div className='flex gap-4 flex-wrap justify-center'>
                {
                    itemsToDisplay.map((item) => (
                        <div key={item.key} className='flex flex-col items-center w-[140px] gap-2'>
                            
                            {/* 🖼 Image */}
                            <img
                                src={`/food-images/${item.key}.jpg`}
                                onError={(e) => { e.target.onerror = null; e.target.src="https://via.placeholder.com/120"; }}
                                alt={item.title}
                                className='h-[120px] w-[120px] object-cover rounded'
                            />

                            {/* 🏷 Title */}
                            <p className='text-sm text-center text-[rgba(240,232,220,0.8)]'>
                                {item.title}
                            </p>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default HeartSol;