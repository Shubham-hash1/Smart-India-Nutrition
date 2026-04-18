import React from "react";
import { motion } from "framer-motion";
import { HeartPulse, Activity, Apple, Target } from "lucide-react";

const sections = [
  {
    title: "What is Smart India Nutrition?",
    icon: <Apple className="w-8 h-8 text-[#4ade80]" />,
    content:
      "Smart India Nutrition is a platform dedicated to promoting healthier food choices and awareness about balanced nutrition. Our mission is to guide individuals towards better lifestyle decisions through knowledge, technology, and smart solutions.",
  },
  {
    title: "Why We Started It",
    icon: <HeartPulse className="w-8 h-8 text-[#4ade80]" />,
    content:
      "We started this initiative to address the growing health challenges caused by poor dietary habits. With increasing lifestyle diseases, awareness and smart technology help people make informed decisions.",
  },
  {
    title: "What Are the Benefits?",
    icon: <Activity className="w-8 h-8 text-[#4ade80]" />,
    content:
      "Our platform provides personalized nutrition guidance, AI-powered recommendations, and easy-to-understand health insights to improve well-being and maintain a balanced lifestyle.",
  },
  {
    title: "Our Goal",
    icon: <Target className="w-8 h-8 text-[#4ade80]" />,
    content:
      "Our goal is to make smart nutrition accessible to every individual in India by combining technology, AI, and scientific knowledge to build a healthier nation.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 32, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.85, ease: [0.23, 1, 0.32, 1] } },
};

const About = () => {
  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,800;0,900;1,800&family=DM+Sans:wght@300;400;500&display=swap');`}</style>
      
      <div 
        style={{
          minHeight: "100vh",
          backgroundColor: "#080706",
          position: "relative",
          overflow: "hidden",
          padding: "80px 20px"
        }}
      >
        {/* Ambient green orb */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2.2, ease: "easeOut" }}
          style={{
            position: "absolute",
            top: "-150px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(34,197,94,0.12) 0%, transparent 70%)",
            filter: "blur(60px)",
            pointerEvents: "none",
          }}
        />

        {/* Animated grain noise overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.035'/%3E%3C/svg%3E\")",
            backgroundRepeat: "repeat",
            backgroundSize: "180px",
            opacity: 0.5,
            pointerEvents: "none",
            mixBlendMode: "overlay",
          }}
        />

        <div className="max-w-6xl mx-auto relative z-10">
          
          {/* Header Section */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center mb-16 md:mb-24"
          >
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
                Our Story
              </span>
            </motion.div>

            <motion.h1 
              variants={fadeUp}
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(40px, 5.5vw, 64px)",
                fontWeight: 900,
                color: "#f5f0e8",
                margin: "0 0 24px 0",
                lineHeight: 1.04,
                letterSpacing: "-0.025em",
              }}
            >
              Empowering India with <br className="hidden md:block"/>
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
                Smart Nutrition
              </motion.span>
            </motion.h1>

            <motion.p 
              variants={fadeUp}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "clamp(16px, 2vw, 20px)",
                color: "rgba(245,240,232,0.58)",
                maxWidth: "600px",
                margin: "0 auto",
                lineHeight: 1.7,
                fontWeight: 300,
              }}
            >
              Harnessing the power of AI and technology to transform dietary habits and build a healthier, more informed nation.
            </motion.p>
          </motion.div>

          {/* Content Cards */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10"
          >
            {sections.map((sec, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.06)" }}
                transition={{ duration: 0.3 }}
                style={{
                  padding: "40px",
                  borderRadius: "28px",
                  background: "rgba(255,255,255,0.03)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  position: "relative",
                  overflow: "hidden"
                }}
              >
                {/* Subtle top border highlight */}
                <div style={{
                  position: "absolute",
                  top: 0,
                  left: "10%",
                  right: "10%",
                  height: "1px",
                  background: "linear-gradient(90deg, transparent, rgba(74,222,128,0.3), transparent)"
                }} />

                <div className="relative z-10">
                  <div style={{
                    marginBottom: "24px",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "64px",
                    height: "64px",
                    borderRadius: "20px",
                    background: "rgba(34,197,94,0.1)",
                    border: "1px solid rgba(34,197,94,0.2)"
                  }}>
                    {sec.icon}
                  </div>
                  
                  <h2 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "26px",
                    fontWeight: 800,
                    color: "#f5f0e8",
                    marginBottom: "16px",
                    letterSpacing: "-0.01em"
                  }}>
                    {sec.title}
                  </h2>
                  
                  <p style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "16px",
                    color: "rgba(245,240,232,0.6)",
                    lineHeight: 1.7,
                    fontWeight: 300
                  }}>
                    {sec.content}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Call to Action Section */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            style={{
              marginTop: "80px",
              padding: "60px 40px",
              borderRadius: "32px",
              background: "linear-gradient(135deg, rgba(34,197,94,0.1) 0%, rgba(5,150,105,0.1) 100%)",
              border: "1px solid rgba(74,222,128,0.2)",
              textAlign: "center",
              position: "relative",
              overflow: "hidden"
            }}
          >
            {/* CTA Ambient Glow */}
            <div style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "100%",
              height: "100%",
              background: "radial-gradient(circle, rgba(34,197,94,0.15) 0%, transparent 60%)",
              pointerEvents: "none"
            }} />

            <div className="relative z-10">
              <h3 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(32px, 4vw, 48px)",
                fontWeight: 900,
                color: "#f5f0e8",
                marginBottom: "20px"
              }}>
                Join the Health Revolution
              </h3>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "18px",
                color: "rgba(245,240,232,0.7)",
                maxWidth: "600px",
                margin: "0 auto 40px auto",
                lineHeight: 1.6,
                fontWeight: 300
              }}>
                Start your journey towards a better lifestyle today. Let our AI guide you with personalized recommendations tailored just for you.
              </p>
              
              <motion.button
                whileHover={{ scale: 1.04, boxShadow: "0 0 28px rgba(74,222,128,0.45)" }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 350, damping: 20 }}
                style={{
                  padding: "16px 40px",
                  borderRadius: "100px",
                  background: "linear-gradient(135deg, #22c55e 0%, #059669 100%)",
                  border: "none",
                  color: "#021a0a",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "15px",
                  fontWeight: 700,
                  letterSpacing: "0.03em",
                  cursor: "pointer",
                }}
              >
                Get Started Now
              </motion.button>
            </div>
          </motion.div>

        </div>
      </div>
    </>
  );
};

export default About;