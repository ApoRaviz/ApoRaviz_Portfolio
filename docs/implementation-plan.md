# Portfolio Implementation Plan

ไฟล์นี้เป็น roadmap ใหญ่ของ `ApoRaviz_Portfolio`

ใช้คู่กับ:

- `docs/next-actions.md` สำหรับงานถัดไปแบบสั้น
- `docs/progress.md` สำหรับสิ่งที่ทำเสร็จแล้ว
- `docs/learning-resume.md` สำหรับโหมดเรียนทีละ step

## Working Rules

- Portfolio เป็น profile/showcase/job site และ project link hub เท่านั้น
- บทเรียนกลาง, Angular concept, Tailwind CSS pattern, command pattern และศัพท์ใหม่ ต้องไปอยู่ที่ `ApoRaviz_Workspace_Docs`
- ข้อมูล project card ควรแก้ผ่าน `PortfolioDataService` ไม่ hardcode ใน HTML
- `public/resume.pdf` และ `public/resume.png` คือ source of truth สำหรับข้อมูลอาชีพ
- Hero/profile role ไม่จำเป็นต้องใช้คำว่า `Senior` หรือ `expert` ถ้าเจ้าของเว็บไม่อยากสื่อแบบนั้น แต่ `Build Journey` ใช้ตำแหน่งจริงตาม resume ได้
- โทนหน้าเว็บควร friendly, playful, learner, gamer-minded และเป็นกันเอง โดยให้ผลงานกับ Journey เล่าความสามารถแทนคำโอ้อวด
- Angular app ของ ApoRaviz ใช้ Tailwind CSS เป็น default styling system
- โค้ดใหม่ควรมี comment ภาษาไทยเฉพาะจุดที่สอน intent, state, SSR guard หรือ UX decision สำคัญ
- ก่อนถือว่างานเสร็จ ให้รัน `npm run build` และถ้าแตะ logic สำคัญให้รัน `npm run test:ci`
- npm scripts ต้องรันได้บน Windows/PowerShell ห้ามใช้ prefix แบบ `CI=1 ng ...`

## Step 0 - Project Baseline

- [x] 0.1 สร้าง Angular project พร้อม routing และ SSR
- [x] 0.2 ใช้ Node 24, TypeScript strict, standalone components และ signals
- [x] 0.3 Upgrade baseline ปัจจุบันเป็น Angular 22 + TypeScript 6.0.x
- [x] 0.4 เปิด SSR/prerender
- [x] 0.5 เพิ่ม Tailwind CSS v4
- [x] 0.6 แยก models, services, section components
- [x] 0.7 เพิ่ม GitHub Actions สำหรับ CI และ GitHub Pages deploy
- [x] 0.8 รวม command docs เฉพาะ Portfolio ไว้ที่ `docs/commands.md`
- [x] 0.9 ลบ prompt/spec เก่าที่ไม่ตรงกับ frontend baseline ปัจจุบัน
- [x] 0.10 ปรับ README ให้สื่อว่า Portfolio คือ profile/showcase hub

## Step 1 - Portfolio Boundary Cleanup

- [x] 1.1 ลบ internal learning docs ออกจาก Portfolio
- [x] 1.2 ลบ route/page สำหรับบทเรียนและ command UI ภายใน Portfolio
- [x] 1.3 เพิ่ม `ApoRaviz_Workspace_Docs` เป็น project card
- [x] 1.4 เพิ่ม navbar link ไป `ApoRaviz_Workspace_Docs`
- [x] 1.5 ปรับ README/architecture/progress ให้ตรงกับ concept ใหม่
- [x] 1.6 ตรวจ UI หลัง build บน desktop และ mobile

## Step 2 - Hardening

- [x] 2.1 ใช้ SSR-safe browser API guards
- [x] 2.2 ปรับ `npm run build` ให้ใช้ `ng build --progress=false` ที่รันได้บน Windows
- [x] 2.3 เอา Google Fonts link ออกจาก build path เพื่อลด network dependency
- [ ] 2.4 เติมข้อมูลจริงใน `PortfolioDataService` ให้ตรงกับ resume ล่าสุด
- [x] 2.5 เอา placeholder สำคัญออกหรือซ่อนไว้ก่อน
- [x] 2.6 แก้ TypeScript `rootDir` warning ใน `tsconfig.app.json`
- [ ] 2.7 เพิ่ม unit tests สำหรับ service/form/SSR guards
- [ ] 2.8 ตรวจ GitHub Actions บน remote หลัง push

## Step 3 - Content Polish

- [x] 3.1 เพิ่ม project screenshot หรือ visual preview
- [x] 3.2 ปรับ project descriptions ให้เล่า value มากกว่า tech stack
- [ ] 3.3 เพิ่ม case study link ของ `ApoRaviz_Mooping` เมื่อ project กลับมาทำต่อ
- [x] 3.4 ตรวจ SEO title/description/Open Graph ขั้นแรก
- [ ] 3.5 สร้าง Open Graph image จริงสำหรับ Portfolio เช่น `portfolio-og.png`
- [x] 3.6 ปรับ `Tool Loadout` ให้ยึดจาก `public/resume.png`
- [x] 3.7 ปรับ `Build Journey` ให้สอดคล้องกับ experience ใน resume
- [ ] 3.8 ตรวจ accessibility ของ nav, buttons, links และ form

## Step 4 - Portfolio As Hub

- [x] 4.1 เพิ่ม `ApoRaviz_Mooping` เป็น project card
- [x] 4.2 เพิ่ม `ApoRaviz_Workspace_Docs` เป็น project card
- [x] 4.3 เชื่อม live URL และ GitHub URL จริงของทุก project ที่แสดงบนหน้าเว็บ
- [ ] 4.4 เพิ่ม `Split Order TXT Tool` เป็น selected/internal tool เมื่อพร้อมโชว์
- [ ] 4.5 วาง publish flow สำหรับโปรเจกต์ลูก
- [ ] 4.6 เพิ่มโปรเจกต์ใหม่ผ่าน `PortfolioDataService` เท่านั้น

## Step 5 - Learning And Documentation

- [x] 5.1 เพิ่ม `docs/learning-resume.md` สำหรับโหมดเรียน resume/SEO/Open Graph
- [x] 5.2 เพิ่มบทเรียน Angular config files ใน `_docs/angular`
- [ ] 5.3 เพิ่ม Portfolio case study ใน `ApoRaviz_Workspace_Docs/projects/portfolio/`
- [ ] 5.4 เพิ่ม Git concepts ที่เจอระหว่าง commit/push ใน `ApoRaviz_Workspace_Docs`

## Definition Of Done

```text
npm run build ผ่าน
npm run test:ci ผ่านเมื่อแตะ logic สำคัญ
GitHub Actions ผ่าน
GitHub Pages เปิดได้
SEO title/description/Open Graph image แสดงถูกเมื่อ share link
README/implementation-plan/architecture อ่านแล้วเข้าใจบทบาทของ Portfolio
resume.pdf/png และข้อมูลบนหน้าเว็บไม่ขัดกัน
Portfolio ไม่มีบทเรียนกลางซ้ำกับ Workspace Docs
```
