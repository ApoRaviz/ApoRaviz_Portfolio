import { Directive, ElementRef, HostListener, inject } from '@angular/core';

/**
 * appTilt = เอียงการ์ดตามตำแหน่งเมาส์เล็กน้อย (parallax) + เน้นเส้นขอบส้มตอน hover
 *
 * ใช้ HostListener จึงปลอดภัยกับ SSR (ไม่มี listener ฝั่ง server) และเคารพ prefers-reduced-motion
 */
@Directive({
  selector: '[appTilt]',
})
export class TiltDirective {
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);

  private get reduce(): boolean {
    return (
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  }

  @HostListener('mousemove', ['$event'])
  onMove(event: MouseEvent): void {
    if (this.reduce) return;
    const card = this.el.nativeElement;
    const rect = card.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(900px) rotateX(${-py * 4}deg) rotateY(${px * 4}deg) translateY(-4px)`;
    card.style.borderColor = 'rgba(232,106,28,0.35)';
  }

  @HostListener('mouseleave')
  onLeave(): void {
    const card = this.el.nativeElement;
    card.style.transform = '';
    card.style.borderColor = '';
  }
}
