import React, { useState } from 'react';
import RegionFilter from '../Common/RegionFilter';
import { getRegionForFood } from '../../Data/regionalFoods';

import { getFilteredItemsForAge } from '../../Data/agefood';

const ToddlerSol = ({ category, onBack }) => {
    const [selectedRegion, setSelectedRegion] = useState("All India");

    let itemsToDisplay = [];
    let heading = "";

    if (category === "Exercises") {
        heading = "Exercises you should do";
    } else if (category) {
        heading = `Food you should take for ${category}`;
    }

    if (!category) return null;

    const filteredItems = getFilteredItemsForAge("Toddler", category, selectedRegion);

    return (
        <div className='m-2.5'>
            <div className="flex justify-center mb-8">
                <button 
                    onClick={onBack}
                    className="px-6 py-2 bg-[#c4a484] text-[#0f0e0d] font-bold rounded-lg hover:bg-[#e8d5b7] transition-colors"
                >
                    &larr; Back to Categories
                </button>
            </div>
            
            <h1 className='text-5xl font-bold text-center mb-8 text-[#f0e8dc]'>
                {heading}
            </h1>
            
            {category !== "Exercises" && (
                <RegionFilter selectedRegion={selectedRegion} onSelectRegion={setSelectedRegion} />
            )}

            <div className='flex gap-4 flex-wrap justify-center'>
                {
                    filteredItems.map((item, index) => (
                        <div key={index} className='flex flex-col items-center w-[140px] gap-2 p-2 rounded-xl transition-all hover:bg-white/5 hover:-translate-y-1 hover:shadow-lg hover:shadow-green-500/10 cursor-pointer'>
                            <div className="w-[120px] h-[120px] rounded-xl overflow-hidden shadow-md shadow-black/40 ring-1 ring-white/10 group">
                                <img
                                    src={`/food-images/${item.key}.jpg`}
                                    onError={(e) => {
                                        e.target.onerror = null; 
                                        e.target.src = "https://via.placeholder.com/120?text=No+Image";
                                    }}
                                    alt={item.title}
                                    className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-110'
                                />
                            </div>
                            <p className='text-sm text-center font-medium text-[rgba(240,232,220,0.9)]'>{item.title}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default ToddlerSol;