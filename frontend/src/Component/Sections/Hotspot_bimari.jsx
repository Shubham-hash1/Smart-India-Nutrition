import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Card from "../Hotspot/Card";

import ObesityImg from "../../Images/Obesity.jpg";
import StomachImg from "../../Images/Stomach.jpg";
import heartImg from "../../Images/heart.webp";
import nutrtional from "../../Images/nutritional.jpg";
import SugarImg from "../../Images/Sugar.jpg";

const diseaseData = [
  { image: ObesityImg, title: "Obesity",                 
     description: "Excessive body fat increasing health risks.",      
     route: "/obesity"     
    },
  { image: SugarImg,   title: "Diabetes",                 
    description: "Chronic condition causing high blood sugar.",       
    route: "/Diabetes"    },
  { image: heartImg,   title: "Heart",                    
    description: "Conditions affecting heart function.",             
    route: "/Heart"       },
  {
     image: StomachImg, title: "Stomach",                  
    description: "Digestive problems causing discomfort.",            
    route: "/Stomach"     
  },
  { 
    image: nutrtional, title: "Nutritional Deficiencies", 
    description: "Lack of essential nutrients affecting body.",       
    route: "/Nutritional" 
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

/*
  Clinical slide-in: cards shoot in from left or right depending on index.
  No rotation — sharp, direct, urgent feeling.
*/
const cardVariants = {
  hidden: (i) => ({
    opacity: 0,
    x: i % 2 === 0 ? -60 : 60,
    scale: 0.92,
    filter: "blur(8px)",
  }),
  visible: (i) => ({
    opacity: 1,
    x: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.75,
      ease: [0.23, 1, 0.32, 1],
      delay: i * 0.09,
    },
  }),
};

const Hotspot_bimari = () => {
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
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500&display=swap');`}</style>

      <div style={{ position: "absolute", top: "-120px", left: "50%", transform: "translateX(-50%)", width: "600px", height: "360px", background: "radial-gradient(ellipse, rgba(232,120,120,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: 0, right: "-180px", width: "480px", height: "480px", background: "radial-gradient(ellipse, rgba(124,184,232,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
        style={{ textAlign: "center", marginBottom: "64px" }}
      >
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(36px, 6vw, 50px)",
          fontWeight: 900, color: "#f0e8dc",
          margin: 0, lineHeight: 1.05, letterSpacing: "-0.02em",
        }}>
          Know the{" "}
          <span style={{ fontStyle: "italic", color: "#e87c7c" }}>Risks,</span>
          <br />
          Guard Your{" "}
          <span style={{ fontStyle: "italic", color: "#7cb8e8" }}>Health</span>
        </h1>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          style={{ width: "60px", height: "1px", background: "linear-gradient(90deg, transparent, #e87c7c, transparent)", margin: "24px auto 0", transformOrigin: "center" }}
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
        {diseaseData.map((item, index) => (
          <motion.div key={index} custom={index} variants={cardVariants}>
            <Card
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

export default Hotspot_bimari;