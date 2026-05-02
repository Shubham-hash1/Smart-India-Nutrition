import React, { useState } from 'react';
import { useLocation } from "react-router-dom";

import Age from "../Acc_Age/Age";
import Card from "../Hotspot/Card";

import carbsImg from "../../Images/commonNutritions/cabrohydrate.jpg";
import protienImg from "../../Images/commonNutritions/protien.jpg";
import vitaminImg from "../../Images/commonNutritions/vitamin.jpg";
import mineralsImg from "../../Images/commonNutritions/minerals.jpg";

// Solution Components
import AdultSol from "../Acc_Age_Sol/AdultSol";
import ChildSol from "../Acc_Age_Sol/ChildSol";
import TeenSol from "../Acc_Age_Sol/TeenSol";
import ToddlerSol from "../Acc_Age_Sol/ToddlerSol";
import OldAgeSol from "../Acc_Age_Sol/OldAgeSol";

import ObesitySol from "../Hotspot_Sol/Obesitysol";
import DiabetesSol from "../Hotspot_Sol/DiabitesSol";
import HeartSol from "../Hotspot_Sol/HeartSol";
import StomachSol from "../Hotspot_Sol/StomachSol";
import NutritionalSol from "../Hotspot_Sol/NutritionalSol";

const CommonPage = () => {
  const location = useLocation();
  const path = location.pathname;

  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleBack = () => setSelectedCategory(null);

  if (selectedCategory) {
    if (path.includes("adult")) return <AdultSol category={selectedCategory} onBack={handleBack} />;
    if (path.includes("child")) return <ChildSol category={selectedCategory} onBack={handleBack} />;
    if (path.includes("teen")) return <TeenSol category={selectedCategory} onBack={handleBack} />;
    if (path.includes("toddler")) return <ToddlerSol category={selectedCategory} onBack={handleBack} />;
    if (path.includes("oldage")) return <OldAgeSol category={selectedCategory} onBack={handleBack} />;
    
    if (path.includes("obesity")) return <ObesitySol category={selectedCategory} onBack={handleBack} />;
    if (path.includes("diabetes")) return <DiabetesSol category={selectedCategory} onBack={handleBack} />;
    if (path.includes("heart")) return <HeartSol category={selectedCategory} onBack={handleBack} />;
    if (path.includes("stomach")) return <StomachSol category={selectedCategory} onBack={handleBack} />;
    if (path.includes("nutritional")) return <NutritionalSol category={selectedCategory} onBack={handleBack} />;
  }

  // 👉 Data
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
    <div className="max-w-screen-xl mx-auto px-4 py-10 flex flex-wrap justify-center gap-8">

      {nutritionData.map((item, index) => {
        const isAgeRoute = path.includes("adult") || path.includes("child") || path.includes("teen") || path.includes("toddler") || path.includes("oldage");
        
        return isAgeRoute ? (
          <Age
            key={index}
            image={item.image}
            title={item.title}
            description={item.description}
            onClick={() => setSelectedCategory(item.title)}
          />
        ) : (
          <Card
            key={index}
            image={item.image}
            title={item.title}
            description={item.description}
            onClick={() => setSelectedCategory(item.title)}
          />
        );
      })}

    </div>
  );
};

export default CommonPage;  