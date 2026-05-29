# Git Commands

ไฟล์นี้รวมคำสั่ง Git ที่ใช้กับโปรเจกต์นี้ ตั้งแต่เริ่ม repo จนถึง push ขึ้น GitHub

## git init

```bash
git init
```

ใช้เริ่ม Git repository ใน folder โปรเจกต์

หลังรันแล้วจะมี folder:

```text
.git/
```

## git status --short

```bash
git status --short
```

ใช้ดูสถานะไฟล์แบบสั้น

ตัวอย่างความหมาย:

- `M`: modified
- `A`: added
- `??`: untracked

## git remote -v

```bash
git remote -v
```

ใช้ดูว่า repo local ต่อกับ remote ไหนอยู่

โปรเจกต์นี้ใช้ remote:

```text
https://github.com/ApoRaviz/ApoRaviz_Portfolio.git
```

## git remote add origin

```bash
git remote add origin https://github.com/ApoRaviz/ApoRaviz_Portfolio.git
```

ใช้ผูก repo local เข้ากับ GitHub repo

คำว่า `origin` เป็นชื่อ remote มาตรฐานที่นิยมใช้กับ GitHub

## git fetch origin

```bash
git fetch origin
```

ใช้ดึงข้อมูล branch/commit ล่าสุดจาก GitHub ลงมาใน local โดยยังไม่ merge เข้า working branch

ในโปรเจกต์นี้ใช้เพื่อ sync กับ repo ที่มี initial commit จาก GitHub เช่น `README.md`, `.gitignore`, `LICENSE`

## git merge origin/main

```bash
git merge origin/main
```

ใช้รวม commit จาก remote branch `origin/main` เข้ากับ local `main`

ในโปรเจกต์นี้ใช้หลังพบว่า GitHub มี initial commit อยู่ก่อนแล้ว

## git add

```bash
git add docs/progress.md docs/teach/05-resume-data-and-hero-background.md src/app/components/hero/hero.component.html src/app/components/navbar/navbar.component.html
```

ใช้ stage ไฟล์ที่ต้องการ commit

เหตุผลที่ไม่ใช้ `git add .` ในรอบล่าสุด:

- ลดโอกาสเอาไฟล์ที่ไม่เกี่ยวข้องติด commit
- เห็นชัดว่า commit นี้มีไฟล์ไหนบ้าง

## git commit

```bash
git commit -m "Refine hero and navbar visual direction"
```

ใช้สร้าง commit จากไฟล์ที่ stage แล้ว

commit ล่าสุดของโปรเจกต์ตอนเขียนเอกสารนี้คือ:

```text
2361538 Refine hero and navbar visual direction
```

## git push origin main

```bash
git push origin main
```

ใช้ push commit จาก local branch `main` ขึ้น GitHub remote `origin`

ในโปรเจกต์นี้ใช้ push ไปที่:

```text
https://github.com/ApoRaviz/ApoRaviz_Portfolio.git
```

## git log --oneline

```bash
git log --oneline --decorate --max-count=12
```

ใช้ดูประวัติ commit แบบสั้น

เหมาะสำหรับเช็กว่า commit ล่าสุดคืออะไร และ local ตรงกับ `origin/main` หรือยัง

