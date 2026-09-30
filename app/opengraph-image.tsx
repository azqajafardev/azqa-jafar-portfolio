import { ImageResponse } from 'next/og';
export const alt = 'Azqa Jafar — AI & ML Engineer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export default function Image() { return new ImageResponse(<div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 80, background: '#090b13', color: '#f1efff', fontFamily: 'sans-serif' }}><div style={{ color: '#b8a0ff', fontSize: 24, letterSpacing: 6 }}>AZQA JAFAR / AI & ML ENGINEER</div><div style={{ fontSize: 94, letterSpacing: -5, marginTop: 40 }}>Intelligence, engineered.</div><div style={{ display: 'flex', fontSize: 28, marginTop: 40, color: '#aeb3c9' }}>Generative AI · Agentic RAG · AI Agents · Applied Research</div></div>, size); }
