"use client";
import { useEffect, useState } from "react";
import { projects } from "../../data/portfolio";
import { systemPresentation } from "../../data/system-visuals";
export function SystemIndex() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting)
            setActive(
              Number((entry.target as HTMLElement).dataset.systemIndex),
            );
        });
      },
      { rootMargin: "-15% 0px -45% 0px" },
    );
    document
      .querySelectorAll("[data-system-index]")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return (
    <div className="systems-index">
      <div className="index-metadata">
        <span>SYSTEMS / INDEX</span>
        <span>05 SELECTED SYSTEMS</span>
        <span>04 AI DOMAINS</span>
        <span>ARCHITECTURE MODE</span>
      </div>
      <nav className="system-selector" aria-label="Selected systems">
        {systemPresentation.map((item, i) => (
          <a
            key={item.label}
            href={"#system-" + projects[i].slug}
            aria-current={active === i ? "location" : undefined}
            onClick={() => {
              setActive(i);
              document
                .getElementById("system-" + projects[i].slug)
                ?.focus({ preventScroll: true });
            }}
          >
            <span>0{i + 1}</span>
            <strong>{item.label}</strong>
            <i aria-hidden="true">↘</i>
          </a>
        ))}
      </nav>
    </div>
  );
}
