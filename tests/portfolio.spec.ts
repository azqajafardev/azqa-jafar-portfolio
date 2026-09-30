import { test, expect } from "@playwright/test";
test.beforeEach(async ({ page }) => {
  await page.addInitScript(() =>
    sessionStorage.setItem("azqa-lab-intro", "seen"),
  );
});
const slugs = [
  "enterprise-ai-security",
  "researchlens-ai",
  "system-monitoring-assistant",
  "uniguide-ai",
  "mpafnet",
];
test("responsive layout, portrait, and mobile navigation", async ({ page }) => {
  for (const width of [320, 375, 390, 430, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(
      page.getByAltText("Azqa Jafar, AI and ML Engineer"),
    ).toBeVisible();
    expect(
      await page
        .getByAltText("Azqa Jafar, AI and ML Engineer")
        .evaluate(
          (img: HTMLImageElement) => img.complete && img.naturalWidth > 0,
        ),
    ).toBeTruthy();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBeTruthy();
    if (width <= 900) {
      await page.getByRole("button", { name: "Open menu" }).click();
      await page
        .getByRole("navigation")
        .getByRole("link", { name: "Systems", exact: true })
        .click();
      await expect(page).toHaveURL(/#projects$/);
      await expect(
        page.getByRole("button", { name: "Open menu" }),
      ).toBeVisible();
    }
  }
});
test("project routes, diagrams, missing route, and no console errors", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const slug of slugs) {
    const response = await page.goto(`/projects/${slug}`);
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    const selector =
      slug === "researchlens-ai"
        ? ".research-stagebar button"
        : slug === "system-monitoring-assistant"
          ? ".channel-select"
          : slug === "mpafnet"
            ? ".mri-plane"
            : slug === "enterprise-ai-security"
              ? ".security-sequence button"
              : ".campus-document";
    const nodes = page.locator(selector);
    await nodes.nth(1).click();
    await expect(nodes.nth(1)).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      new RegExp(`/projects/${slug}$`),
    );
    await page.setViewportSize({ width: 320, height: 800 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBeTruthy();
  }
  const response = await page.goto("/projects/missing-project");
  expect(response?.status()).toBe(404);
  expect(errors).toEqual([]);
});
test("SEO, downloadable CV, crawlability and external links", async ({
  page,
  request,
}) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Azqa Jafar.*AI & ML Engineer/);
  expect(
    await page
      .locator('script[type="application/ld+json"]')
      .first()
      .textContent(),
  ).toContain("Person");
  for (const href of [
    "https://github.com/azqajafardev",
    "https://linkedin.com/in/azqa-jafar",
    "https://www.sciencedirect.com/science/article/pii/S2090447926004843",
  ]) {
    const link = page.locator(`a[href="${href}"]`).first();
    await expect(link).toHaveAttribute("target", "_blank");
    await expect(link).toHaveAttribute("rel", /noopener/);
  }
  const pdf = await request.get("/Azqa_Jafar_CV.pdf");
  expect(pdf.status()).toBe(200);
  expect((await pdf.body()).subarray(0, 4).toString()).toBe("%PDF");
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  for (const slug of slugs)
    expect(await sitemap.text()).toContain(`/projects/${slug}`);
  const robots = await request.get("/robots.txt");
  expect(await robots.text()).toContain("Allow: /");
  expect(await robots.text()).not.toContain("YOUR-DOMAIN");
  expect((await request.get("/opengraph-image")).status()).toBe(200);
});
test("contact validation and honest delivery errors", async ({
  page,
  request,
}) => {
  const response = await request.post("/api/contact", {
    data: { name: "A", email: "invalid" },
  });
  expect(response.status()).toBe(400);
  await page.goto("/#contact");
  await page
    .getByLabel("Opportunity type")
    .selectOption("Research Collaboration");
  await page.getByLabel("Your name", { exact: true }).fill("Test Visitor");
  await page
    .getByRole("textbox", { name: "Your email", exact: true })
    .fill("test@example.com");
  await page
    .getByLabel("Subject", { exact: true })
    .fill("Engineering collaboration");
  await page
    .getByLabel("Message", { exact: true })
    .fill("A test message for validating the contact user interface.");
  await page.route("**/api/contact", (route) =>
    route.fulfill({
      status: 503,
      contentType: "application/json",
      body: JSON.stringify({
        error:
          "Message delivery is currently unavailable. Please email azqajafar@gmail.com directly.",
      }),
    }),
  );
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.locator(".contact-form").getByRole("alert")).toContainText(
    "azqajafar@gmail.com",
  );
  await expect(
    page.getByRole("link", { name: "Open email draft" }),
  ).toHaveAttribute(
    "href",
    /mailto:azqajafar@gmail.com\?subject=Engineering%20collaboration/,
  );
  await page.route("**/api/contact", (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ success: true }),
    }),
  );
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.locator(".contact-form").getByRole("status")).toContainText(
    "your message has been sent",
  );
});
test("reduced motion and keyboard access", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByText("Skip to content")).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#main-content$/);
  expect(
    await page
      .locator(".trace")
      .first()
      .evaluate((el) => getComputedStyle(el).animationName),
  ).toBe("none");
  await expect(page.locator(".motion-toggle").first()).toBeDisabled();
  expect(errors).toEqual([]);
});

test("blueprint branches, stack pause, manifest and bounded intro", async ({
  page,
  request,
}) => {
  await page.goto("/");
  const tools = page.locator(".branch").getByRole("button", { name: /Tools/ });
  await tools.focus();
  await expect(tools).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator(".blueprint-note")).toContainText(
    "external services",
  );
  await page.getByRole("button", { name: "Pause stack animation" }).click();
  await expect(page.locator(".engineering-strip")).toHaveClass(/paused/);
  expect((await request.get("/manifest.webmanifest")).status()).toBe(200);
  await page.evaluate(() => sessionStorage.removeItem("azqa-lab-intro"));
  await page.addInitScript(() => sessionStorage.removeItem("azqa-lab-intro"));
  await page.reload();
  await expect(page.locator(".lab-intro")).not.toBeVisible({ timeout: 5000 });
});

test("visual demonstrations, system index, corrected dates and recognition lightbox", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await page
    .getByRole("navigation", { name: "Selected systems" })
    .getByRole("link", { name: /02 Evidence RAG/ })
    .click();
  await expect(page).toHaveURL(/#system-researchlens-ai$/);
  await expect(page.locator("#system-researchlens-ai")).toBeFocused();
  const rag = page.locator("#system-researchlens-ai");
  await rag.getByRole("button", { name: "Run query" }).click();
  await expect(rag.locator(".answer-zone")).toHaveClass(/is-ready/, {
    timeout: 15000,
  });
  await expect(rag.locator(".answer-zone")).toContainText(
    "Complementary views preserve different structural information",
  );
  await rag.getByRole("button", { name: "Trace citation B to source" }).click();
  await expect(rag.locator(".academic-paper")).toBeFocused();
  await expect(rag.locator(".paper-passage.is-highlighted")).toContainText(
    "Feature integration",
  );
  await rag.getByRole("button", { name: "Pause system 2 animation" }).click();
  await expect(rag.locator(".system-panel")).toHaveAttribute(
    "data-playing",
    "false",
  );
  const knowledge = page.locator("#system-uniguide-ai");
  await knowledge.getByRole("button", { name: /KNOWLEDGE \/ 04 Fees/ }).click();
  await expect(knowledge.locator(".campus-answer")).toContainText(
    "fees documents",
  );
  await expect(page.locator(".ledger-date").first()).toContainText("OCT 2025");
  await expect(page.locator(".ledger-date").nth(1)).toContainText("AUG 2025");
  await expect(page.locator(".ledger-date").nth(1)).toContainText("OCT 2025");
  const opener = page.getByRole("button", {
    name: /View photograph: Prime Minister/,
  });
  await opener.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("heading")).toContainText("Youth Laptop");
  const photo = dialog.locator("img");
  await expect
    .poll(() =>
      photo.evaluate(
        (img: HTMLImageElement) => img.complete && img.naturalWidth > 0,
      ),
    )
    .toBeTruthy();
  await dialog.getByRole("button", { name: "Next photograph" }).click();
  await expect(dialog.getByRole("heading")).toContainText("Honhaar");
  await page.keyboard.press("ArrowLeft");
  await expect(dialog.getByRole("heading")).toContainText("Youth Laptop");
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(opener).toBeFocused();
  expect(errors).toEqual([]);
});

test("light and dark themes persist, follow system preference, and fit mobile navigation", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  const toggle = page.getByRole("button", {
    name: "Toggle light and dark theme",
  });
  await toggle.click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await toggle.click();
  for (const width of [320, 375, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await expect(toggle).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBeTruthy();
  }
  await page.goto("/projects/researchlens-ai");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await expect(toggle).toBeVisible();
  expect(errors).toEqual([]);
});
