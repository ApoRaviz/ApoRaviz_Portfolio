import { Component, AfterViewInit, inject } from '@angular/core';
import { PortfolioDataService } from '../../services/portfolio-data.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
})
export class TestimonialsComponent implements AfterViewInit {
  readonly data = inject(PortfolioDataService);
  private readonly theme = inject(ThemeService);

  ngAfterViewInit(): void {
    this.theme.observeReveals();
  }
}
