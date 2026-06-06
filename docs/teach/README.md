# Portfolio Teach Notes

โฟลเดอร์นี้เก็บบทเรียนเฉพาะ `ApoRaviz_Portfolio`

ถ้าต้องการเรียน Angular พื้นฐาน ให้เริ่มที่เอกสารกลาง:

```text
_docs/angular/teach/README.md
_docs/angular/commands.md
_docs/git/commands.md
```

## What Belongs Here

- decision ที่เกิดจาก Portfolio โดยตรง
- design direction ของเว็บ profile/hub
- flow ของ navbar, route, scroll, dropdown
- วิธีจัดหน้า `/teach` และ `/commands`
- command explanation ที่ผูกกับ Portfolio scripts, path หรือ UI check

## What Does Not Belong Here

- signals, DI, SSR, hydration, browser API, unit test concept กลาง
- Git command pattern กลาง
- Angular CLI command pattern กลาง
- business rule ของ MooPing หรือโปรเจกต์ลูกอื่น

## Current Lessons

1. [RPG Profile Design Direction](01-rpg-profile-design-direction.md)
2. [Resume Data และ Hero Visual System](02-resume-hero-visual-system.md)
3. [Portfolio Navigation Flow](03-portfolio-navigation-flow.md)
4. [Teach และ Commands Page Structure](04-teach-commands-page-structure.md)

## Sync Rule

เมื่อเพิ่มหรือลบบทเรียน:

```text
docs/teach/*.md
docs/teach.md
src/app/pages/teach-page/teach-lessons.ts
```

ต้องตรงกันเสมอ
