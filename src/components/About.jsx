import React from 'react';
import { User, MapPin, Mail, Phone, GraduationCap, Languages, Sparkles, Layers, Cpu, Code, Compass, CheckCircle } from 'lucide-react';
import { SplitHeading, ScrollReveal } from './ScrollReveal';

export default function About() {
  const personalInfo = [
    { label: 'NAME', value: 'Abhijeet Yadav', icon: User },
    { label: 'LOCATION', value: 'Howrah, West Bengal, India', icon: MapPin },
    { label: 'PRIMARY ROLE', value: 'Frontend Developer & Web Designer', icon: Code },
    { label: 'ACADEMIC INSTITUTION', value: 'Sister Nivedita University, Kolkata', icon: GraduationCap },
    { label: 'CONTACT PHONE', value: '+91 7439856465', icon: Phone },
    { label: 'PRIMARY EMAIL', value: 'raelwebdeveloper@gmail.com', icon: Mail },
  ];

  const languages = [
    { name: 'English', level: 'Professional Working' },
    { name: 'Hindi', level: 'Native / Bilingual' },
    { name: 'Bengali', level: 'Fluent / Regional' },
    { name: 'Bhojpuri', level: 'Native / Conversational' },
  ];

  const pillars = [
    {
      title: 'Responsive & Accessible Engineering',
      desc: 'Obsessed with fluid layouts, mobile-first design systems, and rapid page-load speeds that perform seamlessly across all screens.',
      icon: Layers,
    },
    {
      title: 'Modern Frontend & 3D Immersion',
      desc: 'Harnessing React, Next.js, TypeScript, Tailwind CSS, and Three.js to craft websites that stand out visually and technologically.',
      icon: Cpu,
    },
    {
      title: 'AI & API Integration Pioneer',
      desc: 'Hands-on experience integrating intelligent APIs like Google Gemini to engineer interactive applications like StudyPilot AI.',
      icon: Sparkles,
    },
    {
      title: 'Business-Driven Digital Solutions',
      desc: 'Translating business visions into modern, polished web portals with clear user journeys, intuitive calls to action, and clean code.',
      icon: Compass,
    }
  ];

  return (
    <section id="about" className="relative py-24 bg-[#08080b] border-t border-neutral-800 overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 architect-grid opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Split Scroll Animation */}
        <div className="mb-16">
          <SplitHeading 
            prefix="SECTION // 01. DOSSIER" 
            leftText="ABOUT" 
            rightText="ABHIJEET" 
            accentGradient="from-white via-neutral-300 to-neutral-500"
          />
        </div>

        {/* Top Grid: Bio dossier + Info card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          
          {/* Left: Professional Summary Dossier (7 Cols) */}
          <div className="lg:col-span-7">
            <ScrollReveal direction="left" className="h-full">
              <div className="h-full rounded-2xl bg-[#0e0e12] border border-neutral-800 p-6 sm:p-8 backdrop-blur-xl relative flex flex-col justify-between">
                {/* Header Bar */}
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-neutral-800 font-mono text-xs">
                  <span className="text-white flex items-center gap-2 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    PROFILE_SUMMARY // CANDIDATE_DOSSIER
                  </span>
                  <span className="text-neutral-500">ID: AY-2026-WB</span>
                </div>

                <div className="space-y-4 text-neutral-300 leading-relaxed font-light text-base">
                  <p>
                    I am a dedicated <strong className="text-white font-semibold">Frontend Web Developer</strong> and{' '}
                    <strong className="text-white font-semibold">Web Designer</strong> pursuing my Bachelor of Technology (B.Tech) in{' '}
                    <strong className="text-neutral-100 font-medium">Computer Science and Engineering</strong> at{' '}
                    <strong className="text-neutral-100 font-medium">Sister Nivedita University, Kolkata</strong> (2024 – Present).
                  </p>
                  
                  <p>
                    My focus centers on combining clean architectural engineering with refined, high-end aesthetics. Having engineered production platforms like{' '}
                    <span className="text-white font-mono bg-neutral-900 px-1.5 py-0.5 rounded border border-neutral-700">Ironcore Fitness</span> and AI solutions like{' '}
                    <span className="text-white font-mono bg-neutral-900 px-1.5 py-0.5 rounded border border-neutral-700">StudyPilot AI</span>, I specialize in building rapid, mobile-first, and highly responsive user experiences with Next.js, React, TypeScript, and modern CSS frameworks.
                  </p>

                  <p>
                    Whether developing bespoke landing pages for high-growth businesses, engineering interactive client portals, or integrating cutting-edge LLM APIs, I prioritize clean architecture, accessible markup, and aesthetic craftsmanship.
                  </p>
                </div>

                {/* Spoken Languages Bar */}
                <div className="mt-8 pt-6 border-t border-neutral-800">
                  <div className="flex items-center gap-2 font-mono text-xs text-neutral-400 mb-3">
                    <Languages className="w-4 h-4 text-neutral-300" />
                    <span className="tracking-wider uppercase">Spoken Languages:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {languages.map((lang) => (
                      <div
                        key={lang.name}
                        className="px-3 py-1.5 rounded-md bg-neutral-900 border border-neutral-800 text-xs font-mono flex items-center gap-1.5"
                      >
                        <span className="text-white font-medium">{lang.name}</span>
                        <span className="text-neutral-500 text-[10px]">({lang.level})</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right: Quick Spec Grid Card (5 Cols) */}
          <div className="lg:col-span-5">
            <ScrollReveal direction="right" className="h-full">
              <div className="h-full rounded-2xl bg-[#0e0e12] border border-neutral-800 p-6 sm:p-8 backdrop-blur-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-4 mb-6 border-b border-neutral-800 font-mono text-xs">
                    <span className="text-white font-medium flex items-center gap-2">
                      <User className="w-4 h-4 text-neutral-300" />
                      SPECIFICATION_PARAMETERS
                    </span>
                    <span className="text-neutral-400 text-[11px] font-mono">VERIFIED</span>
                  </div>

                  <div className="space-y-3.5">
                    {personalInfo.map((item) => {
                      const Icon = item.icon;
                      return (
                        <div
                          key={item.label}
                          className="p-3 rounded-lg bg-neutral-900/60 border border-neutral-800 hover:border-neutral-700 transition-all flex items-start gap-3.5"
                        >
                          <div className="p-2 rounded bg-neutral-950 border border-neutral-800 shrink-0 mt-0.5">
                            <Icon className="w-4 h-4 text-neutral-300" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-500">
                              {item.label}
                            </div>
                            <div className="text-sm font-medium text-neutral-200 truncate mt-0.5">
                              {item.value}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Academic Status Card */}
                <div className="mt-6 p-4 rounded-xl bg-neutral-900/80 border border-neutral-800 font-mono text-xs flex items-center justify-between">
                  <div>
                    <span className="text-neutral-500 block text-[10px]">DEGREE PROGRAMME</span>
                    <span className="font-bold text-white">B.Tech CSE (2024 - Present)</span>
                  </div>
                  <div className="text-right">
                    <span className="text-neutral-500 block text-[10px]">CAMPUS</span>
                    <span className="text-neutral-300">SNU, Kolkata</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>

        {/* Bottom Core Pillars Grid */}
        <div>
          <ScrollReveal direction="left">
            <div className="font-mono text-xs text-neutral-400 uppercase tracking-widest mb-6 flex items-center gap-2">
              <span>// ARCHITECTURAL PILLARS & ETHIC</span>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <ScrollReveal 
                  key={pillar.title} 
                  direction={i % 2 === 0 ? 'left' : 'right'} 
                  delay={i * 90}
                >
                  <div
                    className="h-full p-6 rounded-xl bg-[#0e0e12] border border-neutral-800 hover:border-neutral-700 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center mb-4">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="font-['Space_Grotesk'] text-base font-semibold text-white mb-2">
                        {pillar.title}
                      </h3>
                      <p className="text-xs text-neutral-400 leading-relaxed font-light">
                        {pillar.desc}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-neutral-800/80 flex items-center gap-1.5 text-[10px] font-mono text-neutral-500">
                      <CheckCircle className="w-3 h-3 text-neutral-400" />
                      <span>PRODUCTION_READY</span>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
