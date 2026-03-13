import React from "react";
import Card1 from "./Card1";
import Card2 from "./Card2";
import Card3 from "./Card3";
import Card4 from "./Card4";
import Card5 from "./Card5";
import ObesityImg from '../../Images/Obesity.jpg'
import StomachImg from '../../Images/Stomach.jpg'
import heartImg from '../../Images/heart.webp'
import nutrtional from '../../Images/nutritional.jpg'
import SugarImg from '../../Images/Sugar.jpg'



const Hotspot_bimari = () => {
  return (
    <div
      className="
        max-w-screen-xl
        mx-auto
        px-4
        py-10
        grid
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
        gap-8
        place-items-center
      "
    >
      <Card1
        image={ObesityImg}
        title="Obesity"
        description="Obesity is excessive body fat increasing health risks."
      />

      <Card2
        image={ObesityImg}
        title="Diabetes"
        description="Chronic condition causing high blood sugar."
      />

      <Card3
        image={heartImg}
        title="Heart"
        description="Conditions affecting heart function."
      />

      <Card4
        image={StomachImg}
        title="Stomach"
        description="Digestive problems causing discomfort."
      />

      <Card5
        image={nutrtional}
        title="Nutritional Deficiencies"
        description="Lack of essential nutrients affecting body."
      />
    </div>
  );
};

export default Hotspot_bimari;