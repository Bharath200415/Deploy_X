import React from "react";
import { motion } from "motion/react";
import { useReveal, FadeUp, SectionLabel } from "./LandingHelpers";

// ─── Comparison Card (Versus style) ──────────────────────────────────────────
export function ComparisonCard({ versus, criticism, deployx, delay = 0 }: any) {
  const [ref, inView] = useReveal();
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{
        borderRadius: 14,
        border: "1px solid var(--border-card)",
        background: "var(--bg-card)",
        padding: 6,
        backdropFilter: "blur(4px)",
      }}
    >
      <div
        style={{
          display: "grid",
          overflow: "hidden",
          borderRadius: 8,
          border: "1px solid var(--border-card)",
          background: "var(--bg-card-inner)",
        }}
      >
        {/* Top half: versus */}
        <div style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", padding: 20 }}>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: "0.24em",
              color: "var(--text-faint)",
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            Versus {versus}
          </p>
          <p style={{ fontSize: 13, lineHeight: 1.65, color: "var(--text-muted)" }}>{criticism}</p>
        </div>
        {/* Bottom half: DeployX */}
        <div style={{ background: "var(--primary-glow)", padding: 20 }}>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: "0.24em",
              color: "var(--primary)",
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            DeployX
          </p>
          <p style={{ fontSize: 14, lineHeight: 1.65, fontWeight: 500, color: "var(--text-primary)" }}>{deployx}</p>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Comparison Table ────────────────────────────────────────────────────────
export function ComparisonTable() {
  const [ref, inView] = useReveal(0.1);
  const rows = [
    { feature: "One-click GitHub deploy", deployx: true, manual: false, others: "partial" },
    { feature: "Automated build pipeline", deployx: true, manual: false, others: true },
    { feature: "Unique subdomain per deploy", deployx: true, manual: false, others: true },
    { feature: "Queue-based async processing", deployx: true, manual: false, others: "partial" },
    { feature: "Cloudflare R2 artifact storage", deployx: true, manual: false, others: false },
    { feature: "Horizontally scalable workers", deployx: true, manual: false, others: "partial" },
    { feature: "Custom domain ready", deployx: true, manual: true, others: true },
  ];

  const CellIcon = ({ value }: { value: boolean | string }) => {
    if (value === true)
      return (
        <svg viewBox="0 0 24 24" fill="var(--primary)" style={{ width: 16, height: 16, margin: "0 auto", display: "block" }}>
          <path d="M4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12ZM12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM17.4571 9.45711L16.0429 8.04289L11 13.0858L8.20711 10.2929L6.79289 11.7071L11 15.9142L17.4571 9.45711Z" />
        </svg>
      );
    if (value === false)
      return (
        <svg viewBox="0 0 24 24" fill="var(--text-faint)" style={{ width: 16, height: 16, margin: "0 auto", display: "block" }}>
          <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 10.5858L14.8284 7.75736L16.2426 9.17157L13.4142 12L16.2426 14.8284L14.8284 16.2426L12 13.4142L9.17157 16.2426L7.75736 14.8284L10.5858 12L7.75736 9.17157L9.17157 7.75736L12 10.5858Z" />
        </svg>
      );
    return (
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 4,
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          letterSpacing: "0.15em",
          color: "var(--text-faint)",
          textTransform: "uppercase",
        }}
      >
        <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 14, height: 14 }}>
          <path d="M5 11V13H19V11H5Z" />
        </svg>
        partial
      </span>
    );
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{
        border: "1px solid var(--border)",
        borderRadius: 8,
        overflow: "hidden",
        background: "rgba(255,255,255,0.02)",
        backdropFilter: "blur(8px)",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(10rem,1.4fr) repeat(3, minmax(4.5rem, 0.55fr))",
          borderBottom: "1px solid var(--border-card)",
          background: "rgba(255,255,255,0.025)",
          textAlign: "center",
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          letterSpacing: "0.2em",
          color: "var(--text-faint)",
          textTransform: "uppercase",
        }}
      >
        <div style={{ padding: "12px 16px", textAlign: "left" }}>Feature</div>
        <div style={{ padding: "12px 12px", background: "var(--primary-glow)", color: "var(--primary)" }}>DeployX</div>
        <div style={{ padding: "12px 12px" }}>Manual</div>
        <div style={{ padding: "12px 12px" }}>Other PaaS</div>
      </div>
      {/* Rows */}
      {rows.map((row, i) => (
        <motion.div
          key={row.feature}
          initial={{ opacity: 0, x: -8 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.35, delay: 0.12 + i * 0.05 }}
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(10rem,1.4fr) repeat(3, minmax(4.5rem, 0.55fr))",
            borderBottom: i < rows.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
          }}
        >
          <div style={{ padding: "12px 16px", fontSize: 13, fontWeight: 500, color: "var(--text-secondary)" }}>{row.feature}</div>
          <div style={{ padding: "12px 12px", textAlign: "center", background: "rgba(192,132,252,0.03)" }}>
            <CellIcon value={row.deployx} />
          </div>
          <div style={{ padding: "12px 12px", textAlign: "center" }}>
            <CellIcon value={row.manual} />
          </div>
          <div style={{ padding: "12px 12px", textAlign: "center" }}>
            <CellIcon value={row.others} />
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default function LandingComparison() {
  return (
    <section id="comparison" style={{ position: "relative", padding: "clamp(48px, 6vw, 96px) clamp(20px, 4vw, 48px)" }}>
      <FadeUp>
        <div style={{ marginBottom: 40, maxWidth: "4xl", display: "flex", flexDirection: "column", gap: 16 }}>
          <SectionLabel text="// Comparison" />
          <h2
            style={{
              maxWidth: "48rem",
              fontSize: "clamp(24px, 4vw, 40px)",
              fontWeight: 500,
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
              fontFamily: "var(--font-body)",
            }}
          >
            Faster than a design tool, sharper than a manual setup.
          </h2>
          <p
            style={{
              maxWidth: "36rem",
              fontSize: 14,
              lineHeight: 1.8,
              color: "var(--text-muted)",
            }}
          >
            DeployX sits in the narrow space between manual VPS deployment and enterprise-grade PaaS: focused enough to be quick,
            powerful enough to ship production-ready websites.
          </p>
        </div>
      </FadeUp>

      {/* Versus Cards */}
      <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", marginBottom: 24 }}>
        <ComparisonCard
          versus="Manual VPS"
          criticism="Full control, but setting up Nginx, PM2, DNS, and CI/CD from scratch takes hours per project."
          deployx="Paste URL, click deploy, get a live subdomain in under 60 seconds."
          delay={0}
        />
        <ComparisonCard
          versus="Vercel / Netlify"
          criticism="Great platforms, but vendor lock-in and opaque pricing can complicate learning and ownership."
          deployx="Self-hosted, transparent architecture. You own every layer of the stack."
          delay={0.08}
        />
        <ComparisonCard
          versus="Docker + K8s"
          criticism="Powerful for microservices, but overkill for shipping a static React build."
          deployx="Purpose-built for frontend deploys. No Dockerfiles, no YAML, no cluster management."
          delay={0.16}
        />
      </div>

      {/* Feature comparison table */}
      <FadeUp delay={0.1}>
        <ComparisonTable />
      </FadeUp>
    </section>
  );
}
