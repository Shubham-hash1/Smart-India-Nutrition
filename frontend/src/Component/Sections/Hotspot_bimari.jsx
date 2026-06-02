import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../Context/LanguageContext";

import ObesityImg from "../../Images/Obesity.jpg";
import StomachImg from "../../Images/Stomach.jpg";
import heartImg from "../../Images/heart.webp";
import nutrtional from "../../Images/nutritional.jpg";
import SugarImg from "../../Images/Sugar.jpg";
import HypertensionImg from "../../Images/Hypertension.png";
import ThyroidImg from "../../Images/Thyroid.png";
import PcodImg from "../../Images/PCOD.png";
import LiverImg from "../../Images/Liver.png";

const Hotspot_bimari = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDiseaseIdx, setSelectedDiseaseIdx] = useState(0);

  const diseaseData = [
    { 
      image: ObesityImg, 
      title: "Obesity",                 
      description: "Excessive body fat increasing health risks. Leads to joint stress, metabolic complications, and cardiac load.",      
      route: "/obesity"     
    },
    { 
      image: SugarImg,   
      title: "Diabetes",                 
      description: "Chronic condition causing high blood sugar. Needs careful management of insulin sensitivity and glycemic intake.",       
      route: "/diabetes"    
    },
    { 
      image: heartImg,   
      title: "Heart",                    
      description: "Conditions affecting heart function and circulation. Requires low sodium, clean fats, and cardiovascular support.",             
      route: "/heart"       
    },
    {
      image: StomachImg, 
      title: "Stomach",                  
      description: "Digestive problems causing bloating, acidity, or reflux. Focused on gut-healing foods and dietary hydration.",            
      route: "/stomach"     
    },
    { 
      image: nutrtional, 
      title: "Nutritional Deficiencies", 
      description: "Lack of essential vitamins and minerals. Emphasizes iron, B12, vitamin D, calcium, and protein absorption.",       
      route: "/nutritional" 
    },
    {
      image: HypertensionImg,
      title: "Hypertension",
      description: "High blood pressure putting stress on blood vessels. Emphasizes a low-sodium, potassium-rich dietary profile.",
      route: "/hypertension"
    },
    {
      image: ThyroidImg,
      title: "Thyroid",
      description: "Hormonal issues (hypo/hyper) regulating metabolic rates. Focuses on selenium, iodine, and gluten-free fibers.",
      route: "/thyroid"
    },
    {
      image: PcodImg,
      title: "PCOD / PCOS",
      description: "Hormonal imbalance in women causing metabolic fatigue. Focuses on insulin sensitivity, complex grains, and low-GI foods.",
      route: "/pcod"
    },
    {
      image: LiverImg,
      title: "Liver Health",
      description: "Fatty liver changes impacting detoxification. Requires high antioxidants, clean hydration, and minimal processed sugars.",
      route: "/liver"
    }
  ];

  // Filter diseases based on search
  const filteredDiseases = diseaseData.filter(d => 
    d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Safely clamp active index if list changes
  const activeIdx = Math.min(selectedDiseaseIdx, Math.max(0, filteredDiseases.length - 1));
  const activeDisease = filteredDiseases[activeIdx];

  return (
    <section
      style={{
        minHeight: "100vh",
        background: "var(--bg-primary)",
        padding: "80px 24px 100px",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'DM Sans', sans-serif",
        transition: "background-color 0.3s, color 0.3s"
      }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=DM+Sans:wght@300;400;500&display=swap');`}</style>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1 style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "clamp(36px, 6vw, 46px)",
          fontWeight: 900, 
          color: "var(--text-primary)",
          margin: 0, 
          lineHeight: 1.1, 
          letterSpacing: "-0.02em",
        }}>
          {t("riskTitle1")}{" "}
          <span style={{ fontStyle: "italic", color: "var(--disease-accent)" }}>{t("riskTitle2")}</span>
        </h1>
        <div style={{ width: "60px", height: "1px", background: "var(--border-color)", margin: "24px auto 0" }} />
      </div>

      {/* Main Split Interface */}
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        
        {/* Search Bar */}
        <div style={{ marginBottom: "30px", display: "flex", justifyContent: "center" }}>
          <input
            type="text"
            placeholder={t("searchPlaceholder")}
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setSelectedDiseaseIdx(0); // Reset selection to first match
            }}
            style={{
              width: "100%",
              maxWidth: "500px",
              padding: "14px 20px",
              borderRadius: "12px",
              border: "1px solid var(--border-color)",
              background: "var(--bg-secondary)",
              color: "var(--text-primary)",
              fontFamily: "inherit",
              outline: "none",
              fontSize: "14px",
              transition: "all 0.2s"
            }}
          />
        </div>

        {filteredDiseases.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px", color: "var(--text-secondary)" }}>
            <span style={{ fontSize: "36px" }}>🔍</span>
            <p style={{ marginTop: "12px", fontSize: "16px", fontWeight: 500 }}>{t("noDiseaseFound")}</p>
          </div>
        ) : (
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", 
            gap: "32px",
            background: "var(--bg-secondary)",
            border: "1px solid var(--border-color)",
            borderRadius: "28px",
            padding: "24px",
            boxShadow: "0 10px 45px var(--shadow-color)"
          }}>
            
            {/* Left Scroll Panel */}
            <div style={{ 
              height: "450px", 
              overflowY: "auto", 
              paddingRight: "8px",
              display: "flex",
              flexDirection: "column",
              gap: "10px"
            }}>
              {filteredDiseases.map((item, index) => {
                const isSelected = index === activeIdx;
                return (
                  <motion.div
                    key={item.title}
                    onClick={() => setSelectedDiseaseIdx(index)}
                    whileHover={{ scale: 1.01 }}
                    style={{
                      background: isSelected ? "var(--bg-primary)" : "transparent",
                      border: isSelected ? "1px solid var(--border-color)" : "1px solid transparent",
                      borderRadius: "16px",
                      padding: "16px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                      transition: "background-color 0.2s"
                    }}
                  >
                    <div style={{ width: "60px", height: "60px", borderRadius: "10px", overflow: "hidden", flexShrink: 0 }}>
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        onError={(e) => { e.target.src = "https://via.placeholder.com/60?text=Health"; }}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                      />
                    </div>
                    <div>
                      <h4 style={{ margin: 0, fontSize: "16px", fontWeight: 700, color: isSelected ? "var(--accent-text)" : "var(--text-primary)" }}>
                        {item.title}
                      </h4>
                      <p style={{ margin: "4px 0 0 0", fontSize: "12px", color: "var(--text-secondary)", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Right Preview Card */}
            <AnimatePresence mode="wait">
              {activeDisease && (
                <motion.div
                  key={activeDisease.title}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.25 }}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "450px",
                    background: "var(--bg-primary)",
                    border: "1px solid var(--border-color)",
                    borderRadius: "20px",
                    padding: "24px",
                    boxSizing: "border-box",
                    boxShadow: "0 4px 20px var(--shadow-color)"
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    <div style={{ width: "100%", height: "240px", borderRadius: "14px", overflow: "hidden" }}>
                      <img 
                        src={activeDisease.image} 
                        alt={activeDisease.title}
                        onError={(e) => { e.target.src = "https://via.placeholder.com/350?text=Health+Care"; }}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                      />
                    </div>
                    <div>
                      <h2 style={{ margin: 0, fontSize: "24px", fontWeight: 800, color: "var(--text-primary)" }}>
                        {activeDisease.title}
                      </h2>
                      <p style={{ marginTop: "8px", fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                        {activeDisease.description}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate(activeDisease.route)}
                    style={{
                      width: "100%",
                      padding: "14px",
                      borderRadius: "10px",
                      border: "none",
                      background: "var(--accent-color)",
                      color: "#ffffff",
                      fontWeight: 750,
                      cursor: "pointer",
                      fontSize: "14px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      transition: "all 0.2s"
                    }}
                    onMouseEnter={e => e.currentTarget.style.opacity = "0.9"}
                    onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                  >
                    View Food Chart & Solutions &rarr;
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        )}

      </div>
    </section>
  );
};

export default Hotspot_bimari;