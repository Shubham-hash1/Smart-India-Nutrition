import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LoginForm from "./Loginform";

export default function Login() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* ── Login Button ── */}
      <motion.button
        onClick={() => setOpen(true)}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.95 }}
        style={{
          padding: "9px 22px",
          borderRadius: "100px",
          background: "linear-gradient(135deg, #22c55e 0%, #059669 100%)",
          border: "none",
          color: "#021a0a",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "13px",
          fontWeight: 700,
          letterSpacing: "0.03em",
          cursor: "pointer",
          boxShadow: "0 0 0 rgba(34,197,94,0)",
          transition: "box-shadow 0.3s ease",
          position: "relative",
          overflow: "hidden",
        }}
        onMouseEnter={e => e.currentTarget.style.boxShadow = "0 0 20px rgba(34,197,94,0.4)"}
        onMouseLeave={e => e.currentTarget.style.boxShadow = "0 0 0 rgba(34,197,94,0)"}
      >
        {/* Shine sweep */}
        <motion.span
          initial={{ x: "-120%" }}
          whileHover={{ x: "200%" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.25) 50%, transparent 60%)",
            pointerEvents: "none",
          }}
        />
        Login
      </motion.button>

      {/* ── Modal ── */}
      <AnimatePresence>
        {open && <LoginForm close={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  );
}