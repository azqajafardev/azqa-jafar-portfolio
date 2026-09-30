import { Hero } from '../components/hero/hero';
import { EngineeringStrip } from '../components/hero/engineering-strip';
import { Blueprint } from '../components/architecture/blueprint';
import { LabExperience } from '../components/intro/lab-experience';
import { ProfileSection } from '../components/ui/profile-section';
import { StackSection } from '../components/ui/stack-section';
import { SystemsSection } from '../components/systems/systems-section';
import { ResearchSection } from '../components/research/research-section';
import { JourneySection } from '../components/journey/journey-section';
import { EducationSection } from '../components/journey/education-section';
import { ContactSection } from '../components/ui/contact-section';

import { Github, Linkedin, Mail } from 'lucide-react';
import { Navigation } from '../components/navigation';



import { profile, siteUrl } from '../lib/site';
export default function Home() {
  const schema = { '@context': 'https://schema.org', '@graph': [{ '@type': 'Person', '@id': siteUrl + '/#person', name: profile.name, jobTitle: 'AI & ML Engineer', url: siteUrl, image: siteUrl + '/images/azqa-jafar.png', sameAs: [profile.github, profile.linkedin], alumniOf: { '@type': 'CollegeOrUniversity', name: 'University of Okara' }, knowsAbout: ['Generative AI', 'RAG', 'AI Agents', 'Machine Learning', 'AI Backend Engineering'] }, { '@type': 'ScholarlyArticle', headline: profile.paper, url: profile.publication, datePublished: '2026-09-21', author: { '@id': siteUrl + '/#person' }, isPartOf: { '@type': 'Periodical', name: 'Ain Shams Engineering Journal' } }] };
  return <><LabExperience/><Navigation/><main id="main-content"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }}/>
    <Hero/><EngineeringStrip/>
    <ProfileSection/><Blueprint/>
    <StackSection/>
    <SystemsSection/>
    <ResearchSection/>
    <JourneySection/>
    <EducationSection/>
    <ContactSection/>
  </main><footer className="shell"><div><a className="brand" href="#home">AJ<span>.</span></a><p>Azqa Jafar <span> / AI & ML Engineer</span></p></div><span>Designed & built for AI engineering.</span><div className="footer-links"><a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github size={16}/></a><a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin size={16}/></a><a href={'mailto:' + profile.email} aria-label="Email"><Mail size={16}/></a><span>© {new Date().getFullYear()}</span></div></footer></>;
}
