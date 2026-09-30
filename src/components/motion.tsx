"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useMotionPreference } from "../lib/use-motion-preference";
export function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduced = useMotionPreference();
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { amount: 0.1 });
  return (
    <motion.div
      ref={ref}
      data-motion-active={visible && !reduced}
      className={className}
      initial={false}
      whileInView={reduced ? {} : { y: [16, 0] }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55 }}
    >
      {children}
    </motion.div>
  );
}
export function Specialty() {
  const reduced = useMotionPreference();
  const [index, setIndex] = useState(0);
  const words = [
    "Generative AI Engineer",
    "Agentic RAG Developer",
    "AI Agents Engineer",
    "LLM Systems Developer",
    "Machine Learning Engineer",
  ];
  useEffect(() => {
    if (reduced) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % 5), 3500);
    return () => clearInterval(timer);
  }, [reduced]);
  return (
    <span className="specialty">
      <span className="status-dot" />
      <span>FOCUS / </span>
      <motion.strong
        key={index}
        initial={false}
        animate={{ opacity: [0.5, 1] }}
        transition={{ duration: reduced ? 0 : 0.4 }}
      >
        {words[index]}
      </motion.strong>
    </span>
  );
}
