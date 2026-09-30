# Project visual assets

All seven WebP files in `public/images/projects/` are original portfolio artwork generated with the built-in imagegen tool on 30 September 2026. No reference-site assets, stock screenshots, real patient images, or university photographs were copied. No actual application screenshots were supplied.

The generated PNG originals were kept in the image tool's original output directory. Working assets were optimized with Sharp; the MRI atlas was separated into its three original panels without changing the depicted anatomy. Total optimized image size: 637,908 bytes. Security and campus are 1440px wide; brain and retina are 800px wide; MRI planes are 720px wide. All are served through next/image with responsive sizes and lazy loading.

| Asset | Use | Provenance / limitation |
| --- | --- | --- |
| security-network.webp | Enterprise AI Security environment | Original abstract infrastructure illustration; not the application UI |
| campus.webp | UniGuide environment | Original fictional campus; not a real university |
| brain-volume.webp | MPAFNet input volume | Synthetic illustration; not a patient or training sample |
| mri-axial.webp | Selectable axial view | Original synthetic MRI-style illustration |
| mri-coronal.webp | Selectable coronal view | Original synthetic MRI-style illustration |
| mri-sagittal.webp | Selectable sagittal view | Original synthetic MRI-style illustration |
| retina.webp | Research publication input | Original synthetic fundus illustration; not model output |

ResearchLens uses an original three-paragraph sample document. Its displayed answer cites only that sample; clicking a citation highlights the actual passage. Monitoring uses original SVG/CSS graphics and explicitly demonstrative event text. No project-specific repositories, demos, performance statistics, clinical probabilities, or real screenshots are invented.

## Generation prompts

Built-in tool mode was used for all five generation requests; no API key or fallback CLI was needed.

### MRI atlas
Use case: scientific-educational. Create one polished scientific imaging atlas asset for an AI research portfolio. Wide 3:1 composition, three equal square panels flush side by side, no gutters, on uniform near-black #05070D. Left panel: believable grayscale axial brain MRI-style illustrative cross-section viewed from above, bilateral tissue folds and ventricles. Middle panel: believable coronal brain MRI-style illustrative cross-section viewed from front, symmetrical hemispheres and anatomical gray/white matter texture. Right panel: believable midsagittal brain MRI-style illustrative cross-section from side, distinct curved corpus callosum and cerebellum. Each section centered in its own third with generous black margin; all same scale, precise softly granular medical-imaging texture, faint cool blue tint, dimensional scientific editorial quality. ORIGINAL SYNTHETIC ILLUSTRATION, no actual patient, no diagnosis, no abnormalities, no text, no labels, no numbers, no symbols, no decorative UI, no watermark. Intended as three separately displayed scientific planes; make anatomical orientations visually distinct.

### Retinal image
Use case: scientific-educational. Original illustrative fundus/retinal image for a premium AI research portfolio, NOT patient data or actual model output. A single large circular retinal field centered on near-black #05070D background with generous margin. Credible delicate branching retinal blood vessels radiating from a softly luminous optic disc left of center; fine organic tissue texture, richly detailed scientific macro view. Restrained muted rust/copper retina and dark plum vessels, subtle clinical blue edging, understated editorial medical-imaging aesthetic. No text, no annotations, no labels, no metrics, no diagnosis, no identifying marks, no UI, no watermark. Square composition.

### Enterprise network
Use case: stylized-concept. Original cinematic technical hero artwork for an enterprise AI security project on an engineer's website. Wide landscape 16:9. Dark scientific near-black #05070D canvas, subtle fine perspective grid, a sprawling miniature enterprise computing network represented as precise matte graphite server modules and elevated translucent data-routing paths. Three elegant faceted crystalline processing cores among the infrastructure, thin electric cyan packets traveling along physical luminous pathways and tiny restrained violet activity signals. Oblique top-down engineering cutaway, real dimensional depth, sharp premium industrial-design rendering, restrained monochrome blue/violet, absolutely no purple glow everywhere. Network concentrated center/right with dark negative space on left and top for HTML interface overlays. No text, no UI screenshots, no metrics, no numbers, no robots, no hackers, no padlocks, no shield icons, no logos. Sophisticated original computational landscape, not a generic node-arrow diagram.

### Campus
Use case: stylized-concept. Original architectural campus illustration for UniGuide, a university knowledge assistant in a premium AI engineer portfolio. Wide landscape 16:9. Refined isometric miniature of a fictional university campus: central courtyard, modern library with warm softly lit windows, academic departments, shaded walkways, a few small trees. No recognizable real university, no logos, no people. Warm approachable institutional atmosphere within a cool midnight scientific visual universe. Matte slate blue and muted lavender architectural material, gentle warm amber window lighting, precise architectural-model detail, subtle mist at edges, near-black #05070D background. Campus located on left two-thirds; right side softly fades to dark negative space for interface overlays. Elegant editorial 3D render, fine details, restrained illumination. No text, no diagrams, no labels, no UI, no watermark.

### Brain volume
Use case: scientific-educational. Original synthetic medical visualization for a research portfolio. A single anatomically plausible three-dimensional human brain volume, three-quarter view, floating centered on uniform near-black #05070D. Semi-translucent cool silvery blue-gray cerebral tissue with finely detailed gyri and sulci, soft clinical violet shadow, subtle horizontal tomography layers visible through lower volume, realistic volumetric scientific rendering. Brain fills 75 percent of square composition, generous dark margin. No skull, no face, no patient, no text, no labels, no diagnosis, no numbers, no UI, no flashy neon, no watermark. Polished scientific illustration, not a patient scan, not model output.
