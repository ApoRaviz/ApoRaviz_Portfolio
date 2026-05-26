# 🤖 Master AI Prompt — Angular 19 Portfolio Website

คัดลอก prompt ด้านล่างนี้ไปใช้กับ AI (Claude / ChatGPT / Cursor / Copilot)

---

## PROMPT (ภาษาไทย + English Technical)

```
You are a senior Angular 19 developer and UI/UX engineer. Your task is to generate a complete, production-ready personal portfolio website. Every file must be fully implemented — no placeholder comments, no "TODO", no skeleton code. The project must run with zero errors on `ng serve`.

═══════════════════════════════════════
TECH STACK (STRICT)
═══════════════════════════════════════
- Angular 19 with Standalone Components (NO NgModule anywhere)
- Angular Signals for all state (signal(), computed(), effect())
- TypeScript 5+ strict mode
- Tailwind CSS v4 (utility-first, no custom CSS except CSS variables)
- Angular Router (hash-free, HTML5 mode)
- Angular Animations (@angular/animations)
- @angular/ssr for Server-Side Rendering
- Reactive Forms with Validators
- Angular Meta + Title services for SEO

═══════════════════════════════════════
DESIGN SYSTEM
═══════════════════════════════════════
Theme: Dark Premium Glassmorphism
Background: #0a0a0a (near black)
Cards: #111111
Border default: #1a1a1a
Primary accent: #FF6B00 (neon orange)
Primary light: #FF8C00
Text: #e5e5e5
Muted: #666666

Glow effects:
  - box-shadow: 0 0 20px rgba(255,107,0,0.4)  → hover on interactive elements
  - box-shadow: 0 0 60px rgba(255,107,0,0.15) → ambient section glow

Typography:
  - Headings: 'Space Grotesk', sans-serif (import from Google Fonts)
  - Body: 'DM Sans', sans-serif
  - Code/badges: 'JetBrains Mono', monospace

Tailwind custom config (tailwind.config.ts):
  colors: {
    primary: '#FF6B00',
    'primary-light': '#FF8C00',
    dark: '#0a0a0a',
    'dark-card': '#111111',
    'dark-border': '#1a1a1a',
  }
  boxShadow: {
    'glow': '0 0 20px rgba(255,107,0,0.4)',
    'glow-lg': '0 0 40px rgba(255,107,0,0.3)',
  }

═══════════════════════════════════════
ARCHITECTURE RULES
═══════════════════════════════════════
1. Every component = Standalone (standalone: true)
2. All mock/portfolio data lives in PortfolioDataService using Signals
3. Inject services with inject() function (not constructor injection)
4. Use @for / @if control flow syntax (Angular 17+), NOT *ngFor / *ngIf
5. Contact form: ReactiveFormsModule, FormBuilder, Validators
6. Scroll animations: IntersectionObserver API, CSS class toggling
7. Scroll spy: IntersectionObserver on each section → update active signal
8. Typewriter effect in Hero: setInterval + signal for displayed text
9. SSR-safe: wrap browser APIs (window, document) in isPlatformBrowser() checks

═══════════════════════════════════════
FILE STRUCTURE (generate ALL files)
═══════════════════════════════════════
src/
  index.html                          ← import Google Fonts here
  styles.css                          ← CSS variables + global utilities
  app/
    app.config.ts                     ← provideRouter, provideClientHydration, provideAnimations
    app.component.ts                  ← root component, imports all section components
    app.component.html                ← layout: navbar + sections + footer
    models/
      portfolio.models.ts             ← ALL TypeScript interfaces
    services/
      portfolio-data.service.ts       ← ALL mock data as signals
      theme.service.ts                ← scroll position, active section signals
    components/
      navbar/
        navbar.component.ts
        navbar.component.html
      hero/
        hero.component.ts
        hero.component.html
      about/
        about.component.ts
        about.component.html
      skills/
        skills.component.ts
        skills.component.html
      projects/
        projects.component.ts
        projects.component.html
      services/
        services.component.ts        ← NOTE: selector must be app-services-section to avoid conflicts
        services.component.html
      experience/
        experience.component.ts
        experience.component.html
      testimonials/
        testimonials.component.ts
        testimonials.component.html
      contact/
        contact.component.ts
        contact.component.html
      footer/
        footer.component.ts
        footer.component.html

═══════════════════════════════════════
SECTION SPECIFICATIONS
═══════════════════════════════════════

── NAVBAR ──────────────────────────────
• position: sticky top-0 z-50
• Default: transparent bg
• After scroll 50px: bg-dark/80 backdrop-blur-xl border-b border-dark-border
• Logo: "YN" or initials, orange, font-bold text-xl
• Nav links: Home · About · Skills · Projects · Services · Experience · Contact
• Active link: text-primary + underline with orange glow
• Scroll spy: each link activates when its section is 40% in viewport
• Mobile (<768px): hamburger icon → full-screen overlay menu
• Smooth scroll: all links use scrollIntoView({ behavior: 'smooth', block: 'start' })
• All logic in navbar.component.ts using Signals

── HERO ────────────────────────────────
• Full viewport height (min-h-screen)
• Background: dark grid SVG pattern + radial gradient orange glow centered behind heading
• "Available for work" badge: green pulse animation (animate-pulse), absolute top-right area
• Greeting: "Hello, I'm"
• Name: "[Your Name]" — large display font, white, text-5xl md:text-7xl
• Title: typewriter effect cycling through roles:
    ["Full-Stack Developer", "AI Automation Developer", "Angular Specialist"]
  → show orange cursor blinking at end
• Tagline paragraph: text-gray-400 text-lg max-w-2xl
• CTA buttons:
    - "View Projects" → bg-primary hover:bg-primary-light text-white shadow-glow
    - "Contact Me" → border border-primary text-primary hover:bg-primary/10
• Scroll indicator arrow (animate-bounce) at bottom center

── ABOUT ───────────────────────────────
• Section title pattern (reuse across ALL sections):
    <span class="text-primary">About</span> Me
  with orange underline decoration
• 2–3 professional paragraphs about experience
• Feature cards grid (2x2 on desktop, 1x4 on mobile):
    ⚡ Fast Delivery | 🧹 Clean Code | 📈 Scalable System | 🎯 Business-Focused
  Card style: bg-dark-card border border-dark-border rounded-xl p-6
  Hover: border-primary/50 shadow-glow transition-all duration-300
• "Download Resume" button with download icon

── SKILLS ──────────────────────────────
• 4 category groups, each with a label and badge row
• Badge style: bg-dark-card border border-primary/30 text-primary/90 rounded-full px-4 py-1.5 font-mono text-sm
• Hover: border-primary bg-primary/10 shadow-glow scale-105
• Animate badges in with stagger delay on scroll enter
• Categories:
    Frontend:    React, Next.js, Angular, TypeScript, Tailwind CSS
    Backend:     Node.js, Express, NestJS, REST API, Supabase, PostgreSQL
    AI/Auto:     OpenAI API, Claude API, n8n, Make, LINE Bot
    Tools:       GitHub, Vercel, Figma, Docker, Postman

── PROJECTS ────────────────────────────
• 6 cards in responsive grid (1→2→3 columns)
• Card image: div with gradient bg (from-orange-900/40 to-dark-card) + project name overlay
  with aspect-video ratio
• Card body: title, description (1–2 lines), tech badges, action buttons
• Tech badge style: text-xs bg-dark border border-dark-border rounded px-2 py-0.5
• Buttons: "Live Demo" (primary outline) + "GitHub" (ghost)
• Hover card: border-primary shadow-glow scale(1.02) transition-transform
• Data (in service):
    1. AI LINE OA Chatbot       — LINE Bot + OpenAI + Node.js
    2. Law Firm Management      — Next.js + PostgreSQL + Supabase
    3. E-commerce Dashboard     — Angular + Chart.js + REST API
    4. CRM System               — React + NestJS + PostgreSQL
    5. AI Content Generator     — OpenAI API + Next.js + Tailwind CSS
    6. Portfolio Website        — Angular + Tailwind CSS + Vercel

── SERVICES ────────────────────────────
• 7 glassmorphism cards (responsive grid)
• Card: bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl p-6
• Hover: border-primary/60 shadow-glow
• Each card: emoji icon (large, 2.5rem), service name, short description
• Services:
    🌐 Website / Landing Page  — Fast, SEO-optimized, conversion-focused sites
    💻 Web Application         — Full-featured apps with auth, dashboards, DB
    📊 Dashboard / Admin Panel — Data visualization and management systems
    🤖 AI Chatbot              — GPT-powered bots for customer service
    💬 LINE OA Integration     — Official LINE account automation & chatbot
    ⚙️ Automation Workflow     — n8n / Make flows to eliminate repetitive tasks
    🔌 API Integration         — Connect any service via REST or webhook

── EXPERIENCE ──────────────────────────
• Vertical timeline, centered on desktop
• Timeline connector: absolute left line, bg-gradient-to-b from-primary to-primary/0
• Each item: orange dot (w-4 h-4 rounded-full bg-primary shadow-glow) + card
• Card alternates left/right on desktop, always right on mobile
• 4 entries:
    2024–Present  Freelance Full-Stack Developer
    2023–2024     AI Automation Developer
    2022–2023     Web Application Developer
    2021–2022     LINE OA & Chatbot Developer
• Animate each card: slide in from left/right on scroll

── TESTIMONIALS ────────────────────────
• 3 cards in a responsive row
• Card: bg-dark-card border border-dark-border rounded-2xl p-8
• Top: large orange quote mark (")
• Body: review text in italic
• Bottom: avatar circle (gradient placeholder) + name + position
• Stars: 5 orange ★ icons
• Hover: border-primary/40 shadow-glow

── CONTACT ─────────────────────────────
• Two-column layout (form left, info right) → stacks on mobile
• Form fields: name, email, message (textarea)
• Input style:
    bg-dark-card border border-dark-border rounded-xl px-4 py-3 text-white w-full
    focus:outline-none focus:border-primary focus:shadow-glow transition-all
• Error messages: text-red-400 text-sm mt-1
• Submit button: full-width, bg-primary, disabled state with spinner
• On submit (mock): 1.5s delay → show toast "✅ Message sent successfully!" (top-right, auto-dismiss 3s)
• Right column info:
    📧 your@email.com
    💬 LINE: @yourline
    🐙 GitHub: github.com/yourname
    📘 Facebook: fb.com/yourname
  Each with icon, label, and a hover orange link style

── FOOTER ──────────────────────────────
• bg-dark border-t border-dark-border py-8
• Copyright: © 2025 [Your Name]. All rights reserved.
• Social icon row (GitHub, Facebook, LINE, Email) — orange hover
• "Back to top" button: circle, border-primary, bg-primary/10, arrow icon, hover shadow-glow
• Clicking back-to-top: window.scrollTo({ top: 0, behavior: 'smooth' })

═══════════════════════════════════════
ANIMATION SYSTEM (global)
═══════════════════════════════════════
In styles.css, define:

.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.reveal.animate-in {
  opacity: 1;
  transform: translateY(0);
}
.reveal-left  { transform: translateX(-40px); }
.reveal-right { transform: translateX(40px); }
.reveal-left.animate-in,
.reveal-right.animate-in { transform: translateX(0); }

Each section component uses IntersectionObserver in ngAfterViewInit()
to add 'animate-in' class when element enters viewport (threshold: 0.1).
Stagger children with CSS transition-delay: calc(var(--i) * 100ms).

═══════════════════════════════════════
MODELS (portfolio.models.ts)
═══════════════════════════════════════
export interface NavLink { id: string; label: string; }
export interface FeatureCard { icon: string; title: string; desc: string; }
export interface SkillGroup { category: string; skills: string[]; }
export interface Project {
  id: number; title: string; description: string;
  tech: string[]; liveUrl: string; githubUrl: string; featured: boolean;
}
export interface Service { icon: string; title: string; description: string; }
export interface Experience {
  period: string; role: string; company: string; description: string;
}
export interface Testimonial {
  name: string; position: string; company: string;
  review: string; avatar: string;
}
export interface ContactInfo { icon: string; label: string; value: string; url: string; }

═══════════════════════════════════════
IMPORTANT CONSTRAINTS
═══════════════════════════════════════
✅ DO:
  - Use @for, @if, @switch (Angular 17+ control flow)
  - inject() for dependency injection
  - signal() / computed() for reactive state
  - isPlatformBrowser() before using window/document
  - Provide every service with providedIn: 'root'
  - Keep every component file self-contained (styles inline via Tailwind)
  - Add section IDs: #home #about #skills #projects #services #experience #contact

❌ DO NOT:
  - Use *ngFor, *ngIf, *ngSwitch (deprecated syntax)
  - Use NgModule or app.module.ts
  - Leave any TODO, placeholder, or incomplete method
  - Use window/document directly (SSR will break)
  - Add unnecessary npm packages beyond what's listed
  - Use external CSS frameworks other than Tailwind
  - Generate partial code — every file must be 100% complete

═══════════════════════════════════════
OUTPUT FORMAT
═══════════════════════════════════════
For each file, output in this exact format:

### `path/to/file.ts`
```typescript
// full file content here
```

Generate files in this order:
1. package.json
2. tailwind.config.ts
3. angular.json (minimal, valid)
4. src/index.html
5. src/styles.css
6. src/app/models/portfolio.models.ts
7. src/app/services/portfolio-data.service.ts
8. src/app/services/theme.service.ts
9. src/app/app.config.ts
10. src/app/app.component.ts + .html
11–20. All 10 components (ts + html per component)

Do not stop until ALL files are complete. If you reach a token limit,
continue in the next response with "CONTINUING — [filename]".
```

---

## 🎯 Focused Sub-Prompts

ใช้ prompt เหล่านี้เมื่อต้องการสร้งทีละส่วน:

---

### A. Models & Services Only

```
Generate ONLY these 3 files for an Angular 19 standalone portfolio project.
Use Signals. No NgModule. Use inject(). Use @for/@if control flow.

Files needed:
1. src/app/models/portfolio.models.ts — full interfaces for NavLink, Project, Service, Experience, Testimonial, SkillGroup, FeatureCard, ContactInfo
2. src/app/services/portfolio-data.service.ts — all mock data as readonly signals with complete data for all sections
3. src/app/services/theme.service.ts — signals for: scrolled (boolean), activeSection (string), mobileMenuOpen (boolean)

Output each file completely. No TODOs.
```

---

### B. Navbar Component Only

```
Generate a complete Angular 19 standalone Navbar component.

Requirements:
- Sticky top, blur on scroll using HostListener
- Logo "YN" in orange (#FF6B00)
- Links: Home, About, Skills, Projects, Services, Experience, Contact
- Active link tracking with IntersectionObserver scroll spy
- Mobile hamburger menu with slide-down animation
- Smooth scroll on click
- Use Tailwind CSS only (dark theme, orange accent)
- Use Signals for scrolled, activeSection, mobileOpen state
- SSR-safe (isPlatformBrowser)
- Files: navbar.component.ts + navbar.component.html
- Output both files completely.
```

---

### C. Hero Component Only

```
Generate a complete Angular 19 standalone Hero component.

Requirements:
- Full viewport height, dark bg (#0a0a0a) with SVG grid pattern + orange radial glow
- "Available for work" badge with green pulse dot
- Typewriter effect cycling through 3 roles using setInterval + Signal
- Two CTA buttons: "View Projects" (solid orange) + "Contact Me" (outline orange)
- Scroll-down indicator arrow with bounce animation
- SSR-safe (no direct window/document)
- Tailwind CSS styling, orange glow effects
- Output: hero.component.ts + hero.component.html (complete, no TODOs)
```

---

### D. Contact Form Component Only

```
Generate a complete Angular 19 standalone Contact component.

Requirements:
- ReactiveFormsModule with FormBuilder
- Fields: name (required, minLength 2), email (required, email), message (required, minLength 10)
- Dark input style with orange focus glow
- Error messages shown on touch/blur
- Submit handler: mock delay 1.5s → set success signal → show toast "✅ Message sent successfully!"
- Toast auto-dismisses after 3 seconds
- Right column: contact info with icons (Email, LINE, GitHub, Facebook)
- Fully typed, no TODOs
- Output: contact.component.ts + contact.component.html
```

---

### E. Fix / Debug Prompt

```
I have an Angular 19 standalone portfolio project that has the following error:

[PASTE ERROR HERE]

The file with the issue is:

[PASTE FILE CONTENT HERE]

Rules:
- Standalone components only, no NgModule
- Use @for/@if not *ngFor/*ngIf
- Use inject() not constructor injection
- Wrap browser APIs in isPlatformBrowser()
- Angular 19 syntax only

Please fix the error and output the complete corrected file.
```

---

## 📋 Quick Reference — Angular 19 Patterns

```typescript
// ✅ Correct: Standalone component
@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `...`
})
export class HeroComponent {}

// ✅ Correct: inject() pattern
export class MyComponent {
  private data = inject(PortfolioDataService);
}

// ✅ Correct: New control flow
@for (item of items(); track item.id) { <div>{{ item.name }}</div> }
@if (isVisible()) { <p>Visible</p> }

// ✅ Correct: Signal state
count = signal(0);
double = computed(() => this.count() * 2);
increment() { this.count.update(v => v + 1); }

// ✅ Correct: SSR-safe browser API
constructor(
  @Inject(PLATFORM_ID) private platformId: Object
) {}
ngAfterViewInit() {
  if (isPlatformBrowser(this.platformId)) {
    window.scrollTo(...)
  }
}
```

---

*สร้างโดย AI Spec Generator · ใช้ร่วมกับ angular-portfolio-spec.md*
