import React from 'react';
import { useLocation } from "react-router-dom";

import Age from "../Acc_Age/Age";
import Card from "../Hotspot/Card";

import carbsImg from "../../Images/commonNutritions/cabrohydrate.jpg";
import protienImg from "../../Images/commonNutritions/protien.jpg";
import vitaminImg from "../../Images/commonNutritions/vitamin.jpg";
import mineralsImg from "../../Images/commonNutritions/minerals.jpg";

const CommonPage = () => {
  const location = useLocation();

  // 👉 Detect route
  const path = location.pathname;

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
    }
  ];

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-10 flex flex-wrap justify-center gap-8">

      {nutritionData.map((item, index) => (
        path.includes("adult") || path.includes("child") ? (
          <Age
            key={index}
            image={item.image}
            title={item.title}
            description={item.description}
          />
        ) : (
          <Card
            key={index}
            image={item.image}
            title={item.title}
            description={item.description}
          />
        )
      ))}

    </div>
  );
};

export default CommonPage;