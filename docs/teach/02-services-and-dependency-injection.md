# Services และ Dependency Injection

ไฟล์นี้อธิบายว่าทำไมโปรเจกต์นี้แยกข้อมูล/logic บางอย่างไปไว้ใน service และ `inject()` ใช้ทำอะไร

## ทำไมบางข้อมูลเป็น service

ใน Angular service คือ class ที่ component หลายตัวใช้ร่วมกันได้

ตัวอย่าง:

```ts
@Injectable({
  providedIn: 'root',
})
export class PortfolioDataService {}
```

`providedIn: 'root'` แปลว่า:

- Angular สร้าง service นี้ครั้งเดียวทั้งแอป
- ทุก component ได้ข้อมูลชุดเดียวกัน
- เหมาะกับข้อมูลกลาง เช่น profile, nav links, projects, contact info

ถ้าไม่ใช้ service เราอาจต้อง copy ข้อมูลซ้ำในหลาย component ซึ่งแก้ยากและผิดง่าย

## PortfolioDataService มีไว้ทำไม

ไฟล์:

```text
src/app/services/portfolio-data.service.ts
```

ใช้เก็บข้อมูลหลักของเว็บ เช่น:

- profile
- nav links
- skills/loadout
- projects/quest log
- services/useful builds
- experiences
- testimonials
- contact info

เหตุผลที่เอาข้อมูลไว้ใน service:

- HTML จะเน้น layout และการแสดงผล
- service จะเป็นแหล่งข้อมูลหลัก
- ถ้าแก้ resume หรือเพิ่ม project ในอนาคต จะรู้ว่าควรมาแก้ตรงไหน
- ถ้าอนาคตมีหลังบ้านหรือ API สามารถค่อย ๆ เปลี่ยน service ให้ดึงข้อมูลจาก API ได้

## ThemeService มีไว้ทำไม

ไฟล์:

```text
src/app/services/theme.service.ts
```

ใช้เก็บ state ที่เกี่ยวกับ UI รวมกัน เช่น:

- navbar scroll แล้วหรือยัง
- section ไหน active
- mobile menu เปิดอยู่ไหม
- scroll ไป section ไหน

เหตุผลที่แยกเป็น service:

- navbar และ component อื่นอาจต้องใช้ state เดียวกัน
- scroll tracking เป็น logic กลาง ไม่ควรกระจายอยู่ในหลาย component
- ทำให้ component อ่านง่ายขึ้น

## inject() คืออะไร

ใน Angular เราต้องขอใช้ service ผ่าน dependency injection

ในโปรเจกต์นี้ใช้รูปแบบใหม่:

```ts
readonly data = inject(PortfolioDataService);
```

แปลว่า:

- component นี้ต้องการใช้ `PortfolioDataService`
- Angular จะหา instance ที่ถูกสร้างไว้แล้วส่งมาให้
- component ไม่ต้องสร้าง service เองด้วย `new PortfolioDataService()`

ข้อดี:

- ไม่ต้องเขียน constructor ยาว ๆ
- อ่านง่ายว่า class นี้พึ่งพา service อะไรบ้าง
- test ง่ายขึ้น เพราะ Angular สามารถแทน service ด้วย mock ได้

## Dependency Injection คืออะไรแบบง่าย

Dependency คือของที่ class ต้องใช้

ตัวอย่าง:

```text
HeroComponent ต้องใช้ PortfolioDataService
```

Injection คือ Angular เป็นคนส่งของนั้นเข้ามาให้

ดังนั้น dependency injection คือ:

```text
Angular ช่วยจัดการว่า class ไหนต้องใช้ service อะไร แล้วส่งให้เอง
```

## ทำไมไม่สร้าง service ด้วย new

ถ้าเขียนแบบนี้:

```ts
readonly data = new PortfolioDataService();
```

จะมีปัญหา:

- component แต่ละตัวอาจได้ข้อมูลคนละ instance
- Angular คุม lifecycle ไม่ได้
- test และ mock ยากขึ้น
- service ที่ต้องพึ่ง service อื่นจะจัดการยาก

ใช้ `inject()` จึงเหมาะกว่าใน Angular app

## ทำไมต้อง guard browser APIs

โปรเจกต์นี้ใช้ SSR/prerender

แปลว่าโค้ดบางส่วนรันบน server ก่อนถึง browser

บน server ไม่มี:

- `window`
- `document`
- `IntersectionObserver`
- scroll position

ถ้าเรียกตรง ๆ จะพังตอน build หรือ SSR

จึงต้องตรวจก่อน:

```ts
if (!this.isBrowser) {
  return;
}
```

และบาง test environment เช่น jsdom อาจเป็น browser-like แต่ไม่มี `IntersectionObserver` จึง guard เพิ่ม:

```ts
if (!this.isBrowser || typeof IntersectionObserver === 'undefined') {
  return;
}
```

หลักจำ:

```text
โค้ดที่แตะ browser โดยตรง ต้องถามก่อนว่าเราอยู่ใน browser จริงไหม
```

## ไฟล์ที่ควรลองเปิดอ่าน

- `src/app/services/portfolio-data.service.ts`
- `src/app/services/theme.service.ts`
- `src/app/components/navbar/navbar.component.ts`
- `src/app/components/hero/hero.component.ts`

