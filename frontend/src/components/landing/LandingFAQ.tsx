import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FadeUp, SectionLabel } from "./LandingHelpers";

const faqs = [
  {
    q: "What frontend frameworks does DeployX support?",
    a: "DeployX supports any framework with a standard npm build script — React, Vue, Svelte, Next.js (static export), Vite, and plain HTML. As long as npm run build produces a dist or build folder, DeployX handles it.",
  },
  {
    q: "How does the wildcard subdomain routing work?",
    a: "Nginx on the request handler is configured with a wildcard server_name (*.bharath.codes). When a request arrives, it reads the subdomain prefix as the deployment ID and fetches the corresponding build artifacts from Cloudflare R2.",
  },
  {
    q: "Can I scale the build workers horizontally?",
    a: "Yes — the architecture is designed for horizontal scaling. Multiple worker instances can consume from the same Redis queue simultaneously, processing independent deployment jobs in parallel without contention.",
  },
  {
    q: "Where are build artifacts stored?",
    a: "All build artifacts are uploaded to Cloudflare R2 object storage. The request handler fetches files directly from R2 on each request, serving HTML, CSS, JS, and static assets through Nginx.",
  },
  {
    q: "Is DeployX open source?",
    a: "DeployX is a learning project built to deeply understand distributed systems, cloud infrastructure, and deployment pipelines. The codebase is on GitHub and serves as a portfolio artifact targeting SDE roles.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {faqs.map((faq, i) => {
        const isOpen = open === i;
        return (
          <FadeUp key={i} delay={i * 0.04}>
            <div
              style={{
                borderBottom: "1px solid var(--border)",
                cursor: "pointer",
              }}
              onClick={() => setOpen(isOpen ? null : i)}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "20px 0",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 15,
                    fontWeight: 500,
                    letterSpacing: "-0.02em",
                    color: "var(--text-primary)",
                  }}
                >
                  {faq.q}
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    color: "var(--primary)",
                    fontSize: 20,
                    marginLeft: 16,
                    flexShrink: 0,
                    fontWeight: 300,
                  }}
                >
                  +
                </motion.span>
              </div>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    style={{ overflow: "hidden" }}
                  >
                    <p
                      style={{
                        fontSize: 14,
                        color: "var(--text-muted)",
                        lineHeight: 1.75,
                        paddingBottom: 20,
                      }}
                    >
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </FadeUp>
        );
      })}
    </div>
  );
}

export default function LandingFAQ() {
  return (
    <section id="faq" style={{ position: "relative", padding: "clamp(48px, 6vw, 96px) clamp(20px, 4vw, 48px)" }}>
      <FadeUp>
        <div style={{ marginBottom: 48, display: "flex", flexDirection: "column", gap: 8, alignItems: "center", textAlign: "center" }}>
          <SectionLabel text="// FAQ" />
          <h2
            style={{
              fontSize: "clamp(24px, 4vw, 36px)",
              fontWeight: 500,
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
              fontFamily: "var(--font-body)",
            }}
          >
            Questions, ideas, or bugs?
          </h2>
        </div>
      </FadeUp>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <FAQ />
      </div>
    </section>
  );
}
