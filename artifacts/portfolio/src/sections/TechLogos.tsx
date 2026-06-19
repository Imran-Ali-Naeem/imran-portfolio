import { useEffect, useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TechIconsList: Record<string, () => ReactNode> = {
  PyTorch: () => <svg viewBox="0 0 32 32" className="w-10 h-10" fill="currentColor"><path d="M16 2C8.27 2 2 8.27 2 16s6.27 14 14 14 14-6.27 14-14S23.73 2 16 2zm0 24c-5.51 0-10-4.49-10-10S10.49 6 16 6s10 4.49 10 10-4.49 10-10 10z"/><circle cx="23" cy="9" r="2.5"/></svg>,
  Python: () => <svg viewBox="0 0 32 32" className="w-10 h-10" fill="currentColor"><path d="M15.885 2.1c-7.1 0-6.651 3.07-6.651 3.07l.008 3.181h6.754v.956H6.576S2 8.58 2 15.832c0 7.252 4.02 6.992 4.02 6.992h2.406v-3.36s-.13-4.02 3.96-4.02h6.814s3.83.06 3.83-3.7V5.83S28.686 2.1 15.885 2.1zm-3.69 2.18a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5z"/><path d="M16.115 29.9c7.1 0 6.651-3.07 6.651-3.07l-.008-3.181h-6.754v-.956h9.42S30 23.42 30 16.168c0-7.252-4.02-6.992-4.02-6.992h-2.406v3.36s.13 4.02-3.96 4.02h-6.814s-3.83-.06-3.83 3.7v6.214S3.314 29.9 16.115 29.9zm3.69-2.18a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5z"/></svg>,
  Docker: () => <svg viewBox="0 0 32 32" className="w-10 h-10" fill="currentColor"><path d="M30.679 13.367c-.445-.289-3.08-1.91-6.123-1.204-.517-2.34-1.834-4.262-3.876-5.748l-.774-.517-.517.774c-.658.982-1.148 2.074-1.404 3.222-.258 1.061-.2 2.073.116 2.963C13.84 12.647 7.26 10.14 3.133 4.16l-.86-1.318-1.146.86C.487 4.675-.24 6.425.044 8.118c.658 3.938 3.508 7.476 7.188 9.453.803.432 1.72.718 2.693.889l-.06.116c-.288 1.318.115 2.75 1.09 3.796.975 1.033 2.35 1.49 3.738 1.318 1.777-.2 3.74-.746 5.517-2.004 1.548-1.09 2.808-2.637 3.68-4.527h.058c1.835 0 4.27-.517 5.69-2.35.345-.46.633-.977.833-1.547l.287-.862-.747-.517z"/></svg>,
  Git: () => <svg viewBox="0 0 32 32" className="w-10 h-10" fill="currentColor"><path d="M31.4 14.545L17.455.6c-.8-.8-2.1-.8-2.9 0l-2.9 2.9 3.7 3.7c.8-.3 1.8-.1 2.5.6.7.7.9 1.6.6 2.5l3.6 3.6c.8-.3 1.8-.1 2.5.6.7.7.9 1.7.5 2.6.9.4 2 .2 2.7-.5.7-.7.9-1.8.5-2.7.9-.4 2-.2 2.7.5.7.7.9 1.7.5 2.6.9-.4 2-.2 2.7.5.8.8.8 2 0 2.8l-9.5 9.5c-.8.8-2.1.8-2.9 0l-7.2-7.2-5.8 5.8c-.8.8-.8 2.1 0 2.9l14 14c.8.8 2.1.8 2.9 0l14-14c.8-.8.8-2.1 0-2.9L31.4 14.545z"/></svg>,
  FastAPI: () => <svg viewBox="0 0 32 32" className="w-10 h-10" fill="currentColor"><path d="M24 2H8C4.69 2 2 4.69 2 8v16c0 3.31 2.69 6 6 6h16c3.31 0 6-2.69 6-6V8c0-3.31-2.69-6-6-6z" opacity="0.8"/><text x="16" y="21" textAnchor="middle" fill="currentColor" fontSize="14" fontWeight="bold" fontFamily="monospace">F</text></svg>,
  MongoDB: () => <svg viewBox="0 0 32 32" className="w-10 h-10" fill="currentColor"><path d="M16.62 30l-.75-.42c-.28-.66-.54-1.34-.78-2.03-2.02-5.83-3.02-11.05-2.97-15.54.05-5.5 1.42-8.62 2.3-9.9.24-.37.5-.72.78-1.05l.36-.4.05 26.34h.01z"/><path d="M16.61 30l.75-.42c.28-.66.54-1.34.78-2.03 2.02-5.83 3.02-11.05 2.97-15.54-.05-5.5-1.42-8.62-2.3-9.9-.24-.37-.5-.72-.78-1.05l-.36-.4v26.34z" opacity="0.6"/></svg>,
  LangChain: () => <svg viewBox="0 0 32 32" className="w-10 h-10" fill="currentColor"><rect x="3" y="14" width="26" height="4" rx="2"/><rect x="6" y="8" width="20" height="4" rx="2" opacity="0.6"/><rect x="6" y="20" width="20" height="4" rx="2" opacity="0.6"/><circle cx="26" cy="16" r="3"/></svg>,
  React: () => <svg viewBox="0 0 32 32" className="w-10 h-10" stroke="currentColor" fill="none"><circle cx="16" cy="16" r="2.5" fill="currentColor"/><ellipse cx="16" cy="16" rx="10" ry="4" strokeWidth="1.2" transform="rotate(0 16 16)"/><ellipse cx="16" cy="16" rx="10" ry="4" strokeWidth="1.2" transform="rotate(60 16 16)"/><ellipse cx="16" cy="16" rx="10" ry="4" strokeWidth="1.2" transform="rotate(120 16 16)"/></svg>,
  HuggingFace: () => <svg viewBox="0 0 32 32" className="w-10 h-10" fill="currentColor"><circle cx="10" cy="14" r="3"/><circle cx="22" cy="14" r="3"/><ellipse cx="16" cy="20" rx="8" ry="6" opacity="0.8"/><circle cx="12" cy="19" r="1.5" fill="#050505"/><circle cx="20" cy="19" r="1.5" fill="#050505"/><ellipse cx="16" cy="22" rx="2" ry="1.5" fill="#050505"/></svg>,
  GitHub: () => <svg viewBox="0 0 32 32" className="w-10 h-10" fill="currentColor"><path d="M16 2C8.27 2 2 8.27 2 16c0 5.52 3.58 10.33 8.55 12.02.62.12.85-.27.85-.6v-2.14c-3.48.76-4.22-1.68-4.22-1.68-.57-1.45-1.39-1.84-1.39-1.84-1.14-.78.09-.76.09-.76 1.26.09 1.92 1.29 1.92 1.29 1.12 1.92 2.94 1.37 3.66 1.04.11-.81.44-1.37.8-1.68-2.78-.32-5.7-1.39-5.7-6.19 0-1.37.49-2.49 1.29-3.36-.13-.32-.56-1.61.12-3.35 0 0 1.05-.34 3.44 1.28a12.01 12.01 0 016.26 0c2.39-1.62 3.44-1.28 3.44-1.28.68 1.74.25 3.03.12 3.35.8.87 1.29 1.99 1.29 3.36 0 4.81-2.92 5.87-5.71 6.18.45.39.85 1.15.85 2.32v3.44c0 .33.22.72.85.6C26.42 26.33 30 21.52 30 16c0-7.73-6.27-14-14-14z"/></svg>,
};

export default function TechLogos() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const ctx = gsap.context(() => {
      const items = containerRef.current!.querySelectorAll('.tech-item');
      
      gsap.fromTo(items,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.05,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            once: true,
          }
        }
      );
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  const logos = [
    'PyTorch', 'Python', 'Docker', 'Git', 'FastAPI',
    'MongoDB', 'LangChain', 'React', 'HuggingFace', 'GitHub'
  ];

  return (
    <section className="py-24 px-8 lg:px-16 bg-[#050505] border-t border-[var(--border-subtle)] overflow-hidden">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-20 text-center flex flex-col items-center">
          <div className="font-mono text-[var(--accent-warm)] text-sm tracking-widest uppercase mb-4 flex items-center gap-4">
            <span className="w-12 h-px bg-[var(--accent-warm)] opacity-50" />
            System Stack
            <span className="w-12 h-px bg-[var(--accent-warm)] opacity-50" />
          </div>
          <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-bold text-[var(--text-primary)]">
            Technologies
          </h2>
        </div>
        
        <div ref={containerRef} className="flex flex-wrap justify-center items-center gap-12 lg:gap-20">
          {logos.map(name => {
            const Icon = TechIconsList[name];
            return (
              <div key={name} className="tech-item flex flex-col items-center gap-4 text-[var(--text-secondary)] hover:text-[var(--accent-warm)] transition-colors duration-300">
                {Icon ? <Icon /> : <span className="font-display font-bold text-2xl">{name}</span>}
                <span className="font-mono text-[10px] uppercase tracking-wider">{name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
