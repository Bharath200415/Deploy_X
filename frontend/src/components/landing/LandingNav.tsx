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
    <div style={{ position: "sticky", top: 0, zIndex: 50, maxWidth: "83rem", margin: "0 auto" }}>
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
          borderBottom: `1px solid ${scrolled || isOpen ? "var(--border)" : "rgba(255,255,255,0.035)"}`,
          background: scrolled || isOpen ? "rgba(9,9,11,0.92)" : "rgba(9,9,11,0.4)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          padding: "0 clamp(20px, 3vw, 48px)",
          transition: "all 0.3s ease",
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
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <rect width="28" height="28" rx="7" fill="var(--primary)" />
              <path
                d="M7 14L11 18L21 8"
                stroke="#000"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
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
              borderRadius: 6,
              border: "1px solid var(--border)",
              padding: "7px 14px",
              fontSize: 12,
              fontWeight: 500,
              color: "var(--text-secondary)",
              textDecoration: "none",
              transition: "all 0.2s",
              fontFamily: "var(--font-body)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--border-hover)";
              e.currentTarget.style.color = "var(--text-primary)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border)";
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
              borderRadius: 6,
              background: "var(--primary)",
              padding: "7px 14px",
              fontSize: 12,
              fontWeight: 500,
              color: "#000",
              textDecoration: "none",
              transition: "opacity 0.2s",
              fontFamily: "var(--font-body)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
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
                  borderRadius: 8,
                  border: "1px solid var(--border)",
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
                  borderRadius: 8,
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
