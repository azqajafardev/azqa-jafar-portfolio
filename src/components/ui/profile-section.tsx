import { capabilities } from '../../data/lab';
import { ArrowRight } from 'lucide-react';
import { Reveal } from '../motion';



function Label({ children }: { children: React.ReactNode }) { return <div className="kicker"><span/>{children}</div>; }
export function ProfileSection(){ return <section id="about" className="section shell about"><Reveal><Label>01 / ENGINEERING PROFILE</Label><h2>AI engineering across<br/><em>retrieval, reasoning<br/>and learning.</em></h2></Reveal><Reveal className="about-copy"><p className="lead">I’m Azqa, a Software Engineering graduate and AI & ML Engineer working across retrieval, agentic workflows, machine learning, and AI-powered backend systems.</p><p>My work connects the full application lifecycle: data preparation, model integration, APIs, testing, and user-facing experiences. I focus on retrieval quality, reliable integrations, and clear implementation.</p><a className="text-link" href="#experience">Explore my experience <ArrowRight size={16}/></a></Reveal><div className="capability-grid">{capabilities.map(([title,description],i)=><div key={title}><span>0{i+1}</span><h3>{title}</h3><p>{description}</p></div>)}</div></section>; }
