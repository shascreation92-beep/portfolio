import React, { useState, useEffect, lazy, Suspense } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ParticleBackground from "./components/ParticleBackground";
import CursorGlow from "./components/CursorGlow";
import ScrollToTop from "./components/ScrollToTop";
import VisitorTracker from "./components/VisitorTracker";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import PortfolioPage from "./pages/PortfolioPage";
import TeamPage from "./pages/TeamPage";
import ContactPage from "./pages/ContactPage";
import { PortfolioProvider } from "./context/PortfolioContext";

import { ArrowUp } from "lucide-react";

// Code-split heavy admin panel to optimize initial page bundle
const AdminPage = lazy(() => import("./pages/AdminPage"));

function RouteLoadingFallback() {
  return (
    <div style={{
      minHeight: "60vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      gap: "16px"
    }}>
      <div style={{
        width: "36px",
        height: "36px",
        borderRadius: "50%",
        border: "3px solid rgba(0, 242, 254, 0.2)",
        borderTopColor: "var(--cyan)",
        animation: "spin 0.8s linear infinite"
      }} />
      <span style={{ fontSize: "0.9rem", color: "var(--text-secondary)", letterSpacing: "0.05em" }}>
        Loading module...
      </span>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", checkScroll);
    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <PortfolioProvider>
      <Router>
        <div style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
          
          {/* Ambient Cursor Glow & Canvas Particles */}
          <CursorGlow />
          <ParticleBackground />
          <ScrollToTop />
          <VisitorTracker />

          {/* Global Navigation */}
          <Navbar />

          {/* Multi-Page Route Views */}
          <main style={{ flex: 1, position: "relative", zIndex: 1 }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
              <Route path="/team" element={<TeamPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route
                path="/admin"
                element={
                  <Suspense fallback={<RouteLoadingFallback />}>
                    <AdminPage />
                  </Suspense>
                }
              />
              <Route path="*" element={<HomePage />} />
            </Routes>
          </main>

          {/* Global Footer */}
          <Footer />

          {/* Floating Back to Top Button */}
          {showScrollTop && (
            <button
              onClick={scrollToTop}
              aria-label="Scroll to top"
              style={{
                position: "fixed",
                bottom: "30px",
                right: "30px",
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                background: "rgba(11, 16, 28, 0.85)",
                border: "1px solid rgba(0, 242, 254, 0.4)",
                color: "var(--cyan)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                zIndex: 800,
                boxShadow: "0 6px 20px rgba(0, 0, 0, 0.6), 0 0 20px rgba(0, 242, 254, 0.25)",
                backdropFilter: "blur(10px)",
                transition: "transform 0.2s, background 0.2s"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.background = "rgba(0, 242, 254, 0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.background = "rgba(11, 16, 28, 0.85)";
              }}
            >
              <ArrowUp size={22} />
            </button>
          )}

        </div>
      </Router>
    </PortfolioProvider>
  );
}

