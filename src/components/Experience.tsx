import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Cpu, Code2, Brain } from 'lucide-react';

interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  description: string;
  bullets: string[];
  icon: React.ReactNode;
  color: string;
}

const EXPERIENCES: ExperienceItem[] = [
  {
    role: 'AI Developer & Automation Engineer',
    company: 'Nocode Saarthi Agency',
    period: '2026 – Present',
    icon: <Cpu size={20} />,
    color: '#06b6d4',
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
    description: 'Gained hands-on experience in full-stack development, focusing on modular web interfaces and backend APIs.',
    bullets: [
      'Built interactive, responsive user interface components in React matching design mockups.',
      'Created and maintained RESTful backend service endpoints using Node.js, Express, and MongoDB.',
      'Wrote structural unit tests and debugged cross-browser layout and integration issues.',
      'Collaborated with senior developers on Git-based version control flows, code reviews, and CI checks.',
    ],
  },
];

function ExperienceCard({ exp, index }: { exp: ExperienceItem; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-3xl p-7 sm:p-9 flex flex-col text-left"
      style={{
        background: 'rgba(255, 255, 255, 0.06)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 24,
      }}
    >
      <div className="flex flex-wrap justify-between items-start gap-4 mb-5">
        <div className="flex items-center gap-4">
          <div style={{
            width: 52, height: 52, borderRadius: 16, flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: `linear-gradient(135deg, ${exp.color}28, ${exp.color}10)`,
            border: `1px solid ${exp.color}30`,
            color: exp.color,
          }}>
            {exp.icon}
          </div>

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

        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '6px 14px', borderRadius: 99,
          background: 'rgba(255,255,255,0.06)',
          border: `1px solid ${exp.color}28`,
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

      <p style={{
        fontFamily: 'Outfit, sans-serif', fontSize: '13px',
        lineHeight: 1.75, color: 'rgba(203,213,225,0.72)',
        fontStyle: 'italic', fontWeight: 300,
        marginBottom: 20,
      }}>
        {exp.description}
      </p>

      <ul className="space-y-3 flex-grow">
        {exp.bullets.map((bullet, i) => (
          <li key={i} className="flex gap-3 items-start">
            <span style={{
              width: 18, height: 18, borderRadius: '50%', flexShrink: 0,
              marginTop: 3,
              background: `linear-gradient(135deg, ${exp.color}, ${exp.color}88)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
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

export default function Experience() {
  return (
    <section id="experience" className="relative border-t border-slate-900 bg-slate-950/40 py-24">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-10 w-[500px] h-[500px] bg-blue-500/[0.03] rounded-full blur-[100px]" />
        <div className="absolute bottom-1/3 right-10 w-[500px] h-[500px] bg-cyan-500/[0.03] rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16">
          <p className="font-display text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-2">
            Experience
          </p>
          <h3 className="font-display text-3xl sm:text-4xl font-bold text-slate-100">
            Professional Timeline
          </h3>
        </div>

        <div className="flex flex-col gap-8 items-center">
          {EXPERIENCES.map((exp, i) => (
            <ExperienceCard key={i} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
