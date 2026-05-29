# Development Server Commands

ไฟล์นี้รวมคำสั่งที่เกี่ยวกับการรันเว็บในเครื่องระหว่างพัฒนา

## npm run start

```bash
npm run start
```

เรียก script ใน `package.json`:

```json
"start": "ng serve"
```

ใช้เปิด Angular dev server แบบปกติ

โดยทั่วไป Angular จะเปิดที่:

```text
http://localhost:4200/
```

## ng serve แบบระบุ host และ port

```bash
./node_modules/.bin/ng serve --host 127.0.0.1 --port 4200
```

ใช้รัน dev server โดยเจาะจง host และ port

เหตุผลที่ใช้ `./node_modules/.bin/ng`:

- ใช้ Angular CLI ที่ติดตั้งในโปรเจกต์
- ไม่พึ่ง global Angular CLI ในเครื่อง
- ลดปัญหา CLI version ไม่ตรงกับโปรเจกต์

## ng serve ด้วย Node 24 แบบชัดเจน

```bash
PATH=/Users/aporaviz/.nvm/versions/node/v24.16.0/bin:$PATH ./node_modules/.bin/ng serve --host 127.0.0.1 --port 4200
```

ใช้รัน dev server โดยบังคับให้ terminal ใช้ Node 24 ก่อน

เหตุผล:

- เครื่องอาจมีหลาย Node version
- คำสั่งนี้ช่วยให้ Angular CLI ใช้ Node 24 แน่นอน

## เปิด dev server ที่ port สำรอง

```bash
PATH=/Users/aporaviz/.nvm/versions/node/v24.16.0/bin:$PATH ./node_modules/.bin/ng serve --host 127.0.0.1 --port 4201
```

ใช้เมื่อ port 4200 ถูกใช้งานอยู่

ตัวอย่างเหตุการณ์ในโปรเจกต์นี้:

```text
Port 4200 is already in use.
```

เราจึงใช้ `4201` เพื่อ preview งานโดยไม่ไปรบกวน process ที่ใช้ port 4200 อยู่

## npm run serve:ssr:portfolio

```bash
npm run serve:ssr:portfolio
```

เรียก script:

```json
"serve:ssr:portfolio": "node dist/portfolio/server/server.mjs"
```

ใช้รัน server bundle หลังจาก build แล้ว

เหมาะสำหรับเช็ก output แบบ SSR หลัง production build

