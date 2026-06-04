import React from "react";
import { FadeUp, SectionLabel } from "./LandingHelpers";

// ─── Pipeline Steps ──────────────────────────────────────────────────────────
export function PipelineSteps() {
  const steps = [
    { num: "01", title: "Paste URL", desc: "Drop your GitHub repository URL into the deploy form.", icon: "⬡" },
    { num: "02", title: "Clone & Upload", desc: "DeployX clones the repo and uploads source files to Cloudflare R2 storage.", icon: "◈" },
    { num: "03", title: "Queue Build", desc: "A build job is enqueued in Redis for async processing by the worker pool.", icon: "⟳" },
    { num: "04", title: "Build & Ship", desc: "Workers run npm install + build, then upload artifacts. Your site goes live.", icon: "▣" },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
      {steps.map((step, i) => (
        <FadeUp key={step.num} delay={i * 0.08}>
          <div
            style={{
              borderRadius: 14,
              border: "1px solid var(--border-card)",
              background: "var(--bg-card)",
              padding: 6,
              minHeight:192
            }}
          >
            <div
              style={{
                borderRadius: 8,
                border: "1px solid var(--border-card)",
                background: "var(--bg-card-inner)",
                padding: 20,
                height: "100%",
                minHeight:176
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 16,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    letterSpacing: "0.2em",
                    color: "var(--primary)",
                    textTransform: "uppercase",
                  }}
                >
                  Step {step.num}
                </span>
                <span style={{ fontSize: 18, color: "var(--text-faint)" }}>{step.icon}</span>
              </div>
              <h3
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  marginBottom: 8,
                  fontFamily: "var(--font-body)",
                  letterSpacing: "-0.02em",
                }}
              >
                {step.title}
              </h3>
              <p style={{ fontSize: 13, lineHeight: 1.65, color: "var(--text-muted)" }}>{step.desc}</p>
            </div>
          </div>
        </FadeUp>
      ))}
    </div>
  );
}

export default function LandingHowItWorks() {
  return (
    <section id="architecture" style={{ position: "relative", padding: "clamp(48px, 6vw, 96px) clamp(20px, 4vw, 48px)" }}>
      <FadeUp>
        <div style={{ marginBottom: 48, display: "flex", flexDirection: "column", gap: 8 }}>
          <SectionLabel text="// How it works" />
          <h2
            style={{
              fontSize: "clamp(24px, 4vw, 36px)",
              fontWeight: 500,
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
              fontFamily: "var(--font-body)",
            }}
          >
            From repo to live site,{" "}
            <span style={{ color: "var(--primary)", fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 400 }}>
              four steps.
            </span>
          </h2>
        </div>
      </FadeUp>
      <PipelineSteps />

      {/* Architecture detail cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 12, marginTop: 48 }}>
        {[
          {
            title: "Deploy Service",
            body: "Receives GitHub repo URLs, clones the repository, uploads source files to R2, and enqueues the deployment job ID into Redis.",
          },
          {
            title: "Build Worker",
            body: "Stateless consumer that reads jobs from Redis, downloads source from R2, runs npm install + npm run build, then uploads build artifacts.",
          },
          {
            title: "Request Handler",
            body: "Reads the deployment ID from the subdomain prefix, fetches the requested file from R2, and streams it back to the browser.",
          },
          {
            title: "Infrastructure",
            body: "AWS EC2 hosts all services. PM2 manages processes. Nginx handles reverse proxy and wildcard subdomain routing to the request handler.",
          },
        ].map((card, i) => (
          <FadeUp key={card.title} delay={i * 0.08}>
            <div
              style={{
                padding: 24,
                border: "1px solid var(--border-card)",
                background: "rgba(255,255,255,0.015)",
                height: "100%",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  color: "var(--primary)",
                  marginBottom: 10,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                }}
              >
                {card.title}
              </div>
              <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.7 }}>{card.body}</p>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
