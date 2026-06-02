import { Component, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ThemeService } from '../../services/theme.service';

interface TeachLesson {
  title: string;
  href: string;
  topics: string[];
}

@Component({
  selector: 'app-teach-page',
  templateUrl: './teach-page.component.html',
})
export class TeachPageComponent {
  readonly lessons: TeachLesson[] = [
    {
      title: 'Angular Reactive และ Signals',
      href: 'docs/teach/01-angular-reactive-and-signals.md',
      topics: ['signal()', 'set() and update()', 'computed()', 'effect()', 'ThemeService examples'],
    },
    {
      title: 'Services และ Dependency Injection',
      href: 'docs/teach/02-services-and-dependency-injection.md',
      topics: ['PortfolioDataService', 'ThemeService', 'inject()', 'dependency injection', 'SSR browser guards'],
    },
    {
      title: 'Angular App Config และ SSR',
      href: 'docs/teach/03-angular-app-config-and-ssr.md',
      topics: ['app.config.ts', 'provideRouter()', 'hydration', 'animations', 'prerender vs hydration'],
    },
    {
      title: 'Redesign แนว RPG Profile',
      href: 'docs/teach/04-redesign-rpg-profile.md',
      topics: ['design direction', 'copy tone', 'RPG naming', 'text badges', 'reduced motion'],
    },
    {
      title: 'Resume Data, Hero Background และ Color',
      href: 'docs/teach/05-resume-data-and-hero-background.md',
      topics: ['resume data source', 'hero structure', 'visual layers', 'color depth', 'PortfolioDataService'],
    },
    {
      title: 'Browser APIs, IntersectionObserver, SSR และ Test',
      href: 'docs/teach/06-browser-apis-intersection-observer-ssr-test.md',
      topics: ['Browser APIs', 'IntersectionObserver', 'threshold', 'rootMargin', 'test environment'],
    },
    {
      title: 'CI/CD ด้วย GitHub Actions',
      href: 'docs/teach/07-cicd-github-actions.md',
      topics: ['CI/CD', 'GitHub Actions', 'npm ci', 'GitHub Pages base href', 'deploy settings'],
    },
  ];

  readonly glossary = [
    ['signal', 'กล่อง state แบบ reactive ที่ทำให้ UI ตามค่าที่เปลี่ยนทัน'],
    ['computed', 'ค่าที่คำนวณจาก signal ตัวอื่น'],
    ['effect', 'งานข้างเคียงที่รันเมื่อ signal เปลี่ยน'],
    ['service', 'ที่เก็บ logic หรือ data กลางของแอป'],
    ['inject', 'วิธีขอใช้ service จาก Angular'],
    ['hydration', 'Angular รับช่วง HTML ที่ server สร้างไว้'],
    ['prerender', 'การสร้าง HTML static ตอน build'],
    ['IntersectionObserver', 'Browser API สำหรับดูว่า element เข้า viewport หรือยัง'],
  ];

  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly theme = inject(ThemeService);

  constructor() {
    this.theme.setActiveSection('teach');
    this.title.setTitle('Teach | ApoRaviz');
    this.meta.updateTag({
      name: 'description',
      content: 'Learning notes for the ApoRaviz portfolio project, covering Angular signals, services, SSR, browser APIs, and CI/CD.',
    });
  }
}
