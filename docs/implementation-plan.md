# Portfolio Implementation Plan

ไฟล์นี้เป็นแผนละเอียดของ `ApoRaviz_Portfolio` ใช้คู่กับ `docs/progress.md` โดยแผนนี้บอกสิ่งที่จะทำต่อ ส่วน progress บอกสิ่งที่เกิดขึ้นแล้ว

## Working Rules

- ทำทีละ step และติ๊ก `[x]` เฉพาะเมื่อ build/test ผ่านหรือเป็นงานเอกสารที่อัปเดตครบ
- Portfolio เป็น hub หลักสำหรับ link ไปโปรเจกต์ลูก ไม่ควรเอา app ลูกมาใส่ซ้อนใน repo นี้
- ข้อมูล project card ควรแก้ผ่าน `PortfolioDataService` ไม่ hardcode ใน HTML
- โค้ดใหม่ต้องมี comment ภาษาไทยในจุดที่อธิบาย semantic HTML, state, service, SSR guard หรือ UX decision
- ถ้าเพิ่ม teach/commands docs ต้อง sync หน้า `/teach` หรือ `/commands` ด้วย

## Step 0 - Project Baseline

- [x] 0.1 สร้าง Angular 21 project
- [x] 0.2 ใช้ Node 24, TypeScript strict, standalone components และ signals
- [x] 0.3 เปิด SSR/prerender
- [x] 0.4 เพิ่ม Tailwind CSS v4
- [x] 0.5 แยก models, services, section components
- [x] 0.6 เพิ่ม GitHub Actions สำหรับ CI และ GitHub Pages deploy
- [x] 0.7 เพิ่ม docs/teach และ docs/commands
- [x] 0.8 เพิ่ม comment เชิงสอนตาม style ของ portfolio
- [x] 0.9 รวม command docs ให้เหลือ `docs/commands.md`
- [x] 0.10 ย้าย project skill เข้า `.codex/skills/angular-portfolio-mentor`
- [x] 0.11 ลบ prompt/spec เก่า Angular 19 ที่ไม่ตรงกับโปรเจกต์ปัจจุบัน
- [x] 0.12 เพิ่ม `docs/teach/README.md` เพื่อบอกว่า Portfolio teach เป็น local example ส่วน common Angular อยู่ `_docs/angular/`
- [x] 0.13 เชื่อม `docs/commands.md` ไปยัง command กลาง `_docs/angular/commands.md` และ `_docs/git/commands.md`

## Step 1 - Hardening

- [x] 1.1 ใช้ SSR-safe browser API guards
- [x] 1.2 ปรับ `npm run build` ให้ใช้ `CI=1 ng build --progress=false`
- [x] 1.3 เอา Google Fonts link ออกจาก `index.html` เพื่อลด network dependency ตอน build
- [ ] 1.4 เติมข้อมูลจริงใน `PortfolioDataService`
- [ ] 1.5 เอา placeholder สำคัญออกหรือซ่อนไว้ก่อน
- [ ] 1.6 ขยาย `README.md`
- [ ] 1.7 เพิ่ม unit tests สำหรับ service/form/SSR guards
- [ ] 1.8 ตรวจ UI บน desktop และ mobile
- [ ] 1.9 ตรวจ GitHub Actions บน remote หลัง push

## Step 2 - Content Polish

- [ ] 2.1 เพิ่ม project screenshot หรือ visual preview
- [ ] 2.2 ปรับ project descriptions ให้เล่า value มากกว่า tech stack
- [ ] 2.3 เพิ่ม case study ของ `ApoRaviz_Mooping`
- [ ] 2.4 ตรวจ SEO title/description/open graph
- [ ] 2.5 ตรวจ accessibility ของ nav, buttons, links และ form

## Step 3 - Portfolio As Hub

- [x] 3.1 เพิ่ม `ApoRaviz_Mooping` เป็น project card
- [ ] 3.2 เชื่อม live URL และ GitHub URL จริงของทุก project
- [ ] 3.3 เพิ่ม learning/case study links
- [ ] 3.4 วางระบบ publish flow สำหรับโปรเจกต์ลูก
- [ ] 3.5 เพิ่มโปรเจกต์ใหม่ผ่าน `PortfolioDataService` เท่านั้น

## Definition Of Done

```text
npm run build ผ่าน
npm run test:ci ผ่าน
GitHub Actions ผ่าน
GitHub Pages เปิดได้
README/implementation-plan/architecture อ่านแล้วเข้าใจ
Portfolio ไม่มี placeholder สำคัญ
```
