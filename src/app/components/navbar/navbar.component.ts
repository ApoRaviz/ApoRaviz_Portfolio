import { AfterViewInit, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PortfolioDataService } from '../../services/portfolio-data.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements AfterViewInit {
  readonly data = inject(PortfolioDataService);
  readonly theme = inject(ThemeService);
  readonly workspaceDocsUrl = 'https://github.com/ApoRaviz/ApoRaviz_Workspace_Docs';

  ngAfterViewInit(): void {
    this.theme.startScrollTracking();
  }

  goToSection(event: MouseEvent, id: string): void {
    event.preventDefault();
    this.theme.closeMobileMenu();
    this.theme.scrollToSection(id);
  }
}
