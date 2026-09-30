"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Download, Menu, X } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

const target = (name: string) =>
  name === "Systems"
    ? "projects"
    : name === "Journey"
      ? "experience"
      : name === "Recognition"
        ? "achievements"
        : name.toLowerCase();
const sections = ["About", "Systems", "Research", "Journey", "Recognition"];
export function Navigation() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-15% 0px -65% 0px" },
    );
    sections.forEach((s) => {
      const node = document.getElementById(target(s));
      if (node) observer.observe(node);
    });
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    function escape(event: KeyboardEvent) {
      if (event.key === "Escape" && open) {
        setOpen(false);
        toggle.current?.focus();
      }
    }
    document.addEventListener("keydown", escape);
    return () => document.removeEventListener("keydown", escape);
  }, [open]);
  return (
    <header className="site-header">
      <nav className="nav-shell" aria-label="Main navigation">
        <Link className="brand" href="/#home" aria-label="Azqa Jafar home">
          AZQA<span>.</span>
        </Link>
        <div
          id="navigation-links"
          className={`navlinks ${open ? "is-open" : ""}`}
        >
          {sections.map((section) => (
            <a
              key={section}
              href={`/#${target(section)}`}
              aria-current={active === target(section) ? "location" : undefined}
              onClick={() => setOpen(false)}
            >
              {section}
            </a>
          ))}
        </div>
        <div className="nav-actions">
          <ThemeToggle />
          <a
            className="miniBtn"
            href="/Azqa_Jafar_CV.pdf"
            download
            aria-label="Download CV"
          >
            <Download size={15} />
            <span>CV</span>
          </a>
          <Link
            className="nav-hire"
            href="/#contact"
            onClick={() => setOpen(false)}
          >
            Hire me
          </Link>
          <button
            ref={toggle}
            className="menu-button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="navigation-links"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </nav>
    </header>
  );
}
