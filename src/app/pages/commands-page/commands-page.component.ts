import { Component, inject, signal } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ThemeService } from '../../services/theme.service';
import { CommandGuideModalComponent } from './components/command-guide-modal/command-guide-modal.component';
import { COMMAND_GUIDES, CommandGuide } from './commands-data';

@Component({
  selector: 'app-commands-page',
  imports: [CommandGuideModalComponent],
  templateUrl: './commands-page.component.html',
})
export class CommandsPageComponent {
  readonly guides = COMMAND_GUIDES;
  readonly selectedGuide = signal<CommandGuide | null>(null);

  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly theme = inject(ThemeService);

  constructor() {
    this.theme.setActiveSection('commands');
    this.title.setTitle('Commands | ApoRaviz');
    this.meta.updateTag({
      name: 'description',
      content: 'Command reference for the ApoRaviz portfolio project, covering setup, development server, verification, Git, troubleshooting, and CI/CD.',
    });
  }

  openGuide(guide: CommandGuide): void {
    this.selectedGuide.set(guide);
  }

  closeGuide(): void {
    this.selectedGuide.set(null);
  }
}
