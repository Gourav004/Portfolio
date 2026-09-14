export interface Project {
  id: string;
  number: string;
  title: string;
  tagline: string;
  role: string;
  year: string;
  description: string;
  liveUrl: string;
  githubUrl?: string;
  highlights: string[];
  techStack: string[];
  architecture: {
    frontend: string;
    backend: string;
    database: string;
    auth: string;
    extra: string;
  };
  metrics: {
    label: string;
    value: string;
  }[];
}

export interface SkillItem {
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'devops' | 'architecture' | 'design';
  proficiency: number;
  highlight?: string;
  iconName: string;
  logoUrl?: string;
}

export interface JourneyMilestone {
  period: string;
  title: string;
  subtitle: string;
  description: string;
  bullets?: string[];
  keyTakeaway: string;
  skills: string[];
  stat?: {
    value: string;
    label: string;
  };
}

export interface DeveloperStat {
  value: number;
  suffix: string;
  label: string;
  subtext: string;
}

export interface TimeSlot {
  id: string;
  time: string;
  period: 'AM' | 'PM';
  available: boolean;
}
