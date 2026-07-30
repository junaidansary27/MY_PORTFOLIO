import { useRef, memo } from 'react';
import { motion, useInView } from 'framer-motion';
import { User, Layers, Target, Rocket, CheckCircle2, Zap, Code2, Brain } from 'lucide-react';

const CARDS = [
  {
    icon: <User size={20} />,
    color: '#3b82f6',
    title: 'Who I Am',
    content: (
      <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
        I am <span className="text-slate-200 font-medium">Mohammed Zunaid Shaik</span>, an AI Engineer and Full Stack Developer passionate about building intelligent software that combines artificial intelligence with scalable web technologies. I enjoy solving real-world problems through automation, modern application development, and AI integration.
      </p>
    ),
  },
  {
    icon: <Layers size={20} />,
    color: '#06b6d4',
    title: 'What I Build',
    content: (
      <ul className="space-y-2">
        {[
          { icon: <Brain size={12} />, text: 'AI-powered Web Applications' },
          { icon: <Zap size={12} />, text: 'Workflow Automation Systems' },
          { icon: <Code2 size={12} />, text: 'REST API Integrations' },
          { icon: <Layers size={12} />, text: 'Full Stack Applications' },
          { icon: <Brain size={12} />, text: 'Intelligent AI Assistants' },
        ].map((item, i) => (
          <li key={i} className="flex items-center gap-2 text-slate-400 text-xs sm:text-sm">
            <span className="text-cyan-400 shrink-0">{item.icon}</span>
            {item.text}
          </li>
        ))}
      </ul>
    ),
  },
  {
    icon: <Target size={20} />,
    color: '#10b981',
    title: 'Current Focus',
    content: (
      <div className="space-y-3">
        <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
          Building production-ready AI applications using modern technologies and automation platforms.
        </p>
        <div className="flex flex-wrap gap-1.5 pt-1">
          {['React', 'Node.js', 'Python', 'FastAPI', 'OpenAI API', 'n8n'].map(tech => (
            <span key={tech} className="px-2 py-0.5 rounded-full text-[10px] font-semibold"
              style={{ background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.25)', color: '#10b981' }}>
              {tech}
            </span>
          ))}
        </div>
      </div>
    ),
  },
  {
    icon: <Rocket size={20} />,
    color: '#8b5cf6',
    title: 'Career Goal',
    content: (
      <div className="space-y-3">
        <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
          To contribute as an AI Engineer by developing impactful AI products, scalable web applications, and automation solutions that improve business efficiency and user experience.
        </p>
        <div className="flex items-center gap-2 mt-2">
          <CheckCircle2 size={14} className="text-violet-400 shrink-0" />
          <span className="text-xs text-slate-400 font-medium">Open for full-time AI roles</span>
        </div>
      </div>
    ),
  },
];

const AboutCard = memo(function AboutCard({ card, index }: { card: typeof CARDS[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col gap-4 p-6 rounded-2xl border border-slate-800 bg-slate-900"
    >
      <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: 'rgba(255,255,255,0.05)', color: card.color }}>
        {card.icon}
      </div>

      <h4 className="font-display font-bold text-base sm:text-lg text-slate-100 leading-snug">
        {card.title}
      </h4>

      <div className="flex-grow">
        {card.content}
      </div>
    </motion.div>
  );
});

export default function About() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-60px' });

  return (
    <section id="about" className="py-24 border-t border-slate-900 bg-slate-950/40 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/4 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-cyan-500/4 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-16">
          <motion.p
            className="font-display text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-3"
            initial={{ opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            About Me
          </motion.p>
          <motion.h2
            className="font-display text-3xl sm:text-4xl font-bold text-slate-100 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.08 }}
          >
            Who I Am
          </motion.h2>
          <motion.p
            className="text-slate-400 font-light text-sm sm:text-base leading-relaxed"
            initial={{ opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.16 }}
          >
            AI Engineer and Full Stack Developer building intelligent software at the intersection of artificial intelligence and scalable web development.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CARDS.map((card, i) => (
            <AboutCard key={i} card={card} index={i} />
          ))}
        </div>

        <motion.div
          className="mt-10 mx-auto max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex items-start gap-4 p-4 rounded-2xl"
            style={{ background: 'rgba(6,182,212,0.05)', border: '1px solid rgba(6,182,212,0.12)' }}>
            <CheckCircle2 size={18} className="text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-slate-300 mb-0.5">Genuine Work. Real Results.</p>
              <p className="text-xs text-slate-500 leading-relaxed">
                Every project, skill, and experience shown here is based on actual work I have done — no inflated metrics, no fabricated achievements.
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
