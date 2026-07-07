import { Component, inject } from '@angular/core';
import { PortfolioDataService } from '../../services/portfolio-data.service';
import { BookNavService } from '../../services/book-nav.service';
import { RevealDirective } from '../../directives/reveal.directive';

/**
 * บท 04 · Journey — timeline ประสบการณ์ (จาก experiences)
 */
@Component({
  selector: 'app-experience',
  imports: [RevealDirective],
  templateUrl: './experience.component.html',
  host: {
    'data-section': '',
    class:
      'flex min-h-screen flex-col justify-center py-[120px] pl-[clamp(96px,7vw,112px)] pr-[min(5vw,58px)] max-md:pb-[104px] max-md:pl-[22px] [scroll-snap-align:start]',
  },
})
export class ExperienceComponent {
  readonly data = inject(PortfolioDataService);
  readonly nav = inject(BookNavService);
}
