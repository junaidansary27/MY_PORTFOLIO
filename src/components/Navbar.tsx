import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Technologies', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass-nav py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">

        {/* ── Premium Geometric Logo ── */}
        <a href="#home" className="flex items-center gap-3 group" aria-label="Mohammed Zunaid Shaik">
          <div className="relative w-9 h-9 transition-transform duration-300 group-hover:scale-110">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" fill="none" className="w-full h-full">
              <defs>
                <linearGradient id="lg1" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="100%" stopColor="#6366f1" />
                </linearGradient>
                <linearGradient id="lg2" x1="40" y1="0" x2="0" y2="40" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.6" />
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="1.2" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Outer thin square rotated 45° — diamond shape */}
              <rect
                x="4" y="4" width="32" height="32" rx="5"
                stroke="url(#lg2)" strokeWidth="1"
                transform="rotate(45 20 20)"
                opacity="0.5"
              />

              {/* Inner rounded square */}
              <rect
                x="9" y="9" width="22" height="22" rx="4"
                stroke="url(#lg1)" strokeWidth="1.2"
                opacity="0.35"
              />

              {/* Core — stylised "S" / AI node path */}
              <path
                d="M14 14.5 C14 12 16 11 20 11 C24 11 26 13 26 15.5 C26 18 24 19.5 20 20.5 C16 21.5 14 23 14 25.5 C14 28 16 29 20 29 C24 29 26 27.5 26 25.5"
                stroke="url(#lg1)"
                strokeWidth="2.2"
                strokeLinecap="round"
                filter="url(#glow)"
              />

              {/* Top-left node dot */}
              <circle cx="14" cy="11" r="1.5" fill="url(#lg1)" opacity="0.9" />
              {/* Bottom-right node dot */}
              <circle cx="26" cy="29" r="1.5" fill="url(#lg1)" opacity="0.9" />
              {/* Centre accent dot */}
              <circle cx="20" cy="20.5" r="1" fill="#38bdf8" opacity="0.7" />
            </svg>
          </div>

          <span className="font-display font-bold text-lg tracking-[0.2em] text-slate-100 group-hover:text-cyan-400 transition-colors duration-300">
            SHAIK
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-slate-400 hover:text-cyan-400 transition-colors duration-200 relative group"
            >
              {link.name}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-cyan-400 group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-slate-300 hover:text-slate-100 focus:outline-none p-1"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden fixed top-[60px] left-0 w-full h-[calc(100vh-60px)] bg-slate-950/97 backdrop-blur-xl z-40 border-t border-slate-900">
          <div className="flex flex-col items-center justify-center h-full gap-8 pb-20">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-xl font-medium text-slate-300 hover:text-cyan-400 transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
