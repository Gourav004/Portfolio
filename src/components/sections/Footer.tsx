import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { PERSONAL_INFO } from '../../data/portfolio-data';
import { FiArrowUp, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';

export function Footer() {
  const [istTime, setIstTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format to IST
      const timeStr = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      }).format(now);
      setIstTime(timeStr);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full pt-20 pb-12 px-6 sm:px-10 md:px-16 bg-[#040404] border-t border-white/[0.08] overflow-hidden select-none">
      {/* Dynamic Animated Gradient Background */}
      <div className="pointer-events-none absolute -bottom-40 left-1/2 -translate-x-1/2 w-[90vw] h-[350px] rounded-full bg-gradient-to-t from-[#f97316]/10 via-amber-500/5 to-transparent blur-[140px] -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Top Info Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-12 border-b border-white/[0.08]">
          <div className="flex items-center gap-4">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <div className="text-xs font-mono uppercase tracking-widest text-[#A3A3A3]">
              LIVE IN INDIA • <span className="text-white font-bold">{istTime} IST</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#A3A3A3] hover:text-white transition-colors group"
            >
              <FiGithub className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>GitHub</span>
            </a>

            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#A3A3A3] hover:text-white transition-colors group"
            >
              <FiLinkedin className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>LinkedIn</span>
            </a>

            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#A3A3A3] hover:text-[#f97316] transition-colors group"
            >
              <FiMail className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>Email</span>
            </a>

            <button
              type="button"
              onClick={scrollToTop}
              className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-all ml-2 cursor-pointer"
              aria-label="Scroll back to top"
            >
              <FiArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Huge Editorial Footer Typography */}
        <div className="pt-16 pb-12 text-center md:text-left">
          <p className="text-xs font-mono tracking-[0.3em] uppercase text-[#f97316] mb-4">
            LET'S BUILD SOMETHING GREAT
          </p>

          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: 80, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(4.2rem,16vw,17rem)] font-black uppercase tracking-tighter text-[#EDEDED] leading-none hover:text-white transition-colors duration-500"
            >
              GOURAV<span className="text-[#f97316]">.</span>
            </motion.h1>
          </div>
        </div>

        {/* Bottom Legal */}
        <div className="pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#737373]">
          <div>
            © {new Date().getFullYear()} Gourav. All rights reserved.
          </div>
          <div className="text-white/40">
            Engineered with precision.
          </div>
        </div>
      </div>
    </footer>
  );
}
