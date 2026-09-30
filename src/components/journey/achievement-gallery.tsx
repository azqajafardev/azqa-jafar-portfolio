"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Expand, X } from "lucide-react";
import { milestones } from "../../data/milestones";
import { Reveal } from "../motion";
type Milestone = (typeof milestones)[number];
export function AchievementFeature({
  item,
  index,
  onOpen,
}: {
  item: Milestone;
  index: number;
  onOpen: (index: number) => void;
}) {
  return (
    <Reveal className={"achievement-feature achievement-" + index}>
      <button
        className="milestone-photo"
        onClick={() => onOpen(index)}
        aria-label={"View photograph: " + item.title}
      >
        <Image
          src={item.image}
          alt={item.alt}
          fill
          sizes="(max-width: 760px) 90vw, 60vw"
          className="milestone-image"
        />
        <span className="photo-corner" aria-hidden="true" />
        <span className="photo-expand">
          <Expand size={16} />
          <span>VIEW PHOTOGRAPH</span>
        </span>
        <span className="photo-index">DOCUMENTED / 0{index + 1}</span>
      </button>
      <div className="milestone-copy">
        <p className="micro-label">
          {item.number} / {item.category}
        </p>
        <h3>{item.title}</h3>
        <span className="milestone-subtitle">{item.subtitle}</span>
        <p>{item.description}</p>
        <span className="milestone-category">
          <i />
          {item.label}
        </span>
      </div>
    </Reveal>
  );
}
export function AchievementGallery() {
  const [selected, setSelected] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLElement | null>(null);
  useEffect(() => {
    if (selected !== null && !dialog.current?.open) dialog.current?.showModal();
  }, [selected]);
  function open(index: number) {
    trigger.current = document.activeElement as HTMLElement;
    setSelected(index);
  }
  function close() {
    dialog.current?.close();
    setSelected(null);
    trigger.current?.focus();
  }
  function change(direction: number) {
    setSelected((value) =>
      value === null
        ? 0
        : (value + direction + milestones.length) % milestones.length,
    );
  }
  const item = selected === null ? null : milestones[selected];
  return (
    <>
      <div className="milestone-features">
        {milestones.map((milestone, index) => (
          <AchievementFeature
            key={milestone.id}
            item={milestone}
            index={index}
            onOpen={open}
          />
        ))}
      </div>
      <dialog
        ref={dialog}
        className="achievement-lightbox"
        aria-labelledby="lightbox-title"
        onCancel={(event) => {
          event.preventDefault();
          close();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") change(1);
          if (event.key === "ArrowLeft") change(-1);
        }}
      >
        <button
          className="lightbox-close"
          onClick={close}
          aria-label="Close photograph"
        >
          <X size={22} />
        </button>
        {item && (
          <div className="lightbox-content">
            <div className="lightbox-image">
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="90vw"
                style={{ objectFit: "contain" }}
              />
            </div>
            <div className="lightbox-caption">
              <div>
                <p className="micro-label">RECOGNITION / {item.number}</p>
                <h3 id="lightbox-title">{item.title}</h3>
                <p>{item.caption}</p>
              </div>
              <div className="lightbox-controls">
                <button
                  onClick={() => change(-1)}
                  aria-label="Previous photograph"
                >
                  <ArrowLeft size={20} />
                </button>
                <span>
                  {(selected ?? 0) + 1} / {milestones.length}
                </span>
                <button onClick={() => change(1)} aria-label="Next photograph">
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
