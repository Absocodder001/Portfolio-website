import React, { useState } from 'react';
import { ExternalLink, ArrowUpRight, Flame, Brain, Users } from 'lucide-react';
import ProjectModal from './ProjectModal';
import { SplitHeading, ScrollReveal } from './ScrollReveal';
import { cyberAudio } from '../utils/audio';

export default function Projects() {
  const [activeModalProject, setActiveModalProject] = useState(null);

  const projects = [
    {
      id: 'ironcore',
      codeId: 'PROJ-01 // IRONCORE',
      title: 'Ironcore Fitness',
      subtitle: 'Modern Gym & Fitness Enterprise Web Platform',
      category: 'ENTERPRISE WEB / NEXT.JS',
      tagline: 'Independent premium gym website design and development',
      description: 'Designed and developed a premium responsive fitness business website. Built the frontend with Next.js, TypeScript, and Tailwind CSS, including responsive layouts, business-focused sections, calls to action, and polished visual presentation. Deployed on Vercel.',
      fullDescription: 'Ironcore Fitness is a self-initiated gym website demo designed around clear memberships, trainer information, and a responsive experience.',
      highlights: [
        'Built full frontend architecture using Next.js App Router, TypeScript, and Tailwind CSS.',
        'Engineered 100% responsive fluid layouts optimized for mobile gym-goers on the move.',
        'Structured clear conversion funnels: membership tier selector, lead capture, and trial booking.',
        'Deployed the responsive frontend with Vercel hosting; performance verification is ongoing.'
      ],
      techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel', 'Responsive UI', 'SEO'],
      icon: Flame,
      liveUrl: 'https://ironcore-fitness-seven.vercel.app/',
      githubUrl: null,
    },
    {
      id: 'studypilot',
      codeId: 'PROJ-02 // STUDYPILOT',
      title: 'StudyPilot AI',
      subtitle: 'AI-Powered Adaptive Study Planning & Syllabus Optimizer',
      category: 'AI APPLICATION / GEMINI API',
      tagline: 'Intelligent daily roadmap planner powered by LLM integration',
      description: 'Built and deployed an AI-powered study planning web application. Developed the responsive interface, integrated the Google Gemini API, implemented application logic, and prepared the application for access across desktop and mobile devices.',
      fullDescription: 'StudyPilot AI empowers students to conquer overwhelming course loads. By inputting their upcoming exams, subjects, and study hours, the integrated Gemini API parses requirements and generates customized, high-retention study timetables with daily checklists and active revision loops.',
      highlights: [
        'Seamless integration with Google Gemini API for intelligent, structured study schedule generation.',
        'Engineered responsive, accessible interface with distraction-free dark and light UI themes.',
        'Implemented client-side session management, syllabus breakdown logic, and task trackers.',
        'Optimized for rapid mobile access so students can review daily goals anywhere on campus.'
      ],
      techStack: ['React', 'Next.js', 'Gemini AI API', 'TypeScript', 'Tailwind CSS', 'Prompt Engineering'],
      icon: Brain,
      liveUrl: 'https://studypilot-ai-pied-eta.vercel.app/',
      githubUrl: null,
    },
    {
      id: 'skillora',
      codeId: 'PROJ-03 // SKILLORA',
      title: 'Skillora',
      subtitle: 'Freelancer & Client Marketplace Concept Platform',
      category: 'MARKETPLACE UI / CLIENT PORTAL',
      tagline: 'An early-stage marketplace concept for freelancers and clients',
      description: 'Early-stage concept for connecting clients with freelancers. The planned experience focuses on discovery, clear project requirements, and a simple workflow for managing freelance work.',
      fullDescription: 'Skillora is a planned freelancer-management and marketplace concept. The interface and features described here are goals for a future build, not a completed production platform.',
      highlights: [
        'Planned freelancer and client dashboard views.',
        'Proposed filters for services, availability, and skill categories.',
        'Concept for project proposals, messaging, and onboarding.',
        'Next step: build and test a simple freelancer-manager MVP.'
      ],
      techStack: ['React', 'JavaScript (ES6+)', 'Tailwind CSS', 'Component Architecture', 'Responsive UX'],
      icon: Users,
      liveUrl: null, // Concept only: do not link visitors to unrelated websites.
      githubUrl: null,
    }
  ];

  return (
    <section id="projects" className="relative py-24 bg-[#08080b] border-t border-neutral-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Split Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <SplitHeading
            prefix="SECTION // 03. FEATURED WORK"
            leftText="ENGINEERED"
            rightText="PROJECTS"
          />

          <ScrollReveal direction="right">
            <p className="text-neutral-400 text-xs sm:text-sm font-mono max-w-md mt-4 md:mt-0">
              Independent web builds, live demos, and work-in-progress concepts by Abhijeet Yadav.
            </p>
          </ScrollReveal>
        </div>

        {/* Projects Cards Grid with Alternating Scroll Animations */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projects.map((proj, idx) => {
            const Icon = proj.icon;
            const dir = idx === 0 ? 'left' : idx === 1 ? 'bottom' : 'right';

            return (
              <ScrollReveal key={proj.id} direction={dir} delay={idx * 110} className="h-full">
                <div
                  className="group relative rounded-2xl bg-[#0e0e12] border border-neutral-800 hover:border-neutral-600 p-6 sm:p-7 backdrop-blur-xl flex flex-col justify-between transition-all duration-300 h-full"
                >
                  {/* Card Top Indicator */}
                  <div>
                    <div className="flex items-center justify-between pb-4 mb-5 border-b border-neutral-800 font-mono text-xs">
                      <span className="text-white flex items-center gap-1.5 font-bold">
                        <span className="text-neutral-400">0{idx + 1}.</span> {proj.codeId}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono border bg-neutral-900 border-neutral-700 text-neutral-300">
                        {proj.category.split('/')[0]}
                      </span>
                    </div>

                    {/* Project Visual Icon / Mockup badge */}
                    <div className="flex items-center gap-3.5 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center group-hover:scale-105 transition-all">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-['Space_Grotesk'] text-xl font-bold text-white group-hover:text-neutral-200 transition-colors">
                          {proj.title}
                        </h3>
                        <p className="text-xs text-neutral-400 font-mono">
                          {proj.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-neutral-300 leading-relaxed font-light mb-6">
                      {proj.description}
                    </p>

                    {/* Key Highlights list */}
                    <div className="space-y-2 mb-6">
                      {proj.highlights.slice(0, 2).map((h, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-neutral-400 font-light">
                          <span className="text-white font-mono font-bold">✓</span>
                          <span className="line-clamp-2">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom: Tech Stack & Actions */}
                  <div>
                    {/* Tech chips */}
                    <div className="flex flex-wrap gap-1.5 mb-6 pt-4 border-t border-neutral-800">
                      {proj.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-[10px] font-mono text-neutral-400"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action buttons */}
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => {
                          cyberAudio.playWarp();
                          setActiveModalProject(proj);
                        }}
                        className="w-full py-2.5 rounded-lg font-mono text-xs font-semibold uppercase text-neutral-200 bg-neutral-900 border border-neutral-700 hover:bg-neutral-800 hover:border-neutral-500 transition-all flex items-center justify-center gap-1.5"
                      >
                        <span>SPECS</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>

                      {proj.liveUrl ? (
                        <a
                          href={proj.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => cyberAudio.playChime(700)}
                          className="w-full py-2.5 rounded-lg font-mono text-xs font-bold uppercase text-black bg-white hover:bg-neutral-200 transition-all flex items-center justify-center gap-1.5"
                        >
                          <span>LIVE DEMO</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      ) : (
                        <span className="w-full py-2.5 rounded-lg font-mono text-xs font-semibold uppercase text-neutral-400 bg-neutral-900 border border-neutral-800 flex items-center justify-center">
                          CONCEPT ONLY
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Project Modal Trigger */}
        <ProjectModal
          project={activeModalProject}
          onClose={() => setActiveModalProject(null)}
        />

      </div>
    </section>
  );
}
