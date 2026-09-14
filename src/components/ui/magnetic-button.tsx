import React, { useRef, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  id?: string;
  dataCursor?: string;
}

export function MagneticButton({
  children,
  onClick,
  href,
  target,
  rel,
  variant = 'primary',
  className = '',
  size = 'md',
  id,
  dataCursor = 'interactive',
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Position offset for magnetic pull
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 180, mass: 0.1 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    // Subtle magnetic strength (within bounding box)
    x.set(distanceX * 0.35);
    y.set(distanceY * 0.35);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const sizeStyles = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-sm tracking-wider',
    lg: 'px-8 py-4 text-base tracking-widest',
  }[size];

  const variantStyles = {
    primary:
      'bg-[#EDEDED] text-[#050505] font-bold border border-white/80 hover:bg-white hover:shadow-[0_0_25px_rgba(255,255,255,0.25)]',
    secondary:
      'bg-[#121212] text-[#EDEDED] font-medium border border-white/15 hover:border-white/40 hover:bg-[#181818]',
    ghost:
      'bg-transparent text-[#A3A3A3] font-medium hover:text-white hover:bg-white/5 border border-transparent',
    outline:
      'bg-transparent text-[#f97316] font-semibold border border-[#f97316]/50 hover:bg-[#f97316]/10 hover:border-[#f97316]',
  }[variant];

  const Content = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ x: smoothX, y: smoothY }}
      className="inline-block relative select-none cursor-pointer"
      data-cursor={dataCursor}
    >
      <div
        className={`relative inline-flex items-center justify-center rounded-full overflow-hidden transition-all duration-300 font-bold uppercase ${sizeStyles} ${variantStyles} ${className}`}
      >
        {/* Light sweep reflection on hover */}
        <div
          className={`absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 pointer-events-none ${
            isHovered ? 'translate-x-full' : ''
          }`}
        />

        {/* Button Inner Content */}
        <span className="relative z-10 flex items-center gap-2.5 whitespace-nowrap">
          {children}
        </span>
      </div>
    </motion.div>
  );

  if (href) {
    return (
      <a
        id={id}
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
        className="inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f97316]"
      >
        {Content}
      </a>
    );
  }

  return (
    <button
      id={id}
      type="button"
      onClick={onClick}
      className="inline-block bg-transparent border-0 p-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f97316] rounded-full"
    >
      {Content}
    </button>
  );
}
