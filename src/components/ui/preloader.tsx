import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // Fast, cinematic 1.2s loader sequence
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsFinished(true);
            setTimeout(onComplete, 500);
          }, 200);
          return 100;
        }
        // Accelerating curve
        const increment = Math.floor(Math.random() * 18) + 8;
        return Math.min(prev + increment, 100);
      });
    }, 60);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            y: -20,
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
          }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#050505] select-none pointer-events-auto"
        >
          {/* Ambient Glow behind title */}
          <div className="absolute w-72 h-72 rounded-full bg-[#f97316]/10 blur-[90px] pointer-events-none" />

          {/* Large Editorial Monogram / Name */}
          <div className="relative overflow-hidden mb-6">
            <motion.h1
              initial={{ y: 60, opacity: 0, filter: 'blur(10px)' }}
              animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter text-[#EDEDED] uppercase"
            >
              GOURAV<span className="text-[#f97316]">.</span>
            </motion.h1>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-xs font-mono uppercase tracking-[0.3em] text-[#A3A3A3] mb-8"
          >
            MERN • AI • SYSTEMS
          </motion.p>

          {/* Thin Glowing Progress Bar */}
          <div className="w-56 sm:w-72 h-[2px] bg-white/10 rounded-full overflow-hidden relative">
            <motion.div
              style={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-[#f97316] via-white to-[#f97316] shadow-[0_0_12px_rgba(249,115,22,0.8)] transition-all duration-75 ease-out"
            />
          </div>

          {/* Numeric counter */}
          <div className="mt-3 font-mono text-[11px] text-[#737373]">
            {progress}%
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
