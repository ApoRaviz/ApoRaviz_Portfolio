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
  category: string;
  title: string;
  description: string;
  highlight: string;
  tech: string[];
  imageUrl?: string;
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
  isDemo?: boolean;
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
  isDemo?: boolean;
}

export interface ContactInfo {
  icon: string;
  label: string;
  value: string;
  url: string;
  isDemo?: boolean;
}

// ===== Book redesign ("The Daily Book of a Developer") =====
// interface เหล่านี้เป็น view-model เฉพาะ layout แบบหนังสือ ส่วนใหญ่ map มาจาก data เดิมด้านบน

// Trait = การ์ด "Margin Notes" ในบท Profile (map มาจาก FeatureCard)
export interface Trait {
  tag: string;
  title: string;
  desc: string;
}

// LoadoutItem/LoadoutGroup = ตาราง gear ในบท Loadout ที่มีคำอธิบายรายชิ้น
export interface LoadoutItem {
  n: string;
  note: string;
}

export interface LoadoutGroup {
  icon: string;
  title: string;
  blurb: string;
  items: LoadoutItem[];
}

// Quest = การ์ดโปรเจกต์ในบท Quests (map มาจาก Project)
export interface Quest {
  name: string;
  status: string;
  type: string;
  desc: string;
  tech: string[];
  img: string;
  live: string;
  code: string;
}

// JourneyEntry = ช่วงประสบการณ์ใน timeline บท Journey (map มาจาก Experience)
export interface JourneyEntry {
  role: string;
  org: string;
  time: string;
  desc: string;
}

// BookContact = การ์ดช่องทางติดต่อในบท Contact (map มาจาก ContactInfo + glyph)
export interface BookContact {
  icon: string;
  label: string;
  value: string;
  href: string;
}
