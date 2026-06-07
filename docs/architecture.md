# Portfolio Architecture

เอกสารนี้อธิบายโครงสร้างของ `ApoRaviz_Portfolio` ในฐานะ profile/showcase site ไม่ใช่ learning hub กลาง

## Runtime

```text
Angular 22
Node 24 LTS
TypeScript 6.0.x strict
Tailwind CSS v4
Angular SSR / prerender
GitHub Pages static deploy
```

## Source Structure

```text
src/app/models/      = TypeScript interfaces
src/app/services/    = portfolio data และ shared UI state
src/app/components/  = section components
src/app/pages/       = routed page components
docs/                = project-specific docs only
docs/commands.md     = command reference เฉพาะ Portfolio
```

บทเรียนกลาง, Angular concept, Tailwind CSS pattern, setup guide และคำศัพท์ใหม่ ต้องอยู่ที่ `ApoRaviz_Workspace_Docs`

## Routes

```text
/  = HomePageComponent
** = redirect กลับ /
```

Portfolio ไม่มีหน้าเรียนภายในเว็บแล้ว ถ้าผู้ใช้ต้องการเรียนรู้ให้กด link ไป `ApoRaviz_Workspace_Docs`

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

ใน Windows/PowerShell ห้ามเขียน npm script แบบ `CI=1 ng ...` เพราะเป็น syntax ฝั่ง mac/Linux และจะรันไม่ผ่าน

```bash
ng build --progress=false
```

ดังนั้น `npm run build` ถูกปรับให้ใช้ command นี้เป็น default และเก็บ `npm run build:raw` ไว้สำหรับ debug Angular CLI แบบเดิม

อีกจุดที่ต้องระวังคือ external fonts:

```text
Angular production build อาจพยายาม inline Google Fonts
ถ้า network ใช้ไม่ได้ build จะ fail
```

โปรเจกต์นี้จึงใช้ local/system font stack ใน `src/styles.css` และไม่โหลด Google Fonts จาก `src/index.html`
