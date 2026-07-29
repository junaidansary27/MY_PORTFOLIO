import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, MessageSquare, Brain, Code2, Cpu, Terminal, CheckCircle2 } from 'lucide-react';
import TechCanvas from './TechCanvas';

/* ── stagger container ───────────────────────── */
const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 32, filter: 'blur(6px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as any } },
};

const chipVariants = {
  hidden: { opacity: 0, y: 18, scale: 0.92 },
  show: (i: number) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.5, delay: 0.75 + i * 0.12, ease: [0.22, 1, 0.36, 1] as any },
  }),
};

const highlights = [
  { label: 'AI Developer', color: '#3b82f6' },
  { label: 'AI Automation', color: '#06b6d4' },
  { label: 'Full Stack Development', color: '#10b981' },
];

/* ── floating particles ──────────────────────── */
const PARTICLES = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  cx: `${10 + Math.random() * 80}%`,
  cy: `${10 + Math.random() * 80}%`,
  r: 1 + Math.random() * 1.5,
  dur: 4 + Math.random() * 5,
  delay: Math.random() * 4,
  opacity: 0.12 + Math.random() * 0.18,
}));

export default function Hero() {
  /* mouse parallax */
  const containerRef = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(useTransform(rawX, [-1, 1], [-12, 12]), { stiffness: 120, damping: 22 });
  const springY = useSpring(useTransform(rawY, [-1, 1], [-8, 8]), { stiffness: 120, damping: 22 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { width, height, left, top } = containerRef.current.getBoundingClientRect();
    rawX.set(((e.clientX - left) / width - 0.5) * 2);
    rawY.set(((e.clientY - top) / height - 0.5) * 2);
  };
  const handleMouseLeave = () => { rawX.set(0); rawY.set(0); };

  return (
    <section
      id="home"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden"
    >
      {/* Ambient background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-500/8 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-500/8 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-violet-500/4 rounded-full blur-[160px]" />

        {/* Floating particles */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {PARTICLES.map(p => (
            <circle key={p.id} fill="#06b6d4" opacity={p.opacity} r={p.r} cx={p.cx} cy={p.cy}>
              <animate attributeName="opacity" values={`${p.opacity};${p.opacity * 0.3};${p.opacity}`} dur={`${p.dur}s`} begin={`${p.delay}s`} repeatCount="indefinite" />
              <animate attributeName="cy" values={`${p.cy};calc(${p.cy} - 12px);${p.cy}`} dur={`${p.dur}s`} begin={`${p.delay}s`} repeatCount="indefinite" />
            </circle>
          ))}
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10 w-full">

        {/* ── LEFT COLUMN ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="lg:col-span-7 flex flex-col items-start text-left space-y-6 lg:-translate-y-12"
        >
          {/* Status badge */}
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              Open for Opportunities
            </div>
          </motion.div>

          {/* Name */}
          <motion.h1 variants={itemVariants} className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-100 leading-tight">
            Mohammed Zunaid <span className="text-gradient">Shaik</span>
          </motion.h1>

          {/* Title */}
          <motion.h2 variants={itemVariants} className="font-display text-xl sm:text-2xl lg:text-3xl font-semibold text-slate-300">
            AI Engineer & Full Stack Developer
          </motion.h2>

          {/* Description */}
          <motion.p variants={itemVariants} className="text-sm sm:text-base lg:text-lg text-slate-400 max-w-xl leading-relaxed font-light">
            Building AI-powered applications, workflow automations, and scalable full-stack solutions that solve real-world business problems. I specialize in integrating AI models, APIs, and modern web technologies to create intelligent, production-ready software.
          </motion.p>

          {/* Animated highlight chips */}
          <div className="flex flex-wrap gap-2.5 pt-1">
            {highlights.map((chip, i) => (
              <motion.span
                key={chip.label}
                custom={i}
                variants={chipVariants}
                initial="hidden"
                animate="show"
                whileHover={{ y: -2, scale: 1.04 }}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold"
                style={{
                  background: `${chip.color}14`,
                  border: `1px solid ${chip.color}38`,
                  color: chip.color,
                  boxShadow: `0 0 16px ${chip.color}18`,
                }}
              >
                <CheckCircle2 size={12} />
                {chip.label}
              </motion.span>
            ))}
          </div>

          {/* CTAs */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-2">
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold px-6 py-3.5 rounded-full shadow-[0_4px_24px_rgba(59,130,246,0.3)] hover:shadow-[0_8px_32px_rgba(59,130,246,0.5)] transition-shadow duration-300 group"
            >
              View My Projects
              <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform duration-200" />
            </motion.a>

            <motion.a
              href="#contact"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="inline-flex items-center gap-2 bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white font-semibold px-6 py-3.5 rounded-full hover:bg-slate-800 hover:border-slate-700 transition-all duration-200"
            >
              Contact Me
              <MessageSquare size={16} />
            </motion.a>
          </motion.div>
        </motion.div>

        {/* ── RIGHT COLUMN — Hero portrait ── */}
        <motion.div
          className="lg:col-span-5 relative flex items-center justify-center min-h-[520px] lg:min-h-[600px]"
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* R3F Network sphere */}
          <div className="absolute inset-0 z-0">
            <TechCanvas />
          </div>

          {/* Profile container — 15% smaller */}
          <motion.div
            style={{ x: springX, y: springY }}
            className="relative z-10 w-56 h-56 sm:w-64 sm:h-64 lg:w-80 lg:h-80 select-none"
          >
            {/* Cyan radial glow behind portrait */}
            <div className="absolute inset-0 rounded-full bg-cyan-400/10 blur-2xl scale-125 animate-pulse" />

            {/* Outer soft ambient ring */}
            <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-blue-500/15 via-cyan-400/15 to-emerald-400/15 blur-xl animate-pulse" />

            {/* Gradient border frame */}
            <div className="relative w-full h-full rounded-full p-[3px] bg-gradient-to-tr from-blue-500 via-cyan-400 to-emerald-400 shadow-[0_0_50px_rgba(6,182,212,0.3)]">
              <div className="w-full h-full rounded-full overflow-hidden bg-slate-950">
                <img
                  src="/profile.jpg"
                  alt="Mohammed Zunaid Shaik"
                  className="w-full h-full object-cover object-top scale-105 hover:scale-100 grayscale hover:grayscale-0 transition-all duration-700"
                  style={{ imageRendering: 'crisp-edges' }}
                />
              </div>
            </div>

            {/* Floating badge: Python — Left */}
            <div className="absolute top-6 -left-8 sm:-left-10 p-2.5 sm:p-3 rounded-2xl glass-card flex items-center gap-2 animate-float-1 shadow-lg border border-slate-700/50">
              <Terminal size={14} className="text-blue-400" />
              <span className="text-xs font-semibold text-slate-200">Python</span>
            </div>

            {/* Floating badge: JS — Top Right */}
            <div className="absolute top-2 right-2 sm:-right-4 p-2.5 sm:p-3 rounded-2xl glass-card flex items-center gap-2 animate-float-2 shadow-lg border border-slate-700/50">
              <Code2 size={14} className="text-yellow-400" />
              <span className="text-xs font-semibold text-slate-200">JS</span>
            </div>

            {/* Floating badge: OpenAI — Right */}
            <div className="absolute top-1/3 -right-12 sm:-right-14 p-2.5 sm:p-3 rounded-2xl glass-card flex items-center gap-2 animate-float-3 shadow-lg border border-slate-700/50">
              <Brain size={14} className="text-cyan-400" />
              <span className="text-xs font-semibold text-slate-200">OpenAI</span>
            </div>

            {/* Floating badge: n8n — Bottom */}
            <div className="absolute -bottom-4 right-8 p-2.5 sm:p-3 rounded-2xl glass-card flex items-center gap-2 animate-float-4 shadow-lg border border-slate-700/50">
              <Cpu size={14} className="text-emerald-400" />
              <span className="text-xs font-semibold text-slate-200">n8n</span>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
