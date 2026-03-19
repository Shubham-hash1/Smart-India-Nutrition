// import { useState } from "react";
// import { Link } from "react-router-dom";

// const Navlinks = () => {
//   const [open, setOpen] = useState(false);

//   return (
//     <>
//       {/* Hamburger Button */}
//       <button
//         className="md:hidden text-2xl"
//         onClick={() => setOpen(!open)}
//       >
//         ☰
//       </button>

//       {/* Desktop Links */}
//       <ul className="hidden md:flex space-x-6 font-medium">
//         <li><Link to="/">Home</Link></li>
//         <li><Link to="/about">About</Link></li>
//         <li><Link to="/products">Products</Link></li>
//         <li><Link to="/blogs">Blogs</Link></li>
//       </ul>

//       {/* Mobile Menu */}
//       {open && (
//         <div className="
//           absolute
//           top-16
//           left-0
//           w-full
//           bg-white
//           shadow-md
//           md:hidden
//         ">
//           <ul className="flex flex-col items-center gap-6 py-6">
//             <li><Link to="/" onClick={()=>setOpen(false)}>Home</Link></li>
//             <li><Link to="/about" onClick={()=>setOpen(false)}>About</Link></li>
//             <li><Link to="/products" onClick={()=>setOpen(false)}>Products</Link></li>
//             <li><Link to="/blogs" onClick={()=>setOpen(false)}>Blogs</Link></li>
//           </ul>
//         </div>
//       )}
//     </>
//   );
// };

// export default Navlinks;

// Here is the updated navlink filled with framermotion animation

import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/products", label: "Products" },
  { to: "/blogs", label: "Blogs" },
];

const NavItem = ({ to, label, index, mobile = false, onClick }) => {
  const { pathname } = useLocation();
  const isActive = pathname === to;

  if (mobile) {
    return (
      <motion.li
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.07, duration: 0.3, ease: "easeOut" }}
      >
        <Link
          to={to}
          onClick={onClick}
          className={`block text-base font-medium py-2 px-3 rounded-lg transition-colors ${
            isActive
              ? "text-emerald-600 bg-emerald-50"
              : "text-gray-700 hover:text-emerald-600 hover:bg-gray-50"
          }`}
        >
          {label}
        </Link>
      </motion.li>
    );
  }

  return (
    <motion.li
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 + index * 0.08, duration: 0.4, ease: "easeOut" }}
      className="relative"
    >
      <Link
        to={to}
        className={`relative text-sm font-semibold tracking-wide transition-colors duration-200 py-1 group ${
          isActive ? "text-emerald-600" : "text-gray-600 hover:text-emerald-600"
        }`}
      >
        {label}

        {/* Animated underline on hover */}
        <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-emerald-500 rounded-full transition-all duration-300 group-hover:w-full" />

        {/* Active dot indicator */}
        {isActive && (
          <motion.span
            layoutId="activeIndicator"
            className="absolute -bottom-0.5 left-0 w-full h-0.5 bg-emerald-500 rounded-full"
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          />
        )}
      </Link>
    </motion.li>
  );
};

const Navlinks = ({ mobile = false }) => {
  if (mobile) {
    return (
      <ul className="flex flex-col gap-1">
        {links.map((link, i) => (
          <NavItem key={link.to} {...link} index={i} mobile />
        ))}
      </ul>
    );
  }

  return (
    <ul className="hidden md:flex items-center gap-7">
      {links.map((link, i) => (
        <NavItem key={link.to} {...link} index={i} />
      ))}
    </ul>
  );
};

export default Navlinks;