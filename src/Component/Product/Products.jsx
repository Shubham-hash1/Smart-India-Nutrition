import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ProductSection from "./ProductSection";
import { healthProducts, snacks, juices } from "../Data/Product";

const sections = [
  { title: "Health Products",             accent: "#4ade80", items: healthProducts },
  { title: "Healthy Snack Alternatives",  accent: "#f59e0b", items: snacks         },
  { title: "Healthy Juice Alternatives",  accent: "#7cb8e8", items: juices         },
];

const Products = () => {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        background: "#080706",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,800&family=DM+Sans:wght@300;400;500&display=swap');`}</style>

      {/* ── Page header ── */}
      <div
        ref={headerRef}
        style={{
          position: "relative",
          padding: "80px 24px 60px",
          textAlign: "center",
          overflow: "hidden",
        }}
      >
        {/* Ambient orb */}
        <div style={{
          position: "absolute", top: "-100px", left: "50%", transform: "translateX(-50%)",
          width: "600px", height: "300px",
          background: "radial-gradient(ellipse, rgba(34,197,94,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.35em" }}
          animate={headerInView ? { opacity: 1, letterSpacing: "0.2em" } : {}}
          transition={{ duration: 1, delay: 0.1 }}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "11px", fontWeight: 500,
            color: "#4ade80", textTransform: "uppercase",
            letterSpacing: "0.2em", marginBottom: "18px",
          }}
        >
          Our Collection
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(38px, 6vw, 64px)",
            fontWeight: 900, color: "#f0e8dc",
            margin: 0, lineHeight: 1.05, letterSpacing: "-0.02em",
          }}
        >
          Nourish Your{" "}
          <span style={{ fontStyle: "italic", color: "#4ade80" }}>Body</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
          style={{
            marginTop: "16px",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "clamp(14px, 1.8vw, 17px)",
            color: "rgba(240,232,220,0.42)",
            maxWidth: "440px", margin: "16px auto 0",
            lineHeight: 1.7, fontWeight: 300,
          }}
        >
          Carefully curated wellness products for every stage of your health journey.
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={headerInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.55, ease: "easeOut" }}
          style={{
            width: "60px", height: "1px",
            background: "linear-gradient(90deg, transparent, #4ade80, transparent)",
            margin: "28px auto 0", transformOrigin: "center",
          }}
        />
      </div>

      {/* ── Product sections ── */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px 100px", display: "flex", flexDirection: "column", gap: "80px" }}>
        {sections.map((section, i) => (
          <ProductSection
            key={section.title}
            title={section.title}
            accent={section.accent}
            items={section.items}
            index={i}
          />
        ))}
      </div>
    </div>
  );
};

export default Products;