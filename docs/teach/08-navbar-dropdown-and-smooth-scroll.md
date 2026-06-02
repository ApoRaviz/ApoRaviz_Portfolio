# Navbar Dropdown และ Custom Smooth Scroll

บันทึกนี้สรุปปัญหาที่เจอจากหน้าเว็บจริง และแนวทางแก้ที่ใช้ในโปรเจกต์ เพื่อให้รอบหน้ากลับมาเช็กได้เร็ว ไม่ต้องไล่หาสาเหตุใหม่ตั้งแต่ต้น

## ปัญหา Learn dropdown หายตอนเลื่อนเม้าช้า

อาการคือชี้เม้าไปที่ `Learn` แล้ว submenu แสดงจริง แต่ถ้าเลื่อนเม้าลงไปหา `Teach` หรือ `Commands` ช้า ๆ เมนูจะหายก่อน

สาเหตุคือ submenu อยู่ใต้ปุ่มด้วยระยะห่าง เช่นใช้ `mt-3` ทำให้เกิดช่องว่างระหว่างปุ่มกับกล่องเมนู เมื่อ cursor ผ่านช่องว่างนั้น browser ถือว่า mouse ออกจาก wrapper แล้ว `(mouseleave)` จึงปิดเมนู

วิธีแก้คือทำ invisible hit-area bridge:

- ชั้นนอกของ submenu ใช้ `pt-3` เพื่อครอบช่องว่างให้ยังเป็นพื้นที่ hover/focus ของ dropdown
- ชั้นในค่อยเป็น visual panel ที่มี border, background, shadow
- หลีกเลี่ยงการพึ่ง `group-hover` อย่างเดียวเมื่อมี state ที่ต้องเปิด/ปิดด้วย signal

ตัวอย่างโครงสร้าง:

```html
<div class="relative" (mouseenter)="openLearnMenu()" (mouseleave)="closeLearnMenu()">
  <button type="button">Learn</button>

  <div class="absolute right-0 top-full min-w-40 pt-3">
    <div class="rounded-xl border border-white/10 bg-dark/95 p-2">
      <a routerLink="/teach">Teach</a>
      <a routerLink="/commands">Commands</a>
    </div>
  </div>
</div>
```

จำหลักง่าย ๆ: ถ้ามีช่องว่างระหว่าง trigger กับ dropdown ต้องมี bridge ครอบช่องว่างนั้น ไม่งั้น hover จะหลุด

## ปัญหา smooth scroll เหมือนไม่เลื่อน

อาการคือกด `Profile`, `Loadout` หรือเมนูหน้า Home แล้วหน้าเหมือนวาป หรือบางครั้งดูเหมือนไม่ scroll

สิ่งที่ตรวจแล้ว: `router-outlet` ไม่ใช่ตัวการตรง ๆ เพราะ root layout เป็นแค่:

```html
<main>
  <router-outlet />
</main>
```

ไม่มี `overflow` หรือ scroll container แยก ดังนั้น scroll container หลักยังควรเป็นหน้า document/window ตามปกติ

ปัญหาของรอบนี้คือเราเขียน custom scroll animation ซับซ้อนเกินจำเป็น และเมนู section เป็น `button` ล้วน จึงไม่มี native anchor fallback ถ้า Angular handler หรือ timing พลาด ผู้ใช้จะไม่เห็นอะไรเกิดขึ้นเลย

แนวทางแก้ล่าสุด:

- เปลี่ยน section nav จาก `button` เป็น `a` ที่มี `href="/#section-id"` เพื่อให้ browser มี fallback จริง
- ใน click handler ค่อย `preventDefault()` แล้วใช้ Angular scroll เมื่อพร้อม
- ใช้ `section.scrollIntoView({ behavior: 'smooth', block: 'start' })` แทน custom `requestAnimationFrame()`
- ใส่ `section[id] { scroll-margin-top: 88px; }` เพื่อไม่ให้หัว section ถูก navbar sticky บัง
- ระวัง `prefers-reduced-motion` ถ้า service เปลี่ยน behavior เป็น `auto` หรือ CSS ใส่ `scroll-behavior: auto !important` จะทำให้เมนูวาปทันที

ตัวอย่าง navbar:

```html
<a [attr.href]="'/#' + link.id" (click)="goToSection($event, link.id)">
  {{ link.label }}
</a>
```

ตัวอย่าง service:

```ts
scrollToSection(id: string): void {
  const section = this.document.getElementById(id);

  section?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
}
```

## ปัญหาตอนกลับจากหน้า Learn ไป Home แล้ว scroll

ถ้าผู้ใช้อยู่หน้า `/teach` หรือ `/commands` แล้วกด `Profile` ใน navbar ต้อง navigate กลับ `/` ก่อน จากนั้นค่อย scroll ไป section เป้าหมาย

จุดที่ต้องระวังคือ Angular อาจยัง render Home sections ไม่ทันตอนเรียก scroll ทำให้หา element ด้วย `document.getElementById(id)` ไม่เจอ

แนวทางที่ใช้:

- `NavbarComponent` เก็บ section id ไว้ด้วย `queueSectionScroll(id)`
- navigate กลับ `/`
- `HomePageComponent.ngAfterViewInit()` consume id ที่รอไว้
- `ThemeService.scrollToSectionWhenReady()` รอ frame และ retry สั้น ๆ จน section พร้อม

```ts
goToSection(event: MouseEvent, id: string): void {
  event.preventDefault();

  if (currentPath === '/') {
    this.theme.scrollToSection(id);
    return;
  }

  this.theme.queueSectionScroll(id);
  void this.router.navigate(['/']);
}
```

```ts
ngAfterViewInit(): void {
  const queuedSectionId = this.theme.consumeQueuedSectionScroll();
  if (queuedSectionId) {
    this.theme.scrollToSectionWhenReady(queuedSectionId);
  }
}
```

## Checklist เวลาแก้ scroll/navigation รอบหน้า

- เช็กว่า nav id ตรงกับ section id จริง เช่น `Profile -> about`, `Loadout -> skills`
- ถ้า section navigation เป็นเมนูจริง ควรใช้ `a` พร้อม `href` เป็น fallback ไม่ใช่ `button` ล้วน
- ใช้ `scrollIntoView()` ก่อนคิดจะเขียน custom scroll animation เอง
- ใส่ `scroll-margin-top` ให้ section id เมื่อมี sticky navbar
- ถ้าหน้าวาปทันที ให้เช็ก `prefers-reduced-motion`, `scroll-behavior: auto !important` และ branch ที่คืนค่า `behavior: 'auto'`
- ถ้า scroll หลัง route change ให้รอ view พร้อมก่อน
- ถ้า dropdown มีระยะห่างจาก trigger ให้ทำ hover bridge
- หลังแก้ให้รัน `npm.cmd run build`, `git diff --check` และเช็ก route หลักตอบ `200`
