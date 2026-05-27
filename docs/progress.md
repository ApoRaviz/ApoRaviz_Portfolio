# Progress

เอกสารนี้สรุปว่าโปรเจกต์ `ApoRaviz_Portfolio` ทำอะไรไปแล้ว ทำถึงไหนแล้ว และเหลืออะไรให้กลับมาทำต่อ

## เป้าหมายเริ่มต้น

- สร้าง personal portfolio จากไฟล์สเปก `files/angular-portfolio-spec.md`
- ใช้ prompt หลักจาก `files/angular-portfolio-prompt.md`
- ปรับจาก Angular 19 เป็น Angular 21
- ล็อก runtime เป็น Node 24
- ใช้โลโก้ `ApoRaviz(5*2).png`
- ใช้ชื่อจริง `Tanonchai Promsiri`
- ไม่ใช้ progress bar หรือค่าพลังใน profile/skills
- ใส่ comment ภาษาไทยใน code เพื่อเรียนรู้ว่าบรรทัดสำคัญมีไว้ทำอะไร

## สิ่งที่เลือกใช้

- Angular `21.x`
- Node `24`
- TypeScript `5.9`
- Tailwind CSS v4
- Angular SSR / prerender
- Standalone components
- Angular signals
- Reactive Forms
- Angular Router
- Angular animations provider

## งานที่ทำแล้ว

1. สร้าง Angular 21 project

- ใช้ Angular CLI `21.2.12`
- เปิด standalone component architecture
- เปิด routing
- เปิด SSR / prerender
- ใช้ CSS เป็น style base

2. ตั้งค่า Node 24

- เพิ่ม `.nvmrc`
- เพิ่ม `.node-version`
- ตั้ง `engines.node` ใน `package.json` เป็น `>=24.0.0 <25`

3. ตั้งค่า Tailwind CSS v4

- ติดตั้ง `tailwindcss`
- ติดตั้ง `@tailwindcss/postcss`
- เพิ่ม `.postcssrc.json`
- เพิ่ม `tailwind.config.ts`
- ตั้งค่า theme tokens ใน `src/styles.css`

4. วางโครงสร้าง portfolio

- `src/app/models/portfolio.models.ts`
- `src/app/services/portfolio-data.service.ts`
- `src/app/services/theme.service.ts`
- components:
  - Navbar
  - Hero
  - About
  - Skills
  - Projects
  - Services
  - Experience
  - Testimonials
  - Contact
  - Footer

5. เพิ่มข้อมูล portfolio

- ชื่อ: `Tanonchai Promsiri`
- โลโก้: `public/aporaviz-logo.png`
- Role หลัก:
  - Web App Builder
  - AI Automation Learner
  - Game-Loving Programmer
- Projects mock data 6 รายการ
- Services 7 รายการ
- Experience timeline 4 รายการ
- Testimonials 3 รายการ
- Contact info placeholder

6. ทำ UI ตามสเปก

- Dark premium style
- Orange accent `#FF6B00`
- Glassmorphism แบบพอดี
- Hero section พร้อม typewriter effect
- Sticky navbar
- Mobile menu
- Scroll spy
- Smooth scroll
- Reveal animation ตอน section เข้าจอ
- Skills เป็น badge group เท่านั้น ไม่มี progress bar
- Contact reactive form พร้อม validators และ mock toast

7. ทำ SSR-safe browser APIs

- ใช้ `PLATFORM_ID`
- ใช้ `isPlatformBrowser()`
- guard ก่อนแตะ `window`
- guard ก่อนใช้ `IntersectionObserver`
- guard เพิ่มสำหรับ test environment เช่น jsdom

8. เพิ่ม comment เชิงสอน

- HTML อธิบายว่าทำไมใช้ `section`, `div`, `article`, `button`, `a`, `form`
- TypeScript อธิบาย `inject`, `signal`, lifecycle, browser guard, service state
- Config อธิบาย provider เช่น:
  - `provideBrowserGlobalErrorListeners()`
  - `provideRouter(routes)`
  - `provideClientHydration(withEventReplay())`
  - `provideAnimations()`
  - `provideServerRendering(withRoutes(serverRoutes))`

9. ทำ skill สำหรับโปรเจกต์

- เพิ่ม `skills/angular-portfolio-mentor/SKILL.md`
- ติดตั้งไว้ใน Codex skills folder ด้วย
- skill นี้บอกแนวทางของโปรเจกต์:
  - Angular 21
  - Node 24
  - Tailwind v4
  - SSR-safe
  - comment ภาษาไทยเพื่อเรียนรู้

10. Git และ GitHub

- `git init`
- ตั้ง remote:
  - `https://github.com/ApoRaviz/ApoRaviz_Portfolio.git`
- commit initial Angular portfolio
- merge GitHub initial commit เดิมที่มี `README.md`, `.gitignore`, `LICENSE`
- push ขึ้น `origin/main`

## การตรวจสอบที่ทำแล้ว

- `ng test --watch=false --progress=false`
  - ผ่าน 2 tests
- `ng build --progress=false`
  - ผ่าน production build
  - SSR prerender สำเร็จ
- dev server เคยรันที่ `http://127.0.0.1:4200/`
- ตรวจว่า port 4200 ว่างหลังหยุด server แล้ว

## สถานะล่าสุด

- โปรเจกต์หลักทำงานได้
- Git branch คือ `main`
- Remote คือ `origin/main`
- โครง portfolio พร้อมต่อยอดแล้ว
- มีเอกสาร progress และ teach เพิ่มใน `docs/`
- เพิ่ม `docs/design-direction.md` สำหรับ direction ใหม่ของเว็บ
- เริ่ม redesign เว็บไปทาง `Gamer-minded developer profile`
- เอาชื่อออกจาก navbar ให้เหลือ logo เป็น brand mark
- เปลี่ยน wording หลักให้เป็นกันเองขึ้น และลดคำที่ดูโอ้อวด เช่น pro/professional/expert
- เปลี่ยน concept ของ section:
  - Skills → Loadout
  - Projects → Quest Log
  - Services → Useful Builds
  - Experience → Journey
  - Testimonials → Party Notes
- เพิ่มคำอธิบายรอบ redesign ใน `docs/teach.md`
- ดึงข้อมูลจาก resume มาใส่ใน `Build Journey`
  - Unbox.IT
  - Techsoft Holding
  - Yamato Unyu (Thailand) Co., Ltd.
  - Panjawattana Plastic Public Company Limited
- อัปเดต skill groups ให้ตรงกับ resume มากขึ้น เช่น HTML, CSS, JavaScript, Angular, Ionic, C#, .NET Core, SQL Server, SSRS, Crystal Report
- ปรับ hero background เป็น RPG/HUD style ด้วย grid, radial atmosphere, diagonal energy lines, และ corner frame

## อัปเดตเอกสารสอน

เราแยก `docs/teach.md` จากไฟล์ยาวไฟล์เดียวให้เป็นสารบัญหลัก และสร้าง folder:

```text
docs/teach/
```

ไฟล์ย่อยที่เพิ่ม:

- `01-angular-reactive-and-signals.md`: reactive, signal, set, update, computed, effect
- `02-services-and-dependency-injection.md`: service, inject, dependency injection, browser API guard
- `03-angular-app-config-and-ssr.md`: app config, router, hydration, SSR, prerender
- `04-redesign-rpg-profile.md`: เหตุผลของ redesign แนว gamer/RPG profile
- `05-resume-data-and-hero-background.md`: resume data, Hero background, section/div, color palette

เหตุผลที่แยก:

- อ่านง่ายกว่าไฟล์เดียวที่ยาวมาก
- กลับมาทบทวนเฉพาะเรื่องได้เร็วขึ้น
- เพิ่มบทเรียนใหม่ในอนาคตได้เป็นหมวด ๆ
- `docs/teach.md` กลายเป็นหน้าสารบัญสำหรับเริ่มอ่าน

## สิ่งที่ควรทำต่อ

1. แก้ข้อมูล placeholder จริง

- Email
- LINE
- GitHub
- Facebook
- Resume link
- Project live URLs
- Project GitHub URLs

ไฟล์หลักที่แก้คือ:

```text
src/app/services/portfolio-data.service.ts
```

2. ปรับ content ให้เป็นตัวตนจริงมากขึ้น

- About paragraph
- Project descriptions
- Experience descriptions
- Services wording
- Testimonials ถ้ายังไม่มีลูกค้าจริง อาจเปลี่ยนเป็น case-study style

3. เพิ่มรูปหรือ mockup ของ projects

ตอนนี้ project card ใช้ gradient placeholder อยู่ ถ้ามีภาพจริงหรือ mockup จะทำให้ portfolio ดูน่าเชื่อถือขึ้น

4. ตรวจ responsive ด้วย browser จริง

- Desktop
- Tablet
- Mobile
- Hamburger menu
- Contact form
- Scroll spy

5. Deploy

ตัวเลือกที่เหมาะ:

- Vercel
- Netlify
- GitHub Pages ถ้าปรับเป็น static output

## คำสั่งที่ใช้บ่อย

ใช้ Node 24 ก่อน:

```bash
nvm use 24
```

รัน dev server:

```bash
npm run start
```

build:

```bash
npm run build
```

test:

```bash
npm run test
```

git รอบต่อไป:

```bash
git add .
git commit -m "your message"
git push
```
