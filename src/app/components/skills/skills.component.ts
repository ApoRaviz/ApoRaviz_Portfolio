import { Component, inject, signal } from '@angular/core';
import { PortfolioDataService } from '../../services/portfolio-data.service';
import { BookNavService } from '../../services/book-nav.service';
import { RevealDirective } from '../../directives/reveal.directive';

/**
 * บท 02 · Loadout — รายการหมวดเครื่องมือ + inspector ที่สลับตาม hover/focus/click
 * ใช้ signal activeCat คุมหมวดที่เลือก (Angular binding ล้วน ไม่ query DOM)
 */
@Component({
  selector: 'app-skills',
  imports: [RevealDirective],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css',
  host: {
    'data-section': '',
    class:
      'flex min-h-screen flex-col justify-center py-[120px] pl-[clamp(96px,7vw,112px)] pr-[min(5vw,58px)] max-md:pb-[104px] max-md:pl-[22px] [scroll-snap-align:start]',
  },
})
export class SkillsComponent {
  readonly data = inject(PortfolioDataService);
  readonly nav = inject(BookNavService);

  readonly activeCat = signal(0);
}
