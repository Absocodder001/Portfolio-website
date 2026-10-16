"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export type Skill = { name: string; group: "Web" | "Languages" | "Tools" };
export type TimelineProps = { title?: string; skills: Skill[]; accent?: string };

/**
 * Reference-inspired horizontal pinning timeline:
 * - Vertical scrolling moves a long track sideways.
 * - Skills are initially unrevealed; only the centered entries appear.
 * - Every skill comes into view, including on narrow screens.
 * - No years, false percentages, or fabricated milestones.
 */
export default function Timeline({
  title = "My toolkit, in motion.",
  skills,
  accent = "#d9b99a",
}: TimelineProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!section || !viewport || !track) return;

    const cards = Array.from(track.querySelectorAll<HTMLElement>("[data-skill-card]"));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!skills.length || reduced || cards.length <= 1) {
      cards.forEach((card) => {
        const label = card.querySelector<HTMLElement>("[data-skill-label]");
        const stem = card.querySelector<HTMLElement>("[data-skill-stem]");
        const dot = card.querySelector<HTMLElement>("[data-skill-dot]");
        if (label) { label.style.opacity = "1"; label.style.transform = "none"; }
        if (stem) stem.style.transform = "scaleY(1)";
        if (dot) dot.style.transform = "scale(1)";
      });
      if (progressRef.current) progressRef.current.style.width = "100%";
      if (counterRef.current) counterRef.current.textContent =
        String(skills.length).padStart(2,"0") + " / " + String(skills.length).padStart(2,"0");
      return;
    }

    const range = () => Math.max(0, track.scrollWidth - viewport.clientWidth);
    const paint = (p: number) => {
      const slide = p * Math.max(0, skills.length - 1);
      gsap.set(track, { x: -range() * p });
      if (progressRef.current) progressRef.current.style.width =
        (p * 100).toFixed(2) + "%";
      if (counterRef.current) {
        const active = Math.min(skills.length-1, Math.max(0,Math.round(slide)));
        counterRef.current.textContent =
          String(active+1).padStart(2,"0")+" / "+String(skills.length).padStart(2,"0");
      }
      cards.forEach((card,index) => {
        const distance = Math.abs(index-slide);
        // Only the centered entry is fully revealed. The neighbor edges in,
        // rather than displaying all skills from the beginning.
        const visibility = Math.max(0,Math.min(1,(1.13-distance)/0.84));
        const label=card.querySelector<HTMLElement>("[data-skill-label]");
        const stem=card.querySelector<HTMLElement>("[data-skill-stem]");
        const dot=card.querySelector<HTMLElement>("[data-skill-dot]");
        if(label){
          label.style.opacity=String(visibility);
          label.style.transform="translate3d("+((index>slide?1:-1)*(1-visibility)*30).toFixed(1)+"px,0,0)";
        }
        if(stem)stem.style.transform="scaleY("+visibility.toFixed(3)+")";
        if(dot)dot.style.transform="scale("+(.45+visibility*.55).toFixed(3)+")";
        card.dataset.revealed=visibility>.75?"true":"false";
      });
    };

    let trigger: ScrollTrigger | undefined;
    const context = gsap.context(() => {
      trigger=ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => "+=" + Math.max(1150,range()*1.25),
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: self => paint(self.progress),
        onRefresh: self => paint(self.progress),
      });
    }, section);

    paint(trigger?.progress ?? 0);
    const onResize=()=>ScrollTrigger.refresh();
    window.addEventListener("resize",onResize);
    let canceled=false;
    document.fonts?.ready?.then(()=>{if(!canceled) ScrollTrigger.refresh();});
    return ()=>{
      canceled=true;
      window.removeEventListener("resize",onResize);
      context.revert();
      gsap.set(track,{clearProps:"transform"});
    };
  },[skills]);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative isolate h-[100svh] min-h-[600px] overflow-hidden border-y border-white/10 bg-[#050505]"
      aria-label="Technical skills timeline"
    >
      <div className="pointer-events-none absolute inset-0 opacity-65" aria-hidden="true"
        style={{background:"linear-gradient(90deg,transparent 0,rgba(245,215,187,.035) 50%,transparent 100%)"}}/>
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 pt-20 md:pt-20 flex items-end justify-between gap-5">
        <div>
          <span className="font-mono text-[10px] tracking-[.24em] text-[#c9a98f] uppercase">02 / SKILLS AND TOOLS</span>
          <h2 className="font-['Syne'] font-bold tracking-[-.055em] leading-[.97] text-4xl sm:text-6xl md:text-[5.3rem] text-[#f7f5f2] mt-4">
            {title}
          </h2>
        </div>
        <p className="hidden md:block max-w-[240px] text-[13px] text-neutral-500 leading-relaxed">
          Keep scrolling. Each skill comes into view as the line travels sideways.
        </p>
      </div>

      <div
        ref={viewportRef}
        className="absolute inset-x-0 top-[31%] bottom-[13%] overflow-hidden
          motion-reduce:overflow-x-auto motion-reduce:touch-pan-x"
        aria-label="Scroll down to reveal each skill"
      >
        <div
          ref={trackRef}
          className="relative flex h-full w-max items-stretch
            [--skill-step:230px] sm:[--skill-step:270px] md:[--skill-step:340px]"
          style={{paddingInline:"calc((100vw - var(--skill-step)) / 2)"}}
          role="list"
        >
          <div className="absolute h-px top-1/2 left-0 right-0 bg-[#91877e]/35 pointer-events-none" aria-hidden="true"/>
          <div ref={progressRef}
            className="absolute top-1/2 left-0 h-[2px] pointer-events-none"
            style={{width:"0%",backgroundColor:accent,boxShadow:"0 0 14px rgba(223,183,143,.32)"}}
            aria-hidden="true"/>
          {skills.map((skill,index)=>{
            const top=index%2===0;
            return (
              <div key={skill.name} data-skill-card role="listitem"
                className="relative shrink-0 h-full w-[var(--skill-step)]"
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                  <div data-skill-dot className="w-3 h-3 rounded-full border-[3px] border-[#050505]"
                    style={{background:accent}} />
                </div>
                <div data-skill-stem className={"absolute left-1/2 w-px h-[27%] z-10 "+(top?"bottom-1/2 origin-bottom":"top-1/2 origin-top")}
                  style={{background:accent}} aria-hidden="true"/>
                <div data-skill-label
                  className={"absolute left-[9%] right-[9%] flex items-center justify-center text-center "+(top?"top-[6%] bottom-[53%]":"top-[55%] bottom-[4%]")}
                >
                  <div>
                    <span className="block mb-4 font-mono text-[10px] text-[#ba9b84] tracking-[.24em]">
                      {String(index+1).padStart(2,"0")}
                    </span>
                    <h3 className="font-['Space_Grotesk'] font-semibold tracking-[-.05em] leading-none text-[#f5eee7] text-3xl sm:text-4xl md:text-[2.6rem]">
                      {skill.name}
                    </h3>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="absolute bottom-8 left-6 right-6 md:left-10 md:right-10 z-10 flex justify-between items-center gap-5 border-t border-white/10 pt-5">
        <span className="text-[10px] uppercase tracking-[.16em] text-neutral-500 font-mono">
          Scroll to uncover all {skills.length} skills
        </span>
        <span ref={counterRef} className="font-mono text-sm tracking-[.12em] text-[#d8b99e] tabular-nums">
          01 / {String(skills.length).padStart(2,"0")}
        </span>
      </div>
    </section>
  );
}
