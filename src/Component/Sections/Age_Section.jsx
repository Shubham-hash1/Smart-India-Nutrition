import React from "react";
import Age from "../Acc_Age/Age";

import AdultImg from "../../Images/Adult.jpg"
import ChildImg from "../../Images/Child.jpg"
import OldageImg from "../../Images/Oldage.jpg"
import TeenImg from "../../Images/Teen.jpeg"
import TodlerImg from "../../Images/Todler.jpg"
import { Navigate, useNavigate } from "react-router-dom";



const Age_Section = () => {
  const navigate = useNavigate();

  const ageData = [
      {
        image: ChildImg,
        title: "Child",
        description: "Young child learning to walk, speak, and explore.",
        route: "/child"
      },
      {
        image: TodlerImg,
        title: "Toddler",
        description :"Growing stage focused on learning and play.",
        route: "/toddler"
      },
      {
        image: TeenImg,
        title: "Teenager",
        description: "Adolescent stage with rapid development.",
        route: "/teen"
      },
      {
        image: AdultImg,
        title: "Adult",
        description: "Mature stage with responsibilities and independence.",
        route: "/adult"
      },
      {
        image: OldageImg,
        title: "Old Age",
        description: "Later life stage with aging body and wisdom.",
        route: "/oldage"
      }
    ];

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
      {ageData.map((item, index) => (
        <Age
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

export default Age_Section;