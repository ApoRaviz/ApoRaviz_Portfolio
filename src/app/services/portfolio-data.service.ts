import { computed, Injectable, signal } from '@angular/core';
import {
  ContactInfo,
  Experience,
  FeatureCard,
  NavLink,
  Project,
  Service,
  SkillGroup,
  Testimonial,
} from '../models/portfolio.models';

@Injectable({
  // root ทำให้ข้อมูล portfolio ชุดเดียวถูกแชร์ให้ทุก component โดยไม่ต้องส่ง Input ต่อกันหลายชั้น
  providedIn: 'root',
})
export class PortfolioDataService {
  // signal เก็บข้อมูลแบบ reactive: component อ่านด้วย navLinks() และ Angular จะ track การเปลี่ยนแปลงให้
  // navLinks ใช้สร้างเมนูและใช้เป็น source เดียวกันสำหรับ scroll spy เพื่อลดข้อมูลซ้ำ
  readonly navLinks = signal<NavLink[]>([
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'Profile' },
    { id: 'skills', label: 'Loadout' },
    { id: 'projects', label: 'Quests' },
    { id: 'services', label: 'Help' },
    { id: 'experience', label: 'Journey' },
    { id: 'contact', label: 'Contact' },
  ]);

  // profile รวมข้อมูลเจ้าของเว็บไว้ที่เดียว ถ้าจะเปลี่ยนชื่อ/logo/email จะแก้จาก service นี้เป็นหลัก
  readonly profile = signal({
    name: 'Tanonchai Promsiri',
    initials: 'AP',
    logoUrl: 'aporaviz-logo.png',
    role: 'Angular Developer focused on practical web apps and future AI-powered tools',
    email: 'Tanonchai.pr@hotmail.com',
    phone: '081-436-8601',
    line: '',
    github: 'github.com/ApoRaviz',
    facebook: '',
    resumeUrl: 'resume.pdf',
    resumePageUrl: 'resume.png',
  });

  // roles ใช้กับ typewriter effect ใน Hero แยกออกมาเพื่อเพิ่ม/ลด role ได้โดยไม่แตะ component logic
  readonly roles = signal(['Angular Developer', 'Frontend Builder', 'AI-Curious Learner']);

  // hero รวม copy ทั้งหมดของ Hero section ไว้ที่เดียว เพื่อแก้ข้อความได้จาก service โดยไม่ต้องเข้าไปแก้ HTML
  readonly hero = signal({
    availability: 'Open to Angular opportunities',
    kicker: 'Player Intro',
    intro:
      'I am looking for Angular work where I can build useful web screens, learn with modern teams, and grow toward AI-powered tools in the future.',
    tags: ['Gamer', 'Angular', 'AI Curious', 'Team Learner'],
    directionKicker: 'Current Direction',
    directionTitle: 'Angular first, AI ready',
    directionText:
      'Seeking frontend work where Angular, TypeScript, clean UI, and a learning mindset can create useful tools for real teams.',
    stack: 'Angular · TypeScript · Web Apps · AI Learning · Team Growth',
  });

  // about รวม copy ของ About section: คำนำ, ย่อหน้าแนะนำตัว และ list สิ่งที่กำลังมองหา
  readonly about = signal({
    lead:
      'A practical developer profile for Angular work, future AI learning, and teams that value clear communication.',
    bio: [
      "I'm Tanonchai Promsiri, a programmer who wants to focus more deeply on Angular and practical frontend work for real business screens.",
      'I enjoy building web apps, dashboards, and useful internal tools, and I want to keep learning how AI can make future workflows smarter.',
      'I am ready to work with modern teams, including younger developers, share what I know, learn what I do not, and keep improving project by project.',
    ],
    lookingFor: [
      'Angular / frontend developer work with real product screens.',
      'A team that values readable code, patient communication, and steady learning.',
      'Opportunities to grow toward AI-assisted tools and smarter automation.',
    ],
  });

  // contactIntro คือข้อความนำใน Contact section แยกออกมาให้แก้ทีเดียวเหมือน copy อื่น
  readonly contactIntro = signal(
    'Looking for Angular work, frontend projects, or future AI-powered web tools. Send a message and we can talk through the next step.',
  );

  // features คือการ์ดจุดเด่นใน About section เก็บเป็น data เพื่อให้ template ใช้ @for render ซ้ำได้
  readonly features = signal<FeatureCard[]>([
    {
      icon: 'FUN',
      title: 'Open to Younger Teams',
      desc: 'I enjoy exchanging ideas with modern teams, learning from younger developers, and keeping communication friendly.',
    },
    {
      icon: 'CODE',
      title: 'Angular Focus',
      desc: 'I want to grow deeper in Angular, TypeScript, reusable components, forms, routing, SSR, and practical frontend architecture.',
    },
    {
      icon: 'CARE',
      title: 'AI Future Mind',
      desc: 'I am interested in AI-assisted workflows and web tools that combine useful UX with smarter automation.',
    },
    {
      icon: 'PLAY',
      title: 'Steady Learner',
      desc: 'Games taught me to learn patterns, ask better questions, and keep improving after every round.',
    },
  ]);

  // Skills ใช้ badge เท่านั้น ไม่มี progress bar หรือค่าพลังตามที่ผู้ใช้ต้องการ
  // การเก็บเป็นกลุ่มช่วยให้เพิ่ม skill category ใหม่ได้ง่าย เช่น Mobile, Cloud, DevOps
  readonly skillGroups = signal<SkillGroup[]>([
    {
      category: 'Frontend',
      skills: ['Angular', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Ionic', 'PrimeNG', 'Signals'],
    },
    {
      category: 'Backend',
      skills: ['C#', 'ASP.NET Core', '.NET Core', 'Node.js', 'REST API', 'API Integration', 'SFTP/API'],
    },
    {
      category: 'Database / Reports',
      skills: ['SQL Server', 'MySQL', 'MongoDB', 'Stored Procedures', 'SSRS', 'Crystal Reports'],
    },
    {
      category: 'DevOps / Tools',
      skills: ['Git', 'GitHub', 'GitHub Actions', 'IIS Server', 'Jira', 'VS Code', 'Postman', 'Figma'],
    },
    {
      category: 'Practices',
      skills: ['Business Analysis', 'System Design', 'Auth', 'Keycloak', 'CI/CD', 'Documentation', 'AI Workflow'],
    },
  ]);

  // projects เป็นข้อมูลของ project cards ทั้งหมด แยกจาก HTML เพื่อให้แก้ content โดยไม่แก้ layout
  readonly projects = signal<Project[]>([
    {
      id: 1,
      category: 'Main Quest',
      title: 'MooPing Reward',
      description:
        'Angular reward web app for a real Moo Ping shop concept, with POS confirmation, saved rewards, display screen, and LINE OA mock flow.',
      highlight:
        'Shows practical state management, multi-screen flow, customer reward logic, and a business idea that can grow into a real shop tool.',
      tech: ['Angular 22', 'Signals', 'Tailwind CSS', 'GitHub Pages'],
      imageUrl: 'project-screenshots/mooping.png',
      liveUrl: 'https://aporaviz.github.io/ApoRaviz_Mooping/',
      githubUrl: 'https://github.com/ApoRaviz/ApoRaviz_Mooping',
      featured: true,
    },
    {
      id: 2,
      category: 'Knowledge Base',
      title: 'ApoRaviz Workspace Docs',
      description:
        'Central learning hub for ApoRaviz projects, with Thai-first Angular/Tailwind lessons, workspace rules, project startup guides, and AI update rules.',
      highlight:
        'Turns chat knowledge into a reusable asset, with project rules, command references, and linked learning notes for future ApoRaviz builds.',
      tech: ['VitePress', 'Markdown', 'GitHub Actions', 'GitHub Pages'],
      imageUrl: 'project-screenshots/workspace-docs.png',
      liveUrl: 'https://aporaviz.github.io/ApoRaviz_Workspace_Docs/',
      githubUrl: 'https://github.com/ApoRaviz/ApoRaviz_Workspace_Docs',
      featured: true,
    },
    {
      id: 3,
      category: 'Profile Hub',
      title: 'ApoRaviz Portfolio',
      description: 'Angular portfolio and showcase hub for profile, skills, selected projects, services, experience, and contact links.',
      highlight:
        'Uses editable portfolio data, standalone Angular components, SSR-friendly structure, and GitHub Pages deployment.',
      tech: ['Angular 22', 'Tailwind CSS', 'SSR', 'GitHub Pages'],
      liveUrl: 'https://aporaviz.github.io/ApoRaviz_Portfolio/',
      githubUrl: 'https://github.com/ApoRaviz/ApoRaviz_Portfolio',
      featured: true,
      isDemo: true,
    },
    {
      id: 4,
      category: 'Future Quest',
      title: 'AI LINE OA Chatbot',
      description: 'Customer service chatbot that combines LINE messaging, AI responses, and backend automation.',
      highlight: 'Reserved concept for a future real chatbot build with LINE webhook, prompt rules, and backend workflow automation.',
      tech: ['LINE Bot', 'OpenAI', 'Node.js'],
      liveUrl: '#',
      githubUrl: '#',
      featured: true,
      isDemo: true,
    },
    {
      id: 5,
      category: 'Future Quest',
      title: 'Law Firm Management System',
      description: 'Case, client, and document workflow system for legal operations.',
      highlight: 'Reserved concept for future business workflow screens, role-based actions, and document tracking.',
      tech: ['Next.js', 'PostgreSQL', 'Supabase'],
      liveUrl: '#',
      githubUrl: '#',
      featured: true,
      isDemo: true,
    },
    {
      id: 6,
      category: 'Future Quest',
      title: 'E-commerce Dashboard',
      description: 'Analytics dashboard for sales, inventory, orders, and performance reporting.',
      highlight: 'Reserved concept for future chart, table, and reporting practice.',
      tech: ['Angular', 'Chart.js', 'REST API'],
      liveUrl: '#',
      githubUrl: '#',
      featured: false,
      isDemo: true,
    },
    {
      id: 7,
      category: 'Future Quest',
      title: 'CRM System',
      description: 'Customer pipeline, task tracking, and internal collaboration system.',
      highlight: 'Reserved concept for future customer workflow and team operation screens.',
      tech: ['React', 'NestJS', 'PostgreSQL'],
      liveUrl: '#',
      githubUrl: '#',
      featured: false,
      isDemo: true,
    },
    {
      id: 8,
      category: 'Future Quest',
      title: 'AI Content Generator',
      description: 'Marketing content tool that helps teams draft posts, captions, and campaign ideas.',
      highlight: 'Reserved concept for future AI-assisted writing flows and prompt result review.',
      tech: ['OpenAI API', 'Next.js', 'Tailwind CSS'],
      liveUrl: '#',
      githubUrl: '#',
      featured: false,
      isDemo: true,
    },
  ]);

  // computed ใช้คัดเฉพาะข้อมูลจริงไปแสดงหน้าเว็บ โดยยังเก็บ demo data ไว้แก้/เปิดใช้ภายหลังได้
  readonly visibleProjects = computed(() => this.projects().filter((project) => !project.isDemo));

  // services ใช้ render service cards ในหน้า Services แต่ละ item มี icon/title/description ครบในตัว
  readonly services = signal<Service[]>([
    { icon: 'WEB', title: 'Website / Landing Page', description: 'Simple pages that explain an idea clearly and load fast.' },
    { icon: 'APP', title: 'Web Application', description: 'Useful app screens with forms, data, auth, and everyday workflows.' },
    { icon: 'DASH', title: 'Dashboard / Admin Panel', description: 'Small control rooms for checking data, tasks, and daily operations.' },
    { icon: 'BOT', title: 'AI Chatbot', description: 'Bots that help answer, draft, summarize, or guide simple tasks.' },
    { icon: 'LINE', title: 'LINE OA Integration', description: 'LINE webhook, chatbot flow, and automation for Thai customer channels.' },
    { icon: 'AUTO', title: 'Automation Workflow', description: 'n8n and Make flows that remove repetitive steps from the day.' },
    { icon: 'API', title: 'API Integration', description: 'Connect tools together with REST APIs, webhooks, and background jobs.' },
  ]);

  // experiences ใช้ render timeline ถ้าเพิ่มประสบการณ์ใหม่ก็เติม object ใน array นี้ได้เลย
  readonly experiences = signal<Experience[]>([
    {
      period: 'Nov 2023–Present',
      role: 'Senior Programmer',
      company: 'Unbox.IT',
      description:
        'Develop and improve WMS interface features, integration workflows, enterprise web app modules, SFTP/API data exchange, Keycloak authentication, and CI/CD pipelines with GitHub Actions.',
    },
    {
      period: 'Jun 2023–Nov 2023',
      role: 'Systems Analyst / Senior Programmer',
      company: 'Techsoft Holding',
      description:
        'Collected requirements, analyzed business processes, prepared business documents, SIT documents, and UAT support materials, then coordinated system design with users and developers.',
    },
    {
      period: '2019–2023',
      role: 'Senior Programmer',
      company: 'Yamato Unyu (Thailand) Co., Ltd.',
      description:
        'Built and maintained TMS, WMS, back-office, dashboard, and customer survey web applications while improving transport and warehouse workflow visibility.',
    },
    {
      period: '2015–2019',
      role: 'Programmer',
      company: 'Panjawattana Plastic Public Company Limited',
      description:
        'Started professional WMS and warehouse system experience through ERP and scanning workflows, creating handheld scanning tools with ASP.NET/C# and Crystal Reports/SSRS reports.',
    },
  ]);

  // testimonials เก็บ social proof ของเว็บ แยก content ออกจาก presentation เหมือน section อื่น ๆ
  readonly testimonials = signal<Testimonial[]>([
    {
      name: 'Team Friend',
      position: 'Someone I built beside',
      company: 'Shared Quest',
      review: 'He is easy to talk to, cares about the people around him, and keeps trying until the tool feels useful.',
      avatar: 'TF',
      isDemo: true,
    },
    {
      name: 'Project Teammate',
      position: 'Workflow Partner',
      company: 'Small Build',
      review: 'He likes turning confusing steps into something clearer, and he asks questions instead of pretending.',
      avatar: 'PT',
      isDemo: true,
    },
    {
      name: 'Future Client',
      position: 'Next Quest Giver',
      company: 'Open Slot',
      review: 'This space is ready for a real note from someone I help next.',
      avatar: 'NQ',
      isDemo: true,
    },
  ]);

  readonly visibleTestimonials = computed(() => this.testimonials().filter((testimonial) => !testimonial.isDemo));

  // contactInfo ใช้ซ้ำทั้ง Contact section และ Footer เพื่อให้ช่องทางติดต่อไม่ซ้ำหลายที่
  readonly contactInfo = signal<ContactInfo[]>([
    { icon: 'MAIL', label: 'Email', value: 'Tanonchai.pr@hotmail.com', url: 'mailto:Tanonchai.pr@hotmail.com' },
    { icon: 'CALL', label: 'Phone', value: '081-436-8601', url: 'tel:0814368601' },
    { icon: 'GH', label: 'GitHub', value: 'github.com/ApoRaviz', url: 'https://github.com/ApoRaviz' },
    { icon: 'LINE', label: 'LINE', value: '', url: '', isDemo: true },
    { icon: 'FB', label: 'Facebook', value: '', url: '', isDemo: true },
  ]);

  readonly visibleContactInfo = computed(() => this.contactInfo().filter((item) => !item.isDemo));
}
