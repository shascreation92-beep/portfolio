import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { usePortfolio } from "../context/PortfolioContext";

export default function VisitorTracker() {
  const location = useLocation();
  const { addVisitorLog } = usePortfolio();
  const lastPathRef = useRef("");

  useEffect(() => {
    // Avoid double logging the exact same path in strict mode
    if (lastPathRef.current === location.pathname) return;
    lastPathRef.current = location.pathname;

    const detectAndLog = async () => {
      // Parse User Agent
      const ua = navigator.userAgent || "";
      let browser = "Chrome";
      if (ua.includes("Firefox")) browser = "Firefox";
      else if (ua.includes("Safari") && !ua.includes("Chrome")) browser = "Safari";
      else if (ua.includes("Edg")) browser = "Edge";
      else if (ua.includes("Opera") || ua.includes("OPR")) browser = "Opera";

      let os = "Windows";
      if (ua.includes("Mac OS") || ua.includes("Macintosh")) os = "macOS";
      else if (ua.includes("Android")) os = "Android";
      else if (ua.includes("iPhone") || ua.includes("iPad")) os = "iOS";
      else if (ua.includes("Linux")) os = "Linux";

      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
      const device = isMobile ? "Mobile" : "Desktop";

      // Detect Referrer
      let referrer = document.referrer ? document.referrer : "Direct / Bookmark";
      try {
        if (referrer && referrer.startsWith("http")) {
          const urlObj = new URL(referrer);
          // If referrer is internal site, mark as Direct / Internal
          if (urlObj.hostname === window.location.hostname) {
            referrer = "Direct / Bookmark";
          }
        }
      } catch {
        // Keep raw referrer string
      }

      // Check session cached IP info to save API calls
      let ipInfo = null;
      try {
        const cached = sessionStorage.getItem("vrankly_visitor_ip_data");
        if (cached) {
          ipInfo = JSON.parse(cached);
        }
      } catch {
        // ignore storage error
      }

      if (!ipInfo) {
        try {
          // Fast Geo IP query
          const res = await fetch("https://ipwho.is/", { 
            signal: typeof AbortSignal !== "undefined" && AbortSignal.timeout ? AbortSignal.timeout(3500) : undefined 
          });
          const data = await res.json();
          if (data && data.success !== false && data.ip) {
            ipInfo = {
              ip: data.ip,
              city: data.city || "Islamabad",
              country: data.country || "Pakistan",
              countryCode: data.country_code || "PK"
            };
            sessionStorage.setItem("vrankly_visitor_ip_data", JSON.stringify(ipInfo));
          }
        } catch {
          // Fallback to secondary IP service
          try {
            const fallbackRes = await fetch("https://api.ipify.org?format=json", { 
              signal: typeof AbortSignal !== "undefined" && AbortSignal.timeout ? AbortSignal.timeout(2500) : undefined 
            });
            const fbData = await fallbackRes.json();
            if (fbData && fbData.ip) {
              ipInfo = {
                ip: fbData.ip,
                city: "Local Region",
                country: "Visitor Location",
                countryCode: "GL"
              };
              sessionStorage.setItem("vrankly_visitor_ip_data", JSON.stringify(ipInfo));
            }
          } catch {
            // Default placeholder if network is fully offline
            ipInfo = {
              ip: "182.185.160.22",
              city: "Lahore",
              country: "Pakistan",
              countryCode: "PK"
            };
          }
        }
      }

      const newLog = {
        id: "vis-" + Date.now() + "-" + Math.random().toString(36).substring(2, 6),
        ip: ipInfo?.ip || "127.0.0.1",
        city: ipInfo?.city || "Local",
        country: ipInfo?.country || "Pakistan",
        countryCode: ipInfo?.countryCode || "PK",
        path: location.pathname || "/",
        fullUrl: window.location.href,
        referrer: referrer,
        device: device,
        browser: browser,
        os: os,
        timestamp: new Date().toISOString()
      };

      if (addVisitorLog) {
        addVisitorLog(newLog);
      }
    };

    detectAndLog();
  }, [location.pathname, addVisitorLog]);

  return null;
}
