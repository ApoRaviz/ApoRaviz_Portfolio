# ApoRaviz Portfolio

`ApoRaviz_Portfolio` คือ profile หลักและ project hub ของ ApoRaviz ใช้เล่าตัวตน, ประสบการณ์, skill/loadout, โปรเจกต์ที่ทำจริง และ link ไปยังโปรเจกต์ลูก เช่น `ApoRaviz_Mooping`

โปรเจกต์นี้ไม่ได้เป็น landing page เปล่า แต่เป็น Angular portfolio ที่มี routing, SSR/prerender, หน้า Teach, หน้า Commands และ project card ที่ดูแลจาก data service

## What This Project Does

- แสดง profile ของ Tanonchai Promsiri / ApoRaviz
- เป็น hub สำหรับ link ไปยัง live demo และ GitHub repo ของโปรเจกต์ลูก
- สื่อ identity แบบ gamer-minded developer โดยใช้ dark/orange RPG profile direction
- เก็บข้อมูลหลัก เช่น profile, projects, skills, experience และ contact ไว้ใน `PortfolioDataService`
- มีหน้า `/teach` สำหรับบทเรียนเฉพาะ Portfolio
- มีหน้า `/commands` สำหรับอธิบายคำสั่งที่ใช้กับ Portfolio project

## Tech Stack

- Angular 21
- Node 24
- TypeScript strict
- Tailwind CSS v4
- Angular SSR / prerender
- Standalone components
- Angular signals และ `inject()`

## Development

```bash
nvm use 24
npm install
npm run start
```

Open:

```text
http://localhost:4200/
```

## Verify

```bash
npm run test:ci
npm run build
```

## Documentation

- [Architecture](docs/architecture.md)
- [Commands](docs/commands.md)
- [Design Direction](docs/design-direction.md)
- [Implementation Plan](docs/implementation-plan.md)
- [Progress](docs/progress.md)
- [Teach Index](docs/teach.md)
- [Portfolio Teach Notes](docs/teach/README.md)

## Learning Boundary

```text
ApoRaviz_Portfolio/docs/teach/ = บทเรียนเฉพาะ Portfolio
_docs/angular/teach/           = Angular concept กลาง
_docs/angular/commands.md      = Angular command กลาง
_docs/git/commands.md          = Git command กลาง
```
