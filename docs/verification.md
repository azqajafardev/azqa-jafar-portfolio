# Verification — 30 September 2026

## Intelligence / Systems Lab redesign

- Dependency installation completed successfully.
- ESLint, TypeScript checking, and the production build passed. Fourteen routes were generated.
- All seven Playwright scenarios passed against the production build. The project-route scenario was rerun successfully after the final imaging-caption refinement.
- Responsive widths checked: 320, 375, 390, 430, 768, 1024, 1440, and 1920 pixels. No horizontal overflow or out-of-viewport architecture nodes were found.
- Visually reviewed the hero, all five project visualizations, recognition photographs, publication, and experience ledger at desktop, tablet, and mobile sizes.
- Verified all five case-study routes, node selection, system-index scroll/focus behavior, 404 handling, portrait loading, downloadable PDF, canonical metadata, JSON-LD, sitemap, robots, manifest, and Open Graph image.
- Verified query playback, source reranking and context tracing, knowledge-domain selection, per-system animation pausing, offscreen pausing, keyboard access, and reduced-motion behavior.
- A regression check confirms reduced-motion hydration produces no page or console errors. The preference subscription follows [React's server snapshot guidance](https://react.dev/reference/react/useSyncExternalStore#adding-support-for-server-rendering).
- Verified both recognition images and the native-dialog lightbox: next/previous navigation, arrow keys, Escape, and return of focus to the opening photograph.
- Axe WCAG 2 A/AA and 2.1 AA scans found zero violations on the homepage, completed-query state, open achievement lightbox, and MPAFNet case study. Automated checks do not establish complete accessibility compliance.
- Contact input validation, simulated delivery success/error, and the populated email-draft fallback passed. No real email was sent.
- The new portrait is a byte-identical copy of the supplied photograph. All three supplied photos are used without generated or altered faces.
- Experience dates use the user's explicit correction: OCT 2025 — PRESENT and AUG 2025 — OCT 2025.
- The localhost development preview returned HTTP 200 with the new portrait, systems, and corrected dates.

## Content and deployment notes

The downloadable PDF is the supplied original; its older experience dates were not silently rewritten. Website dates follow the latest explicit user instruction.

Project interfaces are labeled illustrations of documented capabilities. No real application screenshots, source passages, page citations, patient images, or production telemetry are fabricated.

Publication metadata and the reported 98.91% result follow the supplied CV. ScienceDirect blocks automated retrieval.

Vercel remains signed out. Account authorization is required before deployment and public URL verification. No live URL is claimed.

Direct form delivery requires Resend credentials and a verified sender. The email-draft fallback works without that configuration.

## Reproduce

Run npm run lint, npm run typecheck, npm run build, and npm start.
In another terminal run npm test. Browser tests use installed Google Chrome.
Set TEST_BASE_URL to test another local or production origin.
