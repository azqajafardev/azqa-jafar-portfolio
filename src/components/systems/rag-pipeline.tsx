"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, FileText, Play, RotateCcw } from "lucide-react";
import { retrievalStages } from "../../data/system-visuals";
import { useSystemPlayback } from "./system-panel";
const vectors = Array.from({ length: 35 }, (_, i) => ({
  x: 25 + ((i * 67) % 250),
  y: 20 + ((i * 43) % 142),
  chosen: [3, 11, 19, 26].includes(i),
}));
export function RAGPipeline() {
  const [phase, setPhase] = useState(0);
  const vectorRef = useRef<HTMLDivElement>(null);
  const [running, setRunning] = useState(false);
  const { playing, reduced } = useSystemPlayback();
  useEffect(() => {
    if (!running || !playing || phase >= 6) return;
    const timer = setTimeout(() => setPhase((p) => p + 1), 1100);
    return () => clearTimeout(timer);
  }, [running, playing, phase]);
  const candidates =
    phase >= 4
      ? ["Source passage B", "Source passage A", "Source passage C"]
      : ["Source passage A", "Source passage B", "Source passage C"];
  function trace() {
    setRunning(false);
    setPhase(3);
    vectorRef.current?.focus({ preventScroll: true });
    vectorRef.current?.scrollIntoView({
      behavior: reduced ? "auto" : "smooth",
      block: "center",
    });
  }
  function run() {
    setPhase(reduced ? 6 : 0);
    setRunning(!reduced);
  }
  return (
    <div className="rag-laboratory">
      <div className="rag-query">
        <div>
          <span className="micro-label">ILLUSTRATIVE RESEARCH QUERY</span>
          <p>
            “How does the proposed method
            <br className="desktop-only" /> improve classification?”
          </p>
        </div>
        <button className="run-query" onClick={run}>
          {phase === 6 ? <RotateCcw size={14} /> : <Play size={14} />}{" "}
          {phase === 6 ? "Replay flow" : "Run query"}
        </button>
      </div>
      <div className="retrieval-workbench">
        <div className="document-ingestion">
          <span className="micro-label">01 / DOCUMENT PREPARATION</span>
          <div className="document-stack" aria-hidden="true">
            {["A", "B", "C"].map((id, i) => (
              <div key={id} style={{ "--sheet": i } as React.CSSProperties}>
                <FileText size={26} />
                <span>PDF / {id}</span>
                <i />
                <i />
                <i />
              </div>
            ))}
          </div>
          <small>Illustrative document set</small>
          <div className="preparation-steps">
            {retrievalStages.slice(0, 3).map((step, i) => (
              <button
                key={step.name}
                className={phase === i ? "is-active" : ""}
                aria-pressed={phase === i}
                onClick={() => {
                  setRunning(false);
                  setPhase(i);
                }}
              >
                <span>0{i + 1}</span>
                {step.name}
                <ArrowRight size={12} />
              </button>
            ))}
          </div>
        </div>
        <div
          ref={vectorRef}
          tabIndex={-1}
          className={"vector-workspace " + (phase >= 3 ? "retrieved" : "")}
        >
          <div className="vector-heading">
            <span className="micro-label">02 / VECTOR SPACE</span>
            <span>CHROMADB</span>
          </div>
          <svg
            viewBox="0 0 300 185"
            className="vector-space"
            aria-label="Illustrative vector cluster highlighting selected document passages"
            role="img"
          >
            <path d="M20 155H285M35 170V15" className="vector-axis" />
            {vectors.map((v, i) => (
              <g key={i}>
                {v.chosen && (
                  <path
                    d={"M" + v.x + " " + v.y + " Q 160 85 278 92"}
                    className={"vector-link " + (phase >= 3 ? "lit" : "")}
                  />
                )}
                <circle
                  cx={v.x}
                  cy={v.y}
                  r={v.chosen ? 5 : 2.5}
                  className={v.chosen ? "chosen-vector" : "vector-dot"}
                />
                {v.chosen && (
                  <circle cx={v.x} cy={v.y} r="12" className="vector-halo" />
                )}
              </g>
            ))}
            <circle cx="278" cy="92" r="7" className="retrieval-port" />
          </svg>
          <div className="candidate-list">
            {candidates.map((s, i) => (
              <motion.span
                layout
                transition={{ duration: reduced ? 0 : 0.45 }}
                key={s}
                className={phase >= 4 ? "ranked" : ""}
                style={{ "--rank": i } as React.CSSProperties}
              >
                <b>{phase >= 4 ? String(i + 1).padStart(2, "0") : "—"}</b>
                {s}
                <i />
              </motion.span>
            ))}
          </div>
          <small>Demo passages · no research evidence generated</small>
        </div>
        <div className="generation-workspace">
          <span className="micro-label">03 / EVIDENCE → ANSWER</span>
          <div className="generation-steps">
            {retrievalStages.slice(3).map((step, i) => (
              <button
                key={step.name}
                className={phase === i + 3 ? "is-active" : ""}
                aria-pressed={phase === i + 3}
                onClick={() => {
                  setRunning(false);
                  setPhase(i + 3);
                }}
              >
                <span>0{i + 4}</span>
                {step.name}
                <ArrowRight size={13} />
              </button>
            ))}
          </div>
          <div className={"grounded-answer " + (phase === 6 ? "is-ready" : "")}>
            <span>GROUNDED OUTPUT</span>
            <strong>
              {phase === 6
                ? "Evidence-grounded response"
                : "Awaiting source context"}
            </strong>
            <div className="answer-lines" aria-hidden="true">
              <i />
              <i />
              <i />
            </div>
            <p>Page-linked source traceability</p>
            <small>
              Response structure only. No invented answer or page citations.
            </small>
            {phase === 6 && (
              <button className="trace-source" onClick={trace}>
                Trace source context ↖
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="system-inspector">
        <span>FLOW / {retrievalStages[phase].name}</span>
        <p aria-live="polite">{retrievalStages[phase].description}</p>
      </div>
    </div>
  );
}
