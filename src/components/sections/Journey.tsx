import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { JOURNEY_MILESTONES } from '../../data/portfolio-data';
import { FiCheckCircle, FiCompass } from 'react-icons/fi';
import { SpotlightCard } from '../ui/spotlight-card';

export function Journey() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section
      id="journey"
      ref={containerRef}
      className="relative w-full py-28 px-6 sm:px-10 md:px-16 border-t border-white/[0.08] overflow-hidden bg-[#060606]"
    >
      {/* Ambient background blur */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-[#f97316]/5 blur-[160px] -z-10" />

      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center md:text-left mb-20">
          <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-mono tracking-[0.25em] text-[#f97316] uppercase mb-4">
            <FiCompass className="w-4 h-4" />
            <span>TRAJECTORY & EXPERIENCE</span>
          </div>
          <h2 className="text-[clamp(2.4rem,6vw,5.5rem)] font-black uppercase tracking-tight text-white leading-none">
            ENGINEERING JOURNEY<span className="text-[#f97316]">.</span>
          </h2>
          <p className="text-[#8E8E8E] text-base sm:text-lg mt-3 max-w-xl">
            From computer science fundamentals and algorithmic problem-solving to
            shipping end-to-end full-stack architectures and AI systems.
          </p>
        </div>

        {/* Dynamic Timeline Wrapper */}
        <div className="relative">
          {/* Base Background Track Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-white/10" />

          {/* Active Glowing Animated Beam */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-4 md:left-1/2 top-0 w-[2px] -translate-x-1/2 bg-gradient-to-b from-[#f97316] via-amber-300 to-[#f97316] shadow-[0_0_15px_rgba(249,115,22,0.8)] z-10 origin-top"
          />

          {/* Milestone Items */}
          <div className="space-y-16 sm:space-y-24">
            {JOURNEY_MILESTONES.map((milestone, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={milestone.title}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? 'md:flex-row-reverse' : ''
                  } gap-8 pl-12 md:pl-0`}
                >
                  {/* Center Node Indicator */}
                  <div className="absolute left-4 md:left-1/2 top-4 -translate-x-1/2 z-20 flex items-center justify-center">
                    <div className="w-5 h-5 rounded-full bg-[#050505] border-2 border-[#f97316] shadow-[0_0_15px_rgba(249,115,22,0.6)] flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="w-full md:w-[46%]">
                    <motion.div
                      initial={{ opacity: 0, y: 30, scale: 0.96 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                    >
                      <SpotlightCard
                        spotlightColor="rgba(249, 115, 22, 0.12)"
                        className="p-6 sm:p-8 border border-white/10 bg-[#0c0c0c]/90"
                      >
                        {/* Period & Stat header */}
                        <div className="flex items-center justify-between gap-2 pb-4 border-b border-white/10">
                          <span className="text-xs font-mono font-bold tracking-widest text-[#f97316] uppercase">
                            {milestone.period}
                          </span>
                          {milestone.stat && (
                            <span className="text-xs font-mono px-2.5 py-1 rounded bg-[#f97316]/10 text-[#f97316] border border-[#f97316]/20 font-bold">
                              {milestone.stat.value} {milestone.stat.label}
                            </span>
                          )}
                        </div>

                        {/* Title & Subtitle */}
                        <div className="mt-4">
                          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                            {milestone.title}
                          </h3>
                          <p className="text-xs sm:text-sm font-medium text-[#A3A3A3] mt-0.5">
                            {milestone.subtitle}
                          </p>
                        </div>

                        {/* Description / Bullet Points */}
                        {milestone.bullets && milestone.bullets.length > 0 ? (
                          <ul className="mt-4 space-y-2 text-xs sm:text-sm text-[#A3A3A3] leading-relaxed">
                            {milestone.bullets.map((b, bIdx) => (
                              <li key={bIdx} className="flex items-start gap-2">
                                <span className="text-[#f97316] font-bold mt-1 text-xs">•</span>
                                <span>{b}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-xs sm:text-sm text-[#8E8E8E] leading-relaxed mt-4">
                            {milestone.description}
                          </p>
                        )}

                        {/* Key Takeaway */}
                        <div className="mt-5 p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-start gap-2.5">
                          <FiCheckCircle className="w-4 h-4 text-[#f97316] shrink-0 mt-0.5" />
                          <span className="text-xs text-white/90 italic">
                            {milestone.keyTakeaway}
                          </span>
                        </div>

                        {/* Skills tag footer */}
                        <div className="mt-5 pt-4 border-t border-white/10 flex flex-wrap gap-1.5">
                          {milestone.skills.map((skill) => (
                            <span
                              key={skill}
                              className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/60"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </SpotlightCard>
                    </motion.div>
                  </div>

                  {/* Empty Spacer Column for layout symmetry on desktop */}
                  <div className="hidden md:block w-[46%]" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
