"use client";
import { useState } from "react";
import { imagingSteps } from "../../data/system-visuals";
export function BrainVolume() {
  return (
    <svg
      viewBox="0 0 250 260"
      className="brain-volume"
      role="img"
      aria-label="Abstract illustration of a brain-imaging volume, not patient data"
    >
      <defs>
        <linearGradient id="volume-gradient" x1="0" x2="1">
          <stop stopColor="#a390d9" stopOpacity=".13" />
          <stop offset="1" stopColor="#7bcbd9" stopOpacity=".5" />
        </linearGradient>
      </defs>
      <path
        d="M125 28C84 14 55 44 52 72C25 96 29 135 48 152C39 184 68 213 94 212L109 236H140L154 209C186 213 211 179 201 153C224 119 211 89 191 73C190 36 155 15 125 28Z"
        fill="url(#volume-gradient)"
        stroke="#a898d0"
      />
      {Array.from({ length: 9 }, (_, i) => (
        <ellipse
          key={i}
          cx="125"
          cy={55 + i * 19}
          rx={30 + Math.sin((i / 9) * Math.PI) * 55}
          ry="12"
          fill="none"
          stroke="#b4a4d7"
          strokeOpacity=".35"
        />
      ))}
      <path
        d="M125 30C105 69 141 94 120 128S147 180 128 225M76 55C61 100 81 141 70 182M171 51C185 94 164 146 180 180"
        fill="none"
        stroke="#b4a4d7"
        strokeOpacity=".4"
      />
      <path
        className="volume-scan"
        d="M36 120H214"
        stroke="#9de1eb"
        strokeWidth="2"
      />
      <path
        d="M20 30V12H40M210 12H230V30M20 230V248H40M210 248H230V230"
        fill="none"
        stroke="#9de1eb"
        strokeOpacity=".5"
      />
    </svg>
  );
}
export function ResearchPipeline({
  publication = false,
}: {
  publication?: boolean;
}) {
  const [active, setActive] = useState(0);
  if (publication) {
    const steps = [
      "Retinal image input",
      "Normalization",
      "Feature learning",
      "Regularization",
      "Classification",
      "Evaluation",
    ];
    return (
      <div className="publication-pipeline">
        <div className="retinal-field" aria-hidden="true">
          <svg viewBox="0 0 220 220">
            <defs>
              <radialGradient id="retina-light">
                <stop stopColor="#b28cbb" stopOpacity=".3" />
                <stop offset="1" stopColor="#1c1528" />
              </radialGradient>
            </defs>
            <circle
              cx="110"
              cy="110"
              r="89"
              fill="url(#retina-light)"
              stroke="#b89dda"
              strokeOpacity=".35"
            />
            <g fill="none" stroke="#b9a0df" strokeOpacity=".45">
              {[
                "M75 105Q120 40 170 58",
                "M75 105Q125 85 179 114",
                "M75 105Q120 165 171 170",
                "M75 105Q58 57 55 40",
                "M75 105Q30 141 57 179",
                "M120 63L132 35M131 89L155 76M127 150L139 187",
              ].map((d) => (
                <path d={d} key={d} />
              ))}
            </g>
            <circle cx="75" cy="105" r="11" fill="#bcb0d155" />
          </svg>
          <span>ABSTRACT INPUT STUDY</span>
        </div>
        <div className="paper-methods">
          {steps.map((step, i) => (
            <button
              key={step}
              className={active === i ? "is-active" : ""}
              aria-pressed={active === i}
              onClick={() => setActive(i)}
              onFocus={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
            >
              <span>0{i + 1}</span>
              {step}
              <i aria-hidden="true" />
            </button>
          ))}
        </div>
        <div className="publication-result">
          <span className="micro-label">REPORTED TEST ACCURACY</span>
          <strong>
            98.91<span>%</span>
          </strong>
          <p>APTOS / five-class classification</p>
          <small>
            Reported in the supplied CV.
            <br />
            Research result, not clinical validation.
          </small>
        </div>
      </div>
    );
  }
  return (
    <div className="imaging-laboratory">
      <div className="imaging-volume">
        <span className="micro-label">01 / 3D INPUT VOLUME</span>
        <BrainVolume />
        <small>Abstract illustration · no patient data</small>
      </div>
      <div className="plane-laboratory">
        <span className="micro-label">02 / COMPLEMENTARY VIEWS</span>
        <div className="separated-planes" aria-hidden="true">
          {["Axial", "Coronal", "Sagittal"].map((label, i) => (
            <div className={"scan-plane plane-" + i} key={label}>
              <div>
                <i />
                <i />
                <i />
              </div>
              <span>{label}</span>
            </div>
          ))}
        </div>
        <div className="plane-legend" aria-label="Illustrative imaging planes">
          {["Axial", "Coronal", "Sagittal"].map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>
        <small>Conceptual plane study; not a model output</small>
      </div>
      <div className="imaging-method">
        <span className="micro-label">03 / RESEARCH WORKFLOW</span>
        {imagingSteps.map((step, i) => (
          <button
            key={step.name}
            className={active === i ? "is-active" : ""}
            aria-pressed={active === i}
            onClick={() => setActive(i)}
            onFocus={() => setActive(i)}
            onMouseEnter={() => setActive(i)}
          >
            <span>0{i + 1}</span>
            {step.name}
            <i aria-hidden="true" />
          </button>
        ))}
      </div>
      <div className="system-inspector">
        <span>RESEARCH / {imagingSteps[active].name}</span>
        <p aria-live="polite">{imagingSteps[active].detail}</p>
      </div>
    </div>
  );
}
