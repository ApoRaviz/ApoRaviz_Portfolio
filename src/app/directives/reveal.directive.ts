import { DestroyRef, Directive, ElementRef, afterNextRender, inject, input } from '@angular/core';

/**
 * appReveal = ทำ element ให้ "เลื่อนเข้า" ตอนถูก scroll เข้ามาในจอ (fade + slide up)
 *
 * ใช้แทนการให้ container ไล่ query [data-reveal] ทั้งต้นไม้ — แต่ละ section ใส่ directive ที่ element ตัวเองได้เลย
 * รันเฉพาะฝั่ง browser (afterNextRender) และถ้าไม่มี IntersectionObserver/สั่ง reduced-motion จะปล่อยให้แสดงตามปกติ
 *
 * ค่า input = ดีเลย์ (ms) ก่อนโผล่ เช่น <div appReveal="120">
 */
@Directive({
  selector: '[appReveal]',
})
export class RevealDirective {
  readonly appReveal = input<number | string>('');

  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private observer?: IntersectionObserver;

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => this.init());
    destroyRef.onDestroy(() => this.observer?.disconnect());
  }

  private init(): void {
    if (typeof IntersectionObserver === 'undefined') return;
    const reduce =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const node = this.el.nativeElement;
    const delay = Number(this.appReveal()) || 0;
    node.style.opacity = '0';
    node.style.transform = 'translateY(28px)';
    node.style.transition =
      'opacity .8s cubic-bezier(.22,.61,.36,1), transform .8s cubic-bezier(.22,.61,.36,1)';

    // อ้าง scroller หลักเป็น root เพื่อให้ threshold แม่นในบริบทหน้า overflow ภายใน
    const scroller = node.closest('[data-scroller]');
    this.observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            node.style.transitionDelay = delay / 1000 + 's';
            node.style.opacity = '1';
            node.style.transform = 'none';
            obs.unobserve(node);
          }
        });
      },
      { root: scroller, threshold: 0.15 },
    );
    this.observer.observe(node);
  }
}
