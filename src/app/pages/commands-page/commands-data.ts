export interface CommandExample {
  command: string;
  purpose: string;
  notes: string[];
}

export interface CommandGuide {
  id: number;
  title: string;
  sourcePath: string;
  summary: string;
  tags: string[];
  examples: CommandExample[];
  demo: {
    title: string;
    steps: string[];
  };
  cautions: string[];
}

export const COMMAND_GUIDES: CommandGuide[] = [
  {
    id: 1,
    title: 'Project Setup Commands',
    sourcePath: 'docs/commands.md',
    summary: 'คำสั่งเริ่มต้นสำหรับเปิด ApoRaviz Portfolio ในเครื่อง ตั้งแต่เลือก Node 24 ไปจนถึงติดตั้ง dependency',
    tags: ['Node 24', 'npm install', 'portfolio setup'],
    examples: [
      {
        command: 'nvm use 24',
        purpose: 'สลับ terminal ให้ใช้ Node 24 ตาม engines ของโปรเจกต์',
        notes: ['ช่วยลดปัญหา build/test ใช้ Node คนละ version', 'เหมาะก่อนรันคำสั่ง Angular'],
      },
      {
        command: 'npm install',
        purpose: 'ติดตั้ง dependency ของ Portfolio จาก package-lock.json',
        notes: ['ใช้เมื่อ clone repo ใหม่หรือ node_modules หาย', 'ถ้า lockfile เปลี่ยน ควรเช็ก diff ก่อน commit'],
      },
    ],
    demo: {
      title: 'เริ่มโปรเจกต์ให้ version ไม่หลุด',
      steps: ['สลับเป็น Node 24', 'ติดตั้ง dependency', 'เปิด dev server', 'รัน test/build ก่อนแก้ใหญ่'],
    },
    cautions: ['อย่าใช้ Node version สุ่ม เพราะ Angular/SSR อาจ build ไม่เหมือนกัน', 'npm install อาจอัปเดต package-lock ถ้า dependency ไม่ตรง'],
  },
  {
    id: 2,
    title: 'Development Server Commands',
    sourcePath: 'docs/commands.md',
    summary: 'คำสั่งเปิด ApoRaviz Portfolio ในเครื่องระหว่างพัฒนา ทั้ง npm script และ port สำรอง',
    tags: ['ng serve', 'localhost', 'port 4200', 'port 4201', 'SSR server'],
    examples: [
      {
        command: 'npm run start',
        purpose: 'เปิด Angular dev server ตาม script start ใน package.json',
        notes: ['ปกติเปิดที่ http://localhost:4200/', 'script จริงคือ ng serve'],
      },
      {
        command: './node_modules/.bin/ng serve --host 127.0.0.1 --port 4200',
        purpose: 'เปิด dev server โดยใช้ Angular CLI ในโปรเจกต์และระบุ host/port',
        notes: ['ไม่พึ่ง global CLI', 'ช่วยให้ CLI version ตรงกับโปรเจกต์'],
      },
      {
        command: './node_modules/.bin/ng serve --host 127.0.0.1 --port 4201',
        purpose: 'ใช้ port สำรองเมื่อ 4200 ถูกใช้งานอยู่',
        notes: ['เหมาะเมื่อเจอ Port 4200 is already in use', 'ไม่รบกวน process เดิม'],
      },
      {
        command: 'npm run serve:ssr:portfolio',
        purpose: 'รัน server bundle หลัง production build',
        notes: ['ใช้เช็ก output แบบ SSR', 'ต้อง build ก่อนจึงมี dist/portfolio/server/server.mjs'],
      },
    ],
    demo: {
      title: 'Preview งานแบบไม่ชน port',
      steps: ['ลองเปิด npm run start', 'ถ้า port 4200 ชน ให้ใช้ 4201', 'เปิด browser ไปที่ 127.0.0.1:4201', 'หลัง production build ค่อยเช็ก serve:ssr'],
    },
    cautions: ['อย่าปล่อย dev server ค้างหลายตัวโดยไม่จำเป็น', 'ถ้าระบุ Node path เอง ให้แน่ใจว่าเป็น Node 24'],
  },
  {
    id: 3,
    title: 'Verification Commands',
    sourcePath: 'docs/commands.md',
    summary: 'คำสั่งตรวจงานหลังแก้ code เช่น test, build, development build, whitespace check และ HTTP status check',
    tags: ['test', 'build', 'CI mode', 'git diff --check', 'curl -I'],
    examples: [
      {
        command: 'npm run test',
        purpose: 'รัน unit tests ของ Angular',
        notes: ['script จริงคือ ng test', 'ใช้ตรวจ behavior ที่มี test รองรับ'],
      },
      {
        command: 'CI=1 ./node_modules/.bin/ng test --watch=false --progress=false',
        purpose: 'รัน test แบบ CI ครั้งเดียวแล้วจบ',
        notes: ['--watch=false ไม่รอ file change', '--progress=false ทำให้ log อ่านง่าย'],
      },
      {
        command: 'npm run build',
        purpose: 'build production และตรวจว่า Angular compile/prerender ผ่าน',
        notes: ['โปรเจกต์นี้เปิด SSR/prerender', 'build ผ่านควรเห็น Application bundle generation complete'],
      },
      {
        command: 'git diff --check\ncurl -I http://127.0.0.1:4201/',
        purpose: 'ตรวจ whitespace error และเช็กว่า dev server ตอบ HTTP header ได้',
        notes: ['git diff --check ไม่ควรมี output', 'curl ควรเห็น HTTP 200 OK'],
      },
    ],
    demo: {
      title: 'รอบตรวจงานหลังแก้ UI',
      steps: ['รัน git diff --check', 'รัน npm run build', 'เปิด dev server', 'เช็ก HTTP 200 จากหน้าเป้าหมาย'],
    },
    cautions: ['ถ้า build ผ่านแต่มี warning budget ควรดู bundle size', 'ถ้า test รันใน CI ให้ปิด watch mode'],
  },
  {
    id: 4,
    title: 'Git Commands',
    sourcePath: 'docs/commands.md',
    summary: 'คำสั่ง Git ตั้งแต่เริ่ม repo, ดูสถานะ, เชื่อม remote, sync กับ origin, stage, commit, push และดู log',
    tags: ['git status', 'remote', 'fetch', 'merge', 'commit', 'push'],
    examples: [
      {
        command: 'git status --short',
        purpose: 'ดูสถานะไฟล์แบบสั้น',
        notes: ['M คือ modified', 'A คือ added', '?? คือ untracked'],
      },
      {
        command: 'git remote -v\ngit remote add origin https://github.com/ApoRaviz/ApoRaviz_Portfolio.git',
        purpose: 'ดู remote และผูก repo local เข้ากับ GitHub',
        notes: ['origin เป็นชื่อ remote มาตรฐาน', 'ใช้ก่อน push ขึ้น GitHub'],
      },
      {
        command: 'git fetch origin\ngit merge origin/main',
        purpose: 'ดึงข้อมูลจาก remote และรวม origin/main เข้า local main',
        notes: ['fetch ยังไม่ merge ทันที', 'ใช้เมื่อ GitHub มี initial commit อยู่ก่อน'],
      },
      {
        command: 'git add <files>\ngit commit -m "Refine hero and navbar visual direction"\ngit push origin main',
        purpose: 'stage ไฟล์, สร้าง commit และ push ขึ้น GitHub',
        notes: ['เลือกไฟล์ชัดเจนแทน git add . เมื่องานมีหลายส่วน', 'commit message ควรบอกสิ่งที่เปลี่ยน'],
      },
    ],
    demo: {
      title: 'Commit แบบคุมไฟล์',
      steps: ['เช็ก git status --short', 'stage เฉพาะไฟล์ที่เกี่ยว', 'commit ด้วย message ชัดเจน', 'push origin main'],
    },
    cautions: ['อย่า stage ไฟล์ชั่วคราวหรือ log', 'ก่อน merge/push ควรเข้าใจ diff ที่กำลังส่งขึ้น repo'],
  },
  {
    id: 5,
    title: 'Utility และ Troubleshooting Commands',
    sourcePath: 'docs/commands.md',
    summary: 'คำสั่งช่วยค้นหาไฟล์/ข้อความ ดูท้ายไฟล์ นับบรรทัด หา process ที่ใช้ port และจัดการ folder ระหว่างพัฒนา',
    tags: ['rg', 'find', 'sed', 'tail', 'lsof', 'kill'],
    examples: [
      {
        command: 'rg -n "RPG|PortfolioDataService|queueSectionScroll" docs src/app',
        purpose: 'ค้นหา design/data/navigation flow ของ Portfolio พร้อม filename และ line number',
        notes: ['rg เร็วและอ่านง่าย', 'เหมาะกว่าไล่เปิดไฟล์เอง', 'ใช้ตรวจว่า docs กับ source ยังเล่าเรื่องเดียวกัน'],
      },
      {
        command: 'rg --files\nfind docs/teach -maxdepth 1 -type f -name "*.md" -print | sort',
        purpose: 'แสดงไฟล์ทั้งหมด หรือเช็ก markdown ใน folder ที่สนใจ',
        notes: ['rg --files ใช้สำรวจ project', 'find ใช้เจาะ folder เฉพาะ'],
      },
      {
        command: 'sed -n "1,220p" docs/teach.md\ntail -n 80 docs/progress.md\nwc -l docs/teach.md',
        purpose: 'อ่านบางช่วง, ดูท้ายไฟล์ และนับจำนวนบรรทัด',
        notes: ['เหมาะกับไฟล์ยาว', 'ช่วยก่อนแยกเอกสารหรือเพิ่มบันทึก'],
      },
      {
        command: 'lsof -ti :4201\nkill 37958\nmkdir -p docs/teach',
        purpose: 'หา process ที่ใช้ port, หยุด process และสร้าง folder',
        notes: ['kill ต้องรู้ว่า process id ถูกตัว', 'mkdir -p ไม่ error ถ้า folder มีอยู่แล้ว'],
      },
    ],
    demo: {
      title: 'แก้ port ค้าง',
      steps: ['หา process ด้วย lsof -ti :4201', 'ยืนยันว่าเป็น dev server ที่ต้องปิด', 'kill process id นั้น', 'เปิด dev server ใหม่'],
    },
    cautions: ['อย่า kill process ที่ไม่รู้จัก', 'คำสั่งบางตัวเป็น Unix-style ถ้าใช้ Windows อาจต้องใช้ PowerShell equivalent'],
  },
  {
    id: 6,
    title: 'CI/CD Commands',
    sourcePath: 'docs/commands.md',
    summary: 'คำสั่งตรวจ workflow และ GitHub Pages ของ Portfolio เช่น build แบบ base-href และ GitHub CLI',
    tags: ['npm ci', 'GitHub Pages', 'base-href', 'workflow_dispatch', 'gh CLI'],
    examples: [
      {
        command: 'npm ci',
        purpose: 'ติดตั้ง dependency แบบอิง package-lock.json อย่างเข้มงวด',
        notes: ['เหมาะกับ CI/CD', 'ถ้า package.json กับ lockfile ไม่ตรง workflow จะ fail'],
      },
      {
        command: 'npm run test -- --watch=false --progress=false\nnpm run build -- --progress=false',
        purpose: 'รัน test และ build แบบ CI',
        notes: ['รันครั้งเดียวแล้วจบ', 'log สะอาดกว่าโหมด dev'],
      },
      {
        command: 'npm run build -- --progress=false --base-href /ApoRaviz_Portfolio/',
        purpose: 'build สำหรับ GitHub Pages แบบ project page',
        notes: ['base-href ต้องตรง path repo', 'ไม่งั้น browser อาจหา JS/CSS ผิดตำแหน่ง'],
      },
      {
        command: 'gh workflow list\ngh run list\ngh run watch',
        purpose: 'ดู workflow, ดู run ล่าสุด และเฝ้า workflow ที่กำลังรันผ่าน GitHub CLI',
        notes: ['ต้องติดตั้ง GitHub CLI', 'ต้อง login ก่อนใช้'],
      },
    ],
    demo: {
      title: 'Deploy ผ่าน GitHub Actions',
      steps: ['push เข้า main', 'CI รัน npm ci/test/build', 'Deploy workflow build ด้วย base-href', 'GitHub Pages เสิร์ฟ static output'],
    },
    cautions: ['workflow_dispatch เป็น trigger ใน YAML ไม่ใช่คำสั่ง terminal', 'ตั้งค่า Pages source เป็น GitHub Actions หลัง push workflow'],
  },
];
