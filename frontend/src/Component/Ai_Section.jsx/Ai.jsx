import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../../Context/LanguageContext';

const Ai = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-10">
      <motion.div
        whileHover={{ y: -5, boxShadow: "0 20px 40px var(--shadow-color)" }}
        transition={{ duration: 0.3 }}
        style={{
          background: "linear-gradient(135deg, var(--accent-light) 0%, rgba(5,150,105,0.04) 100%)",
          border: "1px solid var(--accent-border)",
          borderRadius: "24px",
          padding: "48px 32px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          cursor: "pointer"
        }}
        onClick={() => navigate('/ai-assistant')}
      >
        <span style={{ fontSize: "56px", marginBottom: "16px", display: "block" }}>🤖</span>
        <h2 style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "clamp(24px, 4vw, 32px)",
          fontWeight: 800,
          color: "var(--text-primary)",
          margin: "0 0 12px 0",
          letterSpacing: "-0.01em"
        }}>
          {t("aiTitle")}
        </h2>
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "16px",
          color: "var(--text-secondary)",
          margin: "0 0 24px 0",
          maxWidth: "600px",
          lineHeight: 1.6
        }}>
          {t("aiDesc")}
        </p>
        <button
          style={{
            background: "var(--accent-color)",
            color: "#ffffff",
            fontFamily: "'Inter', sans-serif",
            fontWeight: 700,
            fontSize: "14px",
            padding: "12px 32px",
            borderRadius: "100px",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 4px 14px rgba(34, 197, 94, 0.4)",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            transition: "all 0.2s"
          }}
          onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
        >
          {t("heroBtn")} &rarr;
        </button>
      </motion.div>
    </div>
  );
};

export default Ai;