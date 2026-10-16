"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export type Skill = { name: string; group: "Web" | "Languages" | "Tools" };
export type TimelineProps = { title?: string; skills: Skill[]; accent?: string };

/** Horizontal scroll-linked capability rail. No dates, fabricated percentages, or false claims. */
export default function Timeline({ title = "My toolkit, in motion.", skills, accent = "#c9f48d" }: TimelineProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!section || !viewport || !track || !skills.length) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desktop = window.matchMedia("(min-width: 768px)").matches;
    if (reduced || !desktop) return;

    const ctx = gsap.context(() => {
      const travel = () => Math.max(0, track.scrollWidth - viewport.clientWidth + 48);
      gsap.to(track, {
        x: () => -travel(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => "+=" + Math.max(750, travel() * 1.25),
          pin: true,
          scrub: 0.9,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => setProgress(self.progress),
        },
      });
    }, section);
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("resize", refresh);
    document.fonts?.ready.then(refresh);
    return () => { window.removeEventListener("resize", refresh); ctx.revert(); };
  }, [skills]);

  return (
    <section ref={sectionRef} id="skills" className="skill-timeline relative isolate overflow-hidden border-y border-white/10" aria-label="Technical skills">
      <div className="skill-timeline-wash absolute inset-0 pointer-events-none" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1600px] px-6 md:px-10 pt-24 md:pt-20">
        <div className="flex flex-wrap justify-between items-end gap-6">
          <div>
            <span className="ay-eyebrow">02 / SELECTED CAPABILITIES</span>
            <h2 className="ay-section-title max-w-[12ch] mt-4">{title}</h2>
          </div>
          <p className="text-neutral-400 max-w-[30ch] text-sm leading-relaxed">
            An evolving toolkit shaped by what I actually build. Scroll to explore.
          </p>
        </div>
      </div>
      <div ref={viewportRef} className="relative w-full md:overflow-hidden overflow-x-auto skill-mobile-scroller pt-12 md:pt-16 pb-12 md:pb-16" tabIndex={0} aria-label="Swipe to explore skills">
        <div ref={trackRef} className="relative flex items-stretch min-w-max gap-4 sm:gap-6 px-6 md:px-[8vw]" role="list">
          <div className="absolute top-[51%] h-px left-4 right-4 bg-white/20" aria-hidden="true" />
          <div className="absolute top-[51%] h-px left-4 bg-[#c9f48d] transition-[width] duration-150" style={{ width: `${Math.max(0, progress * 95)}%`, maxWidth: "calc(100% - 2rem)" }} aria-hidden="true" />
          {skills.map((skill, index) => (
            <div key={skill.group + skill.name} data-skill role="listitem" className={`skill-timeline-item relative w-[min(72vw,290px)] md:w-[310px] h-[310px] flex flex-col ${index % 2 ? "justify-end" : "justify-start"}`}>
              <div className={`absolute left-7 z-10 w-px h-[76px] bg-[#c9f48d]/60 ${index % 2 ? "top-[51%]" : "bottom-[49%]"}`} aria-hidden="true" />
              <span className="absolute left-[22px] top-[calc(51%-6px)] z-20 h-3 w-3 rounded-full border-[3px] border-[#0b1113]" style={{ backgroundColor: accent }} aria-hidden="true" />
              <div className="relative min-h-[112px] rounded-xl border border-white/10 bg-[#111b1e]/80 backdrop-blur-md py-5 px-5 hover:border-[#c9f48d]/40 transition-colors duration-300">
                <span className="text-[10px] tracking-[0.18em] uppercase text-[#99bdaf] font-mono">{skill.group}</span>
                <h3 className="font-['Space_Grotesk'] text-[clamp(1.35rem,2vw,1.8rem)] font-semibold tracking-tight text-[#f3f8f0] mt-3">{skill.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="relative mx-auto max-w-[1600px] px-6 md:px-10 pb-10 flex justify-between text-[11px] uppercase tracking-[0.16em] font-mono text-neutral-500">
        <span>Development / Design / Problem-solving</span>
        <span className="hidden md:inline">Scroll downward →</span>
        <span className="md:hidden">Swipe sideways →</span>
      </div>
    </section>
  );
}
