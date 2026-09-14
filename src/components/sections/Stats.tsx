import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { DEVELOPER_STATS } from '../../data/portfolio-data';
import { SpotlightCard } from '../ui/spotlight-card';

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 1600; // ms
    const stepTime = 25;
    const totalSteps = duration / stepTime;
    const increment = value / totalSteps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref} className="font-mono">
      {count}
      {suffix}
    </span>
  );
}

export function Stats() {
  return (
    <section className="relative w-full py-24 px-6 sm:px-10 md:px-16 border-t border-white/[0.08] overflow-hidden bg-[#070707]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-[0.25em] text-[#f97316] uppercase mb-3">
              <span>RIGOR & VERIFIED METRICS</span>
            </div>
            <h2 className="text-[clamp(2.4rem,5.5vw,5rem)] font-black uppercase tracking-tight text-white leading-none">
              BY THE NUMBERS<span className="text-[#f97316]">.</span>
            </h2>
          </div>
          <p className="text-xs font-mono text-[#737373] uppercase tracking-widest max-w-xs">
            Directly verified project milestones and algorithmic benchmarks.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {DEVELOPER_STATS.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <SpotlightCard
                spotlightColor="rgba(249, 115, 22, 0.14)"
                className="p-8 border border-white/10 bg-gradient-to-b from-[#111111] to-[#080808] flex flex-col justify-between min-h-[220px]"
              >
                <div>
                  <div className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tighter text-[#f97316]">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight mt-3">
                    {stat.label}
                  </h3>
                </div>

                <div className="pt-4 mt-4 border-t border-white/10 text-xs text-[#8E8E8E] leading-relaxed">
                  {stat.subtext}
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
