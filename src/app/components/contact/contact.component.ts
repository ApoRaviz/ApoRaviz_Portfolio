import { Component, inject } from '@angular/core';
import { PortfolioDataService } from '../../services/portfolio-data.service';
import { BookNavService } from '../../services/book-nav.service';
import { RevealDirective } from '../../directives/reveal.directive';

/**
 * บท 07 · Contact / Epilogue — การ์ดช่องทางติดต่อ + ฟอร์มปิดเล่ม
 * ฟอร์มส่งผ่าน mailto ตาม design (ไม่พึ่ง backend ให้เหมาะกับ static hosting/GitHub Pages)
 */
@Component({
  selector: 'app-contact',
  imports: [RevealDirective],
  templateUrl: './contact.component.html',
  host: {
    'data-section': '',
    class:
      'relative flex min-h-screen flex-col justify-center py-[120px] pl-[clamp(96px,7vw,112px)] pr-[min(5vw,58px)] max-md:pb-[104px] max-md:pl-[22px] [scroll-snap-align:start]',
  },
})
export class ContactComponent {
  readonly data = inject(PortfolioDataService);
  readonly nav = inject(BookNavService);

  submit(event: Event): void {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const name = encodeURIComponent((form.elements.namedItem('name') as HTMLInputElement).value);
    const email = encodeURIComponent((form.elements.namedItem('email') as HTMLInputElement).value);
    const msg = encodeURIComponent((form.elements.namedItem('msg') as HTMLTextAreaElement).value);
    const to = this.data.profile().email;
    window.location.href = `mailto:${to}?subject=A%20new%20page%20from%20${name}&body=${msg}%0A%0AFrom:%20${name}%20(${email})`;
  }
}
