import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  Award, 
  Briefcase,
  Layers, 
  Tag, 
  X
} from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";

export default function TeamPage() {
  const { teamMembers: TEAM_MEMBERS, companyInfo: COMPANY_INFO } = usePortfolio();
  const [selectedDept, setSelectedDept] = useState("All");
  const [selectedSkill, setSelectedSkill] = useState("All");

  const ceo = TEAM_MEMBERS.find((m) => m.role?.toLowerCase().includes("ceo")) || TEAM_MEMBERS[0] || {};
  const coo = TEAM_MEMBERS.find((m) => m.id === "salman-khan" || m.role?.toLowerCase().includes("coo") || m.role?.toLowerCase().includes("operating officer"));
  const executiveIds = [ceo?.id, coo?.id].filter(Boolean);
  const teamList = TEAM_MEMBERS.filter((m) => !executiveIds.includes(m.id));

  const departments = [
    "All",
    "Executive Leadership",
    "Search & Generative AI",
    "Paid Ads & Media Buying",
    "Digital Engineering",
    "Content Strategy",
    "Virtual Assistance & BPO",
    "Operations & Surveillance"
  ];

  // Helper to extract skills array safely
  const getMemberSkills = (member) => {
    if (!member) return [];
    if (Array.isArray(member.expertise)) return member.expertise;
    if (typeof member.expertise === "string") return member.expertise.split(",").map((s) => s.trim()).filter(Boolean);
    return [];
  };

  // Build dynamic skill count map across the entire team
  const skillCountMap = {};
  TEAM_MEMBERS.forEach((m) => {
    getMemberSkills(m).forEach((s) => {
      skillCountMap[s] = (skillCountMap[s] || 0) + 1;
    });
  });

  // Check if member matches selected skill
  const memberHasSkill = (member, skill) => {
    if (skill === "All") return true;
    const skills = getMemberSkills(member).map((s) => s.toLowerCase());
    const target = skill.toLowerCase();
    return skills.some((s) => s.includes(target) || target.includes(s));
  };

  const filteredMembers = teamList.filter((m) => {
    const matchesDept = selectedDept === "All" || m.department === selectedDept;
    const matchesSkill = memberHasSkill(m, selectedSkill);
    return matchesDept && matchesSkill;
  });

  const skillsList = [
    "SEO", "AEO", "GEO", "On-Page SEO", "Off-Page SEO", "Technical SEO",
    "Local SEO", "Client Handling", "Google Ads", "Facebook Ads", "Content Writing",
    "Web Development", "AI Automations for Business", "Business Vulnerabilities",
    "Virtual Assistant", "Calling Agents", "Camera Surveillance", "Data Entry", "Leads"
  ];

  return (
    <div className="fade-in-entry" style={{ paddingTop: "80px" }}>
      
      {/* Team Hero */}
      <section className="section-wrapper" style={{ paddingBottom: "30px" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: "clamp(2.4rem, 5vw, 4.2rem)", fontWeight: 800, maxWidth: "900px", margin: "0 auto 20px auto" }}>
            Meet The <span className="text-gradient">{COMPANY_INFO?.name || "VRankly"} Team</span>
          </h1>
          <p style={{ fontSize: "1.2rem", color: "var(--text-secondary)", maxWidth: "760px", margin: "0 auto 36px auto", lineHeight: 1.65 }}>
            Led by CEO {COMPANY_INFO?.ceo || ceo?.name || "Faizan Cheena"} and COO Salman Khan, our specialized team brings deep domain mastery across search dominance, paid performance, AI automations, and 24/7 business operations.
          </p>

          {/* Department Filter Pills */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center", marginBottom: "0px" }}>
            {departments.map((dept) => (
              <button
                key={dept}
                type="button"
                onClick={() => setSelectedDept(dept)}
                style={{
                  padding: "8px 18px",
                  borderRadius: "9999px",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  background: selectedDept === dept ? "var(--cyan)" : "rgba(255, 255, 255, 0.04)",
                  border: selectedDept === dept ? "1px solid var(--cyan)" : "1px solid rgba(255, 255, 255, 0.1)",
                  color: selectedDept === dept ? "#050810" : "var(--text-secondary)",
                  boxShadow: selectedDept === dept ? "0 0 15px rgba(0, 242, 254, 0.35)" : "none",
                  transition: "all 0.2s"
                }}
              >
                {dept} {dept === "All" && `(${teamList.length})`}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          EXECUTIVE LEADERSHIP SPOTLIGHT: CEO FAIZAN CHEENA & COO SALMAN KHAN
          ===================================================================== */}
      {(selectedDept === "All" || selectedDept === "Executive Leadership") && (
        <section className="section-wrapper" style={{ paddingTop: "0", paddingBottom: "40px" }}>
          <div className="container">
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
              gap: "32px",
              alignItems: "stretch"
            }}>
              {/* CEO Card: Faizan Cheena */}
              <div className="glass-panel" style={{
                padding: "clamp(26px, 4vw, 38px)",
                background: "linear-gradient(135deg, rgba(16, 23, 42, 0.9) 0%, rgba(11, 16, 28, 0.95) 100%)",
                border: "1px solid rgba(0, 242, 254, 0.4)",
                boxShadow: "0 20px 50px rgba(0, 0, 0, 0.8), 0 0 35px rgba(0, 242, 254, 0.15)",
                display: "flex",
                flexDirection: "column",
                position: "relative"
              }}>
                <div style={{ display: "flex", gap: "24px", alignItems: "center", marginBottom: "24px", flexWrap: "wrap" }}>
                  <div style={{ position: "relative", width: "160px", height: "160px", flexShrink: 0 }}>
                    <div style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "22px",
                      overflow: "hidden",
                      border: "2px solid rgba(0, 242, 254, 0.55)",
                      boxShadow: "0 12px 30px rgba(0, 0, 0, 0.7), 0 0 25px rgba(0, 242, 254, 0.3)"
                    }}>
                      <img
                        src={ceo?.image || "/images/faizan-cheena.jpg"}
                        alt={ceo?.name || "Faizan Cheena"}
                        style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 20%", display: "block" }}
                      />
                    </div>
                  </div>
                  <div>
                    <div style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "0.78rem",
                      fontWeight: 700,
                      color: "var(--cyan)",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      marginBottom: "6px"
                    }}>
                      <Award size={14} color="var(--cyan)" />
                      <span>Founder & CEO</span>
                    </div>
                    <h2 style={{ fontSize: "1.8rem", fontWeight: 800, marginBottom: "4px" }}>
                      {ceo?.name || "Faizan Cheena"}
                    </h2>
                    <div style={{ fontSize: "0.95rem", color: "var(--text-secondary)" }}>
                      Chief Executive Officer • VRankly
                    </div>
                  </div>
                </div>

                <p style={{ color: "#cbd5e1", fontSize: "0.98rem", lineHeight: 1.7, marginBottom: "16px", fontStyle: "italic" }}>
                  "{ceo?.bio || "Visionary founder of VRankly. Directs overall company strategy, growth frameworks, enterprise partnerships, and oversees our powerhouse specialized team across SEO, AI, and operations."}"
                </p>

                <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem", lineHeight: 1.65, marginBottom: "24px", flex: 1 }}>
                  "At VRankly, we structured our specialized leadership team so that every client has direct access to hyper-specialized talent. We engineer measurable, high-ROI organic search dominance, paid performance, and cutting-edge digital operations."
                </p>

                {/* Specialties */}
                <div style={{ marginBottom: "24px" }}>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "8px", fontWeight: 600 }}>
                    Core Strategic Focus
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {getMemberSkills(ceo).map((exp, idx) => (
                      <span
                        key={idx}
                        style={{
                          fontSize: "0.78rem",
                          padding: "4px 10px",
                          borderRadius: "5px",
                          background: "rgba(0, 242, 254, 0.08)",
                          border: "1px solid rgba(0, 242, 254, 0.25)",
                          color: "#e0f2fe",
                          fontWeight: 600
                        }}
                      >
                        {exp}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ display: "flex", gap: "12px", alignItems: "center", marginTop: "auto" }}>
                  <Link to="/contact" className="btn-primary" style={{ padding: "10px 24px", fontSize: "0.92rem" }}>
                    <span>Consult With Faizan</span>
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>

              {/* COO Card: Salman Khan */}
              {coo && (
                <div className="glass-panel" style={{
                  padding: "clamp(26px, 4vw, 38px)",
                  background: "linear-gradient(135deg, rgba(16, 23, 42, 0.9) 0%, rgba(11, 16, 28, 0.95) 100%)",
                  border: "1px solid rgba(16, 185, 129, 0.4)",
                  boxShadow: "0 20px 50px rgba(0, 0, 0, 0.8), 0 0 35px rgba(16, 185, 129, 0.15)",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative"
                }}>
                  <div style={{ display: "flex", gap: "24px", alignItems: "center", marginBottom: "24px", flexWrap: "wrap" }}>
                    <div style={{ position: "relative", width: "160px", height: "160px", flexShrink: 0 }}>
                      <div style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "22px",
                        overflow: "hidden",
                        border: "2px solid rgba(16, 185, 129, 0.55)",
                        boxShadow: "0 12px 30px rgba(0, 0, 0, 0.7), 0 0 25px rgba(16, 185, 129, 0.3)"
                      }}>
                        <img
                          src={coo.image || "/images/salman-khan-coo.jpg"}
                          alt={coo.name || "Salman Khan"}
                          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 20%", display: "block" }}
                        />
                      </div>
                    </div>
                    <div>
                      <div style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        fontSize: "0.78rem",
                        fontWeight: 700,
                        color: "var(--emerald)",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        marginBottom: "6px"
                      }}>
                        <Briefcase size={14} color="var(--emerald)" />
                        <span>Chief Operating Officer</span>
                      </div>
                      <h2 style={{ fontSize: "1.8rem", fontWeight: 800, marginBottom: "4px" }}>
                        {coo.name}
                      </h2>
                      <div style={{ fontSize: "0.95rem", color: "var(--text-secondary)" }}>
                        Chief Operating Officer • VRankly
                      </div>
                    </div>
                  </div>

                  <p style={{ color: "#cbd5e1", fontSize: "0.98rem", lineHeight: 1.7, marginBottom: "16px", fontStyle: "italic" }}>
                    "{coo.bio || "Chief Operating Officer at VRankly. Directs end-to-end agency operations, cross-department workflows, BPO execution, compliance standards, and high-impact international client delivery."}"
                  </p>

                  <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem", lineHeight: 1.65, marginBottom: "24px", flex: 1 }}>
                    "Scaling client deliverables requires relentless process discipline. My focus is synchronizing our specialized talent pool, upholding rigorous quality compliance, and guaranteeing seamless 24/7 campaign performance for our global partners."
                  </p>

                  {/* Specialties */}
                  <div style={{ marginBottom: "24px" }}>
                    <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "8px", fontWeight: 600 }}>
                      Operations & Workflow Focus
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                      {getMemberSkills(coo).map((exp, idx) => (
                        <span
                          key={idx}
                          style={{
                            fontSize: "0.78rem",
                            padding: "4px 10px",
                            borderRadius: "5px",
                            background: "rgba(16, 185, 129, 0.08)",
                            border: "1px solid rgba(16, 185, 129, 0.25)",
                            color: "#a7f3d0",
                            fontWeight: 600
                          }}
                        >
                          {exp}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "12px", alignItems: "center", marginTop: "auto" }}>
                    <Link to="/contact" className="btn-secondary" style={{ padding: "10px 24px", fontSize: "0.92rem", borderColor: "rgba(16, 185, 129, 0.4)" }}>
                      <span>Connect With Salman</span>
                      <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* =====================================================================
          THE SPECIALIZED LEADERSHIP GRID
          ===================================================================== */}
      <section id="team-grid" className="section-wrapper" style={{ paddingTop: "20px" }}>
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "36px", flexWrap: "wrap", gap: "16px" }}>
            <div>
              <span className="badge-pill purple" style={{ marginBottom: "8px" }}>Multidisciplinary Powerhouse</span>
              <h2 style={{ fontSize: "2rem", fontWeight: 800 }}>
                Specialized Team Members <span className="text-gradient">({filteredMembers.length})</span>
              </h2>
            </div>

            {selectedSkill !== "All" && (
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 14px",
                borderRadius: "9999px",
                background: "rgba(0, 242, 254, 0.1)",
                border: "1px solid rgba(0, 242, 254, 0.3)",
                fontSize: "0.85rem",
                color: "var(--cyan)"
              }}>
                <span>Filtered by: <strong>{selectedSkill}</strong></span>
                <button
                  type="button"
                  onClick={() => setSelectedSkill("All")}
                  style={{ background: "transparent", border: "none", color: "#f87171", cursor: "pointer", display: "flex", alignItems: "center" }}
                  title="Clear filter"
                >
                  <X size={14} />
                </button>
              </div>
            )}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "28px" }}>
            {filteredMembers.length === 0 ? (
              <div className="glass-panel" style={{ padding: "48px", textAlign: "center", gridColumn: "1 / -1" }}>
                <Tag size={36} color="var(--cyan)" style={{ margin: "0 auto 16px auto", opacity: 0.6 }} />
                <h3 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "8px" }}>No Specialists Found</h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", marginBottom: "20px" }}>
                  No team members currently match department "{selectedDept}".
                </p>
                <button
                  type="button"
                  onClick={() => { setSelectedDept("All"); }}
                  className="btn-primary"
                  style={{ padding: "10px 24px" }}
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              filteredMembers.map((member) => {
                const memberSkills = getMemberSkills(member);
                return (
                  <div
                    key={member.id}
                    className="glass-panel"
                    style={{
                      padding: "24px",
                      display: "flex",
                      flexDirection: "column",
                      position: "relative"
                    }}
                  >
                    {/* Photo */}
                    <div style={{
                      position: "relative",
                      borderRadius: "14px",
                      overflow: "hidden",
                      marginBottom: "20px",
                      aspectRatio: "1/1",
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                      background: "#080c14"
                    }}>
                      <img
                        src={member.image}
                        alt={member.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          objectPosition: "center 15%",
                          transition: "transform 0.4s ease"
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.04)")}
                        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                      />
                      <div style={{
                        position: "absolute",
                        top: "10px",
                        left: "10px",
                        background: "rgba(6, 8, 13, 0.85)",
                        backdropFilter: "blur(8px)",
                        padding: "4px 10px",
                        borderRadius: "6px",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        fontSize: "0.72rem",
                        color: "var(--cyan)",
                        fontWeight: 600
                      }}>
                        {member.department}
                      </div>
                    </div>

                    {/* Details */}
                    <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "4px" }}>
                      {member.name}
                    </h3>
                    <div style={{ fontSize: "0.85rem", color: "var(--cyan)", fontWeight: 600, marginBottom: "12px" }}>
                      {member.role}
                    </div>
                    <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "18px", flex: 1 }}>
                      {member.bio}
                    </p>

                    {/* Skills tags */}
                    <div style={{ borderTop: "1px solid rgba(255, 255, 255, 0.06)", paddingTop: "14px", marginTop: "auto" }}>
                      <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "8px", display: "flex", justifyContent: "space-between" }}>
                        <span>Key Competencies</span>
                        <span style={{ color: "var(--cyan)" }}>{memberSkills.length} Skills</span>
                      </div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                        {memberSkills.map((exp, idx) => (
                          <span
                            key={idx}
                            style={{
                              fontSize: "0.72rem",
                              padding: "4px 9px",
                              borderRadius: "4px",
                              background: "rgba(0, 242, 254, 0.06)",
                              border: "1px solid rgba(0, 242, 254, 0.15)",
                              color: "#bae6fd",
                              fontWeight: 500
                            }}
                          >
                            {exp}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* =====================================================================
          COMPLETE SKILLS MATRIX (19 SERVICES & DOMAINS)
          ===================================================================== */}
      <section className="section-wrapper" style={{ background: "rgba(9, 13, 23, 0.4)" }}>
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 48px auto" }}>
            <span className="badge-pill emerald" style={{ marginBottom: "12px" }}>
              <Layers size={14} /> Full Spectrum Capability
            </span>
            <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 2.6rem)", fontWeight: 800, marginBottom: "14px" }}>
              The 19 Core Skills Managed by Our <span className="text-gradient">Specialized Team</span>
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "1rem" }}>
              Each team member is dedicated to their exact discipline across our comprehensive operational and digital spectrum.
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "14px"
          }}>
            {skillsList.map((skill, idx) => {
              const isSelected = selectedSkill === skill;
              return (
                <div
                  key={idx}
                  onClick={() => {
                    setSelectedSkill(skill);
                    const el = document.getElementById("team-grid");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="glass-panel"
                  style={{
                    padding: "16px 20px",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    background: isSelected ? "rgba(0, 242, 254, 0.1)" : "rgba(255, 255, 255, 0.02)",
                    border: isSelected ? "1px solid var(--cyan)" : "1px solid rgba(255, 255, 255, 0.07)",
                    cursor: "pointer",
                    transition: "all 0.2s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--cyan)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = isSelected ? "var(--cyan)" : "rgba(255, 255, 255, 0.07)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <div style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: isSelected ? "var(--cyan)" : "rgba(0, 242, 254, 0.7)",
                    boxShadow: "0 0 10px rgba(0, 242, 254, 0.6)",
                    flexShrink: 0
                  }} />
                  <span style={{ fontSize: "0.92rem", fontWeight: 600, color: isSelected ? "var(--cyan)" : "#f1f5f9" }}>
                    {skill}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="section-wrapper">
        <div className="container">
          <div className="glass-panel" style={{
            padding: "clamp(36px, 5vw, 60px)",
            textAlign: "center",
            border: "1px solid rgba(0, 242, 254, 0.3)"
          }}>
            <span className="badge-pill" style={{ marginBottom: "16px" }}>Work Directly With Us</span>
            <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)", fontWeight: 800, marginBottom: "16px" }}>
              Put VRankly's Specialized Powerhouse Behind Your Business
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", maxWidth: "620px", margin: "0 auto 32px auto", lineHeight: 1.6 }}>
              Whether you need to dominate Google search, generate high-converting leads, or deploy dedicated remote calling agents and surveillance staff, CEO Faizan Cheena and the team are ready.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "16px" }}>
              <Link to="/contact" className="btn-primary" style={{ padding: "16px 36px" }}>
                <span>Schedule a Consultation</span>
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
