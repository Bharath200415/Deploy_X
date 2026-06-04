import React from "react";

export default function LandingFooter() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        padding: "40px clamp(20px, 4vw, 48px)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 16,
        maxWidth: "76rem",
        margin: "0 auto",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <svg width="18" height="18" viewBox="0 0 28 28" fill="none">
          <rect width="28" height="28" rx="7" fill="var(--primary)" />
          <path d="M7 14L11 18L21 8" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span style={{ fontFamily: "var(--font-mono)", fontWeight: 500, fontSize: 14 }}>DeployX</span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-faint)", marginLeft: 16 }}>
          by bharath.codes
        </span>
      </div>
      <div style={{ display: "flex", gap: 24 }}>
        {["GitHub", "Docs", "Architecture", "Contact"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            style={{
              fontSize: 12,
              fontFamily: "var(--font-mono)",
              color: "var(--text-muted)",
              cursor: "pointer",
              transition: "color 0.2s",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
          >
            {item}
          </a>
        ))}
      </div>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-faint)" }}>
        Built with loads of caffeine
      </span>
    </footer>
  );
}
