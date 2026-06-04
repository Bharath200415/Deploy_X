import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { useReveal, CornerBracket } from "./LandingHelpers";

// ─── Terminal mock ────────────────────────────────────────────────────────────
export function Terminal() {
  const lines = [
    { text: "$ deployx deploy --repo github.com/user/app", color: "var(--text-muted)" },
    { text: "  ✦ Cloning repository...", color: "var(--primary)" },
    { text: "  ✦ Uploading to Cloudflare R2...", color: "var(--primary)" },
    { text: "  ✦ Queuing build job [id: a7f3c9]", color: "#a78bfa" },
    { text: "  ✦ Worker picked up job", color: "#a78bfa" },
    { text: "  ✦ Running npm install... done", color: "#22d3ee" },
    { text: "  ✦ Running npm run build... done", color: "#22d3ee" },
    { text: "  ✓ Deployed to a7f3c9.bharath.codes", color: "var(--green)" },
    { text: "  ↗ https://a7f3c9.bharath.codes", color: "var(--green)" },
  ];

  const [visibleLines, setVisibleLines] = useState<typeof lines>([]);
  const started = useRef(false);
  const [ref, inView] = useReveal(0.3);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    lines.forEach((line, i) => {
      setTimeout(() => {
        setVisibleLines((prev) => [...prev, line]);
      }, i * 320 + 200);
    });
  }, [inView]);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      {/* Outer frame with corner brackets */}
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

        {/* Inner frame */}
        <div
          style={{
            borderRadius: 14,
            border: "1px solid var(--border-card)",
            overflow: "hidden",
            background: "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.015) 100%)",
          }}
        >
          {/* Title bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
              background: "rgba(255,255,255,0.015)",
              padding: "10px 16px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--primary-dim)" }} />
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--text-faint)" }} />
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
            </div>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.15em", color: "var(--text-faint)", textTransform: "uppercase" }}>
              deployx
            </span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-faint)" }}>⌘ K</span>
          </div>

          {/* Terminal content */}
          <div style={{ padding: "clamp(12px, 3vw, 20px) clamp(12px, 3vw, 20px) clamp(16px, 3vw, 28px)", minHeight: "clamp(180px, 30vw, 260px)" }}>
            {/* Grid background overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
                backgroundImage:
                  "linear-gradient(to right, rgba(192,132,252,0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(192,132,252,0.02) 1px, transparent 1px)",
                backgroundSize: "42px 42px",
              }}
            />
            {visibleLines.map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25 }}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "clamp(10px, 2vw, 12.5px)",
                  color: line.color,
                  lineHeight: 2.1,
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {line.text}
              </motion.p>
            ))}
            {visibleLines.length < lines.length && (
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "clamp(10px, 2vw, 12.5px)",
                  color: "var(--text-muted)",
                  animation: "blink 1s infinite",
                }}
              >
                ▌
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LandingHero() {
  return (
    <section
      style={{
        position: "relative",
        padding: "clamp(56px, 8vw, 80px) clamp(20px, 4vw, 48px) clamp(56px, 8vw, 80px)",
      }}
    >
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 32,
            textAlign: "center",
            maxWidth: "100%",
          }}
        >
          {/* Badge */}
          <motion.a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              borderRadius: 100,
              border: "1px solid var(--border)",
              background: "rgba(255,255,255,0.02)",
              padding: "5px 14px",
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              textDecoration: "none",
              color: "var(--text-secondary)",
              backdropFilter: "blur(4px)",
              transition: "border-color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--border-hover)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "var(--green)",
                animation: "pulse-dot 2s ease infinite",
              }}
            />
            <span style={{ color: "var(--text-muted)" }}>Live on bharath.codes</span>
          </motion.a>

          {/* Heading */}
          <div style={{ maxWidth: "5xl" }}>
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 500,
                fontSize: "clamp(32px, 7vw, 68px)",
                lineHeight: 1.06,
                letterSpacing: "-0.03em",
                textWrap: "balance",
              }}
            >
              Deploy Frontend Apps
              <br />
              <span style={{ position: "relative", display: "inline-block", whiteSpace: "nowrap" }}>
                <span
                  style={{
                    background: "linear-gradient(to bottom right, var(--text-primary), rgba(250,250,250,0.6))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  in{" "}
                </span>
                <span style={{ color: "var(--primary)" }}>Seconds</span>
                {/* Underline SVG */}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 320 12"
                  style={{
                    position: "absolute",
                    bottom: -14,
                    left: "64%",
                    height: 12,
                    width: "92%",
                    transform: "translateX(-50%)",
                    color: "var(--primary)",
                  }}
                  fill="none"
                >
                  <path
                    d="M2 8 C 80 2, 240 2, 318 8"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    style={{
                      strokeDasharray: 400,
                      strokeDashoffset: 400,
                      animation: "landing-draw 1.4s ease 0.9s forwards",
                    }}
                  />
                </svg>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{
                marginTop: 28,
                maxWidth: 540,
                margin: "28px auto 0",
                fontSize: "clamp(14px, 1.6vw, 15px)",
                lineHeight: 1.7,
                textWrap: "balance",
                color: "var(--text-muted)",
              }}
            >
              Paste your GitHub repo. DeployX clones, builds, and ships your frontend to a live URL — fully automated,
              no config, no compromise.
            </motion.p>
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.65 }}
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              width: "100%",
            }}
          >
            <Link
              to="/deploy"
              className="hero-cta-btn"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                borderRadius: 8,
                background: "var(--primary)",
                padding: "12px 24px",
                fontSize: 14,
                fontWeight: 500,
                color: "#000",
                textDecoration: "none",
                fontFamily: "var(--font-body)",
                transition: "opacity 0.2s",
              }}
            >
              Start deploying
              <svg viewBox="0 0 16 16" fill="none" style={{ width: 16, height: 16, transition: "transform 0.2s" }}>
                <path d="M3 8h10m0 0L9 4m4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <motion.a
              href="https://github.com/bharath200415/deploy_X"
              target="_blank"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="hero-cta-btn"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                borderRadius: 8,
                border: "1px solid var(--border)",
                background: "rgba(255,255,255,0.02)",
                padding: "12px 24px",
                fontSize: 14,
                fontWeight: 500,
                color: "var(--text-secondary)",
                textDecoration: "none",
                fontFamily: "var(--font-body)",
                backdropFilter: "blur(4px)",
                transition: "all 0.2s",
              }}
            >
              <svg viewBox="0 0 16 16" fill="none" style={{ width: 14, height: 14, color: "#facc15" }}>
                <path d="M8 1.5 9.8 5.2l4 .6-2.9 2.8.7 4-3.6-1.9-3.6 1.9.7-4-2.9-2.8 4-.6L8 1.5Z" fill="currentColor" />
              </svg>
              Star on GitHub
            </motion.a>
          </motion.div>

          {/* ═══ Terminal Mockup ═══ */}
          <div style={{ width: "100%", maxWidth: "56rem" }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <Terminal />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
