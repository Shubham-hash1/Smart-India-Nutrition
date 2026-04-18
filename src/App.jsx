import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Navbar from "./Component/Links/Navbar/Navbar.jsx";
import Footer from "./Component/Footer/Footer.jsx";

import HeroSection from "./Component/Sections/HeroSection.jsx";
import Hotspot_bimari from "./Component/Sections/Hotspot_bimari.jsx";
import Age_Section from "./Component/Sections/Age_Section.jsx";
import Ai from "./Component/Ai_Section.jsx/Ai.jsx";

import About from "./Component/Links/About.jsx";
import Products from "./Component/Links/Product.jsx";
import Blog from "./Component/Links/Blogs.jsx";

import CommonPage from "./Component/Common/CommonPage.jsx";
import ProductSection from "./Component/Product/ProductSection.jsx";

/* ── Page transition wrapper ── */
const pageVariants = {
  initial: { opacity: 0, y: 24, filter: "blur(6px)" },
  enter:   { opacity: 1, y: 0,  filter: "blur(0px)",
    transition: { duration: 0.55, ease: [0.23, 1, 0.32, 1] } },
  exit:    { opacity: 0, y: -16, filter: "blur(4px)",
    transition: { duration: 0.3, ease: [0.32, 0, 0.67, 0] } },
};

const PageWrapper = ({ children }) => (
  <motion.div
    variants={pageVariants}
    initial="initial"
    animate="enter"
    exit="exit"
    style={{ willChange: "opacity, transform" }}
  >
    {children}
  </motion.div>
);

/* ── Home page ── */
const Home = () => (
  <PageWrapper>
    <HeroSection />
    <Ai />
    <Hotspot_bimari />
    <Age_Section />
  </PageWrapper>
);

/* ── Animated routes — must live inside <BrowserRouter> to access useLocation ── */
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />

        <Route path="/about"   element={<PageWrapper><About /></PageWrapper>} />
        <Route path="/products" element={<PageWrapper><Products /></PageWrapper>} />
        <Route path="/blogs"   element={<PageWrapper><Blog /></PageWrapper>} />

        <Route path="/obesity"      element={<PageWrapper><CommonPage /></PageWrapper>} />
        <Route path="/diabetes"     element={<PageWrapper><CommonPage /></PageWrapper>} />
        <Route path="/heart"        element={<PageWrapper><CommonPage /></PageWrapper>} />
        <Route path="/stomach"      element={<PageWrapper><CommonPage /></PageWrapper>} />
        <Route path="/nutritional"  element={<PageWrapper><CommonPage /></PageWrapper>} />

        <Route path="/adult"    element={<PageWrapper><CommonPage /></PageWrapper>} />
        <Route path="/child"    element={<PageWrapper><CommonPage /></PageWrapper>} />
        <Route path="/teen"     element={<PageWrapper><CommonPage /></PageWrapper>} />
        <Route path="/toddler"  element={<PageWrapper><CommonPage /></PageWrapper>} />
        <Route path="/oldage"   element={<PageWrapper><CommonPage /></PageWrapper>} />

        <Route path="/Products" element={<PageWrapper><ProductSection /></PageWrapper>} />

        <Route
          path="*"
          element={
            <PageWrapper>
              <div
                style={{
                  minHeight: "60vh",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "'Playfair Display', serif",
                  color: "#f0e8dc",
                  background: "#080706",
                  gap: "16px",
                }}
              >
                <span style={{ fontSize: "80px", fontWeight: 900, opacity: 0.12 }}>404</span>
                <h1 style={{ fontSize: "28px", margin: 0 }}>Page Not Found</h1>
                <p style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(240,232,220,0.45)", margin: 0 }}>
                  The page you're looking for doesn't exist.
                </p>
              </div>
            </PageWrapper>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

/* ── Root app ── */
const App = () => (
  <BrowserRouter>
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <AnimatedRoutes />
      </main>
      <Footer />
    </div>
  </BrowserRouter>
);

export default App;