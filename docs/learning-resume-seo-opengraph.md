# Learning Checklist - Resume, SEO, Open Graph

ไฟล์นี้ใช้จำสถานะตอนเรียนของงาน:

```text
portfolio เรียน: resume seo opengraph
```

เป้าหมายคือให้ AI สอนทีละ step แล้วให้เรา copy code ไปใส่เอง จากนั้น AI ตรวจหลังทำเสร็จ ทำวนแบบนี้จนจบงาน

## Learning Rules

- AI ต้องอ่านไฟล์จริงก่อนสอนทุก step
- AI อธิบายว่าแก้ทำไม ก่อนบอกว่าแก้อะไร
- AI ต้องบอกด้วยว่าแก้เสร็จแล้วจะส่งผลอะไรกับเว็บ คนดู หรือการสมัครงาน
- AI ให้ snippet เฉพาะก้อนเล็ก ๆ เพื่อให้เรา copy เอง
- AI ห้ามแก้ไฟล์แทนในโหมดเรียน เว้นแต่เราบอกว่าให้จัดการเอง
- เราเป็นคน copy code ลงไฟล์
- หลังเราแก้เสร็จ AI ต้องตรวจ diff หรืออ่านไฟล์ซ้ำ
- ถ้าผ่าน ให้ติ๊ก `[x]` ใน checklist
- ถ้ายังไม่ผ่าน ให้บอกจุดแก้และวนตรวจใหม่

## Status

```text
[ ] = ยังไม่เสร็จ
[x] = เสร็จแล้ว
```

## 1. Resume Link

Result:

```text
คนกด resume แล้วไม่เจอ 404 เพราะทุก link ชี้ไปไฟล์ที่มีอยู่จริง
```

- [ ] 1.1 AI อ่าน asset และ data ที่เกี่ยวข้อง
  - `public/resume.pdf`
  - `public/resume.png`
  - `src/app/services/portfolio-data.service.ts`
- [ ] 1.2 AI สอนว่า `resumeUrl` และ `resumePageUrl` ใช้ทำอะไร
- [ ] 1.3 AI ให้ snippet สำหรับแก้ data link
- [ ] 1.4 เรา copy snippet ไปใส่เอง
- [ ] 1.5 AI ตรวจว่าไม่มี link ชี้ไปไฟล์ที่ไม่มีจริง เช่น `resume.html`

Checkpoint:

```text
resume link ต้องชี้ไปไฟล์ที่มีอยู่จริงใน public
```

## 2. Resume Buttons

Result:

```text
คนดูเข้าใจทันทีว่าปุ่มไหนคือ download PDF และปุ่มไหนคือ preview resume
```

- [ ] 2.1 AI อ่านปุ่ม resume ใน `about.component.html`
- [ ] 2.2 AI สอนความต่างระหว่างปุ่ม View, Preview และ Download
- [ ] 2.3 AI ให้ snippet สำหรับแก้ปุ่ม resume
- [ ] 2.4 เรา copy snippet ไปใส่เอง
- [ ] 2.5 AI ตรวจว่าปุ่มเปิด `resume.pdf` ได้ และไม่พาไป 404

Checkpoint:

```text
ปุ่ม resume ต้องเปิด PDF ได้จริง
```

## 3. SEO Meta

Result:

```text
Google และ browser tab อ่านชื่อเว็บกับคำอธิบายได้ชัดขึ้นว่าเป็น portfolio สมัครงานของ Tanonchai Promsiri
```

- [ ] 3.1 AI อ่าน `src/index.html`
- [ ] 3.2 AI สอนว่า `title` และ `description` คืออะไร
- [ ] 3.3 AI ให้ snippet สำหรับ SEO meta
- [ ] 3.4 เรา copy snippet ไปใส่เอง
- [ ] 3.5 AI ตรวจว่า title/description สื่อชื่อและบทบาทของ Tanonchai Promsiri ชัดเจน

Checkpoint:

```text
หน้าเว็บต้องมี title และ description ที่เหมาะกับ portfolio สมัครงาน
```

## 4. Open Graph Meta

Result:

```text
เวลาแชร์ link ไป LINE, Facebook, LinkedIn หรือ Discord จะมี preview ที่ดูน่าเชื่อถือขึ้น
```

- [ ] 4.1 AI สอนว่า Open Graph คือ social preview ตอนแชร์ link
- [ ] 4.2 AI ช่วยเลือกภาพ preview ชั่วคราวหรือภาพจริง
- [ ] 4.3 AI ให้ snippet สำหรับ `og:*` และ `twitter:*`
- [ ] 4.4 เรา copy snippet ไปใส่เอง
- [ ] 4.5 AI ตรวจว่ามี meta สำคัญครบ

Meta ที่ต้องมีอย่างน้อย:

```text
og:title
og:description
og:type
og:url
og:image
twitter:card
```

Checkpoint:

```text
เวลาแชร์ link ควรมีชื่อเว็บ คำอธิบาย และภาพ preview
```

## 5. Verify

Result:

```text
มั่นใจว่า code ที่แก้ไม่ทำให้ Angular build พัง และ checklist ตอนเรียนจบจริง
```

- [ ] 5.1 AI สอนว่าจะตรวจด้วย command อะไร
- [ ] 5.2 เรารัน build หรือให้ AI รันตามที่ตกลง
- [ ] 5.3 AI ตรวจผล build
- [ ] 5.4 AI ตรวจ git diff ของไฟล์ที่แก้
- [ ] 5.5 อัปเดต `docs/next-actions.md` หรือ `docs/progress.md` ถ้างานจบแล้ว

Command หลัก:

```bash
npm run build
```

Checkpoint:

```text
build ผ่าน และ checklist ทั้งหมดเป็น [x]
```

## Current Pointer

เริ่มรอบถัดไปที่:

```text
1.1 AI อ่าน asset และ data ที่เกี่ยวข้อง
```
