import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { App } from './app';
import { routes } from './app.routes';
import { BookNavService } from './services/book-nav.service';
import { PortfolioDataService } from './services/portfolio-data.service';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes)],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  // App เหลือแค่ router-outlet — ชื่อเจ้าของอยู่ในหน้า Book (lazy) จึงต้อง navigate เข้า route '' ก่อน
  it('should render the portfolio owner name on the home route', async () => {
    const harness = await RouterTestingHarness.create('/');
    await harness.fixture.whenStable();
    expect(harness.routeNativeElement?.textContent).toContain('Tanonchai Promsiri');
  });

  it('leaves arrow keys available for editing contact fields', async () => {
    const harness = await RouterTestingHarness.create('/');
    await harness.fixture.whenStable();
    const input =
      harness.routeNativeElement!.querySelector<HTMLInputElement>('input[name="name"]')!;
    const event = new KeyboardEvent('keydown', {
      key: 'ArrowLeft',
      bubbles: true,
      cancelable: true,
    });
    input.dispatchEvent(event);
    expect(event.defaultPrevented).toBe(false);
  });

  it('exposes the current desktop chapter to assistive technology', async () => {
    const harness = await RouterTestingHarness.create('/');
    const nav = TestBed.inject(BookNavService);
    await harness.fixture.whenStable();
    nav.active.set(nav.indexOf('loadout'));
    harness.fixture.detectChanges();
    const current = harness.routeNativeElement!.querySelector(
      'nav[aria-label="Chapters"] [aria-current="location"]',
    );
    expect(current?.textContent).toContain('Loadout');
  });

  it('keeps all chapters available in the mobile selector', async () => {
    const harness = await RouterTestingHarness.create('/');
    harness.fixture.detectChanges();
    const selector = harness.routeNativeElement!.querySelector<HTMLSelectElement>(
      'select[aria-label="Choose chapter"]',
    );
    expect(selector).not.toBeNull();
    expect(Array.from(selector!.options, (option) => option.textContent?.trim())).toEqual([
      '00 — Cover',
      '01 — Profile',
      '02 — Loadout',
      '03 — Quests',
      '04 — Journey',
      '05 — Services',
      '06 — Contact',
    ]);
  });

  it('renumbers chapter choices when optional content is absent', async () => {
    const data = TestBed.inject(PortfolioDataService);
    data.projects.set([]);
    data.services.set([]);
    const harness = await RouterTestingHarness.create('/');
    harness.fixture.detectChanges();
    const selector = harness.routeNativeElement!.querySelector<HTMLSelectElement>(
      'select[aria-label="Choose chapter"]',
    )!;
    expect(Array.from(selector.options, (option) => option.textContent?.trim())).toEqual([
      '00 — Cover',
      '01 — Profile',
      '02 — Loadout',
      '03 — Journey',
      '04 — Contact',
    ]);
  });
});
