# Next Actions

ไฟล์นี้คือจุดเริ่มอ่านเมื่อกลับมาทำ `ApoRaviz_Portfolio` ต่อ

ใช้ไฟล์นี้เพื่อจำงานถัดไปแบบสั้น ๆ ส่วน roadmap ใหญ่ยังอยู่ที่ `docs/implementation-plan.md`

## Current Focus

ทำ Portfolio ให้พร้อมโชว์จริงก่อน แล้วค่อยกลับไปเติมบทเรียนกลางใน `ApoRaviz_Workspace_Docs`

เหตุผล:

- Portfolio คือหน้าบ้านของตัวตน ApoRaviz
- ตอนนี้โครงหลัก, Angular 22 baseline, Quest Board และ link หลักเริ่มนิ่งแล้ว
- สิ่งที่ขาดคือ visual proof, placeholder cleanup, SEO, และการตรวจ UI จริง

## Do Next

- [x] Run build และตรวจหน้าเว็บบน desktop
- [x] ตรวจหน้าเว็บบน mobile width
- [x] ตรวจ placeholder สำคัญใน profile, contact, testimonials, resume และ project data
- [x] ถ้า placeholder ยังไม่พร้อมใช้จริง ให้ซ่อนหรือเปลี่ยนเป็น future slot
- [x] Capture screenshots สำหรับ project cards ที่เป็นโปรเจกต์ลูก
- [x] เพิ่ม screenshots หรือ visual preview เข้า Quest Board
- [ ] ตรวจ SEO title, description และ Open Graph
- [ ] ตรวจ accessibility ของ nav, buttons, links และ contact form
- [ ] Commit งาน Portfolio หลัง visual check ผ่าน

## Screenshot Targets

เริ่มจาก project card ที่พาออกไปดูผลงานจริงก่อน:

- `ApoRaviz_Mooping`
- `ApoRaviz_Workspace_Docs`

หมายเหตุ: `ApoRaviz_Portfolio` ไม่ต้องเป็น project card ของตัวเอง เพราะผู้ใช้กำลังอยู่บนเว็บนี้แล้ว ถ้าต้องใช้ screenshot ของ Portfolio ให้เก็บไว้สำหรับ SEO/Open Graph หรือ case study แทน

แนวทาง:

- ใช้ screenshot จริงจาก local preview หรือ GitHub Pages
- เก็บรูปไว้ใน public asset ของ Portfolio
- เพิ่ม path ของรูปใน `PortfolioDataService`
- ให้ project card แสดงภาพแทน placeholder layer เดิม
- ไม่แสดง `ApoRaviz_Portfolio` เป็น card ของตัวเองใน Quest Board เพื่อไม่ให้ซ้ำกับเว็บที่ผู้ใช้กำลังดูอยู่

## Later

- [ ] เพิ่ม Git concepts ใน `ApoRaviz_Workspace_Docs`
- [ ] เพิ่ม VitePress concepts ใน `ApoRaviz_Workspace_Docs`
- [ ] เพิ่ม Portfolio case study ใน `ApoRaviz_Workspace_Docs/projects/portfolio/`
- [ ] วาง publish flow สำหรับโปรเจกต์ลูก
- [ ] เพิ่ม unit tests สำหรับ service/form/SSR guards

## Memory Rule

```text
next-actions.md        = ตอนนี้ต้องทำอะไรต่อ
implementation-plan.md = roadmap ใหญ่ของ Portfolio
progress.md            = สิ่งที่ทำเสร็จแล้ว
ApoRaviz_Workspace_Docs = ความรู้กลางที่เอาไปเรียนซ้ำได้
```
