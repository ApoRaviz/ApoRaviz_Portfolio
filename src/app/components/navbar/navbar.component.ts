import { AfterViewInit, Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { PortfolioDataService } from '../../services/portfolio-data.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements AfterViewInit {
  readonly data = inject(PortfolioDataService);
  readonly theme = inject(ThemeService);
  readonly learnMenuOpen = signal(false);

  private readonly router = inject(Router);

  ngAfterViewInit(): void {
    this.theme.startScrollTracking();
  }

  goToSection(event: MouseEvent, id: string): void {
    event.preventDefault();
    this.theme.closeMobileMenu();
    this.learnMenuOpen.set(false);

    const currentPath = this.router.url.split('?')[0].split('#')[0];

    if (currentPath === '/') {
      this.theme.scrollToSection(id);
      return;
    }

    this.theme.queueSectionScroll(id);
    void this.router.navigate(['/']);
  }

  openLearnMenu(): void {
    this.learnMenuOpen.set(true);
  }

  closeLearnMenuIfFocusLeaves(event: FocusEvent): void {
    const currentTarget = event.currentTarget;
    const nextTarget = event.relatedTarget;

    if (currentTarget instanceof Node && nextTarget instanceof Node && currentTarget.contains(nextTarget)) {
      return;
    }

    this.closeLearnMenu();
  }

  closeLearnMenu(): void {
    this.learnMenuOpen.set(false);
    this.theme.closeMobileMenu();
  }

  isLearnActive(): boolean {
    const currentPath = this.router.url.split('?')[0].split('#')[0];
    return currentPath === '/teach' || currentPath === '/commands';
  }
}
