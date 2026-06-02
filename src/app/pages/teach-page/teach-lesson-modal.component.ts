import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { TeachLesson } from './teach-lessons';

@Component({
  selector: 'app-teach-lesson-modal',
  templateUrl: './teach-lesson-modal.component.html',
})
export class TeachLessonModalComponent {
  @Input({ required: true }) lesson!: TeachLesson;
  @Output() closed = new EventEmitter<void>();

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closed.emit();
  }
}
