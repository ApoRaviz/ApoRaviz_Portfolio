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
"build": "ng build"
```

ใช้ build โปรเจกต์สำหรับ production

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
PATH=/Users/aporaviz/.nvm/versions/node/v24.16.0/bin:$PATH CI=1 ./node_modules/.bin/ng build --configuration development --progress=false
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

