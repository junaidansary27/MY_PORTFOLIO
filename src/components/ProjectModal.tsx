import { useEffect } from 'react';
import { X, CheckCircle, AlertTriangle, Lightbulb, Code2 } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  problem: string;
  solution: string;
  contribution: string;
  techStack: string[];
  challenges: string;
  learnings: string;
  gradient: string;
}

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-slate-950/80 backdrop-blur-md">
      {/* Backdrop Closer */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Box */}
      <div className="relative w-full max-w-4xl max-h-[85vh] overflow-y-auto glass-modal rounded-3xl z-10 shadow-2xl flex flex-col">
        {/* Banner with gradient match */}
        <div className={`h-24 sm:h-32 bg-gradient-to-r ${project.gradient} opacity-80 flex items-center justify-between px-6 sm:px-8 relative`}>
          <h4 className="font-display text-lg sm:text-2xl font-bold text-white drop-shadow-md">
            {project.title} Case Study
          </h4>
          <button 
            onClick={onClose}
            className="p-2 rounded-full bg-slate-900/50 hover:bg-slate-900 text-white transition-colors duration-200"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-6 text-left">
          
          {/* Tagline / Subtitle */}
          <div>
            <h5 className="text-xs uppercase font-semibold tracking-widest text-cyan-400 mb-1">Overview</h5>
            <p className="text-slate-200 text-base font-medium">{project.description}</p>
          </div>

          {/* Grid for Problem / Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-slate-800/80 pt-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-red-400 font-semibold text-sm">
                <AlertTriangle size={16} />
                <span>The Problem</span>
              </div>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{project.problem}</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                <CheckCircle size={16} />
                <span>The Solution</span>
              </div>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{project.solution}</p>
            </div>
          </div>

          {/* Contribution */}
          <div className="border-t border-slate-800/80 pt-6 space-y-2">
            <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm">
              <Code2 size={16} />
              <span>My Contribution</span>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{project.contribution}</p>
          </div>

          {/* Tech Stack Tags */}
          <div className="border-t border-slate-800/80 pt-6 space-y-3">
            <h5 className="text-xs uppercase font-semibold tracking-widest text-slate-400">Tech Stack</h5>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, i) => (
                <span key={i} className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Challenges & Learnings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-slate-800/80 pt-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
                <AlertTriangle size={16} />
                <span>Challenges Faced</span>
              </div>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{project.challenges}</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-blue-400 font-semibold text-sm">
                <Lightbulb size={16} />
                <span>Key Learnings</span>
              </div>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{project.learnings}</p>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="mt-auto border-t border-slate-800/80 p-6 flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-slate-905 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          >
            Close Case Study
          </button>
        </div>
      </div>
    </div>
  );
}
