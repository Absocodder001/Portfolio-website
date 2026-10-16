import React from 'react';

/** Keeps an unavailable WebGL context from blanking the rest of the portfolio. */
export default class WebGLBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.warn('3D workstation unavailable; showing accessible fallback.', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[320px] sm:min-h-[430px] w-full flex-col items-center justify-center gap-5 rounded-xl border border-neutral-800 bg-[#0c0c10] px-6 text-center">
          <div className="text-5xl font-['Space_Grotesk'] font-bold tracking-tighter text-neutral-100">AY<span className="text-emerald-400">.</span></div>
          <p className="max-w-sm text-sm leading-relaxed text-neutral-300">3D preview is unavailable in this browser. Explore the live projects instead.</p>
          <a href="#projects" className="rounded-lg bg-white px-5 py-3 text-xs font-bold uppercase tracking-wide text-black hover:bg-neutral-200">Explore projects →</a>
        </div>
      );
    }
    return this.props.children;
  }
}
