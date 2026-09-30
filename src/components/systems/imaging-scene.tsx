"use client";
import Image from "next/image";
import { useState } from "react";
import { Layers, ScanLine } from "lucide-react";
const planes = [
  { name: "Axial", description: "Top-down anatomical plane" },
  { name: "Coronal", description: "Front-facing anatomical plane" },
  { name: "Sagittal", description: "Side anatomical plane" },
];
export function ImagingScene() {
  const [selected, setSelected] = useState(0);
  return (
    <div className="story-scene medical-scene">
      <div className="scene-topline">
        <span>MPAFNET / MULTI-PLANE IMAGING</span>
        <span>FINAL YEAR RESEARCH PROJECT</span>
      </div>
      <div className="medical-intro">
        <div>
          <span className="instrument-label">
            ONE VOLUME. COMPLEMENTARY PERSPECTIVES.
          </span>
          <h4>
            Read between
            <br />
            the planes.
          </h4>
          <p>
            Multi-plane feature learning for
            <br />
            Alzheimer’s classification research.
          </p>
        </div>
        <div className="brain-stage">
          <Image
            src="/images/projects/brain-volume.webp"
            alt="Synthetic three-dimensional brain illustration showing cerebral folds and tomography layers"
            width={800}
            height={800}
            sizes="(max-width: 760px) 75vw, 380px"
          />
          <div className="volume-scan-line" />
          <span>3D INPUT VOLUME / ILLUSTRATION</span>
        </div>
        <div className="volume-note">
          <Layers size={23} />
          <span>
            VOLUME
            <br />↓<br />
            PLANES
            <br />↓<br />
            FEATURES
          </span>
        </div>
      </div>
      <div className="mri-plane-grid">
        {planes.map((plane, i) => (
          <button
            key={plane.name}
            className={"mri-plane " + (selected === i ? "is-selected" : "")}
            aria-pressed={selected === i}
            onClick={() => setSelected(i)}
            onMouseEnter={() => setSelected(i)}
            onFocus={() => setSelected(i)}
          >
            <span className="plane-topline">
              <b>
                0{i + 1} / {plane.name.toUpperCase()}
              </b>
              <ScanLine size={15} />
            </span>
            <div className="mri-image">
              <Image
                src={
                  "/images/projects/mri-" + plane.name.toLowerCase() + ".webp"
                }
                alt={
                  "Original synthetic MRI-style " +
                  plane.name.toLowerCase() +
                  " brain cross-section; illustrative, not patient data"
                }
                width={720}
                height={720}
                sizes="(max-width: 760px) 80vw, 380px"
              />
              <i />
            </div>
            <span className="plane-description">{plane.description}</span>
          </button>
        ))}
      </div>
      <div className="plane-convergence" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <div className="medical-featureflow">
        <span>MULTI-PLANE FEATURE EXTRACTION</span>
        <i>→</i>
        <strong>MPAFNET</strong>
        <i>→</i>
        <span>CLASSIFICATION</span>
      </div>
      <div className="medical-caption">
        <span>ILLUSTRATIVE VISUAL / NO PATIENT DATA</span>
        <p>
          Conceptual research workflow. Images are not training samples or
          diagnostic outputs.
        </p>
      </div>
    </div>
  );
}
