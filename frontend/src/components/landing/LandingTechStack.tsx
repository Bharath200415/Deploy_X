import React from "react";
import { FadeUp, SectionLabel } from "./LandingHelpers";

// ─── Ticker ──────────────────────────────────────────────────────────────────
export function Ticker() {
  const items = [
    "GitHub Deployments",
    "Redis Queue",
    "Cloudflare R2",
    "AWS EC2",
    "Wildcard Subdomains",
    "PM2 Process",
    "Nginx Reverse Proxy",
    "Build Automation",
    "Async Workers",
    "TypeScript",
    "Node.js",
  ];
  const doubled = [...items, ...items];
  return (
    <div
      style={{
        overflow: "hidden",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        padding: "14px 0",
        background: "rgba(255,255,255,0.012)",
        maskImage: "linear-gradient(to right, transparent, #000 15%, #000 85%, transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, #000 15%, #000 85%, transparent)",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 48,
          animation: "ticker 30s linear infinite",
          width: "max-content",
        }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              color: "var(--text-faint)",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span style={{ color: "var(--primary-dim)", fontSize: 6 }}>◆</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function LandingTechStack() {
  return (
    <section style={{ position: "relative", padding: "clamp(48px, 6vw, 96px) clamp(20px, 4vw, 48px)" }}>
      <FadeUp>
        <div style={{ marginBottom: 48, display: "flex", flexDirection: "column", gap: 8 }}>
          <SectionLabel text="// Stack" />
          <h2
            style={{
              fontSize: "clamp(24px, 4vw, 36px)",
              fontWeight: 500,
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
              fontFamily: "var(--font-body)",
            }}
          >
            Built on battle-tested tech.
          </h2>
        </div>
      </FadeUp>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))",
          gap: 16,
        }}
      >
        {[
          { name: "React", role: "Frontend UI" },
          { name: "TypeScript", role: "Type safety" },
          { name: "Node.js", role: "Backend services" },
          { name: "Redis", role: "Job queue" },
          { name: "AWS EC2", role: "Compute" },
          { name: "Nginx", role: "Reverse proxy" },
          { name: "Cloudflare R2", role: "Object storage" },
          { name: "PM2", role: "Process manager" },
        ].map((tech, i) => (
          <FadeUp key={tech.name} delay={i * 0.05}>
            <div
              style={{
                borderRadius: 14,
                border: "1px solid var(--border-card)",
                background: "var(--bg-card)",
                padding: 8,
                transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--primary-dim)";
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 12px 24px -10px var(--primary-glow)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border-card)";
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div
                style={{
                  borderRadius: 8,
                  border: "1px solid var(--border-card)",
                  background: "var(--bg-card-inner)",
                  padding: "24px 16px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 16,
                    fontWeight: 600,
                    color: "var(--text-primary)",
                    marginBottom: 6,
                  }}
                >
                  {tech.name}
                </div>
                <div style={{ fontSize: 13, color: "var(--text-muted)", fontFamily: "var(--font-body)" }}>{tech.role}</div>
              </div>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
