# Abhijeet Yadav portfolio — safe improvement patch

The **original uploaded ZIP has not been overwritten**. This source-only copy retains the existing React/Vite/Tailwind/Three.js structure and 3D geometry.

## Minimal changes
- Corrected Ironcore Fitness and StudyPilot project demo destinations to the previously supplied deployment URLs. These URLs should be checked in the user's browser before publishing.
- Removed placeholder homepages used as fake project demo/codebase destinations; Skillora is labelled a concept.
- Updated unsupported metrics and clarified independent projects vs. actual client commissions.
- Prevented laptop keyboard controls from hijacking normal form typing; keyboard entry activates only in explicit typing mode.
- Default audio to OFF; users can opt in using the existing toggle.
- Clarified that the contact form uses the visitor's email app, not a backend.
- Added a fallback for browsers where WebGL can't initialize; users can still navigate to projects.
- Added a branded AY favicon and basic reduced-motion support, plus Escape/backdrop closing and labels for project dialogs.

## Not modified
The 3D laptop's modeling, shaders, camera controls, scene geometry, desktop layout, sections, animations, and component hierarchy are unchanged.

## Run on Windows / clean installation
1. Extract this ZIP to a new directory (not over the original).
2. Install Node.js compatible with Vite 8 (Node 20.19+ or 22.12+).
3. `npm ci`
4. `npm run dev`
5. `npm run build`
6. `npm run lint`

Do **not** reuse the uploaded ZIP's `node_modules`; it contains Windows-native binaries that cannot be tested on Linux. No production deployment has been made.

## Verification limitations
- Original compiled `dist` was inspected. In this sandbox, browser navigation is blocked by policy and WebGL context creation is unavailable, so full live-browser visual/regression testing was not possible.
- Native bundler/linter binaries in the uploaded ZIP are Windows-only; thus a full fresh Vite build couldn't be completed in this Linux environment.
- Source changes were deliberately limited for safety. Before merging to production, run the five tests above on your Windows laptop and confirm the project URLs and email handoff.
