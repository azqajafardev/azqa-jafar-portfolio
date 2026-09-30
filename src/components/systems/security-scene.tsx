"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Play, RotateCcw, ArrowUpRight, Radar } from "lucide-react";
import { useSystemPlayback } from "./system-panel";
const stages = [
  "Event received",
  "Agents coordinating",
  "Context retrieved",
  "MCP tool connected",
  "Insight prepared",
];
const descriptions = [
  "An example access event enters the analysis workflow.",
  "Specialist agents share the event context.",
  "Relevant security context is retrieved for reasoning.",
  "An external tool adds supporting context through MCP.",
  "Review the event alongside retrieved context before taking action.",
];
export function SecurityScene() {
  const [step, setStep] = useState(0);
  const [running, setRunning] = useState(false);
  const { playing, reduced } = useSystemPlayback();
  useEffect(() => {
    if (!running || !playing) return;
    const timer = setTimeout(() => {
      if (step < 4) setStep(step + 1);
      else setRunning(false);
    }, 1150);
    return () => clearTimeout(timer);
  }, [step, running, playing]);
  return (
    <div className="story-scene security-scene" data-stage={step}>
      <Image
        className="security-landscape"
        src="/images/projects/security-network.webp"
        alt="Original three-dimensional illustration of enterprise infrastructure linked to AI processing cores"
        fill
        sizes="(max-width: 760px) 100vw, 1200px"
      />
      <div className="scene-vignette" />
      <div className="scene-topline">
        <span>SECURITY OPERATIONS / CONCEPT STUDY</span>
        <span>ILLUSTRATIVE WORKFLOW</span>
      </div>
      <div className="security-event glass-instrument">
        <span className="instrument-label">
          <Radar size={13} /> EVENT INGESTION
        </span>
        <h4>
          A signal.
          <br />A wider context.
        </h4>
        <div className="event-code">
          <code>event: access_request</code>
          <code>source: example_service</code>
          <code>route: agent_analysis</code>
        </div>
        <button
          className="scene-button"
          onClick={() => {
            setStep(reduced ? 4 : 0);
            setRunning(!reduced);
          }}
          disabled={running}
        >
          {running ? (
            <>
              <Radar size={14} /> Analyzing event
            </>
          ) : (
            <>
              <Play size={14} />
              {step === 4 ? "Replay event" : "Run example event"}
            </>
          )}
        </button>
      </div>
      <div className="agent-orbits" aria-hidden="true">
        <i />
        <i />
        <i />
        <span>
          AGENT
          <br />
          ORCHESTRATION
        </span>
        <b className={running ? "is-running" : ""} />
      </div>
      <div
        className={
          "security-insight glass-instrument " + (step === 4 ? "is-ready" : "")
        }
      >
        <span className="instrument-label">
          {step === 4 ? "CONTEXT-ENRICHED INSIGHT" : "ANALYSIS WORKSPACE"}
        </span>
        <p className="insight-title">
          {step === 4 ? "Evidence before action." : "Connect the signal."}
        </p>
        <p aria-live="polite">{descriptions[step]}</p>
        <div className="insight-tags">
          <span>RAG context</span>
          <span>MCP tools</span>
        </div>
        <small>Demonstration only · no live threats</small>
      </div>
      <div className="security-sequence">
        {stages.map((stage, i) => (
          <button
            key={stage}
            className={step === i ? "is-active" : ""}
            aria-pressed={step === i}
            onClick={() => {
              setRunning(false);
              setStep(i);
            }}
          >
            <span>0{i + 1}</span>
            <strong>{stage}</strong>
            <i />
          </button>
        ))}
      </div>
      <span className="scene-caption">
        <ArrowUpRight size={13} /> Python / FastAPI / LangGraph / Flutter
      </span>
      <button
        className="scene-reset"
        aria-label="Reset security demonstration"
        onClick={() => {
          setStep(0);
          setRunning(false);
        }}
      >
        <RotateCcw size={14} />
      </button>
    </div>
  );
}
