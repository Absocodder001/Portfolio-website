import React from 'react';

// Deep black base inspired by the supplied reference video.
// Keep the interactive artwork scoped to the hero, so scrolling,
// project cards, the terminal and contact form work as before.
export default function AmbientBackground() {
  return <div className="ay-ambient fixed inset-0 pointer-events-none" style={{ background: '#050505' }} aria-hidden="true" />;
}
