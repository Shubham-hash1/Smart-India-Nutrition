import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const regions = ["All India", "North", "South", "East", "West"];

const RegionFilter = ({ selectedRegion, onSelectRegion }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "32px", position: "relative", zIndex: 20 }} ref={dropdownRef}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@500&display=swap');`}</style>
      
      {/* Dropdown Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        style={{
          padding: "12px 24px",
          minWidth: "200px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderRadius: "12px",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "15px",
          fontWeight: 500,
          cursor: "pointer",
          background: "rgba(255,255,255,0.05)",
          color: "#f0e8dc",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: isOpen ? "0 0 20px rgba(34,197,94,0.2)" : "0 4px 10px rgba(0,0,0,0.3)",
          transition: "box-shadow 0.3s ease, border-color 0.3s ease",
          borderColor: isOpen ? "rgba(34,197,94,0.5)" : "rgba(255,255,255,0.1)",
        }}
      >
        <span>{selectedRegion}</span>
        <motion.span 
          animate={{ rotate: isOpen ? 180 : 0 }} 
          transition={{ duration: 0.3 }}
          style={{ fontSize: "12px", color: "#4ade80" }}
        >
          ▼
        </motion.span>
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scaleY: 0.9 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -10, scaleY: 0.9 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{
              position: "absolute",
              top: "100%",
              marginTop: "8px",
              width: "200px",
              background: "#0d0c0b",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
              transformOrigin: "top",
            }}
          >
            {regions.map((region) => (
              <div
                key={region}
                onClick={() => {
                  onSelectRegion(region);
                  setIsOpen(false);
                }}
                style={{
                  padding: "12px 20px",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "14px",
                  cursor: "pointer",
                  color: selectedRegion === region ? "#021a0a" : "rgba(240,232,220,0.8)",
                  background: selectedRegion === region ? "linear-gradient(135deg, #22c55e 0%, #059669 100%)" : "transparent",
                  fontWeight: selectedRegion === region ? 700 : 500,
                  transition: "background 0.2s ease, color 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  if (selectedRegion !== region) {
                    e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedRegion !== region) {
                    e.currentTarget.style.background = "transparent";
                  }
                }}
              >
                {region}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RegionFilter;
