import { useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function LoginForm({ close }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [focused, setFocused] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    close();
  };

  const modal = (
    <AnimatePresence>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@300;400;500&display=swap');`}</style>

      {/* ── Backdrop ── */}
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={close}
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(0,0,0,0.75)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
        }}
      >
        {/* ── Modal card ── */}
        <motion.div
          key="modal"
          initial={{ opacity: 0, y: 40, scale: 0.94, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
          onClick={(e) => e.stopPropagation()}
          style={{
            width: "100%",
            maxWidth: "420px",
            background: "#0d0c0b",
            border: "1px solid rgba(255,255,255,0.09)",
            borderRadius: "24px",
            padding: "40px 36px 36px",
            position: "relative",
            boxShadow: "0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(74,222,128,0.05)",
            overflow: "hidden",
          }}
        >
          {/* Ambient orb */}
          <div style={{
            position: "absolute", top: "-60px", right: "-60px",
            width: "220px", height: "220px", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(34,197,94,0.12) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />

          {/* Close button */}
          <motion.button
            whileHover={{ scale: 1.1, background: "rgba(255,255,255,0.1)" }}
            whileTap={{ scale: 0.9 }}
            onClick={close}
            style={{
              position: "absolute", top: "16px", right: "16px",
              width: "32px", height: "32px", borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.05)",
              cursor: "pointer", display: "flex", alignItems: "center",
              justifyContent: "center", color: "rgba(240,232,220,0.5)",
              fontSize: "18px", lineHeight: 1, transition: "background 0.2s",
            }}
          >
            ×
          </motion.button>

          {/* Header */}
          <div style={{ marginBottom: "32px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <div style={{
                width: "30px", height: "30px", borderRadius: "8px",
                background: "linear-gradient(135deg, #22c55e, #059669)",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 0 14px rgba(34,197,94,0.3)",
              }}>
                <span style={{ fontFamily: "'Playfair Display', serif", color: "#021a0a", fontSize: "13px", fontWeight: 700 }}>N</span>
              </div>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "16px", fontWeight: 700, color: "#f0e8dc" }}>
                Nutri<span style={{ color: "#4ade80" }}>Smart</span>
              </span>
            </div>
            <h2 style={{
              fontFamily: "'Playfair Display', serif", fontSize: "26px",
              fontWeight: 700, color: "#f0e8dc", margin: "0 0 6px", letterSpacing: "-0.01em",
            }}>
              Welcome back
            </h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "rgba(240,232,220,0.38)", margin: 0, fontWeight: 300 }}>
              Sign in to your account to continue
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {[
              { id: "email", label: "Email", type: "email", value: email, setter: setEmail, placeholder: "you@example.com" },
              { id: "password", label: "Password", type: "password", value: password, setter: setPassword, placeholder: "••••••••" },
            ].map(({ id, label, type, value, setter, placeholder }) => (
              <div key={id}>
                <label htmlFor={id} style={{
                  display: "block", fontFamily: "'DM Sans', sans-serif",
                  fontSize: "11px", fontWeight: 500, letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: focused === id ? "#4ade80" : "rgba(240,232,220,0.4)",
                  marginBottom: "8px", transition: "color 0.2s",
                }}>
                  {label}
                </label>
                <input
                  id={id} type={type} value={value}
                  onChange={(e) => setter(e.target.value)}
                  onFocus={() => setFocused(id)}
                  onBlur={() => setFocused(null)}
                  placeholder={placeholder}
                  required
                  style={{
                    width: "100%", padding: "12px 16px", borderRadius: "12px",
                    border: focused === id ? "1px solid rgba(74,222,128,0.5)" : "1px solid rgba(255,255,255,0.08)",
                    background: "rgba(255,255,255,0.04)",
                    color: "#f0e8dc", fontFamily: "'DM Sans', sans-serif",
                    fontSize: "14px", outline: "none", boxSizing: "border-box",
                    transition: "border-color 0.25s, box-shadow 0.25s",
                    boxShadow: focused === id ? "0 0 0 3px rgba(34,197,94,0.12)" : "none",
                  }}
                />
              </div>
            ))}

            <div style={{ textAlign: "right", marginTop: "-4px" }}>
              <a href="#" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "rgba(74,222,128,0.7)", textDecoration: "none" }}>
                Forgot password?
              </a>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02, boxShadow: "0 0 24px rgba(34,197,94,0.4)" }}
              whileTap={{ scale: 0.97 }}
              style={{
                marginTop: "4px", width: "100%", padding: "14px", borderRadius: "12px",
                background: "linear-gradient(135deg, #22c55e 0%, #059669 100%)",
                border: "none", color: "#021a0a",
                fontFamily: "'DM Sans', sans-serif", fontSize: "14px",
                fontWeight: 700, letterSpacing: "0.03em", cursor: "pointer",
                position: "relative", overflow: "hidden",
              }}
            >
              <motion.span
                initial={{ x: "-120%" }}
                whileHover={{ x: "200%" }}
                transition={{ duration: 0.5 }}
                style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.2) 50%, transparent 60%)",
                  pointerEvents: "none",
                }}
              />
              Sign In
            </motion.button>

            <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "4px 0" }}>
              <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.07)" }} />
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: "rgba(240,232,220,0.25)" }}>or</span>
              <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.07)" }} />
            </div>

            <p style={{ textAlign: "center", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "rgba(240,232,220,0.35)", margin: 0 }}>
              Don't have an account?{" "}
              <a href="#" style={{ color: "#4ade80", textDecoration: "none", fontWeight: 500 }}>Sign up</a>
            </p>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );

  // Renders directly into <body> — bypasses navbar, z-index stacking, overflow:hidden parents
  return createPortal(modal, document.body);
}