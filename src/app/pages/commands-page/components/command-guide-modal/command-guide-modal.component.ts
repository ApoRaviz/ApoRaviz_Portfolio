import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { CommandGuide } from '../../commands-data';

@Component({
  selector: 'app-command-guide-modal',
  templateUrl: './command-guide-modal.component.html',
})
export class CommandGuideModalComponent {
  @Input({ required: true }) guide!: CommandGuide;
  @Output() closed = new EventEmitter<void>();

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closed.emit();
  }
}
