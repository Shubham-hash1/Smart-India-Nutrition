import React from "react";
import Card from "../Hotspot/Card"; // ✅ ONLY THIS

import ObesityImg from '../../Images/Obesity.jpg';
import StomachImg from '../../Images/Stomach.jpg';
import heartImg from '../../Images/heart.webp';
import nutrtional from '../../Images/nutritional.jpg';
import SugarImg from '../../Images/Sugar.jpg';

import { useNavigate } from "react-router-dom";

const Hotspot_bimari = () => {
  const navigate = useNavigate();

  // ✅ DATA instead of multiple components
  const diseaseData = [
    {
      image: ObesityImg,
      title: "Obesity",
      description: "Obesity is excessive body fat increasing health risks.",
      route: "/obesity"
    },
    {
      image: SugarImg,
      title: "Diabetes",
      description: "Chronic condition causing high blood sugar.",
      route: "/Diabetes"
    },
    {
      image: heartImg,
      title: "Heart",
      description: "Conditions affecting heart function.",
      route: "/Heart"
    },
    {
      image: StomachImg,
      title: "Stomach",
      description: "Digestive problems causing discomfort.",
      route: "/Stomach"
    },
    {
      image: nutrtional,
      title: "Nutritional Deficiencies",
      description: "Lack of essential nutrients affecting body.",
      route: "/Nutritional"
    }
  ];

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 place-items-center">
      
      {diseaseData.map((item, index) => (
        <Card
          key={index}
          image={item.image}
          title={item.title}
          description={item.description}
          onClick={() => navigate(item.route)}
        />
      ))}

    </div>
  );
};

export default Hotspot_bimari;