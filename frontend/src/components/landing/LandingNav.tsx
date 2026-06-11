import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";

export default function LandingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ position: "sticky", top: 0, zIndex: 50, width: "100%" }}>
      <motion.nav
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        style={{
          position: "relative",
          zIndex: 55,
          display: "flex",
          height: 64,
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          maxWidth: "100%",
          margin: "0 auto",
          borderRadius: 0,
          border: "none",
          borderBottom: scrolled || isOpen ? "1px solid var(--border)" : "1px solid rgba(255,255,255,0.035)",
          background: scrolled || isOpen ? "rgba(9,9,11,0.85)" : "rgba(9,9,11,0.15)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          padding: "0 clamp(20px, 3vw, 48px)",
          transition: "background 0.3s ease, border-color 0.3s ease",
        }}
      >
        {/* Logo */}
        <a
          href="/"
          onClick={() => setIsOpen(false)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.6, rotate: -16 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.5, delay: 0.15, type: "spring" }}
            style={{ display: "inline-flex" }}
          >
            {/* <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <rect width="28" height="28" rx="7" fill="var(--primary)" />
              <path
                d="M7 14L11 18L21 8"
                stroke="#000"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg> */}
            <svg width="32" height="32" viewBox="0 0 1000 1000" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="1000" height="1000" rx="118" fill="#C084FC" />
              <path d="M103 543.626C282.622 665.324 335.773 721.493 487.988 832.074C585.02 727.929 621.388 664.154 678.727 543.626C515.04 543.626 549.846 543.626 390.863 543.626C231.881 543.626 262.924 543.626 103 543.626Z" fill="black" />
              <rect width="86.8143" height="63.664" transform="matrix(-1 0 0 1 613.798 462.409)" fill="black" />
              <rect width="86.8143" height="63.664" transform="matrix(-1 0 0 1 515.408 462.409)" fill="black" />
              <rect width="86.8143" height="63.664" transform="matrix(-1 0 0 1 417.019 462.409)" fill="black" />
              <rect width="86.8143" height="63.664" transform="matrix(-1 0 0 1 318.629 462.409)" fill="black" />
              <rect width="86.8143" height="63.664" transform="matrix(-1 0 0 1 220.239 462.409)" fill="black" />
              <rect width="86.8143" height="63.664" transform="matrix(-1 0 0 1 272.329 387.17)" fill="black" />
              <rect width="86.8143" height="63.664" transform="matrix(-1 0 0 1 370.718 387.17)" fill="black" />
              <rect width="86.8143" height="63.664" transform="matrix(-1 0 0 1 324.417 311.932)" fill="black" />
              <rect width="86.8143" height="63.664" transform="matrix(-1 0 0 1 469.107 387.17)" fill="black" />
              <rect width="86.8143" height="63.664" transform="matrix(-1 0 0 1 567.497 387.17)" fill="black" />
              <path d="M884.81 467.427C889.899 471.231 890.196 478.756 885.422 482.949L487.987 832.075L487.752 190.609C487.749 182.374 497.143 177.665 503.739 182.595L884.81 467.427Z" fill="black" />
              <path d="M746.05 483.842L571.758 637.818L571.801 352.848L746.05 483.842Z" fill="#C084FC" />
            </svg>





          </motion.span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 18,
              fontWeight: 500,
              letterSpacing: "-0.02em",
              color: "var(--text-primary)",
            }}
          >
            DeployX
          </span>
        </a>

        {/* Nav Links (desktop) */}
        <div
          className="desktop-only"
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            alignItems: "center",
            gap: 4,
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            color: "var(--text-muted)",
          }}
        >
          {["Features", "Architecture", "Comparison", "FAQ", "GitHub"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              style={{
                padding: "6px 10px",
                borderRadius: 4,
                color: "inherit",
                textDecoration: "none",
                transition: "all 0.2s",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--primary-subtle)";
                e.currentTarget.style.color = "var(--primary)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "var(--text-muted)";
              }}
            >
              {item}
            </a>
          ))}
        </div>

        {/* CTA Buttons (desktop) */}
        <div className="desktop-only" style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <a
            href="/login"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              border: "none",
              borderRadius: 6,
              boxShadow: "0 32px 64px -16px #0006, 0 16px 32px -8px #0006, 0 8px 16px -4px #0004, 0 4px 8px -2px #0004, 0 -8px 16px -1px #0003, 0 2px 4px -1px #0004, 0 0 0 1px #000, inset 0 0 0 1px #ffffff14, inset 0 1px #fff3",
              padding: "7px 14px",
              fontSize: 12,
              fontWeight: 500,
              color: "var(--text-secondary)",
              textDecoration: "none",
              transition: "all 0.2s",
              fontFamily: "var(--font-body)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--text-primary)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--text-secondary)";
            }}
          >
            Sign in
            <svg viewBox="0 0 16 16" fill="none" style={{ width: 14, height: 14 }}>
              <path d="M3 8h10m0 0L9 4m4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <Link
            to="/deploy"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              border: "none",
              borderRadius: 6,
              boxShadow: "0 32px 64px -16px #0006, 0 16px 32px -8px #0006, 0 8px 16px -4px #0004, 0 4px 8px -2px #0004, 0 -8px 16px -1px #0003, 0 2px 4px -1px #0004, 0 0 0 1px #000, inset 0 0 0 1px #e58efa14, inset 0 1px rgba(200, 153, 248, 0.94)",
              background: "var(--primary)",
              padding: "7px 14px",
              fontSize: 12,
              fontWeight: 500,
              color: "#000",
              textDecoration: "none",
              transition: "all 0.2s ease",
              fontFamily: "var(--font-body)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#ac6ef4";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--primary)";
              e.currentTarget.style.transform = "none";
            }}
          >
            Start deploying
            <svg viewBox="0 0 16 16" fill="none" style={{ width: 14, height: 14 }}>
              <path d="M3 8h10m0 0L9 4m4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        {/* Mobile menu toggle button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="mobile-only"
          style={{
            background: "none",
            border: "none",
            color: "var(--text-primary)",
            cursor: "pointer",
            padding: 8,
            display: "none",
            alignItems: "center",
            justifyContent: "center",
            outline: "none",
          }}
        >
          {isOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="18" x2="20" y2="18" />
            </svg>
          )}
        </button>
      </motion.nav>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "absolute",
              top: 64,
              left: 0,
              right: 0,
              background: "rgba(9,9,11,0.95)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              borderBottom: "1px solid var(--border)",
              padding: "24px 20px",
              display: "flex",
              flexDirection: "column",
              gap: 20,
              zIndex: 49,
              overflow: "hidden",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {["Features", "Architecture", "Comparison", "FAQ", "GitHub"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsOpen(false)}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 14,
                    color: "var(--text-secondary)",
                    textDecoration: "none",
                    padding: "8px 0",
                    borderBottom: "1px solid rgba(255,255,255,0.02)",
                  }}
                >
                  {item}
                </a>
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 8 }}>
              <a
                href="/login"
                onClick={() => setIsOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  border: "none",
                  borderRadius: 6,
                  boxShadow: "0 32px 64px -16px #0006, 0 16px 32px -8px #0006, 0 8px 16px -4px #0004, 0 4px 8px -2px #0004, 0 -8px 16px -1px #0003, 0 2px 4px -1px #0004, 0 0 0 1px #000, inset 0 0 0 1px #ffffff14, inset 0 1px #fff3",
                  padding: "12px",
                  fontSize: 13,
                  fontWeight: 500,
                  color: "var(--text-secondary)",
                  textDecoration: "none",
                  fontFamily: "var(--font-body)",
                }}
              >
                Sign in
                <svg viewBox="0 0 16 16" fill="none" style={{ width: 14, height: 14 }}>
                  <path d="M3 8h10m0 0L9 4m4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <Link
                to="/deploy"
                onClick={() => setIsOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  border: "none",
                  borderRadius: 6,
                  boxShadow: "0 32px 64px -16px #0006, 0 16px 32px -8px #0006, 0 8px 16px -4px #0004, 0 4px 8px -2px #0004, 0 -8px 16px -1px #0003, 0 2px 4px -1px #0004, 0 0 0 1px #000, inset 0 0 0 1px #e58efa14, inset 0 1px rgba(200, 153, 248, 0.94)",
                  background: "var(--primary)",
                  padding: "12px",
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#000",
                  textDecoration: "none",
                  fontFamily: "var(--font-body)",
                }}
              >
                Start deploying
                <svg viewBox="0 0 16 16" fill="none" style={{ width: 14, height: 14 }}>
                  <path d="M3 8h10m0 0L9 4m4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
