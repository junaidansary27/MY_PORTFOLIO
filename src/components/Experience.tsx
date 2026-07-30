import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useSpring, AnimatePresence, MotionValue } from 'framer-motion';
import { Calendar, Cpu, Code2, Brain } from 'lucide-react';

interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  description: string;
  bullets: string[];
  icon: React.ReactNode;
  color: string;
  accent: string;
}

const EXPERIENCES: ExperienceItem[] = [
  {
    role: 'AI Developer & Automation Engineer',
    company: 'Nocode Saarthi Agency',
    period: '2026 – Present',
    icon: <Cpu size={20} />,
    color: '#06b6d4',
    accent: 'rgba(6,182,212,0.15)',
    description: 'Contributing to a growing AI-focused startup by designing and delivering AI-powered websites, intelligent automation systems, and full-stack web applications for real business clients.',
    bullets: [
      'Build AI-powered websites and web applications using React, Tailwind CSS, and Node.js — transforming client briefs into polished, production-ready digital experiences.',
      'Design and deploy intelligent automation workflows using n8n that eliminate manual effort, connecting CRMs, email systems, databases, and third-party APIs into seamless pipelines.',
      'Integrate AI features including LLM-powered chatbots, AI content generators, and auto-response systems using OpenAI API for live client projects.',
      'Develop and maintain backend REST APIs, handle third-party API integrations, and manage database connections to support scalable full-stack solutions.',
      'Work directly with startup founders on client deliverables, translating business requirements into technical implementations with clear timelines and documentation.',
    ],
  },
  {
    role: 'AI Developer Intern',
    company: 'Ottobon',
    period: 'Internship',
    icon: <Brain size={20} />,
    color: '#3b82f6',
    accent: 'rgba(59,130,246,0.15)',
    description: 'Worked on building intelligent automation pipelines and microservices incorporating advanced AI features.',
    bullets: [
      'Developed and deployed automated workflow scripts in Python and Node.js to streamline data processing.',
      'Integrated OpenAI and Claude APIs for natural language extraction, structured mapping, and automated text responses.',
      'Constructed custom prompt-flows and vector database indices to perform semantic search and Retrieval-Augmented Generation (RAG).',
      'Assisted in testing API endpoints and refining database query performance for production stability.',
    ],
  },
  {
    role: 'Frontend & Backend Trainee',
    company: 'Intrnforte',
    period: 'Trainee Phase',
    icon: <Code2 size={20} />,
    color: '#8b5cf6',
    accent: 'rgba(139,92,246,0.15)',
    description: 'Gained hands-on experience in full-stack development, focusing on modular web interfaces and backend APIs.',
    bullets: [
      'Built interactive, responsive user interface components in React matching design mockups.',
      'Created and maintained RESTful backend service endpoints using Node.js, Express, and MongoDB.',
      'Wrote structural unit tests and debugged cross-browser layout and integration issues.',
      'Collaborated with senior developers on Git-based version control flows, code reviews, and CI checks.',
    ],
  },
];

/* ─────────────────────────────────────────────────────────────
   SINGLE CARD — only ever ONE mounted in DOM
───────────────────────────────────────────────────────────── */
function ActiveCard({ exp }: { exp: ExperienceItem }) {
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const tiltX = useSpring(0, { stiffness: 280, damping: 28 });
  const tiltY = useSpring(0, { stiffness: 280, damping: 28 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xVal = (e.clientX - rect.left) / rect.width - 0.5;
    const yVal = (e.clientY - rect.top) / rect.height - 0.5;
    tiltX.set(yVal * -3);
    tiltY.set(xVal * 3);
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
    setHovered(false);
  };

  const bulletGradient = `linear-gradient(135deg, ${exp.color}, ${exp.color}88)`;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40, scale: 0.98 }}
      animate={{ opacity: 1, y: hovered ? -4 : 0, scale: hovered ? 1.01 : 1 }}
      exit={{ opacity: 0, y: -30, scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 220, damping: 26 }}
      style={{
        rotateX: tiltX,
        rotateY: tiltY,
        transformStyle: 'preserve-3d',
        willChange: 'transform, opacity',
        background: 'rgba(255, 255, 255, 0.08)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: `1px solid ${hovered ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.15)'}`,
        borderRadius: 32,
        boxShadow: hovered
          ? `0 20px 50px -10px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.1)`
          : `0 12px 40px -8px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.08)`,
        transition: 'border-color 0.3s, box-shadow 0.3s',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="w-full max-w-3xl p-7 sm:p-9 flex flex-col text-left"
    >
      {/* ── Decorative background orb ── */}
      <div
        aria-hidden
        style={{
          position: 'absolute', top: -80, right: -80,
          width: 300, height: 300, borderRadius: '50%',
          background: `radial-gradient(circle at center, ${exp.color}1e 0%, transparent 70%)`,
          filter: 'blur(40px)',
          pointerEvents: 'none', zIndex: 0,
        }}
      />

      {/* ── Animated top accent line ── */}
      <motion.div
        key={exp.role + '-line'}
        className="absolute top-0 left-0 right-0 h-[2px] origin-left"
        style={{ background: `linear-gradient(90deg, ${exp.color}, ${exp.color}66, transparent)`, borderRadius: '32px 32px 0 0' }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* ── Inner glass reflection ── */}
      <div
        aria-hidden
        style={{
          position: 'absolute', inset: 0, borderRadius: 32,
          background: 'linear-gradient(155deg, rgba(255,255,255,0.065) 0%, transparent 38%)',
          pointerEvents: 'none', zIndex: 0,
        }}
      />

      {/* ── Cursor spotlight ── */}
      {hovered && (
        <div
          aria-hidden
          style={{
            position: 'absolute',
            left: mousePos.x - 110, top: mousePos.y - 110,
            width: 220, height: 220, borderRadius: '50%',
            background: `radial-gradient(circle, ${exp.color}12 0%, transparent 70%)`,
            pointerEvents: 'none', zIndex: 1,
          }}
        />
      )}

      {/* ── HEADER ── */}
      <div className="flex flex-wrap justify-between items-start gap-4 mb-5 relative" style={{ zIndex: 2 }}>
        <div className="flex items-center gap-4">
          {/* Icon badge */}
          <motion.div
            whileHover={{ rotate: 10, scale: 1.08 }}
            transition={{ type: 'spring', stiffness: 380, damping: 18 }}
            style={{
              width: 52, height: 52, borderRadius: 16, flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: `linear-gradient(135deg, ${exp.color}28, ${exp.color}10)`,
              border: `1px solid ${exp.color}30`,
              color: exp.color,
              boxShadow: `0 4px 16px ${exp.color}22, inset 0 1px 0 rgba(255,255,255,0.15)`,
              backdropFilter: 'blur(8px)',
            }}
          >
            {exp.icon}
          </motion.div>

          <div>
            <h4 style={{
              fontFamily: 'Outfit, sans-serif', fontWeight: 700,
              fontSize: '1.15rem', lineHeight: 1.3,
              color: '#f1f5f9', margin: 0,
            }}>
              {exp.role}
            </h4>
            <span style={{
              fontFamily: 'Outfit, sans-serif', fontWeight: 600,
              fontSize: '0.8rem', letterSpacing: '0.03em', color: exp.color,
            }}>
              {exp.company}
            </span>
          </div>
        </div>

        {/* Year badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '6px 14px', borderRadius: 99,
          background: 'rgba(255,255,255,0.07)',
          border: `1px solid ${exp.color}28`,
          backdropFilter: 'blur(10px)',
          boxShadow: `0 2px 12px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,255,255,0.05)`,
        }}>
          <Calendar size={11} style={{ color: exp.color, flexShrink: 0 }} />
          <span style={{
            fontFamily: 'Outfit, sans-serif', fontWeight: 600,
            fontSize: '11px', letterSpacing: '0.05em',
            color: 'rgba(226,232,240,0.85)',
          }}>
            {exp.period}
          </span>
        </div>
      </div>

      {/* ── Description ── */}
      <p style={{
        fontFamily: 'Outfit, sans-serif', fontSize: '13px',
        lineHeight: 1.75, color: 'rgba(203,213,225,0.72)',
        fontStyle: 'italic', fontWeight: 300,
        marginBottom: 20, position: 'relative', zIndex: 2,
      }}>
        {exp.description}
      </p>

      {/* ── Bullets ── */}
      <ul className="space-y-3 flex-grow" style={{ position: 'relative', zIndex: 2 }}>
        {exp.bullets.map((bullet, i) => (
          <li key={i} className="flex gap-3 items-start">
            <span style={{
              width: 18, height: 18, borderRadius: '50%', flexShrink: 0,
              marginTop: 3,
              background: bulletGradient,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: `0 0 8px ${exp.color}30`,
            }}>
              <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                <path d="M1 3L3 5L7 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span style={{
              fontFamily: 'Outfit, sans-serif', fontSize: '13px',
              lineHeight: 1.7, color: 'rgba(203,213,225,0.82)', fontWeight: 300,
            }}>
              {bullet}
            </span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   TIMELINE NODE INDICATOR (sidebar)
───────────────────────────────────────────────────────────── */
function TimelineNodes({
  active,
  scrollYProgress,
}: {
  active: number;
  scrollYProgress: MotionValue<number>;
}) {
  const NODE_OFFSETS = [20, 130, 240];
  const colors = ['#06b6d4', '#3b82f6', '#8b5cf6'];

  return (
    <div className="hidden md:flex md:col-span-2 flex-col items-center justify-center relative" style={{ height: 320 }}>
      {/* Progress line */}
      <div style={{
        position: 'absolute', width: 3, height: 260,
        top: '50%', transform: 'translateY(-50%)',
        background: 'rgba(51,65,85,0.6)', borderRadius: 99, overflow: 'hidden',
      }}>
        <motion.div
          style={{
            position: 'absolute', top: 0, left: 0, right: 0,
            background: 'linear-gradient(to bottom, #3b82f6, #06b6d4, #8b5cf6)',
            scaleY: scrollYProgress,
            transformOrigin: 'top',
            height: '100%',
          }}
        />
      </div>

      {/* Nodes */}
      {EXPERIENCES.map((_exp, idx) => {
        const isActive = active === idx;
        return (
          <div
            key={idx}
            style={{ position: 'absolute', top: NODE_OFFSETS[idx], transform: 'translateX(-50%)', left: '50%' }}
          >
            <motion.div
              animate={{ scale: isActive ? 1.35 : 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              style={{
                width: 28, height: 28, borderRadius: '50%',
                background: '#090d16',
                border: `2px solid ${colors[idx]}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: colors[idx] }} />
            </motion.div>
            {/* Pulsing glow when active */}
            {isActive && (
              <motion.div
                animate={{ opacity: [0.4, 0.9, 0.4], scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  position: 'absolute', inset: -6, borderRadius: '50%',
                  background: `radial-gradient(circle, ${colors[idx]}40 0%, transparent 70%)`,
                  pointerEvents: 'none',
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   SECTION
───────────────────────────────────────────────────────────── */
export default function Experience() {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Derive active index (0 | 1 | 2) from scroll progress using useTransform
  // We'll round the mapped value: 0–0.33 → 0, 0.33–0.66 → 1, 0.66–1.0 → 2
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let rafId: number;
    const unsubscribe = scrollYProgress.on('change', (v) => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const next = v < 0.35 ? 0 : v < 0.70 ? 1 : 2;
        setActiveIndex((prev) => (prev !== next ? next : prev));
      });
    });
    return () => {
      unsubscribe();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [scrollYProgress]);

  const activeExp = EXPERIENCES[activeIndex];

  return (
    <section
      ref={containerRef}
      id="experience"
      className="relative border-t border-slate-900 bg-slate-950/40"
      style={{ minHeight: '220vh' }}
    >
      {/* Ambient lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-10 w-[500px] h-[500px] bg-blue-500/[0.03] rounded-full blur-[130px]" />
        <div className="absolute bottom-1/3 right-10 w-[500px] h-[500px] bg-cyan-500/[0.03] rounded-full blur-[130px]" />
      </div>

      {/* ── STICKY VIEWPORT ── */}
      <div
        className="sticky top-[80px] z-10 flex flex-col justify-center items-center"
        style={{ minHeight: '85vh', overflow: 'visible' }}
      >
        {/* Header */}
        <div className="text-center mb-10 max-w-3xl px-6">
          <h2 className="font-display text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-2">
            Experience
          </h2>
          <h3 className="font-display text-3xl sm:text-4xl font-bold text-slate-100">
            Professional Timeline
          </h3>
        </div>

        {/* Layout grid */}
        <div className="w-full max-w-4xl px-6 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">

          {/* Left: timeline nodes */}
          <TimelineNodes active={activeIndex} scrollYProgress={scrollYProgress} />

          {/* Right: single active card via AnimatePresence */}
          <div
            className="col-span-1 md:col-span-10 flex items-center justify-center"
            style={{ minHeight: 440, position: 'relative' }}
          >
            <AnimatePresence mode="wait">
              <ActiveCard key={activeExp.role} exp={activeExp} />
            </AnimatePresence>
          </div>

        </div>

        {/* Scroll progress dots — mobile only */}
        <div className="flex md:hidden gap-2 mt-8">
          {EXPERIENCES.map((_, i) => (
            <motion.div
              key={i}
              animate={{ width: activeIndex === i ? 24 : 8, opacity: activeIndex === i ? 1 : 0.35 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              style={{
                height: 8, borderRadius: 99,
                background: activeIndex === i ? EXPERIENCES[i].color : 'rgba(148,163,184,0.4)',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
