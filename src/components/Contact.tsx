import { useState, useRef } from 'react';
import { Mail, MapPin, Send, Check, AlertCircle, Phone } from 'lucide-react';
import emailjs from '@emailjs/browser';

// ─────────────────────────────────────────────
// EmailJS Configuration
// Replace the placeholders below with your real credentials from https://www.emailjs.com/
// ─────────────────────────────────────────────
const EMAILJS_SERVICE_ID  = 'service_9haq3bx';   // ← Your EmailJS Service ID
const EMAILJS_TEMPLATE_ID = 'template_517goyo';  // ← Your EmailJS Template ID
const EMAILJS_PUBLIC_KEY  = 'bot1bkKNnI_laiHtN'; // ← Your EmailJS Public Key
// ─────────────────────────────────────────────

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', mobile: '', subject: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Partial<typeof formData>>({});
  const [toast, setToast] = useState<{ show: boolean; type: 'success' | 'error'; message: string }>({
    show: false, type: 'success', message: ''
  });

  const contactInfo = [
    {
      label: 'Email',
      value: 'Shaikmohammedzunaid1@gmail.com',
      icon: <Mail className="text-blue-400" size={18} />,
      href: 'mailto:Shaikmohammedzunaid1@gmail.com'
    },
    {
      label: 'LinkedIn',
      value: 'linkedin.com/in/shaik-mohammed-zunaid',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-cyan-400">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
          <rect width="4" height="12" x="2" y="9"/>
          <circle cx="4" cy="4" r="2"/>
        </svg>
      ),
      href: 'https://linkedin.com'
    },
    {
      label: 'GitHub',
      value: 'github.com/shaik-mohammed-zunaid',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-slate-300">
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
          <path d="M9 18c-4.51 2-5-2-7-2"/>
        </svg>
      ),
      href: 'https://github.com'
    },
    {
      label: 'Location',
      value: 'India',
      icon: <MapPin className="text-emerald-400" size={18} />,
      href: '#'
    }
  ];

  const validate = () => {
    const errs: Partial<typeof formData> = {};
    if (!formData.name.trim()) errs.name = 'Name is required';
    if (!formData.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = 'Invalid email address';
    if (!formData.mobile.trim()) {
      errs.mobile = 'Mobile number is required';
    } else {
      const digitsOnly = formData.mobile.replace(/[^\d]/g, '');
      if (!/^[+\d][\d\s\-()]+$/.test(formData.mobile)) errs.mobile = 'Only numbers and + allowed';
      else if (digitsOnly.length < 10) errs.mobile = 'Minimum 10 digits required';
      else if (digitsOnly.length > 15) errs.mobile = 'Maximum 15 digits allowed';
    }
    if (!formData.message.trim()) errs.message = 'Message is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const showToast = useCallback((type: 'success' | 'error', message: string) => {
    setToast({ show: true, type, message });
    setTimeout(() => setToast(t => ({ ...t, show: false })), 4000);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          mobile: formData.mobile,
          subject: formData.subject || 'Portfolio Contact Form',
          message: formData.message,
          to_email: 'Shaikmohammedzunaid1@gmail.com',
        },
        EMAILJS_PUBLIC_KEY
      );
      setStatus('success');
      setFormData({ name: '', email: '', mobile: '', subject: '', message: '' });
      showToast('success', '✅ Message sent! I\'ll get back to you within 24 hours.');
      setTimeout(() => setStatus('idle'), 4000);
    } catch {
      setStatus('error');
      showToast('error', '❌ Failed to send. Please email me directly at Shaikmohammedzunaid1@gmail.com');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  const inputClass = (field: keyof typeof errors) =>
    `w-full px-4 py-3 rounded-xl bg-slate-900 border text-slate-200 text-sm focus:outline-none transition-colors placeholder-slate-600 ${
      errors[field]
        ? 'border-red-500/60 focus:border-red-400'
        : 'border-slate-800 focus:border-cyan-500/50'
    }`;

  return (
    <section id="contact" className="py-20 border-t border-slate-900 bg-slate-950 relative">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px]" />
      </div>

      {/* Success / Error Toast */}
      {toast.show && (
        <div
          className={`fixed top-6 right-6 z-[9999] flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl transition-all duration-300 ${
            toast.type === 'success'
              ? 'bg-emerald-900/90 border border-emerald-500/30 text-emerald-300'
              : 'bg-red-900/90 border border-red-500/30 text-red-300'
          }`}
          style={{ backdropFilter: 'blur(16px)' }}
        >
          {toast.type === 'success' ? <Check size={18} /> : <AlertCircle size={18} />}
          <span className="text-sm font-medium">{toast.message}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 md:px-12 z-10 relative">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-3">
            Contact
          </h2>
          <h3 className="font-display text-3xl font-bold text-slate-100 mb-4">
            Get In Touch
          </h3>
          <p className="text-slate-400 font-light text-sm sm:text-base">
            Feel free to reach out for career opportunities, freelance consulting, or collaboration projects.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-left">
          {/* Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            <h4 className="font-display text-xl font-bold text-slate-200">Contact Information</h4>
            <p className="text-slate-400 text-sm leading-relaxed font-light">
              I am open to full-time AI Developer and Automation Engineer roles. Feel free to connect directly via email or LinkedIn.
            </p>
            <div className="space-y-4">
              {contactInfo.map((info, i) => (
                <a
                  key={i}
                  href={info.href}
                  target={info.href.startsWith('http') ? '_blank' : undefined}
                  rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="glass-card p-4 rounded-2xl flex items-center gap-4 hover:border-slate-700/60 transition-all duration-200 block hover:-translate-y-0.5"
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center border border-slate-800 shrink-0">
                    {info.icon}
                  </div>
                  <div>
                    <h5 className="text-xs text-slate-500 font-semibold tracking-wider uppercase">{info.label}</h5>
                    <p className="text-xs sm:text-sm font-medium text-slate-200 hover:text-cyan-400 transition-colors break-all">
                      {info.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Contact Form with EmailJS */}
          <div className="lg:col-span-7">
            <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-800/80">
              <h4 className="font-display text-lg sm:text-xl font-bold text-slate-200 mb-2">Send a Message</h4>
              <p className="text-slate-500 text-xs mb-6">
                Powered by EmailJS — messages arrive directly in my Gmail inbox.
              </p>

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div className="flex flex-col space-y-1.5">
                    <label htmlFor="name" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text" id="name" name="name" required
                      value={formData.name} onChange={handleInputChange}
                      className={inputClass('name')} placeholder="Your Name"
                    />
                    {errors.name && <p className="text-[11px] text-red-400">{errors.name}</p>}
                  </div>

                  {/* Email */}
                  <div className="flex flex-col space-y-1.5">
                    <label htmlFor="email" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Email Address <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email" id="email" name="email" required
                      value={formData.email} onChange={handleInputChange}
                      className={inputClass('email')} placeholder="you@example.com"
                    />
                    {errors.email && <p className="text-[11px] text-red-400">{errors.email}</p>}
                  </div>
                </div>

                {/* Mobile Number */}
                <div className="flex flex-col space-y-1.5">
                  <label htmlFor="mobile" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Mobile Number <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                    <input
                      type="tel" id="mobile" name="mobile" required
                      value={formData.mobile} onChange={handleInputChange}
                      className={`w-full pl-9 pr-4 py-3 rounded-xl bg-slate-900 border text-slate-200 text-sm focus:outline-none transition-colors placeholder-slate-600 ${
                        errors.mobile
                          ? 'border-red-500/60 focus:border-red-400'
                          : 'border-slate-800 focus:border-cyan-500/50'
                      }`}
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  {errors.mobile && <p className="text-[11px] text-red-400">{errors.mobile}</p>}
                </div>

                {/* Subject */}
                <div className="flex flex-col space-y-1.5">
                  <label htmlFor="subject" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Subject
                  </label>
                  <input
                    type="text" id="subject" name="subject"
                    value={formData.subject} onChange={handleInputChange}
                    className={inputClass('subject')} placeholder="Project Inquiry / Job Opportunity"
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col space-y-1.5">
                  <label htmlFor="message" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Message <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="message" name="message" required rows={5}
                    value={formData.message} onChange={handleInputChange}
                    className={`${inputClass('message')} resize-none`}
                    placeholder="Write your message here..."
                  />
                  {errors.message && <p className="text-[11px] text-red-400">{errors.message}</p>}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === 'submitting' || status === 'success'}
                  className={`w-full py-3.5 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 ${
                    status === 'success'
                      ? 'bg-emerald-600 text-white'
                      : status === 'error'
                      ? 'bg-red-600 text-white'
                      : 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:shadow-[0_0_24px_rgba(59,130,246,0.4)] hover:-translate-y-0.5'
                  } disabled:opacity-70`}
                >
                  {status === 'submitting' ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : status === 'success' ? (
                    <><Check size={18} /><span>Message Sent!</span></>
                  ) : status === 'error' ? (
                    <><AlertCircle size={18} /><span>Failed — Try Again</span></>
                  ) : (
                    <><span>Send Message</span><Send size={16} /></>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
