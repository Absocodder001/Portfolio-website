import React, { useEffect, useRef } from 'react';

// Lightweight, cursor-reactive contour field drawn behind the existing WebGL laptop.
export default function AmbientBackground() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d', { alpha: true });
    if (!ctx) return;
    let raf = 0, w = 0, h = 0, visible = true;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const p = { x: .55, y: .5, tx: .55, ty: .5 };
    const move = e => { p.tx = e.clientX / Math.max(1,w); p.ty = e.clientY / Math.max(1,h); };
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = window.innerWidth; h = window.innerHeight;
      canvas.width = Math.max(1,Math.floor(w*dpr));
      canvas.height = Math.max(1,Math.floor(h*dpr));
      ctx.setTransform(dpr,0,0,dpr,0,0);
    };
    const paint = now => {
      raf = 0; if (!visible) return;
      ctx.clearRect(0,0,w,h);
      p.x += (p.tx-p.x)*.027; p.y += (p.ty-p.y)*.027;
      const t = reduce ? 0 : now*.00018;
      const cx=w*(.66+(p.x-.5)*.14), cy=h*(.46+(p.y-.5)*.12);
      const light=ctx.createRadialGradient(cx,cy,20,cx,cy,Math.max(w*.57,h*.88));
      light.addColorStop(0,'rgba(23,125,109,.27)');
      light.addColorStop(.5,'rgba(14,69,84,.10)');
      light.addColorStop(1,'rgba(7,14,18,0)');
      ctx.fillStyle=light;ctx.fillRect(0,0,w,h);
      const lines=w<640?9:17;
      for (let i=0;i<lines;i++){
        const offset=i-lines/2;
        ctx.beginPath();
        for(let j=0;j<=90;j++){
          const u=j/90,x=u*w;
          const y=h*(.3+u*.45)+offset*(w<640?22:19)
            +Math.sin(u*Math.PI*3.2+t*1.8+offset*.12)*(30+(p.x-.5)*28)
            +Math.cos(u*7-t+offset*.4)*19;
          if(!j)ctx.moveTo(x,y);else ctx.lineTo(x,y);
        }
        ctx.strokeStyle=i%3===0?'rgba(135,237,194,.11)':'rgba(84,168,169,.085)';
        ctx.lineWidth=.9;ctx.stroke();
      }
      if(!reduce)raf=requestAnimationFrame(paint);
    };
    const visibility=()=>{visible=!document.hidden;if(visible&&!raf)raf=requestAnimationFrame(paint);};
    window.addEventListener('resize',resize);
    window.addEventListener('pointermove',move,{passive:true});
    document.addEventListener('visibilitychange',visibility);
    resize();raf=requestAnimationFrame(paint);
    return ()=>{cancelAnimationFrame(raf);window.removeEventListener('resize',resize);window.removeEventListener('pointermove',move);document.removeEventListener('visibilitychange',visibility);};
  },[]);
  return <div className="ay-ambient fixed inset-0 pointer-events-none" aria-hidden="true"><canvas ref={canvasRef} className="w-full h-full" /></div>;
}
