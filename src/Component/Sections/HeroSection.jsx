import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import heroImg from "./Gemini_Generated_Image_c25b1yc25b1yc25b.png";

const HeroSection = () => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  /* Parallax: image moves up slower than scroll */
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.13, delayChildren: 0.15 } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 32, filter: "blur(6px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.85, ease: [0.23, 1, 0.32, 1] } },
  };

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,800;0,900;1,800&family=DM+Sans:wght@300;400;500&display=swap');`}</style>

      <section
        ref={sectionRef}
        style={{
          position: "relative",
          width: "95%",
          margin: "32px auto",
          height: "clamp(400px, 60vh, 580px)",
          borderRadius: "2.5rem",
          overflow: "hidden",
          boxShadow: "0 32px 80px rgba(0,0,0,0.45)",
        }}
      >
        {/* ── Parallax background image ── */}
        <motion.img
          src={heroImg}
          alt="Healthy food"
          loading="lazy"
          style={{
            position: "absolute",
            inset: "-12% 0",
            width: "100%",
            height: "120%",
            objectFit: "cover",
            y: imgY,
            willChange: "transform",
          }}
        />

        {/* ── Gradient overlay ── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(115deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.42) 55%, rgba(0,0,0,0.08) 100%)",
          }}
        />

        {/* ── Ambient green orb ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2.2, ease: "easeOut" }}
          style={{
            position: "absolute",
            top: "-80px",
            left: "-80px",
            width: "420px",
            height: "420px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(34,197,94,0.18) 0%, transparent 70%)",
            filter: "blur(40px)",
            pointerEvents: "none",
          }}
        />

        {/* ── Animated grain noise overlay ── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.035'/%3E%3C/svg%3E\")",
            backgroundRepeat: "repeat",
            backgroundSize: "180px",
            opacity: 0.6,
            pointerEvents: "none",
            mixBlendMode: "overlay",
          }}
        />

        {/* ── Content ── */}
        <motion.div
          style={{
            position: "relative",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%",
            padding: "0 clamp(32px, 6vw, 96px)",
            y: contentY,
            opacity,
          }}
        >
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            style={{ maxWidth: "640px" }}
          >
            {/* Eyebrow pill */}
            <motion.div variants={fadeUp}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "7px",
                  marginBottom: "22px",
                  padding: "5px 14px 5px 8px",
                  borderRadius: "100px",
                  background: "rgba(34,197,94,0.12)",
                  border: "1px solid rgba(34,197,94,0.28)",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "11px",
                  fontWeight: 500,
                  color: "#4ade80",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}
              >
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "#4ade80",
                    boxShadow: "0 0 8px #4ade80",
                    flexShrink: 0,
                  }}
                />
                Premium Wellness
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(40px, 6.5vw, 76px)",
                fontWeight: 900,
                color: "#f5f0e8",
                margin: 0,
                lineHeight: 1.04,
                letterSpacing: "-0.025em",
              }}
            >
              Take care of
              <br />
              <motion.span
                initial={{ backgroundPosition: "200% center" }}
                animate={{ backgroundPosition: "0% center" }}
                transition={{ duration: 1.4, delay: 0.6, ease: "easeOut" }}
                style={{
                  fontStyle: "italic",
                  background: "linear-gradient(90deg, #4ade80, #059669, #4ade80)",
                  backgroundSize: "200% auto",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  display: "inline-block",
                }}
              >
                your body.
              </motion.span>
            </motion.h1>

            {/* Sub */}
            <motion.p
              variants={fadeUp}
              style={{
                marginTop: "20px",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "clamp(14px, 2vw, 18px)",
                color: "rgba(245,240,232,0.58)",
                maxWidth: "400px",
                lineHeight: 1.7,
                fontWeight: 300,
              }}
            >
              It's the only place you have to live. Invest in your health today for a vibrant tomorrow.
            </motion.p>

            {/* Buttons */}
            <motion.div
              variants={fadeUp}
              style={{ marginTop: "36px", display: "flex", flexWrap: "wrap", gap: "14px" }}
            >
              {/* Primary */}
              <motion.button
                onClick={() => navigate("/Products")}
                whileHover={{ scale: 1.04, boxShadow: "0 0 28px rgba(74,222,128,0.45)" }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 350, damping: 20 }}
                style={{
                  padding: "14px 32px",
                  borderRadius: "100px",
                  background: "linear-gradient(135deg, #22c55e 0%, #059669 100%)",
                  border: "none",
                  color: "#021a0a",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "14px",
                  fontWeight: 700,
                  letterSpacing: "0.03em",
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Shine sweep */}
                <motion.span
                  initial={{ x: "-120%" }}
                  whileHover={{ x: "200%" }}
                  transition={{ duration: 0.55, ease: "easeInOut" }}
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.28) 50%, transparent 60%)",
                    pointerEvents: "none",
                  }}
                />
                Explore Products
              </motion.button>

              {/* Secondary */}
              <motion.button
                onClick={() => navigate("/about")}
                whileHover={{ background: "rgba(255,255,255,0.16)", borderColor: "rgba(255,255,255,0.5)" }}
                whileTap={{ scale: 0.96 }}
                transition={{ duration: 0.2 }}
                style={{
                  padding: "14px 32px",
                  borderRadius: "100px",
                  border: "1px solid rgba(255,255,255,0.25)",
                  background: "rgba(255,255,255,0.08)",
                  backdropFilter: "blur(12px)",
                  color: "rgba(245,240,232,0.9)",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "14px",
                  fontWeight: 500,
                  cursor: "pointer",
                }}
              >
                Learn More
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ── Stat glass card bottom-right ── */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 1.0, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          style={{
            position: "absolute",
            bottom: "28px",
            right: "28px",
            padding: "14px 20px",
            borderRadius: "18px",
            background: "rgba(255,255,255,0.07)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.12)",
            display: "flex",
            gap: "24px",
            zIndex: 10,
          }}
        >
          {[
            { num: "500+", label: "Products" },
            { num: "98%", label: "Satisfaction" },
          ].map((stat) => (
            <div key={stat.label} style={{ textAlign: "center" }}>
              <p
                style={{
                  margin: 0,
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "22px",
                  fontWeight: 800,
                  color: "#4ade80",
                  lineHeight: 1,
                }}
              >
                {stat.num}
              </p>
              <p
                style={{
                  margin: "4px 0 0",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "10px",
                  color: "rgba(245,240,232,0.45)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* ── Scroll hint ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          style={{
            position: "absolute",
            bottom: "38px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "6px",
            zIndex: 10,
          }}
        >
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "10px",
              color: "rgba(245,240,232,0.3)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              margin: 0,
            }}
          >
            Scroll
          </p>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            style={{
              width: "1px",
              height: "28px",
              background: "linear-gradient(to bottom, rgba(74,222,128,0.6), transparent)",
              borderRadius: "2px",
            }}
          />
        </motion.div>
      </section>
    </>
  );
};

export default HeroSection;