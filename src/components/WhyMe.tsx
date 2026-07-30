import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FastForward, CheckSquare, Settings, Users, BookOpen, Layers } from 'lucide-react';

const cards = [
  {
    title: 'Fast Learner',
    description: 'I quickly pick up complex software frameworks and API schemas, reducing onboarding times and ramping up rapidly on new codebases.',
    icon: <FastForward size={20} />,
    color: '#3b82f6',
  },
  {
    title: 'Problem Solver',
    description: 'I approach system bugs and bottlenecks analytically, focusing on root causes rather than superficial hotfixes that create future technical debt.',
    icon: <CheckSquare size={20} />,
    color: '#06b6d4',
  },
  {
    title: 'AI & Automation Specialist',
    description: 'I combine AI APIs with automation pipelines to eliminate manual effort, creating reliable intelligent workflows that run without human intervention.',
    icon: <Settings size={20} />,
    color: '#10b981',
  },
  {
    title: 'Team Collaborator',
    description: 'I advocate for clear documentation, structured pull requests, and standard git branching, ensuring smooth integration with every teammate.',
    icon: <Users size={20} />,
    color: '#8b5cf6',
  },
  {
    title: 'Continuous Learner',
    description: 'I proactively stay current with the evolving AI landscape, building with new frameworks and testing emerging tools before they become mainstream.',
    icon: <BookOpen size={20} />,
    color: '#6366f1',
  },
  {
    title: 'Adaptability',
    description: 'I move fluidly between frontend interfaces in React, server-side logic in Node.js, and AI pipeline design — adapting to whatever the project demands.',
    icon: <Layers size={20} />,
    color: '#ec4899',
  },
];

function Card({ card, index }: { card: typeof cards[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col gap-4 p-6 rounded-2xl border border-slate-800 bg-slate-900"
    >
      <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
        style={{ color: card.color, background: 'rgba(255,255,255,0.05)' }}>
        {card.icon}
      </div>

      <div className="space-y-2">
        <h4 className="font-display font-bold text-base sm:text-lg text-slate-100 leading-snug">
          {card.title}
        </h4>
        <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
          {card.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function WhyMe() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-60px' });

  return (
    <section id="whyme" className="py-24 border-t border-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-cyan-500/5 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-96 h-96 bg-violet-500/3 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
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
            transition={{ duration: 0.5, delay: 0.08 }}
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map((card, i) => (
            <Card key={i} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
