import { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';

interface CursorProps {
  cursorText?: string;
  cursorVariant?: 'default' | 'hover' | 'project' | 'link';
}

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(true);
  const [cursorText, setCursorText] = useState('');
  const [cursorVariant, setCursorVariant] = useState<'default' | 'hover' | 'project' | 'link'>('default');

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for fluid trailing
  const springX = useSpring(mouseX, { damping: 28, stiffness: 350 });
  const springY = useSpring(mouseY, { damping: 28, stiffness: 350 });

  const dotSpringX = useSpring(mouseX, { damping: 40, stiffness: 700 });
  const dotSpringY = useSpring(mouseY, { damping: 40, stiffness: 700 });

  useEffect(() => {
    // Disable custom cursor on touch devices or small screens
    const checkTouch = () => {
      const isTouchDevice =
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.innerWidth < 1024;
      setIsTouch(isTouchDevice);
    };

    checkTouch();
    window.addEventListener('resize', checkTouch);

    const onMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // Dynamic cursor behavior based on hovered elements
    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const projectEl = target.closest('[data-cursor="project"]');
      const linkEl = target.closest('[data-cursor="link"]') || target.closest('a[target="_blank"]');
      const interactiveEl = target.closest('button, a, input, textarea, select, [role="button"], [data-cursor="interactive"]');

      if (projectEl) {
        setCursorVariant('project');
        setCursorText('VIEW');
      } else if (linkEl) {
        setCursorVariant('link');
        setCursorText('OPEN →');
      } else if (interactiveEl) {
        setCursorVariant('hover');
        setCursorText('');
      } else {
        setCursorVariant('default');
        setCursorText('');
      }
    };

    window.addEventListener('mouseover', handleElementHover);

    return () => {
      window.removeEventListener('resize', checkTouch);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      window.removeEventListener('mouseover', handleElementHover);
    };
  }, [isVisible, mouseX, mouseY]);

  if (isTouch || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Outer Halo / Badge */}
      <motion.div
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width:
            cursorVariant === 'project'
              ? 84
              : cursorVariant === 'link'
              ? 92
              : cursorVariant === 'hover'
              ? 48
              : 32,
          height:
            cursorVariant === 'project'
              ? 84
              : cursorVariant === 'link'
              ? 38
              : cursorVariant === 'hover'
              ? 48
              : 32,
          backgroundColor:
            cursorVariant === 'project'
              ? 'rgba(249, 115, 22, 0.95)'
              : cursorVariant === 'link'
              ? 'rgba(255, 255, 255, 0.9)'
              : cursorVariant === 'hover'
              ? 'rgba(255, 255, 255, 0.08)'
              : 'transparent',
          borderColor:
            cursorVariant === 'project'
              ? '#f97316'
              : cursorVariant === 'link'
              ? '#ffffff'
              : cursorVariant === 'hover'
              ? 'rgba(249, 115, 22, 0.5)'
              : 'rgba(255, 255, 255, 0.25)',
          borderRadius: cursorVariant === 'link' ? '9999px' : '9999px',
        }}
        transition={{ type: 'spring', damping: 24, stiffness: 350 }}
        className="flex items-center justify-center border backdrop-blur-[1px] select-none text-center"
      >
        {cursorText && (
          <span
            className={`text-[11px] font-bold tracking-wider uppercase transition-opacity duration-200 ${
              cursorVariant === 'project'
                ? 'text-black font-black'
                : 'text-black font-bold'
            }`}
          >
            {cursorText}
          </span>
        )}
      </motion.div>

      {/* Center Precise Dot */}
      {cursorVariant === 'default' && (
        <motion.div
          style={{
            x: dotSpringX,
            y: dotSpringY,
            translateX: '-50%',
            translateY: '-50%',
          }}
          className="w-1.5 h-1.5 rounded-full bg-[#f97316]"
        />
      )}
    </div>
  );
}
