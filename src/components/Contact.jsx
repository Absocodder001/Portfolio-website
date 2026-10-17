import React, { useState } from 'react';
import { 
  Mail,
  AtSign, 
  Phone, 
  MapPin, 
  Send, 
  MessageSquare, 
  Terminal, 
  ExternalLink
} from 'lucide-react';
import { SplitHeading, ScrollReveal } from './ScrollReveal';
import { cyberAudio } from '../utils/audio';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState({ type: 'idle', message: '' });

  const handleChange = (e) => {
    setFormData((previous) => ({ ...previous, [e.target.name]: e.target.value }));
    if (submissionStatus.type !== 'idle') {
      setSubmissionStatus({ type: 'idle', message: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    // A bot trap, without interrupting real visitors or opening another page.
    const honeypot = e.currentTarget.elements.namedItem('_honey');
    if (honeypot?.value) return;

    const name = formData.name.trim();
    const email = formData.email.trim();
    const subject = formData.subject.trim();
    const message = formData.message.trim();
    if (!name || !email || !subject || !message) {
      setSubmissionStatus({ type: 'error', message: 'Please complete all fields before sending.' });
      return;
    }

    setIsSubmitting(true);
    setSubmissionStatus({ type: 'idle', message: '' });

    // FormSubmit's no-key AJAX endpoint sends the inquiry to this mailbox.
    // It requires one email activation by the owner on first use.
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch('https://formsubmit.co/ajax/raelwebdeveloper@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          name,
          email,
          subject,
          message,
          _subject: `Portfolio inquiry: ${subject.slice(0, 100)}`,
          _template: 'table',
          _captcha: 'false',
          _honey: '',
          _url: window.location.href,
        }),
      });
      const data = await response.json();
      // FormSubmit uses string values "true"/"false" in some responses.
      // Do NOT use if (data.success): the string "false" is truthy.
      const accepted = data?.success === true || data?.success === 'true';
      if (response.ok && accepted) {
        setSubmissionStatus({ type: 'success', message: 'Message submitted successfully. Thanks for reaching out! I’ll get back to you soon.' });
        setFormData({ name: '', email: '', subject: '', message: '' });
        cyberAudio.playChime(600);
      } else if (/activat|confirm.*email/i.test(String(data?.message || ''))) {
        // First submission prompts email confirmation. FormSubmit retains it
        // until the recipient confirms the address.
        setSubmissionStatus({ type: 'pending', message: 'Your message is queued while the contact inbox is being activated. You do not need to resend it.' });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error('The form service did not accept the message.');
      }
    } catch (error) {
      setSubmissionStatus({
        type: 'error',
        message: error?.name === 'AbortError'
          ? 'Sending timed out. Your message was not confirmed. Please try again.'
          : 'Unable to send your message right now. Please try again shortly.',
      });
    } finally {
      clearTimeout(timeout);
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 bg-[#060608] border-t border-neutral-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Split Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <SplitHeading
            prefix="SECTION // 06. COMMUNICATION"
            leftText="INITIATE"
            rightText="CONTACT"
          />

          <ScrollReveal direction="right">
            <p className="text-neutral-400 text-xs sm:text-sm font-mono max-w-md mt-4 md:mt-0">
              Have a project in mind, looking to hire a frontend engineer, or want to collaborate? Connect directly.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Coordinates (5 Cols) - Glides in from Left */}
          <div className="lg:col-span-5">
            <ScrollReveal direction="left" className="h-full">
              <div className="p-6 rounded-2xl bg-[#0e0e12] border border-neutral-800 backdrop-blur-xl">
                <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  COMMUNICATION CHANNELS // ACTIVE
                </div>
                <h3 className="font-['Space_Grotesk'] text-xl font-bold text-white mb-2">
                  Let&apos;s Build Together
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed font-light mb-6">
                  Currently open for freelance contracts, frontend developer roles, and engineering internships. Reach out directly.
                </p>

                {/* Direct coordinates list */}
                <div className="space-y-3 font-mono text-xs">
                  
                  {/* Email card */}
                  <div className="p-3.5 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-colors flex items-center gap-3">
                    <div className="p-2 rounded bg-neutral-950 border border-neutral-800 text-white">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] text-neutral-500 uppercase">EMAIL ADDRESS</div>
                      <a href="mailto:raelwebdeveloper@gmail.com" className="text-neutral-200 hover:text-white truncate font-medium block">
                        raelwebdeveloper@gmail.com
                      </a>
                    </div>
                  </div>

                  <a href="https://www.instagram.com/studioraelweb/" target="_blank" rel="noopener noreferrer" className="p-3.5 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-600 transition-colors flex items-center gap-3">
                    <div className="p-2 rounded bg-neutral-950 border border-neutral-800 text-white"><AtSign className="w-4 h-4" /></div>
                    <div><div className="text-[10px] text-neutral-500 uppercase">INSTAGRAM</div><span className="text-neutral-200 font-medium">@studioraelweb</span></div>
                  </a>

                  {/* Phone card */}
                  <div className="p-3.5 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-colors flex items-center gap-3">
                    <div className="p-2 rounded bg-neutral-950 border border-neutral-800 text-white">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] text-neutral-500 uppercase">PHONE / MOBILE</div>
                      <a href="tel:+917439856465" className="text-neutral-200 hover:text-white truncate font-medium block">
                        +91 7439856465
                      </a>
                    </div>
                  </div>

                  {/* Location card */}
                  <div className="p-3.5 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center gap-3">
                    <div className="p-2 rounded bg-neutral-950 border border-neutral-800 text-neutral-400">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] text-neutral-500 uppercase">BASE LOCATION</div>
                      <div className="text-neutral-200 font-medium">Howrah, West Bengal, India</div>
                    </div>
                  </div>

                  {/* WhatsApp Direct Chat button */}
                  <a
                    href="https://wa.me/917439856465?text=Hi%20Abhijeet,%20I%20am%20interested%20in%20your%20frontend%20work!"
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => cyberAudio.playChime(650)}
                    className="w-full py-3 rounded-xl bg-neutral-900 border border-neutral-700 hover:bg-neutral-800 hover:border-neutral-500 text-white font-mono text-xs flex items-center justify-center gap-2 transition-all"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>DIRECT WHATSAPP CHAT</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Direct Dispatch Form (7 Cols) - Glides in from Right */}
          <div className="lg:col-span-7">
            <ScrollReveal direction="right" className="h-full">
              <div className="rounded-2xl bg-[#0e0e12] border border-neutral-800 p-6 sm:p-8 backdrop-blur-xl relative">
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-neutral-800 font-mono text-xs">
                  <span className="text-white font-medium flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-neutral-400" />
                    TRANSMISSION_DISPATCH
                  </span>
                  <span className="text-neutral-500 font-mono">TLS_SECURE</span>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4" aria-busy={isSubmitting}>
                  <input type="text" name="_honey" tabIndex={-1} aria-hidden="true" autoComplete="off" style={{ display: 'none' }} />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block font-mono text-[11px] uppercase tracking-wider text-neutral-400">
                        Your Name / Organization
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Elena Vance"
                        className="w-full px-4 py-3 rounded-lg bg-neutral-950 border border-neutral-800 focus:border-neutral-500 text-sm text-neutral-200 placeholder-neutral-600 focus:outline-none font-mono"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block font-mono text-[11px] uppercase tracking-wider text-neutral-400">
                        Your Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. elena@company.com"
                        className="w-full px-4 py-3 rounded-lg bg-neutral-950 border border-neutral-800 focus:border-neutral-500 text-sm text-neutral-200 placeholder-neutral-600 focus:outline-none font-mono"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-neutral-400">
                      Subject / Project Scope
                    </label>
                    <input
                      type="text"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="e.g. Web Development Project / Frontend Role Opportunity"
                      className="w-full px-4 py-3 rounded-lg bg-neutral-950 border border-neutral-800 focus:border-neutral-500 text-sm text-neutral-200 placeholder-neutral-600 focus:outline-none font-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-neutral-400">
                      Message Directive
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Describe your project, timeline, tech requirements or inquiry details..."
                      className="w-full px-4 py-3 rounded-lg bg-neutral-950 border border-neutral-800 focus:border-neutral-500 text-sm text-neutral-200 placeholder-neutral-600 focus:outline-none font-mono resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-lg font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-black bg-white hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-wait"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'SENDING MESSAGE...' : 'SEND MESSAGE'}</span>
                  </button>
                </form>
                {submissionStatus.type !== 'idle' && (
                  <p
                    role={submissionStatus.type === 'error' ? 'alert' : 'status'}
                    aria-live="polite"
                    className={`mt-4 rounded-lg border px-4 py-3 text-xs leading-relaxed ${
                      submissionStatus.type === 'success'
                        ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-200'
                        : submissionStatus.type === 'pending'
                          ? 'border-amber-500/30 bg-amber-500/10 text-amber-200'
                          : 'border-red-500/30 bg-red-500/10 text-red-200'
                    }`}
                  >
                    {submissionStatus.message}
                  </p>
                )}
                <p className="mt-3 text-[11px] text-neutral-500 leading-relaxed">
                  Send your inquiry here without opening your email app. Messages are processed by FormSubmit for email delivery. Please do not include sensitive information.
                </p>
              </div>
            </ScrollReveal>
          </div>

        </div>

      </div>
    </section>
  );
}
