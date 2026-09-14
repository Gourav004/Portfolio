import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  enableTilt?: boolean;
  id?: string;
  onClick?: () => void;
  dataCursor?: string;
}

export function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(249, 115, 22, 0.12)',
  enableTilt = true,
  id,
  onClick,
  dataCursor,
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Spotlight position relative to the card
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Tilt coordinates (-1 to 1)
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 200 };
  const smoothTiltX = useSpring(tiltX, springConfig);
  const smoothTiltY = useSpring(tiltY, springConfig);

  // Transform to subtle degrees (±7 deg)
  const rotateX = useTransform(smoothTiltY, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(smoothTiltX, [-0.5, 0.5], [-6, 6]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mouseX.set(x);
    mouseY.set(y);

    if (enableTilt) {
      const normalizedX = x / rect.width - 0.5;
      const normalizedY = y / rect.height - 0.5;
      tiltX.set(normalizedX);
      tiltY.set(normalizedY);
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    tiltX.set(0);
    tiltY.set(0);
  };

  return (
    <div
      style={{ perspective: 1200 }}
      className="relative w-full"
    >
      <motion.div
        ref={cardRef}
        id={id}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: enableTilt ? rotateX : 0,
          rotateY: enableTilt ? rotateY : 0,
          transformStyle: 'preserve-3d',
        }}
        data-cursor={dataCursor}
        className={`relative overflow-hidden rounded-2xl bg-[#0b0b0b]/90 border border-white/[0.08] transition-colors duration-300 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-md ${className}`}
      >
        {/* Dynamic Spotlight Radial Gradient */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(550px circle at ${mouseX.get()}px ${mouseY.get()}px, ${spotlightColor}, transparent 70%)`,
          }}
        />

        {/* Dynamic Border Glow on hover */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl border border-white/20 opacity-0 transition-opacity duration-300"
          style={{ opacity: isHovered ? 0.6 : 0 }}
        />

        {/* Satin internal highlight along top edge */}
        <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        {/* Card Content */}
        <div className="relative z-10">{children}</div>
      </motion.div>
    </div>
  );
}
