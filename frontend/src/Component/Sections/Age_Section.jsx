import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Age from "../Acc_Age/Age";

import AdultImg from "../../Images/Adult.jpg";
import ChildImg from "../../Images/Child.jpg";
import OldageImg from "../../Images/Oldage.jpg";
import TeenImg from "../../Images/Teen.jpeg";
import TodlerImg from "../../Images/Todler.jpg";

const ageData = [
  { image: ChildImg,  title: "Child",     description: "Young child learning to walk, speak, and explore.", route: "/child"   },
  { image: TodlerImg, title: "Toddler",   description: "Growing stage focused on learning and play.",        route: "/toddler" },
  { image: TeenImg,   title: "Teenager",  description: "Adolescent stage with rapid development.",           route: "/teen"    },
  { image: AdultImg,  title: "Adult",     description: "Mature stage with responsibilities and independence.", route: "/adult" },
  { image: OldageImg, title: "Old Age",   description: "Later life stage with aging body and wisdom.",       route: "/oldage"  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.2 } },
};

/*
  Polaroid drop: cards start small + tilted, spring-overshoot into place.
  Alternates tilt direction: even = tilt right, odd = tilt left.
*/
const cardVariants = {
  hidden: (i) => ({
    opacity: 0,
    scale: 0.72,
    rotate: i % 2 === 0 ? -6 : 6,
    y: 30,
    filter: "blur(5px)",
  }),
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    rotate: 0,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.85,
      ease: [0.34, 1.28, 0.64, 1], // spring overshoot
      delay: i * 0.07,
    },
  }),
};

const Age_Section = () => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      style={{
        minHeight: "100vh",
        background: "#080706",
        padding: "80px 24px 100px",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,800&family=DM+Sans:wght@300;400;500&display=swap');`}</style>

      <div style={{ position: "absolute", top: "-160px", left: "50%", transform: "translateX(-50%)", width: "700px", height: "400px", background: "radial-gradient(ellipse, rgba(196,164,132,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: 0, left: "-200px", width: "500px", height: "500px", background: "radial-gradient(ellipse, rgba(100,80,60,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
        style={{ textAlign: "center", marginBottom: "64px" }}
      >
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(38px, 6vw, 55px)",
          fontWeight: 900, color: "#f0e8dc",
          margin: 0, lineHeight: 1.05, letterSpacing: "-0.02em",
        }}>
          Every Stage,{" "}
          <span style={{ fontStyle: "italic", color: "#c4a484" }}>Every Story</span>
        </h1>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          style={{ width: "60px", height: "1px", background: "linear-gradient(90deg, transparent, #c4a484, transparent)", margin: "24px auto 0", transformOrigin: "center" }}
        />
      </motion.div>

      {/* Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px", maxWidth: "1280px", margin: "0 auto",
        }}
      >
        {ageData.map((item, index) => (
          <motion.div key={index} custom={index} variants={cardVariants}>
            <Age
              image={item.image}
              title={item.title}
              description={item.description}
              onClick={() => navigate(item.route)}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Age_Section;