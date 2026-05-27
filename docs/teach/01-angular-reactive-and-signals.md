# Angular Reactive และ Signals

ไฟล์นี้อธิบายคำว่า `reactive` และ `signal` ใน Angular รุ่นใหม่ โดยยกตัวอย่างจากโปรเจกต์ portfolio นี้

## Reactive ของ Angular คืออะไร

`reactive` แปลแบบใช้งานจริงคือ:

```text
เมื่อข้อมูลเปลี่ยน UI หรือค่าที่เกี่ยวข้องจะตอบสนองตามเอง
```

ในเว็บทั่วไปเรามักมี 2 อย่าง:

- `data/state` เช่น เมนูเปิดไหม, กำลังส่งฟอร์มไหม, section ไหน active
- `UI` เช่น class, text, ปุ่ม, toast, list ที่แสดงบนหน้า

แนวคิด reactive คือเราไม่ต้องไปสั่ง DOM เองทุกจุดว่า "เปลี่ยนข้อความตรงนี้", "เพิ่ม class ตรงนั้น", "ซ่อน div นี้"

แต่เราบอก Angular ว่า:

```text
UI ตรงนี้อ่าน state ตัวนี้อยู่นะ
```

พอ state เปลี่ยน Angular จะพา UI ที่เกี่ยวข้องเปลี่ยนตาม

## ตัวอย่างไม่ reactive

ถ้าเขียนแบบจับ DOM เอง อาจหน้าตาประมาณนี้:

```ts
let menuOpen = false;

function toggleMenu() {
  menuOpen = !menuOpen;

  const menu = document.querySelector('#mobile-menu');

  if (menuOpen) {
    menu?.classList.remove('hidden');
  } else {
    menu?.classList.add('hidden');
  }
}
```

ปัญหาคือ:

- component ต้องรู้จัก DOM selector
- ถ้า HTML เปลี่ยน selector อาจพัง
- logic กับ UI ผูกกันแน่น
- SSR/test อาจพังเพราะเรียก `document` ตรง ๆ

## ตัวอย่าง reactive ด้วย signal

ใน Angular เราเก็บ state เป็น signal:

```ts
readonly mobileMenuOpen = signal(false);

toggleMobileMenu(): void {
  this.mobileMenuOpen.update((open) => !open);
}
```

แล้วใน template ให้ UI อ่าน state:

```html
@if (theme.mobileMenuOpen()) {
  <div id="mobile-menu">
    Mobile menu content
  </div>
}
```

flow คือ:

```text
ผู้ใช้กด hamburger
→ toggleMobileMenu()
→ mobileMenuOpen เปลี่ยนค่า
→ template ที่อ่าน mobileMenuOpen() รู้ว่าต้องอัปเดต
→ menu แสดงหรือซ่อนเอง
```

นี่คือ reactive: เปลี่ยน state แล้ว UI ตอบสนองตาม

## Signal คืออะไร

`signal` คือกล่องเก็บค่าแบบ reactive ของ Angular

พูดแบบง่าย:

- มีค่าอยู่ข้างใน
- component/template อ่านค่านั้นได้
- ถ้าค่าเปลี่ยน Angular จะรู้ว่าตรงไหนต้องอัปเดต UI
- เหมาะกับ state ที่เปลี่ยนในหน้า เช่น เปิดเมนู, active section, loading, form success, typewriter text

ตัวอย่างจากโปรเจกต์:

```ts
readonly mobileMenuOpen = signal(false);
```

แปลว่า:

- เราสร้าง state ชื่อ `mobileMenuOpen`
- ค่าเริ่มต้นคือ `false`
- ใช้บอกว่า mobile menu เปิดอยู่หรือไม่

## อ่านค่า signal

เวลาอ่านค่า signal ต้องเรียกเหมือน function:

```ts
this.mobileMenuOpen()
```

ใน HTML ก็อ่านแบบนี้:

```html
@if (theme.mobileMenuOpen()) {
  <div>Mobile menu content</div>
}
```

ทำไมต้องมี `()`?

เพราะ `signal` ไม่ใช่ค่าธรรมดา แต่เป็น reactive getter Angular ใช้การเรียกนี้เพื่อรู้ว่า template ส่วนนี้กำลังพึ่งพาค่านี้อยู่

## เปลี่ยนค่า signal ด้วย set()

ถ้ารู้ค่าใหม่ชัดเจน ใช้ `.set()`

```ts
this.mobileMenuOpen.set(false);
```

ตัวอย่างในโปรเจกต์คือ หลังจากคลิก menu แล้ว scroll ไปยัง section เราสั่งปิดเมนูมือถือด้วย `set(false)`

## เปลี่ยนค่า signal จากค่าเดิมด้วย update()

ถ้าค่าใหม่ขึ้นอยู่กับค่าเก่า ใช้ `.update()`

```ts
this.mobileMenuOpen.update((open) => !open);
```

แปลว่า:

- เอาค่าเดิมชื่อ `open`
- return ค่าตรงข้าม
- ถ้าเดิม `false` จะเป็น `true`
- ถ้าเดิม `true` จะเป็น `false`

เหมาะกับปุ่ม toggle เช่น hamburger menu

## set() vs update()

ใช้ `set()` เมื่อรู้ค่าใหม่แน่นอน:

```ts
this.sent.set(true);
this.mobileMenuOpen.set(false);
```

ใช้ `update()` เมื่อค่าใหม่มาจากค่าเดิม:

```ts
this.mobileMenuOpen.update((open) => !open);
```

จำง่าย:

- `set`: ตั้งค่าใหม่
- `update`: แก้จากค่าเดิม

## Signal ต่างจากตัวแปรธรรมดายังไง

ตัวแปรธรรมดา:

```ts
mobileMenuOpen = false;
```

เปลี่ยนค่าได้ แต่ Angular อาจไม่รู้ละเอียดว่าตรงไหนของ UI ต้องอัปเดต

signal:

```ts
mobileMenuOpen = signal(false);
```

Angular track ได้ว่า template ตรงไหนอ่าน `mobileMenuOpen()` อยู่ พอค่าเปลี่ยนก็อัปเดตเฉพาะจุดที่เกี่ยวข้อง

## Signal ในโปรเจกต์นี้ใช้ตรงไหนบ้าง

### PortfolioDataService

ไฟล์:

```text
src/app/services/portfolio-data.service.ts
```

ใช้เก็บข้อมูลของเว็บ เช่น:

```ts
readonly navLinks = signal<NavLink[]>([
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
]);
```

เหตุผลที่ใช้ signal:

- component อ่านข้อมูลด้วย `data.navLinks()`
- ถ้าอนาคตข้อมูลเปลี่ยนจาก admin panel หรือ API UI จะอัปเดตตามได้
- ใช้เป็น source เดียว ไม่ต้อง copy array ไปหลาย component

### ThemeService

ไฟล์:

```text
src/app/services/theme.service.ts
```

ใช้เก็บ state ของ UI:

```ts
readonly scrolled = signal(false);
readonly activeSection = signal('home');
readonly mobileMenuOpen = signal(false);
```

แต่ละตัวทำหน้าที่:

- `scrolled`: navbar ควรมี background blur หรือยัง
- `activeSection`: section ไหนกำลังอยู่ใน viewport
- `mobileMenuOpen`: เมนูมือถือเปิดอยู่ไหม

### HeroComponent

ไฟล์:

```text
src/app/components/hero/hero.component.ts
```

ใช้ signal กับ typewriter:

```ts
readonly displayedRole = signal('');
```

เหตุผล:

- timer ค่อย ๆ เปลี่ยนข้อความ
- template อ่าน `displayedRole()`
- UI อัปเดตตามตัวอักษรที่เพิ่ม/ลด

### ContactComponent

ไฟล์:

```text
src/app/components/contact/contact.component.ts
```

ใช้ signal กับสถานะส่งฟอร์ม:

```ts
readonly submitting = signal(false);
readonly sent = signal(false);
```

เหตุผล:

- `submitting` ใช้เปลี่ยนปุ่มเป็น `Sending...`
- `sent` ใช้แสดง toast หลังส่งสำเร็จ

## computed คืออะไร

`computed()` คือ signal ที่คำนวณจาก signal ตัวอื่น

ตัวอย่าง:

```ts
readonly firstName = signal('Tanonchai');
readonly lastName = signal('Promsiri');

readonly fullName = computed(() => `${this.firstName()} ${this.lastName()}`);
```

ถ้า `firstName` หรือ `lastName` เปลี่ยน `fullName` จะเปลี่ยนเอง

ใช้เมื่อมีค่าที่ derive จาก state อื่น เช่น:

- จำนวน project ที่ featured
- nav link ปัจจุบัน
- form summary
- filtered projects

## effect คืออะไร

`effect()` ใช้สั่งให้โค้ดบางอย่างทำงานเมื่อ signal ที่อ่านอยู่เปลี่ยน

ตัวอย่าง:

```ts
effect(() => {
  console.log(this.activeSection());
});
```

เมื่อ `activeSection` เปลี่ยน effect จะทำงานใหม่

ควรใช้ระวัง เพราะ effect เหมาะกับ side effect เช่น:

- log
- sync localStorage
- call external API
- update document title

ถ้าเป็นแค่คำนวณค่าใหม่ ปกติใช้ `computed()` ดีกว่า

## Reactive ไม่ได้มีแค่ signal

ใน Angular คำว่า reactive พบได้หลายที่ เช่น:

- Signals: state reactive แบบใหม่
- Reactive Forms: form ที่ value/validity เปลี่ยนแล้ว UI ตรวจสอบตามได้
- RxJS Observable: stream reactive สำหรับ async data เช่น HTTP, events, websocket

โปรเจกต์นี้ใช้:

- `signal` สำหรับ UI state และ data ที่ component อ่าน
- `ReactiveFormsModule` สำหรับ contact form validation

## แบบฝึกอ่าน code

ลองเปิดไฟล์นี้:

```text
src/app/services/theme.service.ts
```

แล้วไล่อ่านตามลำดับ:

1. `scrolled = signal(false)`
2. `startScrollTracking()`
3. `updateScrolled`
4. `this.scrolled.set(window.scrollY > 50)`
5. กลับไปดู `navbar.component.html`
6. หา `[class.bg-dark/85]="theme.scrolled()"`

จะเห็น flow นี้:

```text
ผู้ใช้ scroll
→ updateScrolled ทำงาน
→ scrolled signal เปลี่ยนค่า
→ navbar template อ่าน theme.scrolled()
→ class ของ navbar เปลี่ยน
→ UI มี background blur
```

นี่คือภาพรวมของ signal ในโปรเจกต์นี้

