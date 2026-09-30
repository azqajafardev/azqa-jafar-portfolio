import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { siteUrl } from '../lib/site';
import './globals.css';
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl), title: { default: 'Azqa Jafar — AI & ML Engineer | Generative AI, RAG & AI Agents', template: '%s | Azqa Jafar' },
  description: 'Azqa Jafar, AI & ML Engineer building generative AI applications, agentic RAG, multi-agent systems, machine-learning workflows, and Python backends. Explore projects and published research.',
  alternates: { canonical: '/' }, openGraph: { type: 'website', locale: 'en_US', url: siteUrl, siteName: 'Azqa Jafar', title: 'Azqa Jafar — AI & ML Engineer', description: 'Intelligent Systems Lab. Generative AI, agentic RAG, AI agents, and applied research.', images: ['/opengraph-image'] }, twitter: { card: 'summary_large_image', title: 'Azqa Jafar — AI & ML Engineer', images: ['/opengraph-image'] }, robots: { index: true, follow: true }, verification: { google: process.env.GOOGLE_SITE_VERIFICATION },
};
export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="en"><body className={inter.variable + ' ' + mono.variable}><a className="skip-link" href="#main-content">Skip to content</a>{children}</body></html>; }
