import {
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  inject,
  viewChild,
} from '@angular/core';
import { PortfolioDataService } from '../../services/portfolio-data.service';
import { BookNavService } from '../../services/book-nav.service';
import { RevealDirective } from '../../directives/reveal.directive';

/**
 * บท 00 · Cover — หน้าปกเล่ม พร้อม canvas อนุภาคลอย/เส้นเชื่อม (เป็นเจ้าของเอฟเฟกต์นี้เอง)
 * host เป็น section ของหนังสือ (data-section) เพื่อให้ container จับบท active + เลื่อนหาได้
 */
@Component({
  selector: 'app-hero',
  imports: [RevealDirective],
  templateUrl: './hero.component.html',
  host: {
    'data-section': '',
    class:
      'relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-[min(5vw,46px)] pb-[90px] pt-[110px] text-center [scroll-snap-align:start]',
  },
})
export class HeroComponent {
  readonly data = inject(PortfolioDataService);
  readonly nav = inject(BookNavService);

  private readonly canvasRef = viewChild<ElementRef<HTMLCanvasElement>>('heroCanvas');
  private raf = 0;
  private on = false;
  private readonly cleanups: (() => void)[] = [];

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => this.initHero());
    destroyRef.onDestroy(() => {
      if (this.raf) cancelAnimationFrame(this.raf);
      this.on = false;
      this.cleanups.forEach((fn) => fn());
    });
  }

  private initHero(): void {
    const canvas = this.canvasRef()?.nativeElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduce =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let w = 0;
    let h = 0;
    let dpr = 1;
    const count = 42;
    const pts: { x: number; y: number; vx: number; vy: number; r: number }[] = [];

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);
    this.cleanups.push(() => window.removeEventListener('resize', resize));

    for (let i = 0; i < count; i++) {
      pts.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: Math.random() * 1.5 + 0.5,
      });
    }

    const frame = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of pts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      }
      for (let i = 0; i < count; i++) {
        for (let j = i + 1; j < count; j++) {
          const a = pts[i];
          const b = pts[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 130) {
            ctx.strokeStyle = 'rgba(232,106,28,' + 0.11 * (1 - d / 130) + ')';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      for (const p of pts) {
        ctx.fillStyle = 'rgba(245,158,91,0.55)';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 7);
        ctx.fill();
      }
      if (!reduce && this.on) this.raf = requestAnimationFrame(frame);
    };

    if (reduce) {
      frame(); // reduced-motion: วาดเฟรมนิ่งเฟรมเดียว
      return;
    }

    this.on = true;
    frame();

    // หยุด loop เมื่อปกเลื่อนพ้นจอ เพื่อประหยัดแบต
    if ('IntersectionObserver' in window) {
      const scroller = canvas.closest('[data-scroller]');
      const visibility = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              if (!this.on) {
                this.on = true;
                frame();
              }
            } else {
              this.on = false;
              if (this.raf) cancelAnimationFrame(this.raf);
            }
          });
        },
        { root: scroller, threshold: 0.03 },
      );
      visibility.observe(canvas);
      this.cleanups.push(() => visibility.disconnect());
    }
  }
}
