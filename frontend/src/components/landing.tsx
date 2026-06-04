import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./landing/landingmain.css";
import LandingNav from "./landing/LandingNav";
import { RailLine, RailContainer, FadeUp, SectionLabel, CornerBracket } from "./landing/LandingHelpers";

const BACKEND_UPLOAD_URL = "http://localhost:3000";

export function Landing() {
  const [repoUrl, setRepoUrl] = useState("");
  const [uploadId, setUploadId] = useState("");
  const [uploading, setUploading] = useState(false);
  const [deployed, setDeployed] = useState(false);
  const intervalRef = useRef<any>(null);

  useEffect(() => {
    document.body.classList.add("landing-main-active");

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

  const handleDeploy = async () => {
    if (!repoUrl.trim()) return;
    setUploading(true);
    setDeployed(false);
    setUploadId("");

    try {
      const res = await axios.post(`${BACKEND_UPLOAD_URL}/deploy`, {
        repoUrl: repoUrl,
      });
      const id = res.data.id;
      setUploadId(id);
      setUploading(false);

      const interval = setInterval(async () => {
        try {
          const response = await axios.get(`${BACKEND_UPLOAD_URL}/status?id=${id}`);
          if (response.data.status === "deployed") {
            clearInterval(interval);
            setDeployed(true);
          }
        } catch (err) {
          console.error("Error checking status:", err);
        }
      }, 3000);
      intervalRef.current = interval;
    } catch (err) {
      console.error("Deployment request failed:", err);
      setUploading(false);
    }
  };

  return (
    <div className="landingmain-container" style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--text-primary)", display: "flex", flexDirection: "column" }}>
      <LandingNav />

      <div style={{ opacity: 0.72, filter: "blur(14px)", transform: "translateY(18px)" }}>
        <RailLine />
      </div>

      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "clamp(24px, 6vw, 60px) clamp(12px, 3vw, 20px)" }}>
        <RailContainer style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", padding: "40px 0" }}>
          <div style={{ width: "100%", maxWidth: "min(480px, 100%)", margin: "0 auto", position: "relative", zIndex: 1 }}>
            <FadeUp>
              <div style={{ textAlign: "center", marginBottom: 32 }}>
                <SectionLabel text="// Pipeline" />
                <h1 style={{ fontFamily: "var(--font-body)", fontSize: "clamp(22px, 5vw, 28px)", fontWeight: 500, letterSpacing: "-0.02em", color: "var(--text-primary)" }}>
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
                    padding: "clamp(16px, 4vw, 28px) clamp(14px, 3vw, 24px)",
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
                      }}
                    >
                      {uploading ? "Uploading code..." : uploadId && !deployed ? "Deploying app..." : deployed ? "Deployed" : "Deploy Now"}
                    </motion.button>
                  </div>
                </div>
              </div>
            </FadeUp>

            {/* Console output while building */}
            <AnimatePresence>
              {(uploading || uploadId !== "") && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.5 }}
                  style={{ marginTop: 24 }}
                >
                  <div
                    style={{
                      position: "relative",
                      borderRadius: 16,
                      border: "1px solid var(--border)",
                      background: "var(--bg-card)",
                      padding: 6,
                    }}
                  >
                    <div
                      style={{
                        borderRadius: 10,
                        border: "1px solid var(--border-card)",
                        background: "var(--bg-card-inner)",
                        overflow: "hidden",
                      }}
                    >
                      {/* Terminal header */}
                      <div
                        style={{
                          borderBottom: "1px solid rgba(255,255,255,0.05)",
                          background: "rgba(255,255,255,0.015)",
                          padding: "10px 14px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--primary-dim)" }} />
                          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--text-faint)" }} />
                          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
                        </div>
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.15em", color: "var(--text-faint)", textTransform: "uppercase" }}>
                          status log
                        </span>
                      </div>

                      {/* Terminal lines */}
                      <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 8 }}>
                        <p style={{ fontFamily: "var(--font-mono)", fontSize: "clamp(10px, 2.5vw, 12px)", color: "var(--text-secondary)", wordBreak: "break-all" }}>
                          $ deployx deploy --repo {repoUrl}
                        </p>
                        {uploading && (
                          <p style={{ fontFamily: "var(--font-mono)", fontSize: "clamp(10px, 2.5vw, 12px)", color: "var(--primary-dim)" }}>
                            ✦ Cloned repository & uploading source files...
                          </p>
                        )}
                        {uploadId && (
                          <p style={{ fontFamily: "var(--font-mono)", fontSize: "clamp(10px, 2.5vw, 12px)", color: "var(--primary-dim)" }}>
                            ✦ Code uploaded. Build Job ID: <span style={{ color: "var(--primary)" }}>{uploadId}</span>
                          </p>
                        )}
                        {uploadId && !deployed && (
                          <p style={{ fontFamily: "var(--font-mono)", fontSize: "clamp(10px, 2.5vw, 12px)", color: "#a78bfa" }}>
                            ✦ Enqueued in Redis. Waiting for worker build...
                          </p>
                        )}
                        {deployed && (
                          <>
                            <p style={{ fontFamily: "var(--font-mono)", fontSize: "clamp(10px, 2.5vw, 12px)", color: "var(--green)" }}>
                              ✓ Build finished. Deployed successfully to production!
                            </p>
                            <p style={{ fontFamily: "var(--font-mono)", fontSize: "clamp(10px, 2.5vw, 12px)", color: "var(--green)" }}>
                              ↗ URL: http://{uploadId}.bharath.codes/index.html
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Success Card */}
            <AnimatePresence>
              {deployed && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.5 }}
                  style={{ marginTop: 24 }}
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
                              fontSize: "clamp(10px, 2.5vw, 12px)",
                              outline: "none",
                              cursor: "pointer",
                              width: "100%",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
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
        </RailContainer>
      </div>
    </div>
  );
}