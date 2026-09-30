import { ArrowUpRight, Download, Github, Linkedin } from "lucide-react";
import { Reveal } from "../motion";
import { ContactForm } from "../contact-form";
import { profile } from "../../lib/site";
export function ContactSection() {
  return (
    <section
      id="contact"
      tabIndex={-1}
      className="section shell contact hiring-section"
    >
      <svg
        className="contact-network"
        viewBox="0 0 1000 650"
        aria-hidden="true"
      >
        <g fill="none" stroke="currentColor">
          <path d="M30 100L200 200L400 130L650 250L850 150M200 200L300 430L650 250L780 480L960 530M30 500L300 430L500 600L780 480" />
          {[
            [30, 100],
            [200, 200],
            [400, 130],
            [650, 250],
            [850, 150],
            [300, 430],
            [780, 480],
            [960, 530],
            [30, 500],
            [500, 600],
          ].map(([x, y]) => (
            <circle key={x + "," + y} cx={x} cy={y} r="4" />
          ))}
        </g>
      </svg>
      <Reveal className="contact-copy">
        <p className="kicker">LET’S WORK TOGETHER</p>
        <h2>
          LET’S BUILD
          <br />
          SOMETHING
          <br />
          <em>INTELLIGENT.</em>
        </h2>
        <p>
          For AI engineering opportunities, research collaborations, and useful
          ideas worth building.
        </p>
        <div className="contact-focus">
          {["AI Systems", "RAG", "AI Agents", "ML Engineering", "Research"].map(
            (s) => (
              <span key={s}>{s}</span>
            ),
          )}
        </div>
        <a className="contact-email" href={"mailto:" + profile.email}>
          {profile.email}
          <ArrowUpRight size={19} />
        </a>
        <div className="social">
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
            <Linkedin size={15} />
            LinkedIn
          </a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer">
            <Github size={15} />
            GitHub
          </a>
        </div>
        <a className="text-link" href="/Azqa_Jafar_CV.pdf" download>
          <Download size={15} />
          Download my CV
        </a>
      </Reveal>
      <Reveal>
        <ContactForm />
      </Reveal>
    </section>
  );
}
