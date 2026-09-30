'use client';
import { useState } from 'react';
import { ArrowUpRight, LoaderCircle } from 'lucide-react';
export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); const form = event.currentTarget; setStatus('loading'); setMessage('');
    try { const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(Object.fromEntries(new FormData(form))) }); const result = await response.json(); if (!response.ok) throw new Error(result.error || 'Unable to send your message. Please try email.'); setStatus('success'); setMessage('Thank you. Your message has been sent.'); form.reset(); }
    catch (error) { setStatus('error'); setMessage(error instanceof Error ? error.message : 'Unable to send. Please contact me by email.'); }
  }
  return <form className="contact-form" onSubmit={submit}><div className="form-row"><label>Name<input name="name" autoComplete="name" required minLength={2} maxLength={100} placeholder="Your name"/></label><label>Email<input name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@company.com"/></label></div><label>Subject<input name="subject" required minLength={3} maxLength={160} placeholder="What would you like to work on?"/></label><label>Message<textarea name="message" required minLength={10} maxLength={5000} rows={5} placeholder="Tell me a little about your project or opportunity."/></label><div className="honeypot" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off"/></label></div><button className="primary" disabled={status === 'loading'} type="submit">{status === 'loading' ? <><LoaderCircle className="spinner" size={16}/> Sending…</> : <>Send message <ArrowUpRight size={16}/></>}</button><p className={`form-status ${status}`} role={status === 'error' ? 'alert' : 'status'}>{message}</p></form>;
}
