# ApoRaviz Portfolio

`ApoRaviz_Portfolio` คือเว็บ profile และ showcase หลักของ ApoRaviz ใช้เล่าตัวตน ประสบการณ์ skill/loadout ผลงานจริง และ link ไปยังโปรเจกต์ลูก เช่น `ApoRaviz_Workspace_Docs` และ `ApoRaviz_Mooping`

โปรเจกต์นี้ไม่ใช่พื้นที่เก็บบทเรียนกลางอีกต่อไป ถ้ามี concept, คำศัพท์, setup, Angular, Tailwind CSS, command หรือบทเรียนใหม่ ให้เพิ่มที่ `ApoRaviz_Workspace_Docs` แล้วให้ Portfolio ทำหน้าที่ link ไปหาเท่านั้น

## What This Project Does

- แสดง profile ของ Tanonchai Promsiri / ApoRaviz
- เป็น hub สำหรับ link ไปยัง live demo และ GitHub repo ของโปรเจกต์ลูก
- สื่อ identity แบบ gamer-minded developer ด้วย dark/orange RPG profile direction
- เก็บข้อมูลหลัก เช่น profile, projects, skills, experience และ contact ไว้ใน `PortfolioDataService`
- แสดง `ApoRaviz_Workspace_Docs` เป็นผลงานและเป็น learning hub กลาง

## Tech Stack

- Angular 22
- Node 24 LTS
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

## Learning Boundary

```text
ApoRaviz_Portfolio      = profile, showcase, job/profile site, project links
ApoRaviz_Workspace_Docs = central Thai learning docs, rules, Angular/Tailwind lessons
ApoRaviz_Mooping        = app project, paused for now
```

ถ้า Portfolio ทำให้เจอคำศัพท์หรือ pattern ใหม่ ให้สรุปกลับไปที่ `ApoRaviz_Workspace_Docs` ก่อน ไม่สร้างบทเรียนแยกใน repo นี้
