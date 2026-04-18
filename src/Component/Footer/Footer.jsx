import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const footerLinks = {
  Company: [
    { label: "About", href: "/about" },
    { label: "Careers", href: "#" },
    { label: "Product", href: "/products" },
    { label: "Blogs", href: "/blogs" },
  ],
  "Help Center": [
    { label: "Discord", href: "#" },
    { label: "Twitter", href: "#" },
    { label: "Facebook", href: "#" },
    { label: "Contact", href: "#" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Licensing", href: "#" },
    { label: "Terms & Conditions", href: "#" },
  ],
};

const socials = [
  {
    label: "Facebook",
    href: "#",
    path: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
  },
  {
    label: "Twitter",
    href: "#",
    path: "M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z",
  },
  {
    label: "GitHub",
    href: "#",
    path: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.23, 1, 0.32, 1] } },
};

const Footer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <footer
      ref={ref}
      style={{
        background: "#060504",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500&display=swap');`}</style>

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "64px 32px 0" }}>

        {/* ── Top: Brand + Links ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "48px",
            paddingBottom: "56px",
          }}
        >
          {/* Brand column */}
          <motion.div variants={fadeUp} style={{ gridColumn: "span 1" }}>
            {/* Logo mark */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <div
                style={{
                  width: "34px",
                  height: "34px",
                  borderRadius: "10px",
                  background: "linear-gradient(135deg, #22c55e, #059669)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 0 16px rgba(34,197,94,0.3)",
                  flexShrink: 0,
                }}
              >
                <span style={{ fontFamily: "'Playfair Display', serif", color: "#021a0a", fontSize: "15px", fontWeight: 700 }}>N</span>
              </div>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", fontWeight: 700, color: "#f0e8dc" }}>
                Nutri<span style={{ color: "#4ade80" }}>Smart</span>
              </span>
            </div>

            <p style={{ fontSize: "13px", color: "rgba(240,232,220,0.38)", lineHeight: 1.75, maxWidth: "220px", fontWeight: 300 }}>
              Empowering healthier lives through smart nutrition and evidence-based wellness guidance.
            </p>

            {/* Social icons */}
            <div style={{ display: "flex", gap: "10px", marginTop: "24px" }}>
              {socials.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  whileHover={{ scale: 1.12, borderColor: "rgba(74,222,128,0.5)" }}
                  whileTap={{ scale: 0.92 }}
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "10px",
                    border: "1px solid rgba(255,255,255,0.08)",
                    background: "rgba(255,255,255,0.04)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "border-color 0.2s",
                  }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(240,232,220,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d={s.path} />
                  </svg>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <motion.div key={section} variants={fadeUp}>
              <h2
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "10px",
                  fontWeight: 500,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "#4ade80",
                  marginBottom: "20px",
                }}
              >
                {section}
              </h2>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                {links.map((link) => (
                  <li key={link.label}>
                    <motion.a
                      href={link.href}
                      whileHover={{ x: 4, color: "#f0e8dc" }}
                      transition={{ duration: 0.2 }}
                      style={{
                        fontSize: "14px",
                        color: "rgba(240,232,220,0.45)",
                        textDecoration: "none",
                        display: "inline-block",
                        fontWeight: 400,
                      }}
                    >
                      {link.label}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Divider ── */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          style={{
            height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
            transformOrigin: "left",
          }}
        />

        {/* ── Bottom bar ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7, duration: 0.8 }}
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
            padding: "20px 0",
          }}
        >
          <span style={{ fontSize: "12px", color: "rgba(240,232,220,0.25)", letterSpacing: "0.03em" }}>
            © 2026 Smart India Nutrition. All Rights Reserved.
          </span>
          <span style={{ fontSize: "12px", color: "rgba(240,232,220,0.2)", letterSpacing: "0.03em" }}>
            Made with care for your health
          </span>
        </motion.div>

        {/* ── Medical Disclaimer ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.85, duration: 0.7 }}
          style={{
            borderTop: "1px solid rgba(255,255,255,0.05)",
            padding: "24px 0 32px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontSize: "14px",
              fontWeight: 500,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,1)",
              marginBottom: "8px",
            }}
          >
            Medical Disclaimer
          </p>
          <p
            style={{
              fontSize: "14px",
              color: "rgba(255,255,255,1)",
              lineHeight: 1.8,
              maxWidth: "600px",
              margin: "0 auto",
              fontWeight: 800,
            }}
          >
            The content on this website is not intended to diagnose, treat, cure, or prevent any disease.
            Please consult a qualified healthcare professional for medical advice.
          </p>
        </motion.div>

      </div>
    </footer>
  );
};

export default Footer;