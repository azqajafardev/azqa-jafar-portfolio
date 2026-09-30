import { ArrowUpRight } from "lucide-react";
import { profile } from "../../lib/site";
import { ResearchPipeline } from "../systems/research-pipeline";
import { SystemPanel } from "../systems/system-panel";
export function ResearchSection() {
  return (
    <section id="research" className="section shell published-research">
      <div className="publication-header">
        <div>
          <p className="kicker">RESEARCH / PUBLISHED</p>
          <h2>
            EXPERIMENT.
            <br />
            <em>EVALUATE. ADVANCE.</em>
          </h2>
        </div>
        <div className="publication-stamp">
          <span>
            AIN SHAMS
            <br />
            ENGINEERING JOURNAL
          </span>
          <strong>21 SEP 2026</strong>
        </div>
      </div>
      <SystemPanel
        title="HIERARCHICAL DEEP LEARNING / METHOD STUDY"
        number={5}
        kind="paper-system"
      >
        <ResearchPipeline publication />
      </SystemPanel>
      <div className="publication-description">
        <div>
          <span className="micro-label">PEER-REVIEWED PUBLICATION</span>
          <h3>{profile.paper}</h3>
        </div>
        <div>
          <p>
            A hierarchical deep-learning framework for five-class diabetic
            retinopathy grading, with stability-driven normalization,
            regularization, and refined feature aggregation.
          </p>
          <p className="publication-source">
            Method summary and reported result follow the supplied CV. Input
            artwork is abstract.
          </p>
          <a
            className="system-cta"
            href={profile.publication}
            target="_blank"
            rel="noopener noreferrer"
          >
            Read paper <ArrowUpRight size={17} />
          </a>
        </div>
      </div>
    </section>
  );
}
