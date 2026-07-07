import { Component, inject } from '@angular/core';
import { PortfolioDataService } from '../../services/portfolio-data.service';
import { BookNavService } from '../../services/book-nav.service';
import { RevealDirective } from '../../directives/reveal.directive';
import { TiltDirective } from '../../directives/tilt.directive';

/**
 * บท 06 · Voices — คำพูดจากคนที่เคยร่วมงาน (จาก visibleTestimonials)
 * container จะ render บทนี้เฉพาะเมื่อมีรีวิวจริง (ตอนนี้เป็น demo ทั้งหมดจึงยังไม่โผล่)
 */
@Component({
  selector: 'app-testimonials',
  imports: [RevealDirective, TiltDirective],
  templateUrl: './testimonials.component.html',
  host: {
    'data-section': '',
    class:
      'flex min-h-screen flex-col justify-center py-[120px] pl-[clamp(96px,7vw,112px)] pr-[min(5vw,58px)] max-md:pb-[104px] max-md:pl-[22px] [scroll-snap-align:start]',
  },
})
export class TestimonialsComponent {
  readonly data = inject(PortfolioDataService);
  readonly nav = inject(BookNavService);
}
