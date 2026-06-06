# Teach

เอกสารนี้คือสารบัญบทเรียนเฉพาะ `ApoRaviz_Portfolio`

บทเรียนในโปรเจกต์นี้ไม่เก็บ Angular พื้นฐานซ้ำแล้ว เพราะ concept กลางย้ายไปอยู่ที่:

```text
_docs/angular/teach/README.md
_docs/angular/commands.md
_docs/git/commands.md
```

## โปรเจกต์นี้สอนอะไร

`ApoRaviz_Portfolio` สอนวิธีทำ profile หลักให้เป็น project hub ที่มีตัวตนชัด อ่านง่าย และเชื่อมไปยังโปรเจกต์ลูกได้

สิ่งที่ควรเรียนจากโปรเจกต์นี้:

- การกำหนด design direction ก่อนแก้ UI
- การเก็บข้อมูลจริงไว้ใน `PortfolioDataService`
- การออกแบบ Hero ให้เป็น first signal ของตัวตน
- การทำ navbar/route/scroll flow ให้ไม่หลุด
- การทำหน้า `/teach` และ `/commands` ให้สอน command/flow ได้จริง

## Reading Order

1. [RPG Profile Design Direction](teach/01-rpg-profile-design-direction.md)
2. [Resume Data และ Hero Visual System](teach/02-resume-hero-visual-system.md)
3. [Portfolio Navigation Flow](teach/03-portfolio-navigation-flow.md)
4. [Teach และ Commands Page Structure](teach/04-teach-commands-page-structure.md)

## Command Learning Rule

คำสั่งที่อยู่ในหน้า `/commands` หรือ `docs/commands.md` ต้องไม่เป็นแค่รายการ copy/paste

ทุก command ควรตอบ:

```text
ใช้ทำอะไร
ใช้เมื่อไหร่
ตรวจผลลัพธ์อย่างไร
มีข้อควรระวังอะไร
```

ถ้าเป็น command กลาง เช่น `npm ci`, `ng build`, `git status`, `git diff --check` ให้สรุปไว้ที่ `_docs/angular/commands.md` หรือ `_docs/git/commands.md`

ถ้าเป็น command เฉพาะ Portfolio เช่น base-href, route/manual UI check หรือ source path ของหน้า `/teach` ให้เก็บใน `docs/commands.md` และ sync `src/app/pages/commands-page/commands-data.ts`

## Maintenance Rule

- ถ้าเพิ่มหรือแก้หัวข้อใน `docs/teach/` ต้องอัปเดตหน้า `/teach` ด้วย
- หน้า `/teach` ใช้ข้อมูลจาก `src/app/pages/teach-page/teach-lessons.ts`
- ถ้าเพิ่มหรือแก้คำสั่งใน `docs/commands.md` ต้องอัปเดตหน้า `/commands` ด้วย
- หน้า `/commands` ใช้ข้อมูลจาก `src/app/pages/commands-page/commands-data.ts`
- ถ้าเป็น Angular concept กลาง ให้เพิ่มใน `_docs/angular/teach/` ไม่เพิ่มซ้ำใน project teach
