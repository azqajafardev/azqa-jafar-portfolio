"use client";
import { useState } from "react";
import { Activity, Network, Terminal, ArrowUpRight } from "lucide-react";
const channels = ["Threads", "Logs", "Network"];
const notes = [
  "Thread execution adds timing and task context to an investigation.",
  "Application events expose the sequence around a system issue.",
  "Service connections provide network context for the same investigation.",
];
export function MonitoringScene() {
  const [active, setActive] = useState(0);
  const [analyzed, setAnalyzed] = useState(false);
  return (
    <div className="story-scene observability-scene">
      <div className="scene-topline">
        <span>OBSERVABILITY / SIGNAL WORKSPACE</span>
        <span>DEMONSTRATIVE EVENTS · NO LIVE METRICS</span>
      </div>
      <div className="observability-intro">
        <h4>
          Three signals.
          <br />
          <em>One investigation.</em>
        </h4>
        <div className="signal-legend">
          <span>
            <i /> THREADS
          </span>
          <span>
            <i /> LOGS
          </span>
          <span>
            <i /> NETWORK
          </span>
        </div>
      </div>
      <div className="observability-wall">
        {channels.map((channel, i) => (
          <section
            className={"signal-column " + (active === i ? "is-active" : "")}
            key={channel}
          >
            <button
              className="channel-select"
              aria-pressed={active === i}
              onClick={() => {
                setActive(i);
                setAnalyzed(false);
              }}
            >
              {i === 0 ? (
                <Activity size={17} />
              ) : i === 1 ? (
                <Terminal size={17} />
              ) : (
                <Network size={17} />
              )}
              <strong>{channel}</strong>
              <span>0{i + 1}</span>
            </button>
            {i === 0 ? (
              <div className="thread-score">
                {Array.from({ length: 7 }, (_, row) => (
                  <div key={row}>
                    <span>T0{row + 1}</span>
                    <div>
                      {Array.from({ length: 5 }, (_, col) => (
                        <i
                          key={col}
                          style={{
                            left: ((row * 13 + col * 19) % 80) + "%",
                            width: 8 + ((row + col) % 4) * 4 + "%",
                            animationDelay: row * 0.2 + "s",
                          }}
                        />
                      ))}
                    </div>
                  </div>
                ))}
                <small>ILLUSTRATIVE EXECUTION TIMELINE</small>
              </div>
            ) : i === 1 ? (
              <div className="event-terminal">
                <div className="terminal-scroll">
                  {[
                    "[event] task queued",
                    "[worker] context loaded",
                    "[trace] thread resumed",
                    "[network] route opened",
                    "[event] handler entered",
                    "[worker] result prepared",
                    "[trace] context linked",
                    "[event] task queued",
                  ].map((line, j) => (
                    <code key={j}>
                      <span>{String(j + 1).padStart(2, "0")}</span>
                      {line}
                    </code>
                  ))}
                </div>
              </div>
            ) : (
              <div className="network-sphere">
                <svg
                  viewBox="0 0 300 260"
                  role="img"
                  aria-label="Illustrative network connections between service nodes"
                >
                  {Array.from({ length: 18 }, (_, j) => {
                    const a = (j / 18) * Math.PI * 2,
                      x = 150 + Math.cos(a) * 108,
                      y = 130 + Math.sin(a) * 90;
                    return (
                      <g key={j}>
                        <path d={"M150 130L" + x + " " + y} />
                        <circle cx={x} cy={y} r={j % 3 === 0 ? 5 : 2} />
                      </g>
                    );
                  })}
                  <ellipse cx="150" cy="130" rx="112" ry="92" />
                  <ellipse cx="150" cy="130" rx="58" ry="92" />
                  <circle className="network-heart" cx="150" cy="130" r="22" />
                  <path className="network-pulse" d="M44 105L150 130L258 153" />
                </svg>
                <small>CONNECTION CONTEXT</small>
              </div>
            )}
          </section>
        ))}
      </div>
      <div className="signal-convergence" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <div className="observability-bottom">
        <div className="analysis-aperture" aria-hidden="true">
          <i />
          <i />
          <i />
          <span>AI</span>
        </div>
        <div>
          <span className="instrument-label">
            {analyzed ? "DIAGNOSTIC INSIGHT" : "AI ANALYSIS CORE"}
          </span>
          <p aria-live="polite">
            {analyzed
              ? "Review " +
                channels[active].toLowerCase() +
                " alongside the other signals to investigate the event in context."
              : notes[active]}
          </p>
        </div>
        <button className="scene-button" onClick={() => setAnalyzed(!analyzed)}>
          {analyzed
            ? "Inspect signal"
            : "Analyze " + channels[active].toLowerCase()}
          <ArrowUpRight size={14} />
        </button>
      </div>
    </div>
  );
}
