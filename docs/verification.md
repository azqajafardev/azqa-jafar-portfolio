# Verification — 30 September 2026

## Intelligent Systems Lab redesign
- Production build and TypeScript passed; 14 routes generated.
- ESLint passed with zero warnings.
- All six Playwright scenarios passed against the production build. The responsive scenario was rerun successfully after Chrome reported ERR_NETWORK_IO_SUSPENDED during a local system interruption.
- Responsive widths: 320, 375, 390, 430, 768, 1024, 1440, and 1920 pixels; no horizontal overflow.
- All five case studies, interactive project nodes, mobile navigation, portrait, real PDF download, canonical metadata, JSON-LD, sitemap, robots, manifest, Open Graph image, and 404 behavior checked.
- Blueprint keyboard interaction, stack pause control, bounded intro, skip link, and reduced motion checked.
- Contact validation, simulated provider success/error, and populated mailto fallback passed. No real email was sent.
- Axe WCAG 2 A/AA and 2.1 AA: zero violations on the homepage and ResearchLens case study. Automated checks do not establish complete accessibility compliance.
- Desktop hero, mobile hero, and blueprint screenshots visually reviewed. An optional later screenshot refresh timed out locally; functional assertions are separate from image capture.
- Publication details and reported 98.91% result use the supplied CV. ScienceDirect blocks automated retrieval.

## Remaining setup
Vercel account authorization is still required for deployment and public URL verification.
Resend credentials and a verified sender enable direct form delivery. Without them, visitors can open a prefilled email draft.

## Reproduce
Run npm run lint, npm run typecheck, npm run build, then npm start.
In another terminal run npm test. Tests use installed Google Chrome.
Set TEST_BASE_URL to test a different local or production origin.
