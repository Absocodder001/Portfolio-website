import React, { useState } from 'react';
import { Flame, Brain, Users } from 'lucide-react';
import PolaroidLineCarousel from './ui/polaroid-line-carousel';
import ProjectModal from './ProjectModal';

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

  const slides = [
    { title: 'Ironcore Fitness', caption: 'A bold multi-page experience for a fictional gym brand.', label: 'WEB DESIGN & DEVELOPMENT', image: '/projects/ironcore.svg', alt: 'Illustrative Ironcore Fitness interface artwork', liveUrl: projects[0].liveUrl },
    { title: 'StudyPilot AI', caption: 'An AI-assisted planner that helps students organize what comes next.', label: 'AI APPLICATION', image: '/projects/studypilot.svg', alt: 'Illustrative StudyPilot AI interface artwork', liveUrl: projects[1].liveUrl },
    { title: 'Skillora', caption: 'A freelancer-manager and marketplace idea in early planning.', label: 'EXPLORING / CONCEPT', image: '/projects/skillora.svg', alt: 'Skillora concept artwork' },
  ];
  return (
    <section id="projects" className="relative isolate py-16 md:py-20 overflow-hidden border-t border-white/10">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 flex flex-wrap items-end justify-between gap-6 relative z-10">
        <div>
          <span className="ay-eyebrow">03 / SELECTED WORK</span>
          <h2 className="ay-section-title mt-4">Proof, not promises<span className="text-[#c9f48d]">.</span></h2>
        </div>
        <div className="max-w-sm text-sm text-neutral-400 leading-relaxed">Real demos and a concept in progress. Drag the line, browse the prints, and open a project to see what I built.</div>
      </div>
      <PolaroidLineCarousel slides={slides} ariaLabel="Abhijeet Yadav featured projects" height="min(77svh,750px)" cardWidth={330} sag={46} swing={0.85} autoplay={5800} onSelect={i => setActiveModalProject(projects[i])} />
      <p className="relative text-center text-[11px] font-mono text-neutral-500 px-6 pb-6">Artwork is illustrative. Use “Visit live website” to see the actual deployed project.</p>
      <ProjectModal project={activeModalProject} onClose={() => setActiveModalProject(null)} />
    </section>
  );
}
