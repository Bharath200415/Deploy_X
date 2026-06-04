import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import axios from "axios";
import "./landing/landingmain.css";
import LandingNav from "./landing/LandingNav";
import { RailLine, RailContainer, FadeUp, SectionLabel, CornerBracket } from "./landing/LandingHelpers";

const BACKEND_UPLOAD_URL = "http://localhost:3000";

export function Landing() {
  const [repoUrl, setRepoUrl] = useState("");
  const [uploadId, setUploadId] = useState("");
  const [uploading, setUploading] = useState(false);
  const [deployed, setDeployed] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const intervalRef = useRef<any>(null);
  const terminalScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.classList.add("landing-main-active");

    // Inject Newsreader display font dynamically to avoid global layout shift
    const fontLink = document.createElement("link");
    fontLink.rel = "stylesheet";
    fontLink.href =
      "https://fonts.googleapis.com/css2?family=Newsreader:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=IBM+Plex+Mono:wght@300;400;500;600&family=Sora:wght@300;400;500;600&display=swap";
    document.head.appendChild(fontLink);

    return () => {
      document.body.classList.remove("landing-main-active");
      document.head.removeChild(fontLink);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Poll status
  useEffect(() => {
    if (!uploadId || deployed) return;

    const interval = setInterval(async () => {
      try {
        const response = await axios.get(`${BACKEND_UPLOAD_URL}/status?id=${uploadId}`);
        if (response.data.status === "deployed") {
          clearInterval(interval);
          setDeployed(true);
        }
      } catch (err) {
        console.error("Error checking status:", err);
      }
    }, 3000);
    intervalRef.current = interval;

    return () => clearInterval(interval);
  }, [uploadId, deployed]);

  // Poll logs
  useEffect(() => {
    if (!uploadId || deployed) return;

    const interval = setInterval(async () => {
      try {
        const response = await axios.get(`${BACKEND_UPLOAD_URL}/logs?id=${uploadId}`);
        if (response.data.logs) {
          setLogs(response.data.logs);
        }
      } catch (err) {
        console.error("Error fetching logs:", err);
      }
    }, 1200);

    return () => clearInterval(interval);
  }, [uploadId, deployed]);

  // Scroll to bottom when logs update
  useEffect(() => {
    if (terminalScrollRef.current) {
      terminalScrollRef.current.scrollTop = terminalScrollRef.current.scrollHeight;
    }
  }, [logs]);

  const handleDeploy = async () => {
    if (!repoUrl.trim()) return;
    setUploading(true);
    setDeployed(false);
    setUploadId("");
    setLogs([]);

    try {
      const res = await axios.post(`${BACKEND_UPLOAD_URL}/deploy`, {
        repoUrl: repoUrl,
      });
      const id = res.data.id;
      setUploadId(id);
      setUploading(false);
    } catch (err) {
      console.error("Deployment request failed:", err);
      setUploading(false);
    }
  };

  return (
    <div className="landingmain-container" style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--text-primary)", display: "flex", flexDirection: "column" }}>
      <LandingNav />

      {/* ═══ Blurred rail line under nav ═══ */}
      <div style={{ opacity: 0.72, filter: "blur(14px)", transform: "translateY(18px)" }}>
        <RailLine />
      </div>

      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px" }}>
        <RailContainer style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", padding: "40px 0" }}>
          <div 
            style={{ 
              display: "grid", 
              gridTemplateColumns: (uploading || uploadId) ? "repeat(auto-fit, minmax(320px, 1fr))" : "1fr", 
              gap: 40, 
              width: "100%", 
              maxWidth: (uploading || uploadId) ? "1080px" : "480px",
              transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
              margin: "0 auto",
              position: "relative", 
              zIndex: 1 
            }}
          >
            {/* Left Column: Form & Success Elements */}
            <div style={{ display: "flex", flexDirection: "column", gap: 24, width: "100%" }}>
              <FadeUp>
                <div style={{ textAlign: "center", marginBottom: 32 }}>
                  <SectionLabel text="// Pipeline" />
                  <h1 style={{ fontFamily: "var(--font-body)", fontSize: "28px", fontWeight: 500, letterSpacing: "-0.02em", color: "var(--text-primary)" }}>
                    Deploy repository
                  </h1>
                </div>

                {/* Deployment Card */}
                <div
                  style={{
                    position: "relative",
                    borderRadius: 20,
                    border: "1px solid var(--border)",
                    background: "var(--bg-card)",
                    padding: 8,
                    backdropFilter: "blur(12px)",
                  }}
                >
                  <CornerBracket style={{ top: -6, left: -6 }} rotate={0} />
                  <CornerBracket style={{ top: -6, right: -6 }} rotate={90} />
                  <CornerBracket style={{ bottom: -6, left: -6 }} rotate={-90} />
                  <CornerBracket style={{ bottom: -6, right: -6 }} rotate={180} />

                  <div
                    style={{
                      borderRadius: 14,
                      border: "1px solid var(--border-card)",
                      background: "var(--bg-card-inner)",
                      padding: "28px 24px",
                    }}
                  >
                    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        <label
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: 11,
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            color: "var(--text-secondary)",
                          }}
                        >
                          GitHub Repository URL
                        </label>
                        <input
                          type="url"
                          onChange={(e) => setRepoUrl(e.target.value)}
                          value={repoUrl}
                          disabled={uploading || uploadId !== ""}
                          placeholder="https://github.com/username/repo"
                          style={{
                            background: "rgba(0, 0, 0, 0.4)",
                            border: "1px solid var(--border)",
                            borderRadius: 8,
                            padding: "12px 14px",
                            color: "var(--text-primary)",
                            fontFamily: "var(--font-mono)",
                            fontSize: 13,
                            outline: "none",
                            transition: "border-color 0.2s, box-shadow 0.2s",
                            width: "100%",
                          }}
                          onFocus={(e) => {
                            e.currentTarget.style.borderColor = "var(--primary-dim)";
                            e.currentTarget.style.boxShadow = "0 0 12px var(--primary-glow)";
                          }}
                          onBlur={(e) => {
                            e.currentTarget.style.borderColor = "var(--border)";
                            e.currentTarget.style.boxShadow = "none";
                          }}
                        />
                      </div>

                      <motion.button
                        whileHover={uploading || uploadId !== "" ? {} : { scale: 1.02 }}
                        whileTap={uploading || uploadId !== "" ? {} : { scale: 0.98 }}
                        onClick={handleDeploy}
                        disabled={uploading || uploadId !== "" || !repoUrl.trim()}
                        style={{
                          background: uploading || uploadId !== "" || !repoUrl.trim() ? "rgba(255,255,255,0.04)" : "var(--primary)",
                          color: uploading || uploadId !== "" || !repoUrl.trim() ? "var(--text-muted)" : "#000",
                          border: "none",
                          borderRadius: 8,
                          padding: "14px",
                          fontSize: 14,
                          fontWeight: 600,
                          fontFamily: "var(--font-body)",
                          cursor: uploading || uploadId !== "" || !repoUrl.trim() ? "not-allowed" : "pointer",
                          transition: "background 0.2s, color 0.2s",
                          width: "100%",
                        }}
                      >
                        {uploading ? "Uploading code..." : uploadId && !deployed ? "Deploying app..." : deployed ? "Deployed" : "Deploy Now"}
                      </motion.button>
                    </div>
                  </div>
                </div>
              </FadeUp>

              {/* Success Card */}
              <AnimatePresence>
                {deployed && (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div
                      style={{
                        position: "relative",
                        borderRadius: 20,
                        border: "1px solid var(--primary-dim)",
                        background: "rgba(192,132,252,0.02)",
                        padding: 8,
                        backdropFilter: "blur(12px)",
                      }}
                    >
                      <CornerBracket style={{ top: -6, left: -6 }} rotate={0} />
                      <CornerBracket style={{ top: -6, right: -6 }} rotate={90} />
                      <CornerBracket style={{ bottom: -6, left: -6 }} rotate={-90} />
                      <CornerBracket style={{ bottom: -6, right: -6 }} rotate={180} />

                      <div
                        style={{
                          borderRadius: 14,
                          border: "1px solid rgba(192,132,252,0.15)",
                          background: "var(--bg-card-inner)",
                          padding: "24px",
                        }}
                      >
                        <h2
                          style={{
                            fontSize: 18,
                            fontWeight: 500,
                            color: "var(--text-primary)",
                            marginBottom: 8,
                            fontFamily: "var(--font-body)",
                          }}
                        >
                          Deployment Success
                        </h2>
                        <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 20 }}>
                          Your website has been deployed successfully to the cloud.
                        </p>

                        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                            <label
                              style={{
                                fontFamily: "var(--font-mono)",
                                fontSize: 10,
                                color: "var(--text-muted)",
                              }}
                            >
                              Dev Sandbox URL
                            </label>
                            <input
                              readOnly
                              type="url"
                              value={`http://${uploadId}.dev.100xdevs.com:3001/index.html`}
                              onClick={(e) => e.currentTarget.select()}
                              style={{
                                background: "rgba(0, 0, 0, 0.4)",
                                border: "1px solid var(--border)",
                                borderRadius: 6,
                                padding: "10px",
                                color: "var(--text-secondary)",
                                fontFamily: "var(--font-mono)",
                                fontSize: 12,
                                outline: "none",
                                cursor: "pointer",
                                width: "100%",
                              }}
                            />
                          </div>

                          <motion.a
                            href={`http://${uploadId}.bharath.codes/index.html`}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            style={{
                              display: "block",
                              textAlign: "center",
                              background: "var(--primary)",
                              color: "#000",
                              border: "none",
                              borderRadius: 8,
                              padding: "12px",
                              fontSize: 13,
                              fontWeight: 600,
                              fontFamily: "var(--font-body)",
                              textDecoration: "none",
                              transition: "background 0.2s",
                            }}
                          >
                            Visit Production Website →
                          </motion.a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right Column: Live Terminal logs */}
            <AnimatePresence>
              {(uploading || uploadId !== "") && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.5 }}
                  style={{ display: "flex", flexDirection: "column", gap: 16 }}
                >
                  <div style={{ textAlign: "center", marginBottom: 16 }}>
                    <SectionLabel text="// Build Console" />
                    <h2 style={{ fontFamily: "var(--font-body)", fontSize: "20px", fontWeight: 500, color: "var(--text-primary)" }}>
                      Live deployment logs
                    </h2>
                  </div>

                  <div
                    style={{
                      position: "relative",
                      borderRadius: 20,
                      border: "1px solid var(--border)",
                      background: "var(--bg-card)",
                      padding: 8,
                      backdropFilter: "blur(12px)",
                    }}
                  >
                    <CornerBracket style={{ top: -6, left: -6 }} rotate={0} />
                    <CornerBracket style={{ top: -6, right: -6 }} rotate={90} />
                    <CornerBracket style={{ bottom: -6, left: -6 }} rotate={-90} />
                    <CornerBracket style={{ bottom: -6, right: -6 }} rotate={180} />

                    <div
                      style={{
                        borderRadius: 14,
                        border: "1px solid var(--border-card)",
                        background: "var(--bg-card-inner)",
                        overflow: "hidden",
                        display: "flex",
                        flexDirection: "column",
                        height: "440px",
                      }}
                    >
                      {/* Terminal header */}
                      <div
                        style={{
                          borderBottom: "1px solid rgba(255,255,255,0.05)",
                          background: "rgba(255,255,255,0.015)",
                          padding: "12px 18px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          flexShrink: 0,
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <span 
                            style={{ 
                              width: 8, 
                              height: 8, 
                              borderRadius: "50%", 
                              background: deployed ? "var(--green)" : "var(--primary)",
                              boxShadow: deployed ? "none" : "0 0 8px var(--primary)",
                            }} 
                          />
                          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-primary)" }}>
                            {deployed ? "build:success" : "build:active"}
                          </span>
                        </div>
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.15em", color: "var(--text-faint)", textTransform: "uppercase" }}>
                          terminal
                        </span>
                      </div>

                      {/* Terminal scroll area */}
                      <div
                        ref={terminalScrollRef}
                        style={{
                          padding: "20px 18px",
                          overflowY: "auto",
                          flex: 1,
                          display: "flex",
                          flexDirection: "column",
                          gap: 6,
                          background: "rgba(0,0,0,0.3)",
                        }}
                      >
                        {/* Initial system lines */}
                        <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-muted)", display: "flex", gap: 8 }}>
                          <span style={{ color: "var(--primary)" }}>$</span>
                          <span>deployx init --repo={repoUrl}</span>
                        </div>
                        
                        {logs.map((line, i) => {
                          let color = "var(--text-secondary)";
                          if (line.startsWith("✖") || line.toLowerCase().includes("failed") || line.toLowerCase().includes("error")) {
                            color = "#ef4444";
                          } else if (line.startsWith("✓") || line.toLowerCase().includes("success")) {
                            color = "var(--green)";
                          } else if (line.startsWith("✦")) {
                            color = "var(--primary)";
                          } else if (line.includes("[install]")) {
                            color = "rgba(250,250,250,0.5)";
                          } else if (line.includes("[build]")) {
                            color = "var(--text-primary)";
                          } else if (line.includes("stderr") || line.includes("-err")) {
                            color = "#f59e0b"; // warning orange
                          }
                          
                          return (
                            <div key={i} style={{ fontFamily: "var(--font-mono)", fontSize: 12.5, color, wordBreak: "break-all", lineHeight: 1.5 }}>
                              {line}
                            </div>
                          );
                        })}

                        {/* Blinking block cursor when active */}
                        {!deployed && (
                          <span
                            style={{
                              fontFamily: "var(--font-mono)",
                              fontSize: 12.5,
                              color: "var(--primary)",
                              animation: "blink 1s infinite",
                              display: "inline-block",
                              width: "8px",
                            }}
                          >
                            ▌
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </RailContainer>
      </div>
    </div>
  );
}