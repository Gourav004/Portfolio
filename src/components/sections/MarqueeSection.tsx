import { MarqueeRow } from '../ui/marquee';
import { MARQUEE_ROWS } from '../../data/portfolio-data';

export function MarqueeSection() {
  return (
    <section className="relative w-full py-20 border-t border-b border-white/[0.08] overflow-hidden bg-[#050505] select-none">
      {/* Dynamic Background Ambient Light */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-48 rounded-full bg-[#f97316]/10 blur-[120px] -z-10" />

      {/* Row 1: Left - Slower Speed & Vibrant Orange */}
      <MarqueeRow
        items={MARQUEE_ROWS[0]}
        direction="left"
        speed={60}
        itemClassName="text-4xl sm:text-6xl md:text-7xl font-black text-[#f97316] hover:text-[#ffedd5] transition-colors"
        separator="✦"
      />

      {/* Row 2: Right - Slower Speed & Deep Amber Orange */}
      <MarqueeRow
        items={MARQUEE_ROWS[1]}
        direction="right"
        speed={72}
        itemClassName="text-3xl sm:text-5xl md:text-6xl font-black text-[#ea580c] hover:text-[#fed7aa] transition-colors"
        separator="◆"
        className="py-2"
      />

      {/* Row 3: Left - Slower Speed & Bright Peach Orange */}
      <MarqueeRow
        items={MARQUEE_ROWS[2]}
        direction="left"
        speed={66}
        itemClassName="text-4xl sm:text-6xl md:text-7xl font-black text-[#fb923c] hover:text-white transition-colors"
        separator="✦"
      />
    </section>
  );
}
