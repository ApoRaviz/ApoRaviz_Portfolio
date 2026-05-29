# Browser APIs: IntersectionObserver, SSR และ Test

ไฟล์นี้อธิบายแบบมือใหม่มาก ๆ ว่า `IntersectionObserver` คืออะไร ทำไมโปรเจกต์นี้ต้องใช้ และทำไมต้องเขียน guard สำหรับ SSR/test

## ก่อนอื่น Browser API คืออะไร

`Browser API` คือความสามารถที่ browser เตรียมไว้ให้ JavaScript ใช้

ตัวอย่าง:

- `window`: ข้อมูลและคำสั่งของหน้าต่าง browser เช่น scroll position
- `document`: โครงสร้าง HTML ของหน้าเว็บ
- `localStorage`: ที่เก็บข้อมูลเล็ก ๆ ใน browser
- `IntersectionObserver`: ตัวช่วยดูว่า element เข้า viewport หรือยัง

คำว่า API ในที่นี้แปลว่า:

```text
ช่องทางที่ JavaScript ใช้คุยกับ browser
```

## Viewport คืออะไร

`viewport` คือพื้นที่หน้าจอที่ผู้ใช้มองเห็นอยู่ตอนนี้

สมมติหน้าเว็บยาวมาก แต่หน้าจอเห็นแค่ช่วงบน:

```text
หน้าเว็บทั้งหมด
┌──────────────────┐
│ Hero             │  ← มองเห็นอยู่
│ About            │  ← มองเห็นบางส่วน
├──────────────────┤
│ Skills           │  ← ยังมองไม่เห็น
│ Projects         │  ← ยังมองไม่เห็น
└──────────────────┘
```

ส่วนที่ browser แสดงบนจอ ณ ตอนนั้นคือ viewport

## IntersectionObserver คืออะไร

`IntersectionObserver` คือ browser API ที่ใช้เฝ้าดูว่า element หนึ่ง ๆ เข้ามาใน viewport หรือพื้นที่ที่กำหนดแล้วหรือยัง

จำง่าย:

```text
IntersectionObserver = คนเฝ้าประตู viewport
```

ถ้า section เดินเข้ามาในพื้นที่ที่เราสนใจ browser จะเรียก callback บอกเรา

## ใช้ทำอะไรได้บ้าง

ตัวอย่างที่เจอบ่อย:

- เปลี่ยน active navbar ตาม section ที่อ่านอยู่
- เล่น reveal animation ตอน element เลื่อนเข้าจอ
- lazy load รูปภาพเมื่อใกล้จะเห็น
- infinite scroll โหลดข้อมูลเพิ่มเมื่อเลื่อนถึงท้ายหน้า
- pause/play video เมื่อออกจาก viewport

## ทำไมไม่ใช้ scroll event อย่างเดียว

ถ้าใช้ `scroll` event ตรง ๆ เราอาจต้องคำนวณเองตลอด:

```ts
window.addEventListener('scroll', () => {
  const sectionTop = section.getBoundingClientRect().top;

  if (sectionTop < window.innerHeight) {
    // section เข้าหน้าจอแล้ว
  }
});
```

ปัญหาคือ:

- scroll event เกิดถี่มาก
- ต้องคำนวณตำแหน่งเอง
- ถ้ามีหลาย section code จะเริ่มซับซ้อน
- ต้องระวัง performance

`IntersectionObserver` ให้ browser ช่วยเฝ้าแทน:

```ts
const observer = new IntersectionObserver((entries) => {
  console.log(entries);
});

observer.observe(section);
```

อ่านง่ายกว่าและเหมาะกับงานแบบ "element เข้าจอหรือยัง"

## โครงสร้างพื้นฐาน

รูปแบบพื้นฐานคือ:

```ts
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        console.log('Element is visible');
      }
    });
  },
  {
    threshold: 0.2,
  },
);

observer.observe(element);
```

แปลทีละส่วน:

- `new IntersectionObserver(...)`: สร้าง observer
- `(entries) => { ... }`: callback ที่ browser เรียกเมื่อ visibility เปลี่ยน
- `entry.isIntersecting`: element กำลังเข้า viewport หรือไม่
- `threshold: 0.2`: callback เมื่อเห็น element ประมาณ 20%
- `observer.observe(element)`: เริ่มติดตาม element นี้

## entry คืออะไร

`entry` คือข้อมูลของ element ที่ observer กำลังรายงาน

ค่าที่ใช้บ่อย:

```ts
entry.target
entry.isIntersecting
entry.intersectionRatio
```

### entry.target

element จริงที่ถูก observe

เช่นถ้า observe:

```html
<section id="projects"></section>
```

ใน callback:

```ts
entry.target.id
```

จะได้:

```text
projects
```

### entry.isIntersecting

บอกว่า element กำลังเข้า viewport หรือพื้นที่ตรวจจับไหม

```ts
if (entry.isIntersecting) {
  // element เข้าพื้นที่ที่เราสนใจแล้ว
}
```

### entry.intersectionRatio

บอกว่า element ถูกเห็นเป็นสัดส่วนเท่าไร

ตัวอย่าง:

- `0`: ไม่เห็นเลย
- `0.15`: เห็นประมาณ 15%
- `0.5`: เห็นประมาณ 50%
- `1`: เห็นเต็ม element

## threshold คืออะไร

`threshold` คือจุดสัดส่วนที่อยากให้ browser แจ้ง callback

ตัวอย่าง:

```ts
threshold: 0.2
```

หมายถึงประมาณว่า:

```text
เมื่อ element ถูกเห็นถึง 20% ให้ callback ทำงาน
```

ใช้เป็น array ได้:

```ts
threshold: [0.15, 0.4, 0.65]
```

หมายถึง browser จะมีโอกาสแจ้งตอน element ผ่านช่วง 15%, 40%, 65%

ในโปรเจกต์นี้ใช้กับ active navbar:

```ts
threshold: [0.15, 0.4, 0.65],
```

เพราะเราอยากรู้ว่า section ไหนมองเห็นมากที่สุด ไม่ใช่แค่แตะขอบจอนิดเดียว

## rootMargin คืออะไร

`rootMargin` คือการขยายหรือหดพื้นที่ตรวจจับของ observer

ในโปรเจกต์นี้:

```ts
rootMargin: '-35% 0px -45% 0px',
```

อ่านเป็น 4 ด้านแบบ CSS margin:

```text
top right bottom left
```

ดังนั้น:

```text
top    = -35%
right  = 0px
bottom = -45%
left   = 0px
```

ค่าติดลบแปลว่าหดพื้นที่ตรวจจับเข้ามาจากขอบจอ

พูดแบบง่าย:

```text
อย่าเพิ่ง active section ตอนเพิ่งแตะขอบจอ
ให้ active ตอน section เข้ามาใกล้กลางจอมากขึ้น
```

## observe() คืออะไร

```ts
observer.observe(section);
```

คือสั่งว่า:

```text
ช่วยเฝ้า element นี้ให้หน่อย
```

ถ้ามี 5 section ก็ observe 5 element:

```ts
observer.observe(homeSection);
observer.observe(aboutSection);
observer.observe(projectsSection);
```

ในโปรเจกต์นี้เราใช้ loop แทน เพื่อไม่ต้องเขียนซ้ำ

## disconnect() คืออะไร

```ts
observer.disconnect();
```

คือสั่งหยุด observer ทั้งหมด

ใช้เมื่อต้องการ:

- ปิด observer เก่า
- สร้าง observer ใหม่
- กัน callback ซ้ำ
- cleanup เมื่อ component/service ไม่ต้องใช้แล้ว

ใน `ThemeService` มี:

```ts
this.sectionObserver?.disconnect();
```

เหตุผลคือ `observeSections()` อาจถูกเรียกใหม่ ถ้าไม่ disconnect ก่อน อาจมี observer หลายชุดเฝ้า section เดิมพร้อมกัน

## unobserve() คืออะไร

```ts
observer.unobserve(element);
```

คือหยุดเฝ้าเฉพาะ element นี้

ในโปรเจกต์นี้ใช้กับ reveal animation:

```ts
this.revealObserver?.unobserve(entry.target);
```

เหตุผล:

```text
animate แล้วครั้งหนึ่งก็พอ ไม่ต้องเฝ้าต่อ
```

## ตัวอย่างจากโปรเจกต์: observeSections()

ไฟล์:

```text
src/app/services/theme.service.ts
```

method:

```ts
observeSections(sectionIds: string[]): void {
  if (!this.isBrowser || typeof IntersectionObserver === 'undefined') {
    return;
  }

  this.sectionObserver?.disconnect();

  this.sectionObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visible?.target.id) {
        this.activeSection.set(visible.target.id);
      }
    },
    {
      rootMargin: '-35% 0px -45% 0px',
      threshold: [0.15, 0.4, 0.65],
    },
  );

  sectionIds
    .map((id) => this.document.getElementById(id))
    .filter((element): element is HTMLElement => Boolean(element))
    .forEach((section) => this.sectionObserver?.observe(section));
}
```

สรุป flow:

```text
รับ id ของ section
→ หา element จริงจาก document
→ ให้ IntersectionObserver เฝ้าแต่ละ section
→ browser แจ้ง entries ตอน section เข้า/ออก viewport
→ filter เฉพาะตัวที่มองเห็น
→ sort จากตัวที่เห็นเยอะสุด
→ set activeSection เป็น id ของ section นั้น
→ navbar เปลี่ยน active state ตาม signal
```

## ทำไมต้อง sort ด้วย intersectionRatio

ในหนึ่งหน้าจอ อาจเห็นหลาย section พร้อมกันได้

เช่น:

```text
About เห็น 20%
Skills เห็น 60%
```

ถ้าเอาแค่ section แรกที่ intersecting อาจ active ผิด

เราเลยเรียงด้วย:

```ts
.sort((a, b) => b.intersectionRatio - a.intersectionRatio)
```

แปลว่า:

```text
เรียงจาก section ที่เห็นเยอะที่สุดไปน้อยที่สุด
```

แล้วหยิบตัวแรก:

```ts
[0]
```

## activeSection ไปเกี่ยวกับ navbar ยังไง

ใน service:

```ts
readonly activeSection = signal('home');
```

เมื่อ observer เห็น section ใหม่:

```ts
this.activeSection.set(visible.target.id);
```

ใน navbar template:

```html
[class.text-primary]="theme.activeSection() === link.id"
```

แปลว่า:

```text
ถ้า activeSection ตรงกับ link.id
ให้ link นั้นเป็นสี primary
```

นี่คือการเชื่อมกันของ:

```text
Browser API → Angular signal → HTML class binding
```

## ตัวอย่างจากโปรเจกต์: observeReveals()

method นี้ใช้กับ animation:

```ts
observeReveals(): void {
  if (!this.isBrowser || typeof IntersectionObserver === 'undefined') {
    return;
  }

  this.revealObserver?.disconnect();

  this.revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          this.revealObserver?.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );

  this.document.querySelectorAll('.reveal').forEach((element) => this.revealObserver?.observe(element));
}
```

flow:

```text
หา element ที่มี class reveal
→ observe ทุก element
→ ถ้า element เข้าจอ
→ เพิ่ม class animate-in
→ หยุด observe element นั้น
```

ใน CSS:

```css
.reveal {
  opacity: 0;
  transform: translateY(30px);
}

.reveal.animate-in {
  opacity: 1;
  transform: translateY(0);
}
```

แปลว่า element จะค่อย ๆ โผล่เมื่อเลื่อนเข้าจอ

## SSR คืออะไร

`SSR` ย่อมาจาก `Server-Side Rendering`

แปลว่า:

```text
render HTML บางส่วนบน server ก่อนส่งไปให้ browser
```

ปกติถ้าเป็น client-side อย่างเดียว:

```text
Browser โหลด JS
→ Angular ทำงานใน browser
→ Angular สร้างหน้าเว็บ
```

แต่ถ้ามี SSR/prerender:

```text
Server หรือ build process สร้าง HTML ไว้ก่อน
→ Browser ได้ HTML ที่มีเนื้อหามาเร็วขึ้น
→ Angular ใน browser ค่อย hydrate/รับช่วงต่อ
```

## Prerender คืออะไร

โปรเจกต์นี้ใช้ prerender ด้วย

`prerender` คือการสร้าง HTML static ตอน build

flow:

```text
ng build
→ Angular สร้าง HTML ของ route ล่วงหน้า
→ deploy HTML นั้นขึ้น server/static hosting
```

เหมาะกับ portfolio เพราะเนื้อหาไม่ได้เปลี่ยนทุกวินาที

## SSR ต่างจาก Browser ยังไง

สิ่งที่ browser มี:

- `window`
- `document`
- `IntersectionObserver`
- `localStorage`
- scroll position
- viewport

แต่ตอน SSR/prerender โค้ดบางส่วนไม่ได้รันใน browser จริง

ดังนั้นฝั่ง server/build ไม่มีของเหล่านี้เหมือน browser

ถ้าเขียนแบบนี้ตรง ๆ:

```ts
const top = window.scrollY;
```

ตอน SSR อาจพัง เพราะ:

```text
window is not defined
```

## ทำไมต้อง guard browser API

คำว่า guard ในที่นี้คือ:

```text
ตรวจเงื่อนไขก่อนใช้ของที่อาจไม่มี
```

ในโปรเจกต์นี้:

```ts
if (!this.isBrowser || typeof IntersectionObserver === 'undefined') {
  return;
}
```

แปลว่า:

```text
ถ้าไม่ได้อยู่ใน browser
หรือไม่มี IntersectionObserver
ให้หยุด method นี้
```

นี่ทำให้ code ปลอดภัยกับ:

- SSR
- prerender
- unit test
- browser/test environment ที่ไม่มี API บางตัว

## isPlatformBrowser() คืออะไร

ใน Angular:

```ts
private readonly platformId = inject(PLATFORM_ID);
private readonly isBrowser = isPlatformBrowser(this.platformId);
```

`PLATFORM_ID` คือข้อมูลว่า Angular กำลังรันบน platform ไหน

`isPlatformBrowser()` ใช้เช็กว่า platform นั้นคือ browser จริงไหม

สรุป:

```text
isBrowser = true  → รันใน browser
isBrowser = false → รันใน server/prerender environment
```

## typeof IntersectionObserver === 'undefined' คืออะไร

บาง environment อาจดูเหมือน browser แต่ไม่มี `IntersectionObserver`

เช่น unit test ที่ใช้ jsdom

ดังนั้นเราเช็กเพิ่ม:

```ts
typeof IntersectionObserver === 'undefined'
```

ถ้าไม่มี API นี้จริง ค่านี้จะเป็น `true`

ทำไมใช้ `typeof`?

เพราะถ้าเขียนแบบนี้:

```ts
if (!IntersectionObserver) {
  return;
}
```

ใน environment ที่ไม่มี `IntersectionObserver` อาจเกิด error ก่อนเข้า `if`

แต่ `typeof IntersectionObserver` ปลอดภัยกว่า

## Test environment คืออะไร

`test environment` คือสภาพแวดล้อมที่ใช้รัน unit test

โปรเจกต์ Angular มักไม่ได้เปิด browser จริงเต็มรูปแบบทุกครั้งที่ test

แต่ใช้ environment ที่จำลอง DOM เช่น `jsdom`

`jsdom` มีบางอย่างคล้าย browser:

- `document`
- element
- query selector

แต่บาง browser API อาจไม่มีหรือทำงานไม่เหมือน browser จริง เช่น:

- `IntersectionObserver`
- layout measurement บางอย่าง
- scroll behavior จริง

ดังนั้น code ที่แตะ browser API ควร guard เสมอ

## ตัวอย่าง test พังถ้าไม่ guard

สมมติ test สร้าง service แล้วเรียก:

```ts
theme.observeSections(['home', 'about']);
```

ถ้า code เขียนแบบนี้:

```ts
this.sectionObserver = new IntersectionObserver(() => {});
```

ใน test environment ที่ไม่มี `IntersectionObserver` อาจเจอ:

```text
ReferenceError: IntersectionObserver is not defined
```

แต่ถ้า guard:

```ts
if (!this.isBrowser || typeof IntersectionObserver === 'undefined') {
  return;
}
```

test จะไม่พัง เพราะ method หยุดก่อนใช้ API ที่ไม่มี

## ทำไมใช้ DOCUMENT แทน document ตรง ๆ

ใน Angular เราใช้:

```ts
private readonly document = inject(DOCUMENT);
```

แทนการเรียก:

```ts
document.getElementById(id)
```

เหตุผล:

- Angular จัดการ dependency ให้
- test สามารถแทน document ได้ง่ายกว่า
- SSR-friendly กว่าการเรียก global `document` ตรง ๆ
- code อ่านชัดว่า service นี้ต้องใช้ document

แต่ถึงใช้ `DOCUMENT` ก็ยังต้อง guard เมื่อทำงานที่ต้องพึ่ง browser จริง เช่น scroll หรือ IntersectionObserver

## ทำไม scrollIntoView ต้อง guard ด้วย

ใน service มี:

```ts
scrollToSection(id: string): void {
  if (!this.isBrowser) {
    return;
  }

  this.document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
```

เพราะ `scrollIntoView` เป็น behavior ของ browser

ตอน SSR ไม่มี viewport จริงให้ scroll

ดังนั้นถ้าไม่ใช่ browser ก็ไม่ควรทำอะไร

## Checklist เวลาใช้ Browser API ใน Angular SSR

ถ้าเจอ code ที่ใช้ของเหล่านี้:

- `window`
- `document`
- `IntersectionObserver`
- `ResizeObserver`
- `localStorage`
- `sessionStorage`
- `navigator`
- `scrollTo`
- `scrollIntoView`

ให้ถามตัวเอง:

```text
code นี้จะรันบน server/test ไหม?
ถ้า API นี้ไม่มีจะพังไหม?
ควร guard ด้วย isPlatformBrowser หรือ typeof ไหม?
```

## จำสั้น ๆ

- `IntersectionObserver`: เฝ้าว่า element เข้า viewport หรือยัง
- `observe(element)`: เริ่มเฝ้า element
- `unobserve(element)`: หยุดเฝ้า element เดียว
- `disconnect()`: หยุด observer ทั้งชุด
- `entry.isIntersecting`: element เข้าเขตที่สนใจไหม
- `entry.intersectionRatio`: เห็น element เป็นสัดส่วนเท่าไร
- `threshold`: เห็นกี่เปอร์เซ็นต์ถึงอยากให้ callback
- `rootMargin`: ขยาย/หดพื้นที่ตรวจจับ
- `SSR`: render HTML บน server/build ก่อนถึง browser
- `test environment`: สภาพแวดล้อมจำลองสำหรับรัน test
- `guard`: เช็กก่อนใช้ API ที่อาจไม่มี

## แบบฝึกอ่าน code

เปิดไฟล์:

```text
src/app/services/theme.service.ts
```

อ่านตามลำดับนี้:

1. `private readonly isBrowser = isPlatformBrowser(this.platformId);`
2. `observeSections(sectionIds: string[]): void`
3. `if (!this.isBrowser || typeof IntersectionObserver === 'undefined')`
4. `new IntersectionObserver(...)`
5. `.filter((entry) => entry.isIntersecting)`
6. `.sort((a, b) => b.intersectionRatio - a.intersectionRatio)`
7. `this.activeSection.set(visible.target.id)`
8. กลับไปดู `navbar.component.html`
9. หา `theme.activeSection() === link.id`

จะเห็นภาพนี้:

```text
section เข้าจอ
→ IntersectionObserver แจ้ง callback
→ activeSection signal เปลี่ยน
→ navbar class binding อัปเดต
→ link ปัจจุบันเปลี่ยนสี
```

