"use client";
import { useState } from "react";
import { securityNodes, securityEdges } from "../../data/system-visuals";
import { AnimatedFlow, FlowNode } from "./flow";
export function MultiAgentGraph() {
  const [selected, setSelected] = useState("orchestrator");
  const current = securityNodes.find((n) => n.id === selected)!;
  return (
    <>
      <div className="command-strip">
        <span>AGENTS / COORDINATED</span>
        <span>RAG / CONTEXT</span>
        <span>MCP / TOOLS</span>
        <span>DESKTOP / FLUTTER</span>
      </div>
      <div className="command-stage">
        <div className="command-annotation">
          <span>SECURITY CONTEXT</span>
          <b>01—03</b>
          <small>
            Retrieve.
            <br />
            Coordinate.
            <br />
            Analyze.
          </small>
        </div>
        <AnimatedFlow
          nodes={securityNodes}
          edges={securityEdges}
          selected={selected}
        >
          <div className="graph-boundary" aria-hidden="true">
            <span>REASONING & INTEGRATION LAYER</span>
          </div>
          {securityNodes.map((node) => (
            <FlowNode
              key={node.id}
              node={node}
              selected={selected === node.id}
              onSelect={setSelected}
            />
          ))}
        </AnimatedFlow>
      </div>
      <div className="system-inspector">
        <span>INSPECT / {current.label}</span>
        <p aria-live="polite">{current.detail}</p>
      </div>
    </>
  );
}
