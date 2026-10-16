import React, { useMemo, useState } from 'react';
import Timeline from './ui/timeline';

const SKILLS = [
  { name: 'HTML', group: 'Web' },
  { name: 'CSS', group: 'Web' },
  { name: 'JavaScript', group: 'Web' },
  { name: 'TypeScript', group: 'Web' },
  { name: 'React', group: 'Web' },
  { name: 'Next.js', group: 'Web' },
  { name: 'Tailwind CSS', group: 'Web' },
  { name: 'Responsive Design', group: 'Web' },
  { name: 'Java', group: 'Languages' },
  { name: 'C', group: 'Languages' },
  { name: 'C++', group: 'Languages' },
  { name: 'Python', group: 'Languages' },
  { name: 'Git & GitHub', group: 'Tools' },
  { name: 'Gemini API', group: 'Tools' },
  { name: 'Vercel', group: 'Tools' },
];

export default function Skills() {
  const [group, setGroup] = useState('All');
  const filtered = useMemo(() => SKILLS.filter(skill => group === 'All' || skill.group === group), [group]);
  return (
    <div className="relative">
      <div className="absolute right-6 md:right-10 top-6 z-20 flex gap-1 rounded-full p-1 bg-black/20 border border-white/10 backdrop-blur-md" aria-label="Filter skills">
        {['All', 'Web', 'Languages', 'Tools'].map(label => (
          <button key={label} type="button" onClick={() => setGroup(label)} aria-pressed={group === label}
            className={`px-3 py-1.5 rounded-full text-[10px] uppercase tracking-wider font-mono transition-colors ${group === label ? 'bg-[#c9f48d] text-[#07100a]' : 'text-neutral-300 hover:text-white'}`}>{label}</button>
        ))}
      </div>
      <Timeline skills={filtered} title="My toolkit, in motion." />
    </div>
  );
}
