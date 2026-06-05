# Portfolio Commands

เอกสารนี้รวมคำสั่งที่ใช้กับ `ApoRaviz_Portfolio` ไว้ไฟล์เดียว เพื่อไม่ให้ command docs แตกย่อยเกินจำเป็น

## Setup

```bash
nvm use 24
npm install
```

ใช้ Node 24 ตามที่โปรเจกต์ล็อกไว้ แล้วติดตั้ง dependencies จาก `package-lock.json`

## Dev Server

```bash
npm run start
```

Default URL:

```text
http://localhost:4200/
```

ถ้าต้องบังคับ Node 24 และระบุ port:

```bash
PATH=/Users/aporaviz/.nvm/versions/node/v24.16.0/bin:$PATH ./node_modules/.bin/ng serve --host 127.0.0.1 --port 4201
```

ใช้ port สำรองเมื่อ `4200` ถูกใช้งานอยู่

## Test

```bash
npm run test
npm run test:ci
```

หรือรันตรงด้วย Node 24:

```bash
PATH=/Users/aporaviz/.nvm/versions/node/v24.16.0/bin:$PATH CI=1 ./node_modules/.bin/ng test --watch=false --progress=false
```

`test:ci` ใช้รันครั้งเดียวแล้วจบ เหมาะกับการตรวจงานก่อน commit/push

## Build

```bash
npm run build
```

โปรเจกต์นี้ตั้ง `build` ให้ใช้:

```text
CI=1 ng build --progress=false
```

เหตุผล:

- local terminal เคยเจอ esbuild deadlock เมื่อรัน `ng build` แบบ raw
- ปิด progress output เพื่อให้ log อ่านง่าย
- โปรเจกต์เปิด SSR/prerender จึงควรเห็นข้อความ `Prerendered 1 static route.`

ถ้าต้องการ debug Angular CLI แบบเดิม:

```bash
npm run build:raw
```

## Development Build

```bash
npm run build:dev
```

ใช้เช็ก output แบบ development configuration

## Git

```bash
git status --short
git diff --check
git add .
git commit -m "Describe the change"
git push origin main
```

`git diff --check` ใช้ตรวจ whitespace error ก่อน commit

## Utility

```bash
rg "search text"
rg --files
find docs -type f | sort
sed -n '1,220p' path/to/file.md
lsof -ti :4201
kill <pid>
```

ใช้ `rg` ก่อนเมื่อค้น text หรือไฟล์ เพราะเร็วและอ่านง่ายกว่า `grep`

## CI/CD

GitHub Actions ใช้ pattern:

```text
npm ci
npm run test:ci
npm run build
deploy to GitHub Pages
```

Build สำหรับ GitHub Pages ต้องตั้ง base path:

```bash
npm run build -- --base-href /ApoRaviz_Portfolio/
```

GitHub CLI ที่อาจใช้ตรวจ workflow:

```bash
gh workflow list
gh run list
gh run watch
```

หมายเหตุ: ต้องติดตั้ง GitHub CLI และ login ก่อน

## Manual UI Check

หลังแก้ `ThemeService`, `NavbarComponent`, route, หรือ section navigation ให้เปิด dev server แล้วลอง:

- คลิกเมนูที่อยู่ไกล เช่น `Quests` หรือ `Contact`
- active underline ต้องไม่แว๊บผ่าน section กลางทาง
- mobile menu ต้องปิดหลังเลือก section
- จาก `/teach` หรือ `/commands` ต้องกลับ `/` แล้ว scroll ต่อได้

