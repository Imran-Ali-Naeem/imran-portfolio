import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Github, Linkedin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.contact-item', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        }
      });
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="relative py-32 px-8 lg:px-16 bg-[#050505] overflow-hidden">
      {/* Abstract Grid Background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]" 
           style={{ backgroundImage: 'linear-gradient(var(--text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--text-primary) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
      
      <div className="relative z-10 max-w-[800px] mx-auto text-center">
        <div className="contact-item font-mono text-[var(--accent-cool)] text-sm tracking-widest uppercase mb-8 flex items-center justify-center gap-4">
          <span className="w-12 h-px bg-[var(--accent-cool)] opacity-50" />
          Initialize Connection
          <span className="w-12 h-px bg-[var(--accent-cool)] opacity-50" />
        </div>

        <h2 className="contact-item font-display text-[clamp(3rem,6vw,5rem)] font-bold text-[var(--text-primary)] leading-none mb-12">
          Let's build something <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-warm)] to-[var(--accent-cool)]">intelligent.</span>
        </h2>

        <div className="contact-item mb-16">
          <a
            href="mailto:imranalinaeem3397@gmail.com"
            className="inline-flex items-center gap-4 px-10 py-5 bg-[#0a0a0c] border border-[var(--border-subtle)] text-[var(--text-primary)] font-display font-bold text-lg hover:border-[var(--accent-warm)] hover:text-[var(--accent-warm)] transition-all duration-300 rounded-sm group relative overflow-hidden"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-[rgba(229,169,61,0.1)] to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
            <Mail size={20} />
            <span className="relative z-10">imranalinaeem3397@gmail.com</span>
          </a>
        </div>

        <div className="contact-item flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 font-mono text-sm text-[var(--text-secondary)] tracking-widest uppercase">
          <div className="flex items-center gap-3">
            <Phone size={16} className="text-[var(--accent-cool)]" />
            +92 3078546373
          </div>
          <div className="flex items-center gap-3">
            <MapPin size={16} className="text-[var(--accent-cool)]" />
            Faisalabad, Pakistan
          </div>
        </div>

        <div className="contact-item mt-12 flex items-center justify-center gap-6">
          <a href="https://github.com/Imran-Ali-Naeem" target="_blank" rel="noopener noreferrer" className="p-4 bg-[#0a0a0c] border border-[var(--border-subtle)] rounded-sm text-[var(--text-secondary)] hover:text-[var(--accent-cool)] hover:border-[var(--accent-cool)] transition-all duration-300">
            <Github size={24} />
          </a>
          <a href="https://linkedin.com/in/imran-ali-naeem" target="_blank" rel="noopener noreferrer" className="p-4 bg-[#0a0a0c] border border-[var(--border-subtle)] rounded-sm text-[var(--text-secondary)] hover:text-[var(--accent-warm)] hover:border-[var(--accent-warm)] transition-all duration-300">
            <Linkedin size={24} />
          </a>
        </div>

        <div className="contact-item mt-32 pt-8 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-[var(--text-secondary)] opacity-50 uppercase tracking-widest">
          <span>&copy; 2026 Imran Ali.</span>
          <span>System Status: Online</span>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
}
