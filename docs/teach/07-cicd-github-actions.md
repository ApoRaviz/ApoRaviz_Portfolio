# CI/CD ด้วย GitHub Actions

ไฟล์นี้อธิบาย CI/CD สำหรับโปรเจกต์ portfolio นี้แบบเริ่มจากพื้นฐาน

## CI/CD คืออะไร

`CI` ย่อมาจาก `Continuous Integration`

แปลแบบใช้งานจริง:

```text
ทุกครั้งที่ push หรือเปิด pull request ให้ระบบตรวจอัตโนมัติว่า code ยัง build/test ผ่านไหม
```

`CD` ย่อมาจาก `Continuous Deployment` หรือ `Continuous Delivery`

แปลแบบใช้งานจริง:

```text
เมื่อ code ผ่านการตรวจแล้ว ให้ระบบ deploy อัตโนมัติไปยังที่ hosting
```

ในโปรเจกต์นี้เราเริ่มด้วย:

- CI: test และ build Angular app
- CD: deploy static output ไป GitHub Pages

## GitHub Actions คืออะไร

GitHub Actions คือระบบ automation ของ GitHub

เราเขียนไฟล์ `.yml` ไว้ใน:

```text
.github/workflows/
```

แล้ว GitHub จะอ่านไฟล์เหล่านี้และรันงานอัตโนมัติตาม trigger ที่กำหนด

## Workflow คืออะไร

`workflow` คือไฟล์ automation หนึ่งชุด

โปรเจกต์นี้เพิ่ม 2 workflow:

```text
.github/workflows/ci.yml
.github/workflows/deploy-pages.yml
```

## ci.yml ทำอะไร

ไฟล์:

```text
.github/workflows/ci.yml
```

ทำงานเมื่อ:

- push เข้า `main`
- เปิดหรืออัปเดต pull request เข้า `main`

ขั้นตอนหลัก:

```text
checkout code
→ setup Node 24
→ npm ci
→ npm run test
→ npm run build
```

เป้าหมาย:

```text
ถ้า test หรือ build พัง ให้ GitHub แจ้งว่า workflow fail
```

## deploy-pages.yml ทำอะไร

ไฟล์:

```text
.github/workflows/deploy-pages.yml
```

ทำงานเมื่อ:

- push เข้า `main`
- กด run เองด้วย `workflow_dispatch`

ขั้นตอนหลัก:

```text
checkout code
→ setup Node 24
→ npm ci
→ build Angular ด้วย base-href ของ GitHub Pages
→ upload dist/portfolio/browser
→ deploy ไป GitHub Pages
```

## ทำไมต้องใช้ Node 24

โปรเจกต์นี้ตั้งไว้ใน `package.json`:

```json
"engines": {
  "node": ">=24.0.0 <25"
}
```

ดังนั้น workflow ใช้:

```yaml
- name: Setup Node 24
  uses: actions/setup-node@v6
  with:
    node-version: 24
    cache: npm
```

เหตุผล:

- ให้ GitHub Actions ใช้ Node version เดียวกับเครื่องเรา
- ลดปัญหา build ผ่านในเครื่องแต่ fail บน GitHub
- `cache: npm` ช่วย cache dependency ให้ workflow รอบต่อไปเร็วขึ้น

## npm ci คืออะไร

ใน workflow ใช้:

```bash
npm ci
```

ไม่ใช้:

```bash
npm install
```

เหตุผล:

- `npm ci` อ่านจาก `package-lock.json` แบบตรงไปตรงมา
- เหมาะกับ CI เพราะติดตั้ง dependency ซ้ำได้เหมือนเดิม
- ถ้า `package.json` กับ `package-lock.json` ไม่ตรงกัน workflow จะ fail เพื่อบอกให้แก้

จำง่าย:

```text
npm install = ใช้ตอนพัฒนา
npm ci = ใช้ตอน CI/CD
```

## ทำไม CI ต้อง test และ build

Test:

```bash
npm run test -- --watch=false --progress=false
```

ใช้ตรวจว่า unit test ยังผ่าน

Build:

```bash
npm run build -- --progress=false
```

ใช้ตรวจว่า Angular compile ได้จริง และ SSR/prerender ไม่พัง

ถ้า test ผ่านแต่ build fail แปลว่ายัง deploy ไม่ควรได้

## GitHub Pages คืออะไร

GitHub Pages คือ static hosting ของ GitHub

เหมาะกับ portfolio เพราะเว็บส่วนใหญ่เป็น static content

โปรเจกต์นี้ build แล้วได้ static files ที่:

```text
dist/portfolio/browser
```

workflow จึง upload folder นี้ขึ้น GitHub Pages

## .nojekyll คืออะไร

ไฟล์:

```text
public/.nojekyll
```

จะถูก Angular copy ไปที่ output ตอน build

เหตุผลที่ใส่ไว้:

- บอก GitHub Pages ว่าไม่ต้องประมวลผลเว็บนี้ด้วย Jekyll
- เสิร์ฟไฟล์ static ตามที่ Angular build ออกมา
- ลดปัญหากับไฟล์หรือ folder บางชื่อในอนาคต

## ทำไม deploy ต้องใช้ base-href

ถ้า deploy เป็น project page ของ repo นี้ URL มักเป็น:

```text
https://aporaviz.github.io/ApoRaviz_Portfolio/
```

จะเห็นว่ามี path:

```text
/ApoRaviz_Portfolio/
```

Angular จึงควรรู้ base path นี้ตอน build:

```bash
npm run build -- --progress=false --base-href /ApoRaviz_Portfolio/
```

ถ้าไม่ตั้ง `base-href` asset เช่น JS/CSS อาจถูกหาแบบผิด path

## permissions ใน workflow คืออะไร

ใน `ci.yml`:

```yaml
permissions:
  contents: read
```

แปลว่า workflow อ่าน code ได้อย่างเดียว พอสำหรับ test/build

ใน `deploy-pages.yml`:

```yaml
permissions:
  contents: read
  pages: write
  id-token: write
```

แปลว่า:

- `contents: read`: อ่าน code
- `pages: write`: deploy ไป GitHub Pages
- `id-token: write`: ใช้ยืนยันตัวตนกับ GitHub Pages deployment

## workflow_dispatch คืออะไร

```yaml
workflow_dispatch:
```

ทำให้เรากดรัน workflow เองจากหน้า GitHub ได้

เหมาะสำหรับ:

- deploy ซ้ำ
- ทดลอง workflow
- ใช้ตอนอยาก deploy โดยไม่ push commit ใหม่

## concurrency คืออะไร

```yaml
concurrency:
  group: pages
  cancel-in-progress: false
```

ใช้จัดการไม่ให้ Pages deployment ชนกันมั่ว

ถ้ามีหลาย deploy ใกล้กัน GitHub จะจัดคิวตาม group นี้

## คุณต้องตั้งค่าอะไรใน GitHub

หลัง push workflow ขึ้น GitHub ให้เข้า:

```text
Repository → Settings → Pages
```

ตั้งค่า:

```text
Build and deployment → Source → GitHub Actions
```

จากนั้นเข้า:

```text
Repository → Actions
```

ดู workflow:

- `CI`
- `Deploy GitHub Pages`

ถ้า deploy ผ่าน GitHub จะให้ URL ของ Pages ในหน้า workflow หรือหน้า Settings → Pages

## สิ่งที่ควรทำต่อเมื่อเริ่มใช้จริง

เมื่อ CI/CD ทำงานแล้ว ควรเพิ่ม:

- branch protection ให้ `main`
- บังคับให้ CI ผ่านก่อน merge
- เพิ่ม Lighthouse CI เพื่อตรวจ performance/accessibility
- เพิ่ม preview deploy สำหรับ pull request ถ้าใช้ Vercel/Netlify ในอนาคต

## จำสั้น ๆ

- CI = ตรวจ code อัตโนมัติ
- CD = deploy อัตโนมัติ
- workflow = ไฟล์ `.yml` ใน `.github/workflows/`
- `npm ci` = ติดตั้ง dependency แบบเหมาะกับ CI
- `setup-node` = เลือก Node version บน GitHub Actions
- GitHub Pages = static hosting ของ GitHub
- `base-href` = base path ที่ Angular ใช้หา asset
- `.nojekyll` = บอก GitHub Pages ให้เสิร์ฟ static files ตรง ๆ
