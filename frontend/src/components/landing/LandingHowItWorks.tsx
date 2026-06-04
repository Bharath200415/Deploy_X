import React, { useState } from "react";
import { FadeUp, SectionLabel } from "./LandingHelpers";

// ─── Step Highlights Mapping ────────────────────────────────────────────────
const stepHighlights: Record<string, { nodes: string[]; edges: string[] }> = {
  "01": {
    nodes: ["developer", "frontend", "uploader"],
    edges: ["dev-to-fe", "fe-to-uploader-post"]
  },
  "02": {
    nodes: ["uploader", "local-disk", "r2"],
    edges: ["uploader-to-disk", "uploader-to-r2"]
  },
  "03": {
    nodes: ["uploader", "redis"],
    edges: ["uploader-to-redis"]
  },
  "04": {
    nodes: ["worker", "shell", "r2", "redis", "router", "end-user"],
    edges: ["worker-to-redis", "worker-to-r2", "worker-to-shell", "user-to-router", "router-to-r2", "uploader-to-fe-get"]
  }
};

const nodeToStep: Record<string, string> = {
  "developer": "01",
  "frontend": "01",
  "uploader": "02",
  "local-disk": "02",
  "redis": "03",
  "r2": "02",
  "worker": "04",
  "shell": "04",
  "router": "04",
  "end-user": "04"
};

// ─── SVG Feather Icons ──────────────────────────────────────────────────────
const Icons = {
  Developer: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  Frontend: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8" strokeLinecap="round" />
      <path d="M12 17v4" strokeLinecap="round" />
    </svg>
  ),
  Uploader: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="17 8 12 3 7 8" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="12" y1="3" x2="12" y2="15" strokeLinecap="round" />
    </svg>
  ),
  LocalDisk: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Redis: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
    </svg>
  ),
  R2: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Worker: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M9 9h6v6H9z" />
      <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3" strokeLinecap="round" />
    </svg>
  ),
  Shell: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <polyline points="7 8 11 12 7 16" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="13" y1="16" x2="17" y2="16" strokeLinecap="round" />
    </svg>
  ),
  Router: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="16" y="16" width="6" height="6" rx="1" />
      <rect x="2" y="16" width="6" height="6" rx="1" />
      <rect x="9" y="2" width="6" height="6" rx="1" />
      <path d="M12 8v4M12 12H5v4M12 12h7v4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  EndUser: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
};

// ─── Pipeline Steps ──────────────────────────────────────────────────────────
export function PipelineSteps({
  hoveredStep,
  setHoveredStep,
}: {
  hoveredStep: string | null;
  setHoveredStep: (step: string | null) => void;
}) {
  const steps = [
    { num: "01", title: "Paste URL", desc: "Drop your GitHub repository URL into the deploy form.", icon: "⬡" },
    { num: "02", title: "Clone & Upload", desc: "DeployX clones the repo and uploads source files to Cloudflare R2 storage.", icon: "◈" },
    { num: "03", title: "Queue Build", desc: "A build job is enqueued in Redis for async processing by the worker pool.", icon: "⟳" },
    { num: "04", title: "Build & Ship", desc: "Workers run npm install + build, then upload artifacts. Your site goes live.", icon: "▣" },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))", gap: 12 }}>
      {steps.map((step, i) => {
        const isActive = hoveredStep === step.num;
        return (
          <FadeUp key={step.num} delay={i * 0.08}>
            <div
              onMouseEnter={() => setHoveredStep(step.num)}
              onMouseLeave={() => setHoveredStep(null)}
              style={{
                borderRadius: 14,
                border: isActive ? "1px solid var(--primary)" : "1px solid var(--border-card)",
                background: isActive ? "var(--primary-glow)" : "var(--bg-card)",
                padding: 6,
                minHeight: 192,
                transform: isActive ? "translateY(-4px)" : "none",
                boxShadow: isActive ? "0 8px 30px rgba(192, 132, 252, 0.08)" : "none",
                transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  borderRadius: 8,
                  border: isActive ? "1px solid var(--primary-dim)" : "1px solid var(--border-card)",
                  background: "var(--bg-card-inner)",
                  padding: 20,
                  height: "100%",
                  minHeight: 176,
                  transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
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
                      color: isActive ? "var(--primary)" : "var(--text-muted)",
                      textTransform: "uppercase",
                      transition: "color 0.3s ease",
                    }}
                  >
                    Step {step.num}
                  </span>
                  <span style={{ fontSize: 18, color: isActive ? "var(--primary)" : "var(--text-faint)", transition: "color 0.3s ease" }}>
                    {step.icon}
                  </span>
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
                <p style={{ fontSize: 13, lineHeight: 1.65, color: isActive ? "var(--text-secondary)" : "var(--text-muted)", transition: "color 0.3s ease" }}>
                  {step.desc}
                </p>
              </div>
            </div>
          </FadeUp>
        );
      })}
    </div>
  );
}

// ─── Interactive SVG Architecture Diagram ───────────────────────────────────
export function ArchitectureDiagram({
  hoveredStep,
  setHoveredStep,
}: {
  hoveredStep: string | null;
  setHoveredStep: (step: string | null) => void;
}) {
  const activeNodes = hoveredStep ? stepHighlights[hoveredStep]?.nodes || [] : [];
  const activeEdges = hoveredStep ? stepHighlights[hoveredStep]?.edges || [] : [];

  const isNodeActive = (nodeId: string) => activeNodes.includes(nodeId);
  const isEdgeActive = (edgeId: string) => activeEdges.includes(edgeId);

  // Subgraph frame active checking
  const isWorkerFrameActive = isNodeActive("worker") || isNodeActive("shell");
  const isRouterFrameActive = isNodeActive("router") || isNodeActive("end-user");

  const SubgraphFrame = ({
    x,
    y,
    width,
    height,
    title,
    isActive,
  }: {
    x: number;
    y: number;
    width: number;
    height: number;
    title: string;
    isActive: boolean;
  }) => (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={12}
        fill="rgba(255, 255, 255, 0.005)"
        stroke={isActive ? "var(--primary-dim)" : "rgba(255, 255, 255, 0.03)"}
        strokeWidth={isActive ? 1.5 : 1}
        strokeDasharray={isActive ? "none" : "4, 4"}
        style={{ transition: "all 0.3s ease" }}
      />
      <text
        x={x + 12}
        y={y - 8}
        fill={isActive ? "var(--primary)" : "var(--text-muted)"}
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 8,
          fontWeight: 600,
          letterSpacing: "0.1em",
          userSelect: "none",
          transition: "all 0.3s ease",
        }}
      >
        {title}
      </text>
    </g>
  );

  const Node = ({
    id,
    x,
    y,
    width,
    height,
    title,
    subtext,
    icon,
    stepId,
  }: {
    id: string;
    x: number;
    y: number;
    width: number;
    height: number;
    title: string;
    subtext: string;
    icon: React.ReactNode;
    stepId: string;
  }) => {
    const isActive = isNodeActive(id);
    return (
      <g
        onMouseEnter={() => setHoveredStep(stepId)}
        onMouseLeave={() => setHoveredStep(null)}
        style={{ cursor: "pointer" }}
      >
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          rx={8}
          fill={isActive ? "var(--primary-glow)" : "rgba(9, 9, 11, 0.9)"}
          stroke={isActive ? "var(--primary)" : "var(--border-card)"}
          strokeWidth={isActive ? 1.5 : 1}
          style={{
            transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />
        {isActive && (
          <rect
            x={x + 1}
            y={y + 1}
            width={width - 2}
            height={3}
            rx={1.5}
            fill="var(--primary)"
          />
        )}
        <g transform={`translate(${x + 16}, ${y + (height - 20) / 2})`} style={{ color: isActive ? "var(--primary)" : "var(--text-muted)", transition: "color 0.3s" }}>
          {icon}
        </g>
        <text
          x={x + 48}
          y={y + 24}
          fill="var(--text-primary)"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 11,
            fontWeight: 600,
            userSelect: "none",
          }}
        >
          {title}
        </text>
        <text
          x={x + 48}
          y={y + 40}
          fill="var(--text-muted)"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 8.5,
            userSelect: "none",
          }}
        >
          {subtext}
        </text>
      </g>
    );
  };

  const FlowLine = ({
    id,
    path,
    label,
    labelX,
    labelY,
    reverse = false,
  }: {
    id: string;
    path: string;
    label?: string;
    labelX?: number;
    labelY?: number;
    reverse?: boolean;
  }) => {
    const isActive = isEdgeActive(id);
    return (
      <g>
        <path
          d={path}
          fill="none"
          stroke={isActive ? "rgba(192, 132, 252, 0.3)" : "rgba(255, 255, 255, 0.04)"}
          strokeWidth={isActive ? 2 : 1}
          style={{
            transition: "all 0.3s ease",
          }}
          markerEnd={isActive ? "url(#arrow-active)" : "url(#arrow)"}
        />
        {isActive && (
          <path
            d={path}
            fill="none"
            stroke="var(--primary)"
            strokeWidth={2}
            className={reverse ? "flow-line-reverse" : "flow-line"}
            strokeLinecap="round"
          />
        )}
        {label && labelX && labelY && (
          <g style={{ transition: "opacity 0.3s ease" }}>
            <rect
              x={labelX - (label.length * 4.5) / 2 - 8}
              y={labelY - 9}
              width={label.length * 4.5 + 16}
              height={16}
              rx={4}
              fill="#09090b"
              stroke={isActive ? "rgba(192, 132, 252, 0.2)" : "rgba(255, 255, 255, 0.02)"}
              strokeWidth={1}
              style={{ transition: "all 0.3s ease" }}
            />
            <text
              x={labelX}
              y={labelY + 2}
              textAnchor="middle"
              fill={isActive ? "var(--primary)" : "var(--text-muted)"}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 8,
                letterSpacing: "0.02em",
                fontWeight: isActive ? 600 : 400,
                userSelect: "none",
                transition: "fill 0.3s ease",
              }}
            >
              {label}
            </text>
          </g>
        )}
      </g>
    );
  };

  return (
    <div style={{ width: "100%", overflowX: "auto", padding: "16px 0" }}>
      <svg
        viewBox="0 0 1160 620"
        style={{
          width: "100%",
          minWidth: 1080,
          height: "auto",
          display: "block",
          background: "transparent",
        }}
      >
        <defs>
          <marker
            id="arrow"
            viewBox="0 0 10 10"
            refX="6"
            refY="5"
            markerWidth="5"
            markerHeight="5"
            orient="auto-start-reverse"
          >
            <path d="M 0 2 L 6 5 L 0 8 z" fill="rgba(255, 255, 255, 0.15)" />
          </marker>
          <marker
            id="arrow-active"
            viewBox="0 0 10 10"
            refX="6"
            refY="5"
            markerWidth="5"
            markerHeight="5"
            orient="auto-start-reverse"
          >
            <path d="M 0 2 L 6 5 L 0 8 z" fill="var(--primary)" />
          </marker>
        </defs>

        <style>{`
          @keyframes flow-right {
            to {
              stroke-dashoffset: -20;
            }
          }
          @keyframes flow-left {
            to {
              stroke-dashoffset: 20;
            }
          }
          .flow-line {
            stroke-dasharray: 6, 6;
            animation: flow-right 0.8s linear infinite;
          }
          .flow-line-reverse {
            stroke-dasharray: 6, 6;
            animation: flow-left 0.8s linear infinite;
          }
        `}</style>

        {/* ─── Subgraph Boxes ─── */}
        <SubgraphFrame x={560} y={310} width={210} height={270} title="Deploy Worker Pool" isActive={isWorkerFrameActive} />
        <SubgraphFrame x={270} y={310} width={210} height={270} title="Request Handler" isActive={isRouterFrameActive} />

        {/* ─── Flow Lines ─── */}
        <FlowLine id="dev-to-fe" path="M 190 100 H 290" label="Paste Git URL" labelX={240} labelY={85} />
        <FlowLine id="fe-to-uploader-post" path="M 460 90 H 580" label="POST /deploy" labelX={520} labelY={72} />
        <FlowLine id="uploader-to-fe-get" path="M 580 110 H 460" label="GET logs/status" labelX={520} labelY={128} reverse={true} />
        <FlowLine id="uploader-to-disk" path="M 665 130 V 200" label="Git Clone" labelX={715} labelY={165} />
        <FlowLine id="uploader-to-redis" path="M 750 100 H 870 V 205 H 930" label="Push Job ID" labelX={810} labelY={85} />
        <FlowLine id="uploader-to-r2" path="M 750 100 H 885 V 365 H 930" label="Upload Source" labelX={835} labelY={280} />
        
        <FlowLine id="worker-to-redis" path="M 755 365 H 860 V 220 H 930" label="brPop queue" labelX={820} labelY={350} reverse={true} />
        <FlowLine id="worker-to-r2" path="M 755 385 H 930" label="Download Source / Upload dist" labelX={842} labelY={373} />
        <FlowLine id="worker-to-shell" path="M 625 410 V 505" label="Spawn Build" labelX={580} labelY={457} />
        <FlowLine id="shell-to-worker" path="M 705 505 V 410" label="Live logs" labelX={750} labelY={457} reverse={true} />

        <FlowLine id="user-to-router" path="M 375 505 V 410" label="Visit Sandbox" labelX={330} labelY={457} />
        <FlowLine id="router-to-r2" path="M 465 377 H 510 V 457 H 885 V 365 H 930" label="Fetch compiled files" labelX={800} labelY={442} />

        {/* ─── Nodes ─── */}
        <Node id="developer" x={40} y={70} width={150} height={60} title="Developer" subtext="Repo Owner / Operator" icon={Icons.Developer} stepId="01" />
        <Node id="frontend" x={290} y={70} width={170} height={60} title="React Frontend" subtext="Console Dashboard" icon={Icons.Frontend} stepId="01" />
        <Node id="uploader" x={580} y={70} width={170} height={60} title="Upload Service" subtext="Express API Uploader" icon={Icons.Uploader} stepId="02" />
        <Node id="local-disk" x={580} y={200} width={170} height={50} title="Local Disk" subtext="Cloning Workspace" icon={Icons.LocalDisk} stepId="02" />

        <Node id="redis" x={930} y={170} width={180} height={70} title="Redis Queue & DB" subtext="List Queues & Logs Hash" icon={Icons.Redis} stepId="03" />
        <Node id="r2" x={930} y={330} width={180} height={70} title="Cloudflare R2" subtext="S3 Object Storage" icon={Icons.R2} stepId="02" />

        {/* Worker Pool Inner Nodes */}
        <Node id="worker" x={575} y={345} width={180} height={65} title="Deploy Worker" subtext="Queue Consumer" icon={Icons.Worker} stepId="04" />
        <Node id="shell" x={575} y={505} width={180} height={60} title="Subprocess Shell" subtext="npm install && npm run build" icon={Icons.Shell} stepId="04" />

        {/* Request Router Inner Nodes */}
        <Node id="router" x={285} y={345} width={180} height={65} title="Request Router" subtext="Wildcard Subdomain Proxy" icon={Icons.Router} stepId="04" />
        <Node id="end-user" x={285} y={505} width={180} height={60} title="End User" subtext="Visit Sandbox Link" icon={Icons.EndUser} stepId="04" />
      </svg>
    </div>
  );
}

// ─── Mobile Fallback List Layout ────────────────────────────────────────────
export function MobileFlowDiagram() {
  const mobileFlow = [
    {
      step: "01",
      title: "Developer & Client UI",
      desc: "Paste repository URL inside the React Frontend, triggering POST /deploy API requests.",
      nodes: ["Developer", "React Frontend"],
    },
    {
      step: "02",
      title: "Express Upload Service",
      desc: "Clones the repo locally on Disk, strips metadata, and uploads source files to Cloudflare R2 Object Storage.",
      nodes: ["Upload Service", "Local Disk Storage", "Cloudflare R2"],
    },
    {
      step: "03",
      title: "Redis Build Queue",
      desc: "Pushes job ID metadata into Redis queue and logs DB for real-time tracking.",
      nodes: ["Redis Queue & DB"],
    },
    {
      step: "04",
      title: "Deploy Worker Pool & Router",
      desc: "Workers fetch from Redis & R2, run builds via subprocess shell, push live logs to Redis, and save dist files. Request Router serves files from R2.",
      nodes: ["Deploy Worker", "Subprocess Shell", "Request Router"],
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {mobileFlow.map((item, index) => (
        <div
          key={item.step}
          style={{
            borderRadius: 12,
            border: "1px solid var(--border-card)",
            background: "var(--bg-card)",
            padding: 16,
            position: "relative",
          }}
        >
          {index < mobileFlow.length - 1 && (
            <div
              style={{
                position: "absolute",
                left: 32,
                top: 48,
                bottom: -24,
                width: 1,
                backgroundImage: "repeating-linear-gradient(to bottom, var(--border-card) 0px, var(--border-card) 4px, transparent 4px, transparent 8px)",
                zIndex: 1,
              }}
            />
          )}

          <div style={{ display: "flex", gap: 16, alignItems: "flex-start", position: "relative", zIndex: 2 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: "var(--bg-card-inner)",
                border: "1px solid var(--border-card)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 11,
                fontFamily: "var(--font-mono)",
                color: "var(--primary)",
                flexShrink: 0,
              }}
            >
              {item.step}
            </div>

            <div style={{ flex: 1 }}>
              <h4 style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: 4, fontFamily: "var(--font-body)" }}>
                {item.title}
              </h4>
              <p style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.5, marginBottom: 12 }}>
                {item.desc}
              </p>
              
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {item.nodes.map((node) => (
                  <span
                    key={node}
                    style={{
                      fontSize: 9,
                      fontFamily: "var(--font-mono)",
                      color: "var(--text-secondary)",
                      background: "var(--bg-card-inner)",
                      padding: "3px 6px",
                      borderRadius: 4,
                      border: "1px solid var(--border-card)",
                    }}
                  >
                    {node}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Main Landing Component ─────────────────────────────────────────────────
export default function LandingHowItWorks() {
  const [hoveredStep, setHoveredStep] = useState<string | null>(null);

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

      <PipelineSteps hoveredStep={hoveredStep} setHoveredStep={setHoveredStep} />

      {/* Architecture Detail Diagram */}
      <div style={{ marginTop: 64 }}>
        <FadeUp>
          <div style={{ marginBottom: 24, display: "flex", flexDirection: "column", gap: 4 }}>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                color: "var(--primary-dim)",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              // SYSTEM DESIGN
            </span>
            <h3
              style={{
                fontSize: "clamp(18px, 3vw, 24px)",
                fontWeight: 500,
                color: "var(--text-primary)",
                fontFamily: "var(--font-body)",
                letterSpacing: "-0.02em",
              }}
            >
              System Architecture Flow
            </h3>
          </div>
        </FadeUp>

        {/* Desktop interactive SVG flow */}
        <div className="desktop-only" style={{ width: "100%", justifyContent: "center" }}>
          <FadeUp style={{ width: "100%" }}>
            <ArchitectureDiagram hoveredStep={hoveredStep} setHoveredStep={setHoveredStep} />
          </FadeUp>
        </div>

        {/* Mobile vertical layout flow */}
        <div className="mobile-only" style={{ width: "100%", flexDirection: "column" }}>
          <FadeUp style={{ width: "100%" }}>
            <MobileFlowDiagram />
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

