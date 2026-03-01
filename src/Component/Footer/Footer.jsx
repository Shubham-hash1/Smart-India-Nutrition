import React from "react";

const Footer = () => {
  return (
    <footer className="bg-amber-300 w-full">

      <div className="max-w-screen-xl mx-auto px-4 py-8">

        {/* Grid Section */}
        <div className="
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          gap-8
          text-center md:text-left
        ">

          {/* Company */}
          <div>
            <h2 className="mb-4 text-sm font-bold uppercase">
              Company
            </h2>
            <ul className="space-y-2">
              <li><a href="/about" className="hover:underline">About</a></li>
              <li><a href="#" className="hover:underline">Careers</a></li>
              <li><a href="/products" className="hover:underline">Product</a></li>
              <li><a href="/blogs" className="hover:underline">Blogs</a></li>
            </ul>
          </div>

          {/* Help Center */}
          <div>
            <h2 className="mb-4 text-sm font-bold uppercase">
              Help Center
            </h2>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">Discord</a></li>
              <li><a href="#" className="hover:underline">Twitter</a></li>
              <li><a href="#" className="hover:underline">Facebook</a></li>
              <li><a href="#" className="hover:underline">Contact</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h2 className="mb-4 text-sm font-bold uppercase">
              Legal
            </h2>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">Privacy Policy</a></li>
              <li><a href="#" className="hover:underline">Licensing</a></li>
              <li><a href="#" className="hover:underline">Terms & Conditions</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="
          mt-8
          flex
          flex-col
          md:flex-row
          items-center
          justify-between
          gap-4
          border-t
          pt-6
          text-sm
          text-center
        ">
          <span>
            © 2026 Smart India Nutrition. All Rights Reserved.
          </span>

          {/* Social Icons */}
          <div className="flex space-x-4">
            <a href="#" className="hover:scale-110 transition">FB</a>
            <a href="#" className="hover:scale-110 transition">TW</a>
            <a href="#" className="hover:scale-110 transition">GH</a>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="border-t mt-6 pt-4 text-center text-sm">
          <h1 className="text-lg font-semibold">
            Medical Disclaimer
          </h1>
          <p className="mt-2 max-w-3xl mx-auto">
            The content on this website is not intended to diagnose,
            treat, cure, or prevent any disease. Please consult a
            qualified healthcare professional for medical advice.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;