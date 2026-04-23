import { motion } from "framer-motion";

const Age = ({ image, title, description, onClick }) => {
  return (
    <motion.div
      onClick={onClick}
      whileHover="hover"
      initial="rest"
      animate="rest"
      style={{ cursor: "pointer", position: "relative", width: "100%" }}
    >
      {/* Glow blob behind card */}
      <motion.div
        variants={{
          rest: { opacity: 0, scale: 0.8 },
          hover: { opacity: 1, scale: 1.1 },
        }}
        transition={{ duration: 0.4 }}
        style={{
          position: "absolute",
          inset: "-10px",
          borderRadius: "28px",
          background: "radial-gradient(ellipse at center, rgba(196,164,132,0.35) 0%, transparent 70%)",
          filter: "blur(18px)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/* Card */}
      <motion.div
        variants={{
          rest: { y: 0, boxShadow: "0 4px 24px rgba(0,0,0,0.35)" },
          hover: { y: -10, boxShadow: "0 24px 60px rgba(0,0,0,0.55)" },
        }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        style={{
          position: "relative",
          zIndex: 1,
          borderRadius: "20px",
          overflow: "hidden",
          background: "#0f0e0d",
          border: "1px solid rgba(255,255,255,0.07)",
          height: "380px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Image container */}
        <div style={{ position: "relative", flex: "1", overflow: "hidden" }}>
          <motion.img
            src={image}
            alt={title}
            variants={{
              rest: { scale: 1 },
              hover: { scale: 1.08 },
            }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
          {/* Gradient overlay on image */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(10,9,8,0.7) 100%)",
            }}
          />

          {/* Age number watermark */}
          <motion.div
            variants={{
              rest: { opacity: 0.06 },
              hover: { opacity: 0.13 },
            }}
            style={{
              position: "absolute",
              top: "-10px",
              right: "12px",
              fontFamily: "'Playfair Display', serif",
              fontSize: "120px",
              fontWeight: 900,
              color: "#fff",
              lineHeight: 1,
              userSelect: "none",
              letterSpacing: "-4px",
            }}
          />
        </div>

        {/* Text section */}
        <div
          style={{
            padding: "20px 22px 22px",
            background: "#0f0e0d",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            flexShrink: 0,
          }}
        >
          {/* Accent line */}
          <motion.div
            variants={{
              rest: { width: "28px" },
              hover: { width: "52px" },
            }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            style={{
              height: "2px",
              background: "linear-gradient(90deg, #c4a484, #e8d5b7)",
              borderRadius: "2px",
              marginBottom: "10px",
            }}
          />

          <h3
            style={{
              margin: 0,
              fontFamily: "'Playfair Display', serif",
              fontSize: "22px",
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
              fontSize: "13px",
              color: "rgba(240,232,220,0.5)",
              lineHeight: 1.6,
              letterSpacing: "0.01em",
            }}
          >
            {description}
          </p>

          {/* CTA */}
          <motion.div
            variants={{
              rest: { opacity: 0, x: -6 },
              hover: { opacity: 1, x: 0 },
            }}
            transition={{ duration: 0.3, delay: 0.05 }}
            style={{
              marginTop: "14px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "12px",
              fontWeight: 500,
              color: "#c4a484",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Explore
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="#c4a484" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Age;