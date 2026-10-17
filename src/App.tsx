/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  PhoneCall,
  CalendarCheck2,
  ClipboardList,
  ShieldAlert,
  Clock,
  Sparkles,
  ChevronDown,
  ArrowUpRight,
  CheckCircle2,
  Sliders,
  Send,
  MessageSquare,
  HelpCircle,
  Menu,
  X
} from 'lucide-react';
import { motion, useScroll, useSpring, useReducedMotion } from 'motion/react';

const BOOKING_URL = 'https://cal.com/sujatha-siddi-f8lymq/discovery-call';
const BUSINESS_NAME = 'Aksora AI';
const DOMAIN = 'aksora.ai';
const CITY = 'Bengaluru';
const WHO_I_HELP = 'Personal injury law firms';
const FOUNDER_NAME = 'Siddi ROSIREDDY';
const FOUNDER_FIRST_NAME = 'Siddi';

export function LogoMark({ className = 'w-7 h-7' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="#0E1E3A" />
      <path d="M16 7.5L8 24.5h4.2l1.7-4h8.2l1.7 4H28L20 7.5h-4zm0 5.8l2.6 6h-5.2l2.6-6z" fill="#8FD3FF" />
    </svg>
  );
}

export function LogoMarkInverse({ className = 'w-7 h-7' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="#8FD3FF" />
      <path d="M16 7.5L8 24.5h4.2l1.7-4h8.2l1.7 4H28L20 7.5h-4zm0 5.8l2.6 6h-5.2l2.6-6z" fill="#0E1E3A" />
    </svg>
  );
}

// Format numbers according to Indian Rupee standard format
function formatINR(value: number): string {
  return new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 0
  }).format(Math.round(value));
}

export default function App() {
  const shouldReduceMotion = useReducedMotion();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Hero interactive chat state
  const [activeTab, setActiveTab] = useState(0);
  const [isManualTab, setIsManualTab] = useState(false);

  // Tabs for the things we set up
  const chatTabs = [
    {
      id: 0,
      label: 'After Hours Call',
      title: '24/7 AI Voice Intake',
      messages: [
        { sender: 'user', text: 'Hello, I was injured in a road accident on Hosur Road an hour ago. Is someone available?' },
        { sender: 'bot', text: 'Namaskara, I am the emergency intake assistant for the firm. We are here to help you tonight.' },
        { sender: 'bot', text: 'Are you safe right now, and what type of vehicle was involved?' },
        { sender: 'user', text: 'Yes, at the hospital now. A delivery truck rear-ended my car.' },
        { sender: 'bot', text: 'Understood. Let me take down your contact details and schedule our senior advocate to call you back first thing tomorrow morning.' }
      ]
    },
    {
      id: 1,
      label: 'Intake Questions',
      title: 'Practice-Specific Questions',
      messages: [
        { sender: 'bot', text: 'Could you share the date and approximate time of the incident?' },
        { sender: 'user', text: 'Today around 9:30 PM near Electronic City.' },
        { sender: 'bot', text: 'Thank you. Did local traffic police file an FIR or spot inspection report?' },
        { sender: 'user', text: 'Yes, an FIR copy was lodged at the station.' },
        { sender: 'bot', text: 'Perfect. All details are safely recorded for your assigned advocate to review.' }
      ]
    },
    {
      id: 2,
      label: 'Callback Booking',
      title: 'Verified Callback Slot',
      messages: [
        { sender: 'bot', text: 'What is the best phone number for our personal injury team to reach you directly?' },
        { sender: 'user', text: '98450 12345' },
        { sender: 'bot', text: 'Great. Would 9:30 AM or 11:00 AM tomorrow work better for your callback consultation?' },
        { sender: 'user', text: '9:30 AM works best.' },
        { sender: 'bot', text: 'Your callback is confirmed for tomorrow at 9:30 AM. A confirmation has been sent to your phone.' }
      ]
    }
  ];

  // Auto rotate tabs if user hasn't clicked
  useEffect(() => {
    if (isManualTab || shouldReduceMotion) return;
    const timer = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % chatTabs.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isManualTab, shouldReduceMotion, chatTabs.length]);

  // Calculator states
  const [callsPerMonth, setCallsPerMonth] = useState(50);
  const [afterHoursShare, setAfterHoursShare] = useState(35);
  const [avgCaseFee, setAvgCaseFee] = useState(75000);

  // Derived calculation
  const monthlyMissedCases = (callsPerMonth * (afterHoursShare / 100));
  const lostPerMonth = monthlyMissedCases * avgCaseFee;
  const lostPerYear = lostPerMonth * 12;

  // Animated numbers for calculator
  const [displayMonthly, setDisplayMonthly] = useState(lostPerMonth);
  const [displayYearly, setDisplayYearly] = useState(lostPerYear);

  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayMonthly(lostPerMonth);
      setDisplayYearly(lostPerYear);
      return;
    }
    const duration = 250;
    const startMonthly = displayMonthly;
    const startYearly = displayYearly;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setDisplayMonthly(startMonthly + (lostPerMonth - startMonthly) * progress);
      setDisplayYearly(startYearly + (lostPerYear - startYearly) * progress);
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    const frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [lostPerMonth, lostPerYear, shouldReduceMotion]);

  // Section 7 Progress line
  const howItWorksRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: howItWorksRef,
    offset: ['start center', 'end center']
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 20 });

  // Accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Who is Aksora AI for?',
      a: 'Aksora AI is built for personal injury law firms in Bengaluru. If your firm receives inquiries outside business hours and loses potential clients to voicemail, we fix that completely.'
    },
    {
      q: 'What does it cost?',
      a: 'It depends on your business. You get a plan and a price on the free audit call.'
    },
    {
      q: 'What do you set up?',
      a: 'We set up The After Hours Call Fix for personal injury practices. An AI voice agent answers every call at night and on weekends, asks what happened and how to reach the caller, and books a callback. We write the questions with you, and you check the answers before callbacks go out.'
    },
    {
      q: 'How do we start?',
      a: 'Book your free audit call. We review your current phone setup, outline your custom intake questionnaire, and hand you a straightforward plan to launch.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F2F5FA] text-[#0E1E3A] flex flex-col font-['Plus_Jakarta_Sans'] antialiased selection:bg-[#8FD3FF] selection:text-[#0E1E3A]">

      {/* SECTION 1: TOP BAR */}
      <header className="sticky top-0 z-40 bg-[#F2F5FA]/90 backdrop-blur-md border-b border-[#0E1E3A]/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
          {/* Brand */}
          <a href="#" className="flex items-center gap-3 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E1E3A] rounded-lg">
            <LogoMark className="w-8 h-8 shrink-0" />
            <span className="font-heading font-bold text-2xl tracking-tight text-[#0E1E3A]">{BUSINESS_NAME}</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#0E1E3A]/80">
            <a href="#what-changes" className="hover:text-[#0E1E3A] transition-colors whitespace-nowrap shrink-0">
              What changes
            </a>
            <a href="#sample-builds" className="hover:text-[#0E1E3A] transition-colors whitespace-nowrap shrink-0">
              Sample builds
            </a>
            <a href="#cost-calculator" className="hover:text-[#0E1E3A] transition-colors whitespace-nowrap shrink-0">
              Cost of missed calls
            </a>
            <a href="#how-it-works" className="hover:text-[#0E1E3A] transition-colors whitespace-nowrap shrink-0">
              How it works
            </a>
            <a href="#questions" className="hover:text-[#0E1E3A] transition-colors whitespace-nowrap shrink-0">
              Questions
            </a>
          </nav>

          {/* Action */}
          <div className="flex items-center gap-4 shrink-0">
            <motion.a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={shouldReduceMotion ? {} : { y: -2 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-full text-xs font-bold bg-[#8FD3FF] text-[#0E1E3A] hover:bg-[#7bc8fa] transition-colors shadow-sm whitespace-nowrap"
            >
              Free audit call
            </motion.a>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#0E1E3A] hover:bg-black/5 rounded-lg focus-visible:outline-none"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-[#0E1E3A]/10 bg-[#F2F5FA] px-4 py-4 space-y-3">
            <a
              href="#what-changes"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-[#0E1E3A]"
            >
              What changes
            </a>
            <a
              href="#sample-builds"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-[#0E1E3A]"
            >
              Sample builds
            </a>
            <a
              href="#cost-calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-[#0E1E3A]"
            >
              Cost of missed calls
            </a>
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-[#0E1E3A]"
            >
              How it works
            </a>
            <a
              href="#questions"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-[#0E1E3A]"
            >
              Questions
            </a>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center py-3 rounded-full text-sm font-bold bg-[#8FD3FF] text-[#0E1E3A]"
            >
              Book a free audit call
            </a>
          </div>
        )}
      </header>

      {/* SECTION 2: HERO ON THE DARK COLOUR */}
      <section className="relative bg-[#0E1E3A] text-white overflow-hidden pt-16 pb-20 md:py-24">
        {/* Soft highlight glow behind hero */}
        <div
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#8FD3FF]/15 blur-3xl pointer-events-none"
          style={{ willChange: 'transform' }}
        />
        <div
          className="absolute bottom-0 right-0 w-[30rem] h-[30rem] rounded-full bg-[#16294C] blur-3xl pointer-events-none"
          style={{ willChange: 'transform' }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            
            {/* Left Column: Copy & Actions */}
            <div className="lg:col-span-7 flex flex-col items-start space-y-6">
              
              {/* Audience pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#16294C] text-[#8FD3FF] border border-[#8FD3FF]/20 text-xs font-semibold tracking-wide">
                <span>For {WHO_I_HELP} in {CITY}</span>
              </div>

              {/* Big Headline naming the problem, said straight to the reader */}
              <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.1] tracking-tight text-white max-w-2xl">
                Your firm loses personal injury clients when your phone goes unanswered after hours.
              </h1>

              {/* One plain sentence under it */}
              <p className="text-base sm:text-lg text-white/85 leading-relaxed max-w-xl">
                We set up an AI voice agent that answers every call at night and on weekends, asks what happened, and books a callback for your team.
              </p>

              {/* Main CTA */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
                <motion.a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={shouldReduceMotion ? {} : { y: -3, scale: 1.01 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-bold bg-[#8FD3FF] text-[#0E1E3A] hover:bg-[#7bc8fa] transition-all shadow-lg hover:shadow-cyan-500/10 text-center"
                >
                  <span>Book a free audit call</span>
                  <ArrowUpRight className="w-5 h-5 shrink-0" />
                </motion.a>
              </div>

              {/* One small line under the buttons */}
              <p className="text-xs text-white/70 tracking-normal pt-1">
                Free 1:1 call. You leave with a plan to grow your practice with AI.
              </p>
            </div>

            {/* Right Column: Phone showing WhatsApp chat */}
            <div className="lg:col-span-5 w-full flex flex-col items-center">
              <div className="w-full max-w-sm bg-[#070F1E] p-3 rounded-[36px] shadow-2xl border border-white/10 ring-1 ring-white/5">
                
                {/* Phone Top Notch */}
                <div className="w-24 h-4 bg-black/60 rounded-full mx-auto mb-2" />

                {/* WhatsApp Chat Container */}
                <div className="bg-[#0E1E3A] rounded-[28px] overflow-hidden border border-white/5 flex flex-col h-[460px]">
                  
                  {/* WhatsApp Header */}
                  <div className="bg-[#16294C] p-3.5 flex items-center justify-between border-b border-white/10 shrink-0">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#8FD3FF] flex items-center justify-center font-bold text-[#0E1E3A] text-xs">
                        AA
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white tracking-wide">{BUSINESS_NAME} Voice Intake</div>
                        <div className="text-[10px] text-[#8FD3FF] flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                          <span>Active on Bengaluru lines</span>
                        </div>
                      </div>
                    </div>
                    <Clock className="w-4 h-4 text-white/40" />
                  </div>

                  {/* Tabs: One tab per thing I set up */}
                  <div className="bg-[#070F1E] px-2 py-1.5 flex gap-1 border-b border-white/10 shrink-0 overflow-x-auto">
                    {chatTabs.map((tab, idx) => (
                      <button
                        key={tab.id}
                        onClick={() => {
                          setActiveTab(idx);
                          setIsManualTab(true);
                        }}
                        className={`px-2.5 py-1 text-[11px] font-medium rounded-full whitespace-nowrap transition-all ${
                          activeTab === idx
                            ? 'bg-[#8FD3FF] text-[#0E1E3A] font-bold'
                            : 'text-white/60 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Chat Messages Body */}
                  <div className="flex-1 p-3.5 overflow-y-auto space-y-3 bg-[#0B172D]/90 text-xs">
                    {chatTabs[activeTab].messages.map((msg, idx) => (
                      <div
                        key={idx}
                        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 leading-relaxed shadow-sm ${
                            msg.sender === 'user'
                              ? 'bg-[#183561] text-white rounded-tr-none'
                              : 'bg-[#16294C] text-white/95 rounded-tl-none border border-white/5'
                          }`}
                        >
                          <p>{msg.text}</p>
                          <span className="block text-[9px] text-white/40 text-right mt-1">
                            {idx === 0 ? '11:42 PM' : '11:43 PM'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Fake input bar */}
                  <div className="p-2.5 bg-[#16294C] flex items-center gap-2 border-t border-white/10 shrink-0">
                    <div className="flex-1 bg-[#0E1E3A] px-3 py-1.5 rounded-full text-[11px] text-white/40">
                      Voice call completed & transcribed...
                    </div>
                    <div className="w-7 h-7 rounded-full bg-[#8FD3FF] flex items-center justify-center text-[#0E1E3A]">
                      <PhoneCall className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Small caption under phone */}
              <p className="text-xs text-white/50 mt-3 text-center">
                Example chat
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 3: MARQUEE (TWO FULL-WIDTH ROWS RIGHT UNDER HERO) */}
      <section className="bg-[#070F1E] border-y border-white/10 py-5 overflow-hidden select-none">
        
        {/* Row 1: each thing I set up, big and bold in white, heading font */}
        <div className="relative w-full overflow-hidden flex whitespace-nowrap mb-3">
          <div
            className={`flex items-center gap-8 ${
              shouldReduceMotion ? '' : 'animate-marquee-left'
            } hover:[animation-play-state:paused]`}
          >
            {[...Array(4)].map((_, loopIdx) => (
              <React.Fragment key={loopIdx}>
                <span className="font-heading font-bold text-lg sm:text-xl md:text-2xl text-white tracking-tight">
                  The After Hours Call Fix
                </span>
                <span className="w-2 h-2 rounded-full bg-[#8FD3FF] shrink-0" />
                <span className="font-heading font-bold text-lg sm:text-xl md:text-2xl text-white tracking-tight">
                  Tailored Intake Questions
                </span>
                <span className="w-2 h-2 rounded-full bg-[#8FD3FF] shrink-0" />
                <span className="font-heading font-bold text-lg sm:text-xl md:text-2xl text-white tracking-tight">
                  Verified Callback Booking
                </span>
                <span className="w-2 h-2 rounded-full bg-[#8FD3FF] shrink-0" />
                <span className="font-heading font-bold text-lg sm:text-xl md:text-2xl text-white tracking-tight">
                  Pre-Call Answer Review
                </span>
                <span className="w-2 h-2 rounded-full bg-[#8FD3FF] shrink-0" />
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Row 2: "For Personal injury law firms", "Bengaluru", "Runs on your WhatsApp", uppercase, body font, 60% opacity */}
        <div className="relative w-full overflow-hidden flex whitespace-nowrap">
          <div
            className={`flex items-center gap-8 ${
              shouldReduceMotion ? '' : 'animate-marquee-right'
            } hover:[animation-play-state:paused]`}
          >
            {[...Array(4)].map((_, loopIdx) => (
              <React.Fragment key={loopIdx}>
                <span className="font-sans text-xs sm:text-sm font-semibold tracking-widest uppercase text-white/60">
                  For {WHO_I_HELP}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#8FD3FF] shrink-0" />
                <span className="font-sans text-xs sm:text-sm font-semibold tracking-widest uppercase text-white/60">
                  {CITY}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#8FD3FF] shrink-0" />
                <span className="font-sans text-xs sm:text-sm font-semibold tracking-widest uppercase text-white/60">
                  Runs on your WhatsApp
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#8FD3FF] shrink-0" />
              </React.Fragment>
            ))}
          </div>
        </div>

      </section>

      {/* SECTION 4: WHAT CHANGES FOR YOU */}
      <section id="what-changes" className="py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-14">
          <span className="text-xs font-bold tracking-wider uppercase text-[#0E1E3A]/70">
            Immediate shifts
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#0E1E3A] tracking-tight mt-2">
            What changes for you
          </h2>
          <p className="text-base text-[#0E1E3A]/75 mt-3">
            Your firm stops bleeding new inquiries to voicemail every evening and weekend.
          </p>
        </div>

        {/* Cards Grid: 1 card per thing I set up */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1 */}
          <motion.div
            whileHover={shouldReduceMotion ? {} : { y: -6 }}
            className="bg-white rounded-[24px] p-8 border border-[#0E1E3A]/8 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              {/* Highlight tile with dark text */}
              <div className="w-14 h-14 rounded-2xl bg-[#8FD3FF] text-[#0E1E3A] flex items-center justify-center mb-6">
                <PhoneCall className="w-7 h-7" />
              </div>
              <h3 className="font-heading font-bold text-xl text-[#0E1E3A] leading-snug mb-3">
                Your phone stops going to voicemail when your office closes.
              </h3>
              <p className="text-sm text-[#0E1E3A]/80 leading-relaxed">
                An AI voice agent answers every call at night and on weekends. Callers talk with a calm voice immediately instead of hanging up to ring another lawyer.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#0E1E3A]/5 text-xs font-semibold text-[#0E1E3A]/60 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#0E1E3A]" />
              <span>Answers on the first ring</span>
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            whileHover={shouldReduceMotion ? {} : { y: -6 }}
            className="bg-white rounded-[24px] p-8 border border-[#0E1E3A]/8 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#8FD3FF] text-[#0E1E3A] flex items-center justify-center mb-6">
                <ClipboardList className="w-7 h-7" />
              </div>
              <h3 className="font-heading font-bold text-xl text-[#0E1E3A] leading-snug mb-3">
                You stop guessing what happened before you call someone back.
              </h3>
              <p className="text-sm text-[#0E1E3A]/80 leading-relaxed">
                The agent asks what happened and how to reach the caller. We write the questions with you, and you check the answers before callbacks go out.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#0E1E3A]/5 text-xs font-semibold text-[#0E1E3A]/60 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#0E1E3A]" />
              <span>Full case incident capture</span>
            </div>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            whileHover={shouldReduceMotion ? {} : { y: -6 }}
            className="bg-white rounded-[24px] p-8 border border-[#0E1E3A]/8 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#8FD3FF] text-[#0E1E3A] flex items-center justify-center mb-6">
                <CalendarCheck2 className="w-7 h-7" />
              </div>
              <h3 className="font-heading font-bold text-xl text-[#0E1E3A] leading-snug mb-3">
                Your team arrives on Monday morning with booked callbacks.
              </h3>
              <p className="text-sm text-[#0E1E3A]/80 leading-relaxed">
                The caller picks a confirmed callback time while they are still on the line. Your advocates wake up to pre-qualified consultations directly on your calendar.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#0E1E3A]/5 text-xs font-semibold text-[#0E1E3A]/60 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#0E1E3A]" />
              <span>Confirmed calendar booking</span>
            </div>
          </motion.div>

        </div>
      </section>

      {/* SECTION 5: SAMPLE BUILDS */}
      <section id="sample-builds" className="py-20 md:py-28 bg-[#EAEEF6]/60 border-y border-[#0E1E3A]/6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          
          <div className="max-w-2xl">
            <span className="text-xs font-bold tracking-wider uppercase text-[#0E1E3A]/70">
              In action
            </span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#0E1E3A] tracking-tight mt-2">
              Sample builds
            </h2>
            <p className="text-base text-[#0E1E3A]/75 mt-3">
              Explore how each component looks inside a working Bengaluru practice.
            </p>
          </div>

          {/* Row 1: work-1.jpg on left, text on right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            <div className="lg:col-span-6 relative">
              <div className="overflow-hidden rounded-[24px] shadow-md border border-[#0E1E3A]/10 bg-white">
                <img
                  src="/work-1.jpg"
                  alt="Front desk staff at a Bengaluru law firm smiling at phone"
                  width={600}
                  height={400}
                  className="w-full h-auto aspect-[3/2] object-cover transition-transform duration-700 hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Overlapping small coded bubble */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="absolute -bottom-5 -right-3 sm:right-6 bg-[#0E1E3A] text-white p-3.5 rounded-2xl shadow-xl border border-white/15 max-w-xs text-xs flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-[#8FD3FF] text-[#0E1E3A] flex items-center justify-center shrink-0">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-white text-[11px]">Night Call Answered</div>
                  <div className="text-[10px] text-white/70">11:42 PM · Routed to intake agent</div>
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-[#8FD3FF] text-[#0E1E3A]">
                Sample build
              </div>
              <h3 className="font-heading font-bold text-2xl sm:text-3xl text-[#0E1E3A] tracking-tight">
                24/7 After Hours Voice Intake
              </h3>
              
              <div className="space-y-4 pt-2">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#0E1E3A]/70 mb-1">
                    What you get
                  </h4>
                  <p className="text-sm sm:text-base text-[#0E1E3A]/85 leading-relaxed">
                    An AI voice agent answers every call at night and on weekends. It greets callers in plain language, listens attentively, and keeps people from calling another firm.
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#0E1E3A]/70 mb-1">
                    What changes for you
                  </h4>
                  <p className="text-sm sm:text-base text-[#0E1E3A]/85 leading-relaxed">
                    Your phone stops losing people after hours. Your law practice remains open to emergency road traffic and personal injury inquiries all 365 days a year.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Row 2: Text on left, work-2.jpg on right (Alternating) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            <div className="lg:col-span-6 order-2 lg:order-1 space-y-6">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-[#8FD3FF] text-[#0E1E3A]">
                Sample build
              </div>
              <h3 className="font-heading font-bold text-2xl sm:text-3xl text-[#0E1E3A] tracking-tight">
                Practice-Specific Incident Questionnaire
              </h3>
              
              <div className="space-y-4 pt-2">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#0E1E3A]/70 mb-1">
                    What you get
                  </h4>
                  <p className="text-sm sm:text-base text-[#0E1E3A]/85 leading-relaxed">
                    Custom questions written with you to extract what happened, who was involved, police report status, and how to reach the caller.
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#0E1E3A]/70 mb-1">
                    What changes for you
                  </h4>
                  <p className="text-sm sm:text-base text-[#0E1E3A]/85 leading-relaxed">
                    You check the answers before callbacks go out. You never enter a return consultation blind or miss pivotal legal claims facts.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 order-1 lg:order-2 relative">
              <div className="overflow-hidden rounded-[24px] shadow-md border border-[#0E1E3A]/10 bg-white">
                <img
                  src="/work-2.jpg"
                  alt="Law firm partner in Bengaluru checking phone between client consultations"
                  width={600}
                  height={400}
                  className="w-full h-auto aspect-[3/2] object-cover transition-transform duration-700 hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Overlapping small coded bubble */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="absolute -bottom-5 -left-3 sm:left-6 bg-[#0E1E3A] text-white p-3.5 rounded-2xl shadow-xl border border-white/15 max-w-xs text-xs flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-[#8FD3FF] text-[#0E1E3A] flex items-center justify-center shrink-0">
                  <ClipboardList className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-white text-[11px]">Intake Summary Ready</div>
                  <div className="text-[10px] text-white/70">FIR noted · Sent to your WhatsApp</div>
                </div>
              </motion.div>
            </div>

          </div>

          {/* Row 3: work-3.jpg on left, text on right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            <div className="lg:col-span-6 relative">
              <div className="overflow-hidden rounded-[24px] shadow-md border border-[#0E1E3A]/10 bg-white">
                <img
                  src="/work-3.jpg"
                  alt="Happy personal injury client leaving law firm in Bengaluru with phone in hand"
                  width={600}
                  height={400}
                  className="w-full h-auto aspect-[3/2] object-cover transition-transform duration-700 hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Overlapping small coded bubble */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="absolute -bottom-5 -right-3 sm:right-6 bg-[#0E1E3A] text-white p-3.5 rounded-2xl shadow-xl border border-white/15 max-w-xs text-xs flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-[#8FD3FF] text-[#0E1E3A] flex items-center justify-center shrink-0">
                  <CalendarCheck2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-white text-[11px]">Callback Slot Reserved</div>
                  <div className="text-[10px] text-white/70">Scheduled for 10:00 AM tomorrow</div>
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-[#8FD3FF] text-[#0E1E3A]">
                Sample build
              </div>
              <h3 className="font-heading font-bold text-2xl sm:text-3xl text-[#0E1E3A] tracking-tight">
                Verified Callback Booking
              </h3>
              
              <div className="space-y-4 pt-2">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#0E1E3A]/70 mb-1">
                    What you get
                  </h4>
                  <p className="text-sm sm:text-base text-[#0E1E3A]/85 leading-relaxed">
                    Direct integration that locks in a specific time slot on your calendar with the caller before the voice session wraps up.
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#0E1E3A]/70 mb-1">
                    What changes for you
                  </h4>
                  <p className="text-sm sm:text-base text-[#0E1E3A]/85 leading-relaxed">
                    Your advocates never chase cold voicemail numbers. Injured callers feel reassured immediately that a qualified attorney is looking at their file.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 6: PROOF (CASE STUDIES EMPTY -> CALCULATOR) */}
      <section id="cost-calculator" className="py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-[24px] p-6 sm:p-10 lg:p-14 border border-[#0E1E3A]/8 shadow-sm">
          
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold tracking-wider uppercase text-[#0E1E3A]/70">
              Interactive estimate
            </span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#0E1E3A] tracking-tight mt-2">
              What missed client consultations cost you
            </h2>
            <p className="text-base text-[#0E1E3A]/75 mt-3">
              Play with the sliders to calculate what unanswered after hours calls cost your practice in Bengaluru.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Sliders Container: Under label "Your numbers" */}
            <div className="lg:col-span-7 space-y-8">
              
              <div className="flex items-center gap-2 border-b border-[#0E1E3A]/10 pb-3">
                <Sliders className="w-5 h-5 text-[#0E1E3A]" />
                <h3 className="font-heading font-bold text-lg text-[#0E1E3A]">
                  Your numbers
                </h3>
              </div>

              {/* Slider 1: Customers a month (inquiries a month) */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-medium text-[#0E1E3A]/80">Callers contacting your firm each month</span>
                  <span className="font-heading font-bold text-lg text-[#0E1E3A] tabular-nums">
                    {callsPerMonth}
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="150"
                  step="5"
                  value={callsPerMonth}
                  onChange={(e) => setCallsPerMonth(Number(e.target.value))}
                  className="w-full accent-[#0E1E3A] cursor-pointer h-2 bg-[#F2F5FA] rounded-lg"
                />
                <div className="flex justify-between text-[11px] text-[#0E1E3A]/50">
                  <span>10 calls</span>
                  <span>150 calls</span>
                </div>
              </div>

              {/* Slider 2: Share who call after hours without reaching an advocate */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-medium text-[#0E1E3A]/80">Share calling nights or weekends</span>
                  <span className="font-heading font-bold text-lg text-[#0E1E3A] tabular-nums">
                    {afterHoursShare}%
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="70"
                  step="5"
                  value={afterHoursShare}
                  onChange={(e) => setAfterHoursShare(Number(e.target.value))}
                  className="w-full accent-[#0E1E3A] cursor-pointer h-2 bg-[#F2F5FA] rounded-lg"
                />
                <div className="flex justify-between text-[11px] text-[#0E1E3A]/50">
                  <span>10%</span>
                  <span>70%</span>
                </div>
              </div>

              {/* Slider 3: Average bill (Average case fee / consultation retainer in INR) */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-medium text-[#0E1E3A]/80">Average case fee</span>
                  <span className="font-heading font-bold text-lg text-[#0E1E3A] tabular-nums">
                    ₹{formatINR(avgCaseFee)}
                  </span>
                </div>
                <input
                  type="range"
                  min="20000"
                  max="250000"
                  step="5000"
                  value={avgCaseFee}
                  onChange={(e) => setAvgCaseFee(Number(e.target.value))}
                  className="w-full accent-[#0E1E3A] cursor-pointer h-2 bg-[#F2F5FA] rounded-lg"
                />
                <div className="flex justify-between text-[11px] text-[#0E1E3A]/50">
                  <span>₹20,000</span>
                  <span>₹2,50,000</span>
                </div>
              </div>

            </div>

            {/* Results Display */}
            <div className="lg:col-span-5 bg-[#0E1E3A] text-white p-8 sm:p-10 rounded-[24px] shadow-xl flex flex-col justify-between space-y-8">
              
              <div className="space-y-6">
                <div>
                  <div className="text-xs uppercase tracking-wider text-white/60 font-semibold mb-1">
                    Estimated money lost each month
                  </div>
                  <div className="font-heading font-bold text-3xl sm:text-4xl text-[#8FD3FF] tabular-nums tracking-tight">
                    ₹{formatINR(displayMonthly)}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <div className="text-xs uppercase tracking-wider text-white/60 font-semibold mb-1">
                    Estimated money lost each year
                  </div>
                  <div className="font-heading font-bold text-3xl sm:text-4xl text-white tabular-nums tracking-tight">
                    ₹{formatINR(displayYearly)}
                  </div>
                </div>

                <p className="text-xs text-white/70 italic pt-2">
                  Your estimate. We go through it on the free audit call.
                </p>
              </div>

              <motion.a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={shouldReduceMotion ? {} : { y: -2 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full text-sm font-bold bg-[#8FD3FF] text-[#0E1E3A] hover:bg-[#7bc8fa] transition-colors text-center"
              >
                <span>Book a free audit call</span>
                <ArrowUpRight className="w-4 h-4" />
              </motion.a>

            </div>

          </div>
        </div>
      </section>

      {/* SECTION 7: HOW IT WORKS */}
      <section id="how-it-works" ref={howItWorksRef} className="py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-2xl mb-16">
          <span className="text-xs font-bold tracking-wider uppercase text-[#0E1E3A]/70">
            The process
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#0E1E3A] tracking-tight mt-2">
            How it works
          </h2>
          <p className="text-base text-[#0E1E3A]/75 mt-3">
            Three simple steps to activate after hours answering for your practice.
          </p>
        </div>

        {/* Three steps joined by highlight line */}
        <div className="relative">
          
          {/* Desktop Connecting Line */}
          <div className="hidden md:block absolute top-12 left-16 right-16 h-1 bg-[#0E1E3A]/10 -z-0">
            <motion.div
              style={{ scaleX: scaleY, transformOrigin: '0%' }}
              className="h-full bg-[#8FD3FF]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative z-10">
            
            {/* Step 1 */}
            <div className="bg-white rounded-[24px] p-8 border border-[#0E1E3A]/8 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-full bg-[#8FD3FF] text-[#0E1E3A] font-heading font-bold text-xl flex items-center justify-center mb-6 shadow-sm">
                  1
                </div>
                <h3 className="font-heading font-bold text-xl text-[#0E1E3A] mb-3">
                  Book your free audit call
                </h3>
                <p className="text-sm text-[#0E1E3A]/80 leading-relaxed">
                  We look at your practice hours, call volume, and how potential accident clients reach your office today.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-[24px] p-8 border border-[#0E1E3A]/8 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-full bg-[#8FD3FF] text-[#0E1E3A] font-heading font-bold text-xl flex items-center justify-center mb-6 shadow-sm">
                  2
                </div>
                <h3 className="font-heading font-bold text-xl text-[#0E1E3A] mb-3">
                  Get your plan
                </h3>
                <p className="text-sm text-[#0E1E3A]/80 leading-relaxed">
                  We write the intake questions together, determine what case details you need, and set your callback rules.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-[24px] p-8 border border-[#0E1E3A]/8 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-full bg-[#8FD3FF] text-[#0E1E3A] font-heading font-bold text-xl flex items-center justify-center mb-6 shadow-sm">
                  3
                </div>
                <h3 className="font-heading font-bold text-xl text-[#0E1E3A] mb-3">
                  We set it up on your WhatsApp
                </h3>
                <p className="text-sm text-[#0E1E3A]/80 leading-relaxed">
                  We connect the AI voice agent to your phone lines so every recorded summary and callback arrives straight to your phone.
                </p>
              </div>
            </div>

          </div>
        </div>

      </section>

      {/* SECTION 8: FOUNDER */}
      <section className="py-20 md:py-28 bg-[#EAEEF6]/60 border-y border-[#0E1E3A]/6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-[24px] p-8 sm:p-12 border border-[#0E1E3A]/8 shadow-sm flex flex-col sm:flex-row items-center gap-8 sm:gap-12">
            
            {/* Logo mark, large, in a 4:5 rounded tile of highlight colour */}
            <div className="w-44 h-56 rounded-[24px] bg-[#8FD3FF] text-[#0E1E3A] flex flex-col items-center justify-center p-6 shrink-0 shadow-inner">
              <LogoMark className="w-24 h-24" />
              <span className="font-heading font-bold text-sm tracking-wider uppercase mt-4 text-[#0E1E3A]">
                {BUSINESS_NAME}
              </span>
            </div>

            {/* Details */}
            <div className="space-y-4 text-center sm:text-left flex-1">
              <div>
                <h3 className="font-heading font-bold text-2xl sm:text-3xl text-[#0E1E3A] tracking-tight">
                  {FOUNDER_NAME}
                </h3>
                <p className="text-sm font-semibold text-[#0E1E3A]/70 mt-1">
                  Founder, {BUSINESS_NAME}
                </p>
              </div>

              {/* About me: one plain line about who we help */}
              <p className="text-base text-[#0E1E3A]/80 leading-relaxed">
                We help personal injury law firms in {CITY} stop losing callers after hours by answering every call and booking verified callbacks.
              </p>

              <div className="pt-2">
                <motion.a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={shouldReduceMotion ? {} : { y: -2 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full text-sm font-bold bg-[#8FD3FF] text-[#0E1E3A] hover:bg-[#7bc8fa] transition-colors"
                >
                  <span>Book a free call with {FOUNDER_FIRST_NAME}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </motion.a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 9: FREE AUDIT CALL, ON THE DARK COLOUR */}
      <section className="py-20 md:py-28 bg-[#0E1E3A] text-white relative overflow-hidden">
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#070F1E] rounded-[24px] p-8 sm:p-12 lg:p-16 border border-white/10 shadow-2xl space-y-10">
            
            <div className="max-w-2xl">
              <span className="text-xs font-bold tracking-wider uppercase text-[#8FD3FF]">
                Free consultation
              </span>
              <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight mt-2">
                Get your AI growth plan in a free 1:1 call
              </h2>
            </div>

            {/* The three things you leave with */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              
              <div className="bg-[#0E1E3A] p-6 rounded-2xl border border-white/5 space-y-3">
                <div className="w-8 h-8 rounded-full bg-[#8FD3FF] text-[#0E1E3A] font-heading font-bold text-sm flex items-center justify-center">
                  1
                </div>
                <h4 className="font-heading font-bold text-lg text-white">
                  Where you lose clients today
                </h4>
                <p className="text-xs text-white/75 leading-relaxed">
                  A breakdown of where your firm misses inquiries during weekends, holidays, and late evenings.
                </p>
              </div>

              <div className="bg-[#0E1E3A] p-6 rounded-2xl border border-white/5 space-y-3">
                <div className="w-8 h-8 rounded-full bg-[#8FD3FF] text-[#0E1E3A] font-heading font-bold text-sm flex items-center justify-center">
                  2
                </div>
                <h4 className="font-heading font-bold text-lg text-white">
                  What to automate first
                </h4>
                <p className="text-xs text-white/75 leading-relaxed">
                  A tailored checklist of intake questions and automated callback slots tailored to personal injury practices.
                </p>
              </div>

              <div className="bg-[#0E1E3A] p-6 rounded-2xl border border-white/5 space-y-3">
                <div className="w-8 h-8 rounded-full bg-[#8FD3FF] text-[#0E1E3A] font-heading font-bold text-sm flex items-center justify-center">
                  3
                </div>
                <h4 className="font-heading font-bold text-lg text-white">
                  A clear price for your business
                </h4>
                <p className="text-xs text-white/75 leading-relaxed">
                  A straightforward, transparent setup quote specifically scoped for your practice call volume.
                </p>
              </div>

            </div>

            {/* Button */}
            <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <motion.a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={shouldReduceMotion ? {} : { y: -2 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-bold bg-[#8FD3FF] text-[#0E1E3A] hover:bg-[#7bc8fa] transition-all shadow-lg"
              >
                <span>Book a free audit call</span>
                <ArrowUpRight className="w-5 h-5" />
              </motion.a>
              <span className="text-xs text-white/60">
                No commitment. 30-minute private strategy session.
              </span>
            </div>

          </div>
        </div>

      </section>

      {/* SECTION 10: QUESTIONS */}
      <section id="questions" className="py-20 md:py-28 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold tracking-wider uppercase text-[#0E1E3A]/70">
            Answers
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#0E1E3A] tracking-tight mt-2">
            Questions
          </h2>
          <p className="text-base text-[#0E1E3A]/75 mt-3">
            Everything you need to know about setting up your after hours AI voice agent.
          </p>
        </div>

        {/* 4 Accordions */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white rounded-[24px] border border-[#0E1E3A]/8 overflow-hidden shadow-sm transition-all"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 focus-visible:outline-none"
              >
                <span className="font-heading font-bold text-lg text-[#0E1E3A]">
                  {faq.q}
                </span>
                <div
                  className={`w-8 h-8 rounded-full bg-[#F2F5FA] flex items-center justify-center text-[#0E1E3A] shrink-0 transition-transform duration-300 ${
                    openFaq === idx ? 'rotate-180 bg-[#8FD3FF]' : ''
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {openFaq === idx && (
                <div className="px-6 pb-6 pt-0 text-sm sm:text-base text-[#0E1E3A]/80 leading-relaxed border-t border-[#0E1E3A]/5">
                  <p className="mt-4">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>

      </section>

      {/* SECTION 11: CLOSING WITH PLACE.JPG */}
      <section className="relative py-28 md:py-36 bg-[#0E1E3A] text-white overflow-hidden">
        
        {/* place.jpg under a dark colour layer */}
        <div className="absolute inset-0 z-0">
          <img
            src="/place.jpg"
            alt="Interior of an upscale law office in Bengaluru"
            width={1200}
            height={800}
            className="w-full h-full object-cover object-center filter saturate-50 brightness-75 scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-[#0E1E3A]/85 backdrop-blur-[2px]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          
          <h2 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight max-w-2xl mx-auto">
            Your phone stops losing people after hours.
          </h2>

          <div className="pt-2 flex justify-center">
            <motion.a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={shouldReduceMotion ? {} : { y: -3, scale: 1.02 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
              className="inline-flex items-center justify-center gap-2 px-9 py-4 rounded-full text-base font-bold bg-[#8FD3FF] text-[#0E1E3A] hover:bg-[#7bc8fa] transition-all shadow-xl"
            >
              <span>Book a free audit call</span>
              <ArrowUpRight className="w-5 h-5" />
            </motion.a>
          </div>

        </div>

      </section>

      {/* FOOTER */}
      <footer className="bg-[#070F1E] text-white border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-white/60">
          
          {/* Logo & City */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2.5">
              <LogoMarkInverse className="w-6 h-6 shrink-0" />
              <span className="font-heading font-bold text-lg text-white tracking-tight">{BUSINESS_NAME}</span>
            </div>
            <span className="text-white/30">|</span>
            <span className="text-white/80 font-medium">{DOMAIN}</span>
            <span className="text-white/30">|</span>
            <span className="text-white/80 font-medium">{CITY}</span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            <a href="#what-changes" className="hover:text-white transition-colors">What changes</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">How it works</a>
            <a href="#cost-calculator" className="hover:text-white transition-colors">Cost estimate</a>
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors font-semibold text-[#8FD3FF]">
              Book audit call
            </a>
          </div>

          {/* Legal */}
          <div>
            © {new Date().getFullYear()} {BUSINESS_NAME}. All rights reserved.
          </div>

        </div>
      </footer>

      {/* MOBILE STICKY BOTTOM BAR */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 p-3 bg-[#0E1E3A]/95 backdrop-blur-md border-t border-white/10 z-50">
        <motion.a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
          className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-full text-sm font-bold bg-[#8FD3FF] text-[#0E1E3A] shadow-md text-center"
        >
          <span>Book a free audit call</span>
          <ArrowUpRight className="w-4 h-4" />
        </motion.a>
      </div>

    </div>
  );
}
