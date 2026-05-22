import { useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../../Context/AuthContext";

export default function LoginForm({ close }) {
  const { login, signup, verifyOtp } = useAuth();
  const [isSignup, setIsSignup] = useState(false);
  const [awaitingOtp, setAwaitingOtp] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [focused, setFocused] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (awaitingOtp) {
      const res = await verifyOtp(email, otp);
      setLoading(false);
      if (res.success) {
        close();
      } else {
        setError(res.message);
      }
      return;
    }

    let res;
    if (isSignup) {
      res = await signup(name, email, password);
    } else {
      res = await login(email, password);
    }

    setLoading(false);
    if (res.success) {
      if (res.requiresOtp) {
        setAwaitingOtp(true);
        setError(""); // Clear any errors
      } else {
        close();
      }
    } else {
      setError(res.message);
    }
  };

  let formFields = [];
  if (awaitingOtp) {
    formFields = [
      { id: "otp", label: "Verification Code", type: "text", value: otp, setter: setOtp, placeholder: "Enter 6-digit OTP" }
    ];
  } else if (isSignup) {
    formFields = [
      { id: "name", label: "Full Name", type: "text", value: name, setter: setName, placeholder: "Your Name" },
      { id: "email", label: "Email", type: "email", value: email, setter: setEmail, placeholder: "you@example.com" },
      { id: "password", label: "Password", type: "password", value: password, setter: setPassword, placeholder: "••••••••" },
    ];
  } else {
    formFields = [
      { id: "email", label: "Email", type: "email", value: email, setter: setEmail, placeholder: "you@example.com" },
      { id: "password", label: "Password", type: "password", value: password, setter: setPassword, placeholder: "••••••••" },
    ];
  }

  const modal = (
    <AnimatePresence>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=DM+Sans:wght@300;400;500&display=swap');`}</style>

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
          initial={{ opacity: 0, y: 40, scale: 0.94,  }}
          animate={{ opacity: 1, y: 0, scale: 1,  }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
          onClick={(e) => e.stopPropagation()}
          style={{
            width: "100%",
            maxWidth: "420px",
            background: "#f9fafb",
            border: "1px solid rgba(0,0,0,0.09)",
            borderRadius: "24px",
            padding: "40px 36px 36px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Ambient orb */}
          <div style={{
            position: "absolute", top: "-60px", right: "-60px",
            width: "220px", height: "220px", borderRadius: "50%",
            pointerEvents: "none",
          }} />

          {/* Close button */}
          <motion.button
            whileHover={{ scale: 1.1, background: "rgba(0,0,0,0.1)" }}
            whileTap={{ scale: 0.9 }}
            onClick={close}
            style={{
              position: "absolute", top: "16px", right: "16px",
              width: "32px", height: "32px", borderRadius: "50%",
              border: "1px solid rgba(0,0,0,0.1)",
              background: "rgba(0,0,0,0.05)",
              cursor: "pointer", display: "flex", alignItems: "center",
              justifyContent: "center", color: "#4b5563",
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
              }}>
                <span style={{ fontFamily: "'Inter', serif", color: "#f0fdf4", fontSize: "13px", fontWeight: 700 }}>N</span>
              </div>
              <span style={{ fontFamily: "'Inter', serif", fontSize: "16px", fontWeight: 700, color: "#1f2937" }}>
                Nutri<span style={{ color: "#4ade80" }}>Smart</span>
              </span>
            </div>
            <h2 style={{
              fontFamily: "'Inter', serif", fontSize: "26px",
              fontWeight: 700, color: "#1f2937", margin: "0 0 6px", letterSpacing: "-0.01em",
            }}>
              {awaitingOtp ? "Verify Email" : (isSignup ? "Create an account" : "Welcome back")}
            </h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#4b5563", margin: 0, fontWeight: 300 }}>
              {awaitingOtp 
                ? "Enter the 6-digit OTP sent to your email" 
                : (isSignup ? "Sign up to start posting and commenting" : "Sign in to your account to continue")}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {error && (
              <div style={{ color: "#ef4444", fontSize: "13px", fontFamily: "'DM Sans', sans-serif", marginBottom: "8px" }}>
                {error}
              </div>
            )}
            {formFields.map(({ id, label, type, value, setter, placeholder }) => (
              <div key={id}>
                <label htmlFor={id} style={{
                  display: "block", fontFamily: "'DM Sans', sans-serif",
                  fontSize: "11px", fontWeight: 500, letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: focused === id ? "#4ade80" : "rgba(31,41,55,0.4)",
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
                    border: focused === id ? "1px solid rgba(74,222,128,0.5)" : "1px solid rgba(0,0,0,0.08)",
                    background: "rgba(0,0,0,0.04)",
                    color: "#1f2937", fontFamily: "'DM Sans', sans-serif",
                    fontSize: "14px", outline: "none", boxSizing: "border-box",
                    transition: "border-color 0.25s, box-shadow 0.25s",
                    boxShadow: focused === id ? "0 0 0 3px rgba(34,197,94,0.12)" : "none",
                  }}
                />
              </div>
            ))}

            {!isSignup && !awaitingOtp && (
              <div style={{ textAlign: "right", marginTop: "-4px" }}>
                <a href="#" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "rgba(74,222,128,0.7)", textDecoration: "none" }}>
                  Forgot password?
                </a>
              </div>
            )}

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              style={{
                marginTop: "4px", width: "100%", padding: "14px", borderRadius: "12px",
                background: "linear-gradient(135deg, #22c55e 0%, #059669 100%)",
                border: "none", color: "#f0fdf4",
                fontFamily: "'DM Sans', sans-serif", fontSize: "14px",
                fontWeight: 700, letterSpacing: "0.03em", cursor: "pointer",
                position: "relative", overflow: "hidden",
                opacity: loading ? 0.7 : 1,
              }}
            >
              <motion.span
                initial={{ x: "-120%" }}
                whileHover={{ x: "200%" }}
                transition={{ duration: 0.5 }}
                style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(105deg, transparent 40%, rgba(0,0,0,0.2) 50%, transparent 60%)",
                  pointerEvents: "none",
                }}
              />
              {loading ? "Please wait..." : (awaitingOtp ? "Verify OTP" : (isSignup ? "Sign Up" : "Sign In"))}
            </motion.button>

            {!awaitingOtp && (
              <>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "4px 0" }}>
                  <div style={{ flex: 1, height: "1px", background: "rgba(0,0,0,0.07)" }} />
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: "#4b5563" }}>or</span>
                  <div style={{ flex: 1, height: "1px", background: "rgba(0,0,0,0.07)" }} />
                </div>

                <p style={{ textAlign: "center", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#4b5563", margin: 0 }}>
                  {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
                  <button 
                    type="button"
                    onClick={() => { setIsSignup(!isSignup); setError(""); }}
                    style={{ 
                      color: "#4ade80", textDecoration: "none", fontWeight: 500, 
                      background: "none", border: "none", cursor: "pointer", padding: 0 
                    }}>
                    {isSignup ? "Sign in" : "Sign up"}
                  </button>
                </p>
              </>
            )}
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );

  return createPortal(modal, document.body);
}