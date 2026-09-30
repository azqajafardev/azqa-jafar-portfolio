'use client';
import { useEffect, useRef } from 'react';
export function LabExperience() {
 const dialog = useRef<HTMLDialogElement>(null);
 const magnetic = useRef<HTMLElement | null>(null);
 const cursor = useRef<HTMLDivElement>(null);
 const progress = useRef<HTMLDivElement>(null);
 useEffect(()=>{
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let seen = true;
  try { seen = sessionStorage.getItem('azqa-lab-intro') === 'seen'; sessionStorage.setItem('azqa-lab-intro','seen'); } catch {}
  const previous = document.activeElement as HTMLElement | null;
  if (!seen && !reduced) dialog.current?.showModal();
  const close = ()=>{ if(dialog.current?.open){dialog.current.close(); previous?.focus();} };
  const timer = setTimeout(close,2200);
  const scroll = ()=>{ const height=document.documentElement.scrollHeight-innerHeight; if(progress.current)progress.current.style.transform='scaleX('+(height>0?scrollY/height:0)+')'; };
  const move = (event:PointerEvent)=>{
   const target = event.target instanceof Element ? event.target.closest<HTMLElement>('.magnetic') : null;
   if(magnetic.current && magnetic.current!==target) magnetic.current.style.transform='';
   magnetic.current=target;
   if(target && !reduced && event.pointerType==='mouse'){const rect=target.getBoundingClientRect();target.style.transform='translate('+((event.clientX-rect.left-rect.width/2)*.05)+'px,'+((event.clientY-rect.top-rect.height/2)*.1)+'px)';}
if(!reduced && event.pointerType==='mouse' && cursor.current){cursor.current.style.transform='translate3d('+event.clientX+'px,'+event.clientY+'px,0)';cursor.current.style.opacity='1';}};
  window.addEventListener('scroll',scroll,{passive:true});window.addEventListener('pointermove',move,{passive:true});scroll();
  return ()=>{clearTimeout(timer);window.removeEventListener('scroll',scroll);window.removeEventListener('pointermove',move);};
 },[]);
 return <><div className="scroll-progress" ref={progress} aria-hidden="true"/><div className="lab-cursor" ref={cursor} aria-hidden="true"/><dialog ref={dialog} className="lab-intro" aria-labelledby="intro-title"><p className="kicker">INTELLIGENT SYSTEMS LAB</p><h2 id="intro-title">AZQA JAFAR</h2><p>AI & ML ENGINEER</p><div className="intro-flow" aria-hidden="true"><span>RETRIEVE</span><span>↓ REASON</span><span>↓ ACT</span></div><button className="primary" onClick={()=>dialog.current?.close()}>Enter portfolio →</button><button className="intro-skip" onClick={()=>dialog.current?.close()}>Skip intro</button></dialog></>;
}
