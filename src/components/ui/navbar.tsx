import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FiArrowUpRight, FiMenu, FiX } from 'react-icons/fi';
import { MagneticButton } from './magnetic-button';

const NAV_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#journey' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Simple active link spy
      const sections = ['hero', 'about', 'projects', 'skills', 'journey', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-center transition-all duration-500 pointer-events-none ${
          scrolled ? 'py-3 sm:py-4' : 'py-6 sm:py-8'
        }`}
      >
        <div
          className={`pointer-events-auto flex items-center justify-between transition-all duration-500 ${
            scrolled
              ? 'w-[94%] max-w-5xl px-4 sm:px-6 py-2.5 rounded-full bg-[#080808]/85 backdrop-blur-xl border border-white/[0.12] shadow-[0_10px_35px_rgba(0,0,0,0.6)]'
              : 'w-[92%] max-w-7xl px-2 sm:px-4 py-2 bg-transparent border-transparent'
          }`}
        >
          {/* Logo / Monogram */}
          <a
            href="#hero"
            onClick={(e) => scrollToSection(e, '#hero')}
            className="flex items-center gap-2 group"
          >
            <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-xs font-black text-white group-hover:bg-[#f97316] group-hover:text-black group-hover:border-[#f97316] transition-all duration-300">
              G
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-black tracking-tight text-white group-hover:text-[#f97316] transition-colors">
                GOURAV<span className="text-[#f97316]">.</span>
              </span>
              <span className="text-[9px] uppercase tracking-widest text-[#737373] -mt-0.5">
                Full-Stack
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 rounded-full px-3 py-1 bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`relative px-4 py-1.5 text-xs uppercase tracking-widest font-semibold transition-all duration-200 ${
                    isActive ? 'text-white' : 'text-[#8E8E8E] hover:text-white'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 rounded-full bg-white/10 border border-white/10 -z-10"
                      transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action */}
          <div className="hidden sm:flex items-center gap-3">
            <MagneticButton
              size="sm"
              variant="primary"
              onClick={() => {
                const contactEl = document.getElementById('contact');
                contactEl?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-xs"
            >
              <span>LET'S TALK</span>
              <FiArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </MagneticButton>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full text-white/80 hover:text-white bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Full-screen Dark Editorial Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-40 bg-[#050505]/98 backdrop-blur-2xl flex flex-col justify-between px-8 py-12 md:hidden"
          >
            {/* Header in overlay */}
            <div className="flex items-center justify-between pt-4">
              <div className="text-xs font-mono tracking-widest uppercase text-[#f97316]">
                NAVIGATION
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-full bg-white/10 text-white"
                aria-label="Close menu"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>

            {/* Staggered Links */}
            <nav className="flex flex-col gap-5 my-auto">
              {NAV_LINKS.map((link, idx) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + idx * 0.07, duration: 0.4 }}
                  className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white/85 hover:text-[#f97316] flex items-center justify-between group"
                >
                  <span>{link.label}</span>
                  <span className="text-sm font-mono text-white/30 group-hover:text-[#f97316]">
                    →
                  </span>
                </motion.a>
              ))}
            </nav>

            {/* Bottom info */}
            <div className="pt-6 border-t border-white/10 flex flex-col gap-4">
              <div className="text-xs text-[#8E8E8E]">
                Direct Inquiries: <a href="mailto:gouravthakurpp@gmail.com" className="text-white underline">gouravthakurpp@gmail.com</a>
              </div>
              <MagneticButton
                size="md"
                variant="primary"
                onClick={() => {
                  setMobileMenuOpen(false);
                  const contactEl = document.getElementById('contact');
                  contactEl?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span>LET'S TALK →</span>
              </MagneticButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
