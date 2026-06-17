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

## Step 6 - Portfolio 2026 Content System

- [ ] 6.1 นิยาม content model กลางของ Portfolio: profile, resume, links, projects, enterprise work, case studies
- [ ] 6.2 ให้ข้อมูลที่แสดงบนหน้าเว็บแก้ผ่าน `PortfolioDataService` หรือ data structure กลางก่อน ไม่กระจาย hardcode ใน component HTML
- [ ] 6.3 แยกข้อมูลที่เป็น `public showcase` ออกจากข้อมูลที่เป็น `private/admin` หรือ draft
- [ ] 6.4 เพิ่ม field สำหรับ project card แบบ `problem`, `role`, `tech`, `result`, `links`, `status`
- [ ] 6.5 เพิ่มสถานะ project เช่น `Live`, `In Progress`, `Internal`, `Confidential`, `GitHub-only`
- [ ] 6.6 กำหนดว่า resume PDF/PNG เป็น source of truth ของข้อมูลอาชีพ ส่วนหน้าเว็บเล่าแบบสั้นและอ่านเร็วกว่า

## Step 7 - Proof Of Work And Enterprise Evidence

- [ ] 7.1 เพิ่ม section หรือ evidence card สำหรับ `Enterprise Systems Experience`
- [ ] 7.2 เล่า WMS/TMS/ERP แบบไม่เปิดเผย code บริษัทหรือข้อมูลภายใน
- [ ] 7.3 แยก `Confidential WMS/TMS/ERP` ออกจาก public demo project เพื่อไม่ให้คนเข้าใจว่าต้องมี GitHub/demo
- [ ] 7.4 ปรับ project card ทุกอันให้เล่า value มากกว่า tech stack
- [ ] 7.5 เพิ่ม screenshot/preview เฉพาะโปรเจกต์ที่โชว์ได้จริง
- [ ] 7.6 เพิ่ม `Split Order TXT Tool` เมื่อพร้อมเล่าแบบ GitHub-only หรือ internal tool โดยไม่ใช้ label ที่ทำให้คนคาดหวัง live demo

## Step 8 - Case Study System

- [ ] 8.1 วาง format case study สั้นสำหรับ Portfolio: `Problem -> Constraint -> My Role -> Approach -> Result -> Link`
- [ ] 8.2 ทำ case study summary สำหรับ `MooPing Reward`
- [ ] 8.3 ทำ case study summary สำหรับ `Split Order TXT Tool`
- [ ] 8.4 ทำ case study summary สำหรับ `ApoRaviz Workspace Docs`
- [ ] 8.5 ทำ case study summary สำหรับ `Confidential Enterprise Work`
- [ ] 8.6 ถ้า case study เริ่มกลายเป็นบทเรียน Angular/Node/Backend ให้ย้ายหรือสรุปกลับไป `ApoRaviz_Workspace_Docs`

## Step 9 - Share, SEO, And Hiring Readiness

- [ ] 9.1 ทำ `public/portfolio-og.png` ขนาด 1200x630 ด้วยสีหลักเดิม
- [ ] 9.2 อัปเดต `og:image` และ `twitter:image`
- [ ] 9.3 ตรวจ social preview ใน LINE หลัง deploy
- [ ] 9.4 ทำ ATS/plain resume version แยกจาก resume Canva/PDF สวย
- [ ] 9.5 ตรวจ `Download Resume`, `Preview Resume`, GitHub, email, phone และ portfolio URL
- [ ] 9.6 ตรวจ copy หน้าแรกให้ตอบได้เร็วว่า ApoRaviz คือใคร ทำอะไร และมีหลักฐานอะไร

## Step 10 - Quality, Accessibility, Performance, Security

- [ ] 10.1 Accessibility pass: semantic HTML, heading order, focus state, alt text, button/link purpose
- [ ] 10.2 Performance pass: image size, lazy loading, no unnecessary library, Core Web Vitals mindset
- [ ] 10.3 Security pass: no secret in frontend, avoid unsafe DOM/HTML binding, keep external links intentional
- [ ] 10.4 SSR safety pass: browser APIs guarded with `isPlatformBrowser()`
- [ ] 10.5 เพิ่ม 404/fallback route หรือ GitHub Pages fallback ถ้าจำเป็น
- [ ] 10.6 เพิ่ม tests สำหรับ data/link mapping, service logic, form behavior, SSR guard เมื่อเริ่มมี logic สำคัญ

## Step 11 - Optional Private/Admin/SSO

- [ ] 11.1 ยังไม่บังคับ SSO กับหน้า public portfolio
- [ ] 11.2 ใช้ SSO เฉพาะถ้ามี admin/private route จริง เช่น `/admin`, draft projects, private notes
- [ ] 11.3 ถ้าทำ SSO ให้แยก auth config, route guard, callback flow, token/session handling ให้ชัด
- [ ] 11.4 ถ้าบทเรียน SSO ใช้ซ้ำได้ ให้จดกลับไป `ApoRaviz_Workspace_Docs`
- [ ] 11.5 ตรวจว่า private/admin feature ไม่ทำให้เว็บ public ช้า ซับซ้อน หรือสมัครงานยากขึ้น

## Step 12 - Automation And Long-term Maintenance

- [ ] 12.1 เพิ่ม pre-release checklist ใน docs: build, test, link check, mobile check, resume check, OG check
- [ ] 12.2 พิจารณา automated screenshot check สำหรับหน้า homepage/resume area เมื่อ UI นิ่ง
- [ ] 12.3 พิจารณา link check สำหรับ resume, GitHub, live demo, Workspace Docs
- [ ] 12.4 แยก commit ตาม repo เมื่อมีการแก้ทั้ง Portfolio และ Workspace Docs
- [ ] 12.5 อัปเดต `docs/progress.md` เมื่อ phase สำคัญเสร็จจริง

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
