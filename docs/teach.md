# Teach

เอกสารเรียนรู้ของโปรเจกต์นี้ถูกแยกเป็นไฟล์ย่อยตามหัวข้อแล้ว เพื่อให้อ่านง่ายและกลับมาทบทวนเฉพาะเรื่องได้เร็วขึ้น

## แนะนำลำดับการอ่าน

1. [Angular Reactive และ Signals](teach/01-angular-reactive-and-signals.md)
2. [Services และ Dependency Injection](teach/02-services-and-dependency-injection.md)
3. [Angular App Config และ SSR](teach/03-angular-app-config-and-ssr.md)
4. [Redesign แนว RPG Profile](teach/04-redesign-rpg-profile.md)
5. [Resume Data, Hero Background และ Color](teach/05-resume-data-and-hero-background.md)

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

