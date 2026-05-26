import { Component, AfterViewInit, inject } from '@angular/core';
import { PortfolioDataService } from '../../services/portfolio-data.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
})
export class AboutComponent implements AfterViewInit {
  readonly data = inject(PortfolioDataService);
  private readonly theme = inject(ThemeService);

  ngAfterViewInit(): void {
    // เรียกซ้ำได้ เพราะ service จะ disconnect observer เดิมก่อนสร้างใหม่
    this.theme.observeReveals();
  }
}
