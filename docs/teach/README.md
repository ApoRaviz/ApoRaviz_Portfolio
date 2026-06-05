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

1. [RPG Profile Design Direction](04-redesign-rpg-profile.md)
2. [Resume Data, Hero Background และ Color](05-resume-data-and-hero-background.md)
3. [Navbar Dropdown และ Custom Smooth Scroll](08-navbar-dropdown-and-smooth-scroll.md)
4. [Teach และ Commands Page Structure](09-component-folder-best-practices.md)

## Sync Rule

เมื่อเพิ่มหรือลบบทเรียน:

```text
docs/teach/*.md
docs/teach.md
src/app/pages/teach-page/teach-lessons.ts
```

ต้องตรงกันเสมอ

