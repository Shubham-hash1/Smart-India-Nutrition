import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navlinks from "./Navlinks";
import Login from "./Login";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@400;500&display=swap');`}</style>

      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{
          width: "100%",
          position: "sticky",
          top: 0,
          zIndex: 40,
          transition: "all 0.35s ease",
          background: scrolled
            ? "rgba(8,7,6,0.82)"
            : "rgba(8,7,6,0.55)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: scrolled
            ? "1px solid rgba(255,255,255,0.07)"
            : "1px solid transparent",
          boxShadow: scrolled
            ? "0 8px 40px rgba(0,0,0,0.4)"
            : "none",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "14px 32px",
          }}
        >
          {/* ── Logo ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: "flex", alignItems: "center", gap: "10px" }}
          >
            {/* Icon mark */}
            <motion.div
              whileHover={{ scale: 1.08, rotate: 3 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
              style={{
                width: "34px",
                height: "34px",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #22c55e 0%, #059669 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 16px rgba(34,197,94,0.35)",
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: "#021a0a",
                  fontSize: "15px",
                  fontWeight: 700,
                  lineHeight: 1,
                }}
              >
                N
              </span>
            </motion.div>

            {/* Wordmark */}
            <span
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "18px",
                fontWeight: 700,
                color: "#f0e8dc",
                letterSpacing: "-0.01em",
              }}
            >
              Nutri
              <span style={{ color: "#4ade80" }}>Smart</span>
            </span>
          </motion.div>

          {/* ── Desktop Nav Links ── */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            style={{ display: "flex" }}
            className="hidden md:flex"
          >
            <Navlinks />
          </motion.div>

          {/* ── Right: Login + Hamburger ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            style={{ display: "flex", alignItems: "center", gap: "12px" }}
          >
            <div className="hidden md:flex">
              <Login />
            </div>

            {/* Hamburger */}
            <motion.button
              whileTap={{ scale: 0.88 }}
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden"
              aria-label="Toggle menu"
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "10px",
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.05)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "5px",
                cursor: "pointer",
              }}
            >
              {[
                menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 },
                menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 },
                menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 },
              ].map((anim, i) => (
                <motion.span
                  key={i}
                  animate={anim}
                  transition={{ duration: 0.28 }}
                  style={{
                    display: "block",
                    width: "18px",
                    height: "1.5px",
                    background: "#f0e8dc",
                    borderRadius: "2px",
                  }}
                />
              ))}
            </motion.button>
          </motion.div>
        </div>

        {/* ── Animated green accent line ── */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.7, duration: 1, ease: "easeOut" }}
          style={{
            height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(74,222,128,0.5), transparent)",
            transformOrigin: "center",
          }}
        />
      </motion.nav>

      {/* ── Mobile dropdown ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "sticky",
              top: "63px",
              zIndex: 30,
              background: "rgba(10,9,8,0.97)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              borderBottom: "1px solid rgba(255,255,255,0.07)",
              overflow: "hidden",
            }}
          >
            <motion.div
              initial={{ y: -12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
              transition={{ delay: 0.08, duration: 0.3 }}
              style={{
                maxWidth: "1280px",
                margin: "0 auto",
                padding: "20px 28px 24px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              <Navlinks mobile />
              <div
                style={{
                  paddingTop: "16px",
                  borderTop: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <Login />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;