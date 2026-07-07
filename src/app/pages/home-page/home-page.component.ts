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
import { HeroComponent } from '../../components/hero/hero.component';
import { AboutComponent } from '../../components/about/about.component';
import { SkillsComponent } from '../../components/skills/skills.component';
import { ProjectsComponent } from '../../components/projects/projects.component';
import { ExperienceComponent } from '../../components/experience/experience.component';
import { ServicesComponent } from '../../components/services/services.component';
import { TestimonialsComponent } from '../../components/testimonials/testimonials.component';
import { ContactComponent } from '../../components/contact/contact.component';

/**
 * HomePageComponent = container ของ "ApoRaviz Book"
 *
 * หน้าที่: ประกอบบท (section components) เรียงกันในตัว scroller + ถือ chrome ที่ "ข้ามทั้งเล่ม"
 * (top nav / spine / folio / bottom nav / page-turn) + orchestrate การเปลี่ยนบท (scroll + เอฟเฟกต์)
 *
 * สถานะบท/รายการบทอยู่ใน BookNavService (แชร์กับทุก section) ส่วน logic เฉพาะบทกระจายไปอยู่ใน component นั้น ๆ
 * งานที่แตะ DOM รันใน afterNextRender = browser-only จึงปลอดภัยกับ SSR/prerender
 */
@Component({
  selector: 'app-home-page',
  imports: [
    HeroComponent,
    AboutComponent,
    SkillsComponent,
    ProjectsComponent,
    ExperienceComponent,
    ServicesComponent,
    TestimonialsComponent,
    ContactComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {
  readonly data = inject(PortfolioDataService);
  readonly nav = inject(BookNavService);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  private readonly scrollerRef = viewChild<ElementRef<HTMLElement>>('scroller');
  private readonly overlayRef = viewChild<ElementRef<HTMLElement>>('pageturn');
  private readonly overlayLabelRef = viewChild<ElementRef<HTMLElement>>('pageturnLabel');

  private sections: HTMLElement[] = [];
  private reduce = false;
  private readonly cleanups: (() => void)[] = [];

  constructor() {
    // ให้ service เรียกเปลี่ยนบทผ่าน container ที่เป็นเจ้าของ DOM scroll จริง
    this.nav.attachNavigator((index) => this.turnTo(index));
    afterNextRender(() => this.initChrome());
    inject(DestroyRef).onDestroy(() => this.cleanups.forEach((fn) => fn()));
  }

  private initChrome(): void {
    const scroller = this.scrollerRef()?.nativeElement ?? null;
    this.reduce =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // section host ของแต่ละบทมี data-section — เก็บไว้เพื่อ observe บท active และเลื่อนหา
    this.sections = Array.from(this.host.nativeElement.querySelectorAll<HTMLElement>('[data-section]'));

    if (typeof IntersectionObserver !== 'undefined') {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const i = this.sections.indexOf(entry.target as HTMLElement);
              if (i >= 0) this.nav.active.set(i);
            }
          });
        },
        { root: scroller, threshold: 0.55 },
      );
      this.sections.forEach((section) => observer.observe(section));
      this.cleanups.push(() => observer.disconnect());
    }

    const onKey = (event: KeyboardEvent) => {
      if (['ArrowDown', 'ArrowRight', 'PageDown'].includes(event.key)) {
        event.preventDefault();
        this.nav.turn(1);
      } else if (['ArrowUp', 'ArrowLeft', 'PageUp'].includes(event.key)) {
        event.preventDefault();
        this.nav.turn(-1);
      }
    };
    window.addEventListener('keydown', onKey);
    this.cleanups.push(() => window.removeEventListener('keydown', onKey));
  }

  // turnTo = เลื่อนไปบท index พร้อมเอฟเฟกต์ "เปิดหน้าหนังสือ" (บานพับซ้าย หมุนผ่านหน้าราบ)
  private turnTo(index: number): void {
    if (!this.sections.length) return;
    const target = Math.min(Math.max(index, 0), this.sections.length - 1);
    const el = this.sections[target];
    const scroller = this.scrollerRef()?.nativeElement;
    if (!el || !scroller) return;

    const direction = target > this.nav.active() ? 1 : -1;
    const doScroll = () =>
      scroller.scrollTo({ top: el.offsetTop, behavior: this.reduce ? 'auto' : 'smooth' });

    const overlay = this.overlayRef()?.nativeElement;
    if (this.reduce || !overlay) {
      doScroll();
      return;
    }

    const label = this.overlayLabelRef()?.nativeElement;
    if (label) label.textContent = 'Ch · ' + String(target).padStart(2, '0');

    const start = direction > 0 ? 102 : -102;
    const end = direction > 0 ? -102 : 102;
    overlay.style.transformOrigin = 'left center';
    overlay.style.transition = 'none';
    overlay.style.transform = `perspective(1700px) rotateY(${start}deg)`;
    overlay.style.opacity = '1';
    void overlay.offsetWidth; // force reflow เพื่อให้ transition เริ่มจาก start จริง
    overlay.style.transition = 'transform .5s cubic-bezier(.42,0,.28,1)';
    overlay.style.transform = 'perspective(1700px) rotateY(0deg)';

    const t1 = setTimeout(() => {
      doScroll();
      overlay.style.transition = 'transform .52s cubic-bezier(.5,0,.32,1)';
      overlay.style.transform = `perspective(1700px) rotateY(${end}deg)`;
      const t2 = setTimeout(() => {
        overlay.style.opacity = '0';
      }, 470);
      this.cleanups.push(() => clearTimeout(t2));
    }, 320);
    this.cleanups.push(() => clearTimeout(t1));
  }
}
