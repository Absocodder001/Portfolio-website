import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, MapPin, Terminal } from 'lucide-react';
import { cyberAudio } from '../utils/audio';

export default function Navbar() {
  const [time, setTime] = useState('');
  const [soundEnabled, setSoundEnabled] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour12: false, timeZone: 'Asia/Kolkata' }) + ' IST');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleSound = () => {
    const state = cyberAudio.toggle();
    setSoundEnabled(state);
    if (state) {
      cyberAudio.playChime(750);
    }
  };

  const navLinks = [
    { name: '01. ABOUT', href: '#about' },
    { name: '02. SKILLS', href: '#skills' },
    { name: '03. PROJECTS', href: '#projects' },
    { name: '04. EDUCATION', href: '#education' },
    { name: '05. TERMINAL', href: '#terminal' },
    { name: '06. CONTACT', href: '#contact' },
  ];

  return (
    <header className="relative w-full z-40 bg-[#060608] border-b border-neutral-800">
      
      {/* Top Swiss Telemetry Bar */}
      <div className="flex items-center justify-between px-4 sm:px-8 py-2 bg-[#0a0a0d] border-b border-neutral-800/80 text-[11px] font-mono text-neutral-400">
        <div className="flex items-center gap-4 sm:gap-6">
          <span className="flex items-center gap-1.5 text-white font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            PORTFOLIO // V2.6
          </span>
          <span className="hidden md:flex items-center gap-1 text-neutral-400">
            <MapPin className="w-3 h-3 text-neutral-400" />
            HOWRAH, WEST BENGAL, INDIA
          </span>
          <span className="text-neutral-400 hidden lg:inline">
            SISTER NIVEDITA UNIVERSITY // B.TECH CSE &apos;24
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-neutral-400 font-mono hidden sm:inline">
            KOLKATA: <span className="text-neutral-200">{time || '14:15:00 IST'}</span>
          </span>

          {/* Interactive Audio SFX Toggle */}
          <button
            onClick={toggleSound}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-mono border transition-all ${
              soundEnabled
                ? 'bg-neutral-900 border-neutral-700 text-white'
                : 'bg-neutral-950 border-neutral-800 text-neutral-500'
            }`}
            title="Toggle Synthesizer Audio Feedback"
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-neutral-200" />
                <span>AUDIO: ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-neutral-600" />
                <span>AUDIO: OFF</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo / Monogram */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-md bg-white text-black flex items-center justify-center font-['Space_Grotesk'] font-bold text-sm tracking-wider">
              AY
            </div>
            <div className="flex flex-col">
              <span className="font-['Space_Grotesk'] font-bold text-sm sm:text-base tracking-wider text-white">
                ABHIJEET YADAV
              </span>
              <span className="font-mono text-[10px] text-neutral-400 tracking-wider">
                FRONTEND ARCHITECT & DESIGNER
              </span>
            </div>
          </a>

          {/* Clean Nav Links */}
          <nav className="flex items-center gap-1 sm:gap-4 overflow-x-auto py-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => cyberAudio.playChime(550)}
                className="px-2.5 py-1 rounded text-xs font-mono tracking-wider text-neutral-400 hover:text-white transition-colors whitespace-nowrap"
              >
                {link.name}
              </a>
            ))}
          </nav>

        </div>
      </div>
    </header>
  );
}
