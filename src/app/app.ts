import { Component, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeroComponent } from './components/hero/hero.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ServicesComponent } from './components/services/services.component';
import { SkillsComponent } from './components/skills/skills.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';

@Component({
  selector: 'app-root',
  imports: [
    NavbarComponent,
    HeroComponent,
    AboutComponent,
    SkillsComponent,
    ProjectsComponent,
    ServicesComponent,
    ExperienceComponent,
    TestimonialsComponent,
    ContactComponent,
    FooterComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  // inject() เป็น pattern ใหม่ที่อ่านง่ายและไม่ต้องสร้าง constructor เพื่อรับ service
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  constructor() {
    // Title/Meta ทำงานได้ทั้ง SSR และ browser จึงตั้งค่า SEO ที่ root component ได้เลย
    this.title.setTitle('Tanonchai Promsiri | Full-Stack Developer & AI Automation Developer');
    this.meta.updateTag({
      name: 'description',
      content:
        'Portfolio of Tanonchai Promsiri, a Full-Stack Developer and AI Automation Developer building modern web apps, AI tools, and automation systems.',
    });
  }
}
