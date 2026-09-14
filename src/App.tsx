import { useState } from 'react';
import { Preloader } from './components/ui/preloader';
import { CustomCursor } from './components/ui/custom-cursor';
import { AtmosphericBackground } from './components/ui/atmospheric-background';
import { Navbar } from './components/ui/navbar';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Projects } from './components/sections/Projects';
import { Skills } from './components/sections/Skills';
import { Journey } from './components/sections/Journey';
import { Stats } from './components/sections/Stats';
import { MarqueeSection } from './components/sections/MarqueeSection';
import { Contact } from './components/sections/Contact';
import { Footer } from './components/sections/Footer';

export default function App() {
  const [preloaderDone, setPreloaderDone] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#EDEDED] overflow-x-hidden font-['Roboto',sans-serif]">
      {/* Short cinematic preloader */}
      <Preloader onComplete={() => setPreloaderDone(true)} />

      {/* Desktop custom cursor with interactive morphing */}
      <CustomCursor />

      {/* Multi-layered atmospheric background */}
      <AtmosphericBackground />

      {/* Navigation */}
      <Navbar />

      {/* Main Sections */}
      <main className="relative z-10 w-full overflow-hidden">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Journey />
        <Stats />
        <MarqueeSection />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
