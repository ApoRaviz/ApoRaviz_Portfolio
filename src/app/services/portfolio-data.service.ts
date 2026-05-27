import { Injectable, signal } from '@angular/core';
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
    role: 'Gamer-minded developer who builds useful web tools',
    email: 'Tanonchai.pr@hotmail.com',
    phone: '081-436-8601',
    line: '@yourline',
    github: 'github.com/yourname',
    facebook: 'fb.com/yourname',
  });

  // roles ใช้กับ typewriter effect ใน Hero แยกออกมาเพื่อเพิ่ม/ลด role ได้โดยไม่แตะ component logic
  readonly roles = signal(['Web App Builder', 'AI Automation Learner', 'Game-Loving Programmer']);

  // features คือการ์ดจุดเด่นใน About section เก็บเป็น data เพื่อให้ template ใช้ @for render ซ้ำได้
  readonly features = signal<FeatureCard[]>([
    {
      icon: 'FUN',
      title: 'Easy to Work With',
      desc: 'I like keeping work simple, friendly, and clear so people around me feel comfortable.',
    },
    {
      icon: 'CODE',
      title: 'Readable Code',
      desc: 'I try to write code that I can come back to later without fighting my past self.',
    },
    {
      icon: 'CARE',
      title: 'Team Mind',
      desc: 'I care about friends, teammates, and the people who have to use what I build.',
    },
    {
      icon: 'PLAY',
      title: 'Game Energy',
      desc: 'Games taught me to enjoy quests, learn patterns, and keep trying after a failed round.',
    },
  ]);

  // Skills ใช้ badge เท่านั้น ไม่มี progress bar หรือค่าพลังตามที่ผู้ใช้ต้องการ
  // การเก็บเป็นกลุ่มช่วยให้เพิ่ม skill category ใหม่ได้ง่าย เช่น Mobile, Cloud, DevOps
  readonly skillGroups = signal<SkillGroup[]>([
    { category: 'Frontend', skills: ['HTML', 'CSS', 'JavaScript', 'Angular', 'Ionic', 'Tailwind CSS'] },
    { category: 'Backend', skills: ['C#', '.NET Core', 'MVC', 'Node.js', 'REST API', 'ASP.NET'] },
    { category: 'Database / Reports', skills: ['SQL Server', 'MongoDB', 'MySQL', 'SSRS', 'Crystal Report'] },
    { category: 'Tools / Workflow', skills: ['GitHub', 'GitHub Actions', 'Jira', 'Figma', 'IIS Server', 'PrimeNG'] },
  ]);

  // projects เป็นข้อมูลของ project cards ทั้งหมด แยกจาก HTML เพื่อให้แก้ content โดยไม่แก้ layout
  readonly projects = signal<Project[]>([
    {
      id: 1,
      title: 'AI LINE OA Chatbot',
      description: 'Customer service chatbot that combines LINE messaging, AI responses, and backend automation.',
      tech: ['LINE Bot', 'OpenAI', 'Node.js'],
      liveUrl: '#',
      githubUrl: '#',
      featured: true,
    },
    {
      id: 2,
      title: 'Law Firm Management System',
      description: 'Case, client, and document workflow system for legal operations.',
      tech: ['Next.js', 'PostgreSQL', 'Supabase'],
      liveUrl: '#',
      githubUrl: '#',
      featured: true,
    },
    {
      id: 3,
      title: 'E-commerce Dashboard',
      description: 'Analytics dashboard for sales, inventory, orders, and performance reporting.',
      tech: ['Angular', 'Chart.js', 'REST API'],
      liveUrl: '#',
      githubUrl: '#',
      featured: false,
    },
    {
      id: 4,
      title: 'CRM System',
      description: 'Customer pipeline, task tracking, and internal collaboration system.',
      tech: ['React', 'NestJS', 'PostgreSQL'],
      liveUrl: '#',
      githubUrl: '#',
      featured: false,
    },
    {
      id: 5,
      title: 'AI Content Generator',
      description: 'Marketing content tool that helps teams draft posts, captions, and campaign ideas.',
      tech: ['OpenAI API', 'Next.js', 'Tailwind CSS'],
      liveUrl: '#',
      githubUrl: '#',
      featured: false,
    },
    {
      id: 6,
      title: 'Portfolio Website',
      description: 'Fast Angular portfolio with SSR, modern UI, and editable content architecture.',
      tech: ['Angular', 'Tailwind CSS', 'Vercel'],
      liveUrl: '#',
      githubUrl: '#',
      featured: false,
    },
  ]);

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
        'Working with WMS interfaces, SFTP/API data exchange, Keycloak authentication, WMS platform improvements, and CI/CD pipelines with GitHub Actions and self-hosted runners.',
    },
    {
      period: 'Jun 2023–Nov 2023',
      role: 'Systems Analyst / Senior Programmer',
      company: 'Techsoft Holding',
      description:
        'Collected user requirements, prepared business and SIT documents, assessed and designed systems, supported UAT, and helped junior developers troubleshoot issues.',
    },
    {
      period: '2019–2023',
      role: 'Senior Programmer',
      company: 'Yamato Unyu (Thailand) Co., Ltd.',
      description:
        'Built and maintained TMS, WMS, back office, management dashboard, reminder, and customer survey web applications for transport and warehouse workflows.',
    },
    {
      period: '2015–2019',
      role: 'Programmer',
      company: 'Panjawattana Plastic Public Company Limited',
      description:
        'Supported ERP on Syteline, created warehouse handheld scanning tools with ASP.NET and C#, built Crystal/SSRS reports, and worked with SQL queries and stored procedures.',
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
    },
    {
      name: 'Project Teammate',
      position: 'Workflow Partner',
      company: 'Small Build',
      review: 'He likes turning confusing steps into something clearer, and he asks questions instead of pretending.',
      avatar: 'PT',
    },
    {
      name: 'Future Client',
      position: 'Next Quest Giver',
      company: 'Open Slot',
      review: 'This space is ready for a real note from someone I help next.',
      avatar: 'NQ',
    },
  ]);

  // contactInfo ใช้ซ้ำทั้ง Contact section และ Footer เพื่อให้ช่องทางติดต่อไม่ซ้ำหลายที่
  readonly contactInfo = signal<ContactInfo[]>([
    { icon: 'MAIL', label: 'Email', value: 'Tanonchai.pr@hotmail.com', url: 'mailto:Tanonchai.pr@hotmail.com' },
    { icon: 'CALL', label: 'Phone', value: '081-436-8601', url: 'tel:0814368601' },
    { icon: 'LINE', label: 'LINE', value: '@yourline', url: '#' },
    { icon: 'GH', label: 'GitHub', value: 'github.com/yourname', url: '#' },
    { icon: 'FB', label: 'Facebook', value: 'fb.com/yourname', url: '#' },
  ]);
}
