'use client';
import { useState } from 'react';
import { ArrowDownRight, CircuitBoard } from 'lucide-react';
import type { Project } from '../data/portfolio';
export function Architecture({ project, index }: { project: Project; index: number }) {
  const [selected, setSelected] = useState(0);
  return <div className={`architecture architecture-${index}`}>
    <div className="diagram-top"><span><CircuitBoard size={14}/> SYSTEM ARCHITECTURE</span><span>0{index + 1} / {index === 4 ? 'RESEARCH' : 'WORKFLOW'}</span></div>
    <div className="diagram-orbit" aria-hidden="true"><span/><span/><span/></div>
    <ol className="flow">{project.flow.map((node, i) => <li key={node}><button className={`node ${selected === i ? 'selected' : ''}`} aria-pressed={selected === i} onClick={() => setSelected(i)} onFocus={() => setSelected(i)} onMouseEnter={() => setSelected(i)}><span className="node-index">0{i + 1}</span>{node}<ArrowDownRight size={15}/></button>{i < project.flow.length - 1 && <span className="connector" aria-hidden="true"/>}</li>)}</ol>
    <p className="node-description" aria-live="polite">{project.details[selected]}</p><div className="diagram-bottom"><span className="status-dot"/> Schematic based on project documentation</div>
  </div>;
}
