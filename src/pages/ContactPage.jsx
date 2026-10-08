import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle2, 
  Copy, 
  MessageSquare, 
  ChevronDown 
} from "lucide-react";
import confetti from "canvas-confetti";
import { usePortfolio } from "../context/PortfolioContext";

export default function ContactPage() {
  const { companyInfo: COMPANY_INFO, faqs: FAQS } = usePortfolio();
  const [searchParams] = useSearchParams();

  // Lazy State Initialization based on URL params from Estimator (avoids cascading re-renders)
  const [formData, setFormData] = useState(() => {
    const v = searchParams.get("vertical");
    let initialService = "SEO, AEO & GEO Search Dominance";
    let initialBudget = "$1,500 - $3,000 / mo";

    if (v === "ads") {
      initialService = "Google Ads (Search & Shopping)";
    } else if (v === "web") {
      initialService = "Custom Web Development";
    } else if (v === "ops") {
      initialService = "24/7 Camera & CCTV Surveillance";
    } else if (v === "growth") {
      initialService = "SEO, AEO & GEO Search Dominance";
      initialBudget = "$5,000 - $10,000+ / mo";
    }

    return {
      name: "",
      email: "",
      company: "",
      service: initialService,
      budget: initialBudget,
      message: ""
    };
  });

  const [activeFaq, setActiveFaq] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [ticketId, setTicketId] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBudgetSelect = (val) => {
    setFormData((prev) => ({ ...prev, budget: val }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    const randomId = "VRK-" + Math.floor(100000 + Math.random() * 900000);
    setTicketId(randomId);
    setIsSubmitted(true);

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(COMPANY_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const budgetOptions = [
    "< $1,500 / mo",
    "$1,500 - $3,000 / mo",
    "$3,000 - $5,000 / mo",
    "$5,000 - $10,000+ / mo"
  ];

  return (
    <div className="fade-in-entry" style={{ paddingTop: "80px" }}>
      
      {/* Contact Hero */}
      <section className="section-wrapper" style={{ paddingBottom: "30px" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <span className="badge-pill" style={{ marginBottom: "16px" }}>Start The Conversation</span>
          <h1 style={{ fontSize: "clamp(2.4rem, 5vw, 4.2rem)", fontWeight: 800, maxWidth: "860px", margin: "0 auto 20px auto" }}>
            Let's Scale Your <span className="text-gradient">Brand & Operations</span>
          </h1>
          <p style={{ fontSize: "1.2rem", color: "var(--text-secondary)", maxWidth: "700px", margin: "0 auto", lineHeight: 1.65 }}>
            Consult directly with CEO Faizan Cheena and our specialized leads. We evaluate your organic search, paid ad funnels, and operational needs within 24 hours.
          </p>
        </div>
      </section>

      {/* Main Grid: Form & Info */}
      <section className="section-wrapper" style={{ paddingTop: "20px" }}>
        <div className="container">
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "48px",
            alignItems: "flex-start"
          }}>
            
            {/* Left: Interactive Form */}
            <div className="glass-panel" style={{
              padding: "clamp(28px, 5vw, 44px)",
              border: "1px solid rgba(0, 242, 254, 0.25)",
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.6)"
            }}>
              {isSubmitted ? (
                <div style={{ textAlign: "center", padding: "20px 0" }}>
                  <div style={{
                    width: "70px",
                    height: "70px",
                    borderRadius: "50%",
                    background: "rgba(16, 185, 129, 0.15)",
                    border: "2px solid var(--emerald)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 20px auto",
                    color: "var(--emerald)"
                  }}>
                    <CheckCircle2 size={36} />
                  </div>

                  <h3 style={{ fontSize: "1.8rem", fontWeight: 700, marginBottom: "10px" }}>
                    Inquiry Received!
                  </h3>
                  <div style={{
                    display: "inline-block",
                    padding: "6px 16px",
                    borderRadius: "8px",
                    background: "rgba(0, 242, 254, 0.1)",
                    border: "1px solid rgba(0, 242, 254, 0.3)",
                    color: "var(--cyan)",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.95rem",
                    marginBottom: "20px"
                  }}>
                    Reference: {ticketId}
                  </div>

                  <p style={{ color: "var(--text-secondary)", fontSize: "1.02rem", lineHeight: 1.6, marginBottom: "28px" }}>
                    Thank you, <strong style={{ color: "#fff" }}>{formData.name}</strong>. An engineering director has been assigned to review your scope and will reach out to <strong style={{ color: "var(--cyan)" }}>{formData.email}</strong> within 12 business hours.
                  </p>

                  <div style={{
                    textAlign: "left",
                    background: "rgba(255, 255, 255, 0.02)",
                    borderRadius: "12px",
                    padding: "20px",
                    border: "1px solid rgba(255, 255, 255, 0.06)",
                    marginBottom: "24px"
                  }}>
                    <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "8px", fontWeight: 600 }}>Next Steps:</div>
                    <div style={{ fontSize: "0.9rem", color: "#cbd5e1", marginBottom: "6px" }}>1. Mutual Non-Disclosure Agreement (NDA) if required</div>
                    <div style={{ fontSize: "0.9rem", color: "#cbd5e1", marginBottom: "6px" }}>2. 20-minute technical scope & discovery call</div>
                    <div style={{ fontSize: "0.9rem", color: "#cbd5e1" }}>3. Customized sprint proposal and milestone breakdown</div>
                  </div>

                  {/* 1-Click Direct Delivery Buttons */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center", marginBottom: "26px" }}>
                    <a
                      href={`mailto:${COMPANY_INFO.email}?subject=${encodeURIComponent(`Project Inquiry: ${formData.service} [${ticketId}]`)}&body=${encodeURIComponent(`Hi VRankly Team,\n\nI just submitted a project inquiry via your website.\n\nName: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company || "N/A"}\nService: ${formData.service}\nBudget: ${formData.budget}\n\nProject Scope:\n${formData.message}\n\nTicket Reference: ${ticketId}`)}`}
                      className="btn-primary"
                      style={{ padding: "12px 18px", fontSize: "0.88rem", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px" }}
                    >
                      <Mail size={16} />
                      <span>Send via Email Client</span>
                    </a>
                    <a
                      href={`https://wa.me/${(COMPANY_INFO.whatsapp || "").replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Hi VRankly, I just submitted an inquiry [${ticketId}]:\nName: ${formData.name}\nService: ${formData.service}\nBudget: ${formData.budget}\nMessage: ${formData.message}`)}`}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        padding: "12px 18px",
                        fontSize: "0.88rem",
                        textDecoration: "none",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        background: "rgba(16, 185, 129, 0.15)",
                        border: "1px solid var(--emerald)",
                        borderRadius: "10px",
                        color: "var(--emerald)",
                        fontWeight: 600
                      }}
                    >
                      <MessageSquare size={16} />
                      <span>Forward to WhatsApp</span>
                    </a>
                  </div>

                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: "",
                        email: "",
                        company: "",
                        service: "SEO, AEO & GEO Search Dominance",
                        budget: "$1,500 - $3,000 / mo",
                        message: ""
                      });
                    }}
                    className="btn-secondary"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  <div>
                    <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "8px" }}>
                      Project Inquiry Form
                    </h2>
                    <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>
                      Fill out the form below or email us directly at <span style={{ color: "var(--cyan)" }}>{COMPANY_INFO.email}</span>.
                    </p>
                  </div>

                  {/* Name & Email Row */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "0.85rem", color: "#e2e8f0", marginBottom: "6px", fontWeight: 600 }}>
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="Alex Mercer"
                        value={formData.name}
                        onChange={handleChange}
                        style={{
                          width: "100%",
                          background: "var(--bg-input)",
                          border: "1px solid rgba(255, 255, 255, 0.12)",
                          borderRadius: "10px",
                          padding: "12px 14px",
                          color: "#fff",
                          outline: "none"
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "0.85rem", color: "#e2e8f0", marginBottom: "6px", fontWeight: 600 }}>
                        Work Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="alex@company.com"
                        value={formData.email}
                        onChange={handleChange}
                        style={{
                          width: "100%",
                          background: "var(--bg-input)",
                          border: "1px solid rgba(255, 255, 255, 0.12)",
                          borderRadius: "10px",
                          padding: "12px 14px",
                          color: "#fff",
                          outline: "none"
                        }}
                      />
                    </div>
                  </div>

                  {/* Company & Service */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "0.85rem", color: "#e2e8f0", marginBottom: "6px", fontWeight: 600 }}>
                        Company / Organization
                      </label>
                      <input
                        type="text"
                        name="company"
                        placeholder="e.g. Acme Health or Stealth"
                        value={formData.company}
                        onChange={handleChange}
                        style={{
                          width: "100%",
                          background: "var(--bg-input)",
                          border: "1px solid rgba(255, 255, 255, 0.12)",
                          borderRadius: "10px",
                          padding: "12px 14px",
                          color: "#fff",
                          outline: "none"
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "0.85rem", color: "#e2e8f0", marginBottom: "6px", fontWeight: 600 }}>
                        Primary Vertical Needed
                      </label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        style={{
                          width: "100%",
                          background: "#0c1322",
                          border: "1px solid rgba(255, 255, 255, 0.12)",
                          borderRadius: "10px",
                          padding: "12px 14px",
                          color: "#fff",
                          outline: "none"
                        }}
                      >
                        <option value="SEO, AEO & GEO Search Dominance">SEO, AEO & GEO Search Dominance</option>
                        <option value="On-Page & Off-Page SEO">On-Page & Off-Page SEO</option>
                        <option value="Technical SEO & Core Web Vitals">Technical SEO & Core Web Vitals</option>
                        <option value="Local SEO & Google Maps Ranking">Local SEO & Google Maps Ranking</option>
                        <option value="Google Ads (Search & Shopping)">Google Ads (Search & Shopping)</option>
                        <option value="Facebook & Instagram Ads (Meta)">Facebook & Instagram Ads (Meta)</option>
                        <option value="B2B & B2C Lead Generation">B2B & B2C Lead Generation</option>
                        <option value="Content Writing & Copywriting">Content Writing & Copywriting</option>
                        <option value="Custom Web Development">Custom Web Development</option>
                        <option value="AI Automations for Business">AI Automations for Business</option>
                        <option value="Find Business Vulnerabilities & Auditing">Find Business Vulnerabilities & Auditing</option>
                        <option value="Virtual Assistant Services">Virtual Assistant Services</option>
                        <option value="Client Handling & Account Support">Client Handling & Account Support</option>
                        <option value="Calling Agents (Inbound & Outbound)">Calling Agents (Inbound & Outbound)</option>
                        <option value="24/7 Camera & CCTV Surveillance">24/7 Camera & CCTV Surveillance</option>
                        <option value="High-Accuracy Data Entry">High-Accuracy Data Entry</option>
                      </select>
                    </div>
                  </div>

                  {/* Estimated Budget Selector */}
                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", color: "#e2e8f0", marginBottom: "8px", fontWeight: 600 }}>
                      Anticipated Budget Range
                    </label>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "8px" }}>
                      {budgetOptions.map((b) => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => handleBudgetSelect(b)}
                          style={{
                            padding: "10px 8px",
                            borderRadius: "8px",
                            fontSize: "0.8rem",
                            fontWeight: 600,
                            cursor: "pointer",
                            background: formData.budget === b ? "rgba(0, 242, 254, 0.15)" : "rgba(255, 255, 255, 0.03)",
                            border: formData.budget === b ? "1px solid var(--cyan)" : "1px solid rgba(255, 255, 255, 0.08)",
                            color: formData.budget === b ? "#00f2fe" : "var(--text-secondary)",
                            transition: "all 0.2s"
                          }}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message / Scope */}
                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", color: "#e2e8f0", marginBottom: "6px", fontWeight: 600 }}>
                      Project Description & Goals *
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      required
                      placeholder="Briefly describe what you want to build, existing tech stack, target users, or key deadlines..."
                      value={formData.message}
                      onChange={handleChange}
                      style={{
                        width: "100%",
                        background: "var(--bg-input)",
                        border: "1px solid rgba(255, 255, 255, 0.12)",
                        borderRadius: "10px",
                        padding: "12px 14px",
                        color: "#fff",
                        outline: "none",
                        resize: "vertical"
                      }}
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="btn-primary"
                    style={{ padding: "16px", width: "100%", fontSize: "1rem" }}
                  >
                    <span>Send Project Proposal</span>
                    <Send size={18} />
                  </button>

                  <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", textAlign: "center" }}>
                    🔒 Strictly confidential. 100% NDAs respected. Zero unsolicited marketing.
                  </div>
                </form>
              )}
            </div>

            {/* Right: Direct Channels & Offices */}
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              
              {/* Direct Info Card */}
              <div className="glass-panel" style={{ padding: "32px" }}>
                <h3 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "18px" }}>
                  Direct Channels
                </h3>

                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  
                  {/* Email */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "rgba(0, 242, 254, 0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Mail size={18} color="var(--cyan)" />
                      </div>
                      <div>
                        <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Executive Email</div>
                        <a
                          href={`mailto:${COMPANY_INFO.email}`}
                          style={{ fontSize: "0.95rem", color: "#fff", fontWeight: 600, textDecoration: "none", transition: "color 0.2s" }}
                          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--cyan)")}
                          onMouseLeave={(e) => (e.currentTarget.style.color = "#fff")}
                          title="Click to email directly"
                        >
                          {COMPANY_INFO.email}
                        </a>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      aria-label="Copy Email"
                      style={{
                        background: "rgba(255, 255, 255, 0.05)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        borderRadius: "8px",
                        padding: "8px 12px",
                        color: copiedEmail ? "var(--emerald)" : "var(--text-secondary)",
                        cursor: "pointer",
                        fontSize: "0.8rem",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px"
                      }}
                    >
                      {copiedEmail ? <CheckCircle2 size={14} /> : <Copy size={14} />}
                      <span>{copiedEmail ? "Copied" : "Copy"}</span>
                    </button>
                  </div>

                  {/* Phone */}
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "rgba(139, 92, 246, 0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Phone size={18} color="#a855f7" />
                    </div>
                    <div>
                      <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Direct Line</div>
                      <a
                        href={`tel:${(COMPANY_INFO.phone || "").replace(/[^0-9+]/g, "")}`}
                        style={{ fontSize: "0.95rem", color: "#fff", fontWeight: 600, textDecoration: "none", transition: "color 0.2s" }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--cyan)")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "#fff")}
                        title="Click to call directly"
                      >
                        {COMPANY_INFO.phone}
                      </a>
                    </div>
                  </div>

                  {/* WhatsApp */}
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "rgba(16, 185, 129, 0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <MessageSquare size={18} color="var(--emerald)" />
                    </div>
                    <div>
                      <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Instant WhatsApp Chat</div>
                      <a
                        href={`https://wa.me/${(COMPANY_INFO.whatsapp || "").replace(/[^0-9]/g, "")}?text=${encodeURIComponent("Hi VRankly, I'd like to discuss a project")}`}
                        target="_blank"
                        rel="noreferrer"
                        style={{ fontSize: "0.92rem", color: "var(--emerald)", fontWeight: 600, textDecoration: "none" }}
                        onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
                        onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
                      >
                        Start WhatsApp Chat →
                      </a>
                    </div>
                  </div>

                </div>
              </div>

              {/* Global Offices */}
              <div className="glass-panel" style={{ padding: "32px" }}>
                <h3 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
                  <MapPin size={20} color="var(--cyan)" /> Global Engineering Hubs
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  <div style={{ padding: "12px", background: "rgba(255, 255, 255, 0.02)", borderRadius: "8px", border: "1px solid rgba(255, 255, 255, 0.05)" }}>
                    <div style={{ fontWeight: 700, color: "#fff", fontSize: "0.95rem" }}>Lahore, Pakistan (Operations &amp; Tech HQ)</div>
                    <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>Executive Agency Headquarters &amp; 24/7 Operations Command</div>
                  </div>
                  <div style={{ padding: "12px", background: "rgba(255, 255, 255, 0.02)", borderRadius: "8px", border: "1px solid rgba(255, 255, 255, 0.05)" }}>
                    <div style={{ fontWeight: 700, color: "#fff", fontSize: "0.95rem" }}>London, UK (EMEA Client Relations)</div>
                    <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>100 Bishopsgate, City of London, EC2N 4AG</div>
                  </div>
                  <div style={{ padding: "12px", background: "rgba(255, 255, 255, 0.02)", borderRadius: "8px", border: "1px solid rgba(255, 255, 255, 0.05)" }}>
                    <div style={{ fontWeight: 700, color: "#fff", fontSize: "0.95rem" }}>Global Remote Operations</div>
                    <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>Round-the-clock delivery for USA, UK, UAE &amp; Worldwide Clients</div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Interactive FAQ Accordion */}
      <section className="section-wrapper" style={{ background: "rgba(9, 13, 23, 0.4)" }}>
        <div className="container" style={{ maxWidth: "880px" }}>
          <div style={{ textAlign: "center", marginBottom: "44px" }}>
            <span className="badge-pill purple" style={{ marginBottom: "12px" }}>Clear Answers</span>
            <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 2.6rem)", fontWeight: 800 }}>
              Frequently Asked <span className="text-gradient">Questions</span>
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {FAQS.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="glass-panel"
                  style={{
                    overflow: "hidden",
                    cursor: "pointer",
                    border: isOpen ? "1px solid var(--cyan)" : "1px solid rgba(255, 255, 255, 0.08)"
                  }}
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                >
                  <div style={{
                    padding: "20px 24px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}>
                    <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: isOpen ? "#00f2fe" : "#fff" }}>
                      {faq.q}
                    </h3>
                    <ChevronDown
                      size={20}
                      color={isOpen ? "var(--cyan)" : "var(--text-secondary)"}
                      style={{
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.25s ease"
                      }}
                    />
                  </div>

                  {isOpen && (
                    <div style={{
                      padding: "0 24px 22px 24px",
                      color: "var(--text-secondary)",
                      fontSize: "0.95rem",
                      lineHeight: 1.65,
                      borderTop: "1px solid rgba(255, 255, 255, 0.04)",
                      paddingTop: "16px"
                    }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
}
