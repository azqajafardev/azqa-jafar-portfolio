import { ArrowUpRight, Download, Github, Linkedin } from 'lucide-react';
import { Reveal } from '../motion';

import { ContactForm } from '../contact-form';

import { profile } from '../../lib/site';
function Label({ children }: { children: React.ReactNode }) { return <div className="kicker"><span/>{children}</div>; }
export function ContactSection(){ return <section id="contact" className="section shell contact"><Reveal className="contact-copy"><Label>08 / START A CONVERSATION</Label><h2>Let’s build<br/><em>intelligent systems.</em></h2><p>For AI engineering opportunities, research collaborations, or a useful idea worth building.</p><a className="contact-email" href={'mailto:' + profile.email}>{profile.email}<ArrowUpRight size={20}/></a><div className="social"><a href={profile.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin size={16}/> LinkedIn</a><a href={profile.github} target="_blank" rel="noopener noreferrer"><Github size={16}/> GitHub</a></div><a className="text-link" href="/Azqa_Jafar_CV.pdf" download><Download size={15}/> Download my CV</a></Reveal><Reveal><ContactForm/></Reveal></section>; }
