# Verification Commands

ไฟล์นี้รวมคำสั่งตรวจสอบว่าโปรเจกต์ยังทำงานได้หลังแก้ code

## npm run test

```bash
npm run test
```

เรียก script:

```json
"test": "ng test"
```

ใช้รัน unit tests ของ Angular

## ng test แบบ CI

```bash
npm run test:ci
```

เรียก script:

```json
"test:ci": "CI=1 ng test --watch=false --progress=false"
```

หรือเรียกตรงด้วย Node 24:

```bash
PATH=/Users/aporaviz/.nvm/versions/node/v24.16.0/bin:$PATH CI=1 ./node_modules/.bin/ng test --watch=false --progress=false
```

ใช้รัน test แบบเหมาะกับรอบตรวจงาน

ตัวเลือกสำคัญ:

- `CI=1`: บอกเครื่องมือว่าเป็นโหมด continuous integration
- `--watch=false`: รัน test ครั้งเดียวแล้วจบ
- `--progress=false`: ปิด progress output เพื่อให้อ่าน log ง่าย

ผลล่าสุดที่เคยตรวจ:

```text
Test Files  1 passed (1)
Tests       2 passed (2)
```

## npm run build

```bash
npm run build
```

เรียก script:

```json
"build": "CI=1 ng build --progress=false"
```

ใช้ build โปรเจกต์สำหรับ production

หมายเหตุ: local terminal นี้เคยเจอ esbuild deadlock เมื่อรัน `ng build` แบบ raw ดังนั้น `npm run build` ถูกตั้งให้ใช้ CI mode และปิด progress output เป็น default

อีกกรณีที่เคยเจอคือ build fail เพราะ Angular พยายาม inline Google Fonts แต่เครื่องไม่มี network ไป `fonts.googleapis.com` โปรเจกต์จึงเอา external font links ออกจาก `src/index.html` และใช้ local/system fonts ใน `src/styles.css`

ถ้าต้องการ debug Angular CLI แบบเดิม ใช้:

```bash
npm run build:raw
```

## ng build แบบ CI

```bash
PATH=/Users/aporaviz/.nvm/versions/node/v24.16.0/bin:$PATH CI=1 ./node_modules/.bin/ng build --progress=false
```

ใช้ build production โดยบังคับ Node 24 และปิด progress output

โปรเจกต์นี้เปิด SSR/prerender ดังนั้น build ที่ผ่านควรเห็นข้อความแนวนี้:

```text
Prerendered 1 static route.
Application bundle generation complete.
```

## ng build แบบ development

```bash
npm run build:dev
```

ใช้ build แบบ development configuration

เหมาะสำหรับเช็กเร็ว ๆ เมื่ออยากได้ output ที่ใกล้ dev มากกว่า production

## git diff --check

```bash
git diff --check
```

ใช้ตรวจ whitespace error ใน diff เช่น trailing spaces

ถ้าคำสั่งนี้ไม่แสดงอะไร แปลว่าไม่พบปัญหา whitespace ใน diff

## curl -I

```bash
curl -I http://127.0.0.1:4201/
```

ใช้ตรวจว่า dev server ตอบ HTTP header ได้ไหม

ในโปรเจกต์นี้ใช้หลังเปิด dev server ที่ port 4201 เพื่อยืนยันว่าเว็บตอบ:

```text
HTTP/1.1 200 OK
```

## ตรวจ navbar smooth scroll ด้วยตา

หลังแก้ `ThemeService` หรือ `NavbarComponent` ให้เปิด dev server แล้วลองคลิกเมนูที่อยู่ไกล เช่น `Quests` หรือ `Contact`

สิ่งที่ต้องดู:

- หน้าเลื่อนไป section เป้าหมายจริง
- underline/active state ค้างที่เมนูที่กด ไม่แว๊บผ่าน `Profile`, `Loadout`, หรือ section กลางทาง
- mobile menu ปิดหลังคลิก section
- ถ้าอยู่หน้า `/teach` หรือ `/commands` แล้วกด section menu ต้องกลับ `/` แล้ว scroll ต่อได้

คำสั่งเปิด dev server:

```bash
PATH=/Users/aporaviz/.nvm/versions/node/v24.16.0/bin:$PATH ./node_modules/.bin/ng serve --host 127.0.0.1 --port 4201
```
