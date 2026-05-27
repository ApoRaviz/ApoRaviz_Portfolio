# Angular App Config และ SSR

ไฟล์นี้อธิบาย provider สำคัญใน Angular config ของโปรเจกต์นี้ เช่น router, hydration, global error listeners และ server rendering

## app.config.ts คืออะไร

ไฟล์:

```text
src/app/app.config.ts
```

เป็นไฟล์ตั้งค่าหลักของ Angular app ฝั่ง browser/client

ใน Angular standalone app เราไม่ได้ใช้ `AppModule` แบบเก่า แต่ใช้ `ApplicationConfig` และ `providers` เพื่อเปิดความสามารถต่าง ๆ ของ Angular

## provideBrowserGlobalErrorListeners() คืออะไร

บรรทัด:

```ts
provideBrowserGlobalErrorListeners()
```

หน้าที่:

- ช่วยให้ Angular ฟัง error ที่เกิดจาก browser event เช่น click, input, submit
- error ที่หลุดจาก event handler จะถูกส่งเข้า Angular error handling
- ทำให้ debug ง่ายขึ้น เพราะ Angular เห็น error ที่เกี่ยวกับ UI interaction

พูดง่าย:

```text
มันคือระบบช่วยจับ error จากฝั่ง browser ให้ Angular เห็นชัดขึ้น
```

## provideRouter(routes) คืออะไร

```ts
provideRouter(routes)
```

เปิดใช้งาน Angular Router

ถึง portfolio ตอนนี้เป็นหน้าเดียว แต่ยังมีประโยชน์:

- Angular SSR ต้องรู้ route structure
- อนาคตเพิ่มหน้า `/projects/:id` ได้ง่าย
- เป็น pattern มาตรฐานของ Angular app

## provideClientHydration(withEventReplay()) คืออะไร

SSR/prerender สร้าง HTML มาให้ browser เห็นก่อน

แต่ HTML นั้นยังไม่ได้มี Angular event พร้อมเต็มที่ทันที

Hydration คือขั้นตอนที่ Angular เข้าไปรับช่วง HTML เดิม แล้วผูก event/state กลับเข้าไป

```ts
provideClientHydration(withEventReplay())
```

แปลว่า:

- ใช้ hydration
- ถ้าผู้ใช้คลิกอะไรระหว่าง Angular ยัง hydrate ไม่เสร็จ ให้เก็บ event นั้นไว้
- หลัง hydrate เสร็จค่อย replay event

ผลคือ UX ลื่นขึ้น เพราะผู้ใช้ไม่รู้สึกว่า HTML แรกที่เห็นเป็นหน้าเปล่าที่กดยังไม่ได้

## provideAnimations() คืออะไร

```ts
provideAnimations()
```

เปิดระบบ Angular animations

ตอนนี้หลาย animation ในโปรเจกต์ใช้ CSS/Tailwind เป็นหลัก แต่เปิดไว้เพื่อรองรับ:

- animation trigger ของ Angular
- future component animation
- transition ที่ควบคุมด้วย Angular state

## app.config.server.ts คืออะไร

ไฟล์:

```text
src/app/app.config.server.ts
```

เป็นไฟล์ตั้งค่าฝั่ง server สำหรับ SSR/prerender

ฝั่ง server มีข้อจำกัดต่างจาก browser เช่น ไม่มี `window` และ `document` จึงต้องระวัง logic ที่เกี่ยวกับ DOM

## provideServerRendering(withRoutes(serverRoutes)) คืออะไร

ใช้เปิด SSR ฝั่ง server:

```ts
provideServerRendering(withRoutes(serverRoutes))
```

แปลว่า:

- Angular สามารถ render HTML บน server ได้
- ใช้ `serverRoutes` เพื่อรู้ว่า route ไหน render แบบไหน

ในโปรเจกต์นี้:

```ts
renderMode: RenderMode.Prerender
```

แปลว่า build จะสร้าง HTML static ล่วงหน้า เหมาะกับ portfolio เพราะเนื้อหาไม่ได้เปลี่ยนตลอดเวลา

## Hydration กับ Prerender ต่างกันยังไง

`Prerender` คือการสร้าง HTML static ล่วงหน้าตอน build

```text
Angular build → สร้าง HTML → deploy ไปให้ browser โหลดเร็ว
```

`Hydration` คือการที่ Angular ฝั่ง browser มารับช่วง HTML นั้นต่อ

```text
Browser โหลด HTML → Angular ผูก event/state กลับเข้าไป → หน้า interactive
```

จำง่าย:

```text
Prerender = สร้างหน้าไว้ก่อน
Hydration = ทำให้หน้าที่สร้างไว้กลับมามีชีวิตใน browser
```

## จำสั้น ๆ

- `provideBrowserGlobalErrorListeners`: ช่วยจับ error จาก browser event
- `provideRouter`: เปิดระบบ route
- `provideClientHydration`: ให้ Angular รับช่วง HTML จาก SSR/prerender
- `withEventReplay`: เก็บ click/event ระหว่าง hydration แล้ว replay
- `provideAnimations`: เปิดระบบ animation ของ Angular
- `provideServerRendering`: เปิด SSR/prerender ฝั่ง server

