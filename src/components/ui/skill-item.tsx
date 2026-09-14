import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'motion/react';

export interface SkillItemProps {
  name: string;
  logoUrl: string;
  accent: string;
  size?: 'giant' | 'large' | 'medium';
  className?: string;
  index?: number;
}

export function SkillItem({
  name,
  logoUrl,
  accent,
  size = 'large',
  className = '',
  index = 0,
}: SkillItemProps) {
  const itemRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Smooth mouse-following motion values (limits: X ±20px, Y ±15px)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 18, stiffness: 180, mass: 0.6 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!itemRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) / (rect.width / 2 || 1);
    const deltaY = (e.clientY - centerY) / (rect.height / 2 || 1);

    mouseX.set(Math.max(-20, Math.min(20, deltaX * 20)));
    mouseY.set(Math.max(-15, Math.min(15, deltaY * 15)));
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  // Mobile / touch support: toggle on tap
  const handleTouchToggle = () => {
    setIsHovered((prev) => !prev);
  };

  // Typographic scale definitions
  const typographyStyles = {
    giant: 'text-[clamp(2.2rem,5.5vw,5.2rem)] font-black tracking-tight text-white/90',
    large: 'text-[clamp(1.85rem,4.2vw,4rem)] font-black tracking-tight text-white/80',
    medium: 'text-[clamp(1.5rem,3.2vw,3rem)] font-extrabold tracking-normal text-white/75',
  }[size];

  // Responsive floating logo dimension map
  const logoDimension = {
    giant: 'w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36',
    large: 'w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32',
    medium: 'w-16 h-16 sm:w-20 sm:h-20 md:w-22 md:h-22 lg:w-26 lg:h-26',
  }[size];

  return (
    <motion.div
      layout
      ref={itemRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{
        duration: 0.5,
        delay: index * 0.04,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`relative inline-block select-none cursor-pointer group ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleTouchToggle}
      tabIndex={0}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
      role="button"
      aria-label={name}
    >
      {/* ======================================================= */}
      {/* FLOATING LOGO ONLY (No text, no card, no category, no tooltip) */}
      {/* ======================================================= */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            key="floating-brand-logo"
            initial={{
              opacity: 0,
              scale: 0.65,
              y: 15,
              rotate: -5,
              filter: 'blur(8px)',
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              rotate: 0,
              filter: 'blur(0px)',
            }}
            exit={{
              opacity: 0,
              scale: 0.65,
              y: -10,
              rotate: 3,
              filter: 'blur(6px)',
              transition: { duration: 0.22, ease: 'easeOut' },
            }}
            transition={{
              duration: 0.3,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{
              x: smoothX,
              y: smoothY,
            }}
            className="pointer-events-none absolute -top-20 sm:-top-24 md:-top-28 lg:-top-32 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center select-none"
          >
            {/* Atmospheric continuous subtle vertical float loop: 0 -> -6px -> 0 */}
            <motion.div
              animate={{
                y: [0, -6, 0],
              }}
              transition={{
                duration: 2.6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="relative flex items-center justify-center"
            >
              {/* Soft ambient brand glow providing depth without overwhelming */}
              <div
                className="pointer-events-none absolute inset-0 rounded-full blur-2xl opacity-40 scale-125 -z-10"
                style={{ backgroundColor: accent }}
              />

              {/* Real Official Technology Logo */}
              <img
                src={logoUrl}
                alt={`${name} brand logo`}
                className={`${logoDimension} object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.85)]`}
                style={{
                  filter: `drop-shadow(0 14px 28px rgba(0,0,0,0.85)) drop-shadow(0 0 18px ${accent}45)`,
                }}
                referrerPolicy="no-referrer"
                loading="eager"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ======================================================= */}
      {/* DEFAULT STATE: ONLY THE TYPOGRAPHIC SKILL NAME           */}
      {/* NO icons, NO cards, NO pills, NO tags, NO descriptions   */}
      {/* ======================================================= */}
      <motion.span
        animate={{
          scale: isHovered ? 1.03 : 1,
          y: isHovered ? -2 : 0,
        }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className={`inline-block transition-colors duration-300 font-roboto ${typographyStyles} ${
          isHovered ? 'text-white' : 'text-white/70 hover:text-white'
        }`}
        style={{
          textShadow: isHovered
            ? `0 0 25px rgba(255, 255, 255, 0.25), 0 0 45px ${accent}25`
            : 'none',
        }}
      >
        {name}
      </motion.span>
    </motion.div>
  );
}
