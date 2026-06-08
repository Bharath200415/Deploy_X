import React from "react";

export default function LandingFooter() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        padding: "40px clamp(16px, 4vw, 48px)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 20,
        maxWidth: "76rem",
        margin: "0 auto",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
<svg width="18" height="18" viewBox="0 0 1000 1000" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="1000" height="1000" rx="118" fill="#C084FC"/>
<path d="M103 543.626C282.622 665.324 335.773 721.493 487.988 832.074C585.02 727.929 621.388 664.154 678.727 543.626C515.04 543.626 549.846 543.626 390.863 543.626C231.881 543.626 262.924 543.626 103 543.626Z" fill="black"/>
<rect width="86.8143" height="63.664" transform="matrix(-1 0 0 1 613.798 462.409)" fill="black"/>
<rect width="86.8143" height="63.664" transform="matrix(-1 0 0 1 515.408 462.409)" fill="black"/>
<rect width="86.8143" height="63.664" transform="matrix(-1 0 0 1 417.019 462.409)" fill="black"/>
<rect width="86.8143" height="63.664" transform="matrix(-1 0 0 1 318.629 462.409)" fill="black"/>
<rect width="86.8143" height="63.664" transform="matrix(-1 0 0 1 220.239 462.409)" fill="black"/>
<rect width="86.8143" height="63.664" transform="matrix(-1 0 0 1 272.329 387.17)" fill="black"/>
<rect width="86.8143" height="63.664" transform="matrix(-1 0 0 1 370.718 387.17)" fill="black"/>
<rect width="86.8143" height="63.664" transform="matrix(-1 0 0 1 324.417 311.932)" fill="black"/>
<rect width="86.8143" height="63.664" transform="matrix(-1 0 0 1 469.107 387.17)" fill="black"/>
<rect width="86.8143" height="63.664" transform="matrix(-1 0 0 1 567.497 387.17)" fill="black"/>
<path d="M884.81 467.427C889.899 471.231 890.196 478.756 885.422 482.949L487.987 832.075L487.752 190.609C487.749 182.374 497.143 177.665 503.739 182.595L884.81 467.427Z" fill="black"/>
<path d="M746.05 483.842L571.758 637.818L571.801 352.848L746.05 483.842Z" fill="#C084FC"/>
</svg>
        <span style={{ fontFamily: "var(--font-mono)", fontWeight: 500, fontSize: 14 }}>DeployX</span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-faint)", marginLeft: 16 }}>
          by <a href="https://bharath.codes" className="hover:underline font-semibold">bharath.codes
</a>        </span>
      </div>
      <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
        {[
          { label: "GitHub", href: "https://github.com/bharath200415/Deploy_X" },
          { label: "Docs", href: "https://github.com/bharath200415/Deploy_X#readme" },
          { label: "Architecture", href: "#architecture" },
          { label: "Contact", href: "https://bharath.codes" }
        ].map((item) => (
          <a
            key={item.label}
            href={item.href}
            target={item.href.startsWith("http") ? "_blank" : undefined}
            rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
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
            {item.label}
          </a>
        ))}
      </div>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-faint)" }}>
        2026 © All rights reserved.
      </span>
    </footer>
  );
}
