import { ReactNode } from 'react';
import {
  Globe,
  Github,
  Linkedin,
  Mail,
  Phone,
  Code,
  ServerCog,
  Database,
  Cpu,
  MapPin,
} from 'lucide-react';

export type ContactType =
  | 'email'
  | 'phone'
  | 'website'
  | 'linkedin'
  | 'github'
  | 'location'
  | 'custom';

const contactIcons: Record<ContactType, ReactNode> = {
  email: <Mail className="h-4 w-4" />,
  phone: <Phone className="h-4 w-4" />,
  website: <Globe className="h-4 w-4" />,
  linkedin: <Linkedin className="h-4 w-4" />,
  github: <Github className="h-4 w-4" />,
  location: <MapPin className="h-4 w-4" />,
  custom: <Code className="h-4 w-4" />,
};

const skillIconMap: Record<string, ReactNode> = {
  javascript: <Code className="h-4 w-4" />,
  typescript: <Code className="h-4 w-4" />,
  react: <Code className="h-4 w-4" />,
  node: <ServerCog className="h-4 w-4" />,
  express: <ServerCog className="h-4 w-4" />,
  nodejs: <ServerCog className="h-4 w-4" />,
  backend: <ServerCog className="h-4 w-4" />,
  frontend: <Code className="h-4 w-4" />,
  database: <Database className="h-4 w-4" />,
  sql: <Database className="h-4 w-4" />,
  nosql: <Database className="h-4 w-4" />,
  api: <Code className="h-4 w-4" />,
  devops: <Cpu className="h-4 w-4" />,
};

const fallbackColors = [
  '#F97316',
  '#FB923C',
  '#F59E0B',
  '#F43F5E',
  '#6366F1',
  '#10B981',
  '#06B6D4',
];

export const getContactIcon = (type: ContactType): ReactNode => {
  return contactIcons[type] || contactIcons.custom;
};

export const getSkillIcon = (skill: string): ReactNode => {
  const normalized = skill.trim().toLowerCase();
  if (skillIconMap[normalized]) {
    return skillIconMap[normalized];
  }

  const initial = normalized.charAt(0)?.toUpperCase() || '?';
  const color = fallbackColors[initial.charCodeAt(0) % fallbackColors.length];

  return (
    <span
      className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold text-white"
      style={{ backgroundColor: color }}
    >
      {initial}
    </span>
  );
};
