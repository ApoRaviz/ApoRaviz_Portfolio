export interface NavLink {
  id: string;
  label: string;
}

export interface FeatureCard {
  icon: string;
  title: string;
  desc: string;
}

export interface SkillGroup {
  category: string;
  skills: string[];
}

export interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
}

export interface Service {
  icon: string;
  title: string;
  description: string;
}

export interface Experience {
  period: string;
  role: string;
  company: string;
  description: string;
}

export interface Testimonial {
  name: string;
  position: string;
  company: string;
  review: string;
  avatar: string;
}

export interface ContactInfo {
  icon: string;
  label: string;
  value: string;
  url: string;
}
