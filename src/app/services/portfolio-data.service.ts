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
  providedIn: 'root',
})
export class PortfolioDataService {
  // signal เก็บข้อมูลแบบ reactive: component อ่านด้วย navLinks() และ Angular จะ track การเปลี่ยนแปลงให้
  readonly navLinks = signal<NavLink[]>([
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'services', label: 'Services' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' },
  ]);

  readonly profile = signal({
    name: 'Tanonchai Promsiri',
    initials: 'AP',
    logoUrl: 'aporaviz-logo.png',
    role: 'Full-Stack Developer & AI Automation Developer',
    email: 'your@email.com',
    line: '@yourline',
    github: 'github.com/yourname',
    facebook: 'fb.com/yourname',
  });

  readonly roles = signal(['Full-Stack Developer', 'AI Automation Developer', 'Angular Specialist']);

  readonly features = signal<FeatureCard[]>([
    {
      icon: '⚡',
      title: 'Fast Delivery',
      desc: 'Ship production-ready code quickly with clear scope and steady communication.',
    },
    {
      icon: '🧹',
      title: 'Clean Code',
      desc: 'Readable, maintainable, and documented implementation that future teams can extend.',
    },
    {
      icon: '📈',
      title: 'Scalable System',
      desc: 'Architecture designed to grow from a small workflow into a business platform.',
    },
    {
      icon: '🎯',
      title: 'Business-Focused',
      desc: 'Practical solutions that reduce manual work, improve visibility, and support growth.',
    },
  ]);

  // Skills ใช้ badge เท่านั้น ไม่มี progress bar หรือค่าพลังตามที่ผู้ใช้ต้องการ
  readonly skillGroups = signal<SkillGroup[]>([
    { category: 'Frontend', skills: ['React', 'Next.js', 'Angular', 'TypeScript', 'Tailwind CSS'] },
    { category: 'Backend', skills: ['Node.js', 'Express', 'NestJS', 'REST API', 'Supabase', 'PostgreSQL'] },
    { category: 'AI / Automation', skills: ['OpenAI API', 'Claude API', 'n8n', 'Make', 'LINE Bot'] },
    { category: 'Tools', skills: ['GitHub', 'Vercel', 'Figma', 'Docker', 'Postman'] },
  ]);

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

  readonly services = signal<Service[]>([
    { icon: '🌐', title: 'Website / Landing Page', description: 'Fast, SEO-optimized, conversion-focused sites.' },
    { icon: '💻', title: 'Web Application', description: 'Full-featured apps with auth, dashboards, and database workflows.' },
    { icon: '📊', title: 'Dashboard / Admin Panel', description: 'Operational views for data, reporting, and management.' },
    { icon: '🤖', title: 'AI Chatbot', description: 'GPT-powered bots for customer service and internal support.' },
    { icon: '💬', title: 'LINE OA Integration', description: 'Official LINE account automation, webhook, and chatbot integration.' },
    { icon: '⚙️', title: 'Automation Workflow', description: 'n8n and Make flows that remove repetitive business tasks.' },
    { icon: '🔌', title: 'API Integration', description: 'Connect tools and services through REST APIs, webhooks, and background jobs.' },
  ]);

  readonly experiences = signal<Experience[]>([
    {
      period: '2024–Present',
      role: 'Freelance Full-Stack Developer',
      company: 'Independent',
      description: 'Build production web apps, dashboards, AI tools, and automation systems for business use cases.',
    },
    {
      period: '2023–2024',
      role: 'AI Automation Developer',
      company: 'Client Projects',
      description: 'Designed AI-assisted workflows, chatbots, and integrations that reduced manual operations.',
    },
    {
      period: '2022–2023',
      role: 'Web Application Developer',
      company: 'Product Teams',
      description: 'Developed frontend and backend features for internal systems and customer-facing platforms.',
    },
    {
      period: '2021–2022',
      role: 'LINE OA & Chatbot Developer',
      company: 'Automation Projects',
      description: 'Implemented LINE OA messaging, webhooks, and chatbot journeys for customer support.',
    },
  ]);

  readonly testimonials = signal<Testimonial[]>([
    {
      name: 'Thai SME',
      position: 'Business Owner',
      company: 'Retail Operations',
      review: 'Tanonchai translated our messy manual process into a clean dashboard and automation flow.',
      avatar: 'TS',
    },
    {
      name: 'Tech Startup',
      position: 'Product Lead',
      company: 'SaaS Platform',
      review: 'He understood both product speed and code quality, which made the project move smoothly.',
      avatar: 'TU',
    },
    {
      name: 'Law Firm',
      position: 'Managing Partner',
      company: 'Legal Services',
      review: 'The management system gave our team better visibility and saved many hours every week.',
      avatar: 'LF',
    },
  ]);

  readonly contactInfo = signal<ContactInfo[]>([
    { icon: '✉', label: 'Email', value: 'your@email.com', url: 'mailto:your@email.com' },
    { icon: '💬', label: 'LINE', value: '@yourline', url: '#' },
    { icon: 'GH', label: 'GitHub', value: 'github.com/yourname', url: '#' },
    { icon: 'FB', label: 'Facebook', value: 'fb.com/yourname', url: '#' },
  ]);
}
