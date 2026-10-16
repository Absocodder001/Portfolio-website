import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import TerminalSection from './components/Terminal';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#060608] text-neutral-100 font-sans selection:bg-white selection:text-black">
      
      {/* Background Architectural Grid Pattern */}
      <div className="fixed inset-0 architect-grid opacity-25 pointer-events-none z-0" />
      <div className="fixed inset-0 architect-dots opacity-10 pointer-events-none z-0" />

      {/* Navigation Header */}
      <Navbar />

      {/* Main Page Layout */}
      <main className="relative z-10 flex flex-col">
        {/* Section 00: 3D Interactive Laptop Workstation Hero */}
        <Hero />

        {/* Section 01: About & Dossier */}
        <About />

        {/* Section 02: Technical Skills Matrix */}
        <Skills />

        {/* Section 03: Production Projects & Modals */}
        <Projects />

        {/* Section 04: Education & Certifications */}
        <Certifications />

        {/* Section 05: Interactive CLI Terminal */}
        <TerminalSection />

        {/* Section 06: Contact */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
