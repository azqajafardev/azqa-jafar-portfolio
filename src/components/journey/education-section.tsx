import { GraduationCap, Award } from 'lucide-react';
import { Reveal } from '../motion';




function Label({ children }: { children: React.ReactNode }) { return <div className="kicker"><span/>{children}</div>; }
export function EducationSection(){ return <section id="achievements" className="section shell"><Label>06 / EDUCATION & RECOGNITION</Label><h2>A foundation in <em>excellence.</em></h2><div className="recognition-grid"><Reveal className="education-card"><GraduationCap size={28}/><span className="card-eyebrow">UNIVERSITY OF OKARA · 2022–2026</span><h3>BS Software <br/>Engineering</h3><p className="grade">3.89 <span>/ 4.00 CGPA</span></p><p>Software engineering, databases, software quality, application development, and AI/ML.</p><div className="prior-education"><strong>Intermediate · ICS Physics</strong><span>2020–2022 · 950 / 1100 marks</span></div></Reveal><div className="awards"><Reveal className="award-card"><Award/><div><span className="card-eyebrow">ACADEMIC MERIT</span><h3>Prime Minister’s Youth<br/>Laptop Scheme — Phase I</h3><p>Selected on the basis of academic merit and eligibility during undergraduate studies.</p></div></Reveal><Reveal className="award-card"><Award/><div><span className="card-eyebrow">MERIT SCHOLARSHIP</span><h3>Honhaar Merit-Based<br/>Graduation Scholarship</h3><p>Recognition of academic merit, dedication, and sustained undergraduate performance.</p></div></Reveal></div></div></section>; }
