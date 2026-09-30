import { NextRequest, NextResponse } from "next/server";
import { createHash } from "node:crypto";
import { validateContact, contactEmail } from "../../../lib/contact";
import { siteUrl } from "../../../lib/site";
export const runtime = "nodejs";
const attempts = new Map<
  string,
  {
    count: number;
    expires: number;
  }
>();
const json = (error: string, status: number) =>
  NextResponse.json(
    { error },
    { status, headers: { "Cache-Control": "no-store" } },
  );
export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (
    origin &&
    origin !== request.nextUrl.origin &&
    origin !== new URL(siteUrl).origin
  )
    return json("Invalid request origin.", 403);
  if (!request.headers.get("content-type")?.includes("application/json"))
    return json("Please submit a JSON message.", 415);
  if (Number(request.headers.get("content-length")) > 24000)
    return json("Message is too large.", 413);
  let data: unknown;
  try {
    const reader = request.body?.getReader();
    if (!reader) return json("Invalid message.", 400);
    const chunks: Uint8Array[] = [];
    let length = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > 24000) {
        await reader.cancel();
        return json("Message is too large.", 413);
      }
      chunks.push(value);
    }
    data = JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    return json("Invalid message.", 400);
  }
  const { values, error } = validateContact(data);
  if (!values) return json(error || "Invalid message.", 400);
  // Best-effort per-instance guard; messages are never stored. Configure a shared
  // limiter or Vercel Firewall for distributed abuse protection at higher traffic.
  const now = Date.now();
  for (const [key, value] of attempts)
    if (value.expires < now) attempts.delete(key);
  const ip =
    request.headers.get("x-vercel-forwarded-for") ||
    request.headers.get("x-forwarded-for") ||
    "local";
  const key = createHash("sha256")
    .update(ip.split(",")[0].trim())
    .digest("hex");
  const record = attempts.get(key) || { count: 0, expires: now + 600000 };
  if (record.count >= 5)
    return NextResponse.json(
      {
        error:
          "Too many attempts. Please wait a few minutes or email directly.",
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil((record.expires - now) / 1000)),
          "Cache-Control": "no-store",
        },
      },
    );
  if (attempts.size >= 2000 && !attempts.has(key))
    return json("Please try again shortly or email directly.", 429);
  record.count++;
  attempts.set(key, record);
  const recipient = process.env.CONTACT_TO || process.env.CONTACT_EMAIL;
  if (!process.env.RESEND_API_KEY || !process.env.CONTACT_FROM || !recipient)
    return json(
      "Message delivery is currently unavailable. Please email azqajafar@gmail.com directly.",
      503,
    );
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM,
        to: [recipient],
        ...contactEmail(values, new Date().toISOString()),
      }),
      signal: AbortSignal.timeout(12000),
    });
    const result = await response.json();
    if (!response.ok || typeof result.id !== "string" || !result.id)
      throw new Error("Provider rejected message");
    return NextResponse.json(
      { success: true, id: result.id },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return json(
      "Could not send your message. Please try again or email azqajafar@gmail.com directly.",
      502,
    );
  }
}
