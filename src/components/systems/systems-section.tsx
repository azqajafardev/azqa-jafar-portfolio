import Link from "next/link";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Reveal } from "../motion";
import { projects } from "../../data/portfolio";
import { systemPresentation } from "../../data/system-visuals";
import { SystemIndex } from "./system-index";
import { ProjectSystem } from "./project-system";
export function SystemsSection() {
  return (
    <section id="projects" className="systems-section shell">
      <div className="section-heading systems-heading">
        <div>
          <p className="kicker">SELECTED WORK / AI SYSTEMS</p>
          <h2>
            INSIDE THE
            <br />
            <em>INTELLIGENCE.</em>
          </h2>
        </div>
        <p>
          Five systems. Five different ways to turn information into something
          useful.
          <br />
          <span>Explore the architecture. Follow the reasoning.</span>
        </p>
      </div>
      <SystemIndex />
      {projects.map((project, index) => {
        const meta = systemPresentation[index];
        return (
          <article
            key={project.slug}
            id={"system-" + project.slug}
            tabIndex={-1}
            data-system-index={index}
            className={"project-system project-system-" + index}
          >
            <Reveal className="system-heading">
              <div className="system-number">0{index + 1}</div>
              <div>
                <p className="micro-label">{meta.category}</p>
                <h3>{meta.name}</h3>
                <p>{meta.subtitle}</p>
              </div>
              <span className="system-heading-mark" aria-hidden="true">
                ↗
              </span>
            </Reveal>
            <ProjectSystem index={index} />
            <div className="system-summary">
              <div>
                <p>{project.description}</p>
                <div className="system-tech">
                  {project.tech.slice(0, index === 1 ? 10 : 8).map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
              </div>
              <Link className="system-cta" href={"/projects/" + project.slug}>
                Explore system <ArrowUpRight size={18} />
              </Link>
            </div>
            {index < projects.length - 1 && (
              <a
                className="next-system"
                href={"#system-" + projects[index + 1].slug}
              >
                <span>NEXT SYSTEM</span>
                <strong>
                  0{index + 2} / {systemPresentation[index + 1].label}
                </strong>
                <ArrowDownRight size={17} />
              </a>
            )}
          </article>
        );
      })}
    </section>
  );
}
