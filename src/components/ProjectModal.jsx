import React from 'react';
import { X, ExternalLink, CheckCircle2, Cpu, Layers } from 'lucide-react';

function GithubIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
    </svg>
  );
}

export default function ProjectModal({ project, onClose }) {
  React.useEffect(() => {
    if (!project) return;
    const dismissOnEscape = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', dismissOnEscape);
    return () => window.removeEventListener('keydown', dismissOnEscape);
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div onClick={onClose} className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        role="dialog"
        aria-modal="true"
        aria-label={`${project.title} project details`}
        className="relative w-full max-w-4xl bg-[#0c0c10] border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#101014] border-b border-neutral-800 font-mono text-xs">
          <div className="flex items-center gap-2 text-white">
            <Cpu className="w-4 h-4 text-neutral-400" />
            <span className="font-bold">SYSTEM_SPECIFICATION // {project.codeId}</span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close project details"
            className="p-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          
          {/* Title & Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono text-neutral-400 tracking-widest uppercase">
                {project.category}
              </span>
              <h3 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-white mt-1">
                {project.title}
              </h3>
            </div>

            {/* Links */}
            <div className="flex items-center gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-lg font-mono text-xs font-bold uppercase text-black bg-white hover:bg-neutral-200 flex items-center gap-1.5 transition-all"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>LIVE DEMO</span>
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-lg font-mono text-xs font-semibold uppercase text-neutral-300 bg-neutral-900 border border-neutral-700 hover:border-neutral-500 hover:text-white flex items-center gap-1.5 transition-all"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>CODEBASE</span>
                </a>
              )}
            </div>
          </div>

          {/* Architecture Banner */}
          <div className="relative rounded-xl border border-neutral-800 bg-neutral-900/50 p-6 sm:p-8 flex flex-col justify-center min-h-[160px]">
            <span className="inline-block px-2.5 py-1 rounded bg-neutral-800 border border-neutral-700 text-neutral-300 font-mono text-xs mb-3 w-fit">
              {project.tagline}
            </span>
            <p className="text-sm text-neutral-300 leading-relaxed font-light">
              {project.fullDescription}
            </p>
          </div>

          {/* Highlights */}
          <div>
            <h4 className="font-['Space_Grotesk'] text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-white" />
              KEY CAPABILITIES & HIGHLIGHTS
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.highlights.map((h, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-lg bg-neutral-900/60 border border-neutral-800 flex items-start gap-3"
                >
                  <span className="text-white font-mono text-xs font-bold mt-0.5">0{i + 1}.</span>
                  <p className="text-xs text-neutral-300 leading-relaxed font-light">{h}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <h4 className="font-['Space_Grotesk'] text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-neutral-400" />
              DEPLOYED TECH STACK
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 font-mono text-xs"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-[#101014] border-t border-neutral-800 flex items-center justify-between font-mono text-xs text-neutral-400">
          <span>STATUS: DEPLOYED & TESTED</span>
          <button
            onClick={onClose}
            className="text-white hover:underline"
          >
            [CLOSE WINDOW]
          </button>
        </div>
      </div>
    </div>
  );
}
