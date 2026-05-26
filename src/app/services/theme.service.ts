import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';

@Injectable({
  // providedIn: 'root' ทำให้ Angular สร้าง service นี้เป็น singleton ใช้ state ร่วมกันได้ทั้งแอป
  providedIn: 'root',
})
export class ThemeService {
  // PLATFORM_ID ใช้ตรวจว่าโค้ดกำลังรันบน browser หรือ server เพราะ SSR ไม่มี window/document เหมือน browser
  private readonly platformId = inject(PLATFORM_ID);

  // DOCUMENT เป็น token ของ Angular สำหรับเข้าถึง document แบบ test/SSR-friendly กว่าการเรียก document ตรง ๆ
  private readonly document = inject(DOCUMENT);

  // isBrowser ช่วยให้เรา guard browser API เช่น window, scroll, IntersectionObserver ก่อนใช้งาน
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  // เก็บ observer ไว้ใน property เพื่อ disconnect ของเก่าได้ ไม่ให้มี observer ซ้อนหลายชุด
  private sectionObserver?: IntersectionObserver;
  private revealObserver?: IntersectionObserver;

  // signal คือ state reactive: ถ้า scrolled เปลี่ยน template ที่อ่าน scrolled() จะอัปเดตตาม
  readonly scrolled = signal(false);

  // activeSection เก็บ id ของ section ที่อยู่ใน viewport เพื่อทำ active nav link
  readonly activeSection = signal('home');

  // mobileMenuOpen เก็บสถานะเมนูมือถือ เปิด/ปิด โดย component อื่นอ่านและเปลี่ยนค่าได้ผ่าน service นี้
  readonly mobileMenuOpen = signal(false);

  startScrollTracking(): void {
    // SSR ไม่มี window ดังนั้นต้อง guard ก่อนแตะ browser API ทุกครั้ง
    if (!this.isBrowser) {
      return;
    }

    // updateScrolled แยกเป็น function เพื่อเรียกครั้งแรกทันที และใช้ซ้ำเมื่อเกิด scroll event
    const updateScrolled = () => this.scrolled.set(window.scrollY > 50);
    updateScrolled();

    // passive: true บอก browser ว่า listener นี้ไม่เรียก preventDefault ทำให้ scroll performance ดีขึ้น
    window.addEventListener('scroll', updateScrolled, { passive: true });
  }

  observeSections(sectionIds: string[]): void {
    // test environment บางตัวเช่น jsdom เป็น browser-like แต่ไม่มี IntersectionObserver
    if (!this.isBrowser || typeof IntersectionObserver === 'undefined') {
      return;
    }

    // disconnect ก่อนสร้างใหม่ เพราะหลาย component เรียก observe ได้หลัง view พร้อม ถ้าไม่ตัดของเก่าอาจทำงานซ้ำ
    this.sectionObserver?.disconnect();

    // IntersectionObserver ใช้ดูว่า section ไหนเข้ามาใน viewport โดยไม่ต้องคำนวณ scroll position เองทุกเฟรม
    this.sectionObserver = new IntersectionObserver(
      (entries) => {
        // เลือก section ที่มองเห็นมากที่สุด เพื่อให้ active nav link ตรงกับสิ่งที่ผู้ใช้อ่านอยู่
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          // set() คือการกำหนดค่าใหม่ให้ signal แล้ว Angular จะอัปเดต template ที่ใช้งานค่านี้
          this.activeSection.set(visible.target.id);
        }
      },
      {
        // rootMargin ขยับพื้นที่ตรวจจับให้ active เปลี่ยนตอน section เข้าใกล้กลางจอ ไม่ใช่แค่แตะขอบจอ
        rootMargin: '-35% 0px -45% 0px',

        // threshold คือสัดส่วนของ element ที่ต้องมองเห็นก่อน observer แจ้ง callback
        threshold: [0.15, 0.4, 0.65],
      },
    );

    // แปลง id เป็น element จริง กรอง null ออก แล้วให้ observer เริ่มติดตามแต่ละ section
    sectionIds
      .map((id) => this.document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element))
      .forEach((section) => this.sectionObserver?.observe(section));
  }

  observeReveals(): void {
    // guard นี้ทำให้ SSR และ unit tests ไม่พังเมื่อไม่มี IntersectionObserver จริง
    if (!this.isBrowser || typeof IntersectionObserver === 'undefined') {
      return;
    }

    this.revealObserver?.disconnect();

    // observer ชุดนี้ดู element ที่มี class reveal แล้วเติม animate-in ตอนเลื่อนเข้าจอ
    this.revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // classList.add ใช้กับ animation แบบ CSS เพราะเราแค่เปลี่ยน class ไม่ต้องเก็บ state Angular เพิ่ม
            entry.target.classList.add('animate-in');

            // unobserve หลัง animate แล้วเพื่อประหยัดงาน browser และไม่ animate ซ้ำ
            this.revealObserver?.unobserve(entry.target);
          }
        });
      },
      // threshold 0.12 หมายถึงเห็น element ประมาณ 12% ก็เริ่ม animation ได้ ดูเป็นธรรมชาติระหว่าง scroll
      { threshold: 0.12 },
    );

    // querySelectorAll('.reveal') หา element ทุกตัวที่อยาก animate จากทั้ง document
    this.document.querySelectorAll('.reveal').forEach((element) => this.revealObserver?.observe(element));
  }

  scrollToSection(id: string): void {
    if (!this.isBrowser) {
      return;
    }

    // scrollIntoView ให้ browser จัดการ smooth scroll ไปยัง section เป้าหมายโดยไม่ต้องคำนวณตำแหน่งเอง
    this.document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // หลังคลิกเมนูบนมือถือแล้วปิด overlay เพื่อให้ผู้ใช้เห็น section ที่เลื่อนไปทันที
    this.mobileMenuOpen.set(false);
  }

  scrollToTop(): void {
    if (!this.isBrowser) {
      return;
    }

    // window.scrollTo ใช้กับ back-to-top เพราะต้องเลื่อนไปตำแหน่ง absolute ด้านบนสุดของหน้า
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  toggleMobileMenu(): void {
    // update() ใช้เปลี่ยนค่าจากค่าเดิม เหมาะกับ toggle เพราะต้องรู้สถานะก่อนหน้า open/closed
    this.mobileMenuOpen.update((open) => !open);
  }
}
