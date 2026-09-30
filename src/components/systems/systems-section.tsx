import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Reveal } from '../motion';
import { Architecture } from '../architecture';

import { projects } from '../../data/portfolio';

function Label({ children }: { children: React.ReactNode }) { return <div className="kicker"><span/>{children}</div>; }
export function SystemsSection(){ return <section id="projects" className="section shell projects"><div className="section-heading"><div><Label>04 / SELECTED AI SYSTEMS</Label><h2>Built to retrieve.<br/>Designed to <em>reason.</em></h2></div><p>A curated collection spanning agentic workflows, retrieval, intelligent monitoring, and deep-learning research.</p></div>{projects.map((project, index) => <Reveal key={project.slug}><article className={'project project-' + index}><div className="project-copy"><div className="project-index">0{index + 1}<span> / {project.category}</span></div><h3>{project.title}</h3><p>{project.description}</p><div className="tags">{project.tech.slice(0, 6).map(tech => <span key={tech}>{tech}</span>)}</div><Link className="text-link" href={'/projects/' + project.slug}>Explore the system <ArrowUpRight size={17}/></Link></div><Architecture project={project} index={index}/></article></Reveal>)}</section>; }
