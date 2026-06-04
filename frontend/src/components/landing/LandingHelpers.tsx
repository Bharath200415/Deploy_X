import React, { useRef } from "react";
import { motion, useInView } from "motion/react";

// ─── Helpers ─────────────────────────────────────────────────────────────────
export function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px", amount: threshold });
  return [ref, inView] as const;
}

export const FadeUp = ({ children, delay = 0, className = "", style = {} }: any) => {
  const [ref, inView] = useReveal();
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
};

// ─── Rail Line (dashed horizontal separator) ─────────────────────────────────
export const RailLine = () => (
  <div
    aria-hidden="true"
    style={{
      position: "relative",
      height: 1,
      width: "100%",
      maxWidth: "100vw",
      marginLeft: "calc(50% - 50vw)",
      marginRight: "calc(50% - 50vw)",
      backgroundImage: "repeating-linear-gradient(to right, var(--rail) 0px, var(--rail) 6px, transparent 6px, transparent 14px)",
      backgroundSize: "100% 1px",
      backgroundRepeat: "no-repeat",
      overflow: "hidden",
    }}
  />
);

// ─── Rail Container (vertical dashed borders on left/right) ──────────────────
export const RailContainer = ({ children, style = {} }: any) => (
  <div
    className="landingmain-container"
    style={{
      position: "relative",
      maxWidth: "76rem",
      margin: "0 auto",
      width: "calc(100% - clamp(1rem, 2vw, 2rem))",
      backgroundImage:
        "repeating-linear-gradient(to bottom, var(--rail) 0px, var(--rail) 6px, transparent 6px, transparent 14px), repeating-linear-gradient(to bottom, var(--rail) 0px, var(--rail) 6px, transparent 6px, transparent 14px)",
      backgroundSize: "1px 100%, 1px 100%",
      backgroundPosition: "left top, right top",
      backgroundRepeat: "no-repeat, no-repeat",
      ...style,
    }}
  >
    {children}
  </div>
);

// ─── Corner Bracket SVG ──────────────────────────────────────────────────────
export const CornerBracket = ({ style, rotate = 0 }: { style: React.CSSProperties; rotate?: number }) => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    style={{
      position: "absolute",
      width: 12,
      height: 12,
      color: "var(--primary-dim)",
      transform: `rotate(${rotate}deg)`,
      ...style,
    }}
  >
    <path d="M1 1h6M1 1v6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square" />
  </svg>
);

// ─── Section Label ───────────────────────────────────────────────────────────
export const SectionLabel = ({ text }: { text: string }) => (
  <span
    style={{
      fontFamily: "var(--font-mono)",
      fontSize: 10,
      letterSpacing: "0.2em",
      color: "rgba(192,132,252,0.7)",
      textTransform: "uppercase",
      display: "block",
      marginBottom: 12,
    }}
  >
    {text}
  </span>
);
