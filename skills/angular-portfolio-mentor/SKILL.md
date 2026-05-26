---
name: angular-portfolio-mentor
description: Build or update this Angular portfolio project with Angular 21, Node 24, Tailwind CSS v4, SSR-safe browser APIs, standalone components, signals, and Thai learning comments explaining key TypeScript, CSS, and semantic HTML decisions such as section vs div.
---

# Angular Portfolio Mentor

Use this skill when working on the ApoRaviz portfolio project or when the user asks to continue the Angular portfolio implementation.

## Project Defaults

- Use Node `24` for all npm, ng, and build commands.
- Use Angular `21.x`, standalone components, strict TypeScript, SSR, hydration, and Angular Router.
- Use Tailwind CSS v4 utilities for styling.
- Use Angular signals for component/service state where practical.
- Use `inject()` for dependency injection.
- Use Angular control flow syntax: `@if`, `@for`, `@switch`.
- Avoid NgModules and legacy `*ngIf` / `*ngFor`.
- Wrap browser-only APIs with `isPlatformBrowser()` before using `window`, `document`, `IntersectionObserver`, timers that depend on DOM state, or scroll APIs.

## Commenting Style

Add Thai comments where the code teaches an idea the user likely wants to learn.

Prefer comments for:

- Why a semantic element is used: `section`, `nav`, `header`, `footer`, `main`, `article`, `form`, `label`, `button`, `a`.
- Why a plain `div` is used: layout wrapper, grid/flex container, visual layer, glow/background, or grouping without semantic meaning.
- Angular concepts: `signal`, `computed`, `inject`, lifecycle hooks, `@if`, `@for`, form validators, event binding, class binding.
- SSR safety: why browser APIs are guarded.
- Tailwind/CSS concepts: design tokens, responsive layout, reveal animation, focus state, hover state.

Avoid comments that merely repeat the code, such as “set text color to white” for a `text-white` class.

## HTML Semantics Rule

- Use `<main>` once for the primary page content.
- Use `<section>` for major portfolio sections with IDs used by navigation: `home`, `about`, `skills`, `projects`, `services`, `experience`, `testimonials`, `contact`.
- Use `<nav>` for navigation links.
- Use `<header>` only for page or section introductions.
- Use `<article>` for repeatable self-contained items such as project cards, service cards, experience entries, and testimonials when they can stand alone.
- Use `<form>`, `<label>`, `<input>`, and `<textarea>` for contact form accessibility.
- Use `<button>` for actions that change UI state or trigger JS behavior.
- Use `<a>` for real navigation or external URLs.
- Use `<div>` only for non-semantic wrappers, layout containers, background layers, and visual grouping.

When using a `div` in HTML, add a nearby Thai comment if the reason is not obvious.

## Implementation Workflow

1. Read the current files before editing.
2. Keep edits scoped to the portfolio request.
3. Preserve Angular 21 file naming from the scaffold (`app.ts`, `app.html`, `app.css`) unless there is a strong reason to rename.
4. Put reusable portfolio data in `PortfolioDataService`.
5. Put global scroll/theme state in `ThemeService`.
6. Build each section as a standalone component.
7. After edits, run build with Node 24:

```bash
/Users/aporaviz/.nvm/versions/node/v24.16.0/bin/npm run build
```

8. If UI changed significantly, run the dev server and verify in the browser.

## Design Direction

- Dark premium portfolio with near-black background, restrained glassmorphism, and orange accent `#FF6B00`.
- Keep layouts polished and readable on mobile and desktop.
- Do not create a marketing landing page before the actual portfolio experience.
- Avoid decorative blobs/orbs and one-note palettes.
- Prefer real structure, accessible controls, and content that can be edited from data services.
