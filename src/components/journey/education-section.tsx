import { AchievementGallery } from "./achievement-gallery";
export function EducationSection() {
  return (
    <section id="achievements" className="section shell recognition-section">
      <div className="section-heading">
        <div>
          <p className="kicker">RECOGNITION / MILESTONES</p>
          <h2>
            MILESTONES THAT
            <br />
            <em>MARK THE JOURNEY.</em>
          </h2>
        </div>
        <p>
          Academic merit, documented.
          <br />
          The people and moments behind the work.
        </p>
      </div>
      <AchievementGallery />
      <div className="academic-ledger">
        <div>
          <span className="micro-label">ACADEMIC FOUNDATION / 2022 — 2026</span>
          <h3>BS Software Engineering</h3>
          <p>University of Okara</p>
        </div>
        <div className="academic-grade">
          <strong>
            3.89<span>/ 4.00</span>
          </strong>
          <span>CGPA</span>
        </div>
        <div className="academic-prior">
          <span className="micro-label">2020 — 2022</span>
          <h4>Intermediate · ICS Physics</h4>
          <p>950 / 1100 marks</p>
        </div>
      </div>
    </section>
  );
}
