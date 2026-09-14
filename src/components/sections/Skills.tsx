import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SkillItem } from '../ui/skill-item';

export interface TypographicSkill {
  name: string;
  category: 'frontend' | 'backend' | 'infra' | 'design';
  accent: string;
  size: 'giant' | 'large' | 'medium';
  logoUrl: string;
  layoutOffset?: string;
}

const SKILLS_CLUSTER: TypographicSkill[] = [
  {
    name: 'REACT',
    category: 'frontend',
    accent: '#61DAFB',
    size: 'giant',
    logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    layoutOffset: 'mr-auto sm:pr-8',
  },
  {
    name: 'NODE.JS',
    category: 'backend',
    accent: '#68A063',
    size: 'giant',
    logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    layoutOffset: 'ml-auto sm:pl-8',
  },
  {
    name: 'MONGODB',
    category: 'backend',
    accent: '#47A248',
    size: 'large',
    logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
    layoutOffset: 'mx-auto sm:px-12',
  },
  {
    name: 'TYPESCRIPT',
    category: 'frontend',
    accent: '#3178C6',
    size: 'giant',
    logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    layoutOffset: 'mr-auto',
  },
  {
    name: 'EXPRESS',
    category: 'backend',
    accent: '#FFFFFF',
    size: 'large',
    // Crisp white official Express mark for dark backgrounds
    logoUrl:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 128 128'%3E%3Cpath fill='%23ffffff' d='M37.3 43.7h8.8l11.4 16.5 11.4-16.5h8.8L61.9 66.8l16.8 24.3h-8.8L57.5 73.8 46.1 91.1h-8.8l16.8-24.3zm45.9 23.1c0-12.7 8.3-23.1 21.6-23.1 13 0 20.8 10.4 20.8 23.1v2.1H91.5c.8 7.3 6 12.5 13.5 12.5 5.5 0 9.8-2.6 11.6-6.8h8.5c-2.4 8.7-10.4 14.8-20.1 14.8-13.3 0-21.8-10.4-21.8-22.6zm33.8-4.7c-.8-6.2-5.5-10.5-12.2-10.5s-11.4 4.3-12.2 10.5z'/%3E%3C/svg%3E",
    layoutOffset: 'ml-auto',
  },
  {
    name: 'TAILWIND',
    category: 'frontend',
    accent: '#06B6D4',
    size: 'large',
    logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
    layoutOffset: 'sm:ml-12 md:ml-20',
  },
  {
    name: 'CANVA',
    category: 'design',
    accent: '#00C4CC',
    size: 'giant',
    logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg',
    layoutOffset: 'mr-auto sm:pl-6',
  },
  {
    name: 'PHOTOSHOP',
    category: 'design',
    accent: '#31A8FF',
    size: 'large',
    logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-original.svg',
    layoutOffset: 'mx-auto',
  },
  {
    name: 'CAPCUT',
    category: 'design',
    accent: '#00F2FE',
    size: 'large',
    logoUrl:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='22' fill='%23121212' stroke='%23282828' stroke-width='2'/%3E%3Cpath d='M22 28h26l-11 22 11 22H22l11-22z' fill='%2300f2fe'/%3E%3Cpath d='M52 28h26l-11 22 11 22H52l11-22z' fill='%23ffffff'/%3E%3C/svg%3E",
    layoutOffset: 'ml-auto sm:pr-8',
  },
  {
    name: 'DOCKER',
    category: 'infra',
    accent: '#2496ED',
    size: 'medium',
    logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
    layoutOffset: 'mr-auto',
  },
  {
    name: 'REDUX',
    category: 'frontend',
    accent: '#764ABC',
    size: 'medium',
    logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg',
    layoutOffset: 'mx-auto',
  },
  {
    name: 'GIT',
    category: 'infra',
    accent: '#F05032',
    size: 'large',
    logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
    layoutOffset: 'ml-auto',
  },
  {
    name: 'AI SYSTEMS',
    category: 'infra',
    accent: '#F97316',
    size: 'giant',
    logoUrl:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cdefs%3E%3ClinearGradient id='ai-glow' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%23f97316'/%3E%3Cstop offset='50%25' stop-color='%23ec4899'/%3E%3Cstop offset='100%25' stop-color='%238b5cf6'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpath d='M50 6 C50 30 30 50 6 50 C30 50 50 70 50 94 C50 70 70 50 94 50 C70 50 50 30 50 6 Z' fill='url(%23ai-glow)'/%3E%3C/svg%3E",
    layoutOffset: 'mr-auto sm:pr-10',
  },
  {
    name: 'REST APIs',
    category: 'backend',
    accent: '#FF6C37',
    size: 'large',
    logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg',
    layoutOffset: 'ml-auto',
  },
  {
    name: 'JWT',
    category: 'backend',
    accent: '#D63AFF',
    size: 'medium',
    logoUrl:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath d='M50 12 L60 33 L83 33 L64 47 L71 69 L50 55 L29 69 L36 47 L17 33 L40 33 Z' fill='%23d63aff'/%3E%3Ccircle cx='50' cy='45' r='16' fill='%230b0b0b'/%3E%3Cpath d='M50 25 A 20 20 0 0 1 70 45' stroke='%2300b9f1' stroke-width='5' stroke-linecap='round' fill='none'/%3E%3Cpath d='M70 45 A 20 20 0 0 1 50 65' stroke='%23fb015b' stroke-width='5' stroke-linecap='round' fill='none'/%3E%3Cpath d='M50 65 A 20 20 0 0 1 30 45' stroke='%23d63aff' stroke-width='5' stroke-linecap='round' fill='none'/%3E%3C/svg%3E",
    layoutOffset: 'mx-auto',
  },
];

const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'infra', label: 'DevOps & AI' },
  { id: 'design', label: 'Graphic Design' },
] as const;

export function Skills() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'frontend' | 'backend' | 'infra' | 'design'>('all');

  const filteredSkills =
    activeCategory === 'all'
      ? SKILLS_CLUSTER
      : SKILLS_CLUSTER.filter((s) => s.category === activeCategory);

  return (
    <section
      id="skills"
      className="relative w-full py-28 sm:py-36 px-6 sm:px-10 md:px-16 border-t border-white/[0.08] overflow-visible bg-[#050505]"
    >
      {/* Subtle Atmospheric Background: Soft light bloom and faint grid */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:4rem_4rem] -z-10" />
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] max-w-[850px] h-[380px] rounded-full bg-[#f97316]/5 blur-[170px] -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Section Tag */}
        <div className="flex items-center gap-3 text-xs font-mono tracking-[0.25em] text-[#f97316] uppercase mb-4">
          <span>TECHNICAL ECOSYSTEM</span>
        </div>

        {/* Section Heading */}
        <div className="mb-10">
          <h2 className="text-[clamp(2.4rem,6vw,5.5rem)] font-black uppercase tracking-tight text-white leading-none">
            I WORK WITH<span className="text-[#f97316]">.</span>
          </h2>
        </div>

        {/* Secondary Category Filter */}
        <div className="flex flex-wrap items-center gap-6 sm:gap-8 pt-2 pb-8 border-b border-white/[0.07] mb-16 sm:mb-20 text-xs font-mono tracking-widest uppercase">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`relative pb-2 transition-colors cursor-pointer ${
                activeCategory === cat.id
                  ? 'text-[#f97316] font-bold'
                  : 'text-white/40 hover:text-white/80'
              }`}
            >
              <span>{cat.label}</span>
              {activeCategory === cat.id && (
                <motion.div
                  layoutId="activeSkillCategoryIndicator"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#f97316]"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* ========================================================== */}
        {/* PREMIUM TYPOGRAPHIC SKILLS CLUSTER                         */}
        {/* Default state: ONLY plain typography brick-like blocks     */}
        {/* Hover state: ONLY the real technology logo floating above  */}
        {/* ========================================================== */}
        <motion.div
          layout
          className="relative w-full flex flex-wrap items-baseline justify-between gap-x-8 sm:gap-x-14 md:gap-x-20 gap-y-10 sm:gap-y-16 md:gap-y-24 py-4 overflow-visible"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, idx) => (
              <SkillItem
                key={skill.name}
                name={skill.name}
                logoUrl={skill.logoUrl}
                accent={skill.accent}
                size={skill.size}
                className={skill.layoutOffset}
                index={idx}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

