# Angular .spec.ts และ Unit Test

เอกสารนี้อธิบายว่าไฟล์ `.spec.ts` คืออะไร ทำงานอย่างไร และทำไมเราถึงเพิ่ม `theme.service.spec.ts` เพื่อกันบัค navbar underline แว๊บกลับมาอีก

## .spec.ts คืออะไร

ไฟล์ `.spec.ts` คือไฟล์ทดสอบของ TypeScript/Angular

ในโปรเจกต์นี้ให้จำแบบนี้:

```text
theme.service.ts       = code จริงที่เว็บใช้
theme.service.spec.ts  = code ที่ตรวจว่า theme.service.ts ยังทำงานถูกต้องไหม
```

ไฟล์ `.spec.ts` ไม่ได้ถูกรวมเป็นเว็บ production ให้ผู้ใช้โหลด แต่จะถูกรันตอนใช้คำสั่ง test:

```bash
npm run test:ci
```

หรือ:

```bash
ng test
```

## ทำไมต้องมี test

เวลาเราแก้ code ด้วยตาอย่างเดียว บางบัคอาจกลับมาโดยไม่รู้ตัว โดยเฉพาะบัคแบบ UI state เช่น:

```text
กด Quests
-> smooth scroll ผ่าน Profile
-> smooth scroll ผ่าน Loadout
-> underline ใน navbar แว๊บตาม section ที่ผ่าน
```

ตอนเราแก้ครั้งแรก อาจดูเหมือนเรียบร้อย แต่ถ้าวันหลังแก้ `ThemeService` หรือ `IntersectionObserver` แล้วพลาด บัคเดิมอาจกลับมา

test ทำหน้าที่เป็น safety net:

```text
ถ้าพฤติกรรมสำคัญพัง
-> npm run test:ci fail
-> เรารู้ก่อน push/deploy
```

## โครงสร้างพื้นฐานของ test

ตัวอย่าง:

```ts
describe('ThemeService', () => {
  it('keeps the clicked nav section active', () => {
    // arrange: เตรียมของ
    // act: สั่งให้ code ทำงาน
    // assert: เช็กผลลัพธ์
  });
});
```

ความหมาย:

- `describe()` คือกลุ่ม test เช่น กำลังทดสอบ `ThemeService`
- `it()` คือ test case หนึ่งข้อ เช่น “ควรค้าง active section ตอน smooth scroll”
- `expect()` คือการเช็กว่าผลลัพธ์ตรงกับที่เราคาดไหม

ตัวอย่าง `expect`:

```ts
expect(theme.activeSection()).toBe('projects');
```

อ่านเป็นภาษาไทยได้ว่า:

```text
คาดว่า activeSection ตอนนี้ต้องเป็น projects
```

## Arrange, Act, Assert

เวลาอ่าน test ให้แบ่งเป็น 3 ช่วง:

```text
Arrange = เตรียมสถานการณ์
Act     = เรียก code ที่อยากทดสอบ
Assert  = ตรวจผลลัพธ์
```

ตัวอย่างจาก `ThemeService`:

```ts
theme.observeSections(['home', 'about', 'skills', 'projects']);
theme.scrollToSection('projects');

expect(theme.activeSection()).toBe('projects');
```

อธิบาย:

- Arrange: สร้าง section id และเริ่ม observe
- Act: สั่ง scroll ไป `projects`
- Assert: active section ต้องเป็น `projects`

## TestBed คืออะไร

`TestBed` คือเครื่องมือของ Angular สำหรับสร้าง environment ขนาดเล็กใน test

แทนที่จะสร้าง service เองด้วย `new ThemeService()` เราให้ Angular สร้างให้:

```ts
const theme = TestBed.inject(ThemeService);
```

เหตุผล:

- Angular service อาจมี dependency เช่น `DOCUMENT`, `PLATFORM_ID`
- `inject()` ใน service ต้องทำงานผ่าน Angular dependency injection
- TestBed ทำให้ service ทำงานใกล้เคียง app จริงมากกว่า

จำง่าย ๆ:

```text
TestBed = Angular app จำลองสำหรับ test
```

## ทำไมต้อง mock IntersectionObserver

`ThemeService` ใช้ `IntersectionObserver` เพื่อดูว่า section ไหนกำลังอยู่ใน viewport

แต่ใน test environment เราไม่ได้ scroll หน้าเว็บจริงเหมือน browser เต็มรูปแบบ ดังนั้นต้องสร้างตัวปลอมขึ้นมา:

```ts
class MockIntersectionObserver {
  emit(entries: Partial<IntersectionObserverEntry>[]): void {
    this.callback(entries as IntersectionObserverEntry[]);
  }
}
```

`emit()` ใช้จำลองว่า browser แจ้งว่า section หนึ่งเข้าหน้าจอแล้ว

เช่น:

```ts
sectionObserver.emit([
  { target: about, isIntersecting: true, intersectionRatio: 0.8 },
]);
```

อ่านเป็นภาษาไทย:

```text
จำลองว่า browser เห็น section about แล้ว
```

## Test เคส navbar underline แว๊บ

บัคที่เราอยากกันคือ:

```text
ผู้ใช้กด Quests
-> activeSection เป็น projects
-> ระหว่าง scroll ผ่าน about
-> observer เห็น about
-> แต่ activeSection ต้องยังเป็น projects
```

test จึงเขียนแบบนี้:

```ts
theme.scrollToSection('projects');
expect(theme.activeSection()).toBe('projects');

sectionObserver.emit([{ target: about, isIntersecting: true, intersectionRatio: 0.8 }]);
expect(theme.activeSection()).toBe('projects');
```

ถ้าอนาคตมีคนลบ active-section lock ออก test นี้จะ fail เพราะ `activeSection` จะเปลี่ยนเป็น `about`

## vi.useFakeTimers() คืออะไร

ใน code จริงเราใช้ timeout เพื่อปลด lock:

```ts
this.activeSectionLockTimer = globalThis.setTimeout(
  () => this.clearActiveSectionLock(),
  1400,
);
```

ถ้า test ต้องรอ 1.4 วินาทีจริงทุกครั้ง test จะช้าและไม่นิ่ง

`vi.useFakeTimers()` ทำให้ test ควบคุมเวลาเองได้:

```ts
vi.useFakeTimers();
```

ใน test นี้เราใช้ fake timers เพื่อไม่ให้ timeout จริงรบกวน และ cleanup ด้วย:

```ts
vi.useRealTimers();
```

จำง่าย ๆ:

```text
fake timers = นาฬิกาปลอมของ test
```

## beforeEach และ afterEach

`beforeEach()` คือสิ่งที่ทำก่อน test แต่ละข้อ

ใน `theme.service.spec.ts` เราใช้เพื่อ:

- เปิด fake timers
- reset mock observer
- mock `scrollIntoView`
- สร้าง section ปลอมใน `document.body`
- ตั้งค่า TestBed

`afterEach()` คือสิ่งที่ทำหลัง test แต่ละข้อ

เราใช้เพื่อ:

- คืน timer จริง
- คืน `IntersectionObserver` ตัวจริง
- คืน `scrollIntoView` ตัวจริง
- ล้าง HTML ที่สร้างไว้ใน test

เหตุผลคือ test แต่ละข้อควรแยกจากกัน ถ้า test หนึ่งทิ้ง state ไว้ อาจทำให้ test ข้อถัดไป fail แบบงง ๆ

## ทำไมต้องคืนของจริงหลัง mock

เวลาเราเขียน:

```ts
globalThis.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;
```

เรากำลังเปลี่ยน global API ของ environment test

ถ้าไม่คืนของเดิม:

```ts
globalThis.IntersectionObserver = originalIntersectionObserver;
```

test อื่นอาจได้รับผลกระทบโดยไม่ตั้งใจ

หลักสำคัญ:

```text
mock อะไรไว้ ต้อง cleanup อันนั้น
```

## Unit Test ต่างจาก E2E Test ยังไง

Unit test:

- ทดสอบ logic ชิ้นเล็ก เช่น service หรือ component หนึ่งตัว
- เร็ว
- mock browser behavior ได้
- เหมาะกับ logic เช่น activeSection lock

E2E test:

- เปิด browser จริง
- คลิกเหมือนผู้ใช้จริง
- ตรวจทั้ง flow
- ช้ากว่า แต่มั่นใจเรื่อง UI จริงมากกว่า

สำหรับบัค navbar underline:

```text
Unit test = กัน logic activeSection lock พัง
E2E/manual test = ดูด้วยตาว่า underline ไม่แว๊บจริง
```

ตอนนี้โปรเจกต์มี unit test เพื่อกัน regression แล้ว และใน `docs/commands/03-verification.md` มี checklist ให้เปิด dev server แล้วลองคลิกด้วยตา

## ควรเขียน spec เมื่อไร

ควรเขียน test เมื่อ:

- เป็น bug ที่เคยเกิดจริง
- logic มีเงื่อนไขหลายทาง
- มี timer, observer, route, form, หรือ state ที่พังง่าย
- แก้แล้วอยากกันไม่ให้บัคกลับมา
- function สำคัญต่อ UX หรือ business rule

ยังไม่จำเป็นต้อง test ทุกบรรทัดตั้งแต่เริ่ม เพราะจะช้าและเหนื่อยเกินไปสำหรับ learning project

ให้เริ่มจาก test ที่คุ้ม:

```text
bug จริง + มีโอกาสกลับมา + test อธิบาย behavior ได้ชัด
```

## อ่าน theme.service.spec.ts แบบเร็ว

ลำดับการอ่าน:

1. ดูชื่อ `describe('ThemeService')`
2. อ่าน `beforeEach()` ว่า test เตรียม environment อะไร
3. อ่านชื่อ `it(...)` เพื่อเข้าใจ behavior ที่ต้องการ
4. มองหา `theme.scrollToSection('projects')`
5. มองหา `expect(theme.activeSection()).toBe(...)`
6. อ่าน `sectionObserver.emit(...)` ว่าเราจำลอง browser เห็น section ไหน
7. อ่าน `afterEach()` ว่า cleanup อะไร

## จำสั้น ๆ

```text
.spec.ts = ไฟล์ทดสอบ
describe = กลุ่ม test
it = test case หนึ่งข้อ
expect = ตรวจผลลัพธ์
TestBed = Angular app จำลอง
mock = ตัวปลอมที่ใช้แทน browser/API จริง
fake timers = คุมเวลาใน test
regression test = test ที่กันบัคเดิมกลับมา
```

## เชื่อมกับโปรเจกต์นี้

ไฟล์ที่เกี่ยวข้อง:

```text
src/app/services/theme.service.ts
src/app/services/theme.service.spec.ts
docs/teach/08-navbar-dropdown-and-smooth-scroll.md
docs/commands/03-verification.md
```

คำสั่งที่ใช้ตรวจ:

```bash
npm run test:ci
```

ถ้า test ผ่าน แปลว่า logic สำคัญยังทำงานตามที่เราคาด

ถ้า test fail ให้ดู:

- test case ไหน fail
- `expect` คาดค่าอะไร
- ค่าจริงคืออะไร
- code จริงเปลี่ยนพฤติกรรมไปตรงไหน
