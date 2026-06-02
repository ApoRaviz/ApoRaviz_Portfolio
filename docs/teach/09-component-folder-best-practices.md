# Component Folder Best Practices

บันทึกนี้สรุปวิธีจัดไฟล์ component ในโปรเจกต์นี้ โดยเฉพาะ component ย่อยอย่าง modal ที่อยู่ใต้หน้า `Teach` และ `Commands`

## ทำไมไม่ควรวาง modal ปนกับ page เสมอไป

ตอนแรกไฟล์ modal อยู่ปนใน page folder เช่น:

```text
src/app/pages/teach-page/
  teach-page.component.ts
  teach-page.component.html
  teach-lessons.ts
  teach-lesson-modal.component.ts
  teach-lesson-modal.component.html
```

แบบนี้ยังใช้งานได้ แต่เมื่อ page มี data, component หลัก, modal, helper หรือ component ย่อยหลายตัว folder จะเริ่มอ่านยาก เพราะทุกอย่างอยู่ระดับเดียวกันหมด

## แนวทางที่ใช้ในโปรเจกต์นี้

ถ้า component เป็นของหน้าเดียวและยังไม่ถูก reuse ข้าม feature ให้เก็บไว้เป็น feature-local component ใต้ page นั้น:

```text
src/app/pages/teach-page/
  teach-page.component.ts
  teach-page.component.html
  teach-lessons.ts
  components/
    teach-lesson-modal/
      teach-lesson-modal.component.ts
      teach-lesson-modal.component.html
```

สำหรับ Commands:

```text
src/app/pages/commands-page/
  commands-page.component.ts
  commands-page.component.html
  commands-data.ts
  components/
    command-guide-modal/
      command-guide-modal.component.ts
      command-guide-modal.component.html
```

## ทำไมไม่ย้ายไป `src/app/components/`

`src/app/components/` ควรเก็บ component ที่ใช้ร่วมหลายหน้า หรือเป็นส่วนกลางของเว็บ เช่น navbar, footer, hero, about

แต่ `TeachLessonModalComponent` และ `CommandGuideModalComponent` ใช้เฉพาะหน้า `/teach` และ `/commands` ตามลำดับ จึงควรอยู่ใกล้ page owner มากกว่า

จำสั้น ๆ:

- ใช้หลาย feature: วางใน `src/app/components/`
- ใช้เฉพาะ page เดียว: วางใน `src/app/pages/<page>/components/`
- component มีทั้ง `.ts` และ `.html`: วางใน folder ของตัวเอง
- data ของหน้า เช่น `teach-lessons.ts` หรือ `commands-data.ts` อยู่ระดับ page ได้ เพราะเป็น source ของ page นั้น

## Import path หลังย้าย

Page หลัก import modal จาก folder ย่อย:

```ts
import { TeachLessonModalComponent } from './components/teach-lesson-modal/teach-lesson-modal.component';
```

Modal import type/data จาก page owner ด้วย relative path:

```ts
import { TeachLesson } from '../../teach-lessons';
```

หลักคิดคือ import ควรอ่านแล้วรู้ ownership:

- page รู้ว่ามี component ย่อยใน `components/`
- modal รู้ว่าข้อมูลหลักอยู่กับ page owner
- ไม่มี modal ปนกับไฟล์ page หลักจน folder อ่านยาก

## Checklist ก่อนย้าย component

- component นี้ใช้เฉพาะ page เดียวหรือหลายหน้า
- ถ้าใช้เฉพาะ page เดียว ให้วางใต้ `pages/<page>/components/<component-name>/`
- ถ้า reuse หลายหน้า ค่อยย้ายไป shared `app/components/`
- ย้าย `.ts` และ `.html` ไปพร้อมกัน
- ปรับ `templateUrl` ให้ยังเป็น path local เช่น `./name.component.html`
- ปรับ import path ใน page และใน component
- รัน `npm.cmd run build` เพื่อจับ path ที่พลาด
