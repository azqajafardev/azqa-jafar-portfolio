"use client";
import { useState } from "react";
import { Activity, Network, Terminal } from "lucide-react";
const feeds = ["Threads", "Logs", "Network"];
const descriptions = [
  "Thread activity provides technical context for system monitoring.",
  "Application logs support event review and issue investigation.",
  "Network activity adds connection context to the monitoring interface.",
];
export function TelemetryPanel() {
  const [feed, setFeed] = useState(0);
  const [output, setOutput] = useState(false);
  return (
    <div className="telemetry-laboratory">
      <div className="telemetry-title">
        <span className="micro-label">OBSERVABILITY / INPUT CHANNELS</span>
        <span className="simulation-label">ILLUSTRATIVE SIGNALS</span>
      </div>
      <div className="telemetry-channels">
        {feeds.map((name, i) => (
          <div
            key={name}
            className={"telemetry-channel " + (feed === i ? "is-active" : "")}
          >
            <button
              className="channel-select"
              aria-pressed={feed === i}
              onClick={() => {
                setFeed(i);
                setOutput(false);
              }}
              onMouseEnter={() => setFeed(i)}
              onFocus={() => setFeed(i)}
            >
              {i === 0 ? (
                <Activity size={16} />
              ) : i === 1 ? (
                <Terminal size={16} />
              ) : (
                <Network size={16} />
              )}
              <span>{name}</span>
              <small>0{i + 1}</small>
            </button>
            {i === 0 ? (
              <div className="thread-lanes">
                {["01", "02", "03"].map((n, j) => (
                  <div key={n}>
                    <span>THREAD / {n}</span>
                    <div>
                      <i style={{ "--lane": j } as React.CSSProperties} />
                    </div>
                  </div>
                ))}
              </div>
            ) : i === 1 ? (
              <div className="log-window">
                <div className="log-stream">
                  {[
                    "[INFO] receive event",
                    "[PROCESS] read context",
                    "[NETWORK] inspect signal",
                    "[EVENT] prepare analysis",
                    "[INFO] receive event",
                    "[PROCESS] read context",
                  ].map((line, j) => (
                    <code key={j}>{line}</code>
                  ))}
                </div>
              </div>
            ) : (
              <svg
                viewBox="0 0 250 135"
                className="network-mini"
                role="img"
                aria-label="Conceptual API and service connections"
              >
                <g className="network-links">
                  <path d="M35 25L125 65L220 25M35 110L125 65L220 110" />
                  <path className="network-pulse" d="M35 25L125 65L220 110" />
                </g>
                {[
                  [35, 25, "NODE"],
                  [35, 110, "API"],
                  [125, 65, "SYSTEM"],
                  [220, 25, "SERVICE"],
                  [220, 110, "NODE"],
                ].map(([x, y, label], j) => (
                  <g key={j}>
                    <circle cx={x} cy={y} r={j === 2 ? 12 : 5} />
                    <text x={Number(x)} y={Number(y) + 22} textAnchor="middle">
                      {label}
                    </text>
                  </g>
                ))}
              </svg>
            )}
          </div>
        ))}
      </div>
      <svg
        className="telemetry-convergence"
        viewBox="0 0 1000 90"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {[165, 500, 835].map((x, i) => (
          <g key={x} className={feed === i ? "is-active" : ""}>
            <path d={"M" + x + " 0V25Q" + x + " 45 500 65V90"} />
            <path
              className="convergence-signal"
              pathLength="1"
              d={"M" + x + " 0V25Q" + x + " 45 500 65V90"}
            />
          </g>
        ))}
      </svg>
      <div className="diagnostic-output">
        <button
          className={"analysis-core " + (!output ? "is-selected" : "")}
          aria-pressed={!output}
          onClick={() => setOutput(false)}
        >
          <i className="analysis-wave" aria-hidden="true" />
          <span>AI ANALYSIS</span>
          <small>EVENT INTERPRETATION</small>
        </button>
        <span className="output-arrow" aria-hidden="true">
          →
        </span>
        <button
          className={"diagnostic-node " + (output ? "is-selected" : "")}
          aria-pressed={output}
          onClick={() => setOutput(true)}
        >
          <span>DIAGNOSTIC INSIGHT</span>
          <small>SUPPORTING ISSUE INVESTIGATION</small>
        </button>
      </div>
      <div className="system-inspector">
        <span>INSPECT / {output ? "Diagnostics" : feeds[feed]}</span>
        <p aria-live="polite">
          {output
            ? "AI-assisted interpretation supports diagnostics in the unified Flutter interface."
            : descriptions[feed]}
        </p>
      </div>
    </div>
  );
}
