import { test, expect } from "@playwright/test";
import { contactEmail, validateContact } from "../src/lib/contact";
const valid = {
  name: "Test Visitor",
  email: "visitor@example.com",
  company: "Example & Co",
  opportunity: "Research Collaboration",
  subject: "Portfolio inquiry",
  message: "A meaningful research collaboration inquiry.",
  source: "/#contact",
};
test("contact rejects injection and invalid opportunities, escapes email content, and sets Reply-To", () => {
  for (const patch of [
    { name: "Name\r\nBcc: someone@example.com" },
    { email: "a@example.com\r\nBcc: x@y.com" },
    { subject: "Hello\nInjected" },
    { opportunity: "Unlisted" },
    { company: "A".repeat(161) },
    { message: "short" },
    { website: "https://bot.invalid" },
  ])
    expect(validateContact({ ...valid, ...patch }).error).toBeTruthy();
  const values = validateContact({
    ...valid,
    message: "<img src=x onerror=alert(1)> Research & development.",
  }).values!;
  const email = contactEmail(values, "2026-09-30T10:00:00.000Z");
  expect(email.reply_to).toBe("visitor@example.com");
  expect(email.subject).toBe(
    "Portfolio Inquiry — Research Collaboration — Test Visitor",
  );
  expect(email.html).not.toContain("<img");
  expect(email.html).toContain("&lt;img");
  expect(email.html).toContain("Example &amp; Co");
  expect(email.text).toContain("Opportunity Type: Research Collaboration");
  expect(email.text).toContain("Timestamp: 2026-09-30");
});
test("contact endpoint rejects invalid origin, oversized input and honeypot without sending", async ({
  request,
}) => {
  expect(
    (
      await request.post("/api/contact", {
        headers: { Origin: "https://untrusted.example" },
        data: valid,
      })
    ).status(),
  ).toBe(403);
  expect(
    (
      await request.post("/api/contact", {
        data: { ...valid, message: "x".repeat(25000) },
      })
    ).status(),
  ).toBe(413);
  expect(
    (
      await request.post("/api/contact", { data: { ...valid, website: "bot" } })
    ).status(),
  ).toBe(400);
  expect(
    (
      await request.post("/api/contact", {
        data: { ...valid, opportunity: "" },
      })
    ).status(),
  ).toBe(400);
});
test("Hire me navigation and scientific planes work with keyboard and reduced motion", async ({
  page,
}) => {
  await page.addInitScript(() =>
    sessionStorage.setItem("azqa-lab-intro", "seen"),
  );
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page
    .getByRole("navigation", { name: "Main navigation" })
    .getByRole("link", { name: "Hire me" })
    .click();
  await expect(page).toHaveURL(/#contact$/);
  await expect(
    page.getByRole("heading", { name: "Let’s work together." }),
  ).toBeVisible();
  await page.getByLabel("Your name", { exact: true }).fill("Test Visitor");
  await page.getByLabel("Your email", { exact: true }).fill("test@example.com");
  await page.getByLabel("Subject", { exact: true }).fill("Test inquiry");
  await page
    .getByLabel("Message", { exact: true })
    .fill("This is a validation check only.");
  await page.getByRole("button", { name: "Send message" }).click();
  expect(
    await page
      .getByLabel("Opportunity type")
      .evaluate((el: HTMLSelectElement) => el.validity.valueMissing),
  ).toBeTruthy();
  const plane = page.getByRole("button", { name: /03 \/ SAGITTAL/ });
  await plane.focus();
  await page.keyboard.press("Enter");
  await expect(plane).toHaveAttribute("aria-pressed", "true");
  await expect(plane).toContainText("Side anatomical plane");
  await page.getByRole("button", { name: "Run example event" }).click();
  await expect(page.locator(".security-insight")).toHaveClass(/is-ready/);
  await page.getByRole("button", { name: "Run query", exact: true }).click();
  await expect(page.locator(".answer-zone")).toHaveClass(/is-ready/);
});
