
import { LucideIcon } from 'lucide-react';

export interface SkillCategory {
  category: string;
  icon: LucideIcon;
  items: string[];
}

export interface Experience {
  company: string;
  role: string;
  desc: string;
  points: string[];
}

export interface FeaturedWork {
  title: string;
  icon: LucideIcon;
  url: string;
  image?: string;
  label?: string;
  action?: string;
  type?: 'video' | 'article' | 'post';
  videoId?: string;
}

export interface ProofOfWork {
  title: string;
  desc: string;
  icon: LucideIcon;
  url?: string;
  images?: string[];
  isGallery?: boolean;
}

export interface ContactLink {
  label: string;
  icon: LucideIcon;
  url: string;
  color: string;
}
