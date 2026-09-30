"use client";
import { useEffect, useRef, useState } from "react";
import { FileText, Play, Quote, ArrowUpRight } from "lucide-react";
import { useSystemPlayback } from "./system-panel";
const stages = ["Ingest", "Chunk", "Embed", "Retrieve", "Rerank", "Ground"];
const passages = [
  {
    id: "A",
    title: "01 / Input representation",
    text: "Each input is represented by complementary views. The views preserve different structural information.",
  },
  {
    id: "B",
    title: "02 / Feature integration",
    text: "Combining complementary features provides a richer representation than considering one view alone.",
  },
  {
    id: "C",
    title: "03 / Evaluation",
    text: "The resulting representation is evaluated on a held-out split using a consistent classification protocol.",
  },
];
export function ResearchScene() {
  const [stage, setStage] = useState(0);
  const [running, setRunning] = useState(false);
  const [source, setSource] = useState("B");
  const doc = useRef<HTMLDivElement>(null);
  const { playing, reduced } = useSystemPlayback();
  useEffect(() => {
    if (!running || !playing) return;
    const timer = setTimeout(() => {
      if (stage < 5) setStage(stage + 1);
      else setRunning(false);
    }, 850);
    return () => clearTimeout(timer);
  }, [stage, running, playing]);
  const trace = (id: string) => {
    setSource(id);
    doc.current?.focus({ preventScroll: true });
    doc.current?.scrollIntoView({
      behavior: reduced ? "auto" : "smooth",
      block: "center",
    });
  };
  return (
    <div className="story-scene research-scene" data-stage={stage}>
      <div className="workstation-bar">
        <span>
          <FileText size={15} /> RESEARCHLENS / EVIDENCE WORKSPACE
        </span>
        <span>ORIGINAL DEMO DOCUMENT</span>
      </div>
      <div className="research-question">
        <div>
          <span className="instrument-label">QUESTION</span>
          <p>Why combine multiple views?</p>
        </div>
        <button
          className="scene-button"
          disabled={running}
          onClick={() => {
            setStage(reduced ? 5 : 0);
            setRunning(!reduced);
          }}
        >
          <Play size={14} />
          {running
            ? "Tracing evidence"
            : stage === 5
              ? "Replay query"
              : "Run query"}
        </button>
      </div>
      <div className="research-zones">
        <div className="document-zone">
          <span className="instrument-label">01 / SOURCE DOCUMENT</span>
          <div
            className="academic-paper"
            ref={doc}
            tabIndex={-1}
            aria-label="Original demonstration source document"
          >
            <div className="paper-journal">RESEARCH NOTES / DEMONSTRATION</div>
            <h4>
              Learning from
              <br />
              complementary views
            </h4>
            <p className="paper-byline">Original explanatory sample · 1 page</p>
            <div className="paper-rule" />
            {passages.map((p) => (
              <button
                key={p.id}
                className={
                  "paper-passage " + (source === p.id ? "is-highlighted" : "")
                }
                aria-pressed={source === p.id}
                onClick={() => setSource(p.id)}
              >
                <span>{p.title}</span>
                {p.text}
                <b>[{p.id}]</b>
              </button>
            ))}
            <span className="paper-page">ILLUSTRATIVE SOURCE / PAGE 01</span>
          </div>
          <div
            className={"chunk-extract " + (stage >= 1 ? "is-active" : "")}
            aria-hidden="true"
          >
            <span>CHUNK A</span>
            <span>CHUNK B</span>
            <span>CHUNK C</span>
          </div>
        </div>
        <div className="vector-zone">
          <span className="instrument-label">02 / SEMANTIC SPACE</span>
          <div className="vector-universe">
            <svg
              viewBox="0 0 300 300"
              role="img"
              aria-label="Illustrative vector space with highlighted relevant evidence"
            >
              <ellipse cx="150" cy="150" rx="132" ry="68" />
              <ellipse
                cx="150"
                cy="150"
                rx="132"
                ry="68"
                transform="rotate(60 150 150)"
              />
              <ellipse
                cx="150"
                cy="150"
                rx="132"
                ry="68"
                transform="rotate(120 150 150)"
              />
              {Array.from({ length: 90 }, (_, i) => {
                const a = i * 2.39996,
                  r = 22 + Math.sqrt(i / 90) * 108,
                  x = 150 + Math.cos(a) * r,
                  y = 150 + Math.sin(a) * r * 0.86;
                return (
                  <circle
                    key={i}
                    cx={x}
                    cy={y}
                    r={i % 13 === 0 ? 4 : 1.5}
                    className={stage >= 3 && i % 13 === 0 ? "relevant" : ""}
                  />
                );
              })}
              <path
                className={
                  stage >= 3 ? "retrieval-thread is-active" : "retrieval-thread"
                }
                d="M55 110Q150 30 240 132Q150 238 74 197"
              />
            </svg>
            <span className="vector-center">
              {stage >= 3 ? "RELEVANT CONTEXT" : "EMBEDDING SPACE"}
            </span>
          </div>
          <div className="evidence-ranks">
            <span className="instrument-label">
              {stage >= 4 ? "RERANKED EVIDENCE" : "CANDIDATE PASSAGES"}
            </span>
            {(stage >= 4 ? ["B", "A", "C"] : ["A", "B", "C"]).map((id, i) => (
              <button key={id} onClick={() => trace(id)}>
                <span>0{i + 1}</span>Passage {id}
                <ArrowUpRight size={12} />
              </button>
            ))}
          </div>
          <small>
            Positions illustrate semantic relationships,
            <br />
            not measured embeddings.
          </small>
        </div>
        <div className={"answer-zone " + (stage === 5 ? "is-ready" : "")}>
          <span className="instrument-label">03 / GROUNDED ANSWER</span>
          <Quote size={28} />
          <h4>
            {stage === 5
              ? "More context.\nClearer reasoning."
              : "The answer begins\nwith evidence."}
          </h4>
          <p>
            {stage === 5
              ? "Complementary views preserve different structural information. Combining their features creates a richer representation."
              : "Run the query to retrieve passages, rerank evidence and trace an answer back to its source."}
          </p>
          <div className="answer-citations">
            {["A", "B"].map((id) => (
              <button
                key={id}
                onClick={() => trace(id)}
                aria-label={"Trace citation " + id + " to source"}
              >
                <FileText size={12} /> [{id}] Page 01 <ArrowUpRight size={12} />
              </button>
            ))}
          </div>
          <div className="grounding-trace" aria-hidden="true">
            <i />
            <span>ANSWER ↔ SOURCE</span>
          </div>
          <small>
            Answer uses only the sample document.
            <br />
            Illustrative UI · not a live model response.
          </small>
        </div>
      </div>
      <div className="research-stagebar">
        {stages.map((s, i) => (
          <button
            key={s}
            className={stage === i ? "is-active" : ""}
            aria-pressed={stage === i}
            onClick={() => {
              setRunning(false);
              setStage(i);
            }}
          >
            <span>0{i + 1}</span>
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
