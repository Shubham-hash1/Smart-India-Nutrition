import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./Component/Links/Navbar/Navbar.jsx";
import Footer from "./Component/Footer/Footer.jsx";

import HeroSection from "./Component/Sections/HeroSection.jsx";
import Hotspot_bimari from "./Component/Sections/Hotspot_bimari.jsx";
import Age_Section from "./Component/Sections/Age_Section.jsx";
import Ai from "./Component/Ai_Section.jsx/Ai.jsx";

import About from "./Component/Links/About.jsx";
import Products from "./Component/Links/Product.jsx";
import Blog from "./Component/Links/Blogs.jsx";

import Obesitysol from "./Component/Hotspot_Sol/Obesitysol.jsx";
import DiabitesSol from "./Component/Hotspot_Sol/DiabitesSol.jsx"
import HeartSol from "./Component/Hotspot_Sol/HeartSol.jsx";
import StomachSol from "./Component/Hotspot_Sol/StomachSol.jsx";
import NutritionalSol from "./Component/Hotspot_Sol/NutritionalSol.jsx";

import AdultSol from "./Component/Acc_Age_Sol/AdultSol.jsx";
import ChildSol from "./Component/Acc_Age_Sol/ChildSol.jsx";
import TeenSol from "./Component/Acc_Age_Sol/TeenSol.jsx";
import ToddlerSol from "./Component/Acc_Age_Sol/ToddlerSol.jsx";
import OldAgeSol from "./Component/Acc_Age_Sol/OldAgeSol.jsx";

import CommonPage from "./Component/Common/CommonPage.jsx";

 
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

            <Route path="/obesity" element={<CommonPage />} />
            <Route path="/diabetes" element={<CommonPage/>}/>
            <Route path="/heart" element={<CommonPage/>}/>
            <Route path="/stomach" element={<CommonPage />} />
            <Route path="/nutritional" element={<CommonPage/>}/>

            <Route path="/adult" element={<CommonPage />}/>
            <Route path="/child" element={<CommonPage />}/>
            <Route path="/teen" element={<CommonPage />}/>
            <Route path="/toddler" element={<CommonPage />}/>
            <Route path="/oldage" element={<CommonPage />}/>

            {/* <Route path="/nutrition" element={<CommonPage />} /> */}

            <Route path="*" element={<h1>Page Not Found</h1>} />
          </Routes>
        </main>

        <Footer />

      </div>

    </BrowserRouter>
  );
};

export default App;