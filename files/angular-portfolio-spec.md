# 🚀 Angular 19 Personal Portfolio — Production-Ready Spec

> **Project**: Personal Portfolio Website  
> **Stack**: Angular 19 · TypeScript 5+ · Tailwind CSS v4 · SSR  
> **Theme**: Dark Premium · Glassmorphism · Orange Neon (#FF6B00)

---

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── navbar/
│   │   │   │   ├── navbar.component.ts
│   │   │   │   └── navbar.component.html
│   │   │   ├── hero/
│   │   │   │   ├── hero.component.ts
│   │   │   │   └── hero.component.html
│   │   │   ├── about/
│   │   │   │   ├── about.component.ts
│   │   │   │   └── about.component.html
│   │   │   ├── skills/
│   │   │   │   ├── skills.component.ts
│   │   │   │   └── skills.component.html
│   │   │   ├── projects/
│   │   │   │   ├── projects.component.ts
│   │   │   │   └── projects.component.html
│   │   │   ├── services/
│   │   │   │   ├── services.component.ts
│   │   │   │   └── services.component.html
│   │   │   ├── experience/
│   │   │   │   ├── experience.component.ts
│   │   │   │   └── experience.component.html
│   │   │   ├── testimonials/
│   │   │   │   ├── testimonials.component.ts
│   │   │   │   └── testimonials.component.html
│   │   │   ├── contact/
│   │   │   │   ├── contact.component.ts
│   │   │   │   └── contact.component.html
│   │   │   └── footer/
│   │   │       ├── footer.component.ts
│   │   │       └── footer.component.html
│   │   ├── models/
│   │   │   └── portfolio.models.ts
│   │   ├── services/
│   │   │   ├── portfolio-data.service.ts
│   │   │   └── theme.service.ts
│   │   ├── app.component.ts
│   │   ├── app.component.html
│   │   └── app.config.ts
│   ├── styles.css
│   └── index.html
├── tailwind.config.ts
├── angular.json
└── package.json
```

---

## 🎨 Design System

### Color Palette

| Token | Hex | Usage |
|---|---|---|
| `--color-primary` | `#FF6B00` | CTA, Glow, Active |
| `--color-primary-light` | `#FF8C00` | Hover, Gradient end |
| `--color-dark` | `#0a0a0a` | Background base |
| `--color-dark-card` | `#111111` | Cards, Panels |
| `--color-dark-border` | `#1a1a1a` | Borders default |
| `--color-text` | `#e5e5e5` | Body text |
| `--color-muted` | `#666666` | Captions, hints |

### Typography

- **Display / Headings**: `Space Grotesk` or `Syne`
- **Body**: `Inter` or `DM Sans`
- **Monospace**: `JetBrains Mono`

### Tailwind Config (`tailwind.config.ts`)

```ts
import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#FF6B00',
        'primary-light': '#FF8C00',
        dark: '#0a0a0a',
        'dark-card': '#111111',
        'dark-border': '#1a1a1a',
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'glow-orange': '0 0 20px rgba(255, 107, 0, 0.4)',
        'glow-orange-lg': '0 0 40px rgba(255, 107, 0, 0.3)',
      },
    },
  },
  plugins: [],
} satisfies Config;
```

---

## 🧩 Sections & Requirements

### 1. Navbar

- Sticky top-0 with `backdrop-blur` when scrolled
- Logo: initials in orange, bold
- Menu links: Home · About · Skills · Projects · Services · Experience · Contact
- Active link: orange underline + glow
- Mobile: hamburger → slide-down menu
- Smooth scroll via `scrollIntoView({ behavior: 'smooth' })`
- Scroll Spy: highlight link based on current viewport section

### 2. Hero Section

- **Name**: `[Your Name]`
- **Title**: `Full-Stack Developer & AI Automation Developer`  
- **Tagline**: _"I build modern web apps, AI tools, and automation systems that help businesses grow."_
- **CTA Buttons**:
  - `View Projects` — solid orange, glow shadow
  - `Contact Me` — outline orange
- **Background**: dark grid pattern + radial orange glow behind name
- **Badge**: `● Available for work` with animated green pulse dot
- **Typewriter effect** on the title text
- **Dot grid** or particle effect (CSS only or canvas)

### 3. About Section

- 2–3 professional paragraphs
- Expertise: Web App · Dashboard · AI Automation · LINE OA · CRM · Backend
- **Feature Cards (4)**:

| Icon | Title | Description |
|---|---|---|
| ⚡ | Fast Delivery | Ship production-ready code quickly |
| 🧹 | Clean Code | Maintainable, documented, and tested |
| 📈 | Scalable System | Architecture that grows with your business |
| 🎯 | Business-Focused | Solutions that solve real problems |

- Cards: dark bg + orange border (faint) + hover glow
- Button: `Download Resume` (href="#")

### 4. Skills Section

Displayed as badge/pill groups, split into 4 categories:

| Category | Skills |
|---|---|
| **Frontend** | React · Next.js · Angular · TypeScript · Tailwind CSS |
| **Backend** | Node.js · Express · NestJS · REST API · Supabase · PostgreSQL |
| **AI / Automation** | OpenAI API · Claude API · n8n · Make · LINE Bot |
| **Tools** | GitHub · Vercel · Figma · Docker · Postman |

- Badges: orange text on dark bg with orange border
- Hover: glow + scale(1.05)

### 5. Projects Section (6 Cards)

| # | Name | Tech |
|---|---|---|
| 1 | AI LINE OA Chatbot | LINE Bot · OpenAI · Node.js |
| 2 | Law Firm Management System | Next.js · PostgreSQL · Supabase |
| 3 | E-commerce Dashboard | Angular · Chart.js · REST API |
| 4 | CRM System | React · NestJS · PostgreSQL |
| 5 | AI Content Generator | OpenAI API · Next.js · Tailwind |
| 6 | Portfolio Website | Angular · Tailwind · Vercel |

- **Card contents**: gradient placeholder image · title · 1–2 line description · tech badges · `Live Demo` + `GitHub` buttons
- **Hover**: orange border glow + `scale(1.02)` transition

### 6. Services Section (7 Cards)

| Icon | Service |
|---|---|
| 🌐 | Website / Landing Page |
| 💻 | Web Application |
| 📊 | Dashboard / Admin Panel |
| 🤖 | AI Chatbot |
| 💬 | LINE OA Integration |
| ⚙️ | Automation Workflow |
| 🔌 | API Integration |

- Glassmorphism cards: `bg-white/5 backdrop-blur border border-orange-900/30`
- Hover: bright orange border

### 7. Experience Timeline (4 entries)

Vertical timeline, orange connecting line + orange dot per entry:

| Period | Role |
|---|---|
| 2024–Present | Freelance Full-Stack Developer |
| 2023–2024 | AI Automation Developer |
| 2022–2023 | Web Application Developer |
| 2021–2022 | LINE OA & Chatbot Developer |

### 8. Testimonials (3 Cards)

- Clients: Thai SME · Tech Startup · Law Firm
- Each card: avatar placeholder · name · position · review text · ⭐⭐⭐⭐⭐ (orange stars)

### 9. Contact Section

- **Reactive Form**: `name` · `email` · `message`
- Validators: `required`, `email`, minLength
- Submit: show toast `✅ Message sent successfully!` (mock)
- Input style: dark bg + orange focus ring glow
- Contact links: Email · LINE · GitHub · Facebook

### 10. Footer

- Copyright line
- Social icons row
- "Back to top" button (orange)

---

## ⚙️ Functional Requirements

| Feature | Implementation |
|---|---|
| Standalone Components | No `NgModule` anywhere |
| State Management | Angular Signals (`signal()`, `computed()`) |
| Data Layer | All mock data in `PortfolioDataService` |
| Forms | `ReactiveFormsModule` + `Validators` |
| Dark Mode | Default dark, no toggle needed |
| SEO | `Meta` + `Title` services per section |
| Scroll Spy | `IntersectionObserver` → active nav link |
| Scroll Animations | `IntersectionObserver` → fade/slide-in on enter |
| Responsive | Mobile-first, all breakpoints |
| SSR | `@angular/ssr` configured in `app.config.ts` |
| Zero Errors | Must run cleanly with `ng serve` |

---

## 📦 Installation & Setup

```bash
# 1. Install Angular CLI
npm install -g @angular/cli@19

# 2. Create project
ng new portfolio --standalone --routing --style=css

# 3. Install dependencies
npm install tailwindcss @tailwindcss/forms
npm install @angular/ssr

# 4. Run dev server
ng serve --open
```

## 🏗️ Build

```bash
ng build --configuration production
```

Output goes to `dist/portfolio/browser/` (static) and `dist/portfolio/server/` (SSR).

## 🚀 Deploy on Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

**`vercel.json`** (for SSR support):
```json
{
  "builds": [
    {
      "src": "dist/portfolio/server/server.mjs",
      "use": "@vercel/node"
    },
    {
      "src": "dist/portfolio/browser/**",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/(.*\\.(js|css|ico|png|jpg|svg|woff2?))",
      "dest": "/dist/portfolio/browser/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/dist/portfolio/server/server.mjs"
    }
  ]
}
```

**Custom Domain**: Vercel Dashboard → Project → Settings → Domains → Add your domain → update DNS.

---

## 🧠 Angular Patterns Reference

### Signal-based component example

```ts
// portfolio-data.service.ts
import { Injectable, signal, computed } from '@angular/core';
import { Project } from '../models/portfolio.models';

@Injectable({ providedIn: 'root' })
export class PortfolioDataService {
  private _projects = signal<Project[]>([...]);
  readonly projects = this._projects.asReadonly();
  readonly featuredProjects = computed(() =>
    this._projects().filter(p => p.featured)
  );
}
```

### Standalone component example

```ts
@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './hero.component.html',
})
export class HeroComponent {
  private data = inject(PortfolioDataService);
  hero = this.data.hero;
}
```

### Intersection Observer scroll animation

```ts
ngAfterViewInit() {
  const observer = new IntersectionObserver(
    (entries) => entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('animate-in');
    }),
    { threshold: 0.15 }
  );
  this.el.nativeElement.querySelectorAll('.reveal')
    .forEach((el: Element) => observer.observe(el));
}
```

---

## ✅ Checklist Before Shipping

- [ ] `ng serve` → zero errors, zero warnings
- [ ] All 10 sections render correctly
- [ ] Mobile breakpoints tested (375px, 768px, 1280px)
- [ ] Contact form validates and shows toast
- [ ] Navbar scroll spy works on all sections
- [ ] Animations trigger on scroll
- [ ] `ng build --configuration production` succeeds
- [ ] Lighthouse score ≥ 90 (Performance, SEO, Accessibility)
- [ ] SSR renders correct `<title>` and meta tags

---

*Generated spec — replace `[Your Name]`, resume link, and social URLs before deploying.*
