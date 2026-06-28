# AGENTS.md

คู่มือทำงานร่วมกันของ AI agents ในโปรเจกต์ `ApoRaviz_Portfolio`

ไฟล์นี้เป็น shared working agreement สำหรับ Codex, Claude และ AI ตัวอื่น ให้อ่านก่อนแก้ code หรือ docs เสมอ

## Project Mode

```text
build
```

โปรเจกต์นี้เป็น **build / showcase** ไม่ใช่ learning project — เน้น ship งานโชว์ผลงาน, ถือว่า stack เข้าใจแล้ว เปิด `../_docs` อ่านเอา, capture **เฉพาะของใหม่จริง** ที่ `../_docs` ยังไม่มีกลับไป (lib ใหม่, pattern ที่ยังไม่เคยจด, gotcha, version bump)

## Project Snapshot

- ทำอะไร: เว็บ profile / showcase / job site ของ ApoRaviz + hub link ไปโปรเจกต์ลูก
- Stack: Angular + Tailwind CSS + standalone components + signals + SSR/prerender, deploy GitHub Pages
- Node: ตาม `.nvmrc` / `../_docs/baseline.md`
- สถานะ: ใช้งานจริง (showcase) — **ไม่เรียน dev ในนี้แล้ว** การเรียนอยู่ที่ `ApoRaviz_DevEng`

รายละเอียดเต็มอยู่ใน `README.md` และ `docs/`

## Workspace Rule (อ่าน doc กลางเสมอ)

โปรเจกต์นี้เป็น child repo ของ workspace `ApoRaviz` ต้องยึดกฏกลางจาก `../_docs` เสมอ:

- `../_docs/WORKSPACE_RULES.md` = บทบาท repo + stack default + boundary
- `../_docs/AI_UPDATE_RULE.md` = ความรู้ไหนไปไหน (Decision Table)
- `../_docs/baseline.md` = version baseline (Node/Angular/Tailwind/TS)
- `../_docs/NEW_PROJECT_GUIDE.md`

ถ้าเปิด `../_docs` ไม่ได้ (คนละเครื่อง / CI): https://github.com/ApoRaviz/ApoRaviz_Workspace_Docs

หลักที่ห้ามลืม:

- `../_docs` = ความรู้กลางจัด**ตาม topic** (W3Schools ของ ApoRaviz) — ความรู้ reusable ให้ซึมเข้าหน้า topic เป็นตัวอย่าง
- design / รายละเอียดเฉพาะ Portfolio อยู่ใน repo นี้
- **Portfolio = โชว์ผลงานอย่างเดียว ไม่ใช่ที่เก็บบทเรียนกลาง** (ดู `../_docs/WORKSPACE_RULES.md` หัวข้อ Portfolio Rule)

## Project-specific Skill

tone / design direction / section ownership เฉพาะเว็บนี้อยู่ใน `.codex/skills/angular-portfolio-mentor/SKILL.md` — ยึดอันนั้นสำหรับงาน design ของ Portfolio

## Commands (machine-agnostic — ใช้ได้ทั้ง PC และ Mac)

```bash
# เลือก Node version ก่อน: macOS `nvm use`, Windows `nvm use <version จาก .nvmrc>`
npm install
npm start
npm run build
npm run test:ci
```

อย่า hardcode path เต็มของ Node เพราะ PC กับ Mac path ต่างกัน — `.nvmrc` + `../_docs/baseline.md` คือความจริงเดียว

## Before Finishing

- build/test รันแล้ว หรือบอกเหตุผลสั้น ๆ
- ความรู้ reusable ไม่ค้างใน chat (build mode = capture เฉพาะของใหม่จริง)
- handoff ให้ agent ถัดไปเข้าใจสถานะจากไฟล์ใน repo
