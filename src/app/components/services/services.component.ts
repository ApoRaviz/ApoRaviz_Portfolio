import { Component, AfterViewInit, inject } from '@angular/core';
import { PortfolioDataService } from '../../services/portfolio-data.service';
import { ThemeService } from '../../services/theme.service';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-services-section',
  imports: [IconComponent],
  templateUrl: './services.component.html',
})
export class ServicesComponent implements AfterViewInit {
  readonly data = inject(PortfolioDataService);
  private readonly theme = inject(ThemeService);

  ngAfterViewInit(): void {
    this.theme.observeReveals();
  }
}
