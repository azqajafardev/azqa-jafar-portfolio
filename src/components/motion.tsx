'use client';
import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
export function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={false} whileInView={reduced ? {} : { y: [16, 0] }} viewport={{ once: true, amount: .15 }} transition={{ duration: .55 }}>{children}</motion.div>;
}
export function Specialty() {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const words = ['Generative AI Engineer', 'Agentic RAG Developer', 'AI Agents Engineer', 'LLM Systems Developer', 'Machine Learning Engineer'];
  useEffect(() => { if (reduced) return; const timer = setInterval(() => setIndex(i => (i + 1) % 5), 3500); return () => clearInterval(timer); }, [reduced]);
  return <span className="specialty"><span className="status-dot"/><span>FOCUS / </span><motion.strong key={index} initial={false} animate={{ opacity: [0.5, 1] }} transition={{ duration: reduced ? 0 : .4 }}>{words[index]}</motion.strong></span>;
}
