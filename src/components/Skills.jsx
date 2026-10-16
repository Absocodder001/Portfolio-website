import React, { useState } from 'react';
import { 
  Code2, 
  Terminal, 
  Cpu, 
  Database, 
  GitBranch, 
  Globe, 
  Layers, 
  Sparkles, 
  Server,
  Zap,
  Box
} from 'lucide-react';
import { SplitHeading, ScrollReveal } from './ScrollReveal';
import { cyberAudio } from '../utils/audio';

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedSkill, setSelectedSkill] = useState(null);

  const categories = [
    { id: 'all', label: 'ALL MODULES' },
    { id: 'web', label: 'WEB & FRONTEND' },
    { id: 'dev', label: 'DEV & AI INTEGRATION' },
    { id: 'lang', label: 'CORE LANGUAGES' },
  ];

  const skillsData = [
    // Web & Frontend
    {
      name: 'React.js',
      category: 'web',
      level: 90,
      status: 'ADVANCED',
      icon: Code2,
      description: 'Single-page applications, custom hooks, context API, state optimization, component architecture, and Three.js canvas integration.',
      tags: ['Hooks', 'Context', 'State', 'Virtual DOM']
    },
    {
      name: 'Next.js',
      category: 'web',
      level: 88,
      status: 'ADVANCED',
      icon: Zap,
      description: 'Server-side rendering (SSR), Static site generation (SSG), App Router, SEO optimization, and high-performance Vercel deployments.',
      tags: ['App Router', 'SSR / SSG', 'Vercel', 'SEO']
    },
    {
      name: 'TypeScript',
      category: 'web',
      level: 85,
      status: 'PROFICIENT',
      icon: Layers,
      description: 'Strict type safety, custom interfaces, generic constraints, component prop typing, and bug prevention in large codebases.',
      tags: ['Strict Types', 'Generics', 'Interfaces']
    },
    {
      name: 'Tailwind CSS',
      category: 'web',
      level: 95,
      status: 'EXPERT',
      icon: Sparkles,
      description: 'Rapid UI design, custom design systems, responsive grid/flexbox layouts, cyber glassmorphism, and hardware-accelerated animations.',
      tags: ['Utility-First', 'JIT', 'Responsive', 'Design Systems']
    },
    {
      name: 'JavaScript (ES6+)',
      category: 'web',
      level: 92,
      status: 'ADVANCED',
      icon: Globe,
      description: 'Modern asynchronous programming (Async/Await, Promises), Closures, Event Loops, DOM Manipulation, and Modular JS.',
      tags: ['Async/Await', 'ESNext', 'DOM API', 'Event Loop']
    },
    {
      name: 'HTML5 & CSS3',
      category: 'web',
      level: 95,
      status: 'EXPERT',
      icon: Box,
      description: 'Semantic markup, web accessibility (WCAG), CSS grid, flexbox, keyframe animations, and cross-browser resilience.',
      tags: ['Semantic HTML', 'CSS Grid', 'WCAG', 'Responsive']
    },
    {
      name: 'Responsive Web Design',
      category: 'web',
      level: 95,
      status: 'EXPERT',
      icon: Layers,
      description: 'Mobile-first workflows, fluid typography, touch optimization, and testing across ultra-wide, desktop, tablet, and mobile screens.',
      tags: ['Mobile-First', 'Fluid Layouts', 'Touch UX']
    },

    // Dev & AI Integration
    {
      name: 'AI & Gemini API Integration',
      category: 'dev',
      level: 88,
      status: 'ADVANCED',
      icon: Sparkles,
      description: 'Integrating Google Gemini LLM API, prompt engineering, structured JSON outputs, streaming AI responses, and building real apps like StudyPilot AI.',
      tags: ['Gemini LLM', 'Prompting', 'Streaming', 'AI Agents']
    },
    {
      name: 'REST API & Webhooks',
      category: 'dev',
      level: 90,
      status: 'ADVANCED',
      icon: Server,
      description: 'Connecting frontend clients to third-party endpoints, data serialization, error handling, Axios/Fetch, and auth token workflows.',
      tags: ['Fetch API', 'Axios', 'Error Handling', 'JSON']
    },
    {
      name: 'Git & Version Control',
      category: 'dev',
      level: 85,
      status: 'PROFICIENT',
      icon: GitBranch,
      description: 'Git branching workflows, collaboration, GitHub repositories, pull requests, merge conflicts, and commit hygiene.',
      tags: ['Branching', 'GitHub', 'CI/CD', 'Version Control']
    },
    {
      name: 'SQL & Database Fundamentals',
      category: 'dev',
      level: 80,
      status: 'PROFICIENT',
      icon: Database,
      description: 'Relational database schema modeling, queries, joins, indexes, foreign keys, and integration with backend applications.',
      tags: ['Relational DB', 'Queries', 'Joins', 'Schema Design']
    },

    // Core Programming Languages
    {
      name: 'Java (OOP & Multi-Threading)',
      category: 'lang',
      level: 85,
      status: 'PROFICIENT',
      icon: Cpu,
      description: 'Certified Java developer: Object-Oriented Programming, Multi-Threading Mastery, memory management, Java EE Essentials, and algorithms.',
      tags: ['OOP', 'Concurrency', 'Java EE', 'Collections']
    },
    {
      name: 'C & C++',
      category: 'lang',
      level: 82,
      status: 'PROFICIENT',
      icon: Terminal,
      description: 'Deep computer science foundations: pointer arithmetic, memory allocation (malloc/free), data structures, and algorithmic complexity.',
      tags: ['Pointers', 'Data Structures', 'Algorithms', 'Memory']
    }
  ];

  const filteredSkills = activeCategory === 'all' 
    ? skillsData 
    : skillsData.filter((skill) => skill.category === activeCategory);

  return (
    <section id="skills" className="relative py-24 bg-[#060608] border-t border-neutral-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Split Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
          <SplitHeading
            prefix="SECTION // 02. TECHNICAL MATRIX"
            leftText="SKILLS &"
            rightText="CAPABILITIES"
          />

          {/* Category Filter Tabs with ScrollReveal from Right */}
          <ScrollReveal direction="right">
            <div className="flex flex-wrap gap-2 mt-6 md:mt-0 font-mono text-xs">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    cyberAudio.playChime(600);
                    setActiveCategory(cat.id);
                  }}
                  className={`px-3.5 py-2 rounded-lg border transition-all duration-200 ${
                    activeCategory === cat.id
                      ? 'bg-white text-black font-semibold border-white'
                      : 'bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* Skills Grid with Alternating Side-to-Middle Scroll Reveal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSkills.map((skill, index) => {
            const Icon = skill.icon;
            const isSelected = selectedSkill?.name === skill.name;

            return (
              <ScrollReveal
                key={skill.name}
                direction={index % 2 === 0 ? 'left' : 'right'}
                delay={(index % 3) * 70}
              >
                <div
                  onClick={() => {
                    cyberAudio.playPulse();
                    setSelectedSkill(isSelected ? null : skill);
                  }}
                  className={`cursor-pointer rounded-xl p-5 bg-[#0e0e12] border border-neutral-800 hover:border-neutral-600 transition-all duration-200 backdrop-blur-sm flex flex-col justify-between h-full ${
                    isSelected ? 'ring-1 ring-white bg-[#14141a]' : ''
                  }`}
                >
                  <div>
                    {/* Top line with Icon and Status badge */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800">
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-['Space_Grotesk'] text-sm font-bold text-white">
                            {skill.name}
                          </h3>
                          <span className="text-[10px] font-mono text-neutral-500">
                            MODULE // {skill.category.toUpperCase()}
                          </span>
                        </div>
                      </div>

                      <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold tracking-wider bg-neutral-900 border border-neutral-700 text-neutral-300">
                        {skill.status}
                      </span>
                    </div>

                    {/* Capacity Index Bar */}
                    <div className="my-3">
                      <div className="flex justify-between text-[11px] font-mono mb-1">
                        <span className="text-neutral-500">PROFICIENCY</span>
                        <span className="text-white font-bold">{skill.level}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-neutral-900 rounded-full overflow-hidden border border-neutral-800">
                        <div
                          className="h-full bg-white rounded-full transition-all duration-700"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-neutral-400 leading-relaxed font-light mb-4">
                      {skill.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="pt-3 border-t border-neutral-800 flex flex-wrap gap-1.5">
                    {skill.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-[10px] font-mono text-neutral-400"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Selected Skill Quick Inspector Banner */}
        {selectedSkill && (
          <div className="mt-8 p-4 rounded-xl bg-neutral-900 border border-neutral-700 font-mono text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-in fade-in duration-200">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse"></span>
              <div>
                <span className="text-white font-bold">[INSPECTED_MODULE]: {selectedSkill.name}</span>
                <p className="text-neutral-400 text-[11px] mt-0.5">{selectedSkill.description}</p>
              </div>
            </div>
            <button
              onClick={() => setSelectedSkill(null)}
              className="px-3 py-1 rounded bg-neutral-800 border border-neutral-700 text-neutral-200 hover:text-white text-[11px] shrink-0"
            >
              DISMISS
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
