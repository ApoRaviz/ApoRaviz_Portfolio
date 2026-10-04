# ApoRaviz Book Refinement Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans to implement this plan task-by-task. Track progress here. The user approved the design and requested planning followed by immediate implementation on 2026-10-04.

**Goal:** Make the existing warm black/orange portfolio more distinctive, readable and comfortable on mobile while preserving its book identity and real content.

**Architecture:** Refine existing Angular section templates and their owned styles. Keep PortfolioDataService and BookNavService as the sources of content and chapter state. Use existing assets and CSS, with no new product dependencies.

**Tech Stack:** Angular 22, Tailwind CSS 4, TypeScript, Node 24, Vitest.

**Spec:** Approved in-chat bounded design: refine ApoRaviz Book, warm black/orange, stronger cover and project hierarchy, readable Loadout, comfortable mobile navigation, keyboard focus and reduced motion.

## Global Constraints

- Work on `exuxui-design`, created from `main` at `0c8e57c`; preserve the requested working directory.
- Keep the friendly gamer-minded voice and real profile/project data.
- Preserve SSR/prerender, conditional chapters and existing contact behavior.
- Use karpathy-guidelines, the project design skill and UI UX Pro Max guidance from the sibling WMS repository. Its Python CLI is unavailable; use the readable reference guidance directly.
- No dependency upgrades, backend, deployment or merge into main.
- Visual styling is verified visually; add focused behavior tests for navigation/accessibility changes rather than tests mirroring CSS.

## Review Focus

- Narrow 375px screens and short landscape windows: no clipped content or obstructed controls.
- Keyboard navigation inside forms: arrow keys must remain available for text editing.
- Optional chapters: every rendered chapter must remain reachable.
- Reduced motion: scrolling and chapter transitions must honor the setting.
- Long labels and contact values: wrap without horizontal page overflow.

### Task 1: Cover and visual foundation

**Files:** `src/styles.css`, `src/app/components/hero/hero.component.{html,ts,css}`, `src/app/pages/home-page/home-page.component.{html,css}`.

**Interfaces:** Consume existing `data.profile()`, `data.cover()`, `nav.chapters()` and `nav.go(index)`. Retain the section and scroller hooks.

- [x] Run baseline tests and capture the original cover.
- [x] Create an editorial two-column cover with the existing identity, a framed book/contents panel and a clear primary action. Stack naturally on mobile.
- [x] Establish consistent surface, border, spacing, typography and focus treatments; retain orange as the accent.
- [x] Verify the cover at desktop and mobile widths, including long-name wrapping.

### Task 2: Chapters and interaction

**Files:** Existing About, Skills, Projects and Contact templates; `home-page.component.{html,css,ts}`; `src/app/app.spec.ts`.

**Interfaces:** Keep existing section inputs, service signals, links and form submission. Expose active navigation state accessibly.

- [x] Add behavior tests for accessible chapter selection, reachable chapter controls and arrow-key editing in a contact input; observe failure before changing behavior.
- [x] Refine chapter headers, card spacing and project images. Improve Loadout selected state and contact field labels.
- [x] Use a compact mobile chapter selector with readable labels and comfortable targets; preserve all optional chapters.
- [x] Ensure keyboard shortcuts do not capture input editing and reduced-motion scrolling is immediate.
- [x] Run the complete test suite.

### Task 3: Verification and comparison

**Files:** This plan, `docs/progress.md`; visual evidence under ignored `tmp/`.

- [x] Run `npm.cmd run build` and `npm.cmd run test:ci`; inspect all output.
- [x] Check desktop/mobile layouts, chapter controls, Loadout, contact editing and reduced-motion behavior in the browser where supported.
- [x] Capture matching after screenshots, review the diff and document concrete improvements and limitations.
- [x] Leave the result on the design branch for user comparison.

## Execution record

- Branch verified clean before implementation. `npm` PowerShell shim is blocked by the local execution policy; use `npm.cmd` without changing that policy.
- Pre-flight: tasks share existing services and section hooks; no new cross-component interfaces.

- Task 1: complete. Original and updated desktop/mobile screenshots saved under ignored `tmp/visual-review/`. Cover styling verified after restarting the dev server without HMR (new component metadata had stale hot-reload state).
- Task 2: complete. Three new behavior checks failed against the original implementation, then passed with the changes. Full suite: 6/6. Added optional-content numbering coverage.
- Task 3: complete. Production build and one prerendered route passed; CSS is within the existing budget. Headless Chrome checks passed at 375×812, 768×1024, 1440×1000, 812×375 and 1024×375. No horizontal overflow or runtime exceptions; checked chapter navigation, native selector keyboard changes, Loadout selection, contact text editing, focus visibility and reduced motion.
- Review: independent read-only review identified short-height chapter-rail overlap. Browser check reproduced it, a max-height rule fixed it, and the check passed. Long future category names were also tested: the narrow button overflowed; adding a shrinkable/wrapping text container fixed the failure. No remaining review findings.
- Ruling: use the requested local branch rather than create another worktree; all changes started from a clean checkout. Keep the branch for comparison, without publishing or merging.
- Ruling: use CSS and existing assets; no new library is needed. UI UX Pro Max reference guidance was read directly because its Python search CLI was unavailable.
- Ruling: browser inspection plugins were unavailable; automated checks used a separate headless Chrome process with a temporary profile. No existing browser profile was used.
- Ruling: permit continuous reading rather than scroll snapping; section navigation and book transitions remain available.
- Existing test-environment limitation: jsdom reports that canvas getContext is not implemented; all tests pass and the canvas runs in the real-browser check.
- No shared knowledge docs changed: this work refines Portfolio-specific presentation using existing Angular/CSS patterns.
- Comparison artifact: `tmp/visual-review/comparison.html` contains embedded before/after screenshots and a desktop/mobile toggle.
