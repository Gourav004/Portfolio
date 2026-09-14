import { motion } from 'motion/react';
import { SpotlightCard } from '../ui/spotlight-card';
import { PERSONAL_INFO } from '../../data/portfolio-data';
import { FiCode, FiCpu, FiLayers, FiShield, FiTerminal } from 'react-icons/fi';

export function About() {
  const corePrinciples = [
    {
      title: 'Full-Stack MERN Architecture',
      desc: 'React, Node.js, Express, and MongoDB engineered for performance, strict typing, and clean separation of concerns.',
      icon: FiLayers,
    },
    {
      title: 'Practical AI Integrations',
      desc: 'Merging real-time LLM inference, dynamic prompt pipelines, and intelligent search into intuitive user workflows.',
      icon: FiCpu,
    },
    {
      title: 'Rigorous Security & RBAC',
      desc: 'Stateless JWT authentication, encrypted session handling, role-based route guards, and defensible security practices.',
      icon: FiShield,
    },
    {
      title: 'Production Infrastructure',
      desc: 'Dockerized microservices, high-throughput REST APIs, automated CI/CD deployment pipelines, and zero-downtime shipping.',
      icon: FiTerminal,
    },
  ];

  return (
    <section
      id="about"
      className="relative w-full py-28 px-6 sm:px-10 md:px-16 border-t border-white/[0.08] overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute top-1/2 -left-48 w-96 h-96 rounded-full bg-[#f97316]/5 blur-[120px]" />

      <div className="max-w-7xl mx-auto">
        {/* Section Tag */}
        <div className="flex items-center gap-3 text-xs font-mono tracking-[0.25em] text-[#f97316] uppercase mb-8">
          <span>PHILOSOPHY & IDENTITY</span>
        </div>

        {/* Large Editorial Heading */}
        <div className="mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-[clamp(2.6rem,7vw,6.5rem)] font-black uppercase tracking-tight text-[#EDEDED] leading-[0.92]"
          >
            I BUILD PRODUCTS THAT <br />
            <span className="text-white/40 hover:text-white transition-colors duration-500">
              SOLVE REAL PROBLEMS.
            </span>
          </motion.h2>
        </div>

        {/* Editorial Narrative Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Editorial Bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7 space-y-6 text-base sm:text-lg text-[#A3A3A3] leading-relaxed"
          >
            <p className="text-xl sm:text-2xl text-white font-medium leading-snug">
              I'm <span className="text-[#f97316] font-bold">{PERSONAL_INFO.name}</span>, a Computer Science Engineering
              graduate and MERN full-stack developer focused on building modern web
              applications, AI-powered products, and resilient software systems.
            </p>

            <p>
              Rather than assembling superficial templates, my engineering philosophy is rooted
              in deterministic architecture: typing every endpoint with TypeScript, organizing
              scalable database schemas with MongoDB, and sculpting reactive user interfaces
              with modern React and Tailwind CSS.
            </p>

            <p>
              From architecting multi-tenant agency tracking engines in <strong className="text-white">TrackPro</strong> to
              building AI-assisted career accelerators in <strong className="text-white">GradJob</strong>, I specialize
              in bridging the gap between ruthless backend reliability (Node.js, Express, Docker, REST APIs)
              and cinematic, responsive frontend polish.
            </p>

            {/* Quick architectural pills */}
            <div className="pt-4 flex flex-wrap gap-2">
              {[
                'MERN Stack',
                'TypeScript',
                'AI Integration',
                'REST APIs',
                'Authentication & RBAC',
                'Docker',
                'Modern Frontend Architecture',
              ].map((pill) => (
                <span
                  key={pill}
                  className="px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono uppercase tracking-wider text-white/80"
                >
                  {pill}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right Column: 3D Cinematic Depth Card (21st.dev style) */}
          <div className="lg:col-span-5">
            <SpotlightCard
              spotlightColor="rgba(249, 115, 22, 0.16)"
              className="p-8 border border-white/15 bg-gradient-to-b from-[#111111] to-[#070707]"
            >
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#f97316]" />
                  <span className="text-xs font-mono uppercase tracking-widest text-white/70">
                    ENGINEERING CORE
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-white/5 border border-white/10 text-white/50">
                  SYS_VER 2.5
                </span>
              </div>

              <div className="mt-6 space-y-6">
                {corePrinciples.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="flex items-start gap-4 group">
                      <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-[#f97316] group-hover:bg-[#f97316] group-hover:text-black transition-all duration-300 shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white tracking-wide group-hover:text-[#f97316] transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-xs text-[#8E8E8E] leading-relaxed mt-1">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/50">
                <span>EDUCATION</span>
                <span className="text-white font-semibold">{PERSONAL_INFO.degree}</span>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </div>
    </section>
  );
}
