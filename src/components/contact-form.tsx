"use client";
import { useRef, useState } from "react";
import { ArrowUpRight, Check, LoaderCircle } from "lucide-react";
import { opportunityTypes, validateContact } from "../lib/contact";
export function ContactForm() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");
  const [draft, setDraft] = useState("");
  const busy = useRef(false);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy.current) return;
    const form = event.currentTarget;
    const fields = Object.fromEntries(new FormData(form));
    fields.source = window.location.pathname + "#contact";
    const { error } = validateContact(fields);
    if (error) {
      setStatus("error");
      setMessage(error);
      return;
    }
    busy.current = true;
    setStatus("loading");
    setMessage("");
    setDraft("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
        signal: AbortSignal.timeout(18000),
      });
      const result = await response.json();
      if (!response.ok || !result.success)
        throw new Error(
          result.error || "Could not send. Please try again or email directly.",
        );
      setStatus("success");
      setMessage(
        "Thanks — your message has been sent. I’ll get back to you soon.",
      );
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error && error.name !== "TimeoutError"
          ? error.message
          : "The request timed out. Please try again or email directly.",
      );
      const body =
        String(fields.message) +
        "\n\nFrom: " +
        fields.name +
        " <" +
        fields.email +
        ">\nCompany: " +
        (fields.company || "Not supplied") +
        "\nOpportunity: " +
        fields.opportunity;
      setDraft(
        "mailto:azqajafar@gmail.com?subject=" +
          encodeURIComponent(String(fields.subject)) +
          "&body=" +
          encodeURIComponent(body),
      );
    } finally {
      busy.current = false;
    }
  }
  return (
    <form
      className="contact-form hiring-form"
      onSubmit={submit}
      aria-label="Hire Azqa Jafar"
      aria-busy={status === "loading"}
    >
      <div className="form-title">
        <span className="micro-label">HIRE ME / START A CONVERSATION</span>
        <h3>Let’s work together.</h3>
      </div>
      <fieldset disabled={status === "loading"}>
        <div className="form-row">
          <label>
            Your name
            <input
              name="name"
              autoComplete="name"
              required
              minLength={2}
              maxLength={100}
              placeholder="Your name"
            />
          </label>
          <label>
            Your email
            <input
              name="email"
              type="email"
              autoComplete="email"
              required
              maxLength={254}
              placeholder="you@company.com"
            />
          </label>
        </div>
        <div className="form-row">
          <label>
            Company / Organization <span className="optional">optional</span>
            <input
              name="company"
              autoComplete="organization"
              maxLength={160}
              placeholder="Where you work"
            />
          </label>
          <label>
            Opportunity type
            <select name="opportunity" required defaultValue="">
              <option value="" disabled>
                Select an opportunity
              </option>
              {opportunityTypes.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
          </label>
        </div>
        <label>
          Subject
          <input
            name="subject"
            required
            minLength={3}
            maxLength={160}
            placeholder="What would you like to build?"
          />
        </label>
        <label>
          Message
          <textarea
            name="message"
            required
            minLength={10}
            maxLength={5000}
            rows={5}
            placeholder="Tell me about the role, research or project."
          />
        </label>
        <div className="honeypot" aria-hidden="true">
          <label>
            Website
            <input name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>
        <button
          className="primary"
          disabled={status === "loading"}
          type="submit"
        >
          {status === "loading" ? (
            <>
              <LoaderCircle size={16} className="spinner" />
              Sending…
            </>
          ) : status === "success" ? (
            <>
              Message sent <Check size={16} />
            </>
          ) : (
            <>
              Send message <ArrowUpRight size={16} />
            </>
          )}
        </button>
      </fieldset>
      <div
        className={"form-status " + status}
        role={status === "error" ? "alert" : "status"}
      >
        {status === "error" && <strong>Couldn’t send</strong>}
        <p>{message}</p>
      </div>
      <a
        className="text-link direct-email"
        href={draft || "mailto:azqajafar@gmail.com"}
      >
        {draft ? "Open email draft" : "Email directly"}
        <ArrowUpRight size={15} />
      </a>
    </form>
  );
}
