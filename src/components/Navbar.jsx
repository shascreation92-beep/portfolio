import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, X, ArrowUpRight, Cpu } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on browser navigation
  useEffect(() => {
    const handlePopState = () => setIsOpen(false);
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Team", path: "/team" },
    { name: "Contact", path: "/contact" }
  ];

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 900,
        transition: "all 0.3s ease",
        background: scrolled
          ? "rgba(6, 8, 13, 0.88)"
          : "rgba(6, 8, 13, 0.45)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: scrolled
          ? "1px solid rgba(255, 255, 255, 0.08)"
          : "1px solid rgba(255, 255, 255, 0.03)",
        boxShadow: scrolled ? "0 10px 30px rgba(0, 0, 0, 0.6)" : "none"
      }}
    >
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "80px" }}>
        
        {/* Brand Logo */}
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none" }}>
          <div style={{
            width: "44px",
            height: "44px",
            borderRadius: "12px",
            background: "linear-gradient(135deg, rgba(0,242,254,0.15) 0%, rgba(139,92,246,0.2) 100%)",
            border: "1px solid rgba(0, 242, 254, 0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 20px rgba(0, 242, 254, 0.25)"
          }}>
            <Cpu size={24} color="#00f2fe" />
          </div>
          <div>
            <div style={{
              fontFamily: "var(--font-heading)",
              fontSize: "1.35rem",
              fontWeight: 800,
              letterSpacing: "-0.01em",
              display: "flex",
              alignItems: "center",
              gap: "6px"
            }}>
              <span>V</span>
              <span style={{
                color: "var(--cyan)",
                background: "var(--gradient-brand)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}>
                RANKLY
              </span>
            </div>
            <div style={{ fontSize: "0.68rem", color: "var(--text-muted)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              SEO • AI • Digital Operations
            </div>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav style={{ display: "none", alignItems: "center", gap: "32px" }} className="desktop-nav">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              style={({ isActive }) => ({
                fontFamily: "var(--font-heading)",
                fontSize: "0.95rem",
                fontWeight: isActive ? "700" : "500",
                color: isActive ? "#00f2fe" : "var(--text-secondary)",
                transition: "all 0.2s ease",
                position: "relative",
                padding: "6px 2px"
              })}
            >
              {({ isActive }) => (
                <>
                  <span>{link.name}</span>
                  {isActive && (
                    <span style={{
                      position: "absolute",
                      bottom: "-4px",
                      left: "15%",
                      width: "70%",
                      height: "2px",
                      background: "var(--gradient-brand)",
                      borderRadius: "2px",
                      boxShadow: "0 0 10px rgba(0, 242, 254, 0.8)"
                    }} />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Right CTA */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <Link
            to="/contact"
            className="btn-primary"
            style={{
              padding: "10px 22px",
              fontSize: "0.88rem",
              display: "none"
            }}
            id="nav-cta-btn"
          >
            <span>Let's Talk</span>
            <ArrowUpRight size={16} />
          </Link>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Navigation Menu"
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "10px",
              color: "#fff",
              width: "44px",
              height: "44px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer"
            }}
            className="mobile-toggle"
          >
            {isOpen ? <X size={22} color="#00f2fe" /> : <Menu size={22} />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div
          style={{
            background: "rgba(6, 8, 13, 0.98)",
            backdropFilter: "blur(25px)",
            WebkitBackdropFilter: "blur(25px)",
            borderBottom: "1px solid rgba(0, 242, 254, 0.2)",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            gap: "18px"
          }}
          className="mobile-drawer"
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              style={({ isActive }) => ({
                fontSize: "1.2rem",
                fontWeight: isActive ? 700 : 500,
                color: isActive ? "#00f2fe" : "#cbd5e1",
                padding: "8px 0",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: "1px solid rgba(255, 255, 255, 0.05)"
              })}
            >
              <span>{link.name}</span>
              <ArrowUpRight size={18} color="rgba(255,255,255,0.3)" />
            </NavLink>
          ))}

          <div style={{ paddingTop: "12px" }}>
            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="btn-primary"
              style={{ width: "100%", textAlign: "center", padding: "14px" }}
            >
              Start Your Project
            </Link>
          </div>

          <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", textAlign: "center", marginTop: "10px" }}>
            ✉ contact@vrankly.com • Global Remote Delivery
          </div>
        </div>
      )}

      {/* Injected style rules for desktop vs mobile */}
      <style>{`
        @media (min-width: 860px) {
          .desktop-nav {
            display: flex !important;
          }
          #nav-cta-btn {
            display: inline-flex !important;
          }
          .mobile-toggle {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}
