import { NextRequest, NextResponse } from 'next/server';
export async function POST(request: NextRequest) {
  const origin = request.headers.get('origin');
  if (origin && origin !== request.nextUrl.origin && origin !== process.env.NEXT_PUBLIC_SITE_URL) return NextResponse.json({ error: 'Invalid request origin.' }, { status: 403 });
  const raw = await request.text();
  if (raw.length > 16000) return NextResponse.json({ error: 'Message is too large.' }, { status: 413 });
  let data: Record<string, unknown>;
  try { data = JSON.parse(raw); if (!data || typeof data !== 'object') throw new Error(); } catch { return NextResponse.json({ error: 'Invalid message.' }, { status: 400 }); }
  if (data.website) return NextResponse.json({ error: 'Unable to submit this message.' }, { status: 400 });
  const values = ['name', 'email', 'subject', 'message'].map(key => typeof data[key] === 'string' ? (data[key] as string).trim() : '');
  const [name, email, subject, message] = values;
  if (name.length < 2 || name.length > 100 || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || /[\r\n]/.test(email + subject) || subject.length < 3 || subject.length > 160 || message.length < 10 || message.length > 5000) return NextResponse.json({ error: 'Please provide a valid name, email, subject, and message.' }, { status: 400 });
  if (!process.env.RESEND_API_KEY || !process.env.CONTACT_FROM || !process.env.CONTACT_TO) return NextResponse.json({ error: 'Message delivery is currently unavailable. Please email azqajafar@gmail.com directly.' }, { status: 503 });
  try {
    const response = await fetch('https://api.resend.com/emails', { method: 'POST', headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ from: process.env.CONTACT_FROM, to: [process.env.CONTACT_TO], reply_to: email, subject: `Portfolio: ${subject}`, text: `From: ${name} <${email}>\n\n${message}` }), signal: AbortSignal.timeout(10000) });
    if (!response.ok) throw new Error('Delivery failed');
    return NextResponse.json({ success: true });
  } catch { return NextResponse.json({ error: 'Message delivery failed. Please try again or email azqajafar@gmail.com.' }, { status: 502 }); }
}
