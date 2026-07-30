import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ProjectModal from './ProjectModal';

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

function ProjectCard({ project, index, onSelect }: { project: Project; index: number; onSelect: (p: Project) => void }) {
  const [hovered, setHovered] = useState(false);
  const ac = project.accentColor;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="relative flex flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900"
        style={{
          transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
          transition: 'transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.3s',
          borderColor: hovered ? `${ac}44` : undefined,
        }}
      >
        <div style={{ position: 'relative', height: '60%', overflow: 'hidden', flexShrink: 0 }}>
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            decoding="async"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'top',
              display: 'block',
              transform: hovered ? 'scale(1.03)' : 'scale(1)',
              transition: 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          />

          <div style={{
            position: 'absolute', inset: 0,
            background: `linear-gradient(to top, rgba(8,11,22,1) 0%, rgba(8,11,22,0.4) 45%, transparent 100%)`,
          }} />

          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 1.5,
            background: `linear-gradient(90deg, transparent 5%, ${ac} 50%, transparent 95%)`,
          }} />

          <div style={{ position: 'absolute', top: 16, left: 16, zIndex: 5 }}>
            <span style={{
              display: 'inline-block', padding: '4px 12px', borderRadius: 99,
              fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
              background: 'rgba(8,11,22,0.85)',
              border: `1px solid ${ac}33`, color: ac,
            }}>
              {project.tag}
            </span>
          </div>
        </div>

        <div style={{
          padding: '20px 24px 24px',
          display: 'flex', flexDirection: 'column',
          flexGrow: 1,
        }}>
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

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 'auto' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {project.techStack.slice(0, 4).map((tech, i) => (
                <span
                  key={i}
                  style={{
                    display: 'inline-block',
                    padding: '3px 9px', borderRadius: 99,
                    fontSize: '10px', fontWeight: 600,
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    color: 'rgba(148,163,184,0.85)',
                  }}
                >
                  {tech}
                </span>
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
                  <span style={{
                    position: 'absolute', bottom: -2, left: 0,
                    height: '1px', background: ac,
                    width: hovered ? '100%' : '0%',
                    transition: 'width 0.35s cubic-bezier(0.22,1,0.36,1)',
                  }} />
                </span>

                <span style={{ display: 'flex', alignItems: 'center', transition: 'transform 0.2s', transform: hovered ? 'translateX(4px)' : 'translateX(0)' }}>
                  <ArrowRight size={14} />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);
  const handleSelect = (p: Project) => setSelected(p);
  const handleClose = () => setSelected(null);

  return (
    <section id="projects" style={{ padding: '96px 0', borderTop: '1px solid rgba(15,23,42,1)', background: '#080b16', position: 'relative', overflow: 'hidden' }}>
      
      <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '20%', left: '10%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.04) 0%, transparent 70%)', filter: 'blur(80px)' }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(6,182,212,0.04) 0%, transparent 70%)', filter: 'blur(80px)' }} />
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 5 }}>
        
        <motion.div
          style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto 72px' }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={i} project={project} index={i} onSelect={handleSelect} />
          ))}
        </div>

      </div>

      <ProjectModal project={selected} onClose={handleClose} />
    </section>
  );
}
