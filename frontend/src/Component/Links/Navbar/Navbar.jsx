import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navlinks from "./Navlinks";
import Login from "./Login";
import { useTheme } from "../../../Context/ThemeContext";
import { useLanguage } from "../../../Context/LanguageContext";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=DM+Sans:wght@400;500&display=swap');`}</style>

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
            ? "var(--bg-primary)"
            : "rgba(var(--bg-primary), 0.7)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--border-color)",
          boxShadow: scrolled
            ? "0 8px 30px var(--shadow-color)"
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
            padding: "14px 24px",
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
                background: "linear-gradient(135deg, var(--accent-color) 0%, #059669 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  fontFamily: "'Inter', serif",
                  color: "#ffffff",
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
                fontFamily: "'Inter', serif",
                fontSize: "18px",
                fontWeight: 700,
                color: "var(--text-primary)",
                letterSpacing: "-0.01em",
              }}
            >
              Nutri
              <span style={{ color: "var(--accent-text)" }}>Smart</span>
            </span>
          </motion.div>

          {/* ── Desktop Nav Links ── */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            style={{ display: "flex" }}
            className="hidden lg:flex"
          >
            <Navlinks />
          </motion.div>

          {/* ── Right Controls ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            style={{ display: "flex", alignItems: "center", gap: "12px" }}
          >
            {/* Language Switcher */}
            <button
              onClick={() => setLanguage(language === "en" ? "hi" : "en")}
              style={{
                padding: "6px 12px",
                borderRadius: "8px",
                border: "1px solid var(--border-color)",
                background: "var(--bg-secondary)",
                color: "var(--text-primary)",
                fontSize: "12px",
                fontWeight: "600",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "4px",
                transition: "all 0.2s"
              }}
            >
              🌐 {language === "en" ? "EN" : "HI"}
            </button>

            {/* Theme Selector */}
            <select
              value={theme}
              onChange={(e) => toggleTheme(e.target.value)}
              style={{
                padding: "6px 10px",
                borderRadius: "8px",
                border: "1px solid var(--border-color)",
                background: "var(--bg-secondary)",
                color: "var(--text-primary)",
                fontSize: "12px",
                fontWeight: "600",
                cursor: "pointer",
                outline: "none",
                transition: "all 0.2s"
              }}
            >
              <option value="color">🎨 Light Mode</option>
              <option value="dark">🌙 Dark Mode</option>
              <option value="mono-light">⚪ Light Mono</option>
              <option value="mono-dark">⚫ Dark Mono</option>
            </select>

            <div className="hidden md:flex">
              <Login />
            </div>

            {/* Hamburger */}
            <motion.button
              whileTap={{ scale: 0.88 }}
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden"
              aria-label="Toggle menu"
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "10px",
                border: "1px solid var(--border-color)",
                background: "var(--bg-secondary)",
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
                    background: "var(--text-primary)",
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
            background: "linear-gradient(90deg, transparent, var(--accent-border), transparent)",
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
              background: "var(--bg-primary)",
              borderBottom: "1px solid var(--border-color)",
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
                padding: "20px 24px 24px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              <Navlinks mobile onClick={() => setMenuOpen(false)} />
              <div
                style={{
                  paddingTop: "16px",
                  borderTop: "1px solid var(--border-color)",
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