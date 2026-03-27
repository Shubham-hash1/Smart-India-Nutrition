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
import Obesitysol from "./Component/Hotspot/Obesitysol.jsx";
import DiabitesSol from "./Component/Hotspot/DiabitesSol.jsx"
import HeartSol from "./Component/Hotspot/HeartSol.jsx";
import StomachSol from "./Component/Hotspot/StomachSol.jsx";
import NutritionalSol from "./Component/Hotspot/NutritionalSol.jsx";
import AdultSol from "./Component/Acc_Age/AdultSol.jsx";
import ChildSol from "./Component/Acc_Age/ChildSol.jsx";
import TeenSol from "./Component/Acc_Age/TeenSol.jsx";
import ToddlerSol from "./Component/Acc_Age/ToddlerSol.jsx";
import OldAgeSol from "./Component/Acc_Age/OldAgeSol.jsx";

/* Home Page */
const Home = () => {
  return (
    <>
      <HeroSection/>
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
            <Route path="/obesity" element={<Obesitysol />} />
            <Route path="/diabetes" element={<DiabitesSol/>}/>
            <Route path="/heart" element={<HeartSol/>}/>
            <Route path="/stomach" element={<StomachSol />} />
            <Route path="/nutritional" element={<NutritionalSol/>}/>
            <Route path="/adult" element={<AdultSol/>}/>
            <Route path="/child" element={<ChildSol/>}/>
            <Route path="/teen" element={<TeenSol/>}/>
            <Route path="/toddler" element={<ToddlerSol/>}/>
            <Route path="/oldage" element={<OldAgeSol/>}/>

            <Route path="*" element={<h1>Page Not Found</h1>} />
          </Routes>
        </main>

        <Footer />

      </div>

    </BrowserRouter>
  );
};

export default App;