import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./Component/Navbar/Navbar.jsx";
import Footer from "./Component/Footer/Footer.jsx";

import HeroSection from "./Component/HeroSection/HeroSection.jsx";
import Hotspot_bimari from "./Component/Hotspot/Hotspot_bimari.jsx";
import Age_Section from "./Component/Acc_Age/Age_Section.jsx";
import Ai from "./Component/Ai_Section.jsx/Ai.jsx";

import About from "./Component/Links/About.jsx";
import Products from "./Component/Links/Product.jsx";
import Blog from "./Component/Links/Blogs.jsx";

/* Home Page */
const Home = () => {
  return (
    <>
      <HeroSection />
      <Ai />
      <Hotspot_bimari />
      <Age_Section />
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>

      {/* Layout Wrapper */}
      <div className="flex flex-col min-h-screen">

        <Navbar />

        {/* Page Content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/blogs" element={<Blog />} />
          </Routes>
        </main>

        <Footer />

      </div>

    </BrowserRouter>
  );
};

export default App;