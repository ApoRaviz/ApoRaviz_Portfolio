import { isPlatformBrowser } from '@angular/common';
import { Component, OnDestroy, OnInit, PLATFORM_ID, inject, signal } from '@angular/core';
import { PortfolioDataService } from '../../services/portfolio-data.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
})
export class HeroComponent implements OnInit, OnDestroy {
  readonly data = inject(PortfolioDataService);
  readonly theme = inject(ThemeService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private intervalId?: ReturnType<typeof setInterval>;
  private roleIndex = 0;
  private charIndex = 0;
  private deleting = false;

  // signal ทำให้ typewriter text เปลี่ยนแล้ว template อัปเดตทันทีโดยไม่ต้องจับ DOM เอง
  readonly displayedRole = signal('');

  ngOnInit(): void {
    if (!this.isBrowser) {
      this.displayedRole.set(this.data.roles()[0]);
      return;
    }

    this.intervalId = setInterval(() => this.tickTypewriter(), 90);
  }

  ngOnDestroy(): void {
    // clearInterval ป้องกัน timer ค้างเมื่อ component ถูกทำลาย
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private tickTypewriter(): void {
    const roles = this.data.roles();
    const current = roles[this.roleIndex];

    if (!this.deleting) {
      this.charIndex += 1;
      this.displayedRole.set(current.slice(0, this.charIndex));

      if (this.charIndex === current.length) {
        this.deleting = true;
        return;
      }
    } else {
      this.charIndex -= 1;
      this.displayedRole.set(current.slice(0, this.charIndex));

      if (this.charIndex === 0) {
        this.deleting = false;
        this.roleIndex = (this.roleIndex + 1) % roles.length;
      }
    }
  }
}
