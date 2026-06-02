# Teach

เอกสารเรียนรู้ของโปรเจกต์นี้ถูกแยกเป็นไฟล์ย่อยตามหัวข้อแล้ว เพื่อให้อ่านง่ายและกลับมาทบทวนเฉพาะเรื่องได้เร็วขึ้น

## แนะนำลำดับการอ่าน

1. [Angular Reactive และ Signals](teach/01-angular-reactive-and-signals.md)
2. [Services และ Dependency Injection](teach/02-services-and-dependency-injection.md)
3. [Angular App Config และ SSR](teach/03-angular-app-config-and-ssr.md)
4. [Redesign แนว RPG Profile](teach/04-redesign-rpg-profile.md)
5. [Resume Data, Hero Background และ Color](teach/05-resume-data-and-hero-background.md)
6. [Browser APIs: IntersectionObserver, SSR และ Test](teach/06-browser-apis-intersection-observer-ssr-test.md)
7. [CI/CD ด้วย GitHub Actions](teach/07-cicd-github-actions.md)
8. [Navbar Dropdown และ Custom Smooth Scroll](teach/08-navbar-dropdown-and-smooth-scroll.md)

## กฎการ sync กับหน้าเว็บ

- ถ้าเพิ่มหรือแก้หัวข้อใน `docs/teach/` ต้องอัปเดตหน้า `/teach` ด้วย
- หน้า `/teach` ใช้ HTML/popup ในเว็บ ไม่พาผู้ใช้ไปเปิดไฟล์ `.md` โดยตรง
- ถ้ามี HTML ใหม่ ต้องใส่ comment เชิงสอนอธิบาย semantic element และ `div` สำคัญเสมอ

## แต่ละไฟล์มีอะไรบ้าง

### 1. Angular Reactive และ Signals

อ่านเรื่อง:

- `reactive` ของ Angular คืออะไร
- `signal` คืออะไร
- อ่านค่า signal ด้วย `()`
- เปลี่ยนค่า signal ด้วย `set()` และ `update()`
- `computed()` และ `effect()`
- ตัวอย่างจาก `ThemeService`, `HeroComponent`, `ContactComponent`

### 2. Services และ Dependency Injection

อ่านเรื่อง:

- ทำไมบางข้อมูลต้องอยู่ใน service
- `PortfolioDataService` มีไว้ทำไม
- `ThemeService` มีไว้ทำไม
- `inject()` คืออะไร
- dependency injection คืออะไร
- ทำไมต้อง guard browser APIs ในโปรเจกต์ SSR

### 3. Angular App Config และ SSR

อ่านเรื่อง:

- `app.config.ts` คืออะไร
- `provideBrowserGlobalErrorListeners()` ใช้ทำอะไร
- `provideRouter(routes)` ใช้ทำอะไร
- `provideClientHydration(withEventReplay())` คืออะไร
- `provideAnimations()` คืออะไร
- `provideServerRendering(withRoutes(serverRoutes))` คืออะไร
- `prerender` กับ `hydration` ต่างกันยังไง

### 4. Redesign แนว RPG Profile

อ่านเรื่อง:

- ทำไมต้องมี `docs/design-direction.md`
- copy tone คืออะไร
- ทำไม navbar เอาชื่อออก
- ทำไม Skills เปลี่ยนเป็น Loadout
- ทำไม Projects เปลี่ยนเป็น Quest Log
- ทำไมใช้ text badge แทน emoji icon
- ทำไมเพิ่ม `prefers-reduced-motion`
- ทำไมเปลี่ยน font

### 5. Resume Data, Hero Background และ Color

อ่านเรื่อง:

- เอาข้อมูล resume มาใส่ตรงไหน
- ทำไมข้อมูลจริงควรอยู่ใน `PortfolioDataService`
- ทำไม Hero หลักใช้ `section`
- ทำไม background/visual layer ใช้ `div`
- ดำส้มควรเติมสีอะไรให้เว็บดูมีมิติขึ้น

### 6. Browser APIs: IntersectionObserver, SSR และ Test

อ่านเรื่อง:

- Browser API คืออะไร
- `IntersectionObserver` ใช้ทำอะไร
- `entry`, `threshold`, `rootMargin`, `observe`, `disconnect`, `unobserve`
- ตัวอย่างจาก `observeSections()` และ `observeReveals()`
- SSR/prerender คืออะไร
- test environment เช่น jsdom คืออะไร
- ทำไมต้อง guard ด้วย `isPlatformBrowser()` และ `typeof IntersectionObserver`

### 7. CI/CD ด้วย GitHub Actions

อ่านเรื่อง:

- CI/CD คืออะไร
- GitHub Actions workflow คืออะไร
- `ci.yml` ตรวจ test/build ยังไง
- `deploy-pages.yml` deploy ไป GitHub Pages ยังไง
- `npm ci` ต่างจาก `npm install` ยังไง
- ทำไม GitHub Pages ต้องใช้ `base-href`
- ต้องตั้งค่าอะไรใน GitHub หลัง push workflow

### 8. Navbar Dropdown และ Custom Smooth Scroll

อ่านเรื่อง:

- ทำไม `Learn` dropdown หายตอนเลื่อนเม้าช้า
- วิธีทำ invisible hit-area bridge ด้วย wrapper และ `pt-3`
- ทำไม section navigation ควรเป็น `a` ที่มี `href` fallback
- ใช้ `scrollIntoView()` และ `scroll-margin-top` แทน custom scroll animation ที่ซับซ้อน
- เช็ก `prefers-reduced-motion` และ `scroll-behavior: auto !important` เมื่อ scroll วาปทันที
- วิธี queue section scroll เมื่อต้อง navigate จาก `/teach` หรือ `/commands` กลับ `/`
- checklist สำหรับตรวจ scroll/navigation รอบหน้า

## จำสั้น ๆ

- `signal`: กล่อง state ที่ UI ตามทันเมื่อค่าเปลี่ยน
- `set`: ตั้งค่าใหม่
- `update`: เปลี่ยนจากค่าเดิม
- `computed`: คำนวณค่าจาก signal อื่น
- `effect`: ทำ side effect เมื่อ signal เปลี่ยน
- `service`: ที่เก็บ logic/data กลางของแอป
- `inject`: ขอใช้ service จาก Angular
- `isPlatformBrowser`: กัน SSR พังจาก browser API
- `hydration`: Angular รับช่วง HTML ที่ server สร้างไว้
- `prerender`: สร้าง HTML static ตอน build
- `IntersectionObserver`: เฝ้าว่า element เข้า viewport หรือยัง
- `CI/CD`: ตรวจและ deploy code อัตโนมัติ
- `dropdown bridge`: พื้นที่ hover ที่ครอบช่องว่างระหว่างปุ่มกับ submenu
- `section anchor`: ถ้าเมนูพาไป section จริง ควรมี `href` fallback และใช้ `scroll-margin-top` กัน navbar บัง
