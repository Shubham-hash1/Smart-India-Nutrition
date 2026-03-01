import React from "react";
import Card1 from "./Card1";
import Card2 from "./Card2";
import Card3 from "./Card3";
import Card4 from "./Card4";
import Card5 from "./Card5";

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
        image="https://www.clinico.in/wp-content/uploads/2022/02/Clinico-Blog-Post-Option-21.jpg"
        title="Obesity"
        description="Obesity is excessive body fat increasing health risks."
      />

      <Card2
        image="https://diabetesandwellnessclinic.com/wp-content/uploads/elementor/thumbs/dr-10-r014h9ihul3bas6xel1k5jnwgtme6c0me5q8a8dngg.jpg"
        title="Diabetes"
        description="Chronic condition causing high blood sugar."
      />

      <Card3
        image="https://www.epa.gov/system/files/styles/medium/private/images/2021-09/2.jpg"
        title="Heart"
        description="Conditions affecting heart function."
      />

      <Card4
        image="https://www.neoalta.com/images/easyblog_articles/82/Stomach-Ache-and-Abdominal-Pain-1.jpg"
        title="Stomach"
        description="Digestive problems causing discomfort."
      />

      <Card5
        image="https://images.news18.com/ibnlive/uploads/2025/07/Nutritional-deficiencies_1-2025-07.jpg"
        title="Nutritional Deficiencies"
        description="Lack of essential nutrients affecting body."
      />
    </div>
  );
};

export default Hotspot_bimari;