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
  { image: ObesityImg, title: "Obesity",      description: "Excessive body fat increasing health risks.",      route: "/obesity"     },
  { image: SugarImg,   title: "Diabetes",     description: "Chronic condition causing high blood sugar.",       route: "/Diabetes"    },
  { image: heartImg,   title: "Heart",        description: "Conditions affecting heart function.",              route: "/Heart"       },
  { image: StomachImg, title: "Stomach",      description: "Digestive problems causing discomfort.",            route: "/Stomach"     },
  { image: nutrtional, title: "Nutritional Deficiencies", description: "Lack of essential nutrients affecting body.", route: "/Nutritional" },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.11, delayChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 52, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] },
  },
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

      {/* Ambient orbs */}
      <div style={{ position: "absolute", top: "-120px", left: "50%", transform: "translateX(-50%)", width: "600px", height: "360px", background: "radial-gradient(ellipse, rgba(232,120,120,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: 0, right: "-180px", width: "480px", height: "480px", background: "radial-gradient(ellipse, rgba(124,184,232,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
        style={{ textAlign: "center", marginBottom: "64px" }}
      >
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.35em" }}
          animate={isInView ? { opacity: 1, letterSpacing: "0.22em" } : {}}
          transition={{ duration: 1, delay: 0.1 }}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "11px",
            fontWeight: 500,
            color: "#e87c7c",
            textTransform: "uppercase",
            letterSpacing: "0.22em",
            marginBottom: "18px",
          }}
        >
          Health Hotspots
        </motion.p>

        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(36px, 6vw, 68px)",
            fontWeight: 900,
            color: "#f0e8dc",
            margin: 0,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
          }}
        >
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
          style={{
            width: "60px",
            height: "1px",
            background: "linear-gradient(90deg, transparent, #e87c7c, transparent)",
            margin: "24px auto 0",
            transformOrigin: "center",
          }}
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
          gap: "20px",
          maxWidth: "1280px",
          margin: "0 auto",
        }}
      >
        {diseaseData.map((item, index) => (
          <motion.div key={index} variants={cardVariants}>
            <Card
              image={item.image}
              title={item.title}
              description={item.description}
              onClick={() => navigate(item.route)}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Footer note */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 1.1 }}
        style={{
          textAlign: "center",
          marginTop: "64px",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "13px",
          color: "rgba(240,232,220,0.22)",
          letterSpacing: "0.04em",
        }}
      >
        Select a condition to explore symptoms, causes & prevention
      </motion.p>
    </section>
  );
};

export default Hotspot_bimari;