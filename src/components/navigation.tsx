'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Download, Github, Linkedin, Menu, X } from 'lucide-react';
import { profile } from '../lib/site';
const target = (name: string) => name === 'Systems' ? 'projects' : name === 'Journey' ? 'experience' : name.toLowerCase();
const sections = ['About', 'Expertise', 'Systems', 'Research', 'Journey', 'Contact'];
export function Navigation() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
    }, { rootMargin: '-15% 0px -65% 0px' });
    sections.forEach(s => { const node = document.getElementById(target(s)); if (node) observer.observe(node); });
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    function escape(event: KeyboardEvent) { if (event.key === 'Escape' && open) { setOpen(false); toggle.current?.focus(); } }
    document.addEventListener('keydown', escape);
    return () => document.removeEventListener('keydown', escape);
  }, [open]);
  return <header className="site-header"><nav className="nav-shell" aria-label="Main navigation">
    <Link className="brand" href="/#home" aria-label="Azqa Jafar home">AZQA<span>.</span></Link>
    <div id="navigation-links" className={`navlinks ${open ? 'is-open' : ''}`}>{sections.map(section => <a key={section} href={`/#${target(section)}`} aria-current={active === target(section) ? 'location' : undefined} onClick={() => setOpen(false)}>{section}</a>)}</div>
    <div className="nav-actions"><a className="icon-link" href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github size={17}/></a><a className="icon-link" href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin size={17}/></a><a className="miniBtn" href="/Azqa_Jafar_CV.pdf" download><Download size={15}/><span>CV</span></a><button ref={toggle} className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="navigation-links" aria-label={open ? 'Close menu' : 'Open menu'}>{open ? <X/> : <Menu/>}</button></div>
  </nav></header>;
}
