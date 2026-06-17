# Next Actions

ไฟล์นี้คือจุดเริ่มอ่านเมื่อกลับมาทำ `ApoRaviz_Portfolio` ต่อ

ใช้ไฟล์นี้เพื่อจำงานถัดไปแบบสั้น ๆ ส่วน roadmap ใหญ่ยังอยู่ที่ `docs/implementation-plan.md` และสิ่งที่ทำเสร็จแล้วอยู่ที่ `docs/progress.md`

## Current Focus

ทำ Portfolio ให้พร้อมโชว์จริงหลังจาก resume, SEO และ Open Graph เริ่มใช้งานได้แล้ว

เป้าหมายรอบถัดไป:

- ให้ข้อมูลหน้าเว็บตรงกับ `public/resume.pdf` และ `public/resume.png`
- ทำ Open Graph image จริงสำหรับเวลาแชร์ link
- ตรวจหน้าเว็บก่อน commit/push รอบต่อไป

## Resume Alignment Rule

`public/resume.pdf` และ `public/resume.png` คือ source of truth สำหรับข้อมูลอาชีพ

หน้าเว็บสามารถเขียนสั้นกว่า resume ได้ และไม่จำเป็นต้องใช้คำที่ดูยกตัวเอง เช่น `Senior` หรือ `expert` ใน hero/profile role แต่ต้องไม่ขัดกันในเรื่องเหล่านี้:

- ชื่อ, role, contact, GitHub และ portfolio URL
- skill หลักใน `Tool Loadout`
- company, job title, date และเนื้อหาหลักใน `Build Journey`
- selected projects ที่ต้องการโชว์ต่อ recruiter หรือคนที่เปิด portfolio

## Do Next

- [ ] อ่าน `docs/learning-resume.md` แล้วเริ่มจาก `Current Pointer`
- [ ] สร้าง Open Graph image จริง เช่น `public/portfolio-og.png` ขนาด 1200x630
- [ ] เปลี่ยน `og:image` และ `twitter:image` ใน `src/index.html` ให้ใช้รูป Open Graph ใหม่
- [x] ปรับ `Tool Loadout` ใน `PortfolioDataService` ให้ยึด skill จาก `public/resume.png`
- [x] ปรับ `Build Journey` ใน `PortfolioDataService` ให้สอดคล้องกับ experience ใน resume
- [ ] ตรวจ accessibility ของ nav, buttons, links และ contact section
- [ ] Run build แล้วตรวจว่า title/meta/resume links ยังถูกต้อง
- [ ] Commit และ push หลังตรวจ GitHub Pages กับ share preview ผ่าน

## Portfolio Data Notes

จุดที่ควรเช็กก่อนแก้:

- `src/app/services/portfolio-data.service.ts`
- `readonly profile`
- `readonly skillGroups`
- `readonly experiences`
- `readonly projects`

สำหรับ `Tool Loadout` ควรยึดจาก resume เป็นหลัก เพราะ resume คือข้อมูลที่ recruiter จะใช้เทียบกับหน้าเว็บ

สำหรับ `Build Journey` ควรยึดจาก resume เช่นกัน แต่หน้าเว็บควรเล่าแบบสั้น อ่านเร็ว และเน้น impact มากกว่า bullet ยาว

สำหรับ hero/profile role ให้ใช้ภาษาที่เจ้าของเว็บสบายใจ ไม่ต้องบังคับให้ตรงกับ resume แบบคำต่อคำ

โทนรวมของหน้าเว็บควรเป็น friendly, playful, learner, gamer-minded และเป็นกันเอง ส่วน `Build Journey` ให้ตรงตามหน้างานจริง

`Split Order TXT Tool` มีอยู่ใน resume แล้ว แต่ยังไม่ควรเพิ่มเป็น project card จนกว่าจะมี screenshot/หน้าอธิบาย หรือปรับปุ่ม project card ให้รองรับ GitHub-only tool โดยไม่ใช้คำว่า `Open Live Site`

## Later

- [ ] เพิ่ม Git concepts ใน `ApoRaviz_Workspace_Docs`
- [ ] เพิ่ม VitePress concepts ใน `ApoRaviz_Workspace_Docs`
- [ ] เพิ่ม Portfolio case study ใน `ApoRaviz_Workspace_Docs/projects/portfolio/`
- [ ] วาง publish flow สำหรับโปรเจกต์ลูก
- [ ] เพิ่ม unit tests สำหรับ service/form/SSR guards

## Memory Rule

```text
next-actions.md          = ตอนนี้ต้องทำอะไรต่อ
implementation-plan.md   = roadmap ใหญ่ของ Portfolio
progress.md              = สิ่งที่ทำเสร็จแล้ว
learning-resume.md       = step เรียนแบบ AI สอนทีละจุด
ApoRaviz_Workspace_Docs  = ความรู้กลางที่เอาไปเรียนซ้ำได้
```
