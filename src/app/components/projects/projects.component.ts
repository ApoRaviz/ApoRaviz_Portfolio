import { Component, inject } from '@angular/core';
import { PortfolioDataService } from '../../services/portfolio-data.service';
import { BookNavService } from '../../services/book-nav.service';
import { RevealDirective } from '../../directives/reveal.directive';
import { TiltDirective } from '../../directives/tilt.directive';

/**
 * บท 03 · Quests — การ์ดโปรเจกต์ที่ทำจริง (จาก visibleProjects)
 */
@Component({
  selector: 'app-projects',
  imports: [RevealDirective, TiltDirective],
  templateUrl: './projects.component.html',
  host: {
    'data-section': '',
    class:
      'flex min-h-screen flex-col justify-center py-[120px] pl-[clamp(96px,7vw,112px)] pr-[min(5vw,58px)] max-md:pb-[104px] max-md:pl-[22px] [scroll-snap-align:start]',
  },
})
export class ProjectsComponent {
  readonly data = inject(PortfolioDataService);
  readonly nav = inject(BookNavService);
}
