import { useEffect } from "react";
import { motion } from "motion/react";
import "./landing/landingmain.css";
import LandingNav from "./landing/LandingNav";
import LandingHero from "./landing/LandingHero";
import LandingFeatures from "./landing/LandingFeatures";
import LandingComparison from "./landing/LandingComparison";
import LandingHowItWorks from "./landing/LandingHowItWorks";
import LandingTechStack, { Ticker } from "./landing/LandingTechStack";
import LandingFAQ from "./landing/LandingFAQ";
import LandingFooter from "./landing/LandingFooter";
import { RailLine, RailContainer, FadeUp, SectionLabel } from "./landing/LandingHelpers";

export default function DeployXLanding() {
  useEffect(() => {
    document.body.classList.add("landing-main-active");

    // Inject Newsreader display font dynamically to avoid global layout shift
    const fontLink = document.createElement("link");
    fontLink.rel = "stylesheet";
    fontLink.href =
      "https://fonts.googleapis.com/css2?family=Newsreader:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=IBM+Plex+Mono:wght@300;400;500;600&family=Sora:wght@300;400;500;600&display=swap";
    document.head.appendChild(fontLink);

    return () => {
      document.body.classList.remove("landing-main-active");
      document.head.removeChild(fontLink);
    };
  }, []);

  return (
    <div className="landingmain-container " style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--text-primary)"
          ,backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(206, 159, 253, 0.49) 0.62px, transparent 0)",
          backgroundSize: "25px 25px",
          backgroundRepeat: "repeat",
        }}>
      
      <LandingNav />

      {/* ═══ Blurred rail line under nav ═══ */}
      <div style={{ opacity: 0.72, filter: "blur(14px)", transform: "translateY(18px)" }}>
        <RailLine />
      </div>

      {/* ═══ HERO ═══ */}
      <RailContainer>
        <LandingHero />
      </RailContainer>

      {/* ═══ Rail + Ticker ═══ */}
      <RailLine />
      <RailContainer>
        <Ticker />
      </RailContainer>

      {/* ═══ FEATURES ═══ */}
      <RailLine />
      <RailContainer>
        <LandingFeatures />
      </RailContainer>

      {/* ═══ COMPARISON ═══ */}
      <RailLine />
      <RailContainer>
        <LandingComparison />
      </RailContainer>

      {/* ═══ HOW IT WORKS ═══ */}
      <RailLine />
      <RailContainer>
        <LandingHowItWorks />
      </RailContainer>

      {/* ═══ TECH STACK ═══ */}
      <RailLine />
      <RailContainer>
        <LandingTechStack />
      </RailContainer>

      {/* ═══ FAQ ═══ */}
      <RailLine />
      <RailContainer>
        <LandingFAQ />
      </RailContainer>

      {/* ═══ FINAL CTA ═══ */}
      <RailLine />
      <RailContainer>
        <section
          style={{
            position: "relative",
            padding: "clamp(80px, 12vw, 140px) clamp(20px, 4vw, 48px)",
            textAlign: "center",
            overflow: "hidden",
          }}
        >
          {/* Radial glow */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 500,
              height: 500,
              pointerEvents: "none",
              background: "radial-gradient(circle, var(--primary-glow) 0%, transparent 65%)",
            }}
          />
          <FadeUp>
            <SectionLabel text="// Get started" />
            <h2
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(40px, 8vw, 72px)",
                fontWeight: 500,
                letterSpacing: "-0.03em",
                lineHeight: 1.06,
                marginBottom: 20,
              }}
            >
              Deploy your next
              <br />
              <span style={{ color: "var(--primary)", fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 400, fontSize: "1.05em" }}>
                frontend app.
              </span>
            </h2>
            <p
              style={{
                fontSize: 15,
                color: "var(--text-muted)",
                maxWidth: 420,
                margin: "0 auto 48px",
                lineHeight: 1.7,
              }}
            >
              Join students, indie hackers, and startup builders who ship faster with DeployX.
            </p>
            <motion.a
              href="/deploy"
              whileHover={{ scale: 1.04, boxShadow: "0 0 48px rgba(192,132,252,0.3)" }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "var(--primary)",
                color: "#000",
                border: "none",
                borderRadius: 10,
                padding: "11px 25px",
                fontSize: 15,
                fontFamily: "var(--font-body)",
                fontWeight: 600,
                cursor: "pointer",
                letterSpacing: "-0.01em",
                textDecoration: "none",
              }}
            >
              Start deploying →
            </motion.a>
          </FadeUp>
        </section>
      </RailContainer>

      {/* ═══ FOOTER ═══ */}
      <RailLine />
      <LandingFooter />
    </div>
  );
}