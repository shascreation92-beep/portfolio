import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Cpu, ArrowRight, CheckCircle2, Lock } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "./SocialIcons";
import { usePortfolio } from "../context/PortfolioContext";
import confetti from "canvas-confetti";

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  const { companyInfo } = usePortfolio();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setSubscribed(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.9 }
    });
  };

  return (
    <footer style={{
      background: "linear-gradient(180deg, rgba(6, 8, 13, 0.4) 0%, rgba(3, 5, 8, 1) 100%)",
      borderTop: "1px solid rgba(255, 255, 255, 0.07)",
      paddingTop: "80px",
      paddingBottom: "40px",
      position: "relative",
      zIndex: 1
    }}>
      <div className="container">
        {/* Top Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "48px",
          marginBottom: "60px"
        }}>
          {/* Brand & Mission */}
          <div style={{ maxWidth: "340px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <div style={{
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                background: "linear-gradient(135deg, rgba(0,242,254,0.2) 0%, rgba(139,92,246,0.2) 100%)",
                border: "1px solid rgba(0, 242, 254, 0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <Cpu size={20} color="#00f2fe" />
              </div>
              <span style={{
                fontFamily: "var(--font-heading)",
                fontSize: "1.3rem",
                fontWeight: 800,
                letterSpacing: "-0.01em"
              }}>
                V<span style={{ color: "var(--cyan)" }}>RANKLY</span>
              </span>
            </div>

            <p style={{ fontSize: "0.92rem", color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "20px" }}>
              Led by CEO {companyInfo?.ceo || "Faizan Cheena"}, {companyInfo?.name || "VRankly"}'s specialized agency guild delivers premier SEO/AEO/GEO ranking dominance, Google & Meta Ads, AI automations, and 24/7 business operations.
            </p>


          </div>

          {/* Navigation Links */}
          <div>
            <h4 style={{ fontSize: "1rem", color: "#fff", marginBottom: "18px", letterSpacing: "0.02em" }}>
              Company Sitemap
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
              <li>
                <Link to="/" style={{ color: "var(--text-secondary)", fontSize: "0.92rem" }}>Home Overview</Link>
              </li>
              <li>
                <Link to="/about" style={{ color: "var(--text-secondary)", fontSize: "0.92rem" }}>About VRankly</Link>
              </li>
              <li>
                <Link to="/services" style={{ color: "var(--text-secondary)", fontSize: "0.92rem" }}>All 19 Services</Link>
              </li>
              <li>
                <Link to="/portfolio" style={{ color: "var(--text-secondary)", fontSize: "0.92rem" }}>Client Case Studies</Link>
              </li>
              <li>
                <Link to="/team" style={{ color: "var(--text-secondary)", fontSize: "0.92rem" }}>Our Core Leadership Team</Link>
              </li>
              <li>
                <Link to="/contact" style={{ color: "var(--text-secondary)", fontSize: "0.92rem" }}>Contact CEO & Team</Link>
              </li>
            </ul>
          </div>

          {/* Solutions Verticals */}
          <div>
            <h4 style={{ fontSize: "1rem", color: "#fff", marginBottom: "18px", letterSpacing: "0.02em" }}>
              Key Solutions
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
              <li>
                <Link to="/services" style={{ color: "var(--text-secondary)", fontSize: "0.92rem" }}>SEO, AEO & GEO Search</Link>
              </li>
              <li>
                <Link to="/services" style={{ color: "var(--text-secondary)", fontSize: "0.92rem" }}>Google & Facebook Ads</Link>
              </li>
              <li>
                <Link to="/services" style={{ color: "var(--text-secondary)", fontSize: "0.92rem" }}>B2B & B2C Leads Engine</Link>
              </li>
              <li>
                <Link to="/services" style={{ color: "var(--text-secondary)", fontSize: "0.92rem" }}>Web & AI Automations</Link>
              </li>
              <li>
                <Link to="/services" style={{ color: "var(--text-secondary)", fontSize: "0.92rem" }}>Virtual Assistants & Calling</Link>
              </li>
              <li>
                <Link to="/services" style={{ color: "var(--text-secondary)", fontSize: "0.92rem" }}>Camera Surveillance & Data</Link>
              </li>
            </ul>
          </div>

          {/* Newsletter & Direct Inquiries */}
          <div>
            <h4 style={{ fontSize: "1rem", color: "#fff", marginBottom: "18px", letterSpacing: "0.02em" }}>
              VRankly Growth Dispatch
            </h4>
            <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", marginBottom: "14px", lineHeight: 1.6 }}>
              Receive our exclusive playbooks on dominating AI search, scaling Meta/Google ads, and automating business workflows.
            </p>

            {subscribed ? (
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 16px",
                borderRadius: "10px",
                background: "rgba(16, 185, 129, 0.12)",
                border: "1px solid rgba(16, 185, 129, 0.3)",
                color: "var(--emerald)",
                fontSize: "0.9rem"
              }}>
                <CheckCircle2 size={18} />
                <span>Subscribed! Welcome aboard.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display: "flex", gap: "8px" }}>
                <input
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    flex: 1,
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    borderRadius: "10px",
                    padding: "10px 14px",
                    color: "#fff",
                    fontSize: "0.88rem",
                    outline: "none"
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "var(--cyan)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(255, 255, 255, 0.12)")}
                />
                <button
                  type="submit"
                  className="btn-primary"
                  style={{ padding: "10px 18px", borderRadius: "10px", fontSize: "0.88rem" }}
                  aria-label="Subscribe to newsletter"
                >
                  <ArrowRight size={16} />
                </button>
              </form>
            )}

            <div style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                aria-label="VRankly GitHub"
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "8px",
                  background: "rgba(255, 255, 255, 0.05)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#cbd5e1"
                }}
              >
                <GithubIcon size={18} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="VRankly LinkedIn"
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "8px",
                  background: "rgba(255, 255, 255, 0.05)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#cbd5e1"
                }}
              >
                <LinkedinIcon size={18} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="VRankly Twitter"
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "8px",
                  background: "rgba(255, 255, 255, 0.05)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#cbd5e1"
                }}
              >
                <TwitterIcon size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: "1px solid rgba(255, 255, 255, 0.06)",
          paddingTop: "24px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "16px",
          fontSize: "0.85rem",
          color: "var(--text-muted)"
        }}>
          <div>
            © {CURRENT_YEAR} {companyInfo?.name || "VRankly"}. All rights reserved. Founded & Led by CEO {companyInfo?.ceo || "Faizan Cheena"}.
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <span>Full-Spectrum Agency • Global Delivery</span>
            <Link to="/contact" style={{ color: "var(--cyan)" }}>Inquire Directly →</Link>
            
            {/* Discreet Admin Portal Access Trigger */}
            <Link
              to="/admin"
              title="VRankly System Admin Portal"
              aria-label="VRankly System Admin Portal"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                color: "rgba(255, 255, 255, 0.18)",
                padding: "6px",
                borderRadius: "6px",
                transition: "all 0.25s ease",
                textDecoration: "none",
                marginLeft: "4px"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--cyan)";
                e.currentTarget.style.transform = "scale(1.2)";
                e.currentTarget.style.background = "rgba(0, 242, 254, 0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "rgba(255, 255, 255, 0.18)";
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.background = "transparent";
              }}
            >
              <Lock size={13} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
