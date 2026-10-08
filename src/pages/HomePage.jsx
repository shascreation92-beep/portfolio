import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Layers, 
  Terminal, 
  CheckCircle2, 
  ChevronRight, 
  Star,
  ExternalLink,
  Code2,
  Search,
  Target,
  Play
} from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";
import ProjectModal from "../components/ProjectModal";

export default function HomePage() {
  const {
    companyInfo: COMPANY_INFO,
    services: SERVICES,
    projects: PROJECTS,
    trustedClients: TRUSTED_CLIENTS,
    testimonials: TESTIMONIALS,
    videoReviews
  } = usePortfolio();

  const [selectedProject, setSelectedProject] = useState(null);

  // Inline Video Review Playback State
  const [playingVideoId, setPlayingVideoId] = useState(null);

  // Helper to parse embed URL for YouTube, Vimeo, Loom
  const getEmbedUrl = (url) => {
    if (!url) return null;
    const ytMatch = url.match(/(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/);
    if (ytMatch && ytMatch[1]) {
      return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&rel=0`;
    }
    const vimeoMatch = url.match(/vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)/);
    if (vimeoMatch && vimeoMatch[3]) {
      return `https://player.vimeo.com/video/${vimeoMatch[3]}?autoplay=1`;
    }
    const loomMatch = url.match(/loom\.com\/share\/([a-zA-Z0-9]+)/);
    if (loomMatch && loomMatch[1]) {
      return `https://www.loom.com/embed/${loomMatch[1]}?autoplay=1`;
    }
    return null;
  };

  const handlePlayVideo = (v, vIdx) => {
    const targetId = v.id || `video-${vIdx}`;
    if (playingVideoId === targetId) {
      setPlayingVideoId(null);
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      return;
    }
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    setPlayingVideoId(targetId);

    const rawUrl = v.videoUrl || (vIdx === 0 ? "/videos/review-ella.webm" : "/videos/review-marcus.webm");
    // If no video URL is available at all, fall back to speech synthesis of quote
    if (!rawUrl && ('speechSynthesis' in window)) {
      const transcriptText = v.transcript || v.quote || "";
      const utterance = new SpeechSynthesisUtterance(transcriptText);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      const voices = window.speechSynthesis.getVoices();
      const isUK =
        v.location?.includes("UK") ||
        v.location?.includes("London") ||
        v.clientName?.includes("Oliver") ||
        v.clientName?.includes("Ella");
      const matchedVoice = voices.find((voice) =>
        isUK
          ? (voice.lang && voice.lang.includes("en-GB")) ||
            (voice.name && (voice.name.includes("UK") || voice.name.includes("British") || voice.name.includes("George")))
          : (voice.lang && (voice.lang.includes("en-US") || voice.lang.includes("en_US"))) ||
            (voice.name && (voice.name.includes("David") || voice.name.includes("US") || voice.name.includes("Natural")))
      );
      if (matchedVoice) utterance.voice = matchedVoice;
      utterance.onend = () => {
        setPlayingVideoId(null);
      };
      utterance.onerror = () => {
        setPlayingVideoId(null);
      };
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="fade-in-entry" style={{ paddingTop: "80px" }}>
      
      {/* =====================================================================
          HERO SECTION
          ===================================================================== */}
      <section className="section-wrapper" style={{ paddingTop: "80px", paddingBottom: "70px", position: "relative" }}>
        <div className="container" style={{ textAlign: "center", position: "relative", zIndex: 2 }}>
          

          {/* Main Headline */}
          <h1 style={{
            fontSize: "clamp(2.6rem, 5.5vw, 4.4rem)",
            fontWeight: 800,
            lineHeight: 1.12,
            maxWidth: "980px",
            margin: "0 auto 24px auto",
            letterSpacing: "-0.03em"
          }}>
            Dominating Search, Generative AI &{" "}
            <span className="text-gradient">Digital Business Operations</span>
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: "clamp(1.05rem, 1.8vw, 1.25rem)",
            color: "var(--text-secondary)",
            maxWidth: "800px",
            margin: "0 auto 40px auto",
            lineHeight: 1.65
          }}>
            Led by CEO {COMPANY_INFO?.ceo || "Faizan Cheena"}, our specialized powerhouse engineers #1 Google and Perplexity rankings with SEO/AEO/GEO, scales high-ROI Google & Meta ads, develops custom web & AI automations, and powers 24/7 remote operations.
          </p>

          {/* Dual CTAs */}
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "18px",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "64px"
          }}>
            <Link to="/portfolio" className="btn-primary" style={{ padding: "16px 36px", fontSize: "1.05rem" }}>
              <span>Explore Our Work</span>
              <ArrowRight size={18} />
            </Link>

            <Link to="/contact" style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              color: "var(--cyan)",
              fontSize: "0.95rem",
              fontWeight: 600,
              padding: "10px 18px",
              borderRadius: "8px",
              background: "rgba(0, 242, 254, 0.05)",
              border: "1px solid rgba(0, 242, 254, 0.2)"
            }}>
              <span>Book 15-Min Discovery</span>
              <ChevronRight size={16} />
            </Link>
          </div>

          {/* Key Metrics Strip */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
            maxWidth: "1100px",
            margin: "0 auto",
            textAlign: "left"
          }}>
            {COMPANY_INFO.stats.map((stat, idx) => (
              <div
                key={idx}
                className="glass-panel"
                style={{
                  padding: "24px",
                  background: "rgba(13, 19, 33, 0.6)",
                  border: "1px solid rgba(255, 255, 255, 0.07)"
                }}
              >
                <div style={{
                  fontSize: "2.4rem",
                  fontWeight: 800,
                  fontFamily: "var(--font-heading)",
                  color: "#ffffff",
                  background: "linear-gradient(135deg, #ffffff 40%, var(--cyan) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  marginBottom: "4px"
                }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: "1rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: "4px" }}>
                  {stat.label}
                </div>
                <div style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
                  {stat.subtext}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =====================================================================
          TRUSTED CLIENTS MARQUEE
          ===================================================================== */}
      <section style={{
        padding: "40px 0",
        borderTop: "1px solid rgba(255, 255, 255, 0.05)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
        background: "rgba(6, 8, 13, 0.6)"
      }}>
        <div className="container" style={{ textAlign: "center", marginBottom: "20px" }}>
          <span style={{
            fontSize: "0.82rem",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            color: "var(--text-muted)",
            fontWeight: 600
          }}>
            Trusted by venture-backed startups and modern tech innovators
          </span>
        </div>

        <div className="marquee-container">
          <div className="marquee-content">
            {[...TRUSTED_CLIENTS, ...TRUSTED_CLIENTS].map((client, i) => (
              <div
                key={i}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "8px 24px",
                  borderRadius: "10px",
                  background: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid rgba(255, 255, 255, 0.06)",
                  color: "#cbd5e1",
                  fontSize: "1rem",
                  fontWeight: 600,
                  fontFamily: "var(--font-heading)"
                }}
              >
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--cyan)" }} />
                <span>{client.name}</span>
                <span style={{ fontSize: "0.72rem", color: "var(--cyan)", background: "rgba(0, 242, 254, 0.1)", padding: "2px 8px", borderRadius: "4px" }}>
                  {client.ticker}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          FEATURED FLAGSHIP WORK
          ===================================================================== */}
      <section className="section-wrapper">
        <div className="container">
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "48px", gap: "20px" }}>
            <div>
              <span className="badge-pill" style={{ marginBottom: "12px" }}>Engineered Showcases</span>
              <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)", fontWeight: 800 }}>
                Selected Flagship <span className="text-gradient">Case Studies</span>
              </h2>
            </div>
            <Link to="/portfolio" className="btn-secondary" style={{ padding: "12px 24px" }}>
              <span>View All Projects</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Projects Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "28px" }}>
            {PROJECTS.map((project) => (
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
                {/* Image Container with Hover Zoom */}
                <div style={{ position: "relative", height: "230px", overflow: "hidden", background: "#0b0f19" }}>
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
                    border: "1px solid rgba(255, 255, 255, 0.12)",
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
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    background: "rgba(0, 242, 254, 0.2)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(0, 242, 254, 0.5)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff"
                  }}>
                    <ExternalLink size={16} />
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: "26px", display: "flex", flexDirection: "column", flex: 1 }}>
                  <h3 style={{ fontSize: "1.35rem", marginBottom: "8px", fontWeight: 700 }}>
                    {project.title}
                  </h3>
                  <p style={{ fontSize: "0.92rem", color: "var(--text-secondary)", marginBottom: "20px", lineHeight: 1.6, flex: 1 }}>
                    {project.tagline}
                  </p>

                  {/* Metrics Row */}
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "8px",
                    padding: "12px",
                    borderRadius: "10px",
                    background: "rgba(255, 255, 255, 0.02)",
                    border: "1px solid rgba(255, 255, 255, 0.05)",
                    marginBottom: "18px"
                  }}>
                    {project.metrics.map((m, idx) => (
                      <div key={idx} style={{ textAlign: "center" }}>
                        <div style={{ fontSize: "1rem", fontWeight: 700, color: "var(--cyan)", fontFamily: "var(--font-heading)" }}>
                          {m.value}
                        </div>
                        <div style={{ fontSize: "0.68rem", color: "var(--text-muted)", textTransform: "uppercase" }}>
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Stack Tags */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {project.tags.slice(0, 4).map((t, idx) => (
                      <span key={idx} style={{
                        fontSize: "0.75rem",
                        padding: "3px 10px",
                        borderRadius: "4px",
                        background: "rgba(255, 255, 255, 0.04)",
                        color: "#94a3b8"
                      }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          CORE SERVICES OVERVIEW
          ===================================================================== */}
      <section className="section-wrapper" style={{ background: "rgba(9, 13, 23, 0.4)" }}>
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 56px auto" }}>
            <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)", fontWeight: 800, marginBottom: "16px" }}>
              High-Impact <span className="text-gradient">Engineering Verticals</span>
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem" }}>
              From initial architecture blueprint to production scaling, we deliver end-to-end technology solutions.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "28px" }}>
            {SERVICES.slice(0, 3).map((service) => {
              const serviceIconMap = {
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
                }
              };

              const meta = serviceIconMap[service.id] || {
                icon: Search,
                color: "var(--cyan)",
                bg: "linear-gradient(135deg, rgba(0, 242, 254, 0.15) 0%, rgba(139, 92, 246, 0.2) 100%)",
                border: "1px solid rgba(0, 242, 254, 0.35)"
              };
              const Icon = meta.icon;

              return (
                <div key={service.id} className="glass-panel" style={{ padding: "36px", display: "flex", flexDirection: "column" }}>
                  <div style={{
                    width: "52px",
                    height: "52px",
                    borderRadius: "14px",
                    background: meta.bg,
                    border: meta.border,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "24px"
                  }}>
                    <Icon size={26} color={meta.color} />
                  </div>

                <div style={{ fontSize: "0.8rem", color: "var(--cyan)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px" }}>
                  {service.badge}
                </div>

                <h3 style={{ fontSize: "1.45rem", marginBottom: "14px", fontWeight: 700 }}>
                  {service.title}
                </h3>

                <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.65, marginBottom: "24px", flex: 1 }}>
                  {service.shortDesc}
                </p>

                <div style={{ borderTop: "1px solid rgba(255, 255, 255, 0.06)", paddingTop: "18px", marginTop: "auto" }}>
                  <div style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginBottom: "10px", fontWeight: 600 }}>
                    Core Deliverables:
                  </div>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "8px" }}>
                    {service.deliverables.slice(0, 3).map((item, idx) => (
                      <li key={idx} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.86rem", color: "#cbd5e1" }}>
                        <CheckCircle2 size={15} color="var(--cyan)" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
          </div>

          <div style={{ textAlign: "center", marginTop: "44px" }}>
            <Link to="/services" className="btn-primary" style={{ padding: "14px 32px" }}>
              <span>View All 6 Verticals & Calculate Scope</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================================
          WHY NEXUS LABS (BENTO GRID)
          ===================================================================== */}
      <section className="section-wrapper">
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 56px auto" }}>
            <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)", fontWeight: 800, marginBottom: "16px" }}>
              Why High-Growth Brands <span className="text-gradient">Choose VRankly</span>
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem" }}>
              We eliminate agency bloat and replace it with direct specialized talent, guaranteed rankings, and measurable revenue.
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px"
          }}>
            <div className="glass-panel" style={{ padding: "32px" }}>
              <div style={{ width: "44px", height: "44px", borderRadius: "10px", background: "rgba(0, 242, 254, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
                <Zap size={22} color="var(--cyan)" />
              </div>
              <h3 style={{ fontSize: "1.25rem", marginBottom: "10px" }}>Ranking & Traffic Supremacy</h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem", lineHeight: 1.6 }}>
                We target Google Top 3, Perplexity citations, and ChatGPT answers with semantic entity schema, high-DA links, and technical SEO.
              </p>
            </div>

            <div className="glass-panel" style={{ padding: "32px" }}>
              <div style={{ width: "44px", height: "44px", borderRadius: "10px", background: "rgba(139, 92, 246, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
                <ShieldCheck size={22} color="#a855f7" />
              </div>
              <h3 style={{ fontSize: "1.25rem", marginBottom: "10px" }}>High-ROAS Paid Acquisition</h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem", lineHeight: 1.6 }}>
                Full-funnel Google Search, Shopping, and Meta Ads engineered for low customer acquisition costs and positive return on ad spend.
              </p>
            </div>

            <div className="glass-panel" style={{ padding: "32px" }}>
              <div style={{ width: "44px", height: "44px", borderRadius: "10px", background: "rgba(16, 185, 129, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
                <Layers size={22} color="var(--emerald)" />
              </div>
              <h3 style={{ fontSize: "1.25rem", marginBottom: "10px" }}>Direct Discipline Leads</h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem", lineHeight: 1.6 }}>
                No junior trainees or multi-agency confusion. Your brand is handled directly by specialized leads overseen by CEO Faizan Cheena.
              </p>
            </div>

            <div className="glass-panel" style={{ padding: "32px" }}>
              <div style={{ width: "44px", height: "44px", borderRadius: "10px", background: "rgba(244, 63, 94, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
                <Terminal size={22} color="#f43f5e" />
              </div>
              <h3 style={{ fontSize: "1.25rem", marginBottom: "10px" }}>24/7 Operational Rigor</h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem", lineHeight: 1.6 }}>
                From live CCTV camera monitoring to tele-calling agents, virtual assistants, and AI automation bots, your operations never sleep.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          TESTIMONIALS REEL
          ===================================================================== */}
      <section className="section-wrapper" style={{ background: "rgba(11, 16, 28, 0.5)" }}>
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 48px auto" }}>
            <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)", fontWeight: 800, marginBottom: "16px" }}>
              What Global Clients & Partners <span className="text-gradient">Say</span>
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "1rem" }}>
              Verified case studies and authentic video reviews from our international clients.
            </p>
          </div>

          {/* 2-Video Showcase Grid: Authentic Client Video Reviews (Inline Playback) */}
          <div className="video-reviews-grid">
            {(videoReviews && videoReviews.length > 0 ? videoReviews.slice(0, 2) : []).map((v, vIdx) => {
              const currentId = v.id || `video-${vIdx}`;
              const isPlaying = playingVideoId === currentId;
              const rawUrl = v.videoUrl || (vIdx === 0 ? "/videos/review-ella.webm" : "/videos/review-marcus.webm");
              const embedUrl = getEmbedUrl(rawUrl);
              const isDirectVideo = rawUrl && (
                rawUrl.startsWith("data:") ||
                rawUrl.startsWith("blob:") ||
                rawUrl.endsWith(".mp4") ||
                rawUrl.endsWith(".webm") ||
                rawUrl.endsWith(".mov") ||
                rawUrl.endsWith(".ogg") ||
                (!embedUrl && (rawUrl.startsWith("http") || rawUrl.startsWith("/")))
              );

              return (
                <div
                  key={currentId}
                  className="video-review-card glass-panel"
                >
                  {/* Left: 9:16 Smartphone Frame with Inline Video Player */}
                  <div
                    className="video-review-phone"
                    style={{ position: "relative" }}
                  >
                    {isPlaying && (embedUrl || isDirectVideo) ? (
                      embedUrl ? (
                        <iframe
                          src={embedUrl}
                          title={`${v.clientName} Video Review`}
                          style={{ width: "100%", height: "100%", border: "none", borderRadius: "16px", display: "block" }}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          sandbox="allow-scripts allow-same-origin allow-presentation"
                          allowFullScreen
                        />
                      ) : (
                        <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: "16px", overflow: "hidden", background: "#050811" }}>
                          <img
                            src={v.thumbnail || (vIdx === 0 ? "/images/testimonial-british-client.jpg" : "/images/testimonial-usa-client.jpg")}
                            alt={v.clientName}
                            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.85 }}
                          />
                          <video
                            controls
                            autoPlay
                            playsInline
                            src={rawUrl}
                            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", position: "relative", zIndex: 2, background: "transparent" }}
                            onEnded={() => setPlayingVideoId(null)}
                            onError={(e) => {
                              console.warn("Video playback event notice:", e);
                            }}
                          />
                        </div>
                      )
                    ) : (
                      <div
                        onClick={() => handlePlayVideo(v, vIdx)}
                        style={{ position: "relative", width: "100%", height: "100%", cursor: "pointer" }}
                        title="Click to play video review"
                      >
                        <img
                          src={v.thumbnail || (vIdx === 0 ? "/images/testimonial-british-client.jpg" : "/images/testimonial-usa-client.jpg")}
                          alt={`${v.clientName} - Client Video Review`}
                          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                        />

                        {/* Top Smartphone Speaker & Notch */}
                        <div style={{
                          position: "absolute",
                          top: "8px",
                          left: "50%",
                          transform: "translateX(-50%)",
                          width: "40px",
                          height: "4px",
                          borderRadius: "4px",
                          background: "rgba(255, 255, 255, 0.4)",
                          zIndex: 2,
                          pointerEvents: "none"
                        }} />

                        {/* Top Duration Badge */}
                        <div style={{
                          position: "absolute",
                          top: "14px",
                          right: "8px",
                          background: "rgba(0, 0, 0, 0.75)",
                          backdropFilter: "blur(6px)",
                          padding: "2px 7px",
                          borderRadius: "6px",
                          fontSize: "0.64rem",
                          color: "#38bdf8",
                          fontFamily: "monospace",
                          fontWeight: 600,
                          zIndex: 2,
                          pointerEvents: "none"
                        }}>
                          {v.duration || "0:20"}
                        </div>

                        {/* Center Play Button Overlay */}
                        <div style={{
                          position: "absolute",
                          inset: 0,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: "rgba(0, 0, 0, 0.32)",
                          transition: "background 0.3s"
                        }}>
                          <div style={{
                            width: "48px",
                            height: "48px",
                            borderRadius: "50%",
                            background: "linear-gradient(135deg, var(--cyan), var(--violet))",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#fff",
                            boxShadow: "0 0 25px rgba(0, 242, 254, 0.55)",
                            transform: "scale(1)",
                            transition: "transform 0.2s"
                          }}>
                            <Play size={18} fill="#fff" style={{ marginLeft: "2px" }} />
                          </div>
                        </div>

                        {/* Bottom Bar: Client Name & Location */}
                        <div style={{
                          position: "absolute",
                          bottom: "8px",
                          left: "6px",
                          right: "6px",
                          background: "rgba(15, 23, 42, 0.9)",
                          backdropFilter: "blur(8px)",
                          padding: "5px 7px",
                          borderRadius: "8px",
                          display: "flex",
                          flexDirection: "column",
                          gap: "2px",
                          fontSize: "0.68rem",
                          border: "1px solid rgba(255, 255, 255, 0.1)"
                        }}>
                          <span style={{ fontWeight: 700, color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{v.clientName}</span>
                          <span style={{ color: "var(--cyan)", fontSize: "0.64rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>📍 {v.location || v.company}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right: Client Details, Story & Credentials */}
                  <div className="video-review-content">
                    <div>
                      {/* Top Tag & Stars */}
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px", gap: "8px" }}>
                        <span className="badge-pill emerald" style={{ fontSize: "0.68rem", padding: "2px 8px" }}>
                          Verified Review #{vIdx + 1}
                        </span>
                        <div style={{ display: "flex", gap: "2px", flexShrink: 0 }}>
                          {[...Array(v.rating || 5)].map((_, i) => (
                            <Star key={i} size={13} fill="#f59e0b" color="#f59e0b" />
                          ))}
                        </div>
                      </div>

                      {/* Headline */}
                      <h3 style={{
                        fontSize: "1.05rem",
                        fontWeight: 800,
                        marginBottom: "8px",
                        lineHeight: 1.35,
                        color: "#fff",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden"
                      }}>
                        "{v.title}"
                      </h3>

                      {/* Client quote */}
                      <p style={{
                        color: "#cbd5e1",
                        fontSize: "0.84rem",
                        lineHeight: 1.55,
                        marginBottom: "12px",
                        fontStyle: "italic",
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden"
                      }}>
                        "{v.quote}"
                      </p>

                      {/* Verified Metrics Chips */}
                      {v.metrics && (
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "14px" }}>
                          {v.metrics.filter(Boolean).map((m, mIdx) => (
                            <span
                              key={mIdx}
                              style={{
                                fontSize: "0.68rem",
                                padding: "3px 8px",
                                borderRadius: "6px",
                                background: mIdx === 0 ? "rgba(16, 185, 129, 0.12)" : mIdx === 1 ? "rgba(0, 242, 254, 0.1)" : "rgba(139, 92, 246, 0.1)",
                                border: `1px solid ${mIdx === 0 ? "rgba(16, 185, 129, 0.3)" : mIdx === 1 ? "rgba(0, 242, 254, 0.25)" : "rgba(139, 92, 246, 0.25)"}`,
                                color: mIdx === 0 ? "var(--emerald)" : mIdx === 1 ? "var(--cyan)" : "#c084fc",
                                fontWeight: 700
                              }}
                            >
                              {m}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Author Information (Without watch button) */}
                    <div style={{
                      paddingTop: "12px",
                      borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "8px"
                    }}>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontWeight: 700, color: "#fff", fontSize: "0.88rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {v.clientName}
                        </div>
                        <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {v.role}
                        </div>
                      </div>
                      <span style={{ fontSize: "0.72rem", color: "var(--cyan)", fontWeight: 600, flexShrink: 0 }}>
                        📍 {v.location || v.company}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "28px" }}>
            {TESTIMONIALS.map((t, idx) => (
              <div key={idx} className="glass-panel" style={{ padding: "32px", display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", gap: "4px", marginBottom: "18px" }}>
                  {[...Array(t.rating || 5)].map((_, i) => (
                    <Star key={i} size={18} fill="#f59e0b" color="#f59e0b" />
                  ))}
                </div>
                <p style={{ fontSize: "1.02rem", color: "#e2e8f0", lineHeight: 1.7, marginBottom: "24px", fontStyle: "italic", flex: 1 }}>
                  "{t.quote}"
                </p>
                <div style={{ borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "16px", display: "flex", alignItems: "center", gap: "14px" }}>
                  {t.avatar ? (
                    <img
                      src={t.avatar}
                      alt={t.author}
                      style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "50%",
                        objectFit: "cover",
                        border: "1px solid rgba(0, 242, 254, 0.4)",
                        flexShrink: 0
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "50%",
                        background: "rgba(0, 242, 254, 0.12)",
                        border: "1px solid rgba(0, 242, 254, 0.3)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 700,
                        color: "var(--cyan)",
                        fontSize: "1rem",
                        flexShrink: 0
                      }}
                    >
                      {t.author ? t.author.charAt(0) : "C"}
                    </div>
                  )}
                  <div>
                    <div style={{ fontWeight: 700, color: "#fff", fontSize: "1rem" }}>{t.author}</div>
                    <div style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>{t.role}, <span style={{ color: "var(--cyan)" }}>{t.company}</span></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          GLOBAL CALL TO ACTION
          ===================================================================== */}
      <section className="section-wrapper">
        <div className="container">
          <div
            className="glass-panel"
            style={{
              padding: "clamp(40px, 6vw, 70px)",
              textAlign: "center",
              background: "linear-gradient(135deg, rgba(16, 23, 42, 0.9) 0%, rgba(13, 19, 33, 0.9) 100%)",
              border: "1px solid rgba(0, 242, 254, 0.3)",
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.7), 0 0 50px rgba(0, 242, 254, 0.15)",
              position: "relative",
              overflow: "hidden"
            }}
          >
            <span className="badge-pill" style={{ marginBottom: "18px" }}>Start Your Journey</span>
            <h2 style={{ fontSize: "clamp(2.2rem, 4vw, 3.4rem)", fontWeight: 800, marginBottom: "20px", maxWidth: "800px", margin: "0 auto 20px auto" }}>
              Ready to Dominate Search, Scale Ads & <span className="text-gradient">Automate Operations?</span>
            </h2>
            <p style={{ fontSize: "1.1rem", color: "var(--text-secondary)", maxWidth: "620px", margin: "0 auto 36px auto", lineHeight: 1.65 }}>
              Whether you need #1 Google rankings, high-converting paid ads, custom web platforms, or 24/7 calling agents and CCTV surveillance, CEO {COMPANY_INFO?.ceo || "Faizan Cheena"} and our specialized team are ready.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", justifyContent: "center" }}>
              <Link to="/contact" className="btn-primary" style={{ padding: "16px 36px", fontSize: "1.05rem" }}>
                <span>Launch Your Project</span>
                <ArrowRight size={18} />
              </Link>
              <Link to="/team" className="btn-secondary" style={{ padding: "16px 32px", fontSize: "1.05rem" }}>
                <span>Meet Our Team</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study Modal */}
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}

          </div>
  );
}
