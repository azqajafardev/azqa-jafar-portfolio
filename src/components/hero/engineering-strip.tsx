'use client';
import { useState } from 'react';
const stack = ['Python','FastAPI','LangChain','LangGraph','RAG','MCP','ChromaDB','FAISS','Docker','TensorFlow'];
export function EngineeringStrip(){const [paused,setPaused]=useState(false);return <div className={'engineering-strip '+(paused?'paused':'')}><div className="strip-label">ENGINEERING STACK</div><div className="strip-window"><div className="strip-track">{[0,1].map(copy=><div className="strip-copy" key={copy} aria-hidden={copy===1?true:undefined}>{stack.map((item,i)=><span key={item}><small>{String(i+1).padStart(2,'0')}</small>{item}<b>·</b></span>)}</div>)}</div></div><button aria-label={paused?'Play stack animation':'Pause stack animation'} onClick={()=>setPaused(!paused)}>{paused?'▶':'Ⅱ'}</button></div>;}
