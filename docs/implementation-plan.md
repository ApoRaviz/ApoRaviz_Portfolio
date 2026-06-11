# Portfolio Implementation Plan

ไฟล์นี้เป็นแผนของ `ApoRaviz_Portfolio` ใช้คู่กับ `docs/progress.md` โดยแผนนี้บอกสิ่งที่จะทำต่อ ส่วน progress บอกสิ่งที่เกิดขึ้นแล้ว

## Working Rules

- Portfolio เป็น profile/showcase/job site และ project link hub เท่านั้น
- บทเรียนกลาง, Angular concept, Tailwind CSS pattern, command pattern และศัพท์ใหม่ ต้องไปอยู่ที่ `ApoRaviz_Workspace_Docs`
- ข้อมูล project card ควรแก้ผ่าน `PortfolioDataService` ไม่ hardcode ใน HTML
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
- [ ] 1.6 ตรวจ UI หลัง build บน desktop และ mobile

## Step 2 - Hardening

- [x] 2.1 ใช้ SSR-safe browser API guards
- [x] 2.2 ปรับ `npm run build` ให้ใช้ `ng build --progress=false` ที่รันได้บน Windows
- [x] 2.3 เอา Google Fonts link ออกจาก build path เพื่อลด network dependency
- [ ] 2.4 เติมข้อมูลจริงใน `PortfolioDataService`
- [ ] 2.5 เอา placeholder สำคัญออกหรือซ่อนไว้ก่อน
- [ ] 2.6 เพิ่ม unit tests สำหรับ service/form/SSR guards
- [ ] 2.7 ตรวจ GitHub Actions บน remote หลัง push

## Step 3 - Content Polish

- [ ] 3.1 เพิ่ม project screenshot หรือ visual preview
- [x] 3.2 ปรับ project descriptions ให้เล่า value มากกว่า tech stack
- [ ] 3.3 เพิ่ม case study link ของ `ApoRaviz_Mooping` เมื่อ project กลับมาทำต่อ
- [ ] 3.4 ตรวจ SEO title/description/open graph
- [ ] 3.5 ตรวจ accessibility ของ nav, buttons, links และ form

## Step 4 - Portfolio As Hub

- [x] 4.1 เพิ่ม `ApoRaviz_Mooping` เป็น project card
- [x] 4.2 เพิ่ม `ApoRaviz_Workspace_Docs` เป็น project card
- [x] 4.3 เชื่อม live URL และ GitHub URL จริงของทุก project ที่แสดงบนหน้าเว็บ
- [ ] 4.4 วาง publish flow สำหรับโปรเจกต์ลูก
- [ ] 4.5 เพิ่มโปรเจกต์ใหม่ผ่าน `PortfolioDataService` เท่านั้น

## Definition Of Done

```text
npm run build ผ่าน
npm run test:ci ผ่านเมื่อแตะ logic สำคัญ
GitHub Actions ผ่าน
GitHub Pages เปิดได้
README/implementation-plan/architecture อ่านแล้วเข้าใจบทบาทของ Portfolio
Portfolio ไม่มีบทเรียนกลางซ้ำกับ Workspace Docs
```
