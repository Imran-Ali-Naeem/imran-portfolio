import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set('.timeline-content', { opacity: 1 });
      gsap.set('.timeline-line', { scaleY: 1 });
      gsap.from('.timeline-content', {
        x: -50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          once: true,
        }
      });

      gsap.from('.timeline-line', {
        scaleY: 0,
        transformOrigin: 'top',
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          once: true,
        }
      });
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="py-32 px-8 lg:px-16 bg-[#050505]">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        <div className="lg:col-span-4">
          <div className="font-mono text-[var(--accent-warm)] text-sm tracking-widest uppercase mb-4 flex items-center gap-4">
            <span className="w-12 h-px bg-[var(--accent-warm)] opacity-50" />
            Background
          </div>
          <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-bold text-[var(--text-primary)]">
            Experience
          </h2>
        </div>

        <div className="lg:col-span-8 relative">
          {/* Vertical Line */}
          <div className="timeline-line absolute left-0 top-2 bottom-0 w-[2px] bg-gradient-to-b from-[var(--accent-warm)] via-[var(--accent-cool)] to-transparent opacity-30" />

          <div className="timeline-content relative pl-12">
            <div className="absolute left-[-5px] top-3 w-3 h-3 bg-[#050505] border-2 border-[var(--accent-warm)] rounded-full border-glow-warm" />

            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-4 gap-2">
              <h3 className="font-display text-3xl font-bold text-[var(--text-primary)]">Data Analyst Intern</h3>
              <span className="font-mono text-sm text-[var(--text-secondary)] tracking-widest uppercase">Jun 2025 — Aug 2025</span>
            </div>

            <p className="font-mono text-[var(--accent-warm)] tracking-widest uppercase mb-8">Brickclay</p>

            <ul className="space-y-6">
              {[
                'Built an end-to-end ETL pipeline to ingest and transform structured data into SQL Server for downstream analytics.',
                'Architected a star-schema dimensional model (fact and dimension tables) for the Rental Open Dataset, reducing query complexity and improving reporting performance.',
                'Built interactive Power BI dashboards with KPIs and drill-down analysis, enabling data-driven business decisions across departments.'
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4 text-[var(--text-secondary)] leading-relaxed">
                  <span className="text-[var(--accent-warm)] font-mono mt-1 opacity-70">{'>'}</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        
      </div>
    </section>
  );
}
