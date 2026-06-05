# Portfolio Teach Notes

โฟลเดอร์นี้เก็บบทเรียนจากการทำ `ApoRaviz_Portfolio` โดยเน้นตัวอย่างจริงของเว็บ profile/hub

ถ้าต้องการอ่าน concept กลางของ Angular ก่อน ให้เริ่มที่:

```text
_docs/angular/README.md
_docs/angular/teach/README.md
```

## Ownership

```text
_docs/angular/teach/                  = Angular concept กลาง
ApoRaviz_Portfolio/docs/teach/         = ตัวอย่างจริงจาก Portfolio
ApoRaviz_Portfolio/docs/commands.md    = command เฉพาะ Portfolio
```

## Recommended Order

### อ่านเพื่อเรียน Angular กลาง

1. `_docs/angular/teach/01-reactive-signals.md`
2. `_docs/angular/teach/02-services-dependency-injection.md`
3. `_docs/angular/teach/03-app-config-ssr-hydration.md`
4. `_docs/angular/teach/04-browser-apis-ssr-safety.md`
5. `_docs/angular/teach/06-unit-test-regression.md`
6. `_docs/angular/teach/07-cicd-github-pages.md`

### อ่านเพื่อเข้าใจ Portfolio project

1. [Redesign แนว RPG Profile](04-redesign-rpg-profile.md)
2. [Resume Data, Hero Background และ Color](05-resume-data-and-hero-background.md)
3. [Navbar Dropdown และ Custom Smooth Scroll](08-navbar-dropdown-and-smooth-scroll.md)
4. [Component Folder Best Practices](09-component-folder-best-practices.md)

### อ่านไฟล์ local Angular example

ไฟล์ต่อไปนี้ยังอยู่ในโปรเจกต์เพื่อเป็นตัวอย่างจริงที่ผูกกับ source code ของ Portfolio:

1. [Angular Reactive และ Signals](01-angular-reactive-and-signals.md)
2. [Services และ Dependency Injection](02-services-and-dependency-injection.md)
3. [Angular App Config และ SSR](03-angular-app-config-and-ssr.md)
4. [Browser APIs: IntersectionObserver, SSR และ Test](06-browser-apis-intersection-observer-ssr-test.md)
5. [CI/CD ด้วย GitHub Actions](07-cicd-github-actions.md)
6. [Angular .spec.ts และ Unit Test](10-angular-spec-and-unit-test.md)

## Update Rule

- ถ้าเป็น concept ที่ใช้ได้ทุก Angular project ให้สรุปกลับไป `_docs/angular/teach/`
- ถ้าเป็น command pattern กลาง ให้เพิ่มใน `_docs/angular/commands.md`
- ถ้าเป็น behavior เฉพาะ Portfolio เช่น nav smooth scroll, RPG tone, resume data ให้เก็บในโฟลเดอร์นี้
- ถ้าเพิ่ม/แก้หัวข้อที่ต้องแสดงบนหน้า `/teach` ต้อง sync `src/app/pages/teach-page/teach-lessons.ts`

