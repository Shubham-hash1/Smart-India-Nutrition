import React from "react";
import Navlinks from "./Navlinks";
import Login from "./Login";

const Navbar = () => {
  return (
    <nav className="
      w-full
      bg-white
      shadow-md
      sticky top-0
      z-40
    ">
      <div className="
        max-w-screen-xl
        mx-auto
        flex
        items-center
        justify-between
        px-4 sm:px-6 md:px-10
        py-3
        font-semibold
      ">
        {/* Left Links */}
        <Navlinks />

        {/* Right Login */}
        <Login />
      </div>
    </nav>
  );
};

export default Navbar;