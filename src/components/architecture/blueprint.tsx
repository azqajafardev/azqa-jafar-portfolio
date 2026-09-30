'use client';
import { useState } from 'react';
const branches = [
{ name: 'Retrieval', source: 'Vector DB', detail: 'Find relevant information through embeddings, semantic search, hybrid retrieval, and reranking.' },
{ name: 'Agents', source: 'Memory', detail: 'Coordinate reasoning, state, and tool calling through agentic workflows.' },
{ name: 'Tools', source: 'MCP / API', detail: 'Connect language-model workflows to external services and useful actions.' }
];
export function Blueprint() {
 const [active, setActive] = useState(0);
 return <section className="section shell blueprint-section" aria-labelledby="blueprint-title"><div className="section-heading"><div><p className="kicker">02 / INTELLIGENCE BLUEPRINT</p><h2 id="blueprint-title">Information in.<br/><em>Grounded action out.</em></h2></div><p>A conceptual engineering blueprint across my areas of work.</p></div><div className="blueprint"><div className="blueprint-canvas"><div className="blueprint-end">USER QUESTION</div><div className="trace"/><div className="blueprint-hub">ORCHESTRATOR</div><div className="branch-grid">{branches.map((branch,i)=><div className={'branch '+(active===i?'active':'')} key={branch.name}><div className="trace"/><button aria-pressed={active===i} onClick={()=>setActive(i)} onMouseEnter={()=>setActive(i)} onFocus={()=>setActive(i)}>{branch.name}<span>0{i+1} ↗</span></button><div className="trace"/><div className="branch-source">{branch.source}</div><div className="trace"/></div>)}</div><div className="blueprint-hub">LLM / SYNTHESIS</div><div className="trace"/><div className="blueprint-end output">GROUNDED OUTPUT</div></div><aside className="blueprint-note"><span className="card-eyebrow">EXPLORE A PATH</span><strong>0{active+1}</strong><h3>{branches[active].name}</h3><p aria-live="polite">{branches[active].detail}</p><small>Hover, focus, or select a branch.<br/>Conceptual domain map; not a deployed system.</small></aside></div></section>;
}
