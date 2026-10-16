import React from 'react';
import { MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-[#050507] border-t border-neutral-800 pt-16 pb-12 font-mono text-xs text-neutral-400 overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 architect-grid opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pb-12 border-b border-neutral-800">
          
          {/* Brand & Monogram (6 Cols) */}
          <div className="md:col-span-6 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-md bg-white text-black flex items-center justify-center font-['Space_Grotesk'] font-bold text-sm">
                AY
              </div>
              <span className="font-['Space_Grotesk'] text-base font-bold text-white tracking-wider">
                ABHIJEET YADAV
              </span>
            </div>
            <p className="text-xs text-neutral-400 font-light leading-relaxed max-w-sm">
              Frontend Web Developer & Designer. Architecting high-performance web applications and spatial 3D interactive user interfaces.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-neutral-400">
              <MapPin className="w-3.5 h-3.5" />
              <span>Howrah, West Bengal, India</span>
            </div>
          </div>

          {/* Quick Nav Anchors (6 Cols) */}
          <div className="md:col-span-6 flex flex-wrap md:justify-end gap-x-6 gap-y-2 text-[11px]">
            <a href="#about" className="hover:text-white transition-colors">01. ABOUT</a>
            <a href="#skills" className="hover:text-white transition-colors">02. SKILLS</a>
            <a href="#projects" className="hover:text-white transition-colors">03. PROJECTS</a>
            <a href="#education" className="hover:text-white transition-colors">04. EDUCATION</a>
            <a href="#terminal" className="hover:text-white transition-colors">05. TERMINAL</a>
            <a href="#contact" className="hover:text-white transition-colors">06. CONTACT</a>
          </div>

        </div>

        {/* Bottom Line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <div>
            © {new Date().getFullYear()} ABHIJEET YADAV. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-4 text-neutral-400">
            <span className="flex items-center gap-1.5 text-neutral-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              CORE: REACT 19 + THREE.JS + TAILWIND
            </span>
            <span>BUILD: v2.6.0</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
