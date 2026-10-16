import React, { useEffect, useRef, useState } from "react";

/* Particle fabric: a projected three-dimensional ribbon. Pointer movement
 * repels and swirls nearby particles. Dragging rotates the whole sculpture.
 * It uses Canvas 2D so it can run without WebGL or the old laptop. */
export default function InteractiveParticleSilk() {
  const hostRef = useRef(null);
  const canvasRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas && canvas.getContext("2d", { alpha: true });
    if (!host || !ctx) return;
    let width = 640, height = 520, raf = 0, last = 0, seconds = 0, inView = true, dead = false;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mouse = { x: -1000, y: -1000, px: 0, py: 0, inside: false, down: false, rotX: 0, rotY: 0, goalX: 0, goalY: 0, kick: 0 };

    function resize() {
      const rect = host.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.ceil(width * dpr);
      canvas.height = Math.ceil(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    function pointerMove(e) {
      const r = host.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      mouse.inside = x >= 0 && x <= width && y >= 0 && y <= height;
      mouse.x = x; mouse.y = y;
      if (mouse.down) {
        mouse.goalY += (x - mouse.px) * 0.009;
        mouse.goalX += (y - mouse.py) * 0.006;
      }
      mouse.px = x; mouse.py = y;
    }
    function pointerDown(e) {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      mouse.down = true; mouse.kick = 1;
      const r = host.getBoundingClientRect();
      mouse.px = e.clientX-r.left; mouse.py=e.clientY-r.top;
      host.setPointerCapture(e.pointerId);
      setDragging(true);
    }
    function pointerUp(e) {
      mouse.down = false;
      setDragging(false);
      if (host.hasPointerCapture(e.pointerId)) host.releasePointerCapture(e.pointerId);
    }

    function frame(now) {
      if (dead) return;
      raf = requestAnimationFrame(frame);
      if (!inView || document.hidden) return;
      if (now - last < (width < 640 ? 30 : 22)) return;
      const dt = Math.min(0.045, Math.max(0.01, (now - last)/1000));
      last = now;
      if (!mq.matches) seconds += dt;
      const t = seconds;
      ctx.clearRect(0, 0, width, height);
      mouse.rotX += (mouse.goalX-mouse.rotX)*0.08;
      mouse.rotY += (mouse.goalY-mouse.rotY)*0.08;
      mouse.goalX *= 0.993; mouse.goalY *= 0.993; mouse.kick *= 0.92;

      const centerX = width*0.51, centerY = height*0.49;
      const scale = Math.min(width/660, height/540)*1.16;
      const cx = Math.cos(mouse.rotX), sx = Math.sin(mouse.rotX);
      const cy = Math.cos(mouse.rotY), sy = Math.sin(mouse.rotY);
      const rows = width < 640 ? 110 : 166, cols = width < 640 ? 34 : 54;

      const halo=ctx.createRadialGradient(centerX,centerY,15,centerX,centerY,Math.max(width,height)*0.57);
      halo.addColorStop(0,"rgba(162,136,112,.13)");
      halo.addColorStop(0.5,"rgba(92,73,61,.035)");
      halo.addColorStop(1,"rgba(0,0,0,0)");
      ctx.fillStyle=halo;
      ctx.fillRect(0,0,width,height);

      for(let i=0;i<rows;i++){
        const angle=i/(rows-1)*Math.PI*2;
        const ca=Math.cos(angle), sa=Math.sin(angle);
        const drift=t*0.24;
        for(let j=0;j<cols;j++){
          const v=(j/(cols-1))*2-1;
          const edge=Math.pow(Math.max(0,1-Math.abs(v)),0.40);
          const wave=Math.sin(angle*3.2+t*.62+v*1.4)*35+Math.cos(angle*5.1-t*.37)*22;
          const ring=205+57*Math.sin(angle*2-drift)+42*Math.cos(angle*3+drift*.82);
          let x=(ring+v*80)*ca+wave*sa;
          let y=(ring*.53+20*Math.sin(angle*4+t*.6))*sa+v*(60+34*Math.sin(angle*2+t*.35))+38*Math.cos(angle*2.3-t*.48);
          let z=115*Math.sin(angle*2+v*2+t*.33)+v*108+35*Math.cos(angle*3.8-drift);
          const xx=x*cy-z*sy, zz=x*sy+z*cy;
          const yy=y*cx-zz*sx;
          z=y*sx+zz*cx;x=xx;y=yy;
          const depth=920/(920+z);
          let px=centerX+x*depth*scale, py=centerY+y*depth*scale;
          if(mouse.inside && !mq.matches){
            const dx=px-mouse.x,dy=py-mouse.y;
            const distance=Math.hypot(dx,dy)+1;
            const reach=Math.min(205,Math.max(115,width*.28));
            if(distance<reach){
              const influence=Math.pow(1-distance/reach,2);
              const push=(130+mouse.kick*62)*influence;
              px+=(dx/distance)*push-(dy/distance)*64*influence;
              py+=(dy/distance)*push+(dx/distance)*64*influence;
            }
          }
          if(px<0 || py<0 || px>width || py>height)continue;
          const shimmer=.63+.37*Math.sin(angle*7+v*6+t*.7);
          const opacity=Math.min(.82,Math.max(.06,edge*(.15+shimmer*.49)*(.86+z/1250)));
          const warm=Math.sin(angle*2.8+v*2.5)>.04;
          ctx.fillStyle=(warm?"rgba(219,188,157,":"rgba(241,229,212,")+opacity.toFixed(3)+")";
          const s=Math.max(.7,(1.02+depth*.3)*scale);
          ctx.fillRect(px,py,s,s);
        }
      }
      if(mouse.inside && !mq.matches){
        const g=ctx.createRadialGradient(mouse.x,mouse.y,0,mouse.x,mouse.y,100);
        g.addColorStop(0,"rgba(236,219,190,.11)");g.addColorStop(1,"rgba(236,219,190,0)");
        ctx.fillStyle=g;ctx.fillRect(mouse.x-100,mouse.y-100,200,200);
      }
    }
    const ro=new ResizeObserver(resize);
    const io=new IntersectionObserver(([entry])=>{inView=entry.isIntersecting;},{threshold:0.01});
    ro.observe(host); io.observe(host); resize();
    host.addEventListener("pointermove",pointerMove);
    host.addEventListener("pointerleave",()=>{ if(!mouse.down)mouse.inside=false; });
    host.addEventListener("pointerdown",pointerDown);
    host.addEventListener("pointerup",pointerUp);
    host.addEventListener("pointercancel",pointerUp);
    raf=requestAnimationFrame(frame);
    return ()=>{
      dead=true;cancelAnimationFrame(raf);ro.disconnect();io.disconnect();
      host.removeEventListener("pointermove",pointerMove);
      host.removeEventListener("pointerdown",pointerDown);
      host.removeEventListener("pointerup",pointerUp);
      host.removeEventListener("pointercancel",pointerUp);
    };
  },[]);
  return (
    <div ref={hostRef} className="relative h-full w-full min-h-[310px] sm:min-h-[420px] lg:min-h-[525px] overflow-hidden select-none" style={{touchAction:"pan-y",cursor:dragging?"grabbing":"crosshair"}} role="img" aria-label="Interactive particle sculpture. Move cursor to part the particles; drag to rotate the sculpture.">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-5 left-4 font-mono text-[10px] uppercase tracking-[0.17em] text-stone-400/90">Move to disturb · Drag to rotate</div>
    </div>
  );
}
