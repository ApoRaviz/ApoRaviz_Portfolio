import { Component, inject } from '@angular/core';
import { PortfolioDataService } from '../../services/portfolio-data.service';
import { ThemeService } from '../../services/theme.service';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-footer',
  imports: [IconComponent],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  readonly data = inject(PortfolioDataService);
  readonly theme = inject(ThemeService);

  // year คำนวณตอน build/render เพื่อไม่ให้ปี copyright ค้างเป็นค่า hardcode
  readonly year = new Date().getFullYear();
}
