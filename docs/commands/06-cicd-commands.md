# CI/CD Commands

ไฟล์นี้รวมคำสั่งที่เกี่ยวกับ CI/CD และ GitHub Actions ของโปรเจกต์นี้

## npm ci

```bash
npm ci
```

ใช้ติดตั้ง dependency แบบอิง `package-lock.json` อย่างเข้มงวด

เหมาะกับ CI/CD เพราะทำให้ dependency ที่ติดตั้งบน GitHub Actions ตรงกับ lockfile

## npm run test แบบ CI

```bash
npm run test -- --watch=false --progress=false
```

ใช้รัน unit test ครั้งเดียวแล้วจบ

ตัวเลือก:

- `--watch=false`: ไม่รอ file change
- `--progress=false`: log สะอาดขึ้น

## npm run build แบบ CI

```bash
npm run build -- --progress=false
```

ใช้ build production เพื่อตรวจว่า Angular compile และ prerender ผ่าน

## npm run build สำหรับ GitHub Pages

```bash
npm run build -- --progress=false --base-href /ApoRaviz_Portfolio/
```

ใช้ build สำหรับ deploy ไป GitHub Pages แบบ project page

เหตุผลที่ต้องมี `--base-href`:

```text
GitHub Pages ของ repo นี้อยู่ใต้ path /ApoRaviz_Portfolio/
```

ถ้าไม่ตั้ง path นี้ browser อาจหา JS/CSS ผิดตำแหน่ง

## git diff --check

```bash
git diff --check
```

ใช้ตรวจ whitespace error ก่อน build/test

ใน CI ใช้เพื่อจับปัญหาเล็ก ๆ เช่น trailing spaces

## workflow_dispatch

`workflow_dispatch` ไม่ใช่คำสั่ง terminal แต่เป็น trigger ใน workflow:

```yaml
workflow_dispatch:
```

ใช้เปิดให้กดรัน workflow เองจากหน้า GitHub Actions

## gh workflow list

```bash
gh workflow list
```

ใช้ดูรายการ workflow ผ่าน GitHub CLI

หมายเหตุ:

คำสั่งนี้ต้องติดตั้ง GitHub CLI และ login ก่อน

## gh run list

```bash
gh run list
```

ใช้ดูประวัติ workflow run ล่าสุดผ่าน GitHub CLI

เหมาะสำหรับเช็ก CI/CD จาก terminal

## gh run watch

```bash
gh run watch
```

ใช้เฝ้าดู workflow run ที่กำลังทำงาน

เหมาะหลัง push commit ที่เพิ่มหรือแก้ workflow

