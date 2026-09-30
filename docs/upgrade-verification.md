# Image-led upgrade verification — 30 September 2026

## Completed implementation

- Five different, image-led project stories replace the previous node-dominated presentations. Security includes an original infrastructure environment, stepwise event analysis, agent activity, retrieved context and an illustrative insight. ResearchLens has an original source paper, highlighted passages, vector retrieval, reranking and clickable citations that return focus to the source. Monitoring has animated thread timelines, demonstrative logs, network activity and selectable diagnostic context. UniGuide combines a fictional campus with domain selection and grounded-response context. MPAFNet includes a brain volume, three original MRI-style planes and keyboard/touch selection.
- The publication now uses original retinal imagery, scanning, illustrative feature samples and the documented method sequence. No clinical probabilities or unsupported performance claims were added.
- Hero, About and navigation were simplified. Hire Me is available in navigation, hero and the project conclusion, leading to the full contact form.
- Recognition photography, accessible lightbox and user-corrected experience dates remain intact. The intro is now 1.8 seconds. Light/dark preference persistence remains available on home and project pages.

## Validation

- ESLint, explicit TypeScript checking and the production build passed; 14 routes generated.
- All 11 Playwright scenarios passed against the production build, covering eight viewport widths, five project routes, navigation, CV, metadata, accessible interactions, citation tracing, modal keyboard behavior, theme persistence, hiring validation, request limits, honeypot handling, header/HTML injection protection and Reply-To formatting.
- Screenshots captured at 1440px, 1024px and 390px, including complete-page captures and individual sections. Reviewed desktop/laptop compositions and purpose-built mobile flows. Fixed mobile campus empty space, image crops, question spacing and small document/category labels.
- No horizontal overflow at the three requested capture widths; no browser page errors.
- Fresh homepage Axe WCAG 2 A/AA and 2.1 AA scans: zero violations in each theme. Automated scans are not a claim of complete accessibility compliance.
- Seven new local WebP assets total 637,908 bytes. next/image handles responsive delivery. No videos or 3D runtime were added. Animation timers pause offscreen; reduced motion renders the workflows immediately or statically.

## Email limitation

The Resend server integration and secure recipient configuration are implemented. The private Resend key and verified sender are still needed from the owner. Mocked success/error tests do not prove real inbox delivery. See [email configuration and verification](contact-delivery.md).

## Assets

See [asset provenance and exact generation prompts](project-visual-assets.md). Supplied portrait and achievement photographs were not modified.
## Review perspectives and fixes

- Recruiter: generic architecture boxes did not communicate the project domain quickly. Added original network/campus/scientific imagery, distinct titles and short statements; kept project explanations compact.
- Frontend designer: the mobile campus treatment left a dark empty region, and some labels were too small. Adjusted artwork height/crop and spacing, enlarged labels, improved the source document, and added a mobile-accessible CV label.
- Technical hiring manager: demonstrations needed inspectable evidence and a clear hiring path. Added an original document with traceable citations, stateful security/campus/monitoring interactions, MRI plane selection, and a validated multi-field Hire Me form. No absent screenshots or model results were invented.
- Performance engineer: added imagery could increase page weight and offscreen work. Optimized all seven new images to 637,908 bytes total, used responsive lazy next/image delivery, kept animation in CSS/SVG, paused offscreen timers, and preserved reduced-motion support.
## Production verification

- Production deployment `dpl_9y7aCEwi8oZkvZpinKykQ2ihqpRu` completed successfully at https://azqa-jafar-portfolio.vercel.app. Vercel's build and TypeScript checks passed.
- An unauthenticated mobile browser received HTTP 200. The final mobile light-theme Axe scan reported zero violations, no horizontal overflow and no page errors. Corrected campus and security compositions were visually inspected on the live site.
- A real production form submission was attempted with the owner's explicit authorization. The endpoint returned HTTP 503 because `RESEND_API_KEY` and `CONTACT_FROM` are not configured. The UI showed the delivery error and direct-email fallback. **No email was delivered; inbox delivery and live Reply-To remain unverified.** `CONTACT_TO` is configured securely for the supplied professional email address. Local credential-presence checks were also false, without exposing any values.
- Public GitHub and LinkedIn profile links returned HTTP 200. ScienceDirect returned HTTP 403 to the automated request; the supplied publication URL was retained.

- All 11 Playwright scenarios passed again against the final public deployment (2.2 minutes), including desktop/mobile layouts, every project route, theme persistence, contact mocks, negative API checks and keyboard/reduced-motion behavior. The final citation refinement also passed targeted lint.
