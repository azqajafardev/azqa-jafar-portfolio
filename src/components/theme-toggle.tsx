'use client';
import { Moon, Sun } from 'lucide-react';
import { useEffect } from 'react';
export function ThemeToggle() {
  useEffect(() => {
    const query = matchMedia('(prefers-color-scheme: light)');
    const sync = () => {
      let saved: string | null = null;
      try { saved = localStorage.getItem('azqa-theme'); } catch {}
      document.documentElement.dataset.theme = saved === 'light' || saved === 'dark' ? saved : query.matches ? 'light' : 'dark';
    };
    query.addEventListener('change', sync);
    window.addEventListener('storage', sync);
    return () => { query.removeEventListener('change', sync); window.removeEventListener('storage', sync); };
  }, []);
  return <button className="theme-toggle" type="button" aria-label="Toggle light and dark theme" title="Switch light / dark theme" onClick={() => {
    const theme = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('azqa-theme', theme); } catch {}
  }}><Sun className="theme-sun" size={17}/><Moon className="theme-moon" size={17}/></button>;
}
