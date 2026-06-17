import { Component, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [NavbarComponent, RouterOutlet, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  // inject() เป็น pattern ใหม่ที่อ่านง่ายและไม่ต้องสร้าง constructor เพื่อรับ service
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  constructor() {
    // Title/Meta ทำงานได้ทั้ง SSR และ browser จึงตั้งค่า SEO ที่ root component ได้เลย
    this.title.setTitle('ApoRaviz | Tanonchai Promsiri | Senior Full Stack Developer');
    this.meta.updateTag({
      name: 'description',
      content:
        'Portfolio of ApoRaviz, the developer alias of Tanonchai Promsiri, a Senior Full Stack Developer focused on Angular, enterprise web apps, WMS/TMS systems, dashboards, reports, and practical AI-assisted workflows.',
    });
  }
}
