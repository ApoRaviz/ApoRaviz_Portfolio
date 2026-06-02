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
    title: 'Angular Reactive และ Signals',
    sourcePath: 'docs/teach/01-angular-reactive-and-signals.md',
    summary: 'อธิบาย reactive state ใน Angular ว่าเมื่อข้อมูลเปลี่ยน UI จะตอบสนองตามเอง โดยใช้ signal เป็นตัวอย่างหลักจากโปรเจกต์นี้',
    topics: ['reactive state', 'signal()', 'set() / update()', 'computed()', 'effect()'],
    sections: [
      {
        heading: 'Reactive คืออะไร',
        paragraphs: [
          'Reactive คือแนวคิดที่ให้ UI อ่าน state แล้วปล่อยให้ Angular อัปเดตส่วนที่เกี่ยวข้องเมื่อ state เปลี่ยน',
          'เราไม่ต้องจับ DOM เองทุกจุด เช่น เพิ่ม class, ซ่อน div, หรือเปลี่ยนข้อความด้วย selector ตรง ๆ',
        ],
        bullets: ['data/state เช่น mobile menu เปิดไหม', 'UI เช่น class, text, button state', 'Angular เชื่อมสองส่วนนี้ให้ผ่าน template'],
      },
      {
        heading: 'ตัวอย่างจาก mobile menu',
        paragraphs: ['โปรเจกต์นี้ใช้ signal เก็บสถานะเมนูมือถือ แล้ว template อ่านค่า `mobileMenuOpen()` เพื่อแสดงหรือซ่อนเมนู'],
        code: {
          label: 'Reactive state ด้วย signal',
          language: 'ts',
          code: `readonly mobileMenuOpen = signal(false);

toggleMobileMenu(): void {
  this.mobileMenuOpen.update((open) => !open);
}`,
        },
        demo: {
          title: 'กดปุ่มแล้ว UI ตาม state',
          description: 'เมื่อกด hamburger ค่าของ signal สลับ และ template ที่อ่านค่านั้นจะเปลี่ยนทันที',
          steps: ['ผู้ใช้กดปุ่มเมนู', 'update() เปลี่ยนค่า mobileMenuOpen', 'Angular render เมนูตาม @if', 'กดอีกครั้งเมนูปิด'],
        },
      },
      {
        heading: 'computed และ effect',
        paragraphs: [
          '`computed()` เหมาะกับค่าที่คำนวณจาก signal ตัวอื่น เช่น full name หรือจำนวน project',
          '`effect()` เหมาะกับ side effect เช่น log, sync localStorage หรือเรียก external API เมื่อ signal เปลี่ยน',
        ],
        code: {
          label: 'ค่าที่คำนวณจาก signal',
          language: 'ts',
          code: `readonly firstName = signal('Tanonchai');
readonly lastName = signal('Promsiri');
readonly fullName = computed(() => \`\${this.firstName()} \${this.lastName()}\`);`,
        },
      },
    ],
    quickNotes: ['signal อ่านค่าด้วย ()', 'set() ใช้เมื่อตั้งค่าใหม่แน่นอน', 'update() ใช้เมื่อค่าใหม่อิงค่าเดิม', 'computed() ใช้คำนวณค่า', 'effect() ใช้กับ side effect'],
  },
  {
    id: 2,
    title: 'Services และ Dependency Injection',
    sourcePath: 'docs/teach/02-services-and-dependency-injection.md',
    summary: 'อธิบายว่าทำไมต้องแยกข้อมูลและ logic กลางไว้ใน service และ inject() ช่วยให้ component ขอใช้ service ได้อย่างไร',
    topics: ['service', 'providedIn root', 'PortfolioDataService', 'ThemeService', 'inject()'],
    sections: [
      {
        heading: 'ทำไมบางข้อมูลเป็น service',
        paragraphs: ['Service คือ class ที่ component หลายตัวใช้ร่วมกันได้ เหมาะกับข้อมูลกลางของเว็บ เช่น profile, nav links, projects และ contact info'],
        code: {
          label: 'Service ที่แชร์ทั้งแอป',
          language: 'ts',
          code: `@Injectable({
  providedIn: 'root',
})
export class PortfolioDataService {}`,
        },
        demo: {
          title: 'แก้ข้อมูลที่เดียว ใช้ได้หลาย component',
          description: 'เมื่อ profile หรือ navLinks อยู่ใน service ทุก component ที่อ่านข้อมูลนี้จะได้ source เดียวกัน',
          steps: ['Navbar อ่าน navLinks', 'Hero อ่าน profile', 'Footer อ่าน contactInfo', 'แก้ข้อมูลกลางได้จาก service'],
        },
      },
      {
        heading: 'PortfolioDataService และ ThemeService',
        paragraphs: [
          'PortfolioDataService เก็บข้อมูลหลักของเว็บ เช่น profile, loadout, quest log, experience และ contact',
          'ThemeService เก็บ UI state เช่น navbar scrolled, active section, mobile menu และ scroll behavior',
        ],
        bullets: ['HTML เน้น layout', 'service เป็นแหล่งข้อมูลหลัก', 'logic scroll ไม่กระจายหลาย component'],
      },
      {
        heading: 'inject() และ dependency injection',
        paragraphs: ['Dependency injection คือ Angular ช่วยส่ง service ที่ class ต้องใช้เข้ามาให้ แทนการสร้างเองด้วย `new`'],
        code: {
          label: 'ขอใช้ service ด้วย inject()',
          language: 'ts',
          code: `readonly data = inject(PortfolioDataService);
readonly theme = inject(ThemeService);`,
        },
      },
      {
        heading: 'Guard browser APIs',
        paragraphs: ['เพราะโปรเจกต์ใช้ SSR/prerender โค้ดที่แตะ window, document หรือ IntersectionObserver ต้องตรวจก่อนว่าอยู่ใน browser จริง'],
        code: {
          label: 'SSR-safe guard',
          language: 'ts',
          code: `if (!this.isBrowser || typeof IntersectionObserver === 'undefined') {
  return;
}`,
        },
      },
    ],
    quickNotes: ['service ใช้แชร์ data/logic', 'providedIn root สร้าง instance เดียว', 'inject() ขอ service จาก Angular', 'อย่าสร้าง service ด้วย new', 'browser API ต้อง guard เมื่อมี SSR'],
  },
  {
    id: 3,
    title: 'Angular App Config และ SSR',
    sourcePath: 'docs/teach/03-angular-app-config-and-ssr.md',
    summary: 'สรุป provider สำคัญใน Angular standalone app ทั้ง router, hydration, event replay, animation และ server rendering',
    topics: ['ApplicationConfig', 'provideRouter()', 'hydration', 'event replay', 'prerender'],
    sections: [
      {
        heading: 'app.config.ts คืออะไร',
        paragraphs: ['Angular standalone app ใช้ ApplicationConfig และ providers แทน AppModule แบบเก่า เพื่อเปิดความสามารถระดับแอป'],
        code: {
          label: 'ApplicationConfig',
          language: 'ts',
          code: `export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideAnimations(),
  ],
};`,
        },
      },
      {
        heading: 'Router และ hydration',
        paragraphs: [
          'provideRouter(routes) เปิดระบบ route และช่วยให้ SSR รู้โครงสร้างหน้า',
          'provideClientHydration(withEventReplay()) ทำให้ Angular รับช่วง HTML ที่ prerender มา และ replay event ที่ผู้ใช้กดระหว่างรอ hydration',
        ],
        demo: {
          title: 'จาก HTML static ไปหน้า interactive',
          description: 'ผู้ใช้เห็น HTML ได้เร็ว จากนั้น Angular ค่อยผูก event/state กลับเข้าไป',
          steps: ['Build สร้าง HTML', 'Browser โหลด HTML', 'Angular hydrate', 'ปุ่มและ state กลับมา interactive'],
        },
      },
      {
        heading: 'Prerender กับ Hydration',
        paragraphs: ['Prerender คือสร้าง HTML static ตอน build ส่วน hydration คือ Angular ฝั่ง browser รับช่วง HTML นั้นให้กลับมาใช้งานแบบ interactive'],
        bullets: ['Prerender = สร้างหน้าไว้ก่อน', 'Hydration = ทำให้หน้าที่สร้างไว้มีชีวิตใน browser', 'เหมาะกับ portfolio เพราะเนื้อหา static เยอะ'],
      },
    ],
    quickNotes: ['provideRouter เปิด routing', 'withEventReplay เก็บ event ระหว่าง hydrate', 'provideAnimations เปิด Angular animations', 'provideServerRendering เปิด SSR/prerender ฝั่ง server'],
  },
  {
    id: 4,
    title: 'Redesign แนว RPG Profile',
    sourcePath: 'docs/teach/04-redesign-rpg-profile.md',
    summary: 'อธิบายเหตุผลของการ redesign ให้เว็บสื่อความเป็น gamer-minded developer โดยไม่ใช้คำโอ้อวดเกินตัว',
    topics: ['design direction', 'copy tone', 'RPG naming', 'text badge', 'reduced motion'],
    sections: [
      {
        heading: 'Design direction',
        paragraphs: ['การ redesign รอบนี้ไม่ได้เปลี่ยนแค่สี แต่กำหนดตัวตนของเว็บเป็น gamer-minded developer profile'],
        bullets: ['เป็นโปรแกรมเมอร์ที่ชอบเกม', 'เป็นกันเองและสนุกง่าย', 'ไม่ใช้คำอย่าง pro, professional, expert', 'ใช้เอกสาร design direction เป็นเข็มทิศ'],
      },
      {
        heading: 'Copy tone และ RPG naming',
        paragraphs: ['ข้อความบนเว็บควรสื่อว่าเป็น developer ที่ชอบเกมและสร้างของที่ใช้ได้จริง โดยไม่ขายความเชี่ยวชาญเกินจริง'],
        demo: {
          title: 'เปลี่ยนคำให้เป็นโลกเดียวกัน',
          description: 'คำธรรมดาถูกแปลงเป็นคำที่เข้ากับ mood ของเว็บ',
          steps: ['Skills -> Loadout', 'Projects -> Quest Log', 'Services -> Useful Builds', 'Testimonials -> Party Notes'],
        },
      },
      {
        heading: 'Text badge แทน emoji',
        paragraphs: ['Text badge คุมขนาดง่ายกว่า emoji และดูเข้ากับ HUD/game UI มากกว่า'],
        code: {
          label: 'Badge ใน service card',
          language: 'html',
          code: `<p class="font-mono text-sm text-primary">
  {{ service.icon }}
</p>`,
        },
      },
      {
        heading: 'Reduced motion และ font',
        paragraphs: ['เว็บที่มี animation ควรเคารพ prefers-reduced-motion และเลือก font ที่สื่อ mood ให้ชัด'],
        bullets: ['Fredoka สำหรับ heading', 'Nunito สำหรับ body', 'JetBrains Mono สำหรับ badge/code/HUD', 'ลด motion ให้ผู้ใช้ที่ไม่อยากเห็น animation เยอะ'],
      },
    ],
    quickNotes: ['Navbar เป็นแผนที่ Hero เป็นตัวตน', 'Loadout ไม่ใช่ค่าพลัง', 'Quest Log ให้ project เล่าแทนคำโอ้อวด', 'Reduced motion คือ accessibility'],
  },
  {
    id: 5,
    title: 'Resume Data, Hero Background และ Color',
    sourcePath: 'docs/teach/05-resume-data-and-hero-background.md',
    summary: 'อธิบายว่าข้อมูล resume ควรอยู่ใน service, Hero ใช้ semantic section และ background layer ใช้ div เพื่อคุม visual',
    topics: ['resume data', 'PortfolioDataService', 'Hero section', 'visual layers', 'color roles'],
    sections: [
      {
        heading: 'ข้อมูล resume อยู่ตรงไหน',
        paragraphs: ['ข้อมูลที่สัมพันธ์กับ resume ถูกใส่ใน PortfolioDataService เช่น profile, skillGroups, experiences และ contactInfo'],
        code: {
          label: 'Experience data',
          language: 'ts',
          code: `readonly experiences = signal<Experience[]>([
  {
    period: 'Nov 2023-Present',
    role: 'Senior Programmer',
    company: 'Unbox.IT',
    description: 'Working with WMS interfaces...',
  },
]);`,
        },
      },
      {
        heading: 'Hero ใช้ section ส่วน background ใช้ div',
        paragraphs: ['Hero เป็นเนื้อหาหลักและเป็น target ของ nav จึงควรเป็น section ส่วน visual layer ไม่มีความหมายเชิงเนื้อหา จึงใช้ div'],
        code: {
          label: 'Semantic structure',
          language: 'html',
          code: `<section id="home">
  <div aria-hidden="true">background layer</div>
  <div>layout wrapper</div>
</section>`,
        },
      },
      {
        heading: 'สีดำส้มควรเติมอะไร',
        paragraphs: ['ดำกับส้มเป็นคู่หลัก แต่ควรเติมสี role อื่นเพื่อให้ UI มีมิติและไม่ร้อนเกินไป'],
        bullets: ['Black = world', 'Orange = brand/action', 'Steel gray = structure', 'Ember red = energy', 'Soft green = status'],
        demo: {
          title: 'Color roles ในหน้า portfolio',
          description: 'ใช้สีตามหน้าที่ ไม่ใช้ทุกสีแข่งกัน',
          steps: ['Primary action ใช้ orange', 'Status ใช้ green', 'Border/panel ใช้ steel', 'Energy accent ใช้ red เล็กน้อย'],
        },
      },
    ],
    quickNotes: ['ข้อมูลจริงควรอยู่ใน service', 'HTML ควรเน้น layout', 'background layer ใช้ div', 'อย่าใช้แดงเยอะจนแย่ง orange'],
  },
  {
    id: 6,
    title: 'Browser APIs: IntersectionObserver, SSR และ Test',
    sourcePath: 'docs/teach/06-browser-apis-intersection-observer-ssr-test.md',
    summary: 'อธิบาย Browser API, viewport, IntersectionObserver และเหตุผลที่ต้อง guard โค้ดสำหรับ SSR/test',
    topics: ['Browser API', 'viewport', 'IntersectionObserver', 'rootMargin', 'SSR guard'],
    sections: [
      {
        heading: 'Browser API และ viewport',
        paragraphs: ['Browser API คือความสามารถที่ browser เตรียมไว้ให้ JavaScript ใช้ เช่น window, document, localStorage และ IntersectionObserver'],
        bullets: ['viewport คือพื้นที่ที่ผู้ใช้มองเห็น', 'หน้าเว็บอาจยาวกว่าจอ', 'observer ช่วยดูว่า element เข้า viewport หรือยัง'],
      },
      {
        heading: 'IntersectionObserver ใช้ทำอะไร',
        paragraphs: ['IntersectionObserver ให้ browser ช่วยเฝ้าว่า element เข้า/ออกพื้นที่ที่สนใจแล้วหรือยัง แทนการคำนวณ scroll เองทุกครั้ง'],
        code: {
          label: 'Observer พื้นฐาน',
          language: 'ts',
          code: `const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        console.log('Element is visible');
      }
    });
  },
  { threshold: 0.2 },
);`,
        },
      },
      {
        heading: 'ตัวอย่าง active navbar',
        paragraphs: ['โปรเจกต์นี้ filter เฉพาะ section ที่มองเห็น แล้ว sort ด้วย intersectionRatio เพื่อเลือก section ที่เห็นมากที่สุด'],
        demo: {
          title: 'Browser API -> signal -> class binding',
          description: 'observer เปลี่ยน activeSection แล้ว navbar เปลี่ยนสีตาม signal',
          steps: ['section เข้าจอ', 'observer ได้ entries', 'เลือก section ที่เห็นเยอะสุด', 'activeSection เปลี่ยน', 'navbar active link เปลี่ยนสี'],
        },
      },
      {
        heading: 'ทำไมต้อง guard',
        paragraphs: ['SSR/prerender และ test environment อาจไม่มี window, document หรือ IntersectionObserver ดังนั้นต้องเช็กก่อนใช้'],
        code: {
          label: 'Guard สำหรับ SSR/test',
          language: 'ts',
          code: `if (!this.isBrowser || typeof IntersectionObserver === 'undefined') {
  return;
}`,
        },
      },
    ],
    quickNotes: ['observe() เริ่มเฝ้า', 'unobserve() หยุดเฝ้า element เดียว', 'disconnect() หยุดทั้งชุด', 'threshold คือสัดส่วนที่อยากให้ callback', 'rootMargin คือพื้นที่ตรวจจับที่ขยาย/หดได้'],
  },
  {
    id: 7,
    title: 'CI/CD ด้วย GitHub Actions',
    sourcePath: 'docs/teach/07-cicd-github-actions.md',
    summary: 'สรุป CI/CD สำหรับ Angular portfolio ตั้งแต่ GitHub Actions, npm ci, build/test และ deploy ไป GitHub Pages',
    topics: ['CI/CD', 'GitHub Actions', 'npm ci', 'Node 24', 'GitHub Pages'],
    sections: [
      {
        heading: 'CI/CD คืออะไร',
        paragraphs: ['CI คือให้ระบบตรวจอัตโนมัติเมื่อ push หรือเปิด pull request ส่วน CD คือ deploy อัตโนมัติเมื่อ code ผ่านการตรวจ'],
        bullets: ['CI: test และ build', 'CD: deploy static output', 'เหมาะกับ portfolio ที่ deploy บ่อยได้โดยไม่ต้องทำมือทุกครั้ง'],
      },
      {
        heading: 'Workflow ในโปรเจกต์',
        paragraphs: ['Workflow คือไฟล์ automation ใน .github/workflows/ โปรเจกต์นี้มี ci.yml และ deploy-pages.yml'],
        demo: {
          title: 'CI flow',
          description: 'ทุกครั้งที่ push เข้า main หรือเปิด PR ระบบจะตรวจให้',
          steps: ['checkout code', 'setup Node 24', 'npm ci', 'npm run test', 'npm run build'],
        },
      },
      {
        heading: 'ทำไมใช้ npm ci',
        paragraphs: ['npm ci อ่านจาก package-lock.json แบบตรงไปตรงมา เหมาะกับ CI เพราะติดตั้งซ้ำได้เหมือนเดิม'],
        code: {
          label: 'CI install',
          language: 'bash',
          code: `npm ci
npm run test -- --watch=false --progress=false
npm run build -- --progress=false`,
        },
      },
      {
        heading: 'GitHub Pages และ base-href',
        paragraphs: ['ถ้า deploy เป็น project page ต้องตั้ง base-href ให้ตรง path ของ repo เพื่อให้ Angular หา JS/CSS ถูก'],
        code: {
          label: 'Build สำหรับ GitHub Pages',
          language: 'bash',
          code: `npm run build -- --progress=false --base-href /ApoRaviz_Portfolio/`,
        },
      },
    ],
    quickNotes: ['workflow คือไฟล์ .yml', 'setup-node เลือก Node version', 'cache npm ช่วยให้ workflow เร็วขึ้น', '.nojekyll ให้ GitHub Pages เสิร์ฟ static ตรง ๆ', 'ตั้ง Pages source เป็น GitHub Actions'],
  },
  {
    id: 8,
    title: 'Navbar Dropdown และ Custom Smooth Scroll',
    sourcePath: 'docs/teach/08-navbar-dropdown-and-smooth-scroll.md',
    summary: 'บันทึกการแก้ปัญหา Learn dropdown หายตอนเลื่อนเม้าช้า และ section scroll ที่ไม่ทำงาน โดยใช้ anchor fallback, scrollIntoView และ scroll-margin-top',
    topics: ['Learn dropdown', 'hover bridge', 'anchor fallback', 'scrollIntoView', 'route scroll queue'],
    sections: [
      {
        heading: 'Learn dropdown หายเพราะช่องว่าง',
        paragraphs: [
          'อาการคือชี้เม้าไปที่ Learn แล้ว submenu แสดง แต่ถ้าเลื่อนลงไปหา Teach หรือ Commands ช้า ๆ เมนูจะหายก่อน',
          'สาเหตุคือมีช่องว่างระหว่างปุ่มกับ panel เช่นใช้ mt-3 เมื่อ cursor ผ่านช่องนั้น wrapper ได้ mouseleave แล้วปิดเมนู',
        ],
        bullets: ['อย่าให้ trigger กับ submenu มี gap ที่ไม่อยู่ใน hit area', 'ใช้ wrapper ชั้นนอกเป็น invisible bridge', 'ให้ visual panel อยู่ชั้นในเพื่อคุม border/background เฉพาะกล่องจริง'],
        code: {
          label: 'Dropdown bridge',
          language: 'html',
          code: `<div class="relative" (mouseenter)="openLearnMenu()" (mouseleave)="closeLearnMenu()">
  <button type="button">Learn</button>

  <div class="absolute right-0 top-full min-w-40 pt-3">
    <div class="rounded-xl border border-white/10 bg-dark/95 p-2">
      <a routerLink="/teach">Teach</a>
      <a routerLink="/commands">Commands</a>
    </div>
  </div>
</div>`,
        },
        demo: {
          title: 'Bridge ทำให้ hover ไม่หลุด',
          description: 'พื้นที่ pt-3 ของ wrapper ครอบช่องว่างระหว่างปุ่มกับกล่องเมนู แม้เลื่อนเม้าช้าก็ยังถือว่าอยู่ใน dropdown',
          steps: ['เม้าชี้ Learn', 'signal เปิด menu', 'เม้าเคลื่อนผ่าน bridge', 'wrapper ยังไม่ mouseleave', 'เลือก Teach หรือ Commands ได้'],
        },
      },
      {
        heading: 'Section nav ควรมี anchor fallback',
        paragraphs: [
          'router-outlet ไม่ใช่ตัวการตรง ๆ เพราะ root layout ไม่มี scroll container แยก หน้าเว็บยังควร scroll ที่ document/window ตามปกติ',
          'ปัญหาคือเมนู section เป็น button ล้วนและพึ่ง custom scroll มากเกินไป ถ้า handler หรือ timing พลาด ผู้ใช้จะไม่มี fallback ให้ browser ไป #id เอง',
        ],
        bullets: ['ใช้ a พร้อม href="/#section-id" เป็น fallback', 'ใช้ scrollIntoView() แทน custom requestAnimationFrame scroll', 'ใส่ scroll-margin-top ให้ section[id]', "ถ้า behavior ถูกเปลี่ยนเป็น 'auto' จะวาปทันที"],
        code: {
          label: 'Anchor fallback',
          language: 'html',
          code: `<a [attr.href]="'/#' + link.id" (click)="goToSection($event, link.id)">
  {{ link.label }}
</a>`,
        },
      },
      {
        heading: 'scrollIntoView และ scroll-margin-top',
        paragraphs: [
          'scrollIntoView ให้ browser จัดการเลื่อนไปยัง element เป้าหมายโดยตรง ลดความเสี่ยงจากการคำนวณ scroll position เอง',
          'เพราะ navbar เป็น sticky จึงต้องให้ section มี scroll-margin-top เพื่อไม่ให้หัวข้อถูก navbar บังหลังเลื่อน',
        ],
        code: {
          label: 'Scroll primitive',
          language: 'ts',
          code: `section.scrollIntoView({
  behavior: 'smooth',
  block: 'start',
});`,
        },
      },
      {
        heading: 'ทำไมยังวาปทันที',
        paragraphs: [
          'ถ้า service ตรวจ prefers-reduced-motion แล้วเปลี่ยน behavior เป็น auto หรือ CSS ใน media query ใส่ scroll-behavior: auto !important การกด nav จะกระโดดไป section ทันที',
          'โปรเจกต์นี้ต้องการให้ nav scroll นุ่มเสมอ จึงให้ reduced-motion ลด reveal/transition อื่นได้ แต่ไม่ override scroll-behavior ของ section navigation',
        ],
        bullets: ['เช็ก branch ที่คืน behavior auto', 'เช็ก CSS media query ที่ override scroll-behavior', 'เช็กว่า html ยังเป็น scroll-behavior: smooth'],
      },
      {
        heading: 'Scroll หลัง route change',
        paragraphs: [
          'ถ้าอยู่หน้า /teach หรือ /commands แล้วกด Profile ต้อง navigate กลับ / ก่อน จากนั้นค่อย scroll ไป section เป้าหมาย',
          'ต้องรอให้ Home view พร้อมก่อน เพราะถ้า document.getElementById(id) ทำงานเร็วเกินไปจะยังหา section ไม่เจอ',
        ],
        code: {
          label: 'Queue ก่อน navigate',
          language: 'ts',
          code: `this.theme.queueSectionScroll(id);
void this.router.navigate(['/']);`,
        },
        demo: {
          title: 'จาก Learn route กลับ Home section',
          description: 'เก็บ id ที่ต้อง scroll ไว้ก่อน แล้วให้ HomePage consume หลัง view พร้อม',
          steps: ['ผู้ใช้กด Profile จาก /teach', 'queue section id เป็น about', 'router navigate กลับ /', 'HomePage view init', 'scrollToSectionWhenReady ทำงาน'],
        },
      },
    ],
    quickNotes: ['Dropdown มี gap ต้องทำ bridge', 'Section nav ควรเป็น a ที่มี href fallback', 'ใช้ scrollIntoView ก่อนเขียน custom animation', "อย่าให้ nav scroll ถูกเปลี่ยนเป็น behavior: 'auto'", 'section[id] ต้องมี scroll-margin-top เมื่อมี sticky navbar'],
  },
  {
    id: 9,
    title: 'Component Folder Best Practices',
    sourcePath: 'docs/teach/09-component-folder-best-practices.md',
    summary: 'สรุปวิธีจัด folder ของ component ย่อย เช่น modal ของ Teach และ Commands ให้เป็น feature-local component ที่อ่าน ownership ได้ชัด',
    topics: ['component folders', 'feature-local component', 'shared component', 'modal structure', 'import path'],
    sections: [
      {
        heading: 'ทำไม modal ไม่ควรวางปนกับ page เสมอไป',
        paragraphs: [
          'ถ้า page มีแค่ component หลักไฟล์ไม่กี่ตัว การวางปนกันยังอ่านได้ แต่เมื่อมี modal, data, helper และ component ย่อยหลายตัว folder จะเริ่มรก',
          'การแยก modal เข้า folder ของตัวเองช่วยให้รู้ว่าไฟล์ .ts และ .html ชุดนี้เป็น component เดียวกัน และไม่ปนกับ data/page หลัก',
        ],
        code: {
          label: 'Before',
          language: 'text',
          code: `src/app/pages/teach-page/
  teach-page.component.ts
  teach-page.component.html
  teach-lessons.ts
  teach-lesson-modal.component.ts
  teach-lesson-modal.component.html`,
        },
      },
      {
        heading: 'Feature-local component',
        paragraphs: [
          'ถ้า component ใช้เฉพาะ page เดียว ให้วางใต้ page owner เช่น pages/teach-page/components/teach-lesson-modal/',
          'ถ้า component ถูกใช้หลายหน้า ค่อยย้ายไป shared folder อย่าง src/app/components/',
        ],
        bullets: ['TeachLessonModal ใช้เฉพาะ /teach', 'CommandGuideModal ใช้เฉพาะ /commands', 'Navbar/Footer ใช้ทั้งแอป จึงอยู่ src/app/components'],
        code: {
          label: 'After',
          language: 'text',
          code: `src/app/pages/teach-page/
  teach-page.component.ts
  teach-page.component.html
  teach-lessons.ts
  components/
    teach-lesson-modal/
      teach-lesson-modal.component.ts
      teach-lesson-modal.component.html`,
        },
      },
      {
        heading: 'Import path หลังย้าย',
        paragraphs: ['Page หลัก import modal จาก folder ย่อย ส่วน modal import type/data กลับไปหา page owner ด้วย relative path ที่ชัดเจน'],
        code: {
          label: 'Feature import',
          language: 'ts',
          code: `import { TeachLessonModalComponent } from './components/teach-lesson-modal/teach-lesson-modal.component';
import { TeachLesson } from '../../teach-lessons';`,
        },
        demo: {
          title: 'Ownership อ่านจาก path',
          description: 'path บอกได้ว่า modal เป็น component ย่อยของหน้า Teach ไม่ใช่ shared component ทั้งเว็บ',
          steps: ['page มี components folder', 'modal อยู่ใน folder ของตัวเอง', 'data ยังอยู่ระดับ page', 'build ตรวจ import path หลังย้าย'],
        },
      },
    ],
    quickNotes: ['ใช้เฉพาะ page เดียว ให้วางใต้ pages/<page>/components', 'ใช้หลายหน้า ค่อยวาง src/app/components', 'component มี .ts/.html ควรมี folder ของตัวเอง', 'data ของ page อยู่ระดับ page ได้', 'หลังย้ายต้องรัน build'],
  },
];
