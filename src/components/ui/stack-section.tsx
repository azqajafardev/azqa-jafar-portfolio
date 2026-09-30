
import { Reveal } from '../motion';


import { expertise } from '../../data/portfolio';

function Label({ children }: { children: React.ReactNode }) { return <div className="kicker"><span/>{children}</div>; }
export function StackSection(){ return <section id="expertise" className="section shell"><div className="section-heading"><div><Label>03 / AI ENGINEERING STACK</Label><h2>Connected capabilities.<br/><em>A practical toolkit.</em></h2></div><p>Connected capabilities, from the first embedding to the application layer.</p></div><div className="skill-grid">{expertise.map(([title, ...skills], i) => <Reveal className="skill" key={title}><span className="skill-number">0{i + 1}</span><h3>{title}</h3><div className="tags">{skills.map(skill => <span key={skill}>{skill}</span>)}</div></Reveal>)}</div></section>; }
