import React, { useEffect, useRef, useState } from "react";

/**
 * A WOVEN PARTICLE SHEET — not a circular/ring mesh.
 * The fabric spans horizontally and folds in pseudo-3D. Pointer movement
 * steers a long wave across its strands, with no radial displacement,
 * circular void, glowing cursor halo or visible mouse-following ring.
 */
export default function InteractiveParticleSilk() {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d", { alpha: true });
    if (!wrap || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let w = 600, h = 500, dpr = 1, raf = 0, last = 0, clock = 0;
    let paused = false, disposed = false;
    const pointer = {
      x: 0, y: 0, px: 0, py: 0, active: false, down: false,
      velocity: 0, impulse: 0, yaw: 0, targetYaw: 0,
      fold: 0, targetFold: 0
    };

    function resize() {
      const r = wrap.getBoundingClientRect();
      w = Math.max(1, r.width); h = Math.max(1, r.height);
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    function locate(e) {
      const r = wrap.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    }
    function onMove(e) {
      const p = locate(e);
      pointer.active = true;
      pointer.x = Math.min(1, Math.max(-1, p.x / w * 2 - 1));
      pointer.y = Math.min(1, Math.max(-1, p.y / h * 2 - 1));
      const movement = Math.hypot(p.x - pointer.px, p.y - pointer.py);
      pointer.impulse = Math.min(1, pointer.impulse + movement * 0.012);
      pointer.targetFold = pointer.y * 0.8;
      if (pointer.down) {
        pointer.targetYaw += (p.x - pointer.px) * .0025;
        pointer.targetYaw = Math.min(0.65, Math.max(-0.65, pointer.targetYaw));
      }
      pointer.px = p.x; pointer.py = p.y;
    }
    function onDown(e) {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      const p=locate(e);
      pointer.px = p.x; pointer.py = p.y;
      pointer.down = true;
      wrap.setPointerCapture?.(e.pointerId);
      setDragging(true);
    }
    function onUp(e) {
      pointer.down = false;
      if(wrap.hasPointerCapture?.(e.pointerId))wrap.releasePointerCapture(e.pointerId);
      setDragging(false);
    }
    function onLeave() {
      if (!pointer.down) { pointer.active = false; pointer.targetFold = 0; }
    }

    const isSmall = () => w < 600;
    function render(now) {
      raf = 0;
      if (disposed || paused || document.hidden) return;
      const frameInterval = isSmall() ? 30 : 22;
      if (now - last < frameInterval) { raf=requestAnimationFrame(render); return; }
      const dt = Math.min(.05, Math.max(.008,(now - last)/1000));
      last = now;
      if(!reduce.matches) clock += dt;
      ctx.clearRect(0,0,w,h);

      pointer.yaw += (pointer.targetYaw-pointer.yaw)*.065;
      pointer.fold += (pointer.targetFold-pointer.fold)*.07;
      pointer.impulse *= .958;
      if (!pointer.down) pointer.targetYaw *= .992;

      const phase = clock;
      const cx = w*.5, cy = h*.505;
      const s = Math.min(w/620,h/520)*1.02;
      const yawC=Math.cos(pointer.yaw), yawS=Math.sin(pointer.yaw);
      const strandCount=isSmall()?65:105;
      const lengthCount=isSmall()?110:176;
      const out = [];

      // Longitudinal strands. Both dimensions run linearly across a sheet,
      // NEVER around a circular angle.
      for (let row=0;row<strandCount;row++) {
        const v = row/(strandCount-1)*2-1;
        const edge = Math.pow(Math.max(0,1-v*v),.48);
        for(let col=0;col<lengthCount;col++) {
          const u=col/(lengthCount-1)*2-1;
          const fade=Math.pow(Math.max(0,1-u*u),.16);
          const twisting=Math.sin(u*3.3+phase*.44);
          const rolling=Math.cos(u*7.2-phase*.36+v*1.9);
          const fold1=Math.sin(u*4.9+v*2.1+phase*.39);
          const fold2=Math.cos(u*8.1-v*4.1-phase*.29);

          // Cursor bends a vertical, elongated section of the fabric.
          // This uses one-dimensional longitudinal falloff, not a circle.
          const reach=Math.exp(-Math.pow((u-pointer.x)/.38,2));
          const interaction=pointer.active&&!reduce.matches?reach*(.28+pointer.impulse*.72):0;
          let x=u*315 + v*(21*twisting+10*rolling);
          let y=73*twisting+26*fold2 + v*(64*Math.cos(u*2.8+phase*.42)+52*fold1)
                + 28*Math.sin(u*10+v*3+phase*.62)*edge;
          let z=v*(98*Math.sin(u*3.4-phase*.29)+50*Math.cos(u*5.8+phase*.23))
                + 76*Math.cos(u*4.1-v*1.5+phase*.32)
                + 30*fold2;
          // An advected fold: whole threads shear together instead of
          // forming a round indentation at the pointer.
          y += interaction*(72*pointer.fold+54*Math.sin(u*12+phase*.8));
          z += interaction*(96*Math.cos(u*5+phase*.5)+pointer.impulse*90);
          x += interaction*42*v*Math.sin(u*4+phase*.6);
          const rx=x*yawC-z*yawS;
          const rz=x*yawS+z*yawC;
          const perspective=890/(890+rz);
          const px=cx+rx*perspective*s;
          const py=cy+y*perspective*s;
          if(px<0||px>w||py<0||py>h)continue;
          const lum=.66+.34*Math.sin(u*8+v*6+phase*.55);
          const alpha=Math.min(.91,Math.max(.045,edge*fade*(.28+.45*lum)*(1+rz/1000)));
          const size=Math.min(1.85,Math.max(.65,(1.12+perspective*.11)*s));
          out.push([px,py,rz,alpha,size,v]);
        }
      }

      // A little depth-sorting gives a soft 3-D woven density.
      out.sort((a,b)=>b[2]-a[2]);
      for(const p of out){
        const warm=p[5]>.05;
        ctx.fillStyle=warm
          ? "rgba(214,187,156,"+p[3].toFixed(3)+")"
          : "rgba(235,227,214,"+p[3].toFixed(3)+")";
        ctx.fillRect(p[0],p[1],p[4],p[4]);
      }
      if(!reduce.matches) raf=requestAnimationFrame(render);
    }

    const ro=new ResizeObserver(resize);
    const io=new IntersectionObserver(([entry])=>{
      paused=!entry.isIntersecting;
      if(!paused && !raf && !disposed){last=performance.now();raf=requestAnimationFrame(render);}
    });
    ro.observe(wrap);io.observe(wrap);resize();
    wrap.addEventListener("pointermove",onMove,{passive:true});
    wrap.addEventListener("pointerleave",onLeave);
    wrap.addEventListener("pointerdown",onDown);
    wrap.addEventListener("pointerup",onUp);
    wrap.addEventListener("pointercancel",onUp);
    raf=requestAnimationFrame(render);

    return ()=>{
      disposed=true;
      cancelAnimationFrame(raf);
      ro.disconnect();io.disconnect();
      wrap.removeEventListener("pointermove",onMove);
      wrap.removeEventListener("pointerleave",onLeave);
      wrap.removeEventListener("pointerdown",onDown);
      wrap.removeEventListener("pointerup",onUp);
      wrap.removeEventListener("pointercancel",onUp);
    };
  },[]);

  return (
    <div
      ref={wrapRef}
      className="relative h-full w-full min-h-[310px] sm:min-h-[420px] lg:min-h-[525px] select-none overflow-hidden"
      style={{ touchAction:"pan-y", cursor:dragging?"grabbing":"crosshair" }}
      role="img"
      aria-label="Interactive wide particle fabric. Move the cursor to bend the folds; drag to rotate the fabric."
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
      <span className="pointer-events-none absolute bottom-5 left-5 text-[10px] font-mono uppercase tracking-[.14em] text-stone-500">
        Move to shape / Drag to fold
      </span>
    </div>
  );
}
