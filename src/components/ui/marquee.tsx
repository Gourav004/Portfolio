import React, { useState } from 'react';

interface MarqueeRowProps {
  items: string[];
  direction?: 'left' | 'right';
  speed?: number; // duration in seconds
  className?: string;
  itemClassName?: string;
  separator?: string;
}

export function MarqueeRow({
  items,
  direction = 'left',
  speed = 30,
  className = '',
  itemClassName = '',
  separator = '•',
}: MarqueeRowProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Duplicate items 4 times to ensure seamless infinite looping without glitches
  const repeatedItems = [...items, ...items, ...items, ...items];

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative flex w-full overflow-hidden select-none whitespace-nowrap py-3 ${className}`}
    >
      {/* Left/Right Fading Edge Masks */}
      <div className="pointer-events-none absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-[#050505] to-transparent z-10" />
      <div className="pointer-events-none absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-[#050505] to-transparent z-10" />

      <div
        className={`flex items-center shrink-0 ${
          direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'
        }`}
        style={{
          animationDuration: `${speed}s`,
          animationPlayState: isHovered ? 'paused' : 'running',
          willChange: 'transform',
        }}
      >
        {repeatedItems.map((item, idx) => (
          <div key={idx} className="flex items-center shrink-0">
            <span
              className={`font-black uppercase tracking-tight transition-colors duration-300 ${
                itemClassName || 'text-white/80 hover:text-[#f97316]'
              }`}
            >
              {item}
            </span>
            <span className="mx-6 text-orange-500/30 text-xs md:text-sm font-light select-none">
              {separator}
            </span>
          </div>
        ))}
      </div>

      <div
        aria-hidden="true"
        className={`flex items-center shrink-0 ${
          direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'
        }`}
        style={{
          animationDuration: `${speed}s`,
          animationPlayState: isHovered ? 'paused' : 'running',
          willChange: 'transform',
        }}
      >
        {repeatedItems.map((item, idx) => (
          <div key={`dup-${idx}`} className="flex items-center shrink-0">
            <span
              className={`font-black uppercase tracking-tight transition-colors duration-300 ${
                itemClassName || 'text-white/80 hover:text-[#f97316]'
              }`}
            >
              {item}
            </span>
            <span className="mx-6 text-orange-500/30 text-xs md:text-sm font-light select-none">
              {separator}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
