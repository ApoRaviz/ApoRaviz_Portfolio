# Portfolio Architecture

เอกสารนี้อธิบายโครงสร้างระบบของ `ApoRaviz_Portfolio`

## Runtime

```text
Angular 21
Node 24
TypeScript strict
Tailwind CSS v4
Angular SSR / prerender
GitHub Pages static deploy
```

## Source Structure

```text
src/app/models/      = TypeScript interfaces
src/app/services/    = portfolio data และ shared UI state
src/app/components/  = section components
docs/                = project knowledge
docs/teach/          = learning notes
docs/commands.md     = command reference
```

## Data Flow

```text
PortfolioDataService
-> section components read signals
-> templates render with Angular control flow
```

ข้อมูลที่เปลี่ยนบ่อย เช่น project, contact, services และ experience ควรอยู่ใน `PortfolioDataService` ไม่ hardcode ลง HTML โดยตรง

## UI State Flow

```text
ThemeService
-> navbar scroll tracking
-> active section
-> mobile menu state
-> reveal animation observer
```

browser-only APIs เช่น `window`, `scrollTo`, `IntersectionObserver` ต้องถูก guard ด้วย `isPlatformBrowser()` เพราะโปรเจกต์เปิด SSR/prerender

## CI/CD Flow

```text
push / pull_request
-> GitHub Actions CI
-> npm ci
-> npm run test:ci
-> npm run build
```

```text
push main
-> build with --base-href /ApoRaviz_Portfolio/
-> upload dist/portfolio/browser
-> deploy to GitHub Pages
```

## Local Build Note

ใน terminal นี้ `ng build` แบบปกติเคยเจอ esbuild deadlock แต่ build แบบ CI ผ่าน:

```bash
CI=1 ng build --progress=false
```

ดังนั้น `npm run build` ถูกปรับให้ใช้ command นี้เป็น default และเก็บ `npm run build:raw` ไว้สำหรับ debug Angular CLI แบบเดิม

อีกจุดที่ต้องระวังคือ external fonts:

```text
Angular production build อาจพยายาม inline Google Fonts
ถ้า network ใช้ไม่ได้ build จะ fail
```

โปรเจกต์นี้จึงใช้ local/system font stack ใน `src/styles.css` และไม่โหลด Google Fonts จาก `src/index.html`
