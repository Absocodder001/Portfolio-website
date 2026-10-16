import React, { useEffect, useRef, useState } from 'react';

/**
 * ScrollReveal: Animates elements from sides to middle when scrolling down,
 * and animates back out to the sides when scrolling back up.
 */
export function ScrollReveal({
  children,
  direction = 'left', // 'left' | 'right' | 'bottom'
  className = '',
  delay = 0,
}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const getTransform = () => {
    if (isVisible) {
      return 'translate-x-0 translate-y-0 opacity-100 scale-100';
    }
    if (direction === 'left') {
      return '-translate-x-16 sm:-translate-x-28 opacity-0 scale-95';
    }
    if (direction === 'right') {
      return 'translate-x-16 sm:translate-x-28 opacity-0 scale-95';
    }
    return 'translate-y-14 opacity-0 scale-95';
  };

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] transform will-change-transform ${getTransform()} ${className}`}
    >
      {children}
    </div>
  );
}

/**
 * SplitHeading: Left word/phrase animates from left to middle,
 * and right word/phrase animates from right to middle.
 * When scrolling up away from the section, they retreat back to the sides.
 */
export function SplitHeading({
  leftText,
  rightText,
  prefix = '',
  accentGradient = 'from-white via-neutral-300 to-neutral-500',
  className = '',
}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`overflow-hidden py-2 ${className}`}>
      {prefix && (
        <div
          className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] font-mono text-xs text-neutral-400 uppercase tracking-widest mb-2 flex items-center gap-2 ${
            isVisible ? 'translate-x-0 opacity-100' : '-translate-x-16 opacity-0'
          }`}
        >
          <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full"></span>
          <span>{prefix}</span>
        </div>
      )}

      <h2 className="font-['Space_Grotesk'] text-3xl sm:text-5xl font-bold tracking-tight uppercase flex flex-wrap items-center gap-x-3 gap-y-1 text-white">
        {/* Left word sliding in from the left */}
        <span
          className={`inline-block transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] transform will-change-transform ${
            isVisible
              ? 'translate-x-0 opacity-100 scale-100'
              : '-translate-x-24 sm:-translate-x-36 opacity-0 scale-90'
          }`}
        >
          {leftText}
        </span>

        {/* Right word sliding in from the right */}
        <span
          className={`inline-block text-transparent bg-clip-text bg-gradient-to-r ${accentGradient} transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] transform will-change-transform ${
            isVisible
              ? 'translate-x-0 opacity-100 scale-100'
              : 'translate-x-24 sm:translate-x-36 opacity-0 scale-90'
          }`}
        >
          {rightText}
        </span>
      </h2>

      {/* Titanium underline expanding from the left */}
      <div
        className={`h-[2px] bg-gradient-to-r from-white via-neutral-500 to-transparent mt-3 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] origin-left ${
          isVisible ? 'w-24 opacity-100 scale-x-100' : 'w-0 opacity-0 scale-x-0'
        }`}
      />
    </div>
  );
}
