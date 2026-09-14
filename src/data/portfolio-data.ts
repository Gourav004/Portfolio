import { Project, SkillItem, JourneyMilestone, DeveloperStat } from '../types';

export const PERSONAL_INFO = {
  name: 'Gourav',
  role: 'Full-Stack Developer',
  positioning: 'MERN • AI • Product Engineering',
  email: 'gouravthakurpp@gmail.com',
  github: 'https://github.com/Gourav004',
  linkedin: 'https://www.linkedin.com/in/gourav-80953a252/',
  degree: 'Computer Science Engineering Graduate',
  location: 'Available Worldwide & Remote',
  availability: 'Available for Engineering Roles & High-Impact Projects',
};

export const REAL_PROJECTS: Project[] = [
  {
    id: 'trackpro',
    number: '01',
    title: 'TrackPro',
    tagline: 'Freelancer–Client Project Tracking Platform for Agencies',
    role: 'Sole Architect & Full-Stack Engineer',
    year: '2025',
    description:
      'A comprehensive agency workflow engine connecting freelance talent and clients with real-time milestone tracking, client feedback loops, automated invoicing, and live availability scheduling.',
    liveUrl: 'https://trackpro-orpin.vercel.app/',
    highlights: [
      'Project & Milestone Lifecycle Management with timeline visualization',
      'Dual Role-Based Workspaces for agency managers and independent talent',
      'Client feedback capture and revision tracking with audit trails',
      'Invoice generation, payment status tracking, and automated delivery alerts',
      'Live availability dashboard preventing over-allocation of talent',
    ],
    techStack: [
      'React',
      'Node.js',
      'Express',
      'MongoDB',
      'TypeScript',
      'Tailwind CSS',
      'REST APIs',
    ],
    architecture: {
      frontend: 'React 18 + TypeScript + Vite + Tailwind',
      backend: 'Node.js & Express Modular Micro-Services',
      database: 'MongoDB Atlas with optimized indexing',
      auth: 'Role-Based Access Control (RBAC) & Secure JWT',
      extra: 'Automated Invoice Generator & Alert Queue',
    },
    metrics: [
      { label: 'Architecture', value: 'MERN Stack' },
      { label: 'Role Types', value: 'Agency / Freelancer / Client' },
      { label: 'Workflow', value: 'End-to-End Tracking' },
      { label: 'Deployment', value: 'Vercel + Cloud API' },
    ],
  },
  {
    id: 'gradjob',
    number: '02',
    title: 'GradJob',
    tagline: 'AI-Powered Career & Job Discovery Platform for Students',
    role: 'Full-Stack & AI Systems Developer',
    year: '2025',
    description:
      'An intelligent student recruitment platform that combines role-based application tracking with an integrated AI career assistant, automated resume guidance, and personalized interview preparation.',
    liveUrl: 'https://gradjob.onrender.com/',
    highlights: [
      'Job Discovery & Multi-Stage Application Pipeline tracking with stage notifications',
      'AI Assistant for dynamic resume optimization and contextual interview prep',
      'Student profile portfolios with verified skill tags and project showcases',
      'Admin & recruiter control panels with candidate filtering and status updates',
      'Secure JWT authentication with role-based permissions (Student, Admin, Recruiter)',
    ],
    techStack: [
      'React',
      'Node.js',
      'Express',
      'MongoDB',
      'TypeScript',
      'AI Integration',
      'JWT Auth',
      'Tailwind CSS',
    ],
    architecture: {
      frontend: 'React SPA with real-time application pipelines',
      backend: 'Express.js RESTful API engine with rate limiting',
      database: 'MongoDB with schemas for candidates, jobs, and applications',
      auth: 'Stateless JWT with encrypted session cookies',
      extra: 'AI Resume Analyzer & Mock Interview Guidance',
    },
    metrics: [
      { label: 'Core Intelligence', value: 'AI Resume & Prep' },
      { label: 'User Types', value: 'Students & Recruiters' },
      { label: 'Authentication', value: 'JWT + RBAC' },
      { label: 'Hosting', value: 'Render Cloud' },
    ],
  },
];

export const SKILLS_DATA: SkillItem[] = [
  { name: 'React', category: 'frontend', proficiency: 94, highlight: 'Hooks, Suspense, State Architecture', iconName: 'SiReact' },
  { name: 'Node.js', category: 'backend', proficiency: 92, highlight: 'Event Loop, Streams, RESTful APIs', iconName: 'SiNodedotjs' },
  { name: 'MongoDB', category: 'database', proficiency: 90, highlight: 'Aggregation Pipelines, Indexing', iconName: 'SiMongodb' },
  { name: 'Express', category: 'backend', proficiency: 92, highlight: 'Middlewares, Error Handling, Routing', iconName: 'SiExpress' },
  { name: 'TypeScript', category: 'frontend', proficiency: 88, highlight: 'Strict Types, Generics, Utility Types', iconName: 'SiTypescript' },
  { name: 'Tailwind CSS', category: 'frontend', proficiency: 95, highlight: 'Responsive Design, Custom Design Systems', iconName: 'SiTailwindcss' },
  { name: 'Docker', category: 'devops', proficiency: 82, highlight: 'Containerization, Multi-Stage Builds', iconName: 'SiDocker' },
  { name: 'AI Integration', category: 'architecture', proficiency: 87, highlight: 'Prompt Pipelines, Semantic Search, Assistant UI', iconName: 'SiOpenai' },
  { name: 'REST APIs', category: 'backend', proficiency: 94, highlight: 'Stateless Design, Rate Limiting, Versioning', iconName: 'SiPostman' },
  { name: 'Git & GitHub', category: 'devops', proficiency: 90, highlight: 'Workflows, CI/CD Actions, Release Automation', iconName: 'SiGit' },
  { name: 'Redux / Zustand', category: 'frontend', proficiency: 86, highlight: 'Predictable State Management', iconName: 'SiRedux' },
  { name: 'Authentication / JWT', category: 'architecture', proficiency: 90, highlight: 'RBAC, Refresh Tokens, Encryption', iconName: 'SiJsonwebtokens' },
  { name: 'Canva', category: 'design', proficiency: 92, highlight: 'Visual Layouts, Brand Kits, Asset Design', iconName: 'SiCanva' },
  { name: 'Photoshop (Ps)', category: 'design', proficiency: 88, highlight: 'Asset Manipulation, UI Mockups, Image Retouching', iconName: 'SiAdobephotoshop' },
  { name: 'CapCut', category: 'design', proficiency: 90, highlight: 'Video Cuts, Dynamic Pacing, Motion Transitions', iconName: 'FiVideo' },
];

export const JOURNEY_MILESTONES: JourneyMilestone[] = [
  {
    period: 'JAN 2026 – MAR 2026',
    title: 'Full Stack Developer Intern',
    subtitle: 'College Khoje | JCS',
    description:
      'Contributed to a college-discovery web platform displaying college ratings, placement records, and fee structures for prospective students.',
    bullets: [
      'Contributed to a college-discovery web platform displaying college ratings, placement records, and fee structures for prospective students.',
      'Built responsive UI components with React.js and Tailwind CSS to present college data in clean, filterable listings.',
      'Worked with REST APIs to fetch and render dynamic college information, improving data consistency across pages.',
      'Collaborated with the development team on code reviews, debugging, and feature refinements to improve platform usability.',
    ],
    keyTakeaway: 'Built production React UI and dynamic REST integrations for filterable college discovery data.',
    skills: ['React.js', 'Tailwind CSS', 'REST APIs', 'UI Components', 'Filterable Listings'],
    stat: { value: 'Intern', label: 'College Khoje' },
  },
  {
    period: 'FOUNDATIONS',
    title: 'Computer Science Engineering',
    subtitle: 'Core Systems, Networks & Computing Theory',
    description:
      'Earned B.Tech in Computer Science Engineering. Built a strong analytical foundation spanning computer organization, operating systems, relational data structures, and object-oriented architecture.',
    keyTakeaway: 'Deep grasp of foundational computer science principles and mathematical rigor.',
    skills: ['Data Structures', 'Operating Systems', 'OOP', 'Database Theory'],
  },
  {
    period: 'PROBLEM SOLVING',
    title: 'Algorithmic Mastery & 150+ LeetCode',
    subtitle: 'Data Structures, Optimization & Algorithmic Complexity',
    description:
      'Solved 150+ rigorous algorithmic problems covering dynamic programming, graphs, trees, two-pointer arrays, and binary search, cultivating clean problem decomposition under tight complexity constraints.',
    keyTakeaway: 'Efficiency first: optimizing big-O time and memory profiles before committing code.',
    skills: ['Dynamic Programming', 'Graph Theory', 'Trees & Heaps', 'Complexity Analysis'],
    stat: { value: '150+', label: 'LeetCode Solved' },
  },
  {
    period: 'ENTERPRISE WORKFLOWS',
    title: 'TrackPro Production Platform',
    subtitle: 'Freelancer & Agency Project Operating System',
    description:
      'Engineered TrackPro from concept to cloud deployment. Addressed the chaotic agency-talent gap with structured task states, real-time client feedback cycles, automated invoicing, and availability heatmaps.',
    keyTakeaway: 'Mastery of MERN stack state sync, multi-tenant databases, and granular RBAC.',
    skills: ['MERN Stack', 'Agency Dashboards', 'Invoice Engines', 'Vercel Deployment'],
    stat: { value: '100%', label: 'Production Ready' },
  },
  {
    period: 'AI INTEGRATION',
    title: 'GradJob AI Student Platform',
    subtitle: 'Intelligent Job Discovery & Career Assistant',
    description:
      'Architected GradJob to solve graduate hiring hurdles. Integrated custom AI assistance for targeted resume refinement and contextual mock interview guidance alongside complete application lifecycle tracking.',
    keyTakeaway: 'Merging modern LLM capabilities into deterministic web application workflows.',
    skills: ['AI Pipelines', 'JWT Security', 'Application Pipelines', 'Render Deployment'],
    stat: { value: '2+', label: 'Full-Scale Apps' },
  },
  {
    period: 'CURRENT HORIZON',
    title: 'High-Performance Full-Stack Systems',
    subtitle: 'Production Engineering, Real-Time & Scalability',
    description:
      'Focusing on resilient digital architectures, micro-frontends, high-throughput Node.js microservices, and AI-augmented developer workflows with uncompromising visual craftsmanship.',
    keyTakeaway: 'Building products that balance ruthless backend performance with memorable user experiences.',
    skills: ['Distributed Systems', 'Real-time APIs', 'Advanced Motion', 'System Design'],
  },
];

export const DEVELOPER_STATS: DeveloperStat[] = [
  {
    value: 150,
    suffix: '+',
    label: 'LeetCode Problems Solved',
    subtext: 'Algorithmic optimization, graphs, and dynamic programming',
  },
  {
    value: 10,
    suffix: '+',
    label: 'Production Systems Shipped',
    subtext: 'TrackPro & GradJob fully deployed in the wild',
  },
  {
    value: 100,
    suffix: '%',
    label: 'MERN Full-Stack Core',
    subtext: 'End-to-end frontend, API architecture, and database design',
  },
  {
    value: 100,
    suffix: '%',
    label: 'AI Integrated Applications',
    subtext: 'Modern generative AI pipelines embedded in practical products',
  },
];

export const MARQUEE_ROWS = [
  [
    'FULL STACK DEVELOPMENT',
    'AI ENGINEERING',
    'PRODUCT DEVELOPMENT',
    'PROBLEM SOLVING',
    'SYSTEM DESIGN',
    'MERN ARCHITECTURE',
  ],
  [
    'REACT',
    'NODE.JS',
    'MONGODB',
    'EXPRESS',
    'TYPESCRIPT',
    'TAILWIND CSS',
    'DOCKER',
    'REST APIs',
  ],
  [
    'SCALABLE ARCHITECTURE',
    'REAL-TIME DATA',
    'DISTRIBUTED WORKFLOWS',
    'INTUITIVE UX',
    'PRODUCTION READY',
  ],
];
