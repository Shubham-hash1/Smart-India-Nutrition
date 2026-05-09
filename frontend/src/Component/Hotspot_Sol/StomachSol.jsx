import React, { useState } from 'react';
import RegionFilter from '../Common/RegionFilter';
import { getFilteredItemsForDisease } from '../../Data/deseasefood';

// ✅ AUTO IMPORT (only this, no manual map)
const imageModules = import.meta.glob('/src/Images/stomach/*.jpg', { eager: true });
const imageMap = {};

Object.entries(imageModules).forEach(([path, module]) => {
  const name = path.split('/').pop().split('.')[0];
  imageMap[name] = module.default;
});

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
                        <div key={index} className='flex flex-col items-center w-[140px] gap-2'>
                            <img
                                src={imageMap[item.key] ?? "https://via.placeholder.com/120"}
                                alt={item.title}
                                className='h-[120px] w-[120px] object-cover rounded'
                            />
                            <p className='text-sm text-center text-[rgba(240,232,220,0.8)]'>{item.title}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default StomachSol;