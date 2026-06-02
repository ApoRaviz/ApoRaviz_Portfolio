import { Component, inject, signal } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ThemeService } from '../../services/theme.service';
import { TeachLessonModalComponent } from './components/teach-lesson-modal/teach-lesson-modal.component';
import { TEACH_LESSONS, TeachLesson } from './teach-lessons';

@Component({
  selector: 'app-teach-page',
  imports: [TeachLessonModalComponent],
  templateUrl: './teach-page.component.html',
})
export class TeachPageComponent {
  readonly lessons = TEACH_LESSONS;
  readonly selectedLesson = signal<TeachLesson | null>(null);

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

  openLesson(lesson: TeachLesson): void {
    this.selectedLesson.set(lesson);
  }

  closeLesson(): void {
    this.selectedLesson.set(null);
  }
}
