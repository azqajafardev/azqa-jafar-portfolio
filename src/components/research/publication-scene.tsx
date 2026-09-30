"use client";
import Image from "next/image";
import { useState } from "react";
const steps = [
  "Input image",
  "Normalization",
  "Feature learning",
  "Regularization",
  "Classification",
  "Evaluation",
];
const notes = [
  "Illustrative retinal input; not a patient image or training sample.",
  "Stability-driven normalization prepares the representation.",
  "Hierarchical feature learning builds a richer visual representation.",
  "Regularization supports robust learning.",
  "The research studies five-class diabetic retinopathy grading.",
  "Reported test accuracy: 98.91%, as documented in the supplied CV.",
];
export function PublicationScene() {
  const [active, setActive] = useState(0);
  return (
    <div className="story-scene fundus-scene">
      <div className="scene-topline">
        <span>RETINAL IMAGING / HIERARCHICAL DEEP LEARNING</span>
        <span>ILLUSTRATIVE VISUAL</span>
      </div>
      <div className="fundus-workspace">
        <div className="fundus-image">
          <Image
            src="/images/projects/retina.webp"
            alt="Original synthetic fundus illustration showing retinal vessels and optic disc; not patient data"
            width={800}
            height={800}
            sizes="(max-width:760px) 90vw, 500px"
          />
          <div className="retina-scan-line" />
          <span>INPUT / RETINAL FIELD</span>
          <div
            className={"feature-samples " + (active >= 2 ? "is-active" : "")}
            aria-hidden="true"
          >
            {[0, 1, 2].map((i) => (
              <div key={i}>
                <Image
                  src="/images/projects/retina.webp"
                  alt=""
                  width={100}
                  height={100}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="fundus-methods">
          <span className="instrument-label">FOLLOW THE METHOD</span>
          {steps.map((s, i) => (
            <button
              key={s}
              aria-pressed={active === i}
              className={active === i ? "is-active" : ""}
              onClick={() => setActive(i)}
            >
              <span>0{i + 1}</span>
              {s}
              <i />
            </button>
          ))}
          <p aria-live="polite">{notes[active]}</p>
        </div>
        <div className="fundus-result">
          <span className="instrument-label">REPORTED RESULT</span>
          <strong>
            98.91<span>%</span>
          </strong>
          <h4>Test accuracy.</h4>
          <p>
            APTOS
            <br />
            Five-class classification
          </p>
          <small>
            Reported in the supplied CV.
            <br />
            Research result, not clinical validation.
          </small>
        </div>
      </div>
    </div>
  );
}
