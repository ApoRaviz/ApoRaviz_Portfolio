# Portfolio Progress

ไฟล์นี้เก็บสถานะล่าสุดของ `ApoRaviz_Portfolio`

อ่านคู่กับ:

- `docs/next-actions.md` สำหรับงานถัดไปแบบสั้น
- `docs/implementation-plan.md` สำหรับ roadmap ใหญ่
- `docs/learning-resume.md` สำหรับโหมดเรียนแบบทำทีละ step

## Current Role

`ApoRaviz_Portfolio` คือ profile/showcase/job site ของ ApoRaviz และเป็น hub สำหรับ link ไปยังโปรเจกต์ลูก

บทเรียนกลางและความรู้ใหม่ที่ใช้ซ้ำได้ควรกลับไปอยู่ที่ `ApoRaviz_Workspace_Docs` ส่วน Portfolio เก็บเฉพาะเอกสารที่เกี่ยวกับโปรเจกต์นี้โดยตรง

## Done

- [x] สร้าง Angular project พร้อม routing, SSR/prerender และ standalone components
- [x] Upgrade frontend baseline ปัจจุบันเป็น Angular 22 + TypeScript 6.0.x
- [x] ใช้ Node 24, TypeScript strict, Angular signals และ `inject()`
- [x] เพิ่ม Tailwind CSS v4 และ dark/orange ApoRaviz visual direction
- [x] แยกข้อมูลหลักไว้ใน `PortfolioDataService`
- [x] แยก scroll/theme state ไว้ใน `ThemeService`
- [x] เพิ่ม section components: navbar, hero, about, skills, projects, services, experience, testimonials, contact, footer
- [x] เพิ่ม `docs/architecture.md`
- [x] เพิ่ม `docs/design-direction.md`
- [x] เพิ่ม `docs/commands.md`
- [x] เพิ่ม `docs/implementation-plan.md`
- [x] เพิ่ม `docs/next-actions.md`
- [x] เพิ่ม `docs/learning-resume.md` สำหรับโหมดเรียน resume/SEO/Open Graph แบบทำทีละ step
- [x] รวม command docs ย่อยให้เหลือ `docs/commands.md`
- [x] ปรับ README ให้บอกว่า Portfolio คือ profile/showcase hub
- [x] ย้าย project skill ไปที่ `.codex/skills/angular-portfolio-mentor/SKILL.md`
- [x] ลบ generic UI skill copy ที่ซ้ำกับกติกากลาง
- [x] ลบ prompt/spec เก่าเพื่อไม่ให้สับสนกับ frontend baseline ปัจจุบัน
- [x] เพิ่ม `ApoRaviz_Mooping` เป็น project card ใน portfolio
- [x] เพิ่ม `ApoRaviz_Workspace_Docs` เป็น project card ใน portfolio
- [x] ปรับ Quest section ให้ยังคงตัวตนแบบเกม แต่สื่อชัดขึ้นว่าเป็นผลงานจริง พร้อมแก้ live/GitHub link
- [x] เพิ่ม screenshot preview ให้ Quest Board และซ่อน Portfolio self-card ไม่ให้ซ้ำกับเว็บปัจจุบัน
- [x] ตรวจ Quest Board บน desktop และ mobile หลัง build
- [x] ซ่อน placeholder สำคัญ เช่น LINE/Facebook/testimonial/demo projects จนกว่าจะมีข้อมูลจริง
- [x] เพิ่ม GitHub Actions สำหรับ CI และ GitHub Pages deploy
- [x] เอา external Google Fonts ออกจาก build path เพื่อลด dependency กับ network
- [x] ปรับ build script ให้ใช้ command ที่รันได้บน Windows และปิด progress output
- [x] ลบ internal learning pages/docs ของ Portfolio เพื่อให้ Workspace Docs เป็น learning hub เดียว
- [x] ปรับ navbar ให้มี link ไป `ApoRaviz_Workspace_Docs`
- [x] เพิ่ม resume PDF และ resume PNG preview ใน `public`
- [x] ปรับ resume links ใน `PortfolioDataService` ให้เปิด `resume.pdf` และ `resume.png`
- [x] ปรับปุ่ม About ให้มี `Download Resume` และ `Preview Resume`
- [x] แก้ SEO title/description ใน `src/index.html`
- [x] เพิ่ม Open Graph และ Twitter card meta ใน `src/index.html`
- [x] ปรับ `app.ts` ให้ title/description runtime ตรงกับ `index.html`
- [x] ทดสอบ share preview ใน LINE แล้วเห็น `og:title`, description และ image preview
- [x] ปรับ `Build Journey` ให้ใช้ตำแหน่งและเนื้อหาตาม resume โดยไม่บังคับให้ hero/profile role ใช้คำว่า Senior
- [x] ปรับ `Tool Loadout` ให้ยึด skill จาก resume โดยยังแสดงเป็น badge อ่านง่ายบนหน้าเว็บ
- [x] ปรับ SEO title/description ให้เป็น `Developer Portfolio` และโทน friendly แทนการใช้ `Senior Full Stack Developer` เป็นตัวตนหลัก
- [x] แก้ TypeScript warning ใน `tsconfig.app.json` ด้วย `rootDir: "./src"`
- [x] ตั้งค่า Prettier ใน `.vscode/settings.json` และ `.prettierrc`
- [x] เพิ่มบทเรียน Angular config files ใน `_docs/angular`

## Current Docs

```text
README.md
docs/architecture.md
docs/commands.md
docs/design-direction.md
docs/implementation-plan.md
docs/learning-resume.md
docs/next-actions.md
docs/progress.md
.codex/skills/angular-portfolio-mentor/SKILL.md
```

## Keep In Mind

- ถ้าเจอ Angular concept, Tailwind CSS pattern, command pattern หรือศัพท์ใหม่ ให้เพิ่มบทเรียนที่ `ApoRaviz_Workspace_Docs`
- Portfolio ควรเพิ่ม project card ผ่าน `PortfolioDataService` ไม่ hardcode ใน HTML
- Resume PDF/PNG เป็น source of truth ของข้อมูลอาชีพ ส่วนหน้าเว็บเขียนให้สั้นและอ่านง่ายกว่าได้
- Hero/profile role ใช้ภาษาที่เจ้าของเว็บสบายใจได้ ไม่จำเป็นต้องใช้คำว่า `Senior` หรือ `expert`
- โทนหน้าเว็บควรเป็น friendly learner/gamer ส่วน `Build Journey` ใช้ข้อมูลหน้างานจริง
- โค้ดใหม่ควรมี comment ภาษาไทยเฉพาะจุดที่สอน intent หรือ decision สำคัญ

## Next

ดู checklist ล่าสุดใน:

```text
docs/next-actions.md
```
