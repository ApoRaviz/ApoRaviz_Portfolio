import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

// icon หนึ่งตัวเก็บเป็น path list; ส่วนใหญ่เป็น stroke icon แต่ brand icon เช่น GitHub/Facebook ใช้ fill
interface IconDef {
  paths: string[];
  fill?: boolean;
}

// ICONS แมป key (เดิมเก็บเป็นตัวอักษรใน PortfolioDataService) → รูป SVG จริง
// แยกออกมาเป็น record เดียวเพื่อให้เพิ่ม/แก้ icon ได้ที่เดียวโดยไม่ต้องแตะ template ของแต่ละ section
const ICONS: Record<string, IconDef> = {
  // --- About feature cards ---
  FUN: {
    paths: [
      'M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z',
      'M3.5 20a6.5 6.5 0 0 1 11 0',
      'M16 5.5a3 3 0 0 1 0 6',
      'M17.5 14.2a6.5 6.5 0 0 1 3 5.8',
    ],
  },
  CODE: { paths: ['M9 8l-4 4 4 4', 'M15 8l4 4-4 4', 'M13.5 5l-3 14'] },
  CARE: {
    paths: [
      'M12 3l1.7 5.1a2 2 0 0 0 1.2 1.2L20 11l-5.1 1.7a2 2 0 0 0-1.2 1.2L12 19l-1.7-5.1a2 2 0 0 0-1.2-1.2L4 11l5.1-1.7a2 2 0 0 0 1.2-1.2L12 3Z',
    ],
  },
  PLAY: {
    paths: [
      'M8 9h8a5 5 0 0 1 4.9 6 2.5 2.5 0 0 1-4.6.8L15.4 14H8.6l-.9 1.8A2.5 2.5 0 0 1 3.1 15 5 5 0 0 1 8 9Z',
      'M6.5 11.5v2',
      'M5.5 12.5h2',
      'M15.5 12h.01',
      'M17.5 13.5h.01',
    ],
  },
  // --- Services ---
  WEB: {
    paths: [
      'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z',
      'M3 12h18',
      'M12 3c2.5 2.5 3.8 5.6 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.6-3.8-9S9.5 5.5 12 3Z',
    ],
  },
  APP: {
    paths: [
      'M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z',
      'M3 9h18',
      'M6.5 7h.01',
      'M9 7h.01',
    ],
  },
  DASH: {
    paths: [
      'M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z',
      'M8 16v-3',
      'M12 16v-6',
      'M16 16v-4',
    ],
  },
  BOT: {
    paths: [
      'M6 9h12a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2Z',
      'M12 9V6',
      'M12 6a1.2 1.2 0 1 0 0-2.4A1.2 1.2 0 0 0 12 6Z',
      'M9 13h.01',
      'M15 13h.01',
      'M2 13v2',
      'M22 13v2',
    ],
  },
  LINE: {
    paths: [
      'M20 12a7 6 0 0 1-7 6 8 8 0 0 1-2.7-.45L5 19.5l1.2-3A6 6 0 0 1 6 12a7 6 0 0 1 7-6 7 6 0 0 1 7 6Z',
    ],
  },
  AUTO: { paths: ['M20 11a8 8 0 1 0-1.6 5.6', 'M20 6v5h-5'] },
  API: {
    paths: [
      'M8 4a3 3 0 0 0-3 3v2a2 2 0 0 1-2 2 2 2 0 0 1 2 2v2a3 3 0 0 0 3 3',
      'M16 4a3 3 0 0 1 3 3v2a2 2 0 0 0 2 2 2 2 0 0 0-2 2v2a3 3 0 0 1-3 3',
    ],
  },
  // --- Contact / Footer ---
  MAIL: {
    paths: [
      'M4 6h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1Z',
      'M4 7l8 6 8-6',
    ],
  },
  CALL: {
    paths: [
      'M16.5 21a13 13 0 0 1-13-13 2 2 0 0 1 2-2h2.2a1 1 0 0 1 1 .8l.8 3a1 1 0 0 1-.5 1.1L9.5 11.7a11 11 0 0 0 4.8 4.8l1.7-1.4a1 1 0 0 1 1.1-.5l3 .8a1 1 0 0 1 .8 1V19a2 2 0 0 1-2 2Z',
    ],
  },
  GH: {
    fill: true,
    paths: [
      'M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z',
    ],
  },
  FB: {
    fill: true,
    paths: [
      'M14 8.5h2.5V5.6H14c-2.2 0-3.6 1.4-3.6 3.6V11H8v2.9h2.4V21h3v-7.1H16l.5-2.9h-3.1V9.4c0-.6.3-.9 1-.9Z',
    ],
  },
};

// fallback ใช้เมื่อ key ไม่ตรงกับ icon ที่มี เพื่อไม่ให้หน้าเว็บพังเงียบ ๆ
const FALLBACK: IconDef = { paths: ['M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z'] };

@Component({
  selector: 'app-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (def().fill) {
      <svg
        [class]="sizeClass()"
        class="inline-block shrink-0"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        focusable="false"
      >
        @for (d of def().paths; track $index) {
          <path [attr.d]="d" />
        }
      </svg>
    } @else {
      <svg
        [class]="sizeClass()"
        class="inline-block shrink-0"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.7"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
        focusable="false"
      >
        @for (d of def().paths; track $index) {
          <path [attr.d]="d" />
        }
      </svg>
    }
  `,
})
export class IconComponent {
  // name คือ key เดิมจาก data service (เช่น 'MAIL', 'CODE')
  readonly name = input.required<string>();
  // sizeClass รับ Tailwind sizing class (เช่น 'h-5 w-5') ให้ caller คุมขนาดด้วย utility เดียวกับทั้งเว็บ
  readonly sizeClass = input('h-5 w-5');

  // computed เลือก def จาก ICONS โดยไม่สนตัวพิมพ์ใหญ่เล็ก แล้ว fallback ถ้าไม่เจอ
  readonly def = computed<IconDef>(() => ICONS[this.name()?.toUpperCase()] ?? FALLBACK);
}
