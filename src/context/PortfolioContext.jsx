import React, { createContext, useContext, useState, useEffect } from "react";
import {
  COMPANY_INFO as DEFAULT_COMPANY_INFO,
  TEAM_MEMBERS as DEFAULT_TEAM_MEMBERS,
  SERVICES as DEFAULT_SERVICES,
  PROJECTS as DEFAULT_PROJECTS,
  TESTIMONIALS as DEFAULT_TESTIMONIALS,
  DEFAULT_VIDEO_REVIEWS,
  FAQS as DEFAULT_FAQS,
  TECH_STACK as DEFAULT_TECH_STACK,
  TRUSTED_CLIENTS as DEFAULT_TRUSTED_CLIENTS
} from "../data/portfolioData";

const PortfolioContext = createContext(null);

const STORAGE_KEY = "vrankly_cms_data";
const THEME_STORAGE_KEY = "vrankly_theme_settings";
const AUTH_STORAGE_KEY = "vrankly_admin_auth";
const CREDS_STORAGE_KEY = "vrankly_admin_creds";
const VISITOR_STORAGE_KEY = "vrankly_visitor_logs";

// IndexedDB Media Storage for large video file uploads
const MEDIA_DB_NAME = "vrankly_media_db";
const MEDIA_STORE = "video_blobs";

function openMediaDB() {
  return new Promise((resolve) => {
    if (typeof window === "undefined" || !window.indexedDB) {
      resolve(null);
      return;
    }
    const req = window.indexedDB.open(MEDIA_DB_NAME, 1);
    req.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(MEDIA_STORE)) {
        db.createObjectStore(MEDIA_STORE);
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => resolve(null);
  });
}

async function storeVideoFile(key, fileOrBlob) {
  try {
    const db = await openMediaDB();
    if (!db) return false;
    return new Promise((resolve) => {
      const tx = db.transaction(MEDIA_STORE, "readwrite");
      const store = tx.objectStore(MEDIA_STORE);
      store.put(fileOrBlob, key);
      tx.oncomplete = () => resolve(true);
      tx.onerror = () => resolve(false);
    });
  } catch (e) {
    console.error("IndexedDB store error:", e);
    return false;
  }
}

async function retrieveVideoFile(key) {
  try {
    const db = await openMediaDB();
    if (!db) return null;
    return new Promise((resolve) => {
      const tx = db.transaction(MEDIA_STORE, "readonly");
      const store = tx.objectStore(MEDIA_STORE);
      const req = store.get(key);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => resolve(null);
    });
  } catch (e) {
    console.error("IndexedDB retrieve error:", e);
    return null;
  }
}

const DEFAULT_VISITOR_LOGS = [
  {
    id: "seed-1",
    ip: "182.185.160.22",
    city: "Lahore",
    country: "Pakistan",
    countryCode: "PK",
    path: "/team",
    referrer: "Direct / Bookmark",
    device: "Desktop",
    browser: "Chrome",
    os: "Windows",
    timestamp: new Date(Date.now() - 1000 * 60 * 3).toISOString()
  },
  {
    id: "seed-2",
    ip: "104.28.19.74",
    city: "New York",
    country: "United States",
    countryCode: "US",
    path: "/services",
    referrer: "https://www.google.com/search?q=vrankly+aeo+agency",
    device: "Desktop",
    browser: "Safari",
    os: "macOS",
    timestamp: new Date(Date.now() - 1000 * 60 * 18).toISOString()
  },
  {
    id: "seed-3",
    ip: "111.92.128.5",
    city: "Islamabad",
    country: "Pakistan",
    countryCode: "PK",
    path: "/",
    referrer: "https://www.linkedin.com/feed",
    device: "Mobile",
    browser: "Chrome",
    os: "Android",
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString()
  },
  {
    id: "seed-4",
    ip: "185.199.108.153",
    city: "London",
    country: "United Kingdom",
    countryCode: "GB",
    path: "/portfolio",
    referrer: "https://twitter.com/faizancheena",
    device: "Desktop",
    browser: "Edge",
    os: "Windows",
    timestamp: new Date(Date.now() - 1000 * 60 * 115).toISOString()
  },
  {
    id: "seed-5",
    ip: "39.40.12.18",
    city: "Karachi",
    country: "Pakistan",
    countryCode: "PK",
    path: "/contact",
    referrer: "Direct / Bookmark",
    device: "Mobile",
    browser: "Safari",
    os: "iOS",
    timestamp: new Date(Date.now() - 1000 * 60 * 210).toISOString()
  }
];

const DEFAULT_THEME = {
  primaryAccent: "#00f2fe",
  secondaryAccent: "#8b5cf6",
  tertiaryAccent: "#10b981",
  bgPrimary: "#06080d",
  bgSecondary: "#0b0f19",
  glowIntensity: 1, // 0 to 1.5
  preset: "cyber-cyan"
};

const DEFAULT_CREDS = {
  email: "admin@vrankly.com",
  password: "vrankly2026"
};

export function PortfolioProvider({ children }) {
  // Load saved CMS data from localStorage or fallback to defaults
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        let teamList = parsed.teamMembers || DEFAULT_TEAM_MEMBERS;
        const currentIds = new Set(teamList.map((m) => m.id));
        const missingDefaults = DEFAULT_TEAM_MEMBERS.filter((m) => !currentIds.has(m.id));
        if (missingDefaults.length > 0) {
          teamList = [...teamList, ...missingDefaults];
        }
        teamList = teamList.map((m) => {
          const def = DEFAULT_TEAM_MEMBERS.find((d) => d.id === m.id);
          return {
            ...m,
            image: m.image || (def ? def.image : "/images/faizan-cheena.jpg")
          };
        });

        let projectList = parsed.projects || DEFAULT_PROJECTS;
        const currentProjIds = new Set(projectList.map((p) => p.id));
        const missingDefaultProjects = DEFAULT_PROJECTS.filter((p) => !currentProjIds.has(p.id));
        if (missingDefaultProjects.length > 0) {
          projectList = [...projectList, ...missingDefaultProjects];
        }
        projectList = projectList.map((p, idx) => {
          const def = DEFAULT_PROJECTS.find((d) => d.id === p.id) || DEFAULT_PROJECTS[idx];
          return {
            ...p,
            image: p.image || (def ? def.image : "/images/project-seo-aeo.jpg")
          };
        });

        let testList = parsed.testimonials || DEFAULT_TESTIMONIALS;
        const hasOliver = testList.some((t) => t.author?.includes("Oliver"));
        if (!hasOliver && DEFAULT_TESTIMONIALS[0]) {
          testList = [DEFAULT_TESTIMONIALS[0], ...testList];
        }

        let videoReviewsList = parsed.videoReviews || DEFAULT_VIDEO_REVIEWS;
        if (!videoReviewsList || videoReviewsList.length === 0) {
          videoReviewsList = DEFAULT_VIDEO_REVIEWS;
        } else {
          // Auto-migrate any empty videoUrl to the default static video files
          videoReviewsList = videoReviewsList.map((v, vIdx) => ({
            ...v,
            videoUrl: v.videoUrl || (DEFAULT_VIDEO_REVIEWS[vIdx] ? DEFAULT_VIDEO_REVIEWS[vIdx].videoUrl : (vIdx === 0 ? "/videos/review-ella.webm" : "/videos/review-marcus.webm"))
          }));
        }

        return {
          companyInfo: { ...DEFAULT_COMPANY_INFO, ...(parsed.companyInfo || {}) },
          teamMembers: teamList,
          services: parsed.services || DEFAULT_SERVICES,
          projects: projectList,
          testimonials: testList,
          videoReviews: videoReviewsList,
          faqs: parsed.faqs || DEFAULT_FAQS,
          techStack: parsed.techStack || DEFAULT_TECH_STACK,
          trustedClients: parsed.trustedClients || DEFAULT_TRUSTED_CLIENTS
        };
      }
    } catch (err) {
      console.error("Error reading localStorage CMS data:", err);
    }
    return {
      companyInfo: DEFAULT_COMPANY_INFO,
      teamMembers: DEFAULT_TEAM_MEMBERS,
      services: DEFAULT_SERVICES,
      projects: DEFAULT_PROJECTS,
      testimonials: DEFAULT_TESTIMONIALS,
      videoReviews: DEFAULT_VIDEO_REVIEWS,
      faqs: DEFAULT_FAQS,
      techStack: DEFAULT_TECH_STACK,
      trustedClients: DEFAULT_TRUSTED_CLIENTS
    };
  });

  // Theme Settings
  const [theme, setTheme] = useState(() => {
    try {
      const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme) {
        return { ...DEFAULT_THEME, ...JSON.parse(savedTheme) };
      }
    } catch (err) {
      console.error("Error loading theme settings:", err);
    }
    return DEFAULT_THEME;
  });

  // Admin Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem(AUTH_STORAGE_KEY) === "true";
  });

  const [adminCreds, setAdminCreds] = useState(() => {
    try {
      const savedCreds = localStorage.getItem(CREDS_STORAGE_KEY);
      if (savedCreds) {
        return JSON.parse(savedCreds);
      }
    } catch (err) {
      console.error("Error loading admin credentials:", err);
    }
    return DEFAULT_CREDS;
  });

  // Real-Time Visitor Logs
  const [visitorLogs, setVisitorLogs] = useState(() => {
    try {
      const savedLogs = localStorage.getItem(VISITOR_STORAGE_KEY);
      if (savedLogs) {
        return JSON.parse(savedLogs);
      }
    } catch (e) {
      console.error("Error loading visitor logs:", e);
    }
    return DEFAULT_VISITOR_LOGS;
  });

  const addVisitorLog = (newLog) => {
    setVisitorLogs((prev) => {
      // Prevent rapid spam duplicates from same IP & route within 8 seconds
      if (prev && prev.length > 0) {
        const top = prev[0];
        const diff = Date.now() - new Date(top.timestamp).getTime();
        if (top.ip === newLog.ip && top.path === newLog.path && diff < 8000) {
          return prev;
        }
      }
      const updated = [newLog, ...(prev || [])].slice(0, 100);
      try {
        localStorage.setItem(VISITOR_STORAGE_KEY, JSON.stringify(updated));
      } catch (err) {
        console.error("Failed to persist visitor log:", err);
      }
      return updated;
    });
  };

  const clearVisitorLogs = () => {
    setVisitorLogs([]);
    try {
      localStorage.removeItem(VISITOR_STORAGE_KEY);
    } catch (err) {
      console.error("Failed to clear visitor logs:", err);
    }
  };

  const simulateVisitorLog = () => {
    const sampleIps = [
      { ip: "142.250.190.46", city: "San Francisco", country: "United States", countryCode: "US" },
      { ip: "185.199.108.153", city: "London", country: "United Kingdom", countryCode: "GB" },
      { ip: "182.185.160.22", city: "Lahore", country: "Pakistan", countryCode: "PK" },
      { ip: "94.200.22.10", city: "Dubai", country: "United Arab Emirates", countryCode: "AE" },
      { ip: "84.17.45.92", city: "Frankfurt", country: "Germany", countryCode: "DE" },
      { ip: "111.92.128.5", city: "Islamabad", country: "Pakistan", countryCode: "PK" },
      { ip: "104.28.19.74", city: "Toronto", country: "Canada", countryCode: "CA" }
    ];
    const samplePaths = ["/", "/team", "/services", "/portfolio", "/contact", "/about"];
    const sampleReferrers = [
      "https://www.google.com/search?q=vrankly+seo+aeo",
      "https://www.linkedin.com/company/vrankly",
      "https://twitter.com/faizancheena",
      "Direct / Bookmark",
      "https://www.facebook.com/ads"
    ];
    const sampleDevices = [
      { device: "Desktop", browser: "Chrome", os: "Windows" },
      { device: "Desktop", browser: "Safari", os: "macOS" },
      { device: "Mobile", browser: "Chrome", os: "Android" },
      { device: "Mobile", browser: "Safari", os: "iOS" }
    ];

    const pickGeo = sampleIps[Math.floor(Math.random() * sampleIps.length)];
    const pickPath = samplePaths[Math.floor(Math.random() * samplePaths.length)];
    const pickRef = sampleReferrers[Math.floor(Math.random() * sampleReferrers.length)];
    const pickDev = sampleDevices[Math.floor(Math.random() * sampleDevices.length)];

    const sim = {
      id: "sim-" + Date.now() + "-" + Math.random().toString(36).substring(2, 6),
      ip: pickGeo.ip,
      city: pickGeo.city,
      country: pickGeo.country,
      countryCode: pickGeo.countryCode,
      path: pickPath,
      fullUrl: "http://localhost:5173/#" + pickPath,
      referrer: pickRef,
      device: pickDev.device,
      browser: pickDev.browser,
      os: pickDev.os,
      timestamp: new Date().toISOString()
    };
    addVisitorLog(sim);
    return sim;
  };

  // Apply dynamic theme CSS variables on load and change
  useEffect(() => {
    try {
      const root = document.documentElement;
      root.style.setProperty("--cyan", theme.primaryAccent);
      root.style.setProperty("--purple", theme.secondaryAccent);
      root.style.setProperty("--emerald", theme.tertiaryAccent);
      root.style.setProperty("--bg-primary", theme.bgPrimary);
      root.style.setProperty("--bg-secondary", theme.bgSecondary);
      
      const brandGradient = `linear-gradient(135deg, ${theme.primaryAccent} 0%, #3b82f6 50%, ${theme.secondaryAccent} 100%)`;
      root.style.setProperty("--gradient-brand", brandGradient);

      localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(theme));
    } catch (err) {
      console.error("Failed to apply theme variables:", err);
    }
  }, [theme]);

  // Hydrate stored video files from IndexedDB on startup
  useEffect(() => {
    let isCancelled = false;
    async function hydrateVideos() {
      if (!data.videoReviews || data.videoReviews.length === 0) return;
      let hasHydrated = false;
      const hydrated = await Promise.all(
        data.videoReviews.map(async (v, vIdx) => {
          if (v.isIndexedDB) return v;
          const blob = await retrieveVideoFile(`review_${v.id || vIdx}`);
          if (blob) {
            hasHydrated = true;
            return {
              ...v,
              videoUrl: URL.createObjectURL(blob),
              isIndexedDB: true
            };
          }
          return v;
        })
      );
      if (hasHydrated && !isCancelled) {
        setData((prev) => ({ ...prev, videoReviews: hydrated }));
      }
    }
    hydrateVideos();
    return () => {
      isCancelled = true;
    };
  }, [data.videoReviews]);

  // Save CMS data whenever it changes
  const saveAllData = (updatedData) => {
    setData(updatedData);
    try {
      // Avoid saving huge blob: or long data: URIs in localStorage to prevent QuotaExceededError
      const sanitized = {
        ...updatedData,
        videoReviews: (updatedData.videoReviews || []).map((v) => {
          if (v.videoUrl && (v.videoUrl.startsWith("blob:") || (v.videoUrl.startsWith("data:") && v.videoUrl.length > 500))) {
            return { ...v, videoUrl: "" };
          }
          return v;
        })
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sanitized));
    } catch (err) {
      console.error("Failed to save to localStorage:", err);
    }
  };

  // Auth methods
  const login = (email, password) => {
    if (
      email.trim().toLowerCase() === adminCreds.email.toLowerCase() &&
      password === adminCreds.password
    ) {
      setIsAuthenticated(true);
      localStorage.setItem(AUTH_STORAGE_KEY, "true");
      return { success: true };
    }
    return { success: false, error: "Invalid username or password" };
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  const updateCreds = (newEmail, newPassword) => {
    const updated = {
      email: newEmail.trim() || adminCreds.email,
      password: newPassword || adminCreds.password
    };
    setAdminCreds(updated);
    localStorage.setItem(CREDS_STORAGE_KEY, JSON.stringify(updated));
  };

  // CMS Update Helpers
  const updateCompanyInfo = (newInfo) => {
    const updated = { ...data, companyInfo: { ...data.companyInfo, ...newInfo } };
    saveAllData(updated);
  };

  const updateTeamMembers = (newTeam) => {
    const updated = { ...data, teamMembers: newTeam };
    saveAllData(updated);
  };

  const addTeamMember = (member) => {
    const newId = member.name.toLowerCase().replace(/\s+/g, "-") + "-" + Date.now().toString().slice(-4);
    const newMember = { ...member, id: newId };
    const updated = { ...data, teamMembers: [...data.teamMembers, newMember] };
    saveAllData(updated);
  };

  const deleteTeamMember = (id) => {
    const updated = {
      ...data,
      teamMembers: data.teamMembers.filter((m) => m.id !== id)
    };
    saveAllData(updated);
  };

  const updateServices = (newServices) => {
    const updated = { ...data, services: newServices };
    saveAllData(updated);
  };

  const updateProjects = (newProjects) => {
    const updated = { ...data, projects: newProjects };
    saveAllData(updated);
  };

  const updateTestimonials = (newTestimonials) => {
    const updated = { ...data, testimonials: newTestimonials };
    saveAllData(updated);
  };

  const addTestimonial = (testimonial) => {
    const newTestimonial = {
      id: Date.now().toString(),
      rating: 5,
      ...testimonial
    };
    const updated = { ...data, testimonials: [newTestimonial, ...data.testimonials] };
    saveAllData(updated);
  };

  const deleteTestimonial = (indexOrId) => {
    const updated = {
      ...data,
      testimonials: data.testimonials.filter((t, idx) => {
        if (typeof indexOrId === "number") return idx !== indexOrId;
        return t.id ? t.id !== indexOrId : idx !== Number(indexOrId);
      })
    };
    saveAllData(updated);
  };

  const updateVideoReviews = (newVideoReviews) => {
    const updated = { ...data, videoReviews: newVideoReviews };
    saveAllData(updated);
  };

  const updateSingleVideoReview = (id, updatedFields) => {
    const currentList = data.videoReviews || DEFAULT_VIDEO_REVIEWS;
    const updatedList = currentList.map((v) => (v.id === id ? { ...v, ...updatedFields } : v));
    updateVideoReviews(updatedList);
  };

  const updateTechStack = (newTechStack) => {
    const updated = { ...data, techStack: newTechStack };
    saveAllData(updated);
  };

  const addSkill = (newSkill) => {
    const skillObj = {
      name: newSkill.name.trim(),
      category: newSkill.category || "Search",
      level: newSkill.level || "95%"
    };
    const updated = { ...data, techStack: [...data.techStack, skillObj] };
    saveAllData(updated);
  };

  const updateSkill = (index, updatedSkill) => {
    const newStack = [...data.techStack];
    newStack[index] = { ...newStack[index], ...updatedSkill };
    updateTechStack(newStack);
  };

  const deleteSkill = (skillIndexOrName) => {
    const updatedStack = data.techStack.filter((s, idx) => {
      if (typeof skillIndexOrName === "number") return idx !== skillIndexOrName;
      return s.name.toLowerCase() !== skillIndexOrName.toLowerCase();
    });
    updateTechStack(updatedStack);
  };

  const updateTheme = (newThemeSettings) => {
    setTheme((prev) => ({ ...prev, ...newThemeSettings }));
  };

  // Reset to default data
  const resetToDefaults = () => {
    const defaultData = {
      companyInfo: DEFAULT_COMPANY_INFO,
      teamMembers: DEFAULT_TEAM_MEMBERS,
      services: DEFAULT_SERVICES,
      projects: DEFAULT_PROJECTS,
      testimonials: DEFAULT_TESTIMONIALS,
      videoReviews: DEFAULT_VIDEO_REVIEWS,
      faqs: DEFAULT_FAQS,
      techStack: DEFAULT_TECH_STACK,
      trustedClients: DEFAULT_TRUSTED_CLIENTS
    };
    setData(defaultData);
    setTheme(DEFAULT_THEME);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(THEME_STORAGE_KEY);
  };

  // Export JSON backup
  const exportBackupJSON = () => {
    const exportObj = {
      cmsData: data,
      themeSettings: theme,
      exportedAt: new Date().toISOString()
    };
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(exportObj, null, 2)
    )}`;
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", jsonString);
    downloadAnchor.setAttribute("download", `vrankly-cms-backup-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Import JSON backup
  const importBackupJSON = (jsonString) => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.cmsData) {
        saveAllData(parsed.cmsData);
      }
      if (parsed.themeSettings) {
        setTheme(parsed.themeSettings);
      }
      return { success: true };
    } catch (err) {
      console.error("Failed to parse imported JSON:", err);
      return { success: false, error: err.message };
    }
  };

  return (
    <PortfolioContext.Provider
      value={{
        companyInfo: data.companyInfo,
        teamMembers: data.teamMembers,
        services: data.services,
        projects: data.projects,
        testimonials: data.testimonials,
        faqs: data.faqs,
        techStack: data.techStack,
        trustedClients: data.trustedClients,
        theme,
        isAuthenticated,
        adminCreds,
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
        videoReviews: data.videoReviews || DEFAULT_VIDEO_REVIEWS,
        updateVideoReviews,
        updateSingleVideoReview,
        storeVideoFile,
        retrieveVideoFile,
        updateTechStack,
        addSkill,
        updateSkill,
        deleteSkill,
        updateTheme,
        resetToDefaults,
        exportBackupJSON,
        importBackupJSON,
        visitorLogs,
        addVisitorLog,
        clearVisitorLogs,
        simulateVisitorLog
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

// oxlint-disable-next-line react/only-export-components
export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
}
