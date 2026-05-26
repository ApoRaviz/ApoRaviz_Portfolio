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

  readonly scrolled = signal(false);
  readonly activeSection = signal('home');
  readonly mobileMenuOpen = signal(false);

  startScrollTracking(): void {
    // SSR ไม่มี window ดังนั้นต้อง guard ก่อนแตะ browser API ทุกครั้ง
    if (!this.isBrowser) {
      return;
    }

    const updateScrolled = () => this.scrolled.set(window.scrollY > 50);
    updateScrolled();
    window.addEventListener('scroll', updateScrolled, { passive: true });
  }

  observeSections(sectionIds: string[]): void {
    // test environment บางตัวเช่น jsdom เป็น browser-like แต่ไม่มี IntersectionObserver
    if (!this.isBrowser || typeof IntersectionObserver === 'undefined') {
      return;
    }

    this.sectionObserver?.disconnect();
    this.sectionObserver = new IntersectionObserver(
      (entries) => {
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
    // guard นี้ทำให้ SSR และ unit tests ไม่พังเมื่อไม่มี IntersectionObserver จริง
    if (!this.isBrowser || typeof IntersectionObserver === 'undefined') {
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

    this.document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    this.mobileMenuOpen.set(false);
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
}
