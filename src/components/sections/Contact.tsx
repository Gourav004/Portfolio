import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PERSONAL_INFO } from '../../data/portfolio-data';
import { BookingCalendar } from '../ui/booking-calendar';
import { MagneticButton } from '../ui/magnetic-button';
import { FiMail, FiCalendar, FiCopy, FiCheck, FiArrowUpRight } from 'react-icons/fi';

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const scrollToCalendar = () => {
    document.getElementById('booking-calendar-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="contact"
      className="relative w-full py-28 px-6 sm:px-10 md:px-16 border-t border-white/[0.08] overflow-hidden bg-[#060606]"
    >
      {/* Dynamic Background Spotlight */}
      <div className="pointer-events-none absolute bottom-10 left-1/2 -translate-x-1/2 w-[80vw] h-[500px] rounded-full bg-[#f97316]/8 blur-[160px] -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Section Tag */}
        <div className="flex items-center gap-3 text-xs font-mono tracking-[0.25em] text-[#f97316] uppercase mb-8">
          <span>CONNECT & COLLABORATE</span>
        </div>

        {/* Large Editorial CTA Heading */}
        <div className="mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-[clamp(2.6rem,7.5vw,7.5rem)] font-black uppercase tracking-tighter text-[#EDEDED] leading-[0.92]"
          >
            LET'S BUILD <br />
            SOMETHING <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f97316] via-amber-300 to-white">
              WORTH SHIPPING.
            </span>
          </motion.h2>
        </div>

        {/* Supporting Narrative & Direct Contact Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end pb-16 border-b border-white/[0.08]">
          <div className="lg:col-span-7 space-y-4">
            <p className="text-lg sm:text-xl text-[#A3A3A3] font-normal leading-relaxed max-w-xl">
              Have an idea, project, or full-time engineering opportunity?
              Let's talk. I am currently reviewing high-impact roles and ambitious web products.
            </p>

            {/* Email card with one-click copy */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="inline-flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#f97316]/50 transition-all text-sm font-mono text-white group"
              >
                <FiMail className="text-[#f97316] group-hover:scale-110 transition-transform" />
                <span>{PERSONAL_INFO.email}</span>
                <FiArrowUpRight className="w-3.5 h-3.5 text-white/40 group-hover:text-white transition-colors" />
              </a>

              <button
                type="button"
                onClick={copyEmail}
                className="px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/10 hover:bg-white/10 text-white/80 hover:text-white transition-colors text-xs font-mono flex items-center gap-2 cursor-pointer"
                aria-label="Copy email address"
              >
                {copied ? (
                  <>
                    <FiCheck className="text-emerald-400" />
                    <span className="text-emerald-400">COPIED</span>
                  </>
                ) : (
                  <>
                    <FiCopy />
                    <span>COPY EMAIL</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-wrap items-center gap-4 lg:justify-end">
            <MagneticButton
              size="lg"
              variant="primary"
              onClick={scrollToCalendar}
            >
              <FiCalendar className="w-4 h-4" />
              <span>BOOK A MEETING</span>
              <span className="text-xs">→</span>
            </MagneticButton>

            <MagneticButton
              size="lg"
              variant="secondary"
              href={`mailto:${PERSONAL_INFO.email}`}
            >
              <FiMail className="w-4 h-4" />
              <span>EMAIL ME</span>
              <span className="text-xs">→</span>
            </MagneticButton>
          </div>
        </div>

        {/* Embedded Reference-Style Interactive Calendar Section */}
        <div id="booking-calendar-section" className="pt-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
              INTERACTIVE SCHEDULER
            </h3>
            <p className="text-xs sm:text-sm text-[#8E8E8E] mt-2">
              Select your date and slot below to automatically format a priority meeting request.
            </p>
          </div>

          <BookingCalendar />
        </div>
      </div>
    </section>
  );
}
