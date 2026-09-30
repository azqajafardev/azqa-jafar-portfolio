"use client";
import { useState } from "react";
import { knowledgeNodes } from "../../data/system-visuals";
import { AnimatedFlow, FlowNode } from "./flow";
export function KnowledgeGraph() {
  const [selected, setSelected] = useState("admissions");
  const current = knowledgeNodes.find((n) => n.id === selected)!;
  const edges = knowledgeNodes
    .slice(1)
    .map((n) => ({ from: "university", to: n.id }));
  return (
    <div className="knowledge-laboratory">
      <div className="knowledge-query">
        <span className="micro-label">STUDENT QUERY</span>
        <p>
          One question.
          <br />
          <em>Relevant institutional context.</em>
        </p>
        <span className="knowledge-bracket" aria-hidden="true">
          [ ? ]
        </span>
        <small>Select a knowledge domain to follow its connection.</small>
      </div>
      <div className="knowledge-constellation">
        <AnimatedFlow nodes={knowledgeNodes} edges={edges} selected={selected}>
          <div className="knowledge-orbits" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
          {knowledgeNodes.map((node) => (
            <FlowNode
              key={node.id}
              node={node}
              selected={selected === node.id}
              onSelect={setSelected}
            />
          ))}
        </AnimatedFlow>
      </div>
      <div className="knowledge-answer-path">
        <span>SEMANTIC RETRIEVAL</span>
        <i aria-hidden="true">→</i>
        <span>
          {selected === "university"
            ? "INSTITUTIONAL"
            : current.label.toUpperCase()}{" "}
          CONTEXT
        </span>
        <i aria-hidden="true">→</i>
        <span>AI RESPONSE</span>
      </div>
      <div className="system-inspector">
        <span>KNOWLEDGE / {current.label}</span>
        <p aria-live="polite">{current.detail}</p>
      </div>
    </div>
  );
}
