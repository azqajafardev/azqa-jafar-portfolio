"use client";
import type { CSSProperties, ReactNode } from "react";
import type { DiagramEdge, DiagramNode } from "../../data/system-visuals";
export function FlowNode({
  node,
  selected,
  onSelect,
  positioned = true,
}: {
  node: DiagramNode;
  selected: boolean;
  onSelect: (id: string) => void;
  positioned?: boolean;
}) {
  return (
    <button
      type="button"
      className={
        "flow-node " +
        (positioned ? "positioned " : "") +
        (node.kind || "") +
        (selected ? " is-selected" : "")
      }
      style={
        positioned
          ? ({
              "--node-x": node.x + "%",
              "--node-y": node.y + "%",
            } as CSSProperties)
          : undefined
      }
      aria-pressed={selected}
      onClick={() => onSelect(node.id)}
      onMouseEnter={() => onSelect(node.id)}
      onFocus={() => onSelect(node.id)}
    >
      <span>{node.eyebrow || "FLOW / NODE"}</span>
      <strong>{node.label}</strong>
      <i aria-hidden="true" />
    </button>
  );
}
export function FlowEdge({
  from,
  to,
  active,
}: {
  from: DiagramNode;
  to: DiagramNode;
  active: boolean;
}) {
  const x1 = from.x * 10,
    y1 = from.y * 5,
    x2 = to.x * 10,
    y2 = to.y * 5;
  const d =
    "M " +
    x1 +
    " " +
    y1 +
    " C " +
    x1 +
    " " +
    (y1 + y2) / 2 +
    " " +
    x2 +
    " " +
    (y1 + y2) / 2 +
    " " +
    x2 +
    " " +
    y2;
  return (
    <g className={active ? "flow-edge is-active" : "flow-edge"}>
      <path d={d} className="edge-track" />
      <path d={d} pathLength="1" className="edge-signal" />
    </g>
  );
}
export function AnimatedFlow({
  nodes,
  edges,
  selected,
  children,
}: {
  nodes: DiagramNode[];
  edges: DiagramEdge[];
  selected: string;
  children: ReactNode;
}) {
  return (
    <div className="animated-flow">
      <svg
        className="flow-wires"
        viewBox="0 0 1000 500"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {edges.map((edge) => {
          const from = nodes.find((n) => n.id === edge.from),
            to = nodes.find((n) => n.id === edge.to);
          return from && to ? (
            <FlowEdge
              key={edge.from + edge.to}
              from={from}
              to={to}
              active={selected === edge.from || selected === edge.to}
            />
          ) : null;
        })}
      </svg>
      {children}
    </div>
  );
}
