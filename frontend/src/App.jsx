import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { AuthProvider } from "./Context/AuthContext.jsx";
import { ThemeProvider } from "./Context/ThemeContext.jsx";
import { LanguageProvider } from "./Context/LanguageContext.jsx";

import Navbar from "./Component/Links/Navbar/Navbar.jsx";
import Footer from "./Component/Footer/Footer.jsx";
import HealthCalculators from "./Component/Calculators/HealthCalculators.jsx";

import HeroSection from "./Component/Sections/HeroSection.jsx";
import Hotspot_bimari from "./Component/Sections/Hotspot_bimari.jsx";
import Age_Section from "./Component/Sections/Age_Section.jsx";
import Ai from "./Component/Ai_Section.jsx/Ai.jsx";

import CommonPage from "./Component/Common/CommonPage.jsx";
import ProductSection from "./Component/Product/ProductSection.jsx";

// Lazy-loaded pages (Light loading optimization)
const About = lazy(() => import("./Component/Links/About.jsx"));
const Products = lazy(() => import("./Component/Links/Product.jsx"));
const Blog = lazy(() => import("./Component/Links/Blogs.jsx"));
const AiAssistant = lazy(() => import("./Component/Links/AiAssistant.jsx"));
const CalorieTracker = lazy(() => import("./Component/Links/CalorieTracker.jsx"));

/* ── Skeleton Loader Fallback ── */
const PageSkeleton = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
    <div className="w-12 h-12 rounded-full border-4 border-green-500 border-t-transparent animate-spin"></div>
    <p className="text-sm font-semibold tracking-wide text-gray-500">Loading premium content...</p>
  </div>
);

/* ── Page transition wrapper ── */
const pageVariants = {
  initial: { opacity: 0, y: 24,  },
  enter:   { opacity: 1, y: 0,  
    transition: { duration: 0.55, ease: [0.23, 1, 0.32, 1] } },
  exit:    { opacity: 0, y: -16, 
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

const LazyWrapper = ({ children }) => (
  <LazyWrapperWithSuspense>
    {children}
  </LazyWrapperWithSuspense>
);

const LazyWrapperWithSuspense = ({ children }) => (
  <PageWrapper>
    <Suspense fallback={<PageSkeleton />}>
      {children}
    </Suspense>
  </PageWrapper>
);

/* ── Home page ── */
const Home = () => (
  <PageWrapper>
    <HeroSection />
    <Ai />
    <Hotspot_bimari />
    <Age_Section />
    <HealthCalculators />
  </PageWrapper>
);

/* ── Animated routes — must live inside <BrowserRouter> to access useLocation ── */
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />

        <Route path="/about"           element={<LazyWrapperWithSuspense><About /></LazyWrapperWithSuspense>} />
        <Route path="/products"        element={<LazyWrapperWithSuspense><Products /></LazyWrapperWithSuspense>} />
        <Route path="/blogs"           element={<LazyWrapperWithSuspense><Blog /></LazyWrapperWithSuspense>} />
        <Route path="/ai-assistant"    element={<LazyWrapperWithSuspense><AiAssistant /></LazyWrapperWithSuspense>} />
        <Route path="/calorie-tracker" element={<LazyWrapperWithSuspense><CalorieTracker /></LazyWrapperWithSuspense>} />

        <Route path="/obesity"      element={<PageWrapper><CommonPage /></PageWrapper>} />
        <Route path="/diabetes"     element={<PageWrapper><CommonPage /></PageWrapper>} />
        <Route path="/heart"        element={<PageWrapper><CommonPage /></PageWrapper>} />
        <Route path="/stomach"      element={<PageWrapper><CommonPage /></PageWrapper>} />
        <Route path="/nutritional"  element={<PageWrapper><CommonPage /></PageWrapper>} />
        <Route path="/hypertension" element={<PageWrapper><CommonPage /></PageWrapper>} />
        <Route path="/thyroid"      element={<PageWrapper><CommonPage /></PageWrapper>} />
        <Route path="/pcod"         element={<PageWrapper><CommonPage /></PageWrapper>} />
        <Route path="/liver"        element={<PageWrapper><CommonPage /></PageWrapper>} />

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
                  fontFamily: "'Inter', serif",
                  color: "#1f2937",
                  background: "var(--bg-primary)",
                  gap: "16px",
                }}
              >
                <span style={{ fontSize: "80px", fontWeight: 900, opacity: 0.12 }}>404</span>
                <h1 style={{ fontSize: "28px", margin: 0, color: "var(--text-primary)" }}>Page Not Found</h1>
                <p style={{ fontFamily: "'DM Sans', sans-serif", color: "var(--text-secondary)", margin: 0 }}>
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
  <AuthProvider>
    <ThemeProvider>
      <LanguageProvider>
        <BrowserRouter>
          <div className="flex flex-col min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-200">
            <Navbar />
            <main className="flex-grow">
              <AnimatedRoutes />
            </main>
            
            <Footer />
          </div>
        </BrowserRouter>
      </LanguageProvider>
    </ThemeProvider>
  </AuthProvider>
);
export default App;