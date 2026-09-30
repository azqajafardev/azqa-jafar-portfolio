import Image from "next/image";
import { ArrowDownRight, Download, Github, Linkedin } from "lucide-react";
import { Reveal } from "../motion";
import { profile } from "../../lib/site";
export function Hero() {
  return (
    <section id="home" className="editorial-hero shell">
      <svg
        className="reasoning-backdrop"
        viewBox="0 0 1000 650"
        aria-hidden="true"
      >
        <g fill="none" stroke="currentColor">
          <path d="M20 130H250L350 240V350L270 450L410 550H780M350 350L500 450L410 550M350 240H760" />
          <circle cx="250" cy="130" r="6" />
          <circle cx="350" cy="240" r="6" />
          <circle cx="350" cy="350" r="6" />
          <circle cx="270" cy="450" r="6" />
          <circle cx="500" cy="450" r="6" />
          <circle cx="410" cy="550" r="6" />
        </g>
        <g fill="currentColor" fontSize="12">
          <text x="160" y="113">
            INPUT
          </text>
          <text x="367" y="232">
            RETRIEVE
          </text>
          <text x="365" y="340">
            CONTEXT / REASON
          </text>
          <text x="195" y="440">
            TOOLS
          </text>
          <text x="515" y="444">
            AGENTS
          </text>
          <text x="430" y="577">
            ACTION
          </text>
        </g>
      </svg>
      <div className="hero-editorial-copy">
        <div className="hero-overline">
          <span>AI / ML ENGINEERING</span>
          <span>GENERATIVE INTELLIGENCE SYSTEMS</span>
        </div>
        <h1 aria-label="Azqa Jafar">
          <span className="text-mask">
            <span>AZQA</span>
          </span>
          <span className="text-mask">
            <span>
              JAFAR<em>.</em>
            </span>
          </span>
        </h1>
        <p className="hero-job">AI & ML ENGINEER</p>
        <h2
          className="kinetic-statement"
          aria-label="I build AI systems that retrieve, reason and act."
        >
          <span>I BUILD AI SYSTEMS</span>
          <span>
            THAT <em>RETRIEVE,</em>
          </span>
          <span>
            <em>REASON</em> AND <em>ACT.</em>
          </span>
        </h2>
        <p className="hero-description">
          Generative AI, agentic RAG, AI agents and machine learning—connected
          through practical Python backends.
        </p>
        <div className="actions">
          <a className="primary magnetic" href="#projects">
            Explore systems <ArrowDownRight size={17} />
          </a>
          <a className="secondary" href="/Azqa_Jafar_CV.pdf" download>
            <Download size={15} />
            Download CV
          </a>
        </div>
        <div className="social">
          <a href={profile.github} target="_blank" rel="noopener noreferrer">
            <Github size={15} />
            GitHub ↗
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
            <Linkedin size={15} />
            LinkedIn ↗
          </a>
        </div>
      </div>
      <Reveal className="hero-portrait-composition">
        <div className="portrait-system-label">
          <span className="status-dot" /> AI SYSTEMS / ACTIVE{" "}
          <small>VISUAL IDENTITY</small>
        </div>
        <div className="editorial-portrait">
          <Image
            src="/images/profile/azqa-jafar.jpeg"
            alt="Azqa Jafar, AI and ML Engineer"
            fill
            priority
            sizes="(max-width: 760px) 90vw, 40vw"
            className="portrait-photo"
          />
          <div className="portrait-vignette" />
          <div className="portrait-nameplate">
            <span>THE ENGINEER BEHIND THE SYSTEMS</span>
            <strong>Azqa Jafar</strong>
            <small>RETRIEVE → REASON → ACT</small>
          </div>
        </div>
        <svg
          className="portrait-network"
          viewBox="0 0 500 600"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M30 145L120 85L405 125L463 265L405 445L300 525L64 460L30 145"
            fill="none"
          />
          <path
            className="portrait-signal"
            d="M30 145L120 85L405 125L463 265L405 445"
            fill="none"
            pathLength="1"
          />
          {[
            [30, 145],
            [405, 125],
            [463, 265],
            [405, 445],
            [64, 460],
          ].map(([x, y]) => (
            <circle key={x + "," + y} cx={x} cy={y} r="4" />
          ))}
        </svg>
        <div className="portrait-label label-rag">
          RAG<span>01 / RETRIEVAL</span>
        </div>
        <div className="portrait-label label-agents">
          AGENTS<span>02 / COORDINATION</span>
        </div>
        <div className="portrait-label label-llm">
          LLMs · MCP<span>03 / REASONING</span>
        </div>
        <div className="portrait-lower">
          <span>PYTHON / FASTAPI / ML</span>
          <span>INTELLIGENCE / SYSTEMS LAB</span>
        </div>
      </Reveal>
    </section>
  );
}
