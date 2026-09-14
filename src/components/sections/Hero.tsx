import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { FiArrowDown, FiArrowUpRight } from 'react-icons/fi';
import { MagneticButton } from '../ui/magnetic-button';
import { PERSONAL_INFO } from '../../data/portfolio-data';

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  // Parallax on scroll
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.7], [1, 0.94]);
  const heroY = useTransform(scrollYProgress, [0, 0.7], [0, 100]);

  // Container variants for staggered entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const lineVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      filter: 'blur(12px)',
      rotateX: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      rotateX: 0,
      transition: {
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  const scrollToWork = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-[100vh] w-full flex flex-col justify-between pt-32 pb-12 px-6 sm:px-10 md:px-16 overflow-hidden select-none"
    >
      {/* Dynamic atmospheric radial spotlight in the hero center with rich glowing ambient background */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] max-w-[1100px] h-[650px] rounded-full bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.18)_0%,rgba(234,88,12,0.08)_35%,rgba(255,255,255,0.02)_60%,transparent_80%)] blur-[130px] -z-10" />
      <div className="pointer-events-none absolute top-1/2 -right-20 w-[450px] h-[450px] rounded-full bg-[#f97316]/10 blur-[100px] -z-10" />

      {/* Top Meta Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full flex items-center justify-between border-b border-white/[0.08] pb-6"
      >
        <div className="flex items-center gap-3">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="text-xs uppercase tracking-[0.25em] font-medium text-[#A3A3A3]">
            {PERSONAL_INFO.availability}
          </span>
        </div>
      </motion.div>

      {/* Center Giant Editorial Typography */}
      <motion.div
        style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="my-auto py-8 sm:py-12"
      >
        {/* Giant Headings */}
        <div className="flex flex-col tracking-tighter uppercase font-black text-[#EDEDED] leading-[0.88]">
          <motion.div
            variants={lineVariants}
            className="text-[clamp(3.2rem,9.5vw,9.8rem)] overflow-hidden"
          >
            BUILDING
          </motion.div>

          <motion.div
            variants={lineVariants}
            className="text-[clamp(3.2rem,9.5vw,9.8rem)] overflow-hidden flex items-baseline gap-4"
          >
            <span>DIGITAL</span>
            <span className="text-[#f97316] font-light italic tracking-normal text-[clamp(2rem,6vw,6rem)] font-mono">
              //
            </span>
            <span className="text-white/40">SYSTEMS.</span>
          </motion.div>

          <motion.div
            variants={lineVariants}
            className="text-[clamp(3.2rem,9.5vw,9.8rem)] text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-[#737373] overflow-hidden"
          >
            FULL-STACK
          </motion.div>

          <motion.div
            variants={lineVariants}
            className="text-[clamp(3.2rem,9.5vw,9.8rem)] flex items-center gap-4 flex-wrap"
          >
            <span>ENGINEER</span>
            <span className="text-[#f97316]">.</span>
          </motion.div>
        </div>

        {/* Supporting Editorial Copy + CTAs */}
        <motion.div
          variants={lineVariants}
          className="mt-8 sm:mt-12 pt-6 border-t border-white/[0.08] grid grid-cols-1 lg:grid-cols-12 gap-8 items-end"
        >
          <div className="lg:col-span-7">
            <p className="text-base sm:text-lg md:text-xl text-[#A3A3A3] font-normal leading-relaxed max-w-2xl">
              I build production-ready web applications, AI-powered products, and
              scalable architectures designed to solve real-world problems with
              speed and craftsmanship.
            </p>
          </div>

          <div className="lg:col-span-5 flex flex-wrap items-center gap-4 lg:justify-end">
            <MagneticButton
              size="lg"
              variant="primary"
              onClick={scrollToWork}
              id="hero-cta-work"
            >
              <span>VIEW MY WORK</span>
              <FiArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-1" />
            </MagneticButton>

            <MagneticButton
              size="lg"
              variant="secondary"
              onClick={scrollToContact}
              id="hero-cta-talk"
            >
              <span>LET'S TALK</span>
              <FiArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </MagneticButton>
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom Status / Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="w-full flex items-center justify-between text-xs font-mono text-[#737373] uppercase tracking-widest pt-6 border-t border-white/[0.05]"
      >
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#f97316]" />
          <span>SCROLL TO EXPLORE ARCHITECTURE</span>
        </div>

        <div className="hidden sm:block">
          <span>CURATED ARCHITECTURE</span>
        </div>
      </motion.div>
    </section>
  );
}
