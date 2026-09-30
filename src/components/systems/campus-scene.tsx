"use client";
import Image from "next/image";
import { useState } from "react";
import { BookOpen, ArrowUpRight, Search } from "lucide-react";
const domains = [
  {
    name: "Admissions",
    question: "Where do I find admission requirements?",
    source: "Admission requirements & application process",
  },
  {
    name: "Courses",
    question: "Which courses are available?",
    source: "Course catalogue & programme structure",
  },
  {
    name: "Departments",
    question: "Where can I explore the departments?",
    source: "Academic departments & programme information",
  },
  {
    name: "Fees",
    question: "Where do I find fee information?",
    source: "Fee structure & payment policies",
  },
  {
    name: "Policies",
    question: "Where can I read academic policies?",
    source: "Academic regulations & student policies",
  },
];
export function CampusScene() {
  const [active, setActive] = useState(0);
  const item = domains[active];
  return (
    <div className="story-scene campus-scene">
      <Image
        src="/images/projects/campus.webp"
        alt="Original illustration of a fictional university campus with a library, courtyard and academic buildings"
        fill
        sizes="(max-width: 760px) 100vw, 1200px"
        className="campus-landscape"
      />
      <div className="campus-vignette" />
      <div className="scene-topline">
        <span>UNIGUIDE / CAMPUS KNOWLEDGE</span>
        <span>ILLUSTRATIVE CAMPUS</span>
      </div>
      <div className="campus-heading">
        <span className="instrument-label">A CAMPUS FULL OF ANSWERS.</span>
        <h4>
          Find your way.
          <br />
          Find your answer.
        </h4>
        <p>University information, connected.</p>
      </div>
      <div className="campus-documents">
        {domains.map((d, i) => (
          <button
            key={d.name}
            className={"campus-document " + (i === active ? "is-active" : "")}
            aria-pressed={active === i}
            onClick={() => setActive(i)}
          >
            <BookOpen size={16} />
            <span>
              <small>KNOWLEDGE / 0{i + 1}</small>
              {d.name}
            </span>
            <i />
          </button>
        ))}
      </div>
      <div className="student-workspace glass-instrument">
        <span className="instrument-label">
          <Search size={13} /> STUDENT QUESTION
        </span>
        <p className="student-question">{item.question}</p>
        <div className="campus-retrieval" key={active}>
          <span>RETRIEVING / {item.name.toUpperCase()}</span>
          <i />
        </div>
        <span className="instrument-label">SOURCE CONTEXT</span>
        <p className="campus-source">
          <BookOpen size={16} />
          {item.source}
        </p>
        <div className="campus-answer" aria-live="polite">
          <span>GROUNDED RESPONSE</span>
          <p>
            The assistant retrieves relevant {item.name.toLowerCase()} documents
            before preparing an answer.
          </p>
        </div>
        <small>
          Demonstration of the retrieval flow.
          <br />
          No university policy or fee is invented.
        </small>
      </div>
      <span className="scene-caption">
        <ArrowUpRight size={13} /> Semantic retrieval / context-aware answers
      </span>
    </div>
  );
}
