import { AfterViewInit, Component, inject } from '@angular/core';
import { AboutComponent } from '../../components/about/about.component';
import { ContactComponent } from '../../components/contact/contact.component';
import { ExperienceComponent } from '../../components/experience/experience.component';
import { HeroComponent } from '../../components/hero/hero.component';
import { ProjectsComponent } from '../../components/projects/projects.component';
import { ServicesComponent } from '../../components/services/services.component';
import { SkillsComponent } from '../../components/skills/skills.component';
import { TestimonialsComponent } from '../../components/testimonials/testimonials.component';
import { PortfolioDataService } from '../../services/portfolio-data.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-home-page',
  imports: [
    HeroComponent,
    AboutComponent,
    SkillsComponent,
    ProjectsComponent,
    ServicesComponent,
    ExperienceComponent,
    TestimonialsComponent,
    ContactComponent,
  ],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent implements AfterViewInit {
  private readonly data = inject(PortfolioDataService);
  private readonly theme = inject(ThemeService);

  ngAfterViewInit(): void {
    this.theme.setActiveSection('home');
    this.theme.observeSections(this.data.navLinks().map((link) => link.id));
  }
}
