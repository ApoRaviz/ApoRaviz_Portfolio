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
    this.title.setTitle('ApoRaviz | Gamer-Minded Developer');
    this.meta.updateTag({
      name: 'description',
      content:
        'A personal portfolio of Tanonchai Promsiri, a gamer-minded developer who builds web apps, bots, and useful automation tools.',
    });
  }
}
