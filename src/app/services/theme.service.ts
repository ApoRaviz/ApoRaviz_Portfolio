import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly document = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  private sectionObserver?: IntersectionObserver;
  private revealObserver?: IntersectionObserver;
  private pendingSectionId: string | null = null;
  private pendingScrollTimer?: ReturnType<typeof globalThis.setTimeout>;
  private activeSectionLockId: string | null = null;
  private activeSectionLockTimer?: ReturnType<typeof globalThis.setTimeout>;

  readonly scrolled = signal(false);
  readonly activeSection = signal('home');
  readonly mobileMenuOpen = signal(false);

  startScrollTracking(): void {
    if (!this.isBrowser) {
      return;
    }

    const updateScrolled = () => this.scrolled.set(window.scrollY > 50);
    updateScrolled();

    window.addEventListener('scroll', updateScrolled, { passive: true });
  }

  observeSections(sectionIds: string[]): void {
    if (!this.isBrowser || typeof IntersectionObserver === 'undefined') {
      return;
    }

    this.sectionObserver?.disconnect();

    this.sectionObserver = new IntersectionObserver(
      (entries) => {
        // ตอนผู้ใช้กดเมนูให้ smooth scroll ไป section ไกล ๆ หน้าเว็บจะเลื่อนผ่าน section กลางทาง
        // ถ้าให้ observer set active ทันที underline ใน navbar จะกระพริบผ่านทุก section จึงต้อง lock id เป้าหมายไว้ก่อน
        if (this.activeSectionLockId) {
          const lockedEntry = entries.find((entry) => entry.target.id === this.activeSectionLockId);

          if (!lockedEntry?.isIntersecting) {
            return;
          }

          this.clearActiveSectionLock();
        }

        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          this.activeSection.set(visible.target.id);
        }
      },
      {
        rootMargin: '-35% 0px -45% 0px',
        threshold: [0.15, 0.4, 0.65],
      },
    );

    sectionIds
      .map((id) => this.document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element))
      .forEach((section) => this.sectionObserver?.observe(section));
  }

  observeReveals(): void {
    if (!this.isBrowser) {
      return;
    }

    if (typeof IntersectionObserver === 'undefined') {
      this.document.querySelectorAll('.reveal').forEach((element) => element.classList.add('animate-in'));
      return;
    }

    this.revealObserver?.disconnect();

    this.revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            this.revealObserver?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    this.document.querySelectorAll('.reveal').forEach((element) => this.revealObserver?.observe(element));
  }

  scrollToSection(id: string): void {
    if (!this.isBrowser) {
      return;
    }

    const section = this.document.getElementById(id);

    if (section) {
      // set active ก่อนเริ่ม scroll เพื่อให้ผู้ใช้เห็นทันทีว่าเมนูที่กดถูกเลือกแล้ว
      // จากนั้น lock ไว้ชั่วคราว เพื่อไม่ให้ scroll spy เปลี่ยน underline ไปตาม section ที่วิ่งผ่านระหว่างทาง
      this.lockActiveSection(id);
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }

    this.mobileMenuOpen.set(false);
  }

  scrollToSectionWhenReady(id: string): void {
    if (!this.isBrowser) {
      return;
    }

    if (this.pendingScrollTimer) {
      globalThis.clearTimeout(this.pendingScrollTimer);
    }

    this.pendingScrollTimer = globalThis.setTimeout(() => this.scrollToSectionWithRetry(id), 80);
  }

  scrollToTop(): void {
    if (!this.isBrowser) {
      return;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update((open) => !open);
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }

  setActiveSection(id: string): void {
    this.clearActiveSectionLock();
    this.activeSection.set(id);
  }

  queueSectionScroll(id: string): void {
    this.pendingSectionId = id;
  }

  consumeQueuedSectionScroll(): string | null {
    const id = this.pendingSectionId;
    this.pendingSectionId = null;
    return id;
  }

  private scrollToSectionWithRetry(id: string, attempt = 0): void {
    if (this.document.getElementById(id)) {
      this.scrollToSection(id);
      return;
    }

    if (attempt >= 12) {
      return;
    }

    window.requestAnimationFrame(() => {
      globalThis.setTimeout(() => this.scrollToSectionWithRetry(id, attempt + 1), 80);
    });
  }

  private lockActiveSection(id: string): void {
    this.activeSection.set(id);
    this.activeSectionLockId = id;

    if (this.activeSectionLockTimer) {
      globalThis.clearTimeout(this.activeSectionLockTimer);
    }

    // smooth scroll ไม่มี event มาตรฐานที่บอกว่าเลื่อนจบแล้วในทุก browser
    // timeout นี้เป็น fallback กัน lock ค้าง ถ้า observer ไม่เห็น section เป้าหมายเพราะ layout หรือ user scroll แทรก
    this.activeSectionLockTimer = globalThis.setTimeout(() => this.clearActiveSectionLock(), 1400);
  }

  private clearActiveSectionLock(): void {
    this.activeSectionLockId = null;

    if (this.activeSectionLockTimer) {
      globalThis.clearTimeout(this.activeSectionLockTimer);
      this.activeSectionLockTimer = undefined;
    }
  }

}
