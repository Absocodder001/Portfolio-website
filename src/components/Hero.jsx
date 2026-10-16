import React, { useState, useEffect } from 'react';
import { ArrowRight, Terminal, ChevronDown, Monitor, Laptop } from 'lucide-react';
import LaptopWorkstation from './LaptopWorkstation';
import WebGLBoundary from './WebGLBoundary';
import { ScrollReveal } from './ScrollReveal';
import { cyberAudio } from '../utils/audio';

export default function Hero() {
  const [typedText, setTypedText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);

  const roles = [
    'FRONTEND ARCHITECT',
    'NEXT.JS & REACT SPECIALIST',
    '3D WEB EXPERIENCES',
    'AI & API INTEGRATOR'
  ];

  useEffect(() => {
    let currentRole = roles[roleIndex];
    let charIndex = 0;
    let isDeleting = false;
    let timer;

    const type = () => {
      if (!isDeleting) {
        setTypedText(currentRole.substring(0, charIndex + 1));
        charIndex++;
        if (charIndex === currentRole.length) {
          isDeleting = true;
          timer = setTimeout(type, 2200);
          return;
        }
      } else {
        setTypedText(currentRole.substring(0, charIndex - 1));
        charIndex--;
        if (charIndex === 0) {
          isDeleting = false;
          setRoleIndex((prev) => (prev + 1) % roles.length);
          currentRole = roles[(roleIndex + 1) % roles.length];
        }
      }
      timer = setTimeout(type, isDeleting ? 35 : 75);
    };

    timer = setTimeout(type, 100);
    return () => clearTimeout(timer);
  }, [roleIndex]);

  return (
    <section className="relative min-h-[90vh] pt-16 pb-20 flex items-center justify-center overflow-hidden">
      {/* Background Architectural Subtle Light Cones */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Dossier & Call-to-actions (6 Cols) */}
          <div className="lg:col-span-6 flex flex-col justify-center text-left z-10">
            <ScrollReveal direction="left">
              {/* Status Chip */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900 border border-neutral-700 text-neutral-300 text-xs font-mono tracking-widest w-fit mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>AVAILABLE FOR CONTRACT & INTERNSHIPS</span>
              </div>

              {/* Main Heading */}
              <div className="space-y-1 mb-4">
                <p className="font-mono text-xs sm:text-sm text-neutral-400 tracking-widest uppercase">
                  [PORTFOLIO_DOSSIER // 2026]
                </p>
                <h1 className="font-['Space_Grotesk'] text-4xl sm:text-6xl xl:text-7xl font-bold text-white tracking-tight leading-none uppercase">
                  ABHIJEET <br />
                  <span className="text-neutral-400">
                    YADAV
                  </span>
                </h1>
              </div>

              {/* Dynamic Animated Subtitle */}
              <div className="h-9 sm:h-10 flex items-center mb-6 font-mono text-sm sm:text-lg text-neutral-300">
                <span className="text-neutral-500 font-bold mr-2">&gt;</span>
                <span className="text-white font-medium tracking-wider">{typedText}</span>
                <span className="inline-block w-2 h-4 ml-1.5 bg-white animate-pulse"></span>
              </div>

              {/* Summary */}
              <p className="text-neutral-400 text-sm sm:text-base leading-relaxed max-w-xl mb-8 font-light">
                Computer Science & Engineering student at <strong className="text-white font-medium">Sister Nivedita University, Kolkata</strong>. 
                Specialized in architecting high-performance web applications, interactive 3D spatial platforms, and responsive interfaces with Next.js, React, TypeScript, and Three.js.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 mb-10">
                <a
                  href="#projects"
                  onClick={() => cyberAudio.playWarp()}
                  className="px-6 py-3.5 rounded-lg font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-black bg-white hover:bg-neutral-200 transition-all flex items-center gap-2"
                >
                  <span>EXPLORE WORK</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href="#contact"
                  onClick={() => cyberAudio.playChime(600)}
                  className="px-6 py-3.5 rounded-lg font-mono text-xs sm:text-sm font-semibold uppercase tracking-wider text-neutral-200 bg-neutral-900 border border-neutral-700 hover:border-neutral-500 hover:text-white transition-all flex items-center gap-2"
                >
                  <Terminal className="w-4 h-4 text-neutral-400" />
                  <span>CONTACT ME</span>
                </a>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-neutral-800 font-mono text-xs">
                <div className="p-3 rounded-lg bg-neutral-900/60 border border-neutral-800">
                  <div className="text-neutral-500 text-[10px] uppercase">PROJECTS</div>
                  <div className="text-white text-base font-bold font-['Space_Grotesk'] mt-0.5">2 LIVE</div>
                  <div className="text-[10px] text-neutral-400">+ 1 concept</div>
                </div>

                <div className="p-3 rounded-lg bg-neutral-900/60 border border-neutral-800">
                  <div className="text-neutral-500 text-[10px] uppercase">FOCUS</div>
                  <div className="text-white text-base font-bold font-['Space_Grotesk'] mt-0.5">FRONTEND</div>
                  <div className="text-[10px] text-neutral-400">React • Next.js</div>
                </div>

                <div className="p-3 rounded-lg bg-neutral-900/60 border border-neutral-800">
                  <div className="text-neutral-500 text-[10px] uppercase">DEGREE</div>
                  <div className="text-white text-base font-bold font-['Space_Grotesk'] mt-0.5">B.TECH CSE</div>
                  <div className="text-[10px] text-neutral-400">SNU Kolkata</div>
                </div>

                <div className="p-3 rounded-lg bg-neutral-900/60 border border-neutral-800">
                  <div className="text-neutral-500 text-[10px] uppercase">LOCATION</div>
                  <div className="text-white text-base font-bold font-['Space_Grotesk'] mt-0.5">HOWRAH</div>
                  <div className="text-[10px] text-neutral-400">West Bengal</div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: 3D Interactive Laptop Workstation (6 Cols) */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            <ScrollReveal direction="right" className="w-full">
              <div className="relative w-full rounded-2xl bg-[#0c0c10] border border-neutral-800 p-2 shadow-2xl">
                
                {/* Viewport Top Header */}
                <div className="flex items-center justify-between px-3 py-2 border-b border-neutral-800/80 bg-[#101014] font-mono text-[11px] text-neutral-400">
                  <span className="text-white flex items-center gap-1.5 font-semibold">
                    <Laptop className="w-3.5 h-3.5 text-neutral-300" />
                    INTERACTIVE_3D_WORKSTATION
                  </span>
                  <span className="text-[10px] text-neutral-500 font-mono">
                    CLICK & DRAG TO ORBIT
                  </span>
                </div>

                {/* 3D Laptop Canvas */}
                <WebGLBoundary><LaptopWorkstation /></WebGLBoundary>

                {/* Viewport Bottom Bar */}
                <div className="px-3 py-2 border-t border-neutral-800/80 bg-[#101014] flex items-center justify-between font-mono text-[10px] text-neutral-400">
                  <span>TITANIUM UNIBODY // REAL-TIME TEXTURE BUFFER</span>
                  <span className="text-neutral-300">INTERACTION: ENABLED</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>

      {/* Scroll Down */}
      <a 
        href="#about"
        className="absolute bottom-3 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 font-mono text-[10px] text-neutral-500 hover:text-white transition-colors pointer-events-auto"
      >
        <span>SCROLL DOWN</span>
        <ChevronDown className="w-4 h-4 animate-bounce text-neutral-400" />
      </a>
    </section>
  );
}
