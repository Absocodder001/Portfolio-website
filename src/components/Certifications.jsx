import React from 'react';
import { GraduationCap, Award, Calendar, MapPin, ShieldCheck, Sparkles } from 'lucide-react';
import { SplitHeading, ScrollReveal } from './ScrollReveal';

export default function Certifications() {
  const certifications = [
    {
      title: 'Java EE Essentials',
      issuer: 'Coursera',
      category: 'ENTERPRISE ARCHITECTURE',
      skills: 'Enterprise JavaBeans, Servlets, Dependency Injection, Scalable Backend Logic',
    },
    {
      title: 'Java Programming: Solving Problems with Software',
      issuer: 'Coursera',
      category: 'SOFTWARE ENGINEERING',
      skills: 'Algorithm Design, Structured Problem Solving, Object-Oriented Paradigms',
    },
    {
      title: 'Java Multi-Threading Mastery',
      issuer: 'Coursera',
      category: 'CONCURRENCY & PERFORMANCE',
      skills: 'Threads, Synchronization, Locks, Thread Pools, Deadlock Prevention',
    },
    {
      title: 'Programming in C',
      issuer: 'Coursera',
      category: 'SYSTEMS & FOUNDATIONS',
      skills: 'Pointer Mechanics, Memory Allocation, Structures, Low-Level Efficiency',
    },
    {
      title: 'Active Listening & Professional Communication',
      issuer: 'Coursera',
      category: 'TEAM COLLABORATION',
      skills: 'Cross-functional Communication, Stakeholder Alignment, Client Empathy',
    },
  ];

  return (
    <section id="education" className="relative py-24 bg-[#060608] border-t border-neutral-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Split Scroll Animation */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <SplitHeading
            prefix="SECTION // 04. ACADEMICS & CREDENTIALS"
            leftText="EDUCATION &"
            rightText="CERTIFICATIONS"
          />

          <ScrollReveal direction="right">
            <p className="text-neutral-400 text-xs sm:text-sm font-mono max-w-md mt-4 md:mt-0">
              Rigorous computer science curriculum combined with continuous verified industry learning.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Education Primary Card (5 Cols) - Glides in from Left */}
          <div className="lg:col-span-5">
            <ScrollReveal direction="left" className="h-full">
              <div className="rounded-2xl bg-[#0e0e12] border border-neutral-800 p-6 sm:p-8 backdrop-blur-xl relative">
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-neutral-800 font-mono text-xs">
                  <span className="text-white font-medium flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-neutral-300" />
                    DEGREE_PROGRAMME // ACTIVE
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-neutral-900 border border-neutral-700 text-neutral-300">
                    ENROLLED
                  </span>
                </div>

                <h3 className="font-['Space_Grotesk'] text-xl sm:text-2xl font-bold text-white mb-2">
                  Bachelor of Technology (B.Tech)
                </h3>
                <p className="text-neutral-300 font-mono text-sm font-semibold mb-4">
                  Computer Science and Engineering
                </p>

                <div className="space-y-3 mb-6 font-mono text-xs text-neutral-400">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-neutral-500 shrink-0" />
                    <span>Sister Nivedita University, Kolkata, West Bengal</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-neutral-500 shrink-0" />
                    <span>2024 – Present (Currently Pursuing)</span>
                  </div>
                </div>

                <p className="text-xs text-neutral-400 leading-relaxed font-light mb-6">
                  Rigorous foundational training in data structures, algorithms, object-oriented design, operating systems, and web technologies. Actively applying theoretical computer science principles directly to responsive, production-ready full-stack applications.
                </p>

                <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 font-mono text-xs text-neutral-400 space-y-2">
                  <div className="text-white font-semibold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-neutral-300" />
                    Core Academic Focus:
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-neutral-400 text-[11px]">
                    <li>Data Structures & Algorithmic Analysis</li>
                    <li>Object-Oriented Programming (Java / C++)</li>
                    <li>Relational Databases & SQL Systems</li>
                    <li>Software Engineering & Distributed Systems</li>
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Certifications Grid (7 Cols) - Glides in from Right */}
          <div className="lg:col-span-7 space-y-3">
            <ScrollReveal direction="right">
              <div className="flex items-center justify-between pb-2 font-mono text-xs text-neutral-400">
                <span className="flex items-center gap-2 text-white font-semibold">
                  <Award className="w-4 h-4 text-neutral-300" />
                  VERIFIED COURSERA CREDENTIALS
                </span>
                <span>5 CREDENTIALS</span>
              </div>
            </ScrollReveal>

            {certifications.map((cert, index) => (
              <ScrollReveal
                key={cert.title}
                direction="right"
                delay={index * 60}
              >
                <div
                  className="p-4 sm:p-5 rounded-xl bg-[#0e0e12] border border-neutral-800 hover:border-neutral-600 transition-all duration-200 group flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-neutral-500">
                        0{index + 1}.
                      </span>
                      <h4 className="font-['Space_Grotesk'] text-sm sm:text-base font-bold text-white group-hover:text-neutral-200 transition-colors">
                        {cert.title}
                      </h4>
                    </div>
                    <p className="text-xs text-neutral-400 font-light pl-6">
                      {cert.skills}
                    </p>
                  </div>

                  <div className="flex sm:flex-col items-end justify-between sm:justify-center gap-1 shrink-0 pl-6 sm:pl-0">
                    <span className="px-2.5 py-1 rounded-md bg-neutral-900 border border-neutral-700 text-neutral-300 font-mono text-[10px] uppercase font-semibold">
                      {cert.issuer}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-400" />
                      VERIFIED
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
