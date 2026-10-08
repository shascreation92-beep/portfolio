import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Lock, 
  Unlock, 
  LogOut, 
  Save, 
  RefreshCw, 
  Plus, 
  Trash2, 
  Edit3, 
  Palette, 
  Users, 
  Briefcase, 
  Check, 
  AlertCircle, 
  Eye, 
  Download, 
  Upload, 
  Key, 
  ArrowLeft, 
  Globe2,
  FolderKanban,
  MessageSquareQuote,
  Star,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  X,
  Tag,
  ChevronDown,
  ChevronUp,
  Activity,
  Radio,
  Copy,
  Search,
  Laptop,
  Smartphone,
  Link2,
  Clock,
  BarChart2,
  Video,
  Play
} from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";

export default function AdminPage() {
  const {
    companyInfo,
    teamMembers,
    services,
    projects,
    testimonials,
    videoReviews,
    updateSingleVideoReview,
    storeVideoFile,
    techStack,
    theme,
    isAuthenticated,
    adminCreds,
    visitorLogs,
    clearVisitorLogs,
    simulateVisitorLog,
    login,
    logout,
    updateCreds,
    updateCompanyInfo,
    updateTeamMembers,
    addTeamMember,
    deleteTeamMember,
    updateServices,
    updateProjects,
    updateTestimonials,
    addTestimonial,
    deleteTestimonial,
    addSkill,
    updateSkill,
    deleteSkill,
    updateTheme,
    resetToDefaults,
    exportBackupJSON,
    importBackupJSON
  } = usePortfolio();

  // Login form state
  const [loginEmail, setLoginEmail] = useState("admin@vrankly.com");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Navigation tab in Admin - default to analytics for immediate visitor visibility
  const [activeTab, setActiveTab] = useState("analytics");
  const [toastMessage, setToastMessage] = useState("");

  // Visitor Analytics State
  const [copiedIp, setCopiedIp] = useState(null);
  const [analyticsSearch, setAnalyticsSearch] = useState("");
  const [analyticsDeviceFilter, setAnalyticsDeviceFilter] = useState("all");

  // Editing state for Team
  const [isAddingMember, setIsAddingMember] = useState(false);
  const [expandedMemberId, setExpandedMemberId] = useState(null);
  const [memberSkillInput, setMemberSkillInput] = useState("");
  const [newMemberData, setNewMemberData] = useState({
    name: "",
    role: "",
    department: "Search & Generative AI",
    image: "/images/saad-malik.jpg",
    bio: "",
    expertise: ["SEO", "AEO", "Technical SEO"]
  });

  // Editing state for Reviews / Testimonials
  const [isAddingReview, setIsAddingReview] = useState(false);
  const [newReviewData, setNewReviewData] = useState({
    author: "",
    role: "",
    company: "",
    quote: "",
    rating: 5,
    avatar: ""
  });

  // Editing state for Skills
  const [isAddingSkill, setIsAddingSkill] = useState(false);
  const [newSkillData, setNewSkillData] = useState({
    name: "",
    category: "Search",
    level: "95%"
  });

  // Editing state for Company Info
  const [companyForm, setCompanyForm] = useState({ ...companyInfo });

  // Password change state
  const [newAdminEmail, setNewAdminEmail] = useState(adminCreds.email);
  const [newAdminPassword, setNewAdminPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [credMessage, setCredMessage] = useState("");

  // Show temporary toast
  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3500);
  };

  // Handle Login
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoginError("");
    const res = login(loginEmail, loginPassword);
    if (!res.success) {
      setLoginError(res.error || "Invalid credentials");
    } else {
      triggerToast("Welcome, CEO Faizan Cheena! Admin CMS Unlocked.");
    }
  };

  // Handle Image File Upload -> Base64
  const handleImageUpload = (e, callback) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        callback(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Video File Upload -> Stores into IndexedDB (permanent storage) & Blob URL
  const handleVideoFileUpload = async (e, videoId) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      if (storeVideoFile) {
        await storeVideoFile(`review_${videoId}`, file);
      }
      const blobUrl = URL.createObjectURL(file);
      updateSingleVideoReview(videoId, { 
        videoUrl: blobUrl,
        isIndexedDB: true
      });
      triggerToast("Video file uploaded and stored permanently!");
    } catch (err) {
      console.error("Failed to store video to IndexedDB:", err);
      const reader = new FileReader();
      reader.onloadend = () => {
        updateSingleVideoReview(videoId, { videoUrl: reader.result });
        triggerToast("Video file attached!");
      };
      reader.readAsDataURL(file);
    }
  };

  // Helper to parse embed URL for YouTube, Vimeo, Loom
  const getVideoEmbedUrl = (url) => {
    if (!url) return null;
    const ytMatch = url.match(/(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/);
    if (ytMatch && ytMatch[1]) {
      return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=0`;
    }
    const vimeoMatch = url.match(/vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)/);
    if (vimeoMatch && vimeoMatch[3]) {
      return `https://player.vimeo.com/video/${vimeoMatch[3]}`;
    }
    const loomMatch = url.match(/loom\.com\/share\/([a-zA-Z0-9]+)/);
    if (loomMatch && loomMatch[1]) {
      return `https://www.loom.com/embed/${loomMatch[1]}`;
    }
    return null;
  };

  // Presets for themes
  const themePresets = [
    {
      id: "cyber-cyan",
      name: "Cyber Cyan (Default)",
      primary: "#00f2fe",
      secondary: "#8b5cf6",
      tertiary: "#10b981",
      bgPrimary: "#06080d",
      bgSecondary: "#0b0f19"
    },
    {
      id: "neon-violet",
      name: "Neon Ultraviolet",
      primary: "#c084fc",
      secondary: "#f43f5e",
      tertiary: "#00f2fe",
      bgPrimary: "#090514",
      bgSecondary: "#120a24"
    },
    {
      id: "emerald-sovereign",
      name: "Emerald Sovereign",
      primary: "#10b981",
      secondary: "#00f2fe",
      tertiary: "#f59e0b",
      bgPrimary: "#040a08",
      bgSecondary: "#081410"
    },
    {
      id: "royal-amber",
      name: "Imperial Gold",
      primary: "#f59e0b",
      secondary: "#ef4444",
      tertiary: "#10b981",
      bgPrimary: "#0d0a06",
      bgSecondary: "#17120a"
    }
  ];

  // Helper for copying IP to clipboard
  const handleCopyIp = (ip) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(ip);
    }
    setCopiedIp(ip);
    setTimeout(() => setCopiedIp(null), 2000);
    triggerToast(`Copied IP: ${ip}`);
  };

  // Aggregated metrics for Visitor Analytics
  const totalVisitorHits = (visitorLogs || []).length;
  const uniqueVisitorIps = new Set((visitorLogs || []).map((l) => l.ip)).size;

  const referrerCounts = (visitorLogs || []).reduce((acc, log) => {
    const ref = log.referrer || "Direct / Bookmark";
    acc[ref] = (acc[ref] || 0) + 1;
    return acc;
  }, {});
  const topReferrer = Object.keys(referrerCounts).length > 0
    ? Object.entries(referrerCounts).sort((a, b) => b[1] - a[1])[0]?.[0]
    : "Direct Visit";

  const pageCounts = (visitorLogs || []).reduce((acc, log) => {
    const page = log.path || "/";
    acc[page] = (acc[page] || 0) + 1;
    return acc;
  }, {});
  const topVisitedPage = Object.keys(pageCounts).length > 0
    ? Object.entries(pageCounts).sort((a, b) => b[1] - a[1])[0]?.[0]
    : "/";

  const desktopHits = (visitorLogs || []).filter((l) => l.device === "Desktop").length;
  const mobileHits = (visitorLogs || []).filter((l) => l.device === "Mobile").length;

  const filteredVisitorLogs = (visitorLogs || []).filter((log) => {
    const q = analyticsSearch.toLowerCase().trim();
    const matchesSearch =
      !q ||
      (log.ip || "").toLowerCase().includes(q) ||
      (log.country || "").toLowerCase().includes(q) ||
      (log.city || "").toLowerCase().includes(q) ||
      (log.path || "").toLowerCase().includes(q) ||
      (log.referrer || "").toLowerCase().includes(q) ||
      (log.browser || "").toLowerCase().includes(q) ||
      (log.os || "").toLowerCase().includes(q);

    const matchesDevice =
      analyticsDeviceFilter === "all" ||
      (log.device || "").toLowerCase() === analyticsDeviceFilter.toLowerCase();

    return matchesSearch && matchesDevice;
  });

  const formatLogTimestamp = (isoString) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' • ' + d.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return isoString || "Just now";
    }
  };

  // =========================================================================
  // VIEW 1: LOGIN PORTAL (IF NOT LOGGED IN)
  // =========================================================================
  if (!isAuthenticated) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        background: "radial-gradient(circle at 50% 30%, rgba(0, 242, 254, 0.08) 0%, rgba(6, 8, 13, 0.98) 70%)"
      }}>
        <div className="glass-panel" style={{
          width: "100%",
          maxWidth: "460px",
          padding: "clamp(30px, 5vw, 48px)",
          border: "1px solid rgba(0, 242, 254, 0.3)",
          boxShadow: "0 25px 70px rgba(0, 0, 0, 0.8), 0 0 50px rgba(0, 242, 254, 0.15)",
          textAlign: "center",
          position: "relative"
        }}>
          {/* Lock Icon Header */}
          <div style={{
            width: "64px",
            height: "64px",
            borderRadius: "18px",
            background: "linear-gradient(135deg, rgba(0, 242, 254, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)",
            border: "1px solid rgba(0, 242, 254, 0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 20px auto",
            color: "var(--cyan)",
            boxShadow: "0 0 25px rgba(0, 242, 254, 0.3)"
          }}>
            <Lock size={30} />
          </div>

          <span className="badge-pill" style={{ marginBottom: "12px" }}>Executive Portal</span>
          <h1 style={{ fontSize: "1.85rem", fontWeight: 800, marginBottom: "8px" }}>
            VRankly <span className="text-gradient">Admin CMS</span>
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem", marginBottom: "28px", lineHeight: 1.6 }}>
            Enter your credentials to manage company content, team roster, service descriptions, and theme color schemes.
          </p>

          {loginError && (
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 14px",
              borderRadius: "10px",
              background: "rgba(244, 63, 94, 0.12)",
              border: "1px solid rgba(244, 63, 94, 0.35)",
              color: "#fca5a5",
              fontSize: "0.85rem",
              marginBottom: "20px",
              textAlign: "left"
            }}>
              <AlertCircle size={18} style={{ flexShrink: 0 }} />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px", textAlign: "left" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.82rem", color: "#cbd5e1", marginBottom: "6px", fontWeight: 600 }}>
                Admin Email / Username
              </label>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="admin@vrankly.com"
                style={{
                  width: "100%",
                  background: "var(--bg-input)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  borderRadius: "10px",
                  padding: "12px 14px",
                  color: "#fff",
                  outline: "none",
                  fontSize: "0.95rem"
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.82rem", color: "#cbd5e1", marginBottom: "6px", fontWeight: 600 }}>
                Master Password
              </label>
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="••••••••••••"
                style={{
                  width: "100%",
                  background: "var(--bg-input)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  borderRadius: "10px",
                  padding: "12px 14px",
                  color: "#fff",
                  outline: "none",
                  fontSize: "0.95rem"
                }}
              />
            </div>

            <button
              type="submit"
              className="btn-primary"
              style={{ width: "100%", padding: "14px", marginTop: "10px", justifyContent: "center" }}
            >
              <Unlock size={18} />
              <span>Unlock Admin Dashboard</span>
            </button>
          </form>

          <div style={{ marginTop: "24px", paddingTop: "20px", borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}>
            <Link to="/" style={{ color: "var(--text-muted)", fontSize: "0.85rem", display: "inline-flex", alignItems: "center", gap: "6px" }}>
              <ArrowLeft size={14} /> Back to Public Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 2: AUTHENTICATED ADMIN DASHBOARD
  // =========================================================================
  return (
    <div style={{ paddingTop: "90px", paddingBottom: "80px", minHeight: "100vh" }}>
      {/* Toast Notification */}
      {toastMessage && (
        <div style={{
          position: "fixed",
          bottom: "30px",
          right: "30px",
          background: "rgba(16, 185, 129, 0.95)",
          color: "#fff",
          padding: "12px 22px",
          borderRadius: "12px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          fontSize: "0.9rem",
          fontWeight: 600,
          zIndex: 9999,
          animation: "slideUp 0.3s ease"
        }}>
          <Check size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="container">
        {/* Top Control Bar */}
        <div className="glass-panel" style={{
          padding: "20px 28px",
          marginBottom: "32px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "16px",
          border: "1px solid rgba(0, 242, 254, 0.3)"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div style={{
              width: "42px",
              height: "42px",
              borderRadius: "10px",
              background: "rgba(0, 242, 254, 0.15)",
              border: "1px solid rgba(0, 242, 254, 0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--cyan)"
            }}>
              <ShieldCheck size={22} />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: "1.2rem", display: "flex", alignItems: "center", gap: "8px" }}>
                <span>VRankly Admin CMS</span>
                <span className="badge-pill emerald" style={{ fontSize: "0.7rem", padding: "2px 8px" }}>Live Sync</span>
              </div>
              <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                Logged in as CEO / Admin • Instant LocalStorage Persistence
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", alignItems: "center" }}>
            <Link to="/" className="btn-secondary" style={{ padding: "8px 16px", fontSize: "0.85rem" }}>
              <Eye size={15} />
              <span>Preview Public Site</span>
            </Link>
            <button
              type="button"
              onClick={exportBackupJSON}
              className="btn-secondary"
              style={{ padding: "8px 16px", fontSize: "0.85rem" }}
            >
              <Download size={15} />
              <span>Export Backup</span>
            </button>
            <button
              type="button"
              onClick={() => {
                if (window.confirm("Are you sure you want to reset all CMS content and theme settings to original defaults?")) {
                  resetToDefaults();
                  triggerToast("Reset to factory defaults successfully.");
                }
              }}
              className="btn-secondary"
              style={{ padding: "8px 16px", fontSize: "0.85rem", color: "#f87171" }}
            >
              <RefreshCw size={15} />
              <span>Reset Defaults</span>
            </button>
            <button
              type="button"
              onClick={logout}
              className="btn-secondary"
              style={{ padding: "8px 16px", fontSize: "0.85rem", background: "rgba(244, 63, 94, 0.15)", borderColor: "rgba(244, 63, 94, 0.4)", color: "#fca5a5" }}
            >
              <LogOut size={15} />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Main Grid: Sidebar Tabs + Content Panel */}
        <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: "28px", alignItems: "flex-start" }}>
          
          {/* Sidebar Navigation */}
          <div className="glass-panel" style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "6px" }}>
            {[
              { id: "analytics", label: "Live Visitor Analytics", icon: Activity, badge: `${totalVisitorHits} Hits`, isLive: true },
              { id: "theme", label: "Theme & Colors", icon: Palette },
              { id: "company", label: "Company & Hero", icon: Globe2 },
              { id: "team", label: "Team & Multi-Skills", icon: Users },
              { id: "skills", label: "Skills & Tech Stack", icon: Sparkles },
              { id: "services", label: "Services & Scope", icon: Briefcase },
              { id: "projects", label: "Case Studies", icon: FolderKanban },
              { id: "testimonials", label: "Client Reviews", icon: MessageSquareQuote },
              { id: "videoReviews", label: "Client Video Reviews", icon: Video, badge: "2 Videos" },
              { id: "security", label: "Admin Security", icon: Key }
            ].map((tab) => {
              const TabIcon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "12px 16px",
                    borderRadius: "10px",
                    border: "none",
                    background: isActive ? "rgba(0, 242, 254, 0.15)" : "transparent",
                    color: isActive ? "var(--cyan)" : "var(--text-secondary)",
                    fontWeight: isActive ? 700 : 500,
                    fontSize: "0.92rem",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.2s",
                    borderLeft: isActive ? "3px solid var(--cyan)" : "3px solid transparent"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <TabIcon size={18} />
                    <span>{tab.label}</span>
                  </div>
                  {tab.badge && (
                    <span
                      style={{
                        background: tab.isLive ? "rgba(16, 185, 129, 0.18)" : "rgba(255,255,255,0.08)",
                        color: tab.isLive ? "#34d399" : "var(--text-muted)",
                        border: tab.isLive ? "1px solid rgba(16, 185, 129, 0.4)" : "1px solid rgba(255,255,255,0.1)",
                        fontSize: "0.72rem",
                        padding: "2px 8px",
                        borderRadius: "12px",
                        fontWeight: 700,
                        letterSpacing: "0.3px"
                      }}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Tab Content Panel */}
          <div className="glass-panel" style={{ padding: "36px" }}>
            
            {/* ===============================================================
                TAB 0: LIVE VISITOR ANALYTICS & IP TRACKING
                =============================================================== */}
            {activeTab === "analytics" && (
              <div>
                {/* Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "16px", marginBottom: "28px" }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                      <span className="badge-pill emerald" style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "0.76rem" }}>
                        <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#10b981", boxShadow: "0 0 10px #10b981", display: "inline-block" }} />
                        Live Traffic Radar Active
                      </span>
                      <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                        Automatic IP & Referral Link Attribution
                      </span>
                    </div>
                    <h2 style={{ fontSize: "1.75rem", fontWeight: 800, margin: 0 }}>
                      Live Visitor Analytics & IP Records
                    </h2>
                    <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem", marginTop: "6px" }}>
                      Har aane walay visitor ka record: Inbound referral link, targeted landing page, network IP address, aur live location track ho rahi hai.
                    </p>
                  </div>

                  <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                    <button
                      type="button"
                      onClick={() => {
                        simulateVisitorLog();
                        triggerToast("Simulated live inbound visitor recorded!");
                      }}
                      className="btn-primary"
                      style={{ padding: "9px 18px", fontSize: "0.85rem" }}
                    >
                      <Plus size={15} />
                      <span>+ Simulate Live Visitor</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (window.confirm("Are you sure you want to delete all visitor analytics records?")) {
                          clearVisitorLogs();
                          triggerToast("Cleared all visitor logs.");
                        }
                      }}
                      className="btn-secondary"
                      style={{ padding: "9px 15px", fontSize: "0.85rem", color: "#f87171" }}
                    >
                      <Trash2 size={15} />
                      <span>Clear Records</span>
                    </button>
                  </div>
                </div>

                {/* Bento KPI Cards */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "28px" }}>
                  <div className="glass-panel" style={{ padding: "20px", border: "1px solid rgba(0, 242, 254, 0.25)", background: "rgba(0, 242, 254, 0.04)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                      <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)", fontWeight: 600 }}>Total Visitor Hits</span>
                      <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "rgba(0, 242, 254, 0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--cyan)" }}>
                        <Activity size={17} />
                      </div>
                    </div>
                    <div style={{ fontSize: "2rem", fontWeight: 800, color: "#fff", lineHeight: 1.1 }}>
                      {totalVisitorHits}
                    </div>
                    <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "6px" }}>
                      Real-time page views logged
                    </div>
                  </div>

                  <div className="glass-panel" style={{ padding: "20px", border: "1px solid rgba(16, 185, 129, 0.25)", background: "rgba(16, 185, 129, 0.04)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                      <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)", fontWeight: 600 }}>Unique IP Addresses</span>
                      <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "rgba(16, 185, 129, 0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "#10b981" }}>
                        <Globe2 size={17} />
                      </div>
                    </div>
                    <div style={{ fontSize: "2rem", fontWeight: 800, color: "#fff", lineHeight: 1.1 }}>
                      {uniqueVisitorIps}
                    </div>
                    <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "6px" }}>
                      Distinct network nodes
                    </div>
                  </div>

                  <div className="glass-panel" style={{ padding: "20px", border: "1px solid rgba(139, 92, 246, 0.25)", background: "rgba(139, 92, 246, 0.04)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                      <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)", fontWeight: 600 }}>Top Inbound Link</span>
                      <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "rgba(139, 92, 246, 0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "#a78bfa" }}>
                        <Link2 size={17} />
                      </div>
                    </div>
                    <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }} title={topReferrer}>
                      {topReferrer.replace("https://", "").replace("http://", "").split("/")[0] || topReferrer}
                    </div>
                    <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "6px" }}>
                      Primary traffic source
                    </div>
                  </div>

                  <div className="glass-panel" style={{ padding: "20px", border: "1px solid rgba(245, 158, 11, 0.25)", background: "rgba(245, 158, 11, 0.04)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                      <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)", fontWeight: 600 }}>Top Requested Page</span>
                      <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "rgba(245, 158, 11, 0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "#f59e0b" }}>
                        <TrendingUp size={17} />
                      </div>
                    </div>
                    <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }} title={topVisitedPage}>
                      {topVisitedPage}
                    </div>
                    <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "6px" }}>
                      Most visited portfolio route
                    </div>
                  </div>
                </div>

                {/* Distribution Insights */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "20px", marginBottom: "28px" }}>
                  {/* Top Referral Channels */}
                  <div className="glass-panel" style={{ padding: "22px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                      <h4 style={{ fontSize: "0.95rem", fontWeight: 700, margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
                        <Link2 size={16} color="var(--cyan)" />
                        <span>Inbound Referral Sources</span>
                      </h4>
                      <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                        {Object.keys(referrerCounts).length} Sources
                      </span>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                      {Object.entries(referrerCounts).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([ref, count]) => {
                        const pct = Math.round((count / (totalVisitorHits || 1)) * 100);
                        return (
                          <div key={ref}>
                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", marginBottom: "4px" }}>
                              <span style={{ color: "#e2e8f0", fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "220px" }} title={ref}>
                                {ref}
                              </span>
                              <span style={{ color: "var(--text-muted)", fontWeight: 600 }}>{count} ({pct}%)</span>
                            </div>
                            <div style={{ height: "6px", background: "rgba(255,255,255,0.06)", borderRadius: "3px", overflow: "hidden" }}>
                              <div style={{ width: `${pct}%`, height: "100%", background: "linear-gradient(90deg, var(--cyan), var(--violet))", borderRadius: "3px" }} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Top Landing Routes & Devices */}
                  <div className="glass-panel" style={{ padding: "22px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                      <h4 style={{ fontSize: "0.95rem", fontWeight: 700, margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
                        <BarChart2 size={16} color="var(--emerald)" />
                        <span>Targeted Portfolio Routes & Devices</span>
                      </h4>
                      <div style={{ display: "flex", gap: "6px" }}>
                        <span style={{ fontSize: "0.72rem", padding: "2px 8px", borderRadius: "10px", background: "rgba(0, 242, 254, 0.12)", color: "var(--cyan)", fontWeight: 600 }}>
                          🖥️ {desktopHits} Desktop
                        </span>
                        <span style={{ fontSize: "0.72rem", padding: "2px 8px", borderRadius: "10px", background: "rgba(139, 92, 246, 0.12)", color: "#c084fc", fontWeight: 600 }}>
                          📱 {mobileHits} Mobile
                        </span>
                      </div>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                      {Object.entries(pageCounts).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([page, count]) => {
                        const pct = Math.round((count / (totalVisitorHits || 1)) * 100);
                        return (
                          <div key={page}>
                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", marginBottom: "4px" }}>
                              <span style={{ color: "var(--cyan)", fontFamily: "monospace", fontWeight: 600 }}>{page}</span>
                              <span style={{ color: "var(--text-muted)", fontWeight: 600 }}>{count} hits ({pct}%)</span>
                            </div>
                            <div style={{ height: "6px", background: "rgba(255,255,255,0.06)", borderRadius: "3px", overflow: "hidden" }}>
                              <div style={{ width: `${pct}%`, height: "100%", background: "linear-gradient(90deg, #10b981, #00f2fe)", borderRadius: "3px" }} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Search & Filter Controls */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px", marginBottom: "18px" }}>
                  <div style={{ position: "relative", flex: "1", minWidth: "260px" }}>
                    <Search size={16} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                    <input
                      type="text"
                      placeholder="Search by IP, city, country, referral link, target route, browser..."
                      value={analyticsSearch}
                      onChange={(e) => setAnalyticsSearch(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "10px 14px 10px 40px",
                        background: "var(--bg-input)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        borderRadius: "10px",
                        color: "#fff",
                        fontSize: "0.88rem"
                      }}
                    />
                  </div>

                  <div style={{ display: "flex", gap: "6px" }}>
                    {[
                      { id: "all", label: `All (${totalVisitorHits})` },
                      { id: "desktop", label: `Desktop (${desktopHits})` },
                      { id: "mobile", label: `Mobile (${mobileHits})` }
                    ].map((btn) => (
                      <button
                        key={btn.id}
                        type="button"
                        onClick={() => setAnalyticsDeviceFilter(btn.id)}
                        style={{
                          padding: "8px 14px",
                          borderRadius: "8px",
                          border: analyticsDeviceFilter === btn.id ? "1px solid var(--cyan)" : "1px solid rgba(255,255,255,0.08)",
                          background: analyticsDeviceFilter === btn.id ? "rgba(0, 242, 254, 0.15)" : "transparent",
                          color: analyticsDeviceFilter === btn.id ? "var(--cyan)" : "var(--text-muted)",
                          fontSize: "0.8rem",
                          fontWeight: 600,
                          cursor: "pointer"
                        }}
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Table of Live Visitor Logs */}
                {filteredVisitorLogs.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "48px 20px", background: "rgba(255,255,255,0.02)", borderRadius: "12px", border: "1px dashed rgba(255,255,255,0.1)" }}>
                    <Radio size={36} color="var(--text-muted)" style={{ margin: "0 auto 12px", opacity: 0.5 }} />
                    <h4 style={{ margin: "0 0 6px", fontSize: "1.05rem", color: "#e2e8f0" }}>No visitor records matching criteria</h4>
                    <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", margin: 0 }}>
                      Try adjusting your search query, or click "+ Simulate Live Visitor" to record instant traffic.
                    </p>
                  </div>
                ) : (
                  <div style={{ overflowX: "auto", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.86rem" }}>
                      <thead>
                        <tr style={{ background: "rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.08)", color: "var(--text-secondary)", textTransform: "uppercase", fontSize: "0.72rem", letterSpacing: "0.5px" }}>
                          <th style={{ padding: "14px 16px" }}>Visitor IP & Location</th>
                          <th style={{ padding: "14px 16px" }}>Inbound Referral Link</th>
                          <th style={{ padding: "14px 16px" }}>Target Page Link</th>
                          <th style={{ padding: "14px 16px" }}>Device / Browser</th>
                          <th style={{ padding: "14px 16px" }}>Timestamp</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredVisitorLogs.map((log) => {
                          const isCopied = copiedIp === log.ip;
                          const isDesktop = log.device === "Desktop";
                          return (
                            <tr
                              key={log.id}
                              style={{
                                borderBottom: "1px solid rgba(255,255,255,0.05)",
                                transition: "background 0.2s"
                              }}
                              onMouseEnter={(e) => e.currentTarget.style.background = "rgba(0, 242, 254, 0.03)"}
                              onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                            >
                              {/* IP & Location */}
                              <td style={{ padding: "14px 16px", verticalAlign: "middle" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                                  <span style={{ fontFamily: "monospace", fontWeight: 700, color: "var(--cyan)", fontSize: "0.92rem", background: "rgba(0, 242, 254, 0.08)", padding: "2px 8px", borderRadius: "6px" }}>
                                    {log.ip || "127.0.0.1"}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => handleCopyIp(log.ip)}
                                    title="Copy IP Address"
                                    style={{
                                      background: "transparent",
                                      border: "none",
                                      cursor: "pointer",
                                      padding: "4px",
                                      color: isCopied ? "#10b981" : "var(--text-muted)",
                                      display: "flex",
                                      alignItems: "center"
                                    }}
                                  >
                                    {isCopied ? <Check size={13} color="#10b981" /> : <Copy size={13} />}
                                  </button>
                                </div>
                                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "5px" }}>
                                  <span>{log.flag || "🌐"}</span>
                                  <span>{log.city ? `${log.city}, ` : ""}{log.country || "Worldwide"}</span>
                                  {log.isp && <span style={{ opacity: 0.6 }}>• {log.isp}</span>}
                                </div>
                              </td>

                              {/* Referral Source */}
                              <td style={{ padding: "14px 16px", verticalAlign: "middle" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "6px", maxWidth: "230px" }}>
                                  <Link2 size={13} color={log.referrer?.startsWith("http") ? "var(--cyan)" : "var(--text-muted)"} style={{ flexShrink: 0 }} />
                                  <span
                                    style={{
                                      color: log.referrer?.startsWith("http") ? "#93c5fd" : "var(--text-secondary)",
                                      fontWeight: 500,
                                      whiteSpace: "nowrap",
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                      fontSize: "0.82rem"
                                    }}
                                    title={log.referrer}
                                  >
                                    {log.referrer || "Direct / Bookmark"}
                                  </span>
                                </div>
                              </td>

                              {/* Target Page */}
                              <td style={{ padding: "14px 16px", verticalAlign: "middle" }}>
                                <span
                                  style={{
                                    display: "inline-block",
                                    background: "rgba(16, 185, 129, 0.12)",
                                    border: "1px solid rgba(16, 185, 129, 0.3)",
                                    color: "#34d399",
                                    padding: "3px 10px",
                                    borderRadius: "8px",
                                    fontFamily: "monospace",
                                    fontSize: "0.8rem",
                                    fontWeight: 600
                                  }}
                                >
                                  {log.path || "/"}
                                </span>
                              </td>

                              {/* Device / Browser */}
                              <td style={{ padding: "14px 16px", verticalAlign: "middle" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                  <div style={{ color: isDesktop ? "var(--cyan)" : "#c084fc", display: "flex" }}>
                                    {isDesktop ? <Laptop size={15} /> : <Smartphone size={15} />}
                                  </div>
                                  <div>
                                    <div style={{ color: "#e2e8f0", fontWeight: 600, fontSize: "0.82rem" }}>
                                      {log.browser || "Browser"}
                                    </div>
                                    <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
                                      {log.os || "OS"} • {log.device || "Desktop"}
                                    </div>
                                  </div>
                                </div>
                              </td>

                              {/* Timestamp */}
                              <td style={{ padding: "14px 16px", verticalAlign: "middle", whiteSpace: "nowrap" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--text-muted)", fontSize: "0.78rem" }}>
                                  <Clock size={12} />
                                  <span>{formatLogTimestamp(log.timestamp)}</span>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* ===============================================================
                TAB 1: THEME & COLOR PALETTE
                =============================================================== */}
            {activeTab === "theme" && (
              <div>
                <div style={{ marginBottom: "28px" }}>
                  <span className="badge-pill" style={{ marginBottom: "8px" }}>Visual Aesthetics</span>
                  <h2 style={{ fontSize: "1.6rem", fontWeight: 800 }}>Theme & Live Color Palette</h2>
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem" }}>
                    Changes apply in real-time across the entire website via CSS custom properties.
                  </p>
                </div>

                {/* Preset Themes */}
                <div style={{ marginBottom: "32px" }}>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, marginBottom: "12px", color: "#fff" }}>
                    Curated Color Themes
                  </label>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "12px" }}>
                    {themePresets.map((preset) => (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => {
                          updateTheme({
                            primaryAccent: preset.primary,
                            secondaryAccent: preset.secondary,
                            tertiaryAccent: preset.tertiary,
                            bgPrimary: preset.bgPrimary,
                            bgSecondary: preset.bgSecondary,
                            preset: preset.id
                          });
                          triggerToast(`Activated ${preset.name} theme!`);
                        }}
                        style={{
                          padding: "14px",
                          borderRadius: "12px",
                          background: theme.preset === preset.id ? "rgba(255, 255, 255, 0.08)" : "rgba(255, 255, 255, 0.02)",
                          border: theme.preset === preset.id ? `2px solid ${preset.primary}` : "1px solid rgba(255, 255, 255, 0.08)",
                          cursor: "pointer",
                          textAlign: "left",
                          transition: "all 0.2s"
                        }}
                      >
                        <div style={{ display: "flex", gap: "6px", marginBottom: "10px" }}>
                          <span style={{ width: "16px", height: "16px", borderRadius: "50%", background: preset.primary }} />
                          <span style={{ width: "16px", height: "16px", borderRadius: "50%", background: preset.secondary }} />
                          <span style={{ width: "16px", height: "16px", borderRadius: "50%", background: preset.tertiary }} />
                        </div>
                        <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "#fff" }}>{preset.name}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Hex Color Pickers */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px", marginBottom: "32px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#cbd5e1", marginBottom: "8px" }}>
                      Primary Brand Accent
                    </label>
                    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                      <input
                        type="color"
                        value={theme.primaryAccent}
                        onChange={(e) => updateTheme({ primaryAccent: e.target.value })}
                        style={{ width: "42px", height: "42px", borderRadius: "8px", border: "none", cursor: "pointer", background: "transparent" }}
                      />
                      <input
                        type="text"
                        value={theme.primaryAccent}
                        onChange={(e) => updateTheme({ primaryAccent: e.target.value })}
                        style={{
                          flex: 1,
                          background: "var(--bg-input)",
                          border: "1px solid rgba(255, 255, 255, 0.12)",
                          borderRadius: "8px",
                          padding: "10px 12px",
                          color: "#fff",
                          fontSize: "0.9rem"
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#cbd5e1", marginBottom: "8px" }}>
                      Secondary Brand Accent
                    </label>
                    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                      <input
                        type="color"
                        value={theme.secondaryAccent}
                        onChange={(e) => updateTheme({ secondaryAccent: e.target.value })}
                        style={{ width: "42px", height: "42px", borderRadius: "8px", border: "none", cursor: "pointer", background: "transparent" }}
                      />
                      <input
                        type="text"
                        value={theme.secondaryAccent}
                        onChange={(e) => updateTheme({ secondaryAccent: e.target.value })}
                        style={{
                          flex: 1,
                          background: "var(--bg-input)",
                          border: "1px solid rgba(255, 255, 255, 0.12)",
                          borderRadius: "8px",
                          padding: "10px 12px",
                          color: "#fff",
                          fontSize: "0.9rem"
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#cbd5e1", marginBottom: "8px" }}>
                      Tertiary / Success Accent
                    </label>
                    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                      <input
                        type="color"
                        value={theme.tertiaryAccent}
                        onChange={(e) => updateTheme({ tertiaryAccent: e.target.value })}
                        style={{ width: "42px", height: "42px", borderRadius: "8px", border: "none", cursor: "pointer", background: "transparent" }}
                      />
                      <input
                        type="text"
                        value={theme.tertiaryAccent}
                        onChange={(e) => updateTheme({ tertiaryAccent: e.target.value })}
                        style={{
                          flex: 1,
                          background: "var(--bg-input)",
                          border: "1px solid rgba(255, 255, 255, 0.12)",
                          borderRadius: "8px",
                          padding: "10px 12px",
                          color: "#fff",
                          fontSize: "0.9rem"
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div style={{ padding: "16px 20px", borderRadius: "10px", background: "rgba(0, 242, 254, 0.05)", border: "1px solid rgba(0, 242, 254, 0.2)" }}>
                  <div style={{ fontSize: "0.88rem", color: "var(--cyan)", fontWeight: 600 }}>
                    💡 Live Visual Preview:
                  </div>
                  <div style={{ fontSize: "0.82rem", color: "var(--text-secondary)", marginTop: "4px" }}>
                    Your primary accent is currently applied to buttons, headlines, badges, and glow effects throughout the website.
                  </div>
                </div>
              </div>
            )}

            {/* ===============================================================
                TAB 2: COMPANY & HERO CONTENT
                =============================================================== */}
            {activeTab === "company" && (
              <div>
                <div style={{ marginBottom: "28px" }}>
                  <span className="badge-pill" style={{ marginBottom: "8px" }}>Brand & Core Details</span>
                  <h2 style={{ fontSize: "1.6rem", fontWeight: 800 }}>Company Info & Hero Messaging</h2>
                </div>

                <form onSubmit={(e) => {
                  e.preventDefault();
                  updateCompanyInfo(companyForm);
                  triggerToast("Company Information & Contact numbers saved!");
                }} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#cbd5e1", marginBottom: "6px" }}>
                        Agency Name
                      </label>
                      <input
                        type="text"
                        value={companyForm.name}
                        onChange={(e) => setCompanyForm({ ...companyForm, name: e.target.value })}
                        style={{ width: "100%", background: "var(--bg-input)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "8px", padding: "10px 14px", color: "#fff" }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#cbd5e1", marginBottom: "6px" }}>
                        Founder & CEO Name
                      </label>
                      <input
                        type="text"
                        value={companyForm.ceo}
                        onChange={(e) => setCompanyForm({ ...companyForm, ceo: e.target.value })}
                        style={{ width: "100%", background: "var(--bg-input)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "8px", padding: "10px 14px", color: "#fff" }}
                      />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#cbd5e1", marginBottom: "6px" }}>
                        Official Email Address
                      </label>
                      <input
                        type="email"
                        value={companyForm.email}
                        onChange={(e) => setCompanyForm({ ...companyForm, email: e.target.value })}
                        style={{ width: "100%", background: "var(--bg-input)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "8px", padding: "10px 14px", color: "#fff" }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#cbd5e1", marginBottom: "6px" }}>
                        WhatsApp Number (e.g. +923001234567)
                      </label>
                      <input
                        type="text"
                        value={companyForm.whatsapp}
                        onChange={(e) => setCompanyForm({ ...companyForm, whatsapp: e.target.value })}
                        placeholder="+923000000000"
                        style={{ width: "100%", background: "var(--bg-input)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "8px", padding: "10px 14px", color: "#fff" }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#cbd5e1", marginBottom: "6px" }}>
                        Phone Number
                      </label>
                      <input
                        type="text"
                        value={companyForm.phone}
                        onChange={(e) => setCompanyForm({ ...companyForm, phone: e.target.value })}
                        placeholder="+92 300 0000000"
                        style={{ width: "100%", background: "var(--bg-input)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "8px", padding: "10px 14px", color: "#fff" }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#cbd5e1", marginBottom: "6px" }}>
                        Headquarters / Location
                      </label>
                      <input
                        type="text"
                        value={companyForm.headquarters}
                        onChange={(e) => setCompanyForm({ ...companyForm, headquarters: e.target.value })}
                        style={{ width: "100%", background: "var(--bg-input)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "8px", padding: "10px 14px", color: "#fff" }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#cbd5e1", marginBottom: "6px" }}>
                      Main Tagline
                    </label>
                    <input
                      type="text"
                      value={companyForm.tagline}
                      onChange={(e) => setCompanyForm({ ...companyForm, tagline: e.target.value })}
                      style={{ width: "100%", background: "var(--bg-input)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "8px", padding: "10px 14px", color: "#fff" }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#cbd5e1", marginBottom: "6px" }}>
                      Company Overview Description
                    </label>
                    <textarea
                      rows={4}
                      value={companyForm.description}
                      onChange={(e) => setCompanyForm({ ...companyForm, description: e.target.value })}
                      style={{ width: "100%", background: "var(--bg-input)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "8px", padding: "10px 14px", color: "#fff", lineHeight: 1.6 }}
                    />
                  </div>

                  <button type="submit" className="btn-primary" style={{ alignSelf: "flex-start", padding: "12px 28px" }}>
                    <Save size={16} />
                    <span>Save Company Information</span>
                  </button>
                </form>
              </div>
            )}

            {/* ===============================================================
                TAB 3: TEAM MEMBERS & PHOTOS
                =============================================================== */}
            {activeTab === "team" && (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px" }}>
                  <div>
                    <span className="badge-pill" style={{ marginBottom: "8px" }}>Human Capital</span>
                    <h2 style={{ fontSize: "1.6rem", fontWeight: 800 }}>Team Members & Leadership</h2>
                    <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem" }}>
                      Add, update bios, edit roles, or upload real photos.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsAddingMember(true)}
                    className="btn-primary"
                    style={{ padding: "10px 20px" }}
                  >
                    <Plus size={16} />
                    <span>Add New Member</span>
                  </button>
                </div>

                {/* Add Member Form Modal / Inline Box */}
                {isAddingMember && (
                  <div style={{
                    padding: "24px",
                    background: "rgba(0, 242, 254, 0.05)",
                    border: "1px solid rgba(0, 242, 254, 0.3)",
                    borderRadius: "14px",
                    marginBottom: "32px"
                  }}>
                    <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "16px" }}>Add New Team Member</h3>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "16px" }}>
                      <div>
                        <label style={{ display: "block", fontSize: "0.82rem", color: "#cbd5e1", marginBottom: "4px" }}>Full Name</label>
                        <input
                          type="text"
                          value={newMemberData.name}
                          onChange={(e) => setNewMemberData({ ...newMemberData, name: e.target.value })}
                          placeholder="e.g. Usman Tariq"
                          style={{ width: "100%", padding: "10px", background: "var(--bg-input)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#fff" }}
                        />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: "0.82rem", color: "#cbd5e1", marginBottom: "4px" }}>Role / Designation</label>
                        <input
                          type="text"
                          value={newMemberData.role}
                          onChange={(e) => setNewMemberData({ ...newMemberData, role: e.target.value })}
                          placeholder="e.g. Senior SEO Strategist"
                          style={{ width: "100%", padding: "10px", background: "var(--bg-input)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#fff" }}
                        />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: "0.82rem", color: "#cbd5e1", marginBottom: "4px" }}>Department</label>
                        <select
                          value={newMemberData.department}
                          onChange={(e) => setNewMemberData({ ...newMemberData, department: e.target.value })}
                          style={{ width: "100%", padding: "10px", background: "#0c1322", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#fff" }}
                        >
                          <option value="Search & Generative AI">Search & Generative AI</option>
                          <option value="Paid Ads & Media Buying">Paid Ads & Media Buying</option>
                          <option value="Digital Engineering">Digital Engineering</option>
                          <option value="Content Strategy">Content Strategy</option>
                          <option value="Virtual Assistance & BPO">Virtual Assistance & BPO</option>
                          <option value="Operations & Surveillance">Operations & Surveillance</option>
                        </select>
                      </div>
                    </div>

                    <div style={{ marginBottom: "16px" }}>
                      <label style={{ display: "block", fontSize: "0.82rem", color: "#cbd5e1", marginBottom: "4px" }}>Upload Member Photo</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, (base64) => setNewMemberData({ ...newMemberData, image: base64 }))}
                        style={{ color: "#94a3b8", fontSize: "0.85rem" }}
                      />
                    </div>

                    <div style={{ marginBottom: "16px" }}>
                      <label style={{ display: "block", fontSize: "0.82rem", color: "#cbd5e1", marginBottom: "4px" }}>Short Bio</label>
                      <textarea
                        rows={2}
                        value={newMemberData.bio}
                        onChange={(e) => setNewMemberData({ ...newMemberData, bio: e.target.value })}
                        placeholder="Expertise and responsibilities summary..."
                        style={{ width: "100%", padding: "10px", background: "var(--bg-input)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#fff" }}
                      />
                    </div>

                    <div style={{ display: "flex", gap: "10px" }}>
                      <button
                        type="button"
                        onClick={() => {
                          if (!newMemberData.name || !newMemberData.role) {
                            alert("Please enter at least a name and role.");
                            return;
                          }
                          const expArray = typeof newMemberData.expertise === "string"
                            ? newMemberData.expertise.split(",").map((s) => s.trim())
                            : newMemberData.expertise;
                          addTeamMember({ ...newMemberData, expertise: expArray });
                          setIsAddingMember(false);
                          setNewMemberData({
                            name: "",
                            role: "",
                            department: "Search & Generative AI",
                            image: "/images/saad-malik.jpg",
                            bio: "",
                            expertise: "SEO, AEO, Technical SEO"
                          });
                          triggerToast("New team member added successfully!");
                        }}
                        className="btn-primary"
                        style={{ padding: "8px 20px" }}
                      >
                        Save Member
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsAddingMember(false)}
                        className="btn-secondary"
                        style={{ padding: "8px 16px" }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {/* Team Roster List */}
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {teamMembers.map((member, idx) => {
                    const memberSkills = Array.isArray(member.expertise)
                      ? member.expertise
                      : typeof member.expertise === "string"
                      ? member.expertise.split(",").map((s) => s.trim()).filter(Boolean)
                      : [];

                    const isExpanded = expandedMemberId === member.id;

                    const addSkillToMember = (skillToAdd) => {
                      if (!skillToAdd || memberSkills.includes(skillToAdd)) return;
                      const updatedSkills = [...memberSkills, skillToAdd];
                      const updated = teamMembers.map((m) => m.id === member.id ? { ...m, expertise: updatedSkills } : m);
                      updateTeamMembers(updated);
                      triggerToast(`Added "${skillToAdd}" to ${member.name}`);
                    };

                    const removeSkillFromMember = (skillToRemove) => {
                      const updatedSkills = memberSkills.filter((s) => s !== skillToRemove);
                      const updated = teamMembers.map((m) => m.id === member.id ? { ...m, expertise: updatedSkills } : m);
                      updateTeamMembers(updated);
                      triggerToast(`Removed "${skillToRemove}" from ${member.name}`);
                    };

                    return (
                      <div
                        key={member.id}
                        style={{
                          padding: "22px",
                          background: "rgba(255, 255, 255, 0.02)",
                          border: isExpanded ? "1px solid rgba(0, 242, 254, 0.35)" : "1px solid rgba(255, 255, 255, 0.08)",
                          borderRadius: "14px",
                          display: "flex",
                          flexDirection: "column",
                          gap: "16px",
                          transition: "border-color 0.2s"
                        }}
                      >
                        <div style={{
                          display: "flex",
                          flexWrap: "wrap",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: "18px"
                        }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                            <div style={{
                              width: "56px",
                              height: "56px",
                              borderRadius: "12px",
                              overflow: "hidden",
                              border: "1px solid rgba(0, 242, 254, 0.3)",
                              flexShrink: 0
                            }}>
                              <img
                                src={member.image}
                                alt={member.name}
                                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 15%" }}
                              />
                            </div>
                            <div>
                              <div style={{ fontWeight: 700, fontSize: "1.1rem", display: "flex", alignItems: "center", gap: "8px" }}>
                                <span>{member.name}</span>
                                {idx === 0 && <span className="badge-pill emerald" style={{ fontSize: "0.7rem", padding: "2px 8px" }}>CEO / Founder</span>}
                              </div>
                              <div style={{ fontSize: "0.85rem", color: "var(--cyan)" }}>
                                {member.role} • <span style={{ color: "var(--text-muted)" }}>{member.department}</span>
                              </div>
                              <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginTop: "6px" }}>
                                {memberSkills.slice(0, 4).map((sk, sIdx) => (
                                  <span key={sIdx} style={{ fontSize: "0.7rem", padding: "2px 6px", borderRadius: "4px", background: "rgba(0, 242, 254, 0.08)", color: "#bae6fd" }}>
                                    {sk}
                                  </span>
                                ))}
                                {memberSkills.length > 4 && (
                                  <span style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>
                                    +{memberSkills.length - 4} more
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                            {/* Toggle Edit Details & Skills */}
                            <button
                              type="button"
                              onClick={() => setExpandedMemberId(isExpanded ? null : member.id)}
                              className="btn-secondary"
                              style={{ padding: "8px 14px", fontSize: "0.82rem", display: "inline-flex", alignItems: "center", gap: "6px" }}
                            >
                              <Edit3 size={14} />
                              <span>{isExpanded ? "Close Editor" : "Edit Skills & Profile"}</span>
                              {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                            </button>

                            {/* Photo Replacement */}
                            <label
                              style={{
                                padding: "8px 14px",
                                borderRadius: "8px",
                                background: "rgba(255, 255, 255, 0.04)",
                                border: "1px solid rgba(255, 255, 255, 0.1)",
                                color: "#cbd5e1",
                                fontSize: "0.82rem",
                                cursor: "pointer",
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "6px"
                              }}
                            >
                              <Upload size={14} />
                              <span>Photo</span>
                              <input
                                type="file"
                                accept="image/*"
                                style={{ display: "none" }}
                                onChange={(e) => handleImageUpload(e, (base64) => {
                                  const updated = teamMembers.map((m) => m.id === member.id ? { ...m, image: base64 } : m);
                                  updateTeamMembers(updated);
                                  triggerToast(`Updated photo for ${member.name}`);
                                })}
                              />
                            </label>

                            {/* Delete member (not allowed for CEO) */}
                            {idx !== 0 && (
                              <button
                                type="button"
                                onClick={() => {
                                  if (window.confirm(`Delete ${member.name} from the team?`)) {
                                    deleteTeamMember(member.id);
                                    triggerToast(`Removed ${member.name}`);
                                  }
                                }}
                                style={{
                                  padding: "8px 12px",
                                  borderRadius: "8px",
                                  background: "rgba(244, 63, 94, 0.1)",
                                  border: "1px solid rgba(244, 63, 94, 0.3)",
                                  color: "#fca5a5",
                                  cursor: "pointer"
                                }}
                                title="Remove Member"
                              >
                                <Trash2 size={16} />
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Expanded Skills & Profile Editor */}
                        {isExpanded && (
                          <div style={{
                            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                            paddingTop: "18px",
                            display: "flex",
                            flexDirection: "column",
                            gap: "16px"
                          }}>
                            <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1.2fr 1fr", gap: "12px" }}>
                              <div>
                                <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Full Name</label>
                                <input
                                  type="text"
                                  value={member.name}
                                  onChange={(e) => {
                                    const updated = teamMembers.map((m) => m.id === member.id ? { ...m, name: e.target.value } : m);
                                    updateTeamMembers(updated);
                                  }}
                                  style={{ width: "100%", background: "var(--bg-input)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", padding: "8px 12px", color: "#fff", fontSize: "0.9rem" }}
                                />
                              </div>
                              <div>
                                <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Role / Designation</label>
                                <input
                                  type="text"
                                  value={member.role}
                                  onChange={(e) => {
                                    const updated = teamMembers.map((m) => m.id === member.id ? { ...m, role: e.target.value } : m);
                                    updateTeamMembers(updated);
                                  }}
                                  style={{ width: "100%", background: "var(--bg-input)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", padding: "8px 12px", color: "var(--cyan)", fontSize: "0.9rem" }}
                                />
                              </div>
                              <div>
                                <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Department</label>
                                <select
                                  value={member.department}
                                  onChange={(e) => {
                                    const updated = teamMembers.map((m) => m.id === member.id ? { ...m, department: e.target.value } : m);
                                    updateTeamMembers(updated);
                                  }}
                                  style={{ width: "100%", background: "#0c1322", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", padding: "8px 12px", color: "#fff", fontSize: "0.85rem" }}
                                >
                                  <option value="Executive Leadership">Executive Leadership</option>
                                  <option value="Search & Generative AI">Search & Generative AI</option>
                                  <option value="Paid Ads & Media Buying">Paid Ads & Media Buying</option>
                                  <option value="Digital Engineering">Digital Engineering</option>
                                  <option value="Content Strategy">Content Strategy</option>
                                  <option value="Virtual Assistance & BPO">Virtual Assistance & BPO</option>
                                  <option value="Operations & Surveillance">Operations & Surveillance</option>
                                </select>
                              </div>
                            </div>

                            {/* Multi-Skills Manager */}
                            <div style={{ background: "rgba(0, 242, 254, 0.03)", padding: "16px", borderRadius: "10px", border: "1px solid rgba(0, 242, 254, 0.15)" }}>
                              <label style={{ fontSize: "0.82rem", color: "var(--cyan)", fontWeight: 700, display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px" }}>
                                <Tag size={14} />
                                <span>Multi-Skills & Competencies for {member.name} ({memberSkills.length} skills)</span>
                              </label>

                              {/* Current Skills Tags */}
                              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "12px" }}>
                                {memberSkills.map((sk, sIdx) => (
                                  <span
                                    key={sIdx}
                                    style={{
                                      display: "inline-flex",
                                      alignItems: "center",
                                      gap: "6px",
                                      padding: "5px 12px",
                                      borderRadius: "6px",
                                      background: "rgba(0, 242, 254, 0.1)",
                                      border: "1px solid rgba(0, 242, 254, 0.3)",
                                      color: "#e0f2fe",
                                      fontSize: "0.82rem"
                                    }}
                                  >
                                    <span>{sk}</span>
                                    <button
                                      type="button"
                                      onClick={() => removeSkillFromMember(sk)}
                                      style={{ background: "transparent", border: "none", color: "#f87171", cursor: "pointer", padding: "0 2px", fontWeight: 700 }}
                                      title="Remove skill"
                                    >
                                      ×
                                    </button>
                                  </span>
                                ))}
                                {memberSkills.length === 0 && (
                                  <span style={{ fontSize: "0.82rem", color: "var(--text-muted)", fontStyle: "italic" }}>
                                    No skills attached yet. Add from below.
                                  </span>
                                )}
                              </div>

                              {/* Add Custom Skill Input */}
                              <div style={{ display: "flex", gap: "10px", marginBottom: "12px" }}>
                                <input
                                  type="text"
                                  placeholder="Type any new skill name (e.g. Google Ads, SEO, AI Automations)..."
                                  value={memberSkillInput}
                                  onChange={(e) => setMemberSkillInput(e.target.value)}
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                      e.preventDefault();
                                      addSkillToMember(memberSkillInput.trim());
                                      setMemberSkillInput("");
                                    }
                                  }}
                                  style={{ flex: 1, padding: "8px 12px", background: "var(--bg-input)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#fff", fontSize: "0.85rem" }}
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    addSkillToMember(memberSkillInput.trim());
                                    setMemberSkillInput("");
                                  }}
                                  className="btn-primary"
                                  style={{ padding: "8px 16px", fontSize: "0.82rem" }}
                                >
                                  <Plus size={14} />
                                  <span>Add Skill</span>
                                </button>
                              </div>

                              {/* Quick Click-to-Add Suggestions from Tech Stack */}
                              <div>
                                <div style={{ fontSize: "0.74rem", color: "var(--text-muted)", marginBottom: "6px" }}>
                                  💡 Quick-add agency skill suggestions (click to add):
                                </div>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                                  {techStack
                                    .filter((ts) => !memberSkills.includes(ts.name))
                                    .slice(0, 10)
                                    .map((ts, tIdx) => (
                                      <button
                                        key={tIdx}
                                        type="button"
                                        onClick={() => addSkillToMember(ts.name)}
                                        style={{
                                          fontSize: "0.75rem",
                                          padding: "4px 10px",
                                          borderRadius: "4px",
                                          background: "rgba(255, 255, 255, 0.04)",
                                          border: "1px solid rgba(255, 255, 255, 0.1)",
                                          color: "#cbd5e1",
                                          cursor: "pointer"
                                        }}
                                      >
                                        + {ts.name}
                                      </button>
                                    ))}
                                </div>
                              </div>
                            </div>

                            {/* Bio */}
                            <div>
                              <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Bio / Responsibilities</label>
                              <textarea
                                rows={2}
                                value={member.bio}
                                onChange={(e) => {
                                  const updated = teamMembers.map((m) => m.id === member.id ? { ...m, bio: e.target.value } : m);
                                  updateTeamMembers(updated);
                                }}
                                style={{ width: "100%", background: "var(--bg-input)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", padding: "8px 12px", color: "var(--text-secondary)", fontSize: "0.88rem", lineHeight: 1.5 }}
                              />
                            </div>

                            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                              <button
                                type="button"
                                onClick={() => {
                                  setExpandedMemberId(null);
                                  triggerToast(`Saved profile & skills for ${member.name}`);
                                }}
                                className="btn-secondary"
                                style={{ padding: "6px 16px", fontSize: "0.82rem" }}
                              >
                                <Save size={14} />
                                <span>Done Editing</span>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ===============================================================
                TAB: SKILLS & CAPABILITIES
                =============================================================== */}
            {activeTab === "skills" && (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px", flexWrap: "wrap", gap: "16px" }}>
                  <div>
                    <span className="badge-pill emerald" style={{ marginBottom: "8px" }}>Core Competencies</span>
                    <h2 style={{ fontSize: "1.6rem", fontWeight: 800 }}>Agency Skills & Capabilities</h2>
                    <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem" }}>
                      Manage specialized agency skills. These power the interactive filter on the Team page and appear in the Skills Matrix.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsAddingSkill(true)}
                    className="btn-primary"
                    style={{ padding: "10px 20px" }}
                  >
                    <Plus size={16} />
                    <span>Add New Skill</span>
                  </button>
                </div>

                {/* Add New Skill Box */}
                {isAddingSkill && (
                  <div style={{
                    padding: "24px",
                    background: "rgba(0, 242, 254, 0.05)",
                    border: "1px solid rgba(0, 242, 254, 0.3)",
                    borderRadius: "14px",
                    marginBottom: "32px"
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                      <h3 style={{ fontSize: "1.2rem", fontWeight: 700, display: "flex", alignItems: "center", gap: "8px" }}>
                        <Sparkles size={18} color="var(--cyan)" />
                        <span>Add New Agency Skill / Technology</span>
                      </h3>
                      <button
                        type="button"
                        onClick={() => setIsAddingSkill(false)}
                        style={{ background: "transparent", border: "none", color: "var(--text-muted)", cursor: "pointer" }}
                      >
                        <X size={20} />
                      </button>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "16px" }}>
                      <div>
                        <label style={{ display: "block", fontSize: "0.82rem", color: "#cbd5e1", marginBottom: "4px" }}>Skill Name *</label>
                        <input
                          type="text"
                          value={newSkillData.name}
                          onChange={(e) => setNewSkillData({ ...newSkillData, name: e.target.value })}
                          placeholder="e.g. Python AI Automations"
                          style={{ width: "100%", padding: "10px", background: "var(--bg-input)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#fff" }}
                        />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: "0.82rem", color: "#cbd5e1", marginBottom: "4px" }}>Category</label>
                        <select
                          value={newSkillData.category}
                          onChange={(e) => setNewSkillData({ ...newSkillData, category: e.target.value })}
                          style={{ width: "100%", padding: "10px", background: "#0c1322", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#fff" }}
                        >
                          <option value="Search">Search (SEO / AEO / GEO)</option>
                          <option value="Paid Media">Paid Media (Google & Meta Ads)</option>
                          <option value="Web Dev">Web Development & Code</option>
                          <option value="AI & Automation">AI & Automation</option>
                          <option value="Security">Security & Vulnerability</option>
                          <option value="Operations">Operations, Calling & Surveillance</option>
                          <option value="Content">Content & Copywriting</option>
                          <option value="Growth">Growth & Leads</option>
                        </select>
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: "0.82rem", color: "#cbd5e1", marginBottom: "4px" }}>Proficiency / Level</label>
                        <input
                          type="text"
                          value={newSkillData.level}
                          onChange={(e) => setNewSkillData({ ...newSkillData, level: e.target.value })}
                          placeholder="e.g. 98%"
                          style={{ width: "100%", padding: "10px", background: "var(--bg-input)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#fff" }}
                        />
                      </div>
                    </div>

                    <div style={{ display: "flex", gap: "10px" }}>
                      <button
                        type="button"
                        onClick={() => {
                          if (!newSkillData.name.trim()) {
                            alert("Please enter a skill name.");
                            return;
                          }
                          addSkill(newSkillData);
                          setIsAddingSkill(false);
                          setNewSkillData({ name: "", category: "Search", level: "95%" });
                          triggerToast(`Added skill: ${newSkillData.name}`);
                        }}
                        className="btn-primary"
                        style={{ padding: "8px 20px" }}
                      >
                        Save Skill
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsAddingSkill(false)}
                        className="btn-secondary"
                        style={{ padding: "8px 16px" }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {/* Skills Grid */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px" }}>
                  {techStack.map((skill, sIdx) => (
                    <div
                      key={sIdx}
                      style={{
                        padding: "18px 20px",
                        background: "rgba(255, 255, 255, 0.02)",
                        border: "1px solid rgba(255, 255, 255, 0.08)",
                        borderRadius: "12px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px"
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px" }}>
                        <div>
                          <span className="badge-pill" style={{ fontSize: "0.68rem", padding: "2px 8px", marginBottom: "6px" }}>
                            {skill.category}
                          </span>
                          <div style={{ fontWeight: 700, fontSize: "1rem", color: "#fff" }}>
                            {skill.name}
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm(`Delete ${skill.name} from skills list?`)) {
                              deleteSkill(sIdx);
                              triggerToast(`Deleted skill ${skill.name}`);
                            }
                          }}
                          style={{
                            background: "rgba(244, 63, 94, 0.1)",
                            border: "1px solid rgba(244, 63, 94, 0.25)",
                            borderRadius: "6px",
                            color: "#fca5a5",
                            padding: "4px 8px",
                            cursor: "pointer"
                          }}
                          title="Delete Skill"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <label style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Level:</label>
                        <input
                          type="text"
                          value={skill.level}
                          onChange={(e) => updateSkill(sIdx, { level: e.target.value })}
                          style={{ width: "70px", background: "var(--bg-input)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "6px", padding: "4px 8px", color: "var(--cyan)", fontSize: "0.85rem", textAlign: "center" }}
                        />
                        <div style={{ flex: 1, height: "6px", background: "rgba(255, 255, 255, 0.06)", borderRadius: "3px", overflow: "hidden" }}>
                          <div style={{ width: skill.level, height: "100%", background: "var(--gradient-brand)", borderRadius: "3px" }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ===============================================================
                TAB 4: SERVICES MANAGEMENT
                =============================================================== */}
            {activeTab === "services" && (
              <div>
                <div style={{ marginBottom: "28px" }}>
                  <span className="badge-pill" style={{ marginBottom: "8px" }}>Service Matrix</span>
                  <h2 style={{ fontSize: "1.6rem", fontWeight: 800 }}>VRankly Service Disciplines</h2>
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem" }}>
                    Modify service titles, turnaround times, and descriptions.
                  </p>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  {services.map((svc, idx) => (
                    <div
                      key={svc.id}
                      style={{
                        padding: "24px",
                        background: "rgba(255, 255, 255, 0.02)",
                        border: "1px solid rgba(255, 255, 255, 0.08)",
                        borderRadius: "14px"
                      }}
                    >
                      <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "16px", marginBottom: "12px" }}>
                        <div>
                          <label style={{ fontSize: "0.78rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Vertical #{idx + 1} Title</label>
                          <input
                            type="text"
                            value={svc.title}
                            onChange={(e) => {
                              const updated = services.map((s) => s.id === svc.id ? { ...s, title: e.target.value } : s);
                              updateServices(updated);
                            }}
                            style={{ width: "100%", fontWeight: 700, fontSize: "1.1rem", background: "transparent", border: "none", borderBottom: "1px solid rgba(255,255,255,0.15)", color: "#fff", padding: "4px 0", outline: "none" }}
                          />
                        </div>
                        <div>
                          <label style={{ fontSize: "0.78rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Badge</label>
                          <input
                            type="text"
                            value={svc.badge}
                            onChange={(e) => {
                              const updated = services.map((s) => s.id === svc.id ? { ...s, badge: e.target.value } : s);
                              updateServices(updated);
                            }}
                            style={{ background: "rgba(0,242,254,0.1)", border: "1px solid rgba(0,242,254,0.3)", borderRadius: "6px", color: "var(--cyan)", fontSize: "0.8rem", padding: "4px 8px" }}
                          />
                        </div>
                      </div>

                      <div style={{ marginBottom: "12px" }}>
                        <label style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>Short Summary</label>
                        <textarea
                          rows={2}
                          value={svc.shortDesc}
                          onChange={(e) => {
                            const updated = services.map((s) => s.id === svc.id ? { ...s, shortDesc: e.target.value } : s);
                            updateServices(updated);
                          }}
                          style={{ width: "100%", background: "var(--bg-input)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", padding: "8px 12px", color: "var(--text-secondary)", fontSize: "0.9rem" }}
                        />
                      </div>

                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
                          Turnaround: <span style={{ color: "var(--cyan)" }}>{svc.turnaround}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => triggerToast(`Saved ${svc.title}`)}
                          className="btn-secondary"
                          style={{ padding: "6px 14px", fontSize: "0.8rem" }}
                        >
                          <Save size={14} />
                          <span>Save Changes</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ===============================================================
                TAB 5: CASE STUDIES & PROJECTS
                =============================================================== */}
            {activeTab === "projects" && (
              <div>
                <div style={{ marginBottom: "28px" }}>
                  <span className="badge-pill" style={{ marginBottom: "8px" }}>Client Evidence</span>
                  <h2 style={{ fontSize: "1.6rem", fontWeight: 800 }}>Flagship Case Studies</h2>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                  {projects.map((proj) => (
                    <div
                      key={proj.id}
                      style={{
                        padding: "24px",
                        background: "rgba(255, 255, 255, 0.02)",
                        border: "1px solid rgba(255, 255, 255, 0.08)",
                        borderRadius: "14px"
                      }}
                    >
                      <div style={{ display: "flex", gap: "18px", alignItems: "center", marginBottom: "16px" }}>
                        <div style={{ width: "100px", height: "60px", borderRadius: "8px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)", flexShrink: 0 }}>
                          <img src={proj.image} alt={proj.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Project Title</label>
                          <input
                            type="text"
                            value={proj.title}
                            onChange={(e) => {
                              const updated = projects.map((p) => p.id === proj.id ? { ...p, title: e.target.value } : p);
                              updateProjects(updated);
                            }}
                            style={{ width: "100%", fontWeight: 700, fontSize: "1.05rem", background: "transparent", border: "none", borderBottom: "1px solid rgba(255,255,255,0.15)", color: "#fff", outline: "none" }}
                          />
                        </div>
                      </div>

                      <div style={{ marginBottom: "14px" }}>
                        <label style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>Tagline</label>
                        <input
                          type="text"
                          value={proj.tagline}
                          onChange={(e) => {
                            const updated = projects.map((p) => p.id === proj.id ? { ...p, tagline: e.target.value } : p);
                            updateProjects(updated);
                          }}
                          style={{ width: "100%", background: "var(--bg-input)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", padding: "8px 12px", color: "var(--text-secondary)", fontSize: "0.88rem" }}
                        />
                      </div>

                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <label style={{ padding: "6px 14px", borderRadius: "8px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", fontSize: "0.8rem", color: "#cbd5e1", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "6px" }}>
                          <Upload size={14} />
                          <span>Change Project Image</span>
                          <input
                            type="file"
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={(e) => handleImageUpload(e, (base64) => {
                              const updated = projects.map((p) => p.id === proj.id ? { ...p, image: base64 } : p);
                              updateProjects(updated);
                              triggerToast(`Updated image for ${proj.title}`);
                            })}
                          />
                        </label>
                        <button
                          type="button"
                          onClick={() => triggerToast(`Saved ${proj.title}`)}
                          className="btn-secondary"
                          style={{ padding: "6px 14px", fontSize: "0.8rem" }}
                        >
                          <Save size={14} />
                          <span>Save Case Study</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ===============================================================
                TAB 6: TESTIMONIALS & CLIENT REVIEWS
                =============================================================== */}
            {activeTab === "testimonials" && (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px", flexWrap: "wrap", gap: "16px" }}>
                  <div>
                    <span className="badge-pill" style={{ marginBottom: "8px" }}>Social Proof</span>
                    <h2 style={{ fontSize: "1.6rem", fontWeight: 800 }}>Client Testimonials & Reviews</h2>
                    <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem" }}>
                      Manage authentic client endorsements, star ratings, and company logos displayed on the homepage.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsAddingReview(true)}
                    className="btn-primary"
                    style={{ padding: "10px 20px" }}
                  >
                    <Plus size={16} />
                    <span>Add New Review</span>
                  </button>
                </div>

                {/* Add New Review Box */}
                {isAddingReview && (
                  <div style={{
                    padding: "24px",
                    background: "rgba(0, 242, 254, 0.05)",
                    border: "1px solid rgba(0, 242, 254, 0.3)",
                    borderRadius: "14px",
                    marginBottom: "32px"
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                      <h3 style={{ fontSize: "1.2rem", fontWeight: 700, display: "flex", alignItems: "center", gap: "8px" }}>
                        <Star size={18} color="#f59e0b" fill="#f59e0b" />
                        <span>Add New Client Review</span>
                      </h3>
                      <button
                        type="button"
                        onClick={() => setIsAddingReview(false)}
                        style={{ background: "transparent", border: "none", color: "var(--text-muted)", cursor: "pointer" }}
                      >
                        <X size={20} />
                      </button>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "16px" }}>
                      <div>
                        <label style={{ display: "block", fontSize: "0.82rem", color: "#cbd5e1", marginBottom: "4px" }}>Client Name *</label>
                        <input
                          type="text"
                          value={newReviewData.author}
                          onChange={(e) => setNewReviewData({ ...newReviewData, author: e.target.value })}
                          placeholder="e.g. David Vance"
                          style={{ width: "100%", padding: "10px", background: "var(--bg-input)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#fff" }}
                        />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: "0.82rem", color: "#cbd5e1", marginBottom: "4px" }}>Role / Designation</label>
                        <input
                          type="text"
                          value={newReviewData.role}
                          onChange={(e) => setNewReviewData({ ...newReviewData, role: e.target.value })}
                          placeholder="e.g. Chief Marketing Officer"
                          style={{ width: "100%", padding: "10px", background: "var(--bg-input)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#fff" }}
                        />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: "0.82rem", color: "#cbd5e1", marginBottom: "4px" }}>Company / Organization</label>
                        <input
                          type="text"
                          value={newReviewData.company}
                          onChange={(e) => setNewReviewData({ ...newReviewData, company: e.target.value })}
                          placeholder="e.g. Fintech Horizons"
                          style={{ width: "100%", padding: "10px", background: "var(--bg-input)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#fff" }}
                        />
                      </div>
                    </div>

                    {/* Star Rating & Photo Row */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px", alignItems: "center" }}>
                      <div>
                        <label style={{ display: "block", fontSize: "0.82rem", color: "#cbd5e1", marginBottom: "6px" }}>Rating (Stars)</label>
                        <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setNewReviewData({ ...newReviewData, rating: star })}
                              style={{
                                background: "transparent",
                                border: "none",
                                cursor: "pointer",
                                padding: "2px"
                              }}
                            >
                              <Star
                                size={22}
                                color="#f59e0b"
                                fill={star <= newReviewData.rating ? "#f59e0b" : "transparent"}
                              />
                            </button>
                          ))}
                          <span style={{ fontSize: "0.85rem", color: "var(--cyan)", marginLeft: "8px", fontWeight: 600 }}>
                            {newReviewData.rating} / 5 Stars
                          </span>
                        </div>
                      </div>

                      <div>
                        <label style={{ display: "block", fontSize: "0.82rem", color: "#cbd5e1", marginBottom: "6px" }}>Client Photo / Company Logo</label>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                          {newReviewData.avatar && (
                            <img
                              src={newReviewData.avatar}
                              alt="Client preview"
                              style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover", border: "1px solid var(--cyan)" }}
                            />
                          )}
                          <label style={{
                            padding: "8px 14px",
                            borderRadius: "8px",
                            background: "rgba(255, 255, 255, 0.05)",
                            border: "1px solid rgba(255, 255, 255, 0.12)",
                            color: "#cbd5e1",
                            fontSize: "0.82rem",
                            cursor: "pointer",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "6px"
                          }}>
                            <Upload size={14} />
                            <span>{newReviewData.avatar ? "Change Photo" : "Upload Photo / Logo"}</span>
                            <input
                              type="file"
                              accept="image/*"
                              style={{ display: "none" }}
                              onChange={(e) => handleImageUpload(e, (base64) => setNewReviewData({ ...newReviewData, avatar: base64 }))}
                            />
                          </label>
                        </div>
                      </div>
                    </div>

                    <div style={{ marginBottom: "16px" }}>
                      <label style={{ display: "block", fontSize: "0.82rem", color: "#cbd5e1", marginBottom: "4px" }}>Review / Quote *</label>
                      <textarea
                        rows={3}
                        value={newReviewData.quote}
                        onChange={(e) => setNewReviewData({ ...newReviewData, quote: e.target.value })}
                        placeholder="Write the client's detailed feedback, measurable ROI, or experience working with VRankly..."
                        style={{ width: "100%", padding: "10px", background: "var(--bg-input)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#fff", lineHeight: 1.6 }}
                      />
                    </div>

                    <div style={{ display: "flex", gap: "10px" }}>
                      <button
                        type="button"
                        onClick={() => {
                          if (!newReviewData.author || !newReviewData.quote) {
                            alert("Please enter both the client's name and quote.");
                            return;
                          }
                          addTestimonial(newReviewData);
                          setIsAddingReview(false);
                          setNewReviewData({
                            author: "",
                            role: "",
                            company: "",
                            quote: "",
                            rating: 5,
                            avatar: ""
                          });
                          triggerToast("New client review added successfully!");
                        }}
                        className="btn-primary"
                        style={{ padding: "8px 20px" }}
                      >
                        Publish Review
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsAddingReview(false)}
                        className="btn-secondary"
                        style={{ padding: "8px 16px" }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {/* Existing Testimonials List */}
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  {testimonials.map((t, idx) => (
                    <div
                      key={t.id || idx}
                      style={{
                        padding: "24px",
                        background: "rgba(255, 255, 255, 0.02)",
                        border: "1px solid rgba(255, 255, 255, 0.08)",
                        borderRadius: "14px"
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px", flexWrap: "wrap", gap: "12px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                          {t.avatar ? (
                            <img
                              src={t.avatar}
                              alt={t.author}
                              style={{ width: "48px", height: "48px", borderRadius: "50%", objectFit: "cover", border: "1px solid rgba(0, 242, 254, 0.4)" }}
                            />
                          ) : (
                            <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "rgba(0, 242, 254, 0.12)", border: "1px solid rgba(0, 242, 254, 0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "var(--cyan)" }}>
                              {t.author ? t.author.charAt(0) : "C"}
                            </div>
                          )}
                          <div>
                            <div style={{ fontWeight: 700, fontSize: "1.05rem" }}>{t.author}</div>
                            <div style={{ fontSize: "0.82rem", color: "var(--cyan)" }}>{t.role} • <span style={{ color: "var(--text-muted)" }}>{t.company}</span></div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                          <label
                            style={{
                              padding: "6px 12px",
                              borderRadius: "8px",
                              background: "rgba(255, 255, 255, 0.04)",
                              border: "1px solid rgba(255, 255, 255, 0.1)",
                              color: "#cbd5e1",
                              fontSize: "0.78rem",
                              cursor: "pointer",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "6px"
                            }}
                          >
                            <Upload size={13} />
                            <span>Photo</span>
                            <input
                              type="file"
                              accept="image/*"
                              style={{ display: "none" }}
                              onChange={(e) => handleImageUpload(e, (base64) => {
                                const updated = [...testimonials];
                                updated[idx].avatar = base64;
                                updateTestimonials(updated);
                                triggerToast(`Updated photo for ${t.author}`);
                              })}
                            />
                          </label>

                          <button
                            type="button"
                            onClick={() => {
                              if (window.confirm(`Delete review from ${t.author}?`)) {
                                deleteTestimonial(idx);
                                triggerToast(`Removed review from ${t.author}`);
                              }
                            }}
                            style={{
                              padding: "6px 10px",
                              borderRadius: "8px",
                              background: "rgba(244, 63, 94, 0.1)",
                              border: "1px solid rgba(244, 63, 94, 0.3)",
                              color: "#fca5a5",
                              cursor: "pointer"
                            }}
                            title="Delete Review"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>

                      {/* Inputs Row */}
                      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 1fr", gap: "12px", marginBottom: "14px" }}>
                        <div>
                          <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Client Name</label>
                          <input
                            type="text"
                            value={t.author}
                            onChange={(e) => {
                              const updated = [...testimonials];
                              updated[idx].author = e.target.value;
                              updateTestimonials(updated);
                            }}
                            style={{ width: "100%", background: "var(--bg-input)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", padding: "8px 12px", color: "#fff", fontSize: "0.9rem" }}
                          />
                        </div>
                        <div>
                          <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Role / Title</label>
                          <input
                            type="text"
                            value={t.role}
                            onChange={(e) => {
                              const updated = [...testimonials];
                              updated[idx].role = e.target.value;
                              updateTestimonials(updated);
                            }}
                            style={{ width: "100%", background: "var(--bg-input)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", padding: "8px 12px", color: "var(--cyan)", fontSize: "0.9rem" }}
                          />
                        </div>
                        <div>
                          <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Company</label>
                          <input
                            type="text"
                            value={t.company}
                            onChange={(e) => {
                              const updated = [...testimonials];
                              updated[idx].company = e.target.value;
                              updateTestimonials(updated);
                            }}
                            style={{ width: "100%", background: "var(--bg-input)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", padding: "8px 12px", color: "#fff", fontSize: "0.9rem" }}
                          />
                        </div>
                      </div>

                      {/* Rating Stars Selector */}
                      <div style={{ marginBottom: "14px", display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Rating:</span>
                        <div style={{ display: "flex", gap: "4px" }}>
                          {[1, 2, 3, 4, 5].map((s) => (
                            <button
                              key={s}
                              type="button"
                              onClick={() => {
                                const updated = [...testimonials];
                                updated[idx].rating = s;
                                updateTestimonials(updated);
                              }}
                              style={{ background: "transparent", border: "none", cursor: "pointer", padding: "2px" }}
                            >
                              <Star
                                size={18}
                                color="#f59e0b"
                                fill={s <= (t.rating || 5) ? "#f59e0b" : "transparent"}
                              />
                            </button>
                          ))}
                        </div>
                        <span style={{ fontSize: "0.82rem", color: "#f59e0b", fontWeight: 600 }}>
                          ({t.rating || 5} / 5)
                        </span>
                      </div>

                      {/* Quote Text */}
                      <div style={{ marginBottom: "12px" }}>
                        <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Review Quote</label>
                        <textarea
                          rows={3}
                          value={t.quote}
                          onChange={(e) => {
                            const updated = [...testimonials];
                            updated[idx].quote = e.target.value;
                            updateTestimonials(updated);
                          }}
                          style={{ width: "100%", background: "var(--bg-input)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", padding: "10px 12px", color: "#e2e8f0", lineHeight: 1.6, fontSize: "0.92rem" }}
                        />
                      </div>

                      <div style={{ display: "flex", justifyContent: "flex-end" }}>
                        <button
                          type="button"
                          onClick={() => triggerToast(`Saved review from ${t.author}`)}
                          className="btn-secondary"
                          style={{ padding: "6px 14px", fontSize: "0.8rem" }}
                        >
                          <Save size={14} />
                          <span>Save Changes</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ===============================================================
                TAB: CLIENT VIDEO REVIEWS (2 VIDEOS SHOWCASE)
                =============================================================== */}
            {activeTab === "videoReviews" && (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "16px", marginBottom: "28px" }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                      <span className="badge-pill emerald">Video Testimonials Settings</span>
                      <span className="badge-pill" style={{ borderColor: "rgba(0, 242, 254, 0.4)", color: "var(--cyan)" }}>
                        2 Videos Active
                      </span>
                    </div>
                    <h2 style={{ fontSize: "1.6rem", fontWeight: 800 }}>Client Video Reviews</h2>
                    <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem", maxWidth: "680px" }}>
                      Manage the 2 client review videos displayed on your public website under the Testimonials section.
                      Paste direct MP4 URLs, YouTube, Vimeo, Loom links, or upload video files directly from your computer.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      triggerToast("All video review changes are synced live to the public website!");
                    }}
                    className="btn-primary"
                    style={{ padding: "10px 20px" }}
                  >
                    <Save size={16} />
                    <span>Sync Live</span>
                  </button>
                </div>

                {/* Helpful Instruction Box */}
                <div style={{
                  padding: "16px 20px",
                  borderRadius: "12px",
                  background: "rgba(0, 242, 254, 0.05)",
                  border: "1px solid rgba(0, 242, 254, 0.2)",
                  marginBottom: "32px",
                  display: "flex",
                  alignItems: "center",
                  gap: "14px"
                }}>
                  <div style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "8px",
                    background: "rgba(0, 242, 254, 0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--cyan)",
                    flexShrink: 0
                  }}>
                    <Video size={18} />
                  </div>
                  <div style={{ fontSize: "0.85rem", color: "#cbd5e1", lineHeight: 1.5 }}>
                    <strong style={{ color: "var(--cyan)" }}>Dashboard Video Setup:</strong> You have 2 dedicated video review slots below.
                    Put your video link (e.g. YouTube, Vimeo, Loom, or MP4 URL) in the <strong>Video Link</strong> field, or click <strong>Upload Video File</strong>.
                    If a video link is left empty, the public website displays the webcam preview with an interactive audio speech playback so the section is always ready.
                  </div>
                </div>

                {/* 2 Video Slots List */}
                <div style={{ display: "flex", flexDirection: "column", gap: "36px" }}>
                  {(videoReviews && videoReviews.length > 0 ? videoReviews.slice(0, 2) : []).map((v, idx) => {
                    const rawUrl = v.videoUrl || (idx === 0 ? "/videos/review-ella.webm" : "/videos/review-marcus.webm");
                    const embedUrl = getVideoEmbedUrl(rawUrl);
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
                        key={v.id || idx}
                        style={{
                          padding: "28px",
                          background: "rgba(255, 255, 255, 0.02)",
                          border: "1px solid rgba(0, 242, 254, 0.25)",
                          borderRadius: "16px",
                          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4)"
                        }}
                      >
                        {/* Slot Header */}
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px", marginBottom: "20px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                            <div style={{
                              width: "38px",
                              height: "38px",
                              borderRadius: "10px",
                              background: "rgba(0, 242, 254, 0.15)",
                              border: "1px solid rgba(0, 242, 254, 0.4)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontWeight: 800,
                              color: "var(--cyan)"
                            }}>
                              #{idx + 1}
                            </div>
                            <div>
                              <h3 style={{ fontSize: "1.18rem", fontWeight: 700, margin: 0, color: "#fff" }}>
                                Video Review Slot #{idx + 1} — {v.clientName}
                              </h3>
                              <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                                {v.role} • {v.company}
                              </div>
                            </div>
                          </div>

                          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            {v.videoUrl ? (
                              <span className="badge-pill emerald" style={{ fontSize: "0.75rem", padding: "4px 10px" }}>
                                <Check size={12} style={{ marginRight: "4px" }} /> Video Attached
                              </span>
                            ) : (
                              <span className="badge-pill" style={{ fontSize: "0.75rem", padding: "4px 10px", color: "var(--cyan)", borderColor: "rgba(0,242,254,0.4)" }}>
                                Ready for Video URL / Upload
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Top: Video Player Live Preview + Video Source Controls */}
                        <div style={{
                          display: "grid",
                          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                          gap: "20px",
                          marginBottom: "24px",
                          padding: "16px",
                          background: "rgba(6, 8, 13, 0.6)",
                          borderRadius: "12px",
                          border: "1px solid rgba(255, 255, 255, 0.08)"
                        }}>
                          {/* Live Player Preview (TikTok 9:16 Portrait Frame) */}
                          <div style={{ textAlign: "center" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                              <label style={{ fontSize: "0.78rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>
                                Live 9:16 Video Preview
                              </label>
                              <span className="badge-pill emerald" style={{ fontSize: "0.7rem", padding: "2px 8px" }}>
                                TikTok 9:16 Frame
                              </span>
                            </div>
                            
                            <div style={{
                              position: "relative",
                              borderRadius: "18px",
                              overflow: "hidden",
                              border: "2px solid rgba(0, 242, 254, 0.4)",
                              background: "#000",
                              width: "180px",
                              aspectRatio: "9/16",
                              margin: "0 auto",
                              boxShadow: "0 12px 30px rgba(0, 0, 0, 0.8), 0 0 20px rgba(0, 242, 254, 0.15)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center"
                            }}>
                              {/* Smartphone Notch / Pill at top */}
                              <div style={{
                                position: "absolute",
                                top: "8px",
                                left: "50%",
                                transform: "translateX(-50%)",
                                width: "48px",
                                height: "4px",
                                borderRadius: "4px",
                                background: "rgba(255, 255, 255, 0.3)",
                                zIndex: 10,
                                pointerEvents: "none"
                              }} />

                              {embedUrl ? (
                                <iframe
                                  src={embedUrl}
                                  title={`Preview ${v.clientName}`}
                                  style={{ width: "100%", height: "100%", border: "none" }}
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen
                                />
                              ) : isDirectVideo ? (
                                <div style={{ position: "relative", width: "100%", height: "100%", background: "#050811" }}>
                                  {v.thumbnail && (
                                    <img
                                      src={v.thumbnail}
                                      alt={v.clientName}
                                      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.85 }}
                                    />
                                  )}
                                  <video
                                    controls
                                    src={rawUrl}
                                    style={{ position: "relative", zIndex: 2, width: "100%", height: "100%", objectFit: "cover", background: "transparent" }}
                                  />
                                </div>
                              ) : (
                                <div style={{ position: "relative", width: "100%", height: "100%" }}>
                                  {v.thumbnail && (
                                    <img
                                      src={v.thumbnail}
                                      alt={v.clientName}
                                      style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.65 }}
                                    />
                                  )}
                                  <div style={{
                                    position: "absolute",
                                    inset: 0,
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: "8px",
                                    background: "rgba(0, 0, 0, 0.45)",
                                    padding: "12px",
                                    textAlign: "center"
                                  }}>
                                    <div style={{
                                      width: "44px",
                                      height: "44px",
                                      borderRadius: "50%",
                                      background: "rgba(0, 242, 254, 0.25)",
                                      border: "1px solid var(--cyan)",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      color: "var(--cyan)",
                                      boxShadow: "0 0 20px rgba(0, 242, 254, 0.4)"
                                    }}>
                                      <Play size={18} fill="currentColor" style={{ marginLeft: "2px" }} />
                                    </div>
                                    <span style={{ fontSize: "0.78rem", color: "#e2e8f0", fontWeight: 700 }}>
                                      {v.videoUrl ? "Video Active" : "No Video Yet"}
                                    </span>
                                    <span style={{ fontSize: "0.68rem", color: "var(--cyan)" }}>
                                      9:16 Portrait Ratio
                                    </span>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Video Link & File Upload Controls */}
                          <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                            <div>
                              <label style={{ display: "block", fontSize: "0.78rem", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: "6px", fontWeight: 700 }}>
                                Video URL (YouTube, Vimeo, Loom, or Direct MP4)
                              </label>
                              <div style={{ display: "flex", gap: "8px", marginBottom: "14px" }}>
                                <input
                                  type="text"
                                  value={v.videoUrl || ""}
                                  onChange={(e) => {
                                    updateSingleVideoReview(v.id, { videoUrl: e.target.value.trim() });
                                  }}
                                  placeholder="e.g. https://www.youtube.com/watch?v=... or https://mysite.com/review.mp4"
                                  style={{
                                    flex: 1,
                                    background: "var(--bg-input)",
                                    border: "1px solid rgba(0, 242, 254, 0.3)",
                                    borderRadius: "8px",
                                    padding: "10px 12px",
                                    color: "#fff",
                                    fontSize: "0.85rem"
                                  }}
                                />
                                {v.videoUrl && (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      updateSingleVideoReview(v.id, { videoUrl: "" });
                                      triggerToast("Cleared video link for Slot #" + (idx + 1));
                                    }}
                                    className="btn-secondary"
                                    style={{ padding: "8px 12px", fontSize: "0.8rem", color: "#f87171" }}
                                    title="Clear video link"
                                  >
                                    <X size={15} />
                                  </button>
                                )}
                              </div>

                              <label style={{ display: "block", fontSize: "0.78rem", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: "6px", fontWeight: 700 }}>
                                Or Upload Video File (.mp4, .webm)
                              </label>
                              <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "14px" }}>
                                <label style={{
                                  padding: "9px 16px",
                                  borderRadius: "8px",
                                  background: "rgba(0, 242, 254, 0.12)",
                                  border: "1px solid rgba(0, 242, 254, 0.35)",
                                  color: "var(--cyan)",
                                  fontSize: "0.82rem",
                                  fontWeight: 600,
                                  cursor: "pointer",
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: "8px"
                                }}>
                                  <Upload size={14} />
                                  <span>Choose Video File from PC</span>
                                  <input
                                    type="file"
                                    accept="video/mp4,video/webm,video/ogg"
                                    style={{ display: "none" }}
                                    onChange={(e) => handleVideoFileUpload(e, v.id)}
                                  />
                                </label>
                                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                                  Accepts MP4, WebM
                                </span>
                              </div>
                            </div>

                            {/* Poster / Thumbnail Row */}
                            <div>
                              <label style={{ display: "block", fontSize: "0.78rem", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: "6px", fontWeight: 700 }}>
                                Video Poster / Thumbnail Image
                              </label>
                              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                                <input
                                  type="text"
                                  value={v.thumbnail || ""}
                                  onChange={(e) => updateSingleVideoReview(v.id, { thumbnail: e.target.value })}
                                  placeholder="/images/testimonial-british-client.jpg"
                                  style={{
                                    flex: 1,
                                    background: "var(--bg-input)",
                                    border: "1px solid rgba(255,255,255,0.08)",
                                    borderRadius: "8px",
                                    padding: "8px 12px",
                                    color: "#cbd5e1",
                                    fontSize: "0.85rem"
                                  }}
                                />
                                <label style={{
                                  padding: "8px 12px",
                                  borderRadius: "8px",
                                  background: "rgba(255, 255, 255, 0.05)",
                                  border: "1px solid rgba(255, 255, 255, 0.15)",
                                  color: "#cbd5e1",
                                  fontSize: "0.8rem",
                                  cursor: "pointer",
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: "6px"
                                }}>
                                  <Upload size={13} />
                                  <span>Upload Image</span>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    style={{ display: "none" }}
                                    onChange={(e) => handleImageUpload(e, (base64) => {
                                      updateSingleVideoReview(v.id, { thumbnail: base64 });
                                      triggerToast("Updated poster thumbnail!");
                                    })}
                                  />
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Middle: Client Details & Credentials Grid */}
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "14px", marginBottom: "16px" }}>
                          <div>
                            <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Client Name *</label>
                            <input
                              type="text"
                              value={v.clientName || ""}
                              onChange={(e) => updateSingleVideoReview(v.id, { clientName: e.target.value })}
                              style={{ width: "100%", background: "var(--bg-input)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", padding: "8px 12px", color: "#fff", fontSize: "0.9rem" }}
                            />
                          </div>

                          <div>
                            <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Role / Designation</label>
                            <input
                              type="text"
                              value={v.role || ""}
                              onChange={(e) => updateSingleVideoReview(v.id, { role: e.target.value })}
                              style={{ width: "100%", background: "var(--bg-input)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", padding: "8px 12px", color: "var(--cyan)", fontSize: "0.9rem" }}
                            />
                          </div>

                          <div>
                            <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Company & Country</label>
                            <input
                              type="text"
                              value={v.company || ""}
                              onChange={(e) => updateSingleVideoReview(v.id, { company: e.target.value })}
                              style={{ width: "100%", background: "var(--bg-input)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", padding: "8px 12px", color: "#fff", fontSize: "0.9rem" }}
                            />
                          </div>

                          <div>
                            <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Video Duration</label>
                            <input
                              type="text"
                              value={v.duration || "0:48"}
                              onChange={(e) => updateSingleVideoReview(v.id, { duration: e.target.value })}
                              placeholder="e.g. 0:48"
                              style={{ width: "100%", background: "var(--bg-input)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", padding: "8px 12px", color: "#fff", fontSize: "0.9rem" }}
                            />
                          </div>
                        </div>

                        {/* Title & Rating */}
                        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "14px", marginBottom: "16px" }}>
                          <div>
                            <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Headline / Main Achievement</label>
                            <input
                              type="text"
                              value={v.title || ""}
                              onChange={(e) => updateSingleVideoReview(v.id, { title: e.target.value })}
                              placeholder="e.g. Organic Search & AI Overview Ranking Jump (+340%)"
                              style={{ width: "100%", background: "var(--bg-input)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", padding: "8px 12px", color: "#fff", fontSize: "0.9rem" }}
                            />
                          </div>

                          <div>
                            <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Star Rating</label>
                            <div style={{ display: "flex", gap: "4px", alignItems: "center", marginTop: "6px" }}>
                              {[1, 2, 3, 4, 5].map((s) => (
                                <button
                                  key={s}
                                  type="button"
                                  onClick={() => updateSingleVideoReview(v.id, { rating: s })}
                                  style={{ background: "transparent", border: "none", cursor: "pointer", padding: "2px" }}
                                >
                                  <Star
                                    size={18}
                                    color="#f59e0b"
                                    fill={s <= (v.rating || 5) ? "#f59e0b" : "transparent"}
                                  />
                                </button>
                              ))}
                              <span style={{ fontSize: "0.82rem", color: "#f59e0b", fontWeight: 700, marginLeft: "6px" }}>
                                ({v.rating || 5}/5)
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* 3 Verified Metric Tags */}
                        <div style={{ marginBottom: "16px" }}>
                          <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", display: "block", marginBottom: "6px" }}>
                            Verified Result Metrics (3 Highlights)
                          </label>
                          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "10px" }}>
                            {[0, 1, 2].map((mIdx) => (
                              <input
                                key={mIdx}
                                type="text"
                                value={(v.metrics && v.metrics[mIdx]) || ""}
                                onChange={(e) => {
                                  const newMetrics = [...(v.metrics || ["", "", ""])];
                                  newMetrics[mIdx] = e.target.value;
                                  updateSingleVideoReview(v.id, { metrics: newMetrics });
                                }}
                                placeholder={`Metric #${mIdx + 1} (e.g. +340% Traffic)`}
                                style={{
                                  background: "var(--bg-input)",
                                  border: "1px solid rgba(255,255,255,0.08)",
                                  borderRadius: "8px",
                                  padding: "8px 12px",
                                  color: "#34d399",
                                  fontSize: "0.85rem",
                                  fontWeight: 600
                                }}
                              />
                            ))}
                          </div>
                        </div>

                        {/* Client Short Quote */}
                        <div style={{ marginBottom: "16px" }}>
                          <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Card Short Quote</label>
                          <textarea
                            rows={2}
                            value={v.quote || ""}
                            onChange={(e) => updateSingleVideoReview(v.id, { quote: e.target.value })}
                            placeholder="Brief summary quote shown directly on the client video card..."
                            style={{ width: "100%", background: "var(--bg-input)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", padding: "10px 12px", color: "#e2e8f0", lineHeight: 1.6, fontSize: "0.9rem" }}
                          />
                        </div>

                        {/* Verbatim Video Transcript */}
                        <div style={{ marginBottom: "18px" }}>
                          <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Full Verbatim Transcript (Spoken Audio)</label>
                          <textarea
                            rows={4}
                            value={v.transcript || ""}
                            onChange={(e) => updateSingleVideoReview(v.id, { transcript: e.target.value })}
                            placeholder="Full text of what the client says in the video..."
                            style={{ width: "100%", background: "var(--bg-input)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", padding: "10px 12px", color: "#cbd5e1", lineHeight: 1.6, fontSize: "0.88rem" }}
                          />
                        </div>

                        {/* Save Action */}
                        <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                          <button
                            type="button"
                            onClick={() => triggerToast(`Saved Video Review #${idx + 1} (${v.clientName}) successfully!`)}
                            className="btn-primary"
                            style={{ padding: "8px 20px", fontSize: "0.85rem" }}
                          >
                            <Save size={15} />
                            <span>Save Video Review #{idx + 1}</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ===============================================================
                TAB 7: ADMIN SECURITY / PASSWORD CHANGE
                =============================================================== */}
            {activeTab === "security" && (
              <div>
                <div style={{ marginBottom: "28px" }}>
                  <span className="badge-pill" style={{ marginBottom: "8px" }}>Access Control</span>
                  <h2 style={{ fontSize: "1.6rem", fontWeight: 800 }}>Admin Login & Password</h2>
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem" }}>
                    Change the CEO master credentials used to unlock this CMS.
                  </p>
                </div>

                {credMessage && (
                  <div style={{
                    padding: "12px 16px",
                    borderRadius: "10px",
                    background: "rgba(16, 185, 129, 0.12)",
                    border: "1px solid rgba(16, 185, 129, 0.3)",
                    color: "var(--emerald)",
                    fontSize: "0.9rem",
                    marginBottom: "20px"
                  }}>
                    {credMessage}
                  </div>
                )}

                <form onSubmit={(e) => {
                  e.preventDefault();
                  if (newAdminPassword && newAdminPassword !== confirmPassword) {
                    alert("New password and confirmation do not match.");
                    return;
                  }
                  updateCreds(newAdminEmail, newAdminPassword || adminCreds.password);
                  setCredMessage("Admin credentials updated successfully! Remember your new password.");
                  triggerToast("Credentials saved!");
                }} style={{ maxWidth: "440px", display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", color: "#cbd5e1", marginBottom: "6px", fontWeight: 600 }}>
                      Admin Username / Email
                    </label>
                    <input
                      type="email"
                      required
                      value={newAdminEmail}
                      onChange={(e) => setNewAdminEmail(e.target.value)}
                      style={{ width: "100%", background: "var(--bg-input)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "8px", padding: "10px 14px", color: "#fff" }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", color: "#cbd5e1", marginBottom: "6px", fontWeight: 600 }}>
                      New Password (leave blank to keep current)
                    </label>
                    <input
                      type="password"
                      value={newAdminPassword}
                      onChange={(e) => setNewAdminPassword(e.target.value)}
                      placeholder="Enter new password"
                      style={{ width: "100%", background: "var(--bg-input)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "8px", padding: "10px 14px", color: "#fff" }}
                    />
                  </div>

                  {newAdminPassword && (
                    <div>
                      <label style={{ display: "block", fontSize: "0.85rem", color: "#cbd5e1", marginBottom: "6px", fontWeight: 600 }}>
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Re-enter new password"
                        style={{ width: "100%", background: "var(--bg-input)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "8px", padding: "10px 14px", color: "#fff" }}
                      />
                    </div>
                  )}

                  <button type="submit" className="btn-primary" style={{ padding: "12px 24px", marginTop: "8px" }}>
                    <Save size={16} />
                    <span>Update Admin Credentials</span>
                  </button>
                </form>

                {/* System Backup, Restore & Default Reset */}
                <div style={{ marginTop: "48px", paddingTop: "32px", borderTop: "1px solid rgba(255, 255, 255, 0.08)", maxWidth: "600px" }}>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "8px" }}>
                    Portfolio Data Backup &amp; Disaster Recovery
                  </h3>
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.88rem", marginBottom: "20px" }}>
                    Export a full JSON snapshot of all your CMS data (team members, testimonials, video reviews, projects, theme tokens) or restore from an existing JSON backup file.
                  </p>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center", marginBottom: "24px" }}>
                    <button
                      type="button"
                      onClick={() => {
                        exportBackupJSON();
                        triggerToast("JSON backup downloaded!");
                      }}
                      className="btn-secondary"
                      style={{ padding: "10px 18px", fontSize: "0.88rem", display: "inline-flex", alignItems: "center", gap: "8px" }}
                    >
                      <Download size={16} color="var(--cyan)" />
                      <span>Export CMS Backup (.json)</span>
                    </button>

                    <label style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "10px 18px",
                      borderRadius: "10px",
                      background: "rgba(139, 92, 246, 0.12)",
                      border: "1px solid rgba(139, 92, 246, 0.3)",
                      color: "#c084fc",
                      fontSize: "0.88rem",
                      fontWeight: 600,
                      cursor: "pointer"
                    }}>
                      <Upload size={16} />
                      <span>Import JSON Backup</span>
                      <input
                        type="file"
                        accept=".json"
                        style={{ display: "none" }}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          const reader = new FileReader();
                          reader.onload = (ev) => {
                            const res = importBackupJSON(ev.target.result);
                            if (res.success) {
                              triggerToast("Backup restored successfully!");
                            } else {
                              alert("Failed to restore backup: " + res.error);
                            }
                          };
                          reader.readAsText(file);
                        }}
                      />
                    </label>

                    <button
                      type="button"
                      onClick={() => {
                        if (window.confirm("Are you sure you want to reset all CMS content to factory defaults? Any unsaved edits will be cleared.")) {
                          resetToDefaults();
                          triggerToast("Reset to factory defaults!");
                        }
                      }}
                      style={{
                        padding: "10px 18px",
                        borderRadius: "10px",
                        background: "rgba(244, 63, 94, 0.1)",
                        border: "1px solid rgba(244, 63, 94, 0.25)",
                        color: "#f87171",
                        fontSize: "0.88rem",
                        fontWeight: 600,
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px"
                      }}
                    >
                      <RefreshCw size={15} />
                      <span>Reset to Defaults</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}
