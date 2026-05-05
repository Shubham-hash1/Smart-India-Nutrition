import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LoginForm from "./Loginform";
import { useAuth } from "../../../Context/AuthContext";

export default function Login() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {user && (
          <span style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "14px",
            color: "#f0e8dc",
            fontWeight: 500,
          }}>
            Hi, <span style={{ color: "#4ade80" }}>{user.name.split(' ')[0]}</span>
          </span>
        )}
        <motion.button
          onClick={() => {
            if (user) {
              logout();
            } else {
              setOpen(true);
            }
          }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.95 }}
          style={{
            padding: "9px 22px",
            borderRadius: "100px",
            background: user 
              ? "rgba(239, 68, 68, 0.15)" // Subtle red background for logout
              : "linear-gradient(135deg, #22c55e 0%, #059669 100%)",
            border: user ? "1px solid rgba(239, 68, 68, 0.3)" : "none",
            color: user ? "#fca5a5" : "#021a0a",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "13px",
            fontWeight: 700,
            letterSpacing: "0.03em",
            cursor: "pointer",
            boxShadow: "0 0 0 rgba(34,197,94,0)",
            transition: "all 0.3s ease",
            position: "relative",
            overflow: "hidden",
          }}
          onMouseEnter={e => {
            if (!user) {
              e.currentTarget.style.boxShadow = "0 0 20px rgba(34,197,94,0.4)";
            } else {
              e.currentTarget.style.boxShadow = "0 0 20px rgba(239, 68, 68, 0.2)";
              e.currentTarget.style.background = "rgba(239, 68, 68, 0.25)";
            }
          }}
          onMouseLeave={e => {
            if (!user) {
              e.currentTarget.style.boxShadow = "0 0 0 rgba(34,197,94,0)";
            } else {
              e.currentTarget.style.boxShadow = "0 0 0 rgba(239, 68, 68, 0)";
              e.currentTarget.style.background = "rgba(239, 68, 68, 0.15)";
            }
          }}
        >
          {/* Shine sweep (only for login) */}
          {!user && (
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
          )}
          {user ? "Logout" : "Login"}
        </motion.button>
      </div>

      {/* ── Modal ── */}
      <AnimatePresence>
        {open && !user && <LoginForm close={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  );
}