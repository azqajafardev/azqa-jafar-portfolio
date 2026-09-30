import { ArrowRight } from "lucide-react";
import { Reveal } from "../motion";
export function ProfileSection() {
  return (
    <section id="about" className="section shell about">
      <Reveal>
        <p className="kicker">01 / ENGINEERING PROFILE</p>
        <h2>
          I ENGINEER AI
          <br />
          <em>
            BEYOND THE
            <br />
            PROMPT.
          </em>
        </h2>
      </Reveal>
      <Reveal className="about-copy">
        <p className="lead">
          I’m Azqa, an AI & ML Engineer and Software Engineering graduate
          building retrieval systems, agentic workflows and machine-learning
          applications.
        </p>
        <p>
          From data preparation and model integration to Python APIs and
          user-facing experiences, I connect the parts that make AI useful.
        </p>
        <a className="text-link" href="#experience">
          Explore my experience <ArrowRight size={16} />
        </a>
      </Reveal>
      <div className="capability-grid">
        {[
          ["GENERATIVE AI", "Model integration and practical AI applications."],
          ["AGENTIC SYSTEMS", "Coordinated reasoning, context and tools."],
          ["RETRIEVAL", "Evidence-grounded answers from documents."],
          ["MACHINE LEARNING", "Preparation, training and evaluation."],
        ].map(([title, description], i) => (
          <div key={title}>
            <span>FOCUS / 0{i + 1}</span>
            <h3>{title}</h3>
            <p>{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
