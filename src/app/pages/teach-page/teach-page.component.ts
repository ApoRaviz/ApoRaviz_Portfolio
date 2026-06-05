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
    ['Design direction', 'เข็มทิศของตัวตน สี copy และ mood ของ Portfolio'],
    ['Source data', 'จุดที่ข้อมูลจริงอยู่ เช่น PortfolioDataService'],
    ['Fallback', 'ทางสำรองเมื่อ Angular handler หรือ timing ยังไม่พร้อม'],
    ['Route queue', 'การเก็บ section id ไว้ก่อน navigate กลับหน้า Home'],
    ['Feature-local', 'component ที่เป็นของ page เดียวและควรอยู่ใต้ page owner'],
    ['sourcePath', 'ตัวชี้ว่า lesson หรือ command อ้างอิง markdown ไฟล์ไหน'],
    ['Purpose', 'คำอธิบายว่าคำสั่งหรือ flow นั้นใช้ทำอะไร'],
    ['Caution', 'ข้อควรระวังเมื่อใช้คำสั่งหรือแก้ flow นั้น'],
  ];

  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly theme = inject(ThemeService);

  constructor() {
    this.theme.setActiveSection('teach');
    this.title.setTitle('Teach | ApoRaviz');
    this.meta.updateTag({
      name: 'description',
      content: 'Project-specific learning notes for the ApoRaviz portfolio, covering design direction, hero data, navigation flow, and Teach/Commands page structure.',
    });
  }

  openLesson(lesson: TeachLesson): void {
    this.selectedLesson.set(lesson);
  }

  closeLesson(): void {
    this.selectedLesson.set(null);
  }
}
