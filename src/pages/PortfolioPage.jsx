import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, ArrowRight } from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";
import ProjectModal from "../components/ProjectModal";

export default function PortfolioPage() {
  const { projects: PROJECTS } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = ["All", "SEO & AEO", "Paid Ads & Leads", "Web & AI", "Operations"];

  const filteredProjects = activeCategory === "All"
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <div className="fade-in-entry" style={{ paddingTop: "80px" }}>
      
      {/* Hero */}
      <section className="section-wrapper" style={{ paddingBottom: "30px" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <span className="badge-pill" style={{ marginBottom: "16px" }}>Client Case Studies</span>
          <h1 style={{ fontSize: "clamp(2.4rem, 5vw, 4.2rem)", fontWeight: 800, maxWidth: "860px", margin: "0 auto 20px auto" }}>
            Our Proven <span className="text-gradient">Track Record</span>
          </h1>
          <p style={{ fontSize: "1.2rem", color: "var(--text-secondary)", maxWidth: "720px", margin: "0 auto 36px auto", lineHeight: 1.65 }}>
            Explore verified growth results, Google & Perplexity ranking case studies, high-ROAS paid media funnels, and 24/7 business operations managed by VRankly.
          </p>

          {/* Category Filter Pills */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center" }}>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: "10px 22px",
                  borderRadius: "9999px",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "var(--font-heading)",
                  background: activeCategory === cat ? "var(--cyan)" : "rgba(255, 255, 255, 0.04)",
                  border: activeCategory === cat ? "1px solid var(--cyan)" : "1px solid rgba(255, 255, 255, 0.1)",
                  color: activeCategory === cat ? "#050810" : "var(--text-secondary)",
                  boxShadow: activeCategory === cat ? "0 0 20px rgba(0, 242, 254, 0.4)" : "none",
                  transition: "all 0.2s"
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Showcase Grid */}
      <section className="section-wrapper" style={{ paddingTop: "20px" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: "36px" }}>
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="glass-panel"
                style={{
                  overflow: "hidden",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column"
                }}
                onClick={() => setSelectedProject(project)}
              >
                {/* Project Image */}
                <div style={{ position: "relative", height: "240px", overflow: "hidden", background: "#0b0f19" }}>
                  <img
                    src={project.image}
                    alt={project.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.5s ease"
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  />
                  <div style={{
                    position: "absolute",
                    top: "14px",
                    left: "14px",
                    background: "rgba(6, 8, 13, 0.8)",
                    backdropFilter: "blur(8px)",
                    padding: "4px 12px",
                    borderRadius: "9999px",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "var(--cyan)"
                  }}>
                    {project.category}
                  </div>
                  <div style={{
                    position: "absolute",
                    bottom: "14px",
                    right: "14px",
                    width: "38px",
                    height: "38px",
                    borderRadius: "50%",
                    background: "rgba(0, 242, 254, 0.25)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(0, 242, 254, 0.6)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff"
                  }}>
                    <ExternalLink size={18} />
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: "28px", display: "flex", flexDirection: "column", flex: 1 }}>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "6px" }}>
                    {project.client} • {project.year}
                  </div>
                  <h2 style={{ fontSize: "1.45rem", fontWeight: 700, marginBottom: "10px" }}>
                    {project.title}
                  </h2>
                  <p style={{ fontSize: "0.94rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "22px", flex: 1 }}>
                    {project.tagline}
                  </p>

                  {/* Metrics Strip */}
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "8px",
                    padding: "12px",
                    borderRadius: "10px",
                    background: "rgba(255, 255, 255, 0.02)",
                    border: "1px solid rgba(255, 255, 255, 0.05)",
                    marginBottom: "20px"
                  }}>
                    {project.metrics.map((m, idx) => (
                      <div key={idx} style={{ textAlign: "center" }}>
                        <div style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--cyan)", fontFamily: "var(--font-heading)" }}>
                          {m.value}
                        </div>
                        <div style={{ fontSize: "0.68rem", color: "var(--text-muted)", textTransform: "uppercase" }}>
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack Pills */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "20px" }}>
                    {project.tags.map((t, idx) => (
                      <span key={idx} style={{
                        fontSize: "0.75rem",
                        padding: "3px 10px",
                        borderRadius: "4px",
                        background: "rgba(255, 255, 255, 0.04)",
                        border: "1px solid rgba(255, 255, 255, 0.07)",
                        color: "#94a3b8"
                      }}>
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Action Link */}
                  <div style={{ borderTop: "1px solid rgba(255, 255, 255, 0.06)", paddingTop: "16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--cyan)", display: "flex", alignItems: "center", gap: "6px" }}>
                      Read Complete Case Study <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study Modal */}
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}

      {/* Bottom CTA */}
      <section className="section-wrapper" style={{ background: "rgba(9, 13, 23, 0.4)" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <span className="badge-pill purple" style={{ marginBottom: "14px" }}>Have a unique concept?</span>
          <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)", fontWeight: 800, marginBottom: "18px" }}>
            Let's Engineer Your Next Competitive Advantage
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", maxWidth: "620px", margin: "0 auto 32px auto", lineHeight: 1.6 }}>
            We work closely with product teams to design custom solutions tailored specifically to your data models and growth goals.
          </p>
          <Link to="/contact" className="btn-primary" style={{ padding: "16px 36px" }}>
            <span>Discuss Your Product With Us</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

    </div>
  );
}
