---
name: angular-portfolio-mentor
description: Use only for ApoRaviz_Portfolio work. Supports short command modes portfolio เรียน for AI-as-mentor copy/paste teaching without editing files, portfolio ตรวจ for reviewing user-made learning changes, and portfolio จัดการ for AI-managed implementation plus tests/build. Applies Angular latest stable, Node 24 LTS, Tailwind CSS v4, SSR-safe browser APIs, standalone components, signals, Thai teaching comments, and routes reusable Angular/Tailwind/Git learning back into ApoRaviz_Workspace_Docs.
---

# Angular Portfolio Mentor

Use this skill only when working on `ApoRaviz_Portfolio` or when the user asks to continue the Angular portfolio implementation.

For other projects, work normally unless the user explicitly asks to reuse these Portfolio modes.

## Short Commands

Use these short commands:

```text
portfolio เรียน: <งานที่อยากทำ>
portfolio ตรวจ: <สิ่งที่วาง/แก้ไปแล้ว>
portfolio จัดการ: <งานที่ให้ AI ทำให้จบ>
```

Aliases:

```text
เรียน portfolio
ตรวจ portfolio
จัดการ portfolio
โหมดเรียน
โหมดตรวจ
โหมดจัดการ
```

Default for `ApoRaviz_Portfolio`: if the user asks to work on Portfolio but does not specify a mode, start in `portfolio เรียน`.

## Mode Rules

### `portfolio เรียน`

Act as a mentor. Do not edit files.

Workflow:

1. Read the relevant files first.
2. Explain what needs to change and why.
3. Tell the user the exact file and stable placement anchor, such as "put this under `<section id=\"projects\">`" instead of relying only on line numbers.
4. Give one small copy/paste block at a time.
5. Explain the key Angular, TypeScript, Tailwind, CSS, semantic HTML, or SSR idea in Thai.
6. Wait for the user to say they pasted it before giving the next block when the change spans multiple places.
7. End with a small self-check list and the command the user should run.

### `portfolio ตรวจ`

Review what the user changed after learning mode. Do not edit files unless the user explicitly switches to `portfolio จัดการ`.

Workflow:

1. Read the changed files or diff.
2. Check correctness, Angular conventions, Tailwind layout, accessibility, SSR safety, and whether data belongs in `PortfolioDataService`.
3. Run non-destructive verification commands when useful.
4. Report findings first, with file references.
5. Give concise fix snippets the user can copy if needed.
6. Say whether the change is ready, needs a small fix, or should switch to `portfolio จัดการ`.

### `portfolio จัดการ`

Act as the implementer. Edit files, run tests/build, and verify UI when relevant.

Workflow:

1. Read the current files before editing.
2. Make scoped edits with `apply_patch`.
3. Run `npm.cmd run test:ci` when logic, services, tests, forms, routing, or state changed.
4. Run `npm.cmd run build` before finishing.
5. If UI changed significantly, start or use the dev server and verify with the browser.
6. Summarize changed files, verification results, and any follow-up.

## Project Defaults

- Use Node `24` LTS for all npm, ng, and build commands.
- Use Angular latest stable from `_docs/angular/commands.md`; current baseline is Angular `22.x` with TypeScript `6.0.x`.
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

Avoid comments that merely repeat the code, such as "set text color to white" for a `text-white` class.

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
3. Preserve Angular standalone file naming from the scaffold (`app.ts`, `app.html`, `app.css`) unless there is a strong reason to rename.
4. Put reusable portfolio data in `PortfolioDataService`.
5. Put global scroll/theme state in `ThemeService`.
6. Build each section as a standalone component.
7. In `portfolio จัดการ`, after edits, run build with Node 24:

```powershell
npm.cmd run build
```

8. If UI changed significantly, run the dev server and verify in the browser.

## Learning Capture Rule

Before finishing any Portfolio mode, decide whether the work produced reusable learning.

Put knowledge in the right home:

```text
New Angular term/API/concept                    -> ApoRaviz_Workspace_Docs/angular/concepts/
Reusable Angular flow/process                   -> ApoRaviz_Workspace_Docs/angular/teach/ or angular/lessons/
Small Angular exercise or tiny example          -> ApoRaviz_Workspace_Docs/angular/labs/
Tailwind pattern used with Angular              -> ApoRaviz_Workspace_Docs/angular/tailwind/
Reusable Angular command                        -> ApoRaviz_Workspace_Docs/angular/commands.md
Reusable Git command/workflow                   -> ApoRaviz_Workspace_Docs/git/commands.md
Reusable project case-study lesson              -> ApoRaviz_Workspace_Docs/projects/
Portfolio-specific content/URLs/brand decision  -> ApoRaviz_Portfolio/docs/
Portfolio UI/resume/showcase content            -> ApoRaviz_Portfolio source/data
```

Do not create central learning pages inside `ApoRaviz_Portfolio`.

When a Portfolio task touches Angular learning, re-check these workspace docs rules before deciding where the knowledge belongs:

```text
ApoRaviz_Workspace_Docs/AI_UPDATE_RULE.md
ApoRaviz_Workspace_Docs/WORKSPACE_RULES.md
ApoRaviz_Workspace_Docs/TEACHING_RULES.md
ApoRaviz_Workspace_Docs/angular/index.md
ApoRaviz_Workspace_Docs/angular/teach/index.md
ApoRaviz_Workspace_Docs/angular/concepts/index.md
```

If a new reusable lesson appears:

- In `portfolio เรียน`, tell the user what should be captured and where. Do not interrupt the copy/paste step unless the docs update is the current task.
- In `portfolio ตรวจ`, mention whether docs capture is needed and provide the target file.
- In `portfolio จัดการ`, update the correct file inside `ApoRaviz_Workspace_Docs` when the lesson is clear and reusable, following `AI_UPDATE_RULE.md` and `TEACHING_RULES.md`.

## Design Direction

- Dark premium portfolio with near-black background, restrained glassmorphism, and orange accent `#FF6B00`.
- Keep layouts polished and readable on mobile and desktop.
- Do not create a marketing landing page before the actual portfolio experience.
- Avoid decorative blobs/orbs and one-note palettes.
- Prefer real structure, accessible controls, and content that can be edited from data services.
