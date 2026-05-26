import { Component, AfterViewInit, inject } from '@angular/core';
import { PortfolioDataService } from '../../services/portfolio-data.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements AfterViewInit {
  // public readonly ทำให้ template เรียก data.navLinks() ได้โดยไม่ต้อง copy state ซ้ำ
  readonly data = inject(PortfolioDataService);
  readonly theme = inject(ThemeService);

  ngAfterViewInit(): void {
    // ngAfterViewInit ใช้เมื่อ DOM ของ component และ section ต่าง ๆ พร้อมให้ IntersectionObserver หา element ได้
    this.theme.startScrollTracking();
    this.theme.observeSections(this.data.navLinks().map((link) => link.id));
  }
}
