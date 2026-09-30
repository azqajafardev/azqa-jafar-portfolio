"use client";
import { useRef } from "react";
import { motion, useScroll, useInView } from "framer-motion";
import { useMotionPreference } from "../../lib/use-motion-preference";
import { experience } from "../../data/portfolio";
export function ExperienceLedger() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 65%"],
  });
  const reduced = useMotionPreference();
  const visible = useInView(ref);
  return (
    <div
      className="experience-ledger"
      ref={ref}
      data-motion-active={visible && !reduced}
    >
      <div className="ledger-track" aria-hidden="true">
        <motion.i style={{ scaleY: reduced ? 1 : scrollYProgress }} />
      </div>
      {experience.map((job, i) => (
        <article className="ledger-entry" key={job.company}>
          <div className="ledger-date">
            <span className="ledger-number">0{i + 1}</span>
            <time>{job.date.split(" — ")[0]}</time>
            <i aria-hidden="true" />
            <time>{job.date.split(" — ")[1]}</time>
            {i === 0 && (
              <span className="current-role">
                <i />
                CURRENT
              </span>
            )}
          </div>
          <div className="ledger-role">
            <p className="micro-label">
              {i === 0 ? "01 / AI DEVELOPMENT" : "02 / AI & PYTHON DEVELOPMENT"}
            </p>
            <h3>{job.role}</h3>
            <p className="ledger-company">{job.company}</p>
            <ul>
              {job.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
            <div className="system-tech">
              {job.tech.map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
