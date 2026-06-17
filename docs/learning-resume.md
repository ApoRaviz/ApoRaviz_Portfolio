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

## Portfolio 2026 Planning Addendum

ใช้ส่วนนี้เมื่ออยากเรียนและค่อย ๆ ทำ Portfolio ต่อจากแผนระยะยาวใน `docs/next-actions.md` และ `docs/implementation-plan.md`

### 11. Research And Direction Lock

Result:

```text
เข้าใจว่า Portfolio ปี 2026 ควรเป็นบ้านหลักของเรา มีหลักฐานงานจริง อ่านง่าย แชร์ง่าย และไม่เปิดเผยข้อมูลบริษัท
```

- [ ] 11.1 AI อธิบายภาพรวม Portfolio ปี 2026 จากแผนที่วางไว้
- [ ] 11.2 AI เทียบ `docs/progress.md` กับแผนใหม่ เพื่อแยกสิ่งที่ทำเสร็จแล้วกับสิ่งที่ควรทำต่อ
- [ ] 11.3 AI สอนหน้าที่ของไฟล์ `next-actions.md`, `implementation-plan.md`, `progress.md`, และ `learning-resume.md`
- [ ] 11.4 เลือก priority แรกของรอบถัดไป: OG image, enterprise proof, case study, quality, หรือ private/admin area

### 12. OG Image Learning Track

Result:

```text
Portfolio มีภาพ preview สำหรับ LINE/social ที่ดูตั้งใจและสื่อว่าเป็น ApoRaviz Portfolio จริง
```

- [ ] 12.1 AI อ่าน `public/aporaviz-logo.png`, `src/index.html`, และ meta ปัจจุบัน
- [ ] 12.2 AI สอนว่า Open Graph image คืออะไร และทำไมขนาดประมาณ `1200x630` ถึงเหมาะกับ social preview
- [ ] 12.3 ออกแบบ `public/portfolio-og.png` โดยใช้สีเดิมของ Portfolio
- [ ] 12.4 แก้ `og:image` และ `twitter:image` ให้ชี้ไปที่ `portfolio-og.png`
- [ ] 12.5 Build และตรวจ preview หลัง deploy

### 13. Enterprise Proof Learning Track

Result:

```text
อธิบายประสบการณ์ WMS/TMS/ERP หลายปีได้ชัดเจน โดยไม่เปิดเผย code, company data, หรือข้อมูลภายในบริษัท
```

- [ ] 13.1 AI อ่านข้อมูล project/profile/resume ที่เกี่ยวข้องใน Portfolio
- [ ] 13.2 AI สอนวิธีเขียนงาน confidential enterprise work แบบไม่เสี่ยง
- [ ] 13.3 เพิ่ม section หรือ card สำหรับ `Enterprise Systems Experience`
- [ ] 13.4 เขียน project summary ด้วยรูปแบบ `Problem -> Role -> Tech -> Result`
- [ ] 13.5 ตรวจ wording ให้ดู professional และไม่ overclaim

### 14. Case Study Learning Track

Result:

```text
แต่ละ project ไม่ใช่แค่ list technology แต่เล่าวิธีคิดและผลลัพธ์ที่คนอ่านเข้าใจได้เร็ว
```

- [ ] 14.1 วาง format case study: `Problem -> Constraint -> My Role -> Approach -> Result -> Link`
- [ ] 14.2 แตก case study สำหรับ `MooPing Reward`
- [ ] 14.3 แตก case study สำหรับ `Split Order TXT Tool`
- [ ] 14.4 แตก case study สำหรับ `ApoRaviz Workspace Docs`
- [ ] 14.5 แตก case study สำหรับ `Confidential WMS/TMS/ERP`
- [ ] 14.6 ถ้ามีบทเรียน Angular/Node/Nest/PostgreSQL ที่ใช้ซ้ำได้ ให้ย้ายไปเก็บใน `ApoRaviz_Workspace_Docs`

### 15. Quality Learning Track

Result:

```text
Portfolio พร้อมใช้งานจริงมากขึ้น ทั้ง accessibility, performance, security, routing, และ test พื้นฐาน
```

- [ ] 15.1 AI สอน checklist accessibility ที่ควรมีใน Portfolio
- [ ] 15.2 AI สอน performance/Core Web Vitals แบบที่เกี่ยวกับ Angular app จริง
- [ ] 15.3 AI ตรวจ security พื้นฐาน เช่น external links, unsafe DOM, และข้อมูลที่ไม่ควร public
- [ ] 15.4 เพิ่มหรือทบทวน fallback route / 404 experience
- [ ] 15.5 เพิ่ม test ที่คุ้มค่า เช่น data mapping, link mapping, และ SSR-safe guard

### 16. Private/Admin/SSO Decision Track

Result:

```text
รู้ชัดว่า public portfolio ไม่ควรบังคับ SSO และจะใช้ SSO เฉพาะเมื่อมี private/admin area ที่จำเป็นจริง
```

- [ ] 16.1 AI อธิบายความต่างระหว่าง public portfolio กับ private/admin area
- [ ] 16.2 ตัดสินใจว่าต้องมี admin route จริงไหม
- [ ] 16.3 ถ้าต้องมี ให้แตกงาน auth config, guard, callback, token handling, และ error state
- [ ] 16.4 เก็บบทเรียน SSO/Auth ที่ใช้ซ้ำได้ไว้ใน `ApoRaviz_Workspace_Docs`
- [ ] 16.5 ยืนยันว่า SSO ไม่ทำให้หน้า public portfolio ช้าหรือเข้าถึงยากขึ้น

### 17. Bilingual TH/EN Learning Track

Result:

```text
Portfolio มีแผนรองรับปุ่ม TH / EN โดยเข้าใจทั้งเหตุผล วิธีทำ และสิ่งที่ต้องติดตั้งก่อนลงมือจริง
```

- [ ] 17.1 AI สอนว่า Portfolio ควรเป็น `English-first` แต่มี `Thai support` เพื่ออะไร
- [ ] 17.2 AI สอนความต่างระหว่างแปลแบบ data object ง่าย ๆ กับใช้ library i18n เต็มรูปแบบ
- [ ] 17.3 AI อ่าน content/data ปัจจุบัน แล้วชี้ว่าข้อความไหนควรย้ายเข้า bilingual data model
- [ ] 17.4 ออกแบบ type สำหรับข้อความสองภาษา เช่น `LocalizedText = { en: string; th: string }`
- [ ] 17.5 ออกแบบ `LanguageService` หรือ language signal กลางสำหรับเลือกภาษา
- [ ] 17.6 AI สอน SSR-safe ก่อนใช้ `localStorage`, `window`, หรือ browser-only API
- [ ] 17.7 เพิ่มปุ่ม `TH / EN` แบบ accessible โดยใช้ `<button>` เพราะเป็น action เปลี่ยน state
- [ ] 17.8 แปล section สำคัญทีละส่วน: Hero, About, Enterprise Experience, Projects, Resume, Contact
- [ ] 17.9 ถ้าจะติดตั้ง package ใด ๆ ให้ AI อธิบายก่อน:
  - package ชื่ออะไร
  - แก้ปัญหาอะไร
  - คำสั่งติดตั้งคืออะไร
  - จะเพิ่มไฟล์หรือ config อะไร
  - ข้อดี/ข้อเสียเมื่อเทียบกับไม่ติดตั้ง
- [ ] 17.10 ถ้าเรียน Angular i18n/localization เป็นความรู้ใช้ซ้ำได้ ให้บันทึกเพิ่มใน `ApoRaviz_Workspace_Docs`

### 18. Personal Data And Security Learning Track

Result:

```text
ก่อน publish Portfolio รู้ชัดว่าอะไรเปิดเผยได้ อะไรต้องปิดรายละเอียด และอะไรห้ามขึ้นเว็บหรือ GitHub
```

- [ ] 18.1 AI สอนหลัก `Public`, `Redacted`, `Private` สำหรับ Portfolio
- [ ] 18.2 ตรวจ `resume.pdf`, `Resume.png`, OG image, และรูปทั้งหมดใน `public/`
- [ ] 18.3 ตรวจว่ามีข้อมูลส่วนตัวเกินจำเป็นไหม เช่น ที่อยู่บ้าน เลขบัตร เงินเดือน วันเกิดเต็ม หรือเบอร์ที่ไม่อยากให้ search engine เห็น
- [ ] 18.4 ตรวจ PDF/image metadata ถ้ามีข้อมูลไม่ควรเผยแพร่ให้ export ใหม่
- [ ] 18.5 AI สอนวิธีเล่า WMS/TMS/ERP แบบปลอดภัย: ไม่บอกชื่อบริษัท ลูกค้า endpoint schema order number barcode หรือข้อมูลจริงจากระบบ
- [ ] 18.6 ถ้าต้องใช้ screenshot ให้ทำ mock data หรือ mock UI เท่านั้น
- [ ] 18.7 ตรวจ GitHub ว่าไม่มี `.env`, secret, token, key, credential, private note, หรือไฟล์บริษัท
- [ ] 18.8 ตรวจ external links และ target blank security เช่น `rel="noopener noreferrer"`
- [ ] 18.9 ถ้าจะมี contact form ให้ AI สอนก่อนเรื่อง validation, spam protection, rate limit, และ data retention
- [ ] 18.10 ถ้าจะมี analytics/tracking ให้ AI สอนก่อนว่าเก็บข้อมูลอะไร จำเป็นไหม และกระทบ privacy อย่างไร
- [ ] 18.11 ถ้าจะมี admin/SSO ให้ AI สอนก่อนว่า secret ต้องอยู่ backend ไม่ใช่ frontend
- [ ] 18.12 ถ้าเป็นบทเรียน frontend security/privacy ที่ใช้ซ้ำได้ ให้บันทึกเพิ่มใน `ApoRaviz_Workspace_Docs`

## Current Pointer - Portfolio 2026

ถ้าต้องการเริ่มรอบวางระบบ Portfolio ต่อ ให้เริ่มที่:

```text
11.1 AI อธิบายภาพรวม Portfolio ปี 2026 จากแผนที่วางไว้
```

ถ้าต้องการเริ่มเรื่องปุ่มภาษา `TH / EN` โดยตรง ให้เริ่มที่:

```text
17.1 AI สอนว่า Portfolio ควรเป็น English-first แต่มี Thai support เพื่ออะไร
```

ถ้าต้องการเริ่มเรื่องความปลอดภัยของข้อมูลก่อน publish ให้เริ่มที่:

```text
18.1 AI สอนหลัก Public, Redacted, Private สำหรับ Portfolio
```

ถ้าต้องการกลับไปจบงาน resume/social preview เดิม ให้ใช้ `Current Pointer` ด้านบนที่เริ่มจาก `7.1`

## Quick Start For New Chat

ถ้าเปลี่ยนแชท ให้บอก AI ว่า:

```text
portfolio เรียน: resume
อ่าน ApoRaviz_Portfolio/docs/learning-resume.md แล้วเริ่มจาก Current Pointer
```
