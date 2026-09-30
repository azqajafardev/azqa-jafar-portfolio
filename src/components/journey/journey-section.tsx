import { ExperienceLedger } from "./experience-ledger";
export function JourneySection() {
  return (
    <section id="experience" className="section shell journey-section">
      <div className="section-heading">
        <div>
          <p className="kicker">EXPERIENCE / ENGINEERING JOURNEY</p>
          <h2>
            FROM IMPLEMENTATION
            <br />
            <em>TO INTELLIGENCE.</em>
          </h2>
        </div>
        <p>
          Applied engineering across Python, retrieval, agents, and AI
          application backends.
        </p>
      </div>
      <ExperienceLedger />
    </section>
  );
}
