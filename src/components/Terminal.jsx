import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, CornerDownLeft, Trash2 } from 'lucide-react';
import { SplitHeading, ScrollReveal } from './ScrollReveal';
import { cyberAudio } from '../utils/audio';

export default function TerminalSection() {
  const [history, setHistory] = useState([
    { type: 'system', text: 'SYSTEM INTERACTIVE CONSOLE v2.6 [INITIALIZED]' },
    { type: 'system', text: 'Type "help" to view available directives, or execute quick query chips below.' },
  ]);
  const [inputVal, setInputVal] = useState('');
  const bottomRef = useRef(null);

  const commandLibrary = {
    help: [
      'Available Console Directives:',
      '  • whoami     - Display primary candidate identity',
      '  • skills     - Summarize technical capabilities & stack',
      '  • projects   - Enumerate key production web deployments',
      '  • education  - Print university & academic status',
      '  • contact    - Output direct communication coordinates',
      '  • clear      - Flush terminal history buffer',
      '  • quote      - Print developer architectural philosophy'
    ],
    whoami: [
      'NAME: Abhijeet Yadav',
      'ROLE: Frontend Web Developer | Web Designer',
      'LOCATION: Howrah, West Bengal, India',
      'CAMPUS: Sister Nivedita University, Kolkata (B.Tech CSE)',
      'MISSION: Building high-impact, accessible & visually refined spatial web applications.'
    ],
    skills: [
      'TECHNICAL STACK:',
      '  [WEB]: React 19, Next.js, TypeScript, JavaScript (ES6+), Tailwind CSS, HTML5/CSS3',
      '  [AI]: Google Gemini API Integration, LLM Structured Outputs, REST Endpoints',
      '  [CORE]: Java (Multi-Threading, OOP), C, C++, Relational SQL',
      '  [DEV]: Git, GitHub, Vercel Edge Deployment, Three.js 3D WebGL'
    ],
    projects: [
      'DEPLOYED PROJECTS:',
      '  1. Ironcore Fitness -> Modern Gym Platform (Next.js, TypeScript, Tailwind, Vercel)',
      '  2. StudyPilot AI    -> AI Study Planning Web App (React/Next.js, Gemini API, Adaptive Logic)',
      '  3. Skillora         -> Freelancer & Client Marketplace Concept (React, Scalable UI)'
    ],
    education: [
      'ACADEMIC PROFILE:',
      '  Degree: Bachelor of Technology (B.Tech) in Computer Science & Engineering',
      '  Institute: Sister Nivedita University, Kolkata (2024 - Present)',
      '  Certifications: Coursera (Java EE, Multi-Threading, C, Software Problem Solving)'
    ],
    contact: [
      'COMMUNICATION COORDINATES:',
      '  Email: yadavhema231@gmail.com',
      '  Phone: +91 7439856465',
      '  Location: Howrah, West Bengal, India',
      '  Status: Open for Contract, Freelance & Frontend Internships'
    ],
    quote: [
      '"Simplicity is prerequisite for reliability." — Edsger W. Dijkstra',
      '"Good design is as little design as possible." — Dieter Rams'
    ]
  };

  const handleCommand = (cmdStr) => {
    const trimmed = cmdStr.trim().toLowerCase();
    if (!trimmed) return;

    if (trimmed === 'clear') {
      setHistory([]);
      return;
    }

    const newHistory = [...history, { type: 'input', text: `abhijeet@workstation:~$ ${cmdStr}` }];

    if (commandLibrary[trimmed]) {
      const outputLines = commandLibrary[trimmed].map((line) => ({ type: 'output', text: line }));
      setHistory([...newHistory, ...outputLines]);
      cyberAudio.playChime(650);
    } else {
      setHistory([
        ...newHistory,
        { type: 'error', text: `Command not recognized: "${cmdStr}". Type "help" for a list of valid commands.` }
      ]);
      cyberAudio.playPulse();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCommand(inputVal);
    setInputVal('');
  };

  const runQuick = (cmd) => {
    handleCommand(cmd);
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  return (
    <section id="terminal" className="relative py-24 bg-[#08080b] border-t border-neutral-800 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Split Heading */}
        <div className="text-center mb-12 flex flex-col items-center">
          <SplitHeading
            prefix="SECTION // 05. INTERACTIVE CLI"
            leftText="SYSTEM"
            rightText="TERMINAL"
            className="flex flex-col items-center"
          />
          <ScrollReveal direction="bottom">
            <p className="text-neutral-400 text-xs sm:text-sm font-mono mt-2 text-center">
              Execute direct terminal queries for credentials, stack specifications, and deployment telemetry.
            </p>
          </ScrollReveal>
        </div>

        {/* Terminal Window with ScrollReveal */}
        <ScrollReveal direction="bottom">
          <div className="rounded-2xl bg-[#0a0a0e] border border-neutral-800 shadow-2xl overflow-hidden">
            
            {/* Header Bar */}
            <div className="px-4 py-3 bg-[#101014] border-b border-neutral-800 flex items-center justify-between font-mono text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-600"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-600"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-600"></span>
                <span className="text-neutral-400 font-mono text-[11px] ml-2 hidden sm:inline">
                  guest@workstation: ~ (zsh)
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-neutral-300 text-[11px] flex items-center gap-1 font-mono">
                  <TerminalIcon className="w-3.5 h-3.5 text-neutral-400" />
                  SHELL_READY
                </span>
                <button
                  onClick={() => setHistory([])}
                  className="text-neutral-500 hover:text-white p-1 rounded"
                  title="Clear screen"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Quick-Run Action Chips */}
            <div className="px-4 py-2.5 bg-[#0e0e12] border-b border-neutral-800 flex flex-wrap items-center gap-2 font-mono text-[11px]">
              <span className="text-neutral-500 uppercase text-[10px] mr-1">Quick Directives:</span>
              {['help', 'whoami', 'skills', 'projects', 'education', 'contact', 'clear'].map((cmd) => (
                <button
                  key={cmd}
                  onClick={() => runQuick(cmd)}
                  className="px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors"
                >
                  &gt; {cmd}
                </button>
              ))}
            </div>

            {/* Terminal Screen Body */}
            <div className="p-4 sm:p-6 font-mono text-xs sm:text-sm h-72 sm:h-80 overflow-y-auto space-y-2 text-neutral-200">
              {history.map((line, i) => (
                <div key={i} className="leading-relaxed">
                  {line.type === 'system' && (
                    <span className="text-neutral-400">{line.text}</span>
                  )}
                  {line.type === 'input' && (
                    <span className="text-white font-bold">{line.text}</span>
                  )}
                  {line.type === 'output' && (
                    <span className="text-neutral-300">{line.text}</span>
                  )}
                  {line.type === 'error' && (
                    <span className="text-red-400">{line.text}</span>
                  )}
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Command Prompt Input */}
            <form
              onSubmit={handleSubmit}
              className="px-4 py-3 bg-[#101014] border-t border-neutral-800 flex items-center gap-2 font-mono"
            >
              <span className="text-white font-bold text-xs sm:text-sm shrink-0">
                abhijeet@workstation:~$
              </span>
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="type 'help' or click buttons above..."
                className="w-full bg-transparent text-white text-xs sm:text-sm focus:outline-none placeholder-neutral-600 font-mono"
              />
              <button
                type="submit"
                className="p-1.5 rounded bg-neutral-800 border border-neutral-700 text-neutral-300 hover:text-white"
                title="Execute directive"
              >
                <CornerDownLeft className="w-4 h-4" />
              </button>
            </form>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
