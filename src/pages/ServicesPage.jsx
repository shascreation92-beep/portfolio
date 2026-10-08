import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  CheckCircle2, 
  ArrowRight, 
  Calculator, 
  Clock, 
  Code2,
  Search,
  Target,
  FileText,
  Headphones,
  Camera
} from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";

export default function ServicesPage() {
  const navigate = useNavigate();
  const { services: SERVICES } = usePortfolio();

  // Project Estimator State
  const [serviceVertical, setServiceVertical] = useState("seo");
  const [businessScale, setBusinessScale] = useState("multi");
  const [teamModel, setTeamModel] = useState("pod");
  const [cadence, setCadence] = useState("monthly");

  const calculateEstimate = () => {
    let baseMin = 1500;
    let baseMax = 3200;
    let timeEst = "Ongoing Monthly Sprints";

    if (serviceVertical === "seo") {
      baseMin = 1500; baseMax = 3200;
      timeEst = "Monthly Sprint Cycles";
    } else if (serviceVertical === "ads") {
      baseMin = 1800; baseMax = 4200;
      timeEst = "Weekly Optimization & Scaling";
    } else if (serviceVertical === "web") {
      baseMin = 2400; baseMax = 5800;
      timeEst = "3 - 6 Weeks Delivery";
    } else if (serviceVertical === "ops") {
      baseMin = 1400; baseMax = 3500;
      timeEst = "Immediate 24/7 Deployment";
    } else if (serviceVertical === "growth") {
      baseMin = 4500; baseMax = 9500;
      timeEst = "Full Guild Integration";
    }

    // Scale multiplier
    if (businessScale === "multi") {
      baseMin += 800;
      baseMax += 1500;
    } else if (businessScale === "enterprise") {
      baseMin += 2200;
      baseMax += 4500;
    }

    // Team model
    if (teamModel === "pod") {
      baseMin += 900;
      baseMax += 1800;
    } else if (teamModel === "full") {
      baseMin += 2400;
      baseMax += 4800;
    }

    // Cadence
    if (cadence === "quarterly") {
      baseMin = Math.round(baseMin * 0.9);
      baseMax = Math.round(baseMax * 0.9);
      timeEst = "Quarterly Strategic Retainer (-10%)";
    } else if (cadence === "sprint") {
      baseMin = Math.round(baseMin * 1.15);
      baseMax = Math.round(baseMax * 1.15);
      timeEst = "4-Week Rapid Sprint";
    }

    return {
      minPrice: baseMin.toLocaleString(),
      maxPrice: baseMax.toLocaleString(),
      timeEstimate: timeEst,
      rateType: cadence === "sprint" ? "Project Sprint" : "/ Month"
    };
  };

  const estimate = calculateEstimate();

  const handleStartWithEstimate = () => {
    navigate(`/contact?vertical=${serviceVertical}&scale=${businessScale}&team=${teamModel}&cadence=${cadence}`);
  };

  const serviceMetaMap = {
    "seo-aeo-geo": {
      icon: Search,
      color: "var(--cyan)",
      bg: "linear-gradient(135deg, rgba(0, 242, 254, 0.15) 0%, rgba(59, 130, 246, 0.2) 100%)",
      border: "1px solid rgba(0, 242, 254, 0.4)"
    },
    "paid-ads-leads": {
      icon: Target,
      color: "#c084fc",
      bg: "linear-gradient(135deg, rgba(168, 85, 247, 0.18) 0%, rgba(217, 70, 239, 0.2) 100%)",
      border: "1px solid rgba(168, 85, 247, 0.4)"
    },
    "web-ai-automations": {
      icon: Code2,
      color: "var(--emerald)",
      bg: "linear-gradient(135deg, rgba(16, 185, 129, 0.18) 0%, rgba(0, 242, 254, 0.2) 100%)",
      border: "1px solid rgba(16, 185, 129, 0.4)"
    },
    "content-copywriting": {
      icon: FileText,
      color: "#f59e0b",
      bg: "linear-gradient(135deg, rgba(245, 158, 11, 0.18) 0%, rgba(234, 88, 12, 0.2) 100%)",
      border: "1px solid rgba(245, 158, 11, 0.4)"
    },
    "va-client-handling": {
      icon: Headphones,
      color: "var(--cyan)",
      bg: "linear-gradient(135deg, rgba(0, 242, 254, 0.15) 0%, rgba(139, 92, 246, 0.2) 100%)",
      border: "1px solid rgba(0, 242, 254, 0.4)"
    },
    "calling-surveillance-data": {
      icon: Camera,
      color: "#f43f5e",
      bg: "linear-gradient(135deg, rgba(244, 63, 94, 0.18) 0%, rgba(168, 85, 247, 0.2) 100%)",
      border: "1px solid rgba(244, 63, 94, 0.4)"
    }
  };

  return (
    <div className="fade-in-entry" style={{ paddingTop: "80px" }}>
      
      {/* Services Hero */}
      <section className="section-wrapper" style={{ paddingBottom: "40px" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <span className="badge-pill" style={{ marginBottom: "16px" }}>Full-Spectrum Capabilities</span>
          <h1 style={{ fontSize: "clamp(2.4rem, 5vw, 4.2rem)", fontWeight: 800, maxWidth: "900px", margin: "0 auto 20px auto" }}>
            Specialized Growth & <span className="text-gradient">Digital Services</span>
          </h1>
          <p style={{ fontSize: "1.2rem", color: "var(--text-secondary)", maxWidth: "740px", margin: "0 auto 36px auto", lineHeight: 1.65 }}>
            Led by CEO Faizan Cheena, our specialized squads execute search ranking dominance, high-ROAS paid advertising, custom web & AI automations, and 24/7 business operations.
          </p>
        </div>
      </section>

      {/* Services Detailed Grid */}
      <section className="section-wrapper" style={{ paddingTop: "0" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: "32px" }}>
            {SERVICES.map((s) => {
              const meta = serviceMetaMap[s.id] || {
                icon: Search,
                color: "var(--cyan)",
                bg: "linear-gradient(135deg, rgba(0, 242, 254, 0.15) 0%, rgba(139, 92, 246, 0.2) 100%)",
                border: "1px solid rgba(0, 242, 254, 0.4)"
              };
              const ServiceIcon = meta.icon;

              return (
                <div key={s.id} className="glass-panel" style={{ padding: "36px", display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
                    <div style={{
                      width: "52px",
                      height: "52px",
                      borderRadius: "14px",
                      background: meta.bg,
                      border: meta.border,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}>
                      <ServiceIcon size={26} color={meta.color} />
                    </div>
                    <span className="badge-pill" style={{ fontSize: "0.72rem" }}>{s.badge}</span>
                  </div>

                  <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "12px" }}>
                    {s.title}
                  </h2>
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.65, marginBottom: "24px" }}>
                    {s.fullDesc}
                  </p>

                  {/* Deliverables List */}
                  <div style={{ marginBottom: "24px" }}>
                    <div style={{ fontSize: "0.82rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "10px", fontWeight: 600 }}>
                      Key Deliverables
                    </div>
                    <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "8px" }}>
                      {s.deliverables.map((item, idx) => (
                        <li key={idx} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.9rem", color: "#cbd5e1" }}>
                          <CheckCircle2 size={16} color="var(--cyan)" style={{ flexShrink: 0 }} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Tags */}
                  <div style={{ marginTop: "auto", borderTop: "1px solid rgba(255, 255, 255, 0.06)", paddingTop: "18px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                      <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Est. Velocity:</span>
                      <span style={{ fontSize: "0.85rem", color: "var(--cyan)", fontWeight: 600 }}>{s.turnaround}</span>
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                      {s.technologies.map((tech, idx) => (
                        <span key={idx} style={{
                          fontSize: "0.76rem",
                          padding: "3px 10px",
                          borderRadius: "4px",
                          background: "rgba(255, 255, 255, 0.04)",
                          border: "1px solid rgba(255, 255, 255, 0.08)",
                          color: "#94a3b8"
                        }}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          INTERACTIVE SCOPE & COST ESTIMATOR
          ===================================================================== */}
      <section className="section-wrapper" style={{ background: "rgba(10, 15, 26, 0.5)" }}>
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 48px auto" }}>
            <span className="badge-pill emerald" style={{ marginBottom: "12px" }}>
              <Calculator size={14} /> Interactive Estimator
            </span>
            <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)", fontWeight: 800, marginBottom: "16px" }}>
              Calculate Your Project <span className="text-gradient">Scope & Budget</span>
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem" }}>
              Tailor your requirements to get an instantaneous ballpark budget and sprint delivery schedule.
            </p>
          </div>

          <div className="glass-panel" style={{
            maxWidth: "940px",
            margin: "0 auto",
            padding: "clamp(24px, 5vw, 48px)",
            border: "1px solid rgba(0, 242, 254, 0.3)"
          }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "36px" }}>
              
              {/* Left Controls */}
              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                
                {/* Service Vertical */}
                <div>
                  <label style={{ display: "block", fontSize: "0.9rem", fontWeight: 700, marginBottom: "10px", color: "#fff" }}>
                    1. Primary Service Vertical
                  </label>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "8px" }}>
                    {[
                      { id: "seo", label: "Search, AEO & GEO Dominance (Google & Perplexity Rankings)" },
                      { id: "ads", label: "Google Ads, Meta Ads & Qualified Lead Generation" },
                      { id: "web", label: "Web Development & AI Automations (n8n, APIs & Scans)" },
                      { id: "ops", label: "24/7 Operations: CCTV Surveillance, Calling Agents & VAs" },
                      { id: "growth", label: "Full-Service Growth Guild (All 19 Disciplines Unified)" }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setServiceVertical(opt.id)}
                        style={{
                          padding: "10px 14px",
                          borderRadius: "8px",
                          fontSize: "0.85rem",
                          fontWeight: 600,
                          textAlign: "left",
                          cursor: "pointer",
                          background: serviceVertical === opt.id ? "rgba(0, 242, 254, 0.15)" : "rgba(255, 255, 255, 0.04)",
                          border: serviceVertical === opt.id ? "1px solid var(--cyan)" : "1px solid rgba(255, 255, 255, 0.08)",
                          color: serviceVertical === opt.id ? "#00f2fe" : "var(--text-secondary)",
                          transition: "all 0.2s"
                        }}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Business Scale */}
                <div>
                  <label style={{ display: "block", fontSize: "0.9rem", fontWeight: 700, marginBottom: "10px", color: "#fff" }}>
                    2. Business Scale & Market Scope
                  </label>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "8px" }}>
                    {[
                      { id: "single", label: "Local / Single Location (Fast Market Penetration)" },
                      { id: "multi", label: "National / Multi-Channel Growth (Aggressive Scaling)" },
                      { id: "enterprise", label: "High-Volume Global Enterprise (24/7 SLA & Dedicated Support)" }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setBusinessScale(opt.id)}
                        style={{
                          padding: "10px 14px",
                          borderRadius: "8px",
                          fontSize: "0.85rem",
                          fontWeight: 600,
                          textAlign: "left",
                          cursor: "pointer",
                          background: businessScale === opt.id ? "rgba(139, 92, 246, 0.18)" : "rgba(255, 255, 255, 0.04)",
                          border: businessScale === opt.id ? "1px solid #a855f7" : "1px solid rgba(255, 255, 255, 0.08)",
                          color: businessScale === opt.id ? "#c084fc" : "var(--text-secondary)",
                          transition: "all 0.2s"
                        }}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Dedicated Team Model */}
                <div>
                  <label style={{ display: "block", fontSize: "0.9rem", fontWeight: 700, marginBottom: "10px", color: "#fff" }}>
                    3. Team Deployment Model
                  </label>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "8px" }}>
                    {[
                      { id: "lead", label: "1 Dedicated Lead" },
                      { id: "pod", label: "Growth Pod (3 Leads)" },
                      { id: "full", label: "Full Agency Guild" }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setTeamModel(opt.id)}
                        style={{
                          padding: "10px",
                          borderRadius: "8px",
                          fontSize: "0.85rem",
                          fontWeight: 600,
                          cursor: "pointer",
                          background: teamModel === opt.id ? "rgba(16, 185, 129, 0.15)" : "rgba(255, 255, 255, 0.04)",
                          border: teamModel === opt.id ? "1px solid var(--emerald)" : "1px solid rgba(255, 255, 255, 0.08)",
                          color: teamModel === opt.id ? "var(--emerald)" : "var(--text-secondary)",
                          transition: "all 0.2s"
                        }}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Engagement Cadence */}
                <div>
                  <label style={{ display: "block", fontSize: "0.9rem", fontWeight: 700, marginBottom: "10px", color: "#fff" }}>
                    4. Engagement Cadence
                  </label>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "8px" }}>
                    {[
                      { id: "monthly", label: "Monthly Retainer" },
                      { id: "quarterly", label: "Quarterly (-10%)" },
                      { id: "sprint", label: "4-Week Sprint" }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setCadence(opt.id)}
                        style={{
                          padding: "10px",
                          borderRadius: "8px",
                          fontSize: "0.85rem",
                          fontWeight: 600,
                          cursor: "pointer",
                          background: cadence === opt.id ? "rgba(0, 242, 254, 0.15)" : "rgba(255, 255, 255, 0.04)",
                          border: cadence === opt.id ? "1px solid var(--cyan)" : "1px solid rgba(255, 255, 255, 0.08)",
                          color: cadence === opt.id ? "#00f2fe" : "var(--text-secondary)",
                          transition: "all 0.2s"
                        }}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right Summary Box */}
              <div style={{
                background: "linear-gradient(135deg, rgba(6, 8, 13, 0.95) 0%, rgba(13, 19, 33, 0.95) 100%)",
                borderRadius: "16px",
                border: "1px solid rgba(0, 242, 254, 0.35)",
                padding: "32px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "0 10px 40px rgba(0, 0, 0, 0.6)"
              }}>
                <div>
                  <span className="badge-pill" style={{ marginBottom: "16px" }}>Scope Estimation Summary</span>
                  
                  <div style={{ marginBottom: "24px" }}>
                    <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "4px" }}>Estimated Investment:</div>
                    <div style={{
                      fontSize: "clamp(1.9rem, 3.2vw, 2.5rem)",
                      fontWeight: 800,
                      color: "var(--cyan)",
                      fontFamily: "var(--font-heading)"
                    }}>
                      ${estimate.minPrice} - ${estimate.maxPrice} <span style={{ fontSize: "1rem", color: "var(--text-muted)", fontWeight: 500 }}>{estimate.rateType}</span>
                    </div>
                    <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "4px" }}>
                      *Transparent agency pricing with zero hidden fees. Managed by CEO Faizan Cheena.
                    </div>
                  </div>

                  <div style={{ marginBottom: "28px" }}>
                    <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "4px" }}>Execution & Reporting Cadence:</div>
                    <div style={{
                      fontSize: "1.25rem",
                      fontWeight: 700,
                      color: "#fff",
                      fontFamily: "var(--font-heading)",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px"
                    }}>
                      <Clock size={20} color="var(--cyan)" />
                      <span>{estimate.timeEstimate}</span>
                    </div>
                  </div>

                  <div style={{ borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>
                    <div style={{ fontSize: "0.85rem", color: "#cbd5e1" }}>✓ Dedicated Discipline Lead + Direct Communication</div>
                    <div style={{ fontSize: "0.85rem", color: "#cbd5e1" }}>✓ Real-time ranking, ROAS & operational dashboards</div>
                    <div style={{ fontSize: "0.85rem", color: "#cbd5e1" }}>✓ Seamless scalability across all 19 agency disciplines</div>
                  </div>
                </div>

                <div style={{ marginTop: "32px" }}>
                  <button
                    onClick={handleStartWithEstimate}
                    className="btn-primary"
                    style={{ width: "100%", padding: "16px" }}
                  >
                    <span>Lock In This Scope & Inquire</span>
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 5-Step Process */}
      <section className="section-wrapper">
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 56px auto" }}>
            <span className="badge-pill purple" style={{ marginBottom: "12px" }}>The Delivery Machine</span>
            <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)", fontWeight: 800, marginBottom: "16px" }}>
              How We Execute <span className="text-gradient">From Day 0 To Production</span>
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px" }}>
            {[
              { step: "01", title: "Architecture Blueprint", desc: "System diagramming, database schema modeling, security threat modeling, and sprint planning." },
              { step: "02", title: "High-Fidelity UX", desc: "Interactive Figma design systems, micro-interactions, and design token library initialization." },
              { step: "03", title: "Agile Development", desc: "Bi-weekly sprint deliverables pushed to preview URLs with automated branch testing." },
              { step: "04", title: "Rigorous QA & Audit", desc: "Automated end-to-end tests, load testing, penetration checks, and code quality audits." },
              { step: "05", title: "Production Scale", desc: "Seamless zero-downtime deployment, infrastructure monitoring setup, and full IP handover." }
            ].map((p, idx) => (
              <div key={idx} className="glass-panel" style={{ padding: "28px" }}>
                <div style={{
                  fontSize: "1.8rem",
                  fontWeight: 800,
                  color: "var(--cyan)",
                  fontFamily: "var(--font-heading)",
                  marginBottom: "12px"
                }}>
                  {p.step}
                </div>
                <h3 style={{ fontSize: "1.15rem", marginBottom: "8px", fontWeight: 700 }}>{p.title}</h3>
                <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
