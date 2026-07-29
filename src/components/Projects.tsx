import { useState, useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ProjectModal from './ProjectModal';

/* ─────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────── */
interface Project {
  title: string; tag: string; description: string;
  problem: string; solution: string; contribution: string;
  techStack: string[]; challenges: string; learnings: string;
  gradient: string; accentColor: string; image: string;
}

const PROJECTS: Project[] = [
  {
    title: 'AI Email Auto Responder', tag: 'Automation',
    description: 'Automated incoming email classifier and context-aware auto-response generator built as an n8n workflow.',
    problem: 'Handling high volumes of customer and lead emails led to response bottlenecks, causing delays and client frustration.',
    solution: 'Created an intelligent n8n automation workflow that pulls unread Gmail messages, uses an AI Classifier to determine intent, then routes emails to either a draft creator or an auto-reply writer.',
    contribution: 'Designed the full n8n workflow including Gmail trigger, OpenAI Classifier node, conditional routing logic, Reply Writer prompt, and automated send/draft creation with Sheets logging.',
    techStack: ['n8n', 'OpenAI API', 'Gmail API', 'Google Sheets', 'JavaScript'],
    challenges: 'Handling token limits when emails contain long thread histories, and preventing AI from hallucinating pricing or policy details.',
    learnings: 'Implemented thread parsing to isolate only the latest reply, and engineered strict system prompt guardrails for sensitive email types.',
    gradient: 'from-blue-600 to-cyan-500', accentColor: '#3b82f6', image: '/proj-email.png',
  },
  {
    title: 'ATS Resume Tracker & Role Matcher', tag: 'AI Product',
    description: 'Intelligent tool to score and compare resumes against job descriptions, providing actionable improvement suggestions.',
    problem: 'Job seekers lacked insight into how ATS systems evaluated their resumes against target job postings.',
    solution: 'Engineered an application that processes uploaded PDF resumes, extracts text, and runs semantic keyword scoring against job description criteria.',
    contribution: 'Built the FastAPI backend parsing services, designed the semantic similarity scoring algorithm, developed the resume grader UI.',
    techStack: ['Python', 'FastAPI', 'React', 'PyPDF2', 'SentenceTransformers', 'Tailwind CSS'],
    challenges: 'Maintaining parsing accuracy across custom multi-column PDF layouts and decorative resume designs.',
    learnings: 'Refined text extraction to parse line-by-line rather than by visual blocks, significantly improving accuracy.',
    gradient: 'from-cyan-500 to-emerald-500', accentColor: '#06b6d4', image: '/proj-ats.png',
  },
  {
    title: 'AI Chatbot', tag: 'Full Stack',
    description: 'Context-aware user engagement chatbot featuring sliding dialogue memory and AI agent-powered responses.',
    problem: 'Traditional rule-based chat support systems failed to parse complex inquiries and lacked user context history.',
    solution: 'Built an interactive chatbot with a sliding session buffer that preserves recent conversation context and resolves user queries intelligently.',
    contribution: 'Designed MongoDB session schemas for chat persistence, configured streaming API handlers for typing animations, and built the clean chat widget UI.',
    techStack: ['React', 'Node.js', 'MongoDB', 'Anthropic API', 'Server-Sent Events'],
    challenges: 'Keeping latency low during text streams while simultaneously saving session data.',
    learnings: 'Switched from HTTP to SSE for typing animations, and built a summarization algorithm to compress old memory.',
    gradient: 'from-violet-600 to-blue-500', accentColor: '#7c3aed', image: '/proj-chatbot.png',
  },
  {
    title: 'NOCODESAARTHI Website', tag: 'Web Dev',
    description: 'Professional agency website showcasing AI automation services, portfolio work, and client acquisition for Nocode Saarthi.',
    problem: 'The agency needed a high-converting, modern website that clearly communicates AI and automation capabilities.',
    solution: 'Designed and developed a responsive, dark-themed agency website with clear service sections, portfolio showcase, and an integrated contact/booking system.',
    contribution: 'Led frontend development using React, implemented responsive layouts, optimized performance, and integrated automation for lead capture.',
    techStack: ['React', 'Vite', 'Tailwind CSS', 'Make.com API', 'Framer Motion'],
    challenges: 'Optimizing heavy visual sections and SVG illustrations to achieve strong performance scores on mobile devices.',
    learnings: 'Implemented image lazy loading, component code-splitting, and CSS bundle minification for fast load times.',
    gradient: 'from-emerald-500 to-teal-600', accentColor: '#10b981', image: '/proj-nocode.png',
  },
];

/* ─────────────────────────────────────────────────────────────
   CARD COMPONENT
───────────────────────────────────────────────────────────── */
function ProjectCard({
  project,
  index,
  onSelect,
}: {
  project: Project;
  index: number;
  onSelect: (p: Project) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [glowPos, setGlowPos] = useState({ x: '50%', y: '40%' });

  // Scroll-linked parallax tracking on the card element
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });
  
  // Transform scroll progress to vertical offset, smoothed with a spring
  const scrollY = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  const imageY = useSpring(scrollY, { stiffness: 90, damping: 25 });

  /* Spring-driven tilt */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 240, damping: 24, mass: 0.4,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 240, damping: 24, mass: 0.4,
  });

  // Mouse image offset (replacing state updates for performance)
  const mouseImgX = useSpring(0, { stiffness: 140, damping: 22 });
  const mouseImgY = useSpring(0, { stiffness: 140, damping: 22 });

  // Combined vertical transformation (scroll parallax + mouse movement)
  const combinedY = useTransform(
    [imageY, mouseImgY],
    ([latestScrollY, latestMouseY]) => (latestScrollY as number) + (latestMouseY as number)
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(nx);
      mouseY.set(ny);
      mouseImgX.set(nx * 10);
      mouseImgY.set(ny * 10);
      const px = ((e.clientX - rect.left) / rect.width) * 100;
      const py = ((e.clientY - rect.top) / rect.height) * 100;
      setGlowPos({ x: `${px}%`, y: `${py}%` });
    },
    [mouseX, mouseY, mouseImgX, mouseImgY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
    mouseImgX.set(0);
    mouseImgY.set(0);
    setGlowPos({ x: '50%', y: '40%' });
    setHovered(false);
  }, [mouseX, mouseY, mouseImgX, mouseImgY]);

  const ac = project.accentColor;

  return (
    /* ── Layer 1 : entrance animation ── */
    <motion.div
      initial={{ opacity: 0, y: 70, scale: 0.95, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.8,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ perspective: '1400px' }}
    >
      {/* ── Layer 2 : tilt + hover elevation ── */}
      <motion.div
        ref={cardRef}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          willChange: 'transform',
          borderRadius: '28px',
          overflow: 'hidden',
          background: 'rgba(8, 11, 22, 0.85)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: `1px solid ${hovered ? ac + '44' : 'rgba(255,255,255,0.055)'}`,
          boxShadow: hovered
            ? `0 40px 90px -15px rgba(0,0,0,0.95), 0 0 0 1px ${ac}22, 0 0 60px -15px ${ac}44`
            : '0 8px 30px -10px rgba(0,0,0,0.65)',
          transition: 'border-color 0.3s, box-shadow 0.4s',
          cursor: 'default',
          display: 'flex',
          flexDirection: 'column',
          height: 480, // Fixed card height
        }}
        animate={{ y: hovered ? -10 : 0, scale: hovered ? 1.02 : 1 }}
        transition={{ type: 'spring', stiffness: 220, damping: 25 }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
      >
        {/* Cursor Glow effect */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            left: glowPos.x,
            top: glowPos.y,
            transform: 'translate(-50%,-50%)',
            width: 320,
            height: 320,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${ac}18 0%, rgba(99,102,241,0.08) 50%, transparent 70%)`,
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.3s',
            pointerEvents: 'none',
            zIndex: 10,
            mixBlendMode: 'screen',
          }}
        />

        {/* ════════════════════════════════
            TOP 60% — PROJECT IMAGE
        ════════════════════════════════ */}
        <div style={{ position: 'relative', height: '60%', overflow: 'hidden', flexShrink: 0, borderTopLeftRadius: 28, borderTopRightRadius: 28 }}>
          <motion.img
            src={project.image}
            alt={project.title}
            loading="lazy"
            style={{ 
              position: 'absolute',
              width: '100%', 
              height: '130%', 
              top: '-15%',
              objectFit: 'cover', 
              objectPosition: 'top', 
              display: 'block',
              x: mouseImgX,
              y: combinedY,
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
            }}
            animate={{
              scale: hovered ? 1.05 : 1,
              filter: hovered
                ? 'brightness(1.10) contrast(1.08) saturate(1.05)'
                : 'brightness(1) contrast(1) saturate(1)',
            }}
            transition={{ type: 'spring', stiffness: 180, damping: 28 }}
          />

          {/* Cinematic gradient overlay from bottom */}
          <div style={{
            position: 'absolute', inset: 0,
            background: `linear-gradient(to top, rgba(8,11,22,1) 0%, rgba(8,11,22,0.45) 45%, transparent 100%)`,
          }} />

          {/* Top-left glass reflection */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 40%)',
            opacity: hovered ? 1 : 0.4,
            transition: 'opacity 0.4s',
            pointerEvents: 'none',
          }} />

          {/* Top accent gradient border line */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 1.5,
            background: `linear-gradient(90deg, transparent 5%, ${ac} 50%, transparent 95%)`,
          }} />

          {/* Soft glow indicator at the bottom edge of image */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: 2,
            background: `linear-gradient(90deg, transparent, ${ac}88, transparent)`,
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.4s',
          }} />

          {/* Category tag */}
          <div style={{ position: 'absolute', top: 16, left: 16, zIndex: 5 }}>
            <span style={{
              display: 'inline-block', padding: '4px 12px', borderRadius: 99,
              fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
              background: 'rgba(8,11,22,0.85)', backdropFilter: 'blur(8px)',
              border: `1px solid ${ac}33`, color: ac,
            }}>
              {project.tag}
            </span>
          </div>
        </div>

        {/* ════════════════════════════════
            BOTTOM 40% — CONTENT
        ════════════════════════════════ */}
        <div style={{
          padding: '20px 24px 24px',
          display: 'flex', flexDirection: 'column',
          height: '40%',
          flexGrow: 1,
          transform: 'translateZ(20px)',
          position: 'relative', zIndex: 5,
        }}>
          {/* Title and description wrapper */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flexGrow: 1 }}>
            <h3 style={{
              margin: 0,
              fontFamily: 'Outfit, sans-serif', fontWeight: 700,
              fontSize: '1.25rem', lineHeight: 1.3,
              color: hovered ? '#f8fafc' : '#e2e8f0',
              transition: 'color 0.3s',
            }}>
              {project.title}
            </h3>

            <p style={{
              margin: 0,
              fontSize: '13px', lineHeight: 1.6,
              color: 'rgba(148,163,184,0.7)',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}>
              {project.description}
            </p>
          </div>

          {/* Technology badges & CTA button area */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 'auto' }}>
            {/* Tech badges */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {project.techStack.slice(0, 4).map((tech, i) => (
                <motion.span
                  key={i}
                  animate={{
                    y: hovered ? -3 : 0,
                    scale: hovered ? 1.05 : 1,
                  }}
                  transition={{
                    type: 'spring', stiffness: 350, damping: 18,
                    delay: hovered ? i * 0.05 : 0,
                  }}
                  style={{
                    display: 'inline-block',
                    padding: '3px 9px', borderRadius: 99,
                    fontSize: '10px', fontWeight: 600,
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    color: 'rgba(148,163,184,0.85)',
                    backdropFilter: 'blur(4px)',
                  }}
                  whileHover={{
                    borderColor: `${ac}44`,
                    color: ac,
                    background: `${ac}10`
                  }}
                >
                  {tech}
                </motion.span>
              ))}
              {project.techStack.length > 4 && (
                <span style={{
                  display: 'inline-block', padding: '3px 9px', borderRadius: 99,
                  fontSize: '10px', fontWeight: 600,
                  background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)',
                  color: 'rgba(148,163,184,0.45)',
                }}>
                  +{project.techStack.length - 4}
                </span>
              )}
            </div>

            {/* Button */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 12 }}>
              <button
                onClick={() => onSelect(project)}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  background: 'none', border: 'none', padding: 0,
                  cursor: 'pointer',
                  fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '13px',
                  color: hovered ? ac : 'rgba(148,163,184,0.65)',
                  transition: 'color 0.3s',
                  position: 'relative',
                }}
              >
                <span style={{ position: 'relative' }}>
                  View Case Study
                  {/* Underline animation */}
                  <span style={{
                    position: 'absolute', bottom: -2, left: 0,
                    height: '1px', background: ac,
                    width: hovered ? '100%' : '0%',
                    transition: 'width 0.35s cubic-bezier(0.22,1,0.36,1)',
                  }} />
                </span>

                {/* Arrow animation */}
                <motion.span
                  animate={{ x: hovered ? 4 : 0 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                  style={{ display: 'flex', alignItems: 'center' }}
                >
                  <ArrowRight size={14} />
                </motion.span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   SECTION
───────────────────────────────────────────────────────────── */
export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="projects" style={{ padding: '96px 0', borderTop: '1px solid rgba(15,23,42,1)', background: '#080b16', position: 'relative', overflow: 'hidden' }}>
      
      {/* Background blobs */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '20%', left: '10%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.04) 0%, transparent 70%)', filter: 'blur(80px)' }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(6,182,212,0.04) 0%, transparent 70%)', filter: 'blur(80px)' }} />
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 5 }}>
        
        {/* Section Header */}
        <motion.div
          style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto 72px' }}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p style={{
            fontFamily: 'Outfit, sans-serif', fontWeight: 600,
            fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase',
            color: '#06b6d4', marginBottom: 14,
          }}>
            Projects
          </p>
          <h2 style={{
            fontFamily: 'Outfit, sans-serif', fontWeight: 700,
            fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', lineHeight: 1.2,
            color: '#f1f5f9', marginBottom: 18, margin: '0 0 18px',
          }}>
            Featured Case Studies
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.8, color: 'rgba(148,163,184,0.75)', fontWeight: 300 }}>
            Detailed walkthroughs of systems I have architected and deployed — from AI automation workflows to full-stack web applications.
          </p>
        </motion.div>

        {/* Card Grid: 2 columns on desktop/tablet, 1 column on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={i} project={project} index={i} onSelect={setSelected} />
          ))}
        </div>

      </div>

      {/* Modal */}
      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
