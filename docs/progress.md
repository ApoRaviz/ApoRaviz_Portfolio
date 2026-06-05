# Portfolio Progress

ไฟล์นี้เก็บสถานะล่าสุดของ `ApoRaviz_Portfolio` ส่วนสิ่งที่จะทำต่ออยู่ที่ `docs/implementation-plan.md`

## Current Role

`ApoRaviz_Portfolio` คือ profile หลักของ ApoRaviz และเป็น hub สำหรับ link ไปยังโปรเจกต์ลูก เช่น `ApoRaviz_Mooping`

## Done

- [x] สร้าง Angular 21 project พร้อม routing, SSR/prerender และ standalone components
- [x] ใช้ Node 24, TypeScript strict, Angular signals และ `inject()`
- [x] เพิ่ม Tailwind CSS v4 และ dark/orange ApoRaviz visual direction
- [x] แยกข้อมูลหลักไว้ใน `PortfolioDataService`
- [x] แยก scroll/theme state ไว้ใน `ThemeService`
- [x] เพิ่ม section components: navbar, hero, about, skills, projects, services, experience, testimonials, contact, footer
- [x] เพิ่ม comment ภาษาไทยเพื่ออธิบาย semantic HTML, Angular state, SSR guard และ UX decisions
- [x] เพิ่ม `docs/architecture.md`
- [x] เพิ่ม `docs/design-direction.md`
- [x] เพิ่ม `docs/commands.md`
- [x] เพิ่ม `docs/implementation-plan.md`
- [x] เพิ่ม `docs/teach.md` และ `docs/teach/`
- [x] รวม command docs ย่อยให้เหลือ `docs/commands.md`
- [x] ย้าย project skill ไปที่ `.codex/skills/angular-portfolio-mentor/SKILL.md`
- [x] ลบ generic UI skill copy ที่ซ้ำกับกติกากลาง
- [x] ลบ prompt/spec เก่า Angular 19 เพื่อไม่ให้สับสนกับ Angular 21
- [x] เพิ่ม `ApoRaviz_Mooping` เป็น project card ใน portfolio
- [x] เพิ่ม GitHub Actions สำหรับ CI และ GitHub Pages deploy
- [x] เอา external Google Fonts ออกจาก build path เพื่อลด dependency กับ network
- [x] ปรับ build script ให้ใช้ CI mode และปิด progress output

## Current Docs

```text
README.md
docs/architecture.md
docs/commands.md
docs/design-direction.md
docs/implementation-plan.md
docs/progress.md
docs/teach.md
docs/teach/
.codex/skills/angular-portfolio-mentor/SKILL.md
```

## Keep In Mind

- ถ้าเพิ่มหรือแก้หัวข้อใน `docs/teach/` ต้อง sync หน้า `/teach` ด้วย
- ถ้าเพิ่มหรือแก้คำสั่งใน `docs/commands.md` ต้อง sync หน้า `/commands` ด้วย
- Project card ใหม่ควรเพิ่มผ่าน `PortfolioDataService` ไม่ hardcode ใน HTML
- โค้ดใหม่ควรมี comment ภาษาไทยในจุดที่สอน intent หรือ decision สำคัญ

## Next

ดู checklist ล่าสุดใน:

```text
docs/implementation-plan.md
```
