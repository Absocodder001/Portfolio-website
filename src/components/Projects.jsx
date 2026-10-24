import React, { useState } from 'react';
import { Flame, Brain, Users, Gamepad2, ShoppingBag } from 'lucide-react';
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
      id: 'maison-elan',
      codeId: 'PROJ-02 // MAISON ELAN',
      title: 'MAISON ÉLAN',
      subtitle: 'Premium Womenswear E-commerce Storefront Demo',
      category: 'E-COMMERCE UI / NEXT.JS',
      tagline: 'A responsive three-page shopping experience for a fictional fashion brand',
      description: 'Designed and deployed a women\'s clothing storefront demo for a potential client project. Includes a fashion landing page, searchable and filterable product collection, individual product pages, and interactive demo shopping bag.',
      fullDescription: 'MAISON ÉLAN is an independently developed three-page fashion store concept, with a Pakistan-focused sample catalog and PKR pricing. Visitors can explore products and try shopping interactions, but this is a design and functionality demo: there are no live payments, real inventory, or order processing.',
      highlights: [
        'Created homepage, shop collection and product detail pages using Next.js, TypeScript and Tailwind CSS.',
        'Implemented combined catalog search, clothing-type, size, colour and price filters, plus sorting.',
        'Added product galleries, sample size availability, quantity selection and an interactive shopping bag with PKR subtotals.',
        'Published a publicly accessible static demo on Cloudflare Pages; real checkout is deliberately disabled.'
      ],
      techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Cloudflare Pages', 'Responsive UI'],
      icon: ShoppingBag,
      liveUrl: 'https://maison-elan-demo.pages.dev/',
      githubUrl: null,
    },
    {
      id: 'studypilot',
      codeId: 'PROJ-03 // STUDYPILOT',
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
      id: 'dont-open-the-door',
      codeId: 'PROJ-04 // DONT OPEN THE DOOR',
      title: "Don't Open the Door",
      subtitle: 'Personal Browser Game and Rive Experiment',
      category: 'INTERACTIVE GAME / RIVE',
      tagline: 'A small, original game you can actually play online',
      description: 'Made and published a personal browser game using Rive. The playable experience opens with a minimalist, dark, retro-style game menu.',
      fullDescription: "Don't Open the Door is a small interactive game I created and shared on Rive. Its browser-based experience and retro-styled interface are a personal experiment in interactive design, not a commercial game release.",
      highlights: [
        'Created and shared a playable personal game.',
        'Designed a retro-inspired title screen with Start, Settings, and Exit Game.',
        'Published the interactive experience on Rive so visitors can play it in their browser.',
        'Experimented with interactive animation and game-interface design.'
      ],
      techStack: ['Rive', 'Interactive Animation', 'Browser Game'],
      icon: Gamepad2,
      liveUrl: 'https://dont-open-the-door-6af1rp.rive.to/',
      githubUrl: null,
    },
    {
      id: 'skillora',
      codeId: 'PROJ-05 // SKILLORA',
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
    { title: 'MAISON ÉLAN', caption: 'An editorial womenswear storefront with product filters, detailed listings and a demo shopping bag.', label: 'FASHION E-COMMERCE DEMO', image: '/projects/maison-elan.svg', alt: 'Illustrative MAISON ÉLAN fashion website preview', liveUrl: projects[1].liveUrl },
    { title: 'StudyPilot AI', caption: 'An AI-assisted planner that helps students organize what comes next.', label: 'AI APPLICATION', image: '/projects/studypilot.svg', alt: 'Illustrative StudyPilot AI interface artwork', liveUrl: projects[2].liveUrl },
    { title: "Don't Open the Door", caption: 'A small original Rive game with a retro-style start screen. Play it online.', label: 'PERSONAL GAME / RIVE', image: '/projects/dont-open-the-door.png', alt: "Real screenshot of Don't Open the Door game title screen", liveUrl: projects[3].liveUrl },
    { title: 'Skillora', caption: 'A freelancer-manager and marketplace idea in early planning.', label: 'EXPLORING / CONCEPT', image: '/projects/skillora.svg', alt: 'Skillora concept artwork' },
  ];
  return (
    <section id="projects" className="relative isolate py-16 md:py-20 overflow-hidden border-t border-white/10">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 flex flex-wrap items-end justify-between gap-6 relative z-10">
        <div>
          <span className="ay-eyebrow">03 / SELECTED WORK</span>
          <h2 className="ay-section-title mt-4">Proof, not promises<span className="text-[#c9f48d]">.</span></h2>
        </div>
        <div className="max-w-sm text-sm text-neutral-400 leading-relaxed">Web projects, a playable game, and a concept in progress. Drag the line, browse the prints, and open a project to explore the work.</div>
      </div>
      <PolaroidLineCarousel slides={slides} ariaLabel="Abhijeet Yadav featured projects" height="min(77svh,750px)" cardWidth={330} sag={46} swing={0.85} autoplay={5800} onSelect={i => setActiveModalProject(projects[i])} />
      <p className="relative text-center text-[11px] font-mono text-neutral-500 px-6 pb-6">Project preview artwork is illustrative; the game print uses a real screenshot. Open a live link to try a project.</p>
      <ProjectModal project={activeModalProject} onClose={() => setActiveModalProject(null)} />
    </section>
  );
}
