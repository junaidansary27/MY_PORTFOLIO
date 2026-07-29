import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FastForward, CheckSquare, Settings, Users, BookOpen, Layers } from 'lucide-react';

const cards = [
  {
    title: 'Fast Learner',
    description: 'I quickly pick up complex software frameworks and API schemas, reducing onboarding times and ramping up rapidly on new codebases.',
    icon: <FastForward size={20} />,
    color: '#3b82f6',
    bg: 'rgba(59,130,246,0.1)',
    border: 'rgba(59,130,246,0.2)',
  },
  {
    title: 'Problem Solver',
    description: 'I approach system bugs and bottlenecks analytically, focusing on root causes rather than superficial hotfixes that create future technical debt.',
    icon: <CheckSquare size={20} />,
    color: '#06b6d4',
    bg: 'rgba(6,182,212,0.1)',
    border: 'rgba(6,182,212,0.2)',
  },
  {
    title: 'AI & Automation Specialist',
    description: 'I combine AI APIs with automation pipelines to eliminate manual effort, creating reliable intelligent workflows that run without human intervention.',
    icon: <Settings size={20} />,
    color: '#10b981',
    bg: 'rgba(16,185,129,0.1)',
    border: 'rgba(16,185,129,0.2)',
  },
  {
    title: 'Team Collaborator',
    description: 'I advocate for clear documentation, structured pull requests, and standard git branching, ensuring smooth integration with every teammate.',
    icon: <Users size={20} />,
    color: '#8b5cf6',
    bg: 'rgba(139,92,246,0.1)',
    border: 'rgba(139,92,246,0.2)',
  },
  {
    title: 'Continuous Learner',
    description: 'I proactively stay current with the evolving AI landscape, building with new frameworks and testing emerging tools before they become mainstream.',
    icon: <BookOpen size={20} />,
    color: '#6366f1',
    bg: 'rgba(99,102,241,0.1)',
    border: 'rgba(99,102,241,0.2)',
  },
  {
    title: 'Adaptability',
    description: 'I move fluidly between frontend interfaces in React, server-side logic in Node.js, and AI pipeline design — adapting to whatever the project demands.',
    icon: <Layers size={20} />,
    color: '#ec4899',
    bg: 'rgba(236,72,153,0.1)',
    border: 'rgba(236,72,153,0.2)',
  },
];

/* ── Single animated card ─────────────────────────── */
function Card({ card, index }: { card: typeof cards[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 48, rotate: -1.5, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.65,
        delay: index * 0.09,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -8,
        scale: 1.025,
        transition: { duration: 0.3, ease: 'easeOut' },
      }}
      className="relative flex flex-col gap-4 p-6 rounded-2xl overflow-hidden group"
      style={{
        background: 'rgba(10,14,26,0.75)',
        backdropFilter: 'blur(18px)',
        border: `1px solid rgba(148,163,184,0.07)`,
        cursor: 'default',
        willChange: 'transform',
      }}
    >
      {/* Animated border top line on hover */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${card.color}99, transparent)` }}
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 + index * 0.09, duration: 0.6 }}
      />

      {/* Radial glow on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 50% 0%, ${card.color}14, transparent 70%)` }}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      />

      {/* Animated border on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{ border: `1px solid ${card.border}` }}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />

      {/* Icon */}
      <motion.div
        className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: card.bg, color: card.color, border: `1px solid ${card.border}` }}
        whileHover={{ scale: 1.15, rotate: 6 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      >
        {card.icon}
      </motion.div>

      {/* Text */}
      <div className="space-y-2 relative z-10">
        <h4 className="font-display font-bold text-base sm:text-lg text-slate-100 leading-snug">
          {card.title}
        </h4>
        <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
          {card.description}
        </p>
      </div>

      {/* Bottom accent line */}
      <motion.div
        className="absolute bottom-0 left-6 right-6 h-px rounded-full"
        style={{ background: `linear-gradient(90deg, transparent, ${card.color}55, transparent)` }}
        initial={{ opacity: 0, scaleX: 0 }}
        whileHover={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.35 }}
      />
    </motion.div>
  );
}

/* ── Section ──────────────────────────────────────── */
export default function WhyMe() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-60px' });

  return (
    <section id="whyme" className="py-24 border-t border-slate-900 relative overflow-hidden">
      {/* Floating gradient background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-10 left-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-[100px]"
          animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-10 right-1/4 w-80 h-80 bg-cyan-500/5 rounded-full blur-[100px]"
          animate={{ x: [0, -20, 0], y: [0, 15, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 w-96 h-96 bg-violet-500/3 rounded-full blur-[120px]"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-16">
          <motion.p
            className="font-display text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-3"
            initial={{ opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            Why Me
          </motion.p>
          <motion.h2
            className="font-display text-3xl sm:text-4xl font-bold text-slate-100 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.08 }}
          >
            Professional Values & Traits
          </motion.h2>
          <motion.p
            className="text-slate-400 font-light text-sm sm:text-base"
            initial={{ opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.16 }}
          >
            What I bring to your engineering team: practical developer habits, analytical thinking, and a commitment to quality.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map((card, i) => (
            <Card key={i} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
