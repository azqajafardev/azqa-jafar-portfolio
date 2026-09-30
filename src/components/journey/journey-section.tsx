
import { Reveal } from '../motion';


import { experience } from '../../data/portfolio';

function Label({ children }: { children: React.ReactNode }) { return <div className="kicker"><span/>{children}</div>; }
export function JourneySection(){ return <section id="experience" className="section shell"><Label>06 / ENGINEERING JOURNEY</Label><h2>Engineering in practice.</h2><div className="timeline">{experience.map(job => <Reveal key={job.company}><article className="job"><div className="job-body"><h3>{job.role}</h3><p className="company">{job.company}</p><ul>{job.bullets.map(bullet => <li key={bullet}>{bullet}</li>)}</ul><div className="tags">{job.tech.map(tech => <span key={tech}>{tech}</span>)}</div></div><p className="job-date">{job.date}</p></article></Reveal>)}</div></section>; }
