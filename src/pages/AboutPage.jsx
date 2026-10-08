import React from "react";
import { Link } from "react-router-dom";
import { 
  Terminal, 
  Cpu, 
  ArrowRight, 
  CheckCircle2, 
  Compass, 
  Zap, 
  Layers 
} from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";

export default function AboutPage() {
  const { companyInfo: COMPANY_INFO } = usePortfolio();

  const milestones = [
    {
      year: "2021",
      title: `${COMPANY_INFO?.name || "VRankly"} Founding & Search Engineering`,
      desc: `Founded by CEO ${COMPANY_INFO?.ceo || "Faizan Cheena"} with a relentless mission: eliminate agency bloat and deliver guaranteed search rankings through technical SEO and high-authority entity optimization.`
    },
    {
      year: "2023",
      title: "Paid Media & Web Engineering Expansion",
      desc: "Expanded into full-funnel performance advertising across Google Ads and Meta (Facebook/Instagram), coupled with ultra-fast custom web development and CRO landing pages."
    },
    {
      year: "2024",
      title: "AI Automations & Generative Search (AEO/GEO)",
      desc: "Pioneered Answer Engine Optimization (AEO) and Generative Engine Optimization (GEO) ensuring clients dominate AI citations across ChatGPT and Perplexity, while automating workflows with n8n and AI bots."
    },
    {
      year: "2026",
      title: "24/7 Operations Hub & Global Delivery",
      desc: "Established dedicated remote operational pods for 24/7 CCTV surveillance monitoring, inbound/outbound tele-calling agents, and executive virtual assistance."
    }
  ];

  const pillars = [
    {
      title: "Deep Domain Specialization",
      desc: "No generalists or diluted responsibilities. Each of our 19 service verticals is managed by dedicated specialists with battle-tested expertise.",
      icon: Terminal,
      color: "var(--cyan)"
    },
    {
      title: "AEO & GEO Search Hegemony",
      desc: "We don't just optimize for standard Google blue links. We reverse-engineer large language models so Perplexity, ChatGPT, and Gemini cite your brand as the definitive authority.",
      icon: Compass,
      color: "#a855f7"
    },
    {
      title: "AI-Augmented Velocity",
      desc: "We leverage cutting-edge AI automation pipelines (n8n, Make, custom scripts) to eliminate repetitive manual tasks and accelerate client delivery 3x faster.",
      icon: Zap,
      color: "var(--emerald)"
    },
    {
      title: "24/7 Operational Resilience",
      desc: "From round-the-clock remote security surveillance to professional inbound/outbound calling and executive virtual assistance, our operations never sleep.",
      icon: Layers,
      color: "#f59e0b"
    }
  ];

  return (
    <div className="fade-in-entry" style={{ paddingTop: "80px" }}>
      
      {/* Hero */}
      <section className="section-wrapper" style={{ paddingBottom: "40px" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <span className="badge-pill" style={{ marginBottom: "16px" }}>Our Identity & Mission</span>
          <h1 style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", fontWeight: 800, maxWidth: "860px", margin: "0 auto 20px auto" }}>
            We Are <span className="text-gradient">{COMPANY_INFO?.name || "VRankly"}</span>
          </h1>
          <p style={{ fontSize: "1.2rem", color: "var(--text-secondary)", maxWidth: "760px", margin: "0 auto", lineHeight: 1.65 }}>
            A specialized growth and operations powerhouse founded by CEO {COMPANY_INFO?.ceo || "Faizan Cheena"}, dedicated to ranking supremacy, AI automation, and flawless business execution.
          </p>
        </div>
      </section>

      {/* Story & Vision */}
      <section className="section-wrapper" style={{ paddingTop: "20px" }}>
        <div className="container">
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "48px",
            alignItems: "center"
          }}>
            <div>
              <span className="badge-pill purple" style={{ marginBottom: "14px" }}>The Origin Story</span>
              <h2 style={{ fontSize: "2.2rem", fontWeight: 800, marginBottom: "20px" }}>
                Built to deliver <span className="text-gradient-purple">unrivaled search & operational mastery</span>
              </h2>
              <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", lineHeight: 1.7, marginBottom: "16px" }}>
                Founded by CEO Faizan Cheena, VRankly was created to give forward-thinking businesses a single, unified power-team capable of driving exponential search traffic, scaling profitable paid ad funnels, and automating complex day-to-day business operations.
              </p>
              <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", lineHeight: 1.7, marginBottom: "24px" }}>
                Instead of hiring multiple fragmented agencies or maintaining bloated internal payrolls, our specialized leadership team manages every critical discipline: On-Page, Off-Page, Technical & Local SEO, AEO/GEO generative AI optimization, Google & Facebook Ads, Content Writing, Web Development, AI Automations, Vulnerability Auditing, Virtual Assistance, Tele-Calling, Camera Surveillance, and High-Accuracy Data Entry.
              </p>
              <div style={{ display: "flex", gap: "24px" }}>
                <div>
                  <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--cyan)", fontFamily: "var(--font-heading)" }}>19</div>
                  <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>Disciplines Managed</div>
                </div>
                <div>
                  <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#a855f7", fontFamily: "var(--font-heading)" }}>3,800+</div>
                  <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>#1 Ranked Keywords</div>
                </div>
                <div>
                  <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--emerald)", fontFamily: "var(--font-heading)" }}>$18M+</div>
                  <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>Client Ad Revenue</div>
                </div>
              </div>
            </div>

            {/* Interactive Philosophy Card */}
            <div className="glass-panel" style={{
              padding: "40px",
              background: "linear-gradient(135deg, rgba(16, 23, 42, 0.7) 0%, rgba(11, 16, 28, 0.8) 100%)",
              border: "1px solid rgba(0, 242, 254, 0.25)",
              boxShadow: "0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(0, 242, 254, 0.1)"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
                <Cpu size={24} color="var(--cyan)" />
                <h3 style={{ fontSize: "1.3rem", fontWeight: 700 }}>The VRankly Agency Creed</h3>
              </div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "16px" }}>
                <li style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                  <CheckCircle2 size={18} color="var(--cyan)" style={{ marginTop: "3px", flexShrink: 0 }} />
                  <div>
                    <strong style={{ color: "#fff" }}>Search Supremacy:</strong> We treat organic search, AEO, and GEO as fundamental revenue engines, not superficial vanity rankings.
                  </div>
                </li>
                <li style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                  <CheckCircle2 size={18} color="var(--cyan)" style={{ marginTop: "3px", flexShrink: 0 }} />
                  <div>
                    <strong style={{ color: "#fff" }}>Measurable Pipeline & ROI:</strong> Every dollar invested into Google Ads and Meta Ads must deliver tangible leads, meetings, and positive ROAS.
                  </div>
                </li>
                <li style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                  <CheckCircle2 size={18} color="var(--cyan)" style={{ marginTop: "3px", flexShrink: 0 }} />
                  <div>
                    <strong style={{ color: "#fff" }}>Operational Rigor:</strong> Dedicated calling agents, 24/7 security surveillance, and executive virtual assistance executed with 100% precision.
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Engineering Pillars */}
      <section className="section-wrapper" style={{ background: "rgba(9, 13, 23, 0.4)" }}>
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 56px auto" }}>
            <span className="badge-pill emerald" style={{ marginBottom: "12px" }}>Guiding Principles</span>
            <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)", fontWeight: 800, marginBottom: "16px" }}>
              Our Core <span className="text-gradient">Architectural Pillars</span>
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "24px" }}>
            {pillars.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div key={idx} className="glass-panel" style={{ padding: "32px" }}>
                  <div style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "12px",
                    background: "rgba(255, 255, 255, 0.04)",
                    border: `1px solid ${p.color}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "20px"
                  }}>
                    <Icon size={24} color={p.color} />
                  </div>
                  <h3 style={{ fontSize: "1.25rem", marginBottom: "10px", fontWeight: 700 }}>{p.title}</h3>
                  <p style={{ fontSize: "0.92rem", color: "var(--text-secondary)", lineHeight: 1.65 }}>{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Milestones Timeline */}
      <section className="section-wrapper">
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 56px auto" }}>
            <span className="badge-pill" style={{ marginBottom: "12px" }}>Chronology</span>
            <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)", fontWeight: 800, marginBottom: "16px" }}>
              Milestones on Our <span className="text-gradient">Trajectory</span>
            </h2>
          </div>

          <div style={{ maxWidth: "800px", margin: "0 auto", position: "relative" }}>
            <div style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: "24px",
              width: "2px",
              background: "linear-gradient(180deg, var(--cyan) 0%, var(--purple) 100%)",
              opacity: 0.3
            }} />

            <div style={{ display: "flex", flexDirection: "column", gap: "36px" }}>
              {milestones.map((m, idx) => (
                <div key={idx} style={{ display: "flex", gap: "28px", alignItems: "flex-start", position: "relative" }}>
                  <div style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    background: "rgba(11, 16, 28, 0.95)",
                    border: "2px solid var(--cyan)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 800,
                    fontSize: "0.85rem",
                    color: "var(--cyan)",
                    boxShadow: "0 0 15px rgba(0, 242, 254, 0.4)",
                    flexShrink: 0,
                    zIndex: 2
                  }}>
                    {m.year}
                  </div>
                  <div className="glass-panel" style={{ padding: "24px", flex: 1 }}>
                    <h3 style={{ fontSize: "1.2rem", marginBottom: "8px", fontWeight: 700 }}>{m.title}</h3>
                    <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem", lineHeight: 1.6 }}>{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Meet Team Teaser */}
      <section className="section-wrapper" style={{ background: "rgba(9, 13, 23, 0.4)" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <span className="badge-pill purple" style={{ marginBottom: "14px" }}>The Minds Behind The Code</span>
          <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)", fontWeight: 800, marginBottom: "20px" }}>
            Meet The Architects & Visionaries
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", maxWidth: "620px", margin: "0 auto 36px auto", lineHeight: 1.6 }}>
            Our leadership team blends decades of software engineering, artificial intelligence research, and award-winning digital design.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "16px" }}>
            <Link to="/team" className="btn-primary" style={{ padding: "14px 32px" }}>
              <span>Meet The Entire Team</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
