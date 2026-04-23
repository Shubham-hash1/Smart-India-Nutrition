import { motion } from "framer-motion";

const diseaseAccents = {
  Obesity: { color: "#e8a87c", glow: "rgba(232,168,124,0.3)" },
  Diabetes: { color: "#7cb8e8", glow: "rgba(124,184,232,0.3)" },
  Heart: { color: "#e87c7c", glow: "rgba(232,124,124,0.3)" },
  Stomach: { color: "#a8e87c", glow: "rgba(168,232,124,0.3)" },
  "Nutritional Deficiencies": { color: "#b87ce8", glow: "rgba(184,124,232,0.3)" },
};

const defaultAccent = { color: "#c4a484", glow: "rgba(196,164,132,0.3)" };

const Card = ({ image, title, description, onClick }) => {
  const accent = diseaseAccents[title] || defaultAccent;

  return (
    <motion.div
      onClick={onClick}
      whileHover="hover"
      initial="rest"
      animate="rest"
      style={{ cursor: "pointer", position: "relative", width: "100%" }}
    >
      {/* Glow blob */}
      <motion.div
        variants={{
          rest: { opacity: 0, scale: 0.85 },
          hover: { opacity: 1, scale: 1.12 },
        }}
        transition={{ duration: 0.45 }}
        style={{
          position: "absolute",
          inset: "-12px",
          borderRadius: "28px",
          background: `radial-gradient(ellipse at center, ${accent.glow} 0%, transparent 70%)`,
          filter: "blur(20px)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/* Card body */}
      <motion.div
        variants={{
          rest: { y: 0, boxShadow: "0 4px 28px rgba(0,0,0,0.4)" },
          hover: { y: -12, boxShadow: "0 28px 64px rgba(0,0,0,0.6)" },
        }}
        transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
        style={{
          position: "relative",
          zIndex: 1,
          borderRadius: "20px",
          overflow: "hidden",
          background: "#0d0c0b",
          border: "1px solid rgba(255,255,255,0.07)",
          height: "360px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Image */}
        <div style={{ position: "relative", flex: 1, overflow: "hidden" }}>
          <motion.img
            src={image}
            alt={title}
            variants={{
              rest: { scale: 1 },
              hover: { scale: 1.09 },
            }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to bottom, rgba(0,0,0,0.0) 40%, rgba(8,7,6,0.75) 100%)",
            }}
          />

          {/* Accent top-right pill */}
          <motion.div
            variants={{
              rest: { opacity: 0, x: 10 },
              hover: { opacity: 1, x: 0 },
            }}
            transition={{ duration: 0.3 }}
            style={{
              position: "absolute",
              top: "14px",
              right: "14px",
              padding: "4px 12px",
              borderRadius: "100px",
              background: "rgba(0,0,0,0.55)",
              backdropFilter: "blur(8px)",
              border: `1px solid ${accent.color}44`,
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "10px",
              fontWeight: 500,
              color: accent.color,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            View
          </motion.div>
        </div>

        {/* Text */}
        <div
          style={{
            padding: "18px 20px 20px",
            background: "#0d0c0b",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            flexShrink: 0,
          }}
        >
          {/* Accent bar */}
          <motion.div
            variants={{
              rest: { width: "24px" },
              hover: { width: "48px" },
            }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            style={{
              height: "2px",
              background: `linear-gradient(90deg, ${accent.color}, transparent)`,
              borderRadius: "2px",
              marginBottom: "10px",
            }}
          />

          <h3
            style={{
              margin: 0,
              fontFamily: "'Playfair Display', serif",
              fontSize: "20px",
              fontWeight: 700,
              color: "#f0e8dc",
              letterSpacing: "0.01em",
              lineHeight: 1.2,
            }}
          >
            {title}
          </h3>

          <p
            style={{
              margin: "7px 0 0",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "12.5px",
              color: "rgba(240,232,220,0.45)",
              lineHeight: 1.6,
            }}
          >
            {description}
          </p>

          {/* Explore CTA */}
          <motion.div
            variants={{
              rest: { opacity: 0, x: -6 },
              hover: { opacity: 1, x: 0 },
            }}
            transition={{ duration: 0.3, delay: 0.05 }}
            style={{
              marginTop: "12px",
              display: "flex",
              alignItems: "center",
              gap: "5px",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "11px",
              fontWeight: 500,
              color: accent.color,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Learn more
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke={accent.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Card;