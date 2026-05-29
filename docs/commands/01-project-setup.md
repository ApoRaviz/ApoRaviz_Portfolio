# Project Setup Commands

ไฟล์นี้รวมคำสั่งกลุ่มเริ่มต้นโปรเจกต์ เช่นเลือก Node version, ตรวจ Angular CLI, สร้าง Angular project และติดตั้ง dependency

## nvm use 24

```bash
nvm use 24
```

ใช้สลับ Node.js ใน terminal ให้เป็น Node 24 ตามที่โปรเจกต์นี้เลือกใช้

เหตุผล:

- Angular 21 เข้ากับ Node รุ่นใหม่
- โปรเจกต์นี้ล็อก `engines.node` เป็น `>=24.0.0 <25`
- ลดปัญหา build/test ใช้ Node คนละ version

## node -v

```bash
node -v
```

ใช้ตรวจว่า terminal ตอนนี้ใช้ Node version อะไร

ค่าที่ต้องการในโปรเจกต์นี้คือ Node 24 เช่น:

```text
v24.x.x
```

## npm -v

```bash
npm -v
```

ใช้ตรวจ npm version ที่มากับ Node

โปรเจกต์นี้ใช้ `packageManager`:

```text
npm@11.5.1
```

## npm view @angular/cli version

```bash
npm view @angular/cli version
```

ใช้ดู Angular CLI version ล่าสุดจาก npm registry

ตอนเริ่มโปรเจกต์ เราเช็กเพื่อเลือก Angular รุ่นใหม่ให้ใกล้กับ latest ที่สุด และลงเอยที่ Angular CLI 21

## npx -y @angular/cli@21.2.12 new

```bash
npx -y @angular/cli@21.2.12 new portfolio --routing --ssr --style css
```

ใช้สร้าง Angular project ด้วย Angular CLI version 21.2.12

ตัวเลือกสำคัญ:

- `new portfolio`: สร้างโปรเจกต์ชื่อ `portfolio`
- `--routing`: เปิด Angular Router
- `--ssr`: เปิด SSR/prerender
- `--style css`: ใช้ CSS เป็น style base
- `-y`: ตอบ yes อัตโนมัติสำหรับ npx

หมายเหตุ:

คำสั่งจริงตอน scaffold อาจมีรายละเอียด path เพิ่มจาก environment แต่ใจความคือใช้ Angular CLI 21 สร้าง standalone Angular app พร้อม routing และ SSR

## npm install

```bash
npm install
```

ใช้ติดตั้ง dependency ทั้งหมดจาก `package.json`

จะสร้างหรืออัปเดต:

- `node_modules/`
- `package-lock.json`

## npm install tailwindcss @tailwindcss/postcss

```bash
npm install tailwindcss @tailwindcss/postcss
```

ใช้ติดตั้ง Tailwind CSS v4 และ PostCSS plugin ของ Tailwind

โปรเจกต์นี้ใช้ Tailwind สำหรับ utility class และ theme token เช่น `bg-dark`, `text-primary`, `shadow-glow`

## npm install prettier

```bash
npm install --save-dev prettier
```

ใช้ติดตั้ง Prettier สำหรับช่วยจัด format code ในอนาคต

ตอนนี้ยังไม่ได้บังคับ workflow format อัตโนมัติ แต่มี dependency พร้อมไว้แล้ว

