import { Injectable, computed, inject, signal } from '@angular/core';
import { PortfolioDataService } from './portfolio-data.service';

/**
 * BookNavService = สถานะ + API การนำทางของ "หนังสือ" ที่แชร์ระหว่าง container (chrome) กับแต่ละบท
 *
 * - chapters: รายการบทที่มีเนื้อหาจริง (Quests/Voices ถูกตัดออกอัตโนมัติถ้าไม่มีข้อมูล)
 * - active: บทที่กำลังอ่าน (container อัปเดตจาก IntersectionObserver, chrome อ่านไปไฮไลต์)
 * - go()/turn(): บท/chrome เรียกเพื่อสั่งเปลี่ยนหน้า โดยงานแตะ DOM จริงอยู่ที่ container ผ่าน attachNavigator()
 */
@Injectable({ providedIn: 'root' })
export class BookNavService {
  private readonly data = inject(PortfolioDataService);

  readonly chapters = computed(() => {
    const list: { id: string; label: string }[] = [
      { id: 'cover', label: 'Cover' },
      { id: 'profile', label: 'Profile' },
      { id: 'loadout', label: 'Loadout' },
    ];
    if (this.data.quests().length) list.push({ id: 'quests', label: 'Quests' });
    list.push({ id: 'journey', label: 'Journey' });
    if (this.data.services().length) list.push({ id: 'services', label: 'Services' });
    if (this.data.visibleTestimonials().length) list.push({ id: 'voices', label: 'Voices' });
    list.push({ id: 'contact', label: 'Contact' });
    return list.map((chapter, index) => ({ ...chapter, num: String(index).padStart(2, '0') }));
  });

  readonly total = computed(() => this.chapters().length);
  readonly active = signal(0);
  readonly folioNum = computed(() => String(this.active() + 1).padStart(2, '0'));
  readonly totalLabel = computed(() => String(this.total()).padStart(2, '0'));

  indexOf(id: string): number {
    return this.chapters().findIndex((chapter) => chapter.id === id);
  }

  numberOf(id: string): string {
    return this.chapters().find((chapter) => chapter.id === id)?.num ?? '';
  }

  // container ลงทะเบียน "ตัวเลื่อนจริง" (ที่แตะ DOM/ทำ page-turn) ไว้ที่นี่ครั้งเดียว
  private navigator: ((index: number) => void) | null = null;

  attachNavigator(fn: (index: number) => void): void {
    this.navigator = fn;
  }

  go(index: number): void {
    this.navigator?.(index);
  }

  turn(direction: number): void {
    this.go(this.active() + direction);
  }
}
