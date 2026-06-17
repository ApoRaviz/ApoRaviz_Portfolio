# Learning Checklist - Resume Portfolio Polish

ไฟล์นี้ใช้จำสถานะตอนเรียนของงาน resume และ portfolio release polish

ใช้เมื่อพิมพ์:

```text
portfolio เรียน: resume
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

## Today Done

### 1. Resume Link

Result:

```text
คนกด resume แล้วไม่เจอ 404 เพราะทุก link ชี้ไปไฟล์ที่มีอยู่จริง
```

- [x] 1.1 AI อ่าน asset และ data ที่เกี่ยวข้อง
  - `public/resume.pdf`
  - `public/resume.png`
  - `src/app/services/portfolio-data.service.ts`
- [x] 1.2 AI สอนว่า `resumeUrl` และ `resumePageUrl` ใช้ทำอะไร
- [x] 1.3 AI ให้ snippet สำหรับแก้ data link
- [x] 1.4 เรา copy snippet ไปใส่เอง
- [x] 1.5 AI ตรวจว่าไม่มี link ชี้ไปไฟล์ที่ไม่มีจริง เช่น `resume.html`

### 2. Resume Buttons

Result:

```text
คนดูเข้าใจทันทีว่าปุ่มไหนคือ download PDF และปุ่มไหนคือ preview resume
```

- [x] 2.1 AI อ่านปุ่ม resume ใน `about.component.html`
- [x] 2.2 AI สอนความต่างระหว่างปุ่ม View, Preview และ Download
- [x] 2.3 AI ให้ snippet สำหรับแก้ปุ่ม resume
- [x] 2.4 เรา copy snippet ไปใส่เอง
- [x] 2.5 AI ตรวจว่าปุ่มเปิด `resume.pdf` ได้ และไม่พาไป 404
- [x] 2.6 Format `about.component.html` หลังแก้ปุ่ม resume

### 3. SEO Meta

Result:

```text
Google และ browser tab อ่านชื่อเว็บกับคำอธิบายได้ชัดขึ้นว่าเป็น portfolio สมัครงานของ Tanonchai Promsiri และชื่อแฝง ApoRaviz
```

- [x] 3.1 AI อ่าน `src/index.html`
- [x] 3.2 AI สอนว่า `title` และ `description` คืออะไร
- [x] 3.3 AI ให้ snippet สำหรับ SEO meta
- [x] 3.4 เรา copy snippet ไปใส่เอง
- [x] 3.5 AI ตรวจว่า title/description สื่อชื่อจริง ชื่อแฝง และบทบาทชัดเจน
- [x] 3.6 AI ตรวจว่า `src/app/app.ts` ไม่ตั้งค่า title/meta เก่าทับ `index.html`

### 4. Open Graph Meta

Result:

```text
เวลาแชร์ link ไป LINE, Facebook, LinkedIn หรือ Discord จะมี preview ที่ดูน่าเชื่อถือขึ้น
```

- [x] 4.1 AI สอนว่า Open Graph คือ social preview ตอนแชร์ link
- [x] 4.2 AI ช่วยเลือกภาพ preview ชั่วคราว
- [x] 4.3 AI ให้ snippet สำหรับ `og:*` และ `twitter:*`
- [x] 4.4 เรา copy snippet ไปใส่เอง
- [x] 4.5 AI ตรวจว่ามี meta สำคัญครบ
- [x] 4.6 เราลองแชร์ใน LINE แล้วเห็น preview จริง

Meta ที่มีแล้ว:

```text
og:title
og:description
og:type
og:url
og:image
twitter:card
twitter:title
twitter:description
twitter:image
```

### 5. Verify

Result:

```text
มั่นใจว่า code ที่แก้ไม่ทำให้ Angular build พัง และ output มี SEO/Open Graph ใหม่จริง
```

- [x] 5.1 AI สอนว่าจะตรวจด้วย command อะไร
- [x] 5.2 Run `npm run build`
- [x] 5.3 AI ตรวจผล build
- [x] 5.4 AI ตรวจ output ใน `dist/portfolio/browser/index.html`
- [x] 5.5 AI ตรวจว่า source และ dist ไม่มีค่าเก่า `Gamer-Minded` เหลือ

Command หลัก:

```bash
npm run build
```

### 6. Side Learning Captured

Result:

```text
ความรู้ที่ใช้ซ้ำได้ไม่หายอยู่แค่ในแชท
```

- [x] 6.1 แก้ TypeScript 6 warning ด้วย `rootDir: "./src"` ใน `tsconfig.app.json`
- [x] 6.2 เรียนความต่างของ local Angular CLI กับ global Angular CLI
- [x] 6.3 เรียนการใช้ npm script พร้อม port เช่น `npm run start -- --host 127.0.0.1 --port 4300`
- [x] 6.4 เรียนเรื่อง Prettier, formatter, และ VS Code default formatter
- [x] 6.5 จดบทเรียนกลางไว้ที่ `_docs/angular/teach/11-angular-config-files.md`
- [x] 6.6 อัปเดต `_docs/angular/index.md` และ `_docs/angular/teach/index.md`

## Tomorrow Plan

### 7. Make Real Open Graph Image

Result:

```text
LINE/social preview จะดูตั้งใจมากขึ้น ไม่ใช้ logo image ที่โดนครอปแบบชั่วคราว
```

- [ ] 7.1 AI อ่าน `public/aporaviz-logo.png`, `src/index.html`, และ current LINE preview
- [ ] 7.2 AI สอนว่า OG image ที่ดีควรเป็นขนาดประมาณ `1200x630` เพราะ social preview ชอบภาพแนวนอน
- [ ] 7.3 วางข้อความบนภาพ `portfolio-og.png`
  - `ApoRaviz`
  - `Tanonchai Promsiri`
  - `Developer Portfolio`
  - `Friendly Web Apps | Workflows | AI-assisted Tools`
- [ ] 7.4 สร้างหรือออกแบบ `public/portfolio-og.png`
- [ ] 7.5 แก้ `og:image` และ `twitter:image` ให้ชี้ไป `portfolio-og.png`
- [ ] 7.6 AI ตรวจภาพและ meta หลังแก้

### 8. Re-test Share Preview

Result:

```text
ยืนยันว่า preview ที่ส่งให้คนอื่นเห็นใน LINE/social app ดูถูกต้องหลัง deploy
```

- [ ] 8.1 Build อีกครั้ง
- [ ] 8.2 Commit และ push `ApoRaviz_Portfolio`
- [ ] 8.3 รอ GitHub Actions deploy ผ่าน
- [ ] 8.4 ส่ง link ใน LINE อีกครั้ง
- [ ] 8.5 ถ้า LINE ยังจำรูปเก่า ให้เรียนเรื่อง social preview cache

### 9. Final Portfolio Checks

Result:

```text
Portfolio พร้อมส่ง link ให้คนดูจริงมากขึ้น
```

- [ ] 9.1 ตรวจปุ่ม `Download Resume`
- [ ] 9.2 ตรวจปุ่ม `Preview Resume`
- [ ] 9.3 ตรวจ browser tab title
- [ ] 9.4 ตรวจ mobile layout แบบเร็ว
- [ ] 9.5 ตรวจ contact links เช่น email, phone, GitHub

### 10. Git And Docs Cleanup

Result:

```text
repo สะอาด และความรู้ที่เรียนวันนี้ถูกเก็บไว้ถูกที่
```

- [ ] 10.1 ตรวจ `git status` ของ `ApoRaviz_Portfolio`
- [ ] 10.2 ตรวจ `git status` ของ `_docs`
- [ ] 10.3 แยก commit คนละ repo ถ้ามีการแก้ทั้งสองที่
- [ ] 10.4 อัปเดต `docs/next-actions.md` หรือ `docs/progress.md` ถ้างาน resume/SEO/OG จบแล้ว
- [ ] 10.5 สรุปสิ่งที่เรียนเพิ่มและตัดสินใจว่าต้องจด `_docs` เพิ่มไหม

## Current Pointer

เริ่มรอบถัดไปที่:

```text
7.1 AI อ่าน public/aporaviz-logo.png, src/index.html, และ current LINE preview
```

## Quick Start For New Chat

ถ้าเปลี่ยนแชท ให้บอก AI ว่า:

```text
portfolio เรียน: resume
อ่าน ApoRaviz_Portfolio/docs/learning-resume.md แล้วเริ่มจาก Current Pointer
```
