# Portfolio Progress

ไฟล์นี้เก็บสถานะล่าสุดของ `ApoRaviz_Portfolio` ส่วนสิ่งที่จะทำต่ออยู่ที่ `docs/implementation-plan.md`

## Current Role

`ApoRaviz_Portfolio` คือ profile/showcase/job site ของ ApoRaviz และเป็น hub สำหรับ link ไปยังโปรเจกต์ลูก

บทเรียนกลางและความรู้ใหม่ทั้งหมดต้องกลับไปอยู่ที่ `ApoRaviz_Workspace_Docs` ส่วน Portfolio แสดงลิงก์และผลงานเท่านั้น

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
- [x] รวม command docs ย่อยให้เหลือ `docs/commands.md`
- [x] ปรับ README ให้บอกว่า Portfolio คือ profile/showcase hub
- [x] ย้าย project skill ไปที่ `.codex/skills/angular-portfolio-mentor/SKILL.md`
- [x] ลบ generic UI skill copy ที่ซ้ำกับกติกากลาง
- [x] ลบ prompt/spec เก่าเพื่อไม่ให้สับสนกับ frontend baseline ปัจจุบัน
- [x] เพิ่ม `ApoRaviz_Mooping` เป็น project card ใน portfolio
- [x] เพิ่ม `ApoRaviz_Workspace_Docs` เป็น project card ใน portfolio
- [x] ปรับ Quest section ให้ยังคงตัวตนแบบเกม แต่สื่อชัดขึ้นว่าเป็นผลงานจริง พร้อมแก้ live/GitHub link
- [x] เพิ่ม GitHub Actions สำหรับ CI และ GitHub Pages deploy
- [x] เอา external Google Fonts ออกจาก build path เพื่อลด dependency กับ network
- [x] ปรับ build script ให้ใช้ command ที่รันได้บน Windows และปิด progress output
- [x] ลบ internal learning pages/docs ของ Portfolio เพื่อให้ Workspace Docs เป็น learning hub เดียว
- [x] ปรับ navbar ให้มี link ไป `ApoRaviz_Workspace_Docs`

## Current Docs

```text
README.md
docs/architecture.md
docs/commands.md
docs/design-direction.md
docs/implementation-plan.md
docs/progress.md
.codex/skills/angular-portfolio-mentor/SKILL.md
```

## Keep In Mind

- ถ้าเจอ Angular concept, Tailwind CSS pattern, command pattern หรือศัพท์ใหม่ ให้เพิ่มบทเรียนที่ `ApoRaviz_Workspace_Docs`
- Portfolio ควรเพิ่ม project card ผ่าน `PortfolioDataService` ไม่ hardcode ใน HTML
- Portfolio ควร link ไป learning hub กลาง ไม่สร้างบทเรียนแยกใน repo นี้
- โค้ดใหม่ควรมี comment ภาษาไทยเฉพาะจุดที่สอน intent หรือ decision สำคัญ

## Next

ดู checklist ล่าสุดใน:

```text
docs/implementation-plan.md
```
