import { useState } from "react";
import { Link } from "react-router-dom";

const Navlinks = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Hamburger Button */}
      <button
        className="md:hidden text-2xl"
        onClick={() => setOpen(!open)}
      >
        ☰
      </button>

      {/* Desktop Links */}
      <ul className="hidden md:flex space-x-6 font-medium">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/blogs">Blogs</Link></li>
      </ul>

      {/* Mobile Menu */}
      {open && (
        <div className="
          absolute
          top-16
          left-0
          w-full
          bg-white
          shadow-md
          md:hidden
        ">
          <ul className="flex flex-col items-center gap-6 py-6">
            <li><Link to="/" onClick={()=>setOpen(false)}>Home</Link></li>
            <li><Link to="/about" onClick={()=>setOpen(false)}>About</Link></li>
            <li><Link to="/products" onClick={()=>setOpen(false)}>Products</Link></li>
            <li><Link to="/blogs" onClick={()=>setOpen(false)}>Blogs</Link></li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Navlinks;