import { useRef, Suspense, lazy, memo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MessageSquare, Terminal, Code2, Brain, Cpu } from 'lucide-react';

const TechCanvas = lazy(() => import('./TechCanvas'));

const Highlights = memo(function Highlights() {
  const highlights = [
    { label: 'AI Developer', color: '#3b82f6' },
    { label: 'AI Automation', color: '#06b6d4' },
    { label: 'Full Stack Development', color: '#10b981' },
  ];
  return (
    <div className="flex flex-wrap gap-2.5 pt-1">
      {highlights.map((chip, i) => (
        <span
          key={chip.label}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold"
          style={{
            background: `${chip.color}14`,
            border: `1px solid ${chip.color}38`,
            color: chip.color,
          }}
        >
          {chip.label}
        </span>
      ))}
    </div>
  );
});

const CTAs = memo(function CTAs() {
  return (
    <div className="flex flex-wrap gap-4 pt-2">
      <a
        href="#projects"
        className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold px-6 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 group"
      >
        View My Projects
        <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform duration-200" />
      </a>

      <a
        href="#contact"
        className="inline-flex items-center gap-2 bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white font-semibold px-6 py-3.5 rounded-full hover:bg-slate-800 hover:border-slate-700 transition-all duration-200"
      >
        Contact Me
        <MessageSquare size={16} />
      </a>
    </div>
  );
});

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden"
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-500/8 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-500/8 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10 w-full">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7 flex flex-col items-start text-left space-y-6 lg:-translate-y-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Open for Opportunities
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-100 leading-tight">
            Mohammed Zunaid <span className="text-gradient">Shaik</span>
          </h1>

          <h2 className="font-display text-xl sm:text-2xl lg:text-3xl font-semibold text-slate-300">
            AI Engineer & Full Stack Developer
          </h2>

          <p className="text-sm sm:text-base lg:text-lg text-slate-400 max-w-xl leading-relaxed font-light">
            Building AI-powered applications, workflow automations, and scalable full-stack solutions that solve real-world business problems. I specialize in integrating AI models, APIs, and modern web technologies to create intelligent, production-ready software.
          </p>

          <Highlights />
          <CTAs />
        </motion.div>

        <motion.div
          className="lg:col-span-5 relative flex items-center justify-center min-h-[520px] lg:min-h-[600px]"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute inset-0 z-0 hidden lg:block">
            <Suspense fallback={<div className="w-full h-full" />}>
              <TechCanvas />
            </Suspense>
          </div>

          <div className="relative z-10 w-56 h-56 sm:w-64 sm:h-64 lg:w-80 lg:h-80 select-none">
            <div className="absolute inset-0 rounded-full bg-cyan-400/10 blur-2xl scale-125" />
            <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-blue-500/15 via-cyan-400/15 to-emerald-400/15 blur-xl" />

            <div className="relative w-full h-full rounded-full p-[3px] bg-gradient-to-tr from-blue-500 via-cyan-400 to-emerald-400 shadow-lg">
              <div className="w-full h-full rounded-full overflow-hidden bg-slate-950">
                <img
                  src="/profile.jpg"
                  alt="Mohammed Zunaid Shaik"
                  className="w-full h-full object-cover object-top"
                  loading="eager"
                  fetchpriority="high"
                />
              </div>
            </div>

            <div className="absolute top-6 -left-8 sm:-left-10 p-2.5 sm:p-3 rounded-2xl bg-slate-900/80 border border-slate-700/50 flex items-center gap-2">
              <Terminal size={14} className="text-blue-400" />
              <span className="text-xs font-semibold text-slate-200">Python</span>
            </div>
            <div className="absolute top-2 right-2 sm:-right-4 p-2.5 sm:p-3 rounded-2xl bg-slate-900/80 border border-slate-700/50 flex items-center gap-2">
              <Code2 size={14} className="text-yellow-400" />
              <span className="text-xs font-semibold text-slate-200">JS</span>
            </div>
            <div className="absolute top-1/3 -right-12 sm:-right-14 p-2.5 sm:p-3 rounded-2xl bg-slate-900/80 border border-slate-700/50 flex items-center gap-2">
              <Brain size={14} className="text-cyan-400" />
              <span className="text-xs font-semibold text-slate-200">OpenAI</span>
            </div>
            <div className="absolute -bottom-4 right-8 p-2.5 sm:p-3 rounded-2xl bg-slate-900/80 border border-slate-700/50 flex items-center gap-2">
              <Cpu size={14} className="text-emerald-400" />
              <span className="text-xs font-semibold text-slate-200">n8n</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
