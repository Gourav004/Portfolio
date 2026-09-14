import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { REAL_PROJECTS } from '../../data/portfolio-data';
import { Project } from '../../types';
import {
  FiExternalLink,
  FiCheck,
  FiLayers,
  FiCpu,
  FiTerminal,
  FiShield,
  FiActivity,
  FiTrendingUp,
  FiUsers,
  FiFileText,
  FiBell,
  FiBriefcase,
  FiSearch,
} from 'react-icons/fi';
import { SpotlightCard } from '../ui/spotlight-card';
import { MagneticButton } from '../ui/magnetic-button';

gsap.registerPlugin(ScrollTrigger);

export function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<{ [key: string]: 'overview' | 'features' | 'architecture' }>({
    trackpro: 'overview',
    gradjob: 'overview',
  });

  useEffect(() => {
    // Only enable GSAP pinned horizontal scroll on large screens (desktop >= 1024px)
    const mm = gsap.matchMedia();

    mm.add('(min-width: 1024px)', () => {
      const pinContainer = containerRef.current;
      const section = sectionRef.current;
      if (!pinContainer || !section) return;

      const totalWidth = pinContainer.scrollWidth - window.innerWidth;

      const tween = gsap.to(pinContainer, {
        x: () => -totalWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 0.8,
          start: 'top top',
          end: () => `+=${totalWidth + 400}`,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        tween.kill();
        ScrollTrigger.getAll().forEach((t) => {
          if (t.trigger === section) t.kill();
        });
      };
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative w-full py-20 lg:py-0 min-h-screen bg-[#060606] overflow-hidden border-t border-white/[0.08]"
    >
      {/* Background Ambient Glows */}
      <div className="pointer-events-none absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-[#f97316]/5 blur-[140px] -z-10" />

      {/* Top Section Header (Pinned on desktop or stationary) */}
      <div className="px-6 sm:px-10 md:px-16 pt-8 pb-4 lg:pt-14 max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono tracking-[0.25em] text-[#f97316] uppercase mb-2">
            <span>FEATURED PRODUCTION WORK</span>
          </div>
          <h2 className="text-[clamp(2.4rem,6vw,5.5rem)] font-black uppercase tracking-tight text-white leading-none">
            PRODUCTION WORK<span className="text-[#f97316]">.</span>
          </h2>
        </div>
        <div className="text-xs font-mono text-[#8E8E8E] uppercase tracking-widest flex items-center gap-3">
          <span className="hidden lg:inline">HORIZONTAL CINEMATIC TIMELINE</span>
          <span className="px-2 py-0.5 rounded bg-white/10 text-white">2 LIVE DEPLOYMENTS</span>
        </div>
      </div>

      {/* Horizontal Container (Desktop) / Vertical Stack (Mobile) */}
      <div
        ref={containerRef}
        className="flex flex-col lg:flex-row items-stretch lg:items-center px-6 sm:px-10 md:px-16 lg:px-20 gap-12 lg:gap-20 py-8 lg:py-16 w-full lg:w-max min-h-[75vh]"
      >
        {REAL_PROJECTS.map((project) => (
          <div
            key={project.id}
            data-cursor="project"
            className="w-full lg:w-[88vw] lg:max-w-[1150px] shrink-0"
          >
            <SpotlightCard
              spotlightColor="rgba(249, 115, 22, 0.14)"
              className="p-6 sm:p-10 border border-white/15 bg-gradient-to-b from-[#0f0f0f] via-[#090909] to-[#050505]"
            >
              {/* Project Meta Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 rounded-full bg-[#f97316] shadow-[0_0_12px_#f97316]" />
                  <div>
                    <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight uppercase">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#A3A3A3] font-medium">
                      {project.tagline}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="link"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-black text-xs uppercase tracking-wider hover:bg-[#f97316] hover:text-white transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                  >
                    <span>OPEN LIVE PROJECT</span>
                    <FiExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Main Case Study Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8 items-start">
                {/* Left: Device / Interactive Browser Mockup */}
                <div className="lg:col-span-7">
                  <div className="rounded-2xl border border-white/15 bg-[#080808] overflow-hidden shadow-2xl">
                    {/* Browser Chrome Header */}
                    <div className="flex items-center justify-between px-4 py-2.5 bg-[#141414] border-b border-white/10">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                        <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                      </div>
                      <div className="text-[11px] font-mono text-white/50 px-4 py-0.5 rounded-md bg-black/40 border border-white/5 truncate max-w-[260px] sm:max-w-xs">
                        {project.liveUrl}
                      </div>
                      <div className="w-8" />
                    </div>

                    {/* Interactive Mockup Display */}
                    <div className="p-6 bg-gradient-to-b from-[#0b0b0b] to-[#040404] min-h-[300px] flex flex-col justify-between">
                      {project.id === 'trackpro' ? (
                        /* TrackPro Simulated Agency Dashboard Screen */
                        <div className="space-y-4">
                          <div className="flex items-center justify-between pb-3 border-b border-white/10">
                            <div className="flex items-center gap-2.5">
                              <div className="w-7 h-7 rounded-lg bg-[#f97316]/20 border border-[#f97316]/40 flex items-center justify-center text-[#f97316] text-xs font-black">
                                TP
                              </div>
                              <span className="text-xs font-bold text-white tracking-wide">
                                Agency Project Command Center
                              </span>
                            </div>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                              LIVE PIPELINE
                            </span>
                          </div>

                          {/* Quick simulated stats */}
                          <div className="grid grid-cols-3 gap-2.5">
                            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                              <div className="flex items-center justify-between text-[10px] text-white/60">
                                <span>Active Projects</span>
                                <FiActivity className="text-[#f97316]" />
                              </div>
                              <div className="text-lg font-black text-white mt-1">12</div>
                              <div className="text-[9px] text-emerald-400 mt-0.5">3 due this week</div>
                            </div>
                            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                              <div className="flex items-center justify-between text-[10px] text-white/60">
                                <span>Freelancers</span>
                                <FiUsers className="text-[#f97316]" />
                              </div>
                              <div className="text-lg font-black text-white mt-1">28</div>
                              <div className="text-[9px] text-white/50 mt-0.5">85% allocated</div>
                            </div>
                            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                              <div className="flex items-center justify-between text-[10px] text-white/60">
                                <span>Pending Invoices</span>
                                <FiFileText className="text-[#f97316]" />
                              </div>
                              <div className="text-lg font-black text-white mt-1">$48.2k</div>
                              <div className="text-[9px] text-amber-400 mt-0.5">Automated sync</div>
                            </div>
                          </div>

                          {/* Live milestone list item preview */}
                          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-semibold text-white">Milestone: Alpha Sprint Delivery</span>
                              <span className="text-[10px] font-mono text-[#f97316]">92% Complete</span>
                            </div>
                            <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-[#f97316] to-amber-300 w-[92%]" />
                            </div>
                            <div className="flex items-center justify-between text-[10px] text-white/50">
                              <span>Client: FinTech Studio Corp</span>
                              <span>Feedback: Approved with revisions</span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        /* GradJob Simulated AI Recruitment Screen */
                        <div className="space-y-4">
                          <div className="flex items-center justify-between pb-3 border-b border-white/10">
                            <div className="flex items-center gap-2.5">
                              <div className="w-7 h-7 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white text-xs font-black">
                                GJ
                              </div>
                              <span className="text-xs font-bold text-white tracking-wide">
                                GradJob AI Student Portal
                              </span>
                            </div>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#f97316]/20 text-[#f97316] border border-[#f97316]/30">
                              AI AGENT ACTIVE
                            </span>
                          </div>

                          {/* AI Job Match & Resume Score Preview */}
                          <div className="grid grid-cols-3 gap-2.5">
                            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                              <div className="flex items-center justify-between text-[10px] text-white/60">
                                <span>Resume Fit Score</span>
                                <FiCpu className="text-[#f97316]" />
                              </div>
                              <div className="text-lg font-black text-white mt-1">96/100</div>
                              <div className="text-[9px] text-emerald-400 mt-0.5">Optimized for ATS</div>
                            </div>
                            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                              <div className="flex items-center justify-between text-[10px] text-white/60">
                                <span>Applications</span>
                                <FiBriefcase className="text-[#f97316]" />
                              </div>
                              <div className="text-lg font-black text-white mt-1">18</div>
                              <div className="text-[9px] text-white/50 mt-0.5">5 interview rounds</div>
                            </div>
                            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                              <div className="flex items-center justify-between text-[10px] text-white/60">
                                <span>Mock Prep</span>
                                <FiTrendingUp className="text-[#f97316]" />
                              </div>
                              <div className="text-lg font-black text-white mt-1">8 Runs</div>
                              <div className="text-[9px] text-amber-400 mt-0.5">AI feedback logged</div>
                            </div>
                          </div>

                          {/* AI Assistant Chat Preview */}
                          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/10 space-y-1.5">
                            <div className="flex items-center gap-1.5 text-[10px] text-[#f97316] font-mono uppercase">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#f97316]" />
                              AI Resume Assistant Suggestion
                            </div>
                            <p className="text-xs text-white/80 italic">
                              "Quantify your backend throughput in project section: Mention handling 250+ requests/sec with Express & MongoDB indexing to boost recruiter visibility."
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Mockup footer with tech stack tags */}
                      <div className="pt-4 mt-2 border-t border-white/10 flex flex-wrap gap-1.5">
                        {project.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/70"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Case Study Narrative & Deep Architectural Specs */}
                <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                  <div>
                    {/* Navigation Tabs for Deep Dive */}
                    <div className="flex items-center gap-2 pb-4 border-b border-white/10">
                      {(['overview', 'features', 'architecture'] as const).map((tab) => (
                        <button
                          key={tab}
                          type="button"
                          onClick={() =>
                            setActiveTab((prev) => ({ ...prev, [project.id]: tab }))
                          }
                          className={`px-3 py-1 text-xs uppercase font-bold tracking-wider rounded-lg transition-colors cursor-pointer ${
                            activeTab[project.id] === tab
                              ? 'bg-white/15 text-white'
                              : 'text-white/40 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>

                    {/* Tab 1: Overview */}
                    {activeTab[project.id] === 'overview' && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4 pt-4"
                      >
                        <p className="text-sm sm:text-base text-[#B0B0B0] leading-relaxed">
                          {project.description}
                        </p>

                        <div className="grid grid-cols-2 gap-3 pt-2">
                          {project.metrics.map((metric, idx) => (
                            <div key={idx} className="p-3 rounded-xl bg-white/[0.02] border border-white/10">
                              <div className="text-[10px] font-mono text-[#8E8E8E] uppercase">
                                {metric.label}
                              </div>
                              <div className="text-xs font-bold text-white mt-0.5">
                                {metric.value}
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* Tab 2: Features */}
                    {activeTab[project.id] === 'features' && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-2.5 pt-4"
                      >
                        {project.highlights.map((highlight, idx) => (
                          <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-white/80">
                            <FiCheck className="w-4 h-4 text-[#f97316] shrink-0 mt-0.5" />
                            <span>{highlight}</span>
                          </div>
                        ))}
                      </motion.div>
                    )}

                    {/* Tab 3: Architecture Specs */}
                    {activeTab[project.id] === 'architecture' && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-3 pt-4 font-mono text-xs"
                      >
                        <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/10">
                          <span className="text-[#f97316] font-bold">FRONTEND: </span>
                          <span className="text-white/80">{project.architecture.frontend}</span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/10">
                          <span className="text-[#f97316] font-bold">BACKEND: </span>
                          <span className="text-white/80">{project.architecture.backend}</span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/10">
                          <span className="text-[#f97316] font-bold">DATABASE: </span>
                          <span className="text-white/80">{project.architecture.database}</span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/10">
                          <span className="text-[#f97316] font-bold">SECURITY: </span>
                          <span className="text-white/80">{project.architecture.auth}</span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/10">
                          <span className="text-[#f97316] font-bold">SYSTEM: </span>
                          <span className="text-white/80">{project.architecture.extra}</span>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Primary CTA */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <div className="text-xs font-mono text-[#737373]">
                      PRODUCTION VERIFIED
                    </div>
                    <MagneticButton
                      size="md"
                      variant="primary"
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs"
                    >
                      <span>LAUNCH</span>
                      <FiExternalLink className="w-3.5 h-3.5" />
                    </MagneticButton>
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </div>
        ))}
      </div>
    </section>
  );
}
