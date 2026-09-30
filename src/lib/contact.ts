export const opportunityTypes = [
  "Full-Time Role",
  "AI/ML Opportunity",
  "Research Collaboration",
  "Freelance Project",
  "Other",
] as const;
export type ContactValues = {
  name: string;
  email: string;
  company: string;
  opportunity: string;
  subject: string;
  message: string;
  source: string;
};
export function validateContact(data: unknown): {
  values?: ContactValues;
  error?: string;
} {
  if (!data || typeof data !== "object" || Array.isArray(data))
    return { error: "Invalid message." };
  const input = data as Record<string, unknown>;
  if (input.website) return { error: "Unable to submit this message." };
  const read = (key: string) =>
    typeof input[key] === "string" ? (input[key] as string).trim() : "";
  const values = {
    name: read("name"),
    email: read("email"),
    company: read("company"),
    opportunity: read("opportunity"),
    subject: read("subject"),
    message: read("message"),
    source: read("source") || "/#contact",
  };
  if (
    values.name.length < 2 ||
    values.name.length > 100 ||
    /[\r\n\x00-\x1f]/.test(values.name)
  )
    return { error: "Please enter a name between 2 and 100 characters." };
  if (
    values.email.length > 254 ||
    !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(values.email) ||
    /[\r\n\x00-\x1f]/.test(values.email)
  )
    return { error: "Please enter a valid email address." };
  if (values.company.length > 160 || /[\r\n\x00-\x1f]/.test(values.company))
    return { error: "Please keep the company name under 160 characters." };
  if (!opportunityTypes.some((type) => type === values.opportunity))
    return { error: "Please choose an opportunity type." };
  if (
    values.subject.length < 3 ||
    values.subject.length > 160 ||
    /[\r\n\x00-\x1f]/.test(values.subject)
  )
    return { error: "Please enter a subject between 3 and 160 characters." };
  if (
    values.message.length < 10 ||
    values.message.length > 5000 ||
    /\x00/.test(values.message)
  )
    return { error: "Please enter a message between 10 and 5,000 characters." };
  if (
    values.source.length > 200 ||
    !values.source.startsWith("/") ||
    /[\r\n<>]/.test(values.source)
  )
    return { error: "Invalid page source." };
  return { values };
}
const escapeHtml = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        char
      ]!,
  );
export function contactEmail(values: ContactValues, timestamp: string) {
  const fields = [
    ["Name", values.name],
    ["Email", values.email],
    ["Company", values.company || "Not supplied"],
    ["Opportunity Type", values.opportunity],
    ["Subject", values.subject],
    ["Page source", values.source],
    ["Timestamp", timestamp],
  ];
  return {
    subject: "Portfolio Inquiry — " + values.opportunity + " — " + values.name,
    reply_to: values.email,
    text:
      fields.map(([key, value]) => key + ": " + value).join("\n") +
      "\n\nMessage:\n" +
      values.message,
    html:
      '<div style="font-family:Arial,sans-serif;color:#162235;max-width:620px;margin:auto"><h1 style="font-size:24px">Portfolio inquiry</h1><p>A new opportunity from the Azqa Jafar portfolio.</p><table style="border-collapse:collapse;width:100%">' +
      fields
        .map(
          ([key, value]) =>
            '<tr><th style="padding:12px;text-align:left;border-bottom:1px solid #dde2ec">' +
            key +
            '</th><td style="padding:12px;border-bottom:1px solid #dde2ec">' +
            escapeHtml(value) +
            "</td></tr>",
        )
        .join("") +
      '</table><h2 style="font-size:18px">Message</h2><p style="line-height:1.7;white-space:pre-wrap">' +
      escapeHtml(values.message) +
      "</p></div>",
  };
}
