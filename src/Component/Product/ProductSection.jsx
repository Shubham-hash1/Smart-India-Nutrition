import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

/* Fade up from bottom — clean, product-catalogue feel */
const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.65, ease: [0.23, 1, 0.32, 1] },
  },
};

const ProductCard = ({ item, accent }) => (
  <motion.div
    whileHover="hover"
    initial="rest"
    animate="rest"
    style={{ cursor: "pointer", position: "relative" }}
  >
    {/* Glow blob */}
    <motion.div
      variants={{
        rest: { opacity: 0 },
        hover: { opacity: 1 },
      }}
      transition={{ duration: 0.35 }}
      style={{
        position: "absolute", inset: "-8px", borderRadius: "24px",
        background: `radial-gradient(ellipse at center, ${accent}22 0%, transparent 70%)`,
        filter: "blur(16px)", pointerEvents: "none", zIndex: 0,
      }}
    />

    <motion.div
      variants={{
        rest: { y: 0, boxShadow: "0 4px 24px rgba(0,0,0,0.35)" },
        hover: { y: -8, boxShadow: "0 20px 52px rgba(0,0,0,0.55)" },
      }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      style={{
        position: "relative", zIndex: 1,
        borderRadius: "18px", overflow: "hidden",
        background: "#0f0e0d",
        border: "1px solid rgba(255,255,255,0.07)",
        display: "flex", flexDirection: "column",
      }}
    >
      {/* Image */}
      <div style={{ position: "relative", height: "200px", overflow: "hidden", flexShrink: 0 }}>
        <motion.img
          src={item.image}
          alt={item.name}
          variants={{ rest: { scale: 1 }, hover: { scale: 1.07 } }}
          transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(0,0,0,0) 50%, rgba(10,9,8,0.65) 100%)",
        }} />

        {/* Badge if available */}
        {item.badge && (
          <div style={{
            position: "absolute", top: "12px", left: "12px",
            padding: "4px 10px", borderRadius: "100px",
            background: `${accent}22`,
            border: `1px solid ${accent}44`,
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "10px", fontWeight: 500,
            color: accent, letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}>
            {item.badge}
          </div>
        )}
      </div>

      {/* Text */}
      <div style={{ padding: "18px 18px 20px" }}>
        {/* Accent bar */}
        <motion.div
          variants={{ rest: { width: "20px" }, hover: { width: "40px" } }}
          transition={{ duration: 0.3 }}
          style={{
            height: "2px", borderRadius: "2px", marginBottom: "10px",
            background: `linear-gradient(90deg, ${accent}, transparent)`,
          }}
        />

        <h3 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "17px", fontWeight: 700,
          color: "#f0e8dc", margin: "0 0 6px",
          lineHeight: 1.3,
        }}>
          {item.name}
        </h3>

        {item.description && (
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "12.5px", color: "rgba(240,232,220,0.42)",
            lineHeight: 1.6, margin: "0 0 14px", fontWeight: 300,
          }}>
            {item.description}
          </p>
        )}

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {item.price && (
            <span style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "18px", fontWeight: 700, color: accent,
            }}>
              {item.price}
            </span>
          )}

          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            style={{
              padding: "8px 16px", borderRadius: "100px",
              background: `linear-gradient(135deg, ${accent}cc, ${accent}88)`,
              border: "none", cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "11px", fontWeight: 700,
              color: "#021a0a", letterSpacing: "0.05em",
            }}
          >
            Add to Cart
          </motion.button>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

const ProductSection = ({ title, items = [], accent = "#4ade80", index = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref}>
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.75, ease: [0.23, 1, 0.32, 1] }}
        style={{
          display: "flex", alignItems: "center",
          gap: "16px", marginBottom: "32px",
        }}
      >
        {/* Accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          style={{
            width: "36px", height: "2px", borderRadius: "2px", flexShrink: 0,
            background: `linear-gradient(90deg, ${accent}, transparent)`,
            transformOrigin: "left",
          }}
        />

        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(22px, 3vw, 30px)",
          fontWeight: 700, color: "#f0e8dc",
          margin: 0, letterSpacing: "-0.01em",
        }}>
          {title}
        </h2>

        {/* Right fade line */}
        <div style={{
          flex: 1, height: "1px",
          background: "linear-gradient(90deg, rgba(255,255,255,0.07), transparent)",
        }} />
      </motion.div>

      {/* Product grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "20px",
        }}
      >
        {items.map((item, i) => (
          <motion.div key={i} variants={cardVariants}>
            <ProductCard item={item} accent={accent} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ProductSection;