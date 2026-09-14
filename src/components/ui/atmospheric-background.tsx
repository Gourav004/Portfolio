import { useEffect, useRef, useState } from 'react';

export function AtmosphericBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mousePos, setMousePos] = useState({ x: -500, y: -500 });
  const targetMouse = useRef({ x: -500, y: -500 });
  const currentMouse = useRef({ x: -500, y: -500 });

  // Mouse tracking with smooth lerp
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetMouse.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let animationFrameId: number;
    const updateMouse = () => {
      // Smooth lerp for the ambient spotlight
      currentMouse.current.x += (targetMouse.current.x - currentMouse.current.x) * 0.08;
      currentMouse.current.y += (targetMouse.current.y - currentMouse.current.y) * 0.08;
      setMousePos({
        x: Math.round(currentMouse.current.x),
        y: Math.round(currentMouse.current.y),
      });
      animationFrameId = requestAnimationFrame(updateMouse);
    };

    animationFrameId = requestAnimationFrame(updateMouse);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Canvas floating ambient particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle setup
    const particleCount = Math.min(width > 768 ? 45 : 22, 50);
    const particles: Array<{
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      baseAlpha: number;
      alpha: number;
      color: string;
      pulseSpeed: number;
      pulseOffset: number;
    }> = [];

    const colors = [
      'rgba(249, 115, 22, ', // amber orange
      'rgba(255, 255, 255, ', // silver white
      'rgba(217, 119, 6, ',  // warm ochre
      'rgba(168, 162, 158, ', // muted charcoal/silver
    ];

    for (let i = 0; i < particleCount; i++) {
      const isAmber = Math.random() > 0.65;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.6 + 0.6,
        vx: (Math.random() - 0.5) * 0.15,
        vy: -Math.random() * 0.25 - 0.05, // subtle upward drift
        baseAlpha: Math.random() * 0.35 + 0.1,
        alpha: Math.random() * 0.35 + 0.1,
        color: isAmber ? colors[0] : colors[1],
        pulseSpeed: Math.random() * 0.02 + 0.008,
        pulseOffset: Math.random() * Math.PI * 2,
      });
    }

    let frameId: number;
    let time = 0;

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around boundaries
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Subtle alpha breathing
        p.alpha = p.baseAlpha + Math.sin(time * p.pulseSpeed + p.pulseOffset) * 0.12;
        const currentAlpha = Math.max(0.04, Math.min(0.6, p.alpha));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${currentAlpha})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color === colors[0] ? 'rgba(249, 115, 22, 0.4)' : 'rgba(255, 255, 255, 0.2)';
        ctx.fill();
      }

      frameId = requestAnimationFrame(render);
    };

    frameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none">
      {/* Layer 1: Solid Dark Base */}
      <div className="absolute inset-0 bg-[#050505]" />

      {/* Layer 2: Atmospheric Moving Clouds / Fog Layers */}
      <div className="absolute inset-0 overflow-hidden opacity-60">
        {/* Cloud 1: Warm amber deep mist */}
        <div
          className="absolute -top-[20%] -left-[15%] w-[85vw] h-[85vw] max-w-[900px] max-h-[900px] rounded-full bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.07)_0%,rgba(180,83,9,0.03)_40%,transparent_75%)] blur-[90px] animate-cloud-1"
          style={{ willChange: 'transform' }}
        />

        {/* Cloud 2: Cool dark silver nebula */}
        <div
          className="absolute top-[35%] -right-[20%] w-[95vw] h-[95vw] max-w-[1000px] max-h-[1000px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.035)_0%,rgba(120,113,108,0.02)_45%,transparent_75%)] blur-[110px] animate-cloud-2"
          style={{ willChange: 'transform' }}
        />

        {/* Cloud 3: Bottom ambient glow */}
        <div
          className="absolute -bottom-[15%] left-[20%] w-[70vw] h-[60vw] max-w-[800px] max-h-[700px] rounded-full bg-[radial-gradient(circle_at_center,rgba(234,88,12,0.04)_0%,transparent_70%)] blur-[80px] animate-pulse-slow"
          style={{ willChange: 'transform' }}
        />
      </div>

      {/* Layer 3: Faint Architectural Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 mask-radial" />

      {/* Layer 4: Interactive Mouse Spotlight */}
      <div
        className="absolute w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none transition-opacity duration-500"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          background:
            'radial-gradient(circle, rgba(249, 115, 22, 0.065) 0%, rgba(255, 255, 255, 0.02) 30%, transparent 70%)',
          filter: 'blur(50px)',
          willChange: 'left, top',
        }}
      />

      {/* Layer 5: Canvas Micro-Particles (Floating specs) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-70"
      />

      {/* Layer 6: Film Grain & Noise Texture */}
      <div className="absolute inset-0 bg-noise opacity-55 mix-blend-screen" />

      {/* Layer 7: Cinematic Edge Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(5,5,5,0.85)_100%)] pointer-events-none" />

      {/* Layer 8: Subtle Top Ambient Horizon Line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
}
