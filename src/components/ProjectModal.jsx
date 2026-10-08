import React, { useEffect } from "react";
import { X, ArrowRight, ShieldCheck, Zap } from "lucide-react";
import { Link } from "react-router-dom";

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(5, 8, 15, 0.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        overflowY: "auto"
      }}
      onClick={onClose}
    >
      <div
        className="glass-panel"
        style={{
          width: "100%",
          maxWidth: "880px",
          maxHeight: "90vh",
          overflowY: "auto",
          background: "rgba(11, 16, 28, 0.95)",
          border: "1px solid rgba(0, 242, 254, 0.25)",
          boxShadow: "0 25px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(0, 242, 254, 0.15)",
          padding: "36px",
          position: "relative",
          margin: "auto"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close Case Study"
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            background: "rgba(255, 255, 255, 0.06)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            color: "#fff",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "all 0.2s"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(244, 63, 94, 0.2)";
            e.currentTarget.style.borderColor = "rgba(244, 63, 94, 0.5)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.06)";
            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.12)";
          }}
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "14px" }}>
          <span className="badge-pill">{project.category}</span>
          <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>• Client: {project.client} • {project.year}</span>
        </div>

        <h2 style={{ fontSize: "2rem", marginBottom: "12px", fontFamily: "var(--font-heading)" }}>
          {project.title}
        </h2>
        <p style={{ fontSize: "1.1rem", color: "var(--text-secondary)", marginBottom: "24px" }}>
          {project.tagline}
        </p>

        {/* Project Image */}
        <div style={{ borderRadius: "14px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)", marginBottom: "28px" }}>
          <img src={project.image} alt={project.title} style={{ width: "100%", maxHeight: "380px", objectFit: "cover" }} />
        </div>

        {/* Key Metrics Strip */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "16px",
          marginBottom: "32px",
          background: "rgba(255, 255, 255, 0.02)",
          padding: "20px",
          borderRadius: "14px",
          border: "1px solid rgba(255, 255, 255, 0.05)"
        }}>
          {project.metrics.map((m, idx) => (
            <div key={idx}>
              <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "4px" }}>{m.label}</div>
              <div style={{ fontSize: "1.6rem", fontWeight: 700, color: "var(--cyan)", fontFamily: "var(--font-heading)" }}>
                {m.value}
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Breakdown */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "24px", marginBottom: "32px" }}>
          <div>
            <h4 style={{ fontSize: "1.1rem", color: "#fff", marginBottom: "8px", display: "flex", alignItems: "center", gap: "8px" }}>
              <ShieldCheck size={18} color="var(--cyan)" /> Project Overview
            </h4>
            <p style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}>{project.overview}</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
            <div style={{ padding: "18px", background: "rgba(255, 255, 255, 0.02)", borderRadius: "12px", border: "1px solid rgba(255, 255, 255, 0.06)" }}>
              <h5 style={{ color: "#f87171", marginBottom: "8px", fontSize: "0.95rem" }}>The Challenge</h5>
              <p style={{ fontSize: "0.92rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>{project.challenge}</p>
            </div>
            <div style={{ padding: "18px", background: "rgba(0, 242, 254, 0.03)", borderRadius: "12px", border: "1px solid rgba(0, 242, 254, 0.15)" }}>
              <h5 style={{ color: "var(--cyan)", marginBottom: "8px", fontSize: "0.95rem" }}>The Engineered Solution</h5>
              <p style={{ fontSize: "0.92rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>{project.solution}</p>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: "1.1rem", color: "#fff", marginBottom: "8px", display: "flex", alignItems: "center", gap: "8px" }}>
              <Zap size={18} color="#eab308" /> Measured Business Impact
            </h4>
            <p style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}>{project.results}</p>
          </div>
        </div>

        {/* Tech Stack Tags */}
        <div style={{ marginBottom: "32px" }}>
          <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Technology Stack & Integrations
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {project.tags.map((t, i) => (
              <span key={i} style={{
                fontSize: "0.82rem",
                padding: "4px 12px",
                borderRadius: "6px",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                color: "#e2e8f0"
              }}>
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Footer CTAs */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "24px" }}>
          <button
            onClick={onClose}
            className="btn-secondary"
            style={{ padding: "10px 20px" }}
          >
            Back to Showcase
          </button>
          <Link
            to="/contact"
            onClick={onClose}
            className="btn-primary"
            style={{ padding: "10px 24px" }}
          >
            Inquire About This Service <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
