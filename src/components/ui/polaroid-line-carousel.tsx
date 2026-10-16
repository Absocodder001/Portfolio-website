"use client";

import * as React from "react";

export type Slide = { image?: string; title?: string; caption?: string; alt?: string; liveUrl?: string; label?: string };
export type PolaroidLineCarouselProps = {
  slides?: Slide[]; height?: number | string; cardWidth?: number; sag?: number; swing?: number;
  autoplay?: number; string?: string; background?: string; ink?: string;
  onChange?: (index: number) => void; onSelect?: (index: number) => void;
  className?: string; style?: React.CSSProperties; ariaLabel?: string;
};

const clamp = (v: number, low: number, high: number) => Math.max(low, Math.min(high, v));
const spring = (x: number, v: number, target: number, dt: number): [number, number] => {
  const k = 78;
  const nv = v + (k * (target - x) - 2 * Math.sqrt(k) * v) * dt;
  return [x + nv * dt, nv];
};

export default function PolaroidLineCarousel({
  slides = [], height = "min(78svh, 760px)", cardWidth = 320, sag = 42, swing = 1,
  autoplay = 6500, string = "#7a9d91", background = "transparent", ink = "#f0f4ec",
  onChange, onSelect, className = "", style, ariaLabel = "Selected projects",
}: PolaroidLineCarouselProps) {
  const n = slides.length;
  const root = React.useRef<HTMLDivElement | null>(null);
  const cardEls = React.useRef<(HTMLDivElement | null)[]>([]);
  const path = React.useRef<SVGPathElement | null>(null);
  const sim = React.useRef({ pos: 0, velocity: 0, target: 0, angles: [] as number[], speeds: [] as number[] });
  const pointer = React.useRef<{ x: number; pos: number; lastX: number; lastT: number; speed: number; moved: boolean } | null>(null);
  const activeRef = React.useRef(0);
  const lastTouch = React.useRef(0);
  const [active, setActive] = React.useState(0);
  const [dragging, setDragging] = React.useState(false);
  const [dimension, setDimension] = React.useState({ w: 1100, h: 690, cw: cardWidth });
  const reduced = React.useRef(false);
  const spacing = dimension.cw * 1.11;

  React.useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = root.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const r = el.getBoundingClientRect();
      setDimension({ w: r.width, h: r.height, cw: Math.round(clamp(Math.min(cardWidth, r.width * .68, r.height * .52), 170, cardWidth)) });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [cardWidth]);

  React.useEffect(() => { sim.current.pos = activeRef.current * spacing; sim.current.target = sim.current.pos; }, [spacing]);
  React.useEffect(() => { onChange?.(active); }, [active, onChange]);

  React.useEffect(() => {
    const el = root.current;
    if (!el || !n) return;
    let raf = 0, visible = true, previous = performance.now();
    const update = (now: number) => {
      raf = 0;
      if (!visible) return;
      const dt = Math.min(.034, Math.max(0, (now - previous) / 1000));
      previous = now;
      const S = sim.current, drag = pointer.current, old = S.pos;
      if (!drag?.moved) [S.pos, S.velocity] = spring(S.pos, S.velocity, S.target, dt);
      const lineV = drag?.moved ? drag.speed * 1000 : -(S.pos - old) / Math.max(dt, .001);
      const { w, h, cw } = dimension, y0 = Math.max(52, h * .16);
      const chosen = clamp(Math.round(S.pos / spacing), 0, n - 1);
      for (let i = 0; i < n; i++) {
        const node = cardEls.current[i];
        if (!node) continue;
        const x = w / 2 + i * spacing - S.pos;
        node.style.visibility = x < -cw * 1.5 || x > w + cw * 1.5 ? "hidden" : "visible";
        let angle = S.angles[i] || 0, speed = S.speeds[i] || 0;
        const gain = reduced.current ? 0 : swing;
        speed += (-36 * angle - 5 * speed + lineV * .003 * gain) * dt;
        angle = clamp(angle + speed * dt, -.42, .42);
        if (gain) angle += Math.sin(now / 1700 + i * 1.8) * .0003 * gain;
        S.angles[i] = angle; S.speeds[i] = speed;
        const u = clamp(x / w, 0, 1);
        const y = y0 + 4 * sag * u * (1 - u) - 7;
        node.style.transform = `translate3d(${(x - cw / 2).toFixed(1)}px,${y.toFixed(1)}px,0) rotate(${angle.toFixed(4)}rad)`;
        node.style.zIndex = String(chosen === i ? n + 1 : n - Math.abs(chosen - i));
      }
      path.current?.setAttribute("d", `M0 ${y0} Q${w / 2} ${y0 + 2 * sag} ${w} ${y0}`);
      if (chosen !== activeRef.current) { activeRef.current = chosen; setActive(chosen); }
      raf = requestAnimationFrame(update);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !raf) { previous = performance.now(); raf = requestAnimationFrame(update); }
    });
    observer.observe(el);
    raf = requestAnimationFrame(update);
    return () => { cancelAnimationFrame(raf); observer.disconnect(); };
  }, [n, dimension, spacing, sag, swing]);

  const go = React.useCallback((next: number) => { sim.current.target = clamp(next, 0, n - 1) * spacing; }, [n, spacing]);
  React.useEffect(() => {
    if (!autoplay || n < 2 || reduced.current) return;
    const t = window.setInterval(() => {
      if (document.hidden || pointer.current || performance.now() - lastTouch.current < autoplay) return;
      go((activeRef.current + 1) % n);
    }, autoplay);
    return () => window.clearInterval(t);
  }, [autoplay, n, go]);

  const down = (e: React.PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("button,a")) return;
    lastTouch.current = performance.now();
    pointer.current = { x: e.clientX, pos: sim.current.pos, lastX: e.clientX, lastT: e.timeStamp, speed: 0, moved: false };
  };
  const move = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = pointer.current;
    if (!d) return;
    const dx = e.clientX - d.x;
    if (!d.moved && Math.abs(dx) > 6) { d.moved = true; setDragging(true); root.current?.setPointerCapture(e.pointerId); }
    if (!d.moved) return;
    const ms = Math.max(1, e.timeStamp - d.lastT);
    d.speed = .65 * ((e.clientX - d.lastX) / ms) + .35 * d.speed;
    d.lastX = e.clientX; d.lastT = e.timeStamp;
    let pos = d.pos - dx;
    const max = (n - 1) * spacing;
    if (pos < 0) pos *= .3;
    if (pos > max) pos = max + (pos - max) * .3;
    sim.current.pos = pos;
  };
  const up = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = pointer.current; pointer.current = null;
    setDragging(false); lastTouch.current = performance.now();
    if (!d) return;
    if (d.moved) {
      sim.current.velocity = -d.speed * 1000;
      go(Math.round((sim.current.pos - d.speed * 170) / spacing));
      if (root.current?.hasPointerCapture(e.pointerId)) root.current.releasePointerCapture(e.pointerId);
    } else {
      const card = (e.target as HTMLElement).closest("[data-card-index]");
      if (card) go(Number(card.getAttribute("data-card-index")));
    }
  };
  const step = (dir: number) => { lastTouch.current = performance.now(); go(activeRef.current + dir); };
  const current = slides[active] || {};
  return (
    <div ref={root} className={`pl-root ${className}`} role="region" aria-roledescription="carousel" aria-label={ariaLabel}
      tabIndex={0} data-drag={dragging ? "1" : "0"}
      onKeyDown={e => { if (e.key === "ArrowRight" || e.key === "ArrowLeft") { e.preventDefault(); step(e.key === "ArrowRight" ? 1 : -1); } }}
      onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up}
      style={{ height, background, color: ink, ...style }}>
      <svg className="pl-line" aria-hidden="true"><path ref={path} stroke={string} strokeWidth="1.5" fill="none" /></svg>
      {slides.map((slide, i) => (
        <div key={slide.title + i} data-card-index={i} ref={node => { cardEls.current[i] = node; }}
          className={`pl-card ${i === active ? "pl-card-active" : ""}`} style={{ width: dimension.cw }}>
          <div className="pl-peg" aria-hidden="true" />
          <div className="pl-print">
            <div className="pl-image">{slide.image ? <img src={slide.image} alt={slide.alt || slide.title || ""} draggable={false} loading="lazy" /> : <div className="pl-empty" />}</div>
            <div className="pl-handwriting">{slide.title}</div>
          </div>
        </div>
      ))}
      <div className="pl-controls" onPointerDown={e => e.stopPropagation()}>
        <div className="min-w-0 flex-1">
          <span className="pl-overline">{current.label || "SELECTED WORK"}</span>
          <h3 className="pl-name">{current.title || ""}</h3>
          <p className="pl-caption">{current.caption || ""}</p>
          <div className="flex gap-4 items-center mt-3">
            <button type="button" className="pl-text-link" onClick={() => onSelect?.(active)}>Explore case study ↗</button>
            {current.liveUrl && <a className="pl-text-link" href={current.liveUrl} target="_blank" rel="noopener noreferrer">Visit live website ↗</a>}
          </div>
        </div>
        <div className="pl-buttons">
          <span className="pl-counter">{String(active+1).padStart(2,"0")} / {String(Math.max(1,n)).padStart(2,"0")}</span>
          <button type="button" aria-label="Previous project" onClick={() => step(-1)}>←</button>
          <button type="button" aria-label="Next project" onClick={() => step(1)}>→</button>
        </div>
      </div>
      <span className="sr-only" aria-live="polite">{`Project ${active + 1} of ${n}: ${current.title || ""}`}</span>
    </div>
  );
}
