// import React from "react";
// import Navlinks from "./Navlinks";
// import Login from "./Login";

// const Navbar = () => {
//   return (
//     <nav className="
//       w-full
//       bg-white
//       shadow-md
//       sticky top-0
//       z-40
//     ">
//       <div className="
//         max-w-screen-xl
//         mx-auto
//         flex
//         items-center
//         justify-between
//         px-4 sm:px-6 md:px-10
//         py-3
//         font-semibold
//       ">
//         {/* Left Links */}
//         <Navlinks />

//         {/* Right Login */}
//         <Login />
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navlinks from "./Navlinks";
import Login from "./Login";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Main Navbar */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`w-full sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-white/80 backdrop-blur-md shadow-lg shadow-black/5 border-b border-gray-100"
            : "bg-white shadow-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 md:px-10 py-3 font-semibold">

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded-lg bg-linear-to-br from-green-400 to-emerald-600 flex items-center justify-center shadow-md">
              <span className="text-white text-sm font-bold">N</span>
            </div>
            <span className="text-gray-800 font-bold text-lg tracking-tight hidden sm:block">
              NutriSmart
            </span>
          </motion.div>

          {/* Desktop Nav Links */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="hidden md:flex"
          >
            <Navlinks />
          </motion.div>

          {/* Right side — Login + Hamburger */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex items-center gap-3"
          >
            {/* Login — hidden on mobile */}
            <div className="hidden md:flex">
              <Login />
            </div>

            {/* Hamburger — visible on mobile */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex flex-col justify-center items-center w-9 h-9 rounded-lg hover:bg-gray-100 transition-colors gap-1.5"
              aria-label="Toggle menu"
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
                className="block w-5 h-0.5 bg-gray-700 rounded-full"
              />
              <motion.span
                animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.2 }}
                className="block w-5 h-0.5 bg-gray-700 rounded-full"
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
                className="block w-5 h-0.5 bg-gray-700 rounded-full"
              />
            </motion.button>
          </motion.div>
        </div>

        {/* Animated bottom border accent */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
          className="h-0.5 bg-gradient-to-r from-transparent via-green-400 to-transparent origin-center"
        />
      </motion.nav>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden sticky top-[57px] z-30 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-lg overflow-hidden"
          >
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="max-w-screen-xl mx-auto px-6 py-4 flex flex-col gap-4"
            >
              <Navlinks mobile />
              <div className="pt-2 border-t border-gray-100">
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