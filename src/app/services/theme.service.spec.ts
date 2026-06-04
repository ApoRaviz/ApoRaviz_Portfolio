import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

type ObserverCallback = (entries: IntersectionObserverEntry[]) => void;

class MockIntersectionObserver {
  static instances: MockIntersectionObserver[] = [];

  readonly observedElements: Element[] = [];

  constructor(private readonly callback: ObserverCallback) {
    MockIntersectionObserver.instances.push(this);
  }

  observe(element: Element): void {
    this.observedElements.push(element);
  }

  disconnect(): void {
    this.observedElements.length = 0;
  }

  unobserve(element: Element): void {
    const index = this.observedElements.indexOf(element);
    if (index >= 0) {
      this.observedElements.splice(index, 1);
    }
  }

  emit(entries: Partial<IntersectionObserverEntry>[]): void {
    this.callback(entries as IntersectionObserverEntry[]);
  }
}

describe('ThemeService', () => {
  const originalIntersectionObserver = globalThis.IntersectionObserver;
  const originalScrollIntoView = HTMLElement.prototype.scrollIntoView;

  beforeEach(() => {
    // fake timers ทำให้ test คุม fallback timeout ของ active-section lock ได้เอง ไม่ต้องรอเวลาจริง
    vi.useFakeTimers();
    MockIntersectionObserver.instances = [];
    globalThis.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;
    HTMLElement.prototype.scrollIntoView = vi.fn();

    document.body.innerHTML = `
      <section id="home"></section>
      <section id="about"></section>
      <section id="skills"></section>
      <section id="projects"></section>
    `;

    TestBed.configureTestingModule({});
  });

  afterEach(() => {
    vi.useRealTimers();
    globalThis.IntersectionObserver = originalIntersectionObserver;
    HTMLElement.prototype.scrollIntoView = originalScrollIntoView;
    document.body.innerHTML = '';
  });

  it('keeps the clicked nav section active while smooth scrolling past intermediate sections', () => {
    const theme = TestBed.inject(ThemeService);

    theme.observeSections(['home', 'about', 'skills', 'projects']);
    theme.scrollToSection('projects');

    expect(theme.activeSection()).toBe('projects');

    const sectionObserver = MockIntersectionObserver.instances[0];
    const about = document.getElementById('about');
    const projects = document.getElementById('projects');

    expect(sectionObserver).toBeTruthy();
    expect(about).toBeTruthy();
    expect(projects).toBeTruthy();

    // ระหว่าง smooth scroll ผ่าน Profile/About observer อาจเห็น section กลางทาง
    // แต่ active link ต้องยังค้างที่ Projects เพราะผู้ใช้เพิ่งกดเมนูเป้าหมายนี้
    sectionObserver.emit([{ target: about!, isIntersecting: true, intersectionRatio: 0.8 }]);
    expect(theme.activeSection()).toBe('projects');

    sectionObserver.emit([{ target: projects!, isIntersecting: true, intersectionRatio: 0.8 }]);
    expect(theme.activeSection()).toBe('projects');

    // หลังถึง section เป้าหมายแล้ว lock ถูกปลด scroll spy จึงกลับมาทำงานปกติได้
    sectionObserver.emit([{ target: about!, isIntersecting: true, intersectionRatio: 0.8 }]);
    expect(theme.activeSection()).toBe('about');
  });
});
