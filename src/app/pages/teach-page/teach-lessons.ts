export interface TeachCodeExample {
  label: string;
  language: string;
  code: string;
}

export interface TeachDemo {
  title: string;
  description: string;
  steps: string[];
}

export interface TeachSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  code?: TeachCodeExample;
  demo?: TeachDemo;
}

export interface TeachLesson {
  id: number;
  title: string;
  sourcePath: string;
  summary: string;
  topics: string[];
  sections: TeachSection[];
  quickNotes: string[];
}

export const TEACH_LESSONS: TeachLesson[] = [
  {
    id: 1,
    title: 'RPG Profile Design Direction',
    sourcePath: 'docs/teach/04-redesign-rpg-profile.md',
    summary: 'สอนวิธีเปลี่ยน portfolio ให้มีตัวตนแบบ gamer-minded developer โดยยังอ่านง่าย ไม่โอ้อวด และไม่หลุดจากข้อมูลจริง',
    topics: ['profile identity', 'copy tone', 'RPG naming', 'visual language', 'accessibility'],
    sections: [
      {
        heading: 'เริ่มจาก design direction ก่อนแก้ UI',
        paragraphs: [
          'Portfolio นี้ไม่ได้ต้องการเป็น landing page ทั่วไป แต่ต้องสื่อว่า ApoRaviz เป็น developer ที่ชอบเกมและสร้าง web tools ที่ใช้ได้จริง',
          'การมี docs/design-direction.md ช่วยให้ทุก section ตัดสินใจด้วยเข็มทิศเดียวกัน เช่นคำที่ใช้, สี, mood และสิ่งที่ควรเลี่ยง',
        ],
        bullets: ['ไม่ใช้คำโอ้อวดอย่าง expert/professional/pro', 'ให้โปรเจ็คจริงเล่าแทนคำขายตัวเอง', 'ใช้ orange เป็น action/accent หลัก', 'คุม dark RPG mood ให้ยังอ่านง่าย'],
      },
      {
        heading: 'เปลี่ยนคำธรรมดาให้เป็นโลกเดียวกัน',
        paragraphs: ['คำบน portfolio ถูกปรับให้เข้ากับเกมโดยไม่ทำให้สาระหาย เช่น Skills กลายเป็น Loadout และ Projects กลายเป็น Quest Log'],
        demo: {
          title: 'Copy เป็นส่วนหนึ่งของ system flow',
          description: 'เมื่อทุก section ใช้ภาษาโลกเดียวกัน ผู้ใช้จะเข้าใจว่าเว็บนี้มี character ไม่ใช่ template เปลี่ยนสี',
          steps: ['กำหนดตัวตน', 'เลือกคำที่เข้ากับตัวตน', 'เช็กว่าไม่โอ้อวด', 'ผูกคำเหล่านั้นกับ data จริงใน PortfolioDataService'],
        },
      },
      {
        heading: 'คำสั่ง/ไฟล์ที่ควรอ่านคู่กัน',
        paragraphs: ['บทเรียนนี้ควรอ่านคู่กับคำสั่งค้นหาและไฟล์ design direction เพื่อเข้าใจว่าเวลาแก้ copy หรือ UI ต้องเริ่มจาก source ไหน'],
        code: {
          label: 'หา design/copy rule ใน repo',
          language: 'bash',
          code: `rg -n "Loadout|Quest Log|design direction" docs src/app
sed -n '1,220p' docs/design-direction.md`,
        },
      },
    ],
    quickNotes: ['Portfolio ต้องมีตัวตน', 'copy tone คือส่วนหนึ่งของ UX', 'data จริงควรอยู่ใน service', 'อ่าน design-direction ก่อนแก้ UI ใหญ่'],
  },
  {
    id: 2,
    title: 'Resume Data และ Hero Visual System',
    sourcePath: 'docs/teach/05-resume-data-and-hero-background.md',
    summary: 'สอน flow การเอาข้อมูล resume จริงเข้ามาใน PortfolioDataService และออกแบบ Hero เป็น first signal ของตัวตน ApoRaviz',
    topics: ['resume data', 'PortfolioDataService', 'hero section', 'visual layers', 'color roles'],
    sections: [
      {
        heading: 'ข้อมูลจริงควรอยู่ใน service',
        paragraphs: [
          'ข้อมูล profile, skill, experience และ contact ถูกเก็บใน PortfolioDataService เพื่อให้ HTML ทำหน้าที่ presentation เป็นหลัก',
          'วิธีนี้ทำให้ถ้าแก้ resume หรือเพิ่ม project ใหม่ เรารู้ว่าควรเริ่มจาก source data ไหน ไม่ต้องไล่แก้หลาย component',
        ],
        code: {
          label: 'ค้นจุดแก้ข้อมูล Portfolio',
          language: 'bash',
          code: `rg -n "readonly profile|readonly projects|readonly experiences" src/app/services/portfolio-data.service.ts
sed -n '1,220p' src/app/services/portfolio-data.service.ts`,
        },
      },
      {
        heading: 'Hero คือ first signal ของ Portfolio',
        paragraphs: ['Hero ใช้ section เพราะเป็นเนื้อหาหลักและเป็น target ของ navigation ส่วน background layer ใช้ div เพราะเป็น visual layer ไม่มีความหมายเชิงเนื้อหา'],
        code: {
          label: 'Semantic idea',
          language: 'html',
          code: `<section id="home">
  <div aria-hidden="true">background layer</div>
  <div>profile content</div>
</section>`,
        },
      },
      {
        heading: 'คำสั่งตรวจหลังแก้ข้อมูล/hero',
        paragraphs: ['หลังแก้ data หรือ hero ต้อง build เพื่อเช็ก SSR/prerender และเปิดหน้าเว็บดูว่าข้อความไม่ล้น ไม่ทับ visual layer'],
        code: {
          label: 'Verify portfolio content',
          language: 'bash',
          code: `npm run build
npm run test:ci
rg -n "ApoRaviz_Mooping|Quest" src/app/services/portfolio-data.service.ts`,
        },
      },
    ],
    quickNotes: ['Hero เป็นสัญญาณแรกของ brand', 'visual layer ใช้ div', 'section ใช้กับเนื้อหาหลัก', 'ข้อมูล resume แก้ที่ PortfolioDataService'],
  },
  {
    id: 3,
    title: 'Portfolio Navigation Flow',
    sourcePath: 'docs/teach/08-navbar-dropdown-and-smooth-scroll.md',
    summary: 'สอน system flow ของ navbar ใน Portfolio: dropdown bridge, anchor fallback, route queue และ active-section lock',
    topics: ['navbar flow', 'dropdown bridge', 'anchor fallback', 'scroll queue', 'active state'],
    sections: [
      {
        heading: 'Dropdown ต้องไม่มีช่องว่างหลุด hover',
        paragraphs: ['Learn dropdown เคยหายเพราะมีช่องว่างระหว่างปุ่มกับ panel วิธีแก้คือให้ wrapper ครอบช่องว่างเป็น hover bridge'],
        code: {
          label: 'ค้น logic dropdown',
          language: 'bash',
          code: `rg -n "openLearnMenu|closeLearnMenu|learn" src/app/components/navbar`,
        },
      },
      {
        heading: 'Section navigation ต้องมี fallback',
        paragraphs: [
          'เมนู section ใช้ anchor href เป็น fallback ก่อน แล้ว Angular handler ค่อย preventDefault และ smooth scroll เมื่อพร้อม',
          'ถ้าอยู่หน้า /teach หรือ /commands ต้อง queue section id แล้ว navigate กลับ / ก่อน scroll',
        ],
        demo: {
          title: 'Flow จากหน้า Teach กลับ Profile',
          description: 'นี่คือ system flow ที่ต้องเข้าใจเวลาแก้ navbar ไม่ใช่แค่เปลี่ยน class',
          steps: ['ผู้ใช้กด Profile จาก /teach', 'Navbar queue section id', 'Router navigate กลับ /', 'HomePage view พร้อม', 'ThemeService scroll ไป section เป้าหมาย'],
        },
      },
      {
        heading: 'คำสั่งตรวจ navigation',
        paragraphs: ['หลังแก้ navbar ต้องรัน test/build และค้น source ที่เกี่ยวกับ queue/scroll เพื่อเช็กว่า logic ไม่หลุด'],
        code: {
          label: 'Verify navigation flow',
          language: 'bash',
          code: `npm run test:ci
npm run build
rg -n "queueSectionScroll|scrollToSectionWhenReady|activeSection" src/app`,
        },
      },
    ],
    quickNotes: ['Dropdown มี gap ต้องมี bridge', 'section nav ควรเป็น a พร้อม href', 'route change ต้อง queue ก่อน scroll', 'active underline ต้องไม่วิ่งผ่าน section กลางทาง'],
  },
  {
    id: 4,
    title: 'Teach และ Commands Page Structure',
    sourcePath: 'docs/teach/09-component-folder-best-practices.md',
    summary: 'สอนการจัดโครงสร้างหน้า Teach/Commands ของ Portfolio ให้ modal, data และ page owner อยู่ถูกที่และดูแลต่อได้',
    topics: ['feature-local component', 'modal ownership', 'page data', 'sourcePath', 'sync docs with UI'],
    sections: [
      {
        heading: 'ทำไม modal อยู่ใต้ page owner',
        paragraphs: [
          'TeachLessonModal และ CommandGuideModal ใช้เฉพาะหน้า /teach และ /commands จึงอยู่ใต้ pages/<page>/components ไม่ใช่ shared components',
          'วิธีนี้ทำให้คนอ่าน path แล้วรู้ ownership ทันทีว่า component นี้เป็นส่วนหนึ่งของ page ไหน',
        ],
        code: {
          label: 'Portfolio page component structure',
          language: 'text',
          code: `src/app/pages/teach-page/
  teach-page.component.ts
  teach-lessons.ts
  components/teach-lesson-modal/

src/app/pages/commands-page/
  commands-data.ts
  components/command-guide-modal/`,
        },
      },
      {
        heading: 'docs กับหน้าเว็บต้อง sync กัน',
        paragraphs: ['Portfolio มีทั้ง markdown docs และหน้า /teach /commands ที่ใช้ data TypeScript ดังนั้นเวลาเพิ่ม/ลบบทเรียนต้องแก้สองชั้นให้ตรงกัน'],
        code: {
          label: 'เช็ก sourcePath และไฟล์ docs',
          language: 'bash',
          code: `rg -n "sourcePath" src/app/pages
find docs/teach -maxdepth 1 -type f -name "*.md" -print | sort`,
        },
      },
      {
        heading: 'Command page คือบทเรียนเรื่องคำสั่ง',
        paragraphs: ['หน้า Commands ไม่ใช่แค่ list command แต่ต้องบอก purpose, notes, demo steps และ cautions เพื่อให้คนอ่านเข้าใจว่าคำสั่งใช้ทำอะไรและควรระวังอะไร'],
        demo: {
          title: 'Command guide ที่ดี',
          description: 'ทุก command ควรตอบว่า ใช้เมื่อไหร่ ทำอะไร และเสี่ยงอะไร',
          steps: ['ใส่ command', 'อธิบาย purpose', 'ใส่ notes ที่สอน concept', 'ใส่ cautions ถ้ามีผลต่อ repo/process'],
        },
      },
    ],
    quickNotes: ['Feature-local component อยู่ใกล้ page owner', 'sourcePath ต้องตรงกับ docs จริง', 'เพิ่ม teach แล้วต้อง sync /teach', 'เพิ่ม commands แล้วต้อง sync /commands'],
  },
];
