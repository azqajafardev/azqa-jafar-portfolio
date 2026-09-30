# Verification — 30 September 2026

- Production build, ESLint, and TypeScript: passed.
- Playwright: all 5 tests passed against the production build.
- Responsive widths: 320, 375, 390, 430, 768, 1024, 1440, and 1920 pixels; no horizontal overflow.
- Navigation, mobile menu, project routes and diagrams, 404 page, images, CV download, metadata, sitemap, robots, keyboard access, and reduced motion checked.
- Contact validation and simulated success/error states passed; no real email was sent.
- Axe WCAG 2 A/AA and 2.1 AA: zero violations on the homepage and ResearchLens case study. Automated checks do not cover every accessibility requirement.
- Staged-file credential scan found no secrets.

## Remaining setup
Vercel account authorization is required for deployment and live URL verification.
Resend credentials and a verified sender are required for form email delivery; the direct email link is available.
ScienceDirect blocked automated retrieval with HTTP 403. Publication details use the supplied CV.

## Run browser checks
Tests use installed Google Chrome. Run npm start, then npm test in another terminal.
