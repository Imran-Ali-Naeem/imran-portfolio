import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Education() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set('.edu-timeline-content', { opacity: 1 });
      gsap.set('.edu-timeline-line', { scaleY: 1 });
      gsap.from('.edu-timeline-content', {
        x: -50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true },
      });
      gsap.from('.edu-timeline-line', {
        scaleY: 0,
        transformOrigin: 'top',
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="education" ref={sectionRef} className="py-32 px-8 lg:px-16 bg-[#030303]">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">

        {/* Left: label + heading */}
        <div className="lg:col-span-4">
          <div className="font-mono text-[var(--accent-cool)] text-sm tracking-widest uppercase mb-4 flex items-center gap-4">
            <span className="w-12 h-px bg-[var(--accent-cool)] opacity-50" />
            Academic
          </div>
          <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-bold text-[var(--text-primary)]">
            Education
          </h2>
        </div>

        {/* Right: timeline */}
        <div className="lg:col-span-8 relative">
          {/* Vertical line */}
          <div className="edu-timeline-line absolute left-0 top-2 bottom-0 w-[2px] bg-gradient-to-b from-[var(--accent-cool)] via-[var(--accent-warm)] to-transparent opacity-30" />

          <div className="edu-timeline-content relative pl-12">
            {/* Dot */}
            <div className="absolute left-[-5px] top-3 w-3 h-3 bg-[#030303] border-2 border-[var(--accent-cool)] rounded-full border-glow-cool" />

            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-4 gap-2">
              <h3 className="font-display text-3xl font-bold text-[var(--text-primary)]">
                BSc Computer Science
              </h3>
              <span className="font-mono text-sm text-[var(--text-secondary)] tracking-widest uppercase">
                Aug 2022 — Jun 2026
              </span>
            </div>

            <p className="font-mono text-[var(--accent-cool)] tracking-widest uppercase mb-8">
              FAST NUCES CFD Campus, Pakistan
            </p>

            <ul className="space-y-6">
              <li className="flex items-start gap-4 text-[var(--text-secondary)] leading-relaxed">
                <span className="text-[var(--accent-cool)] font-mono mt-1 opacity-70">{'>'}</span>
                Relevant Courses: Deep Learning, Natural Language Processing, Generative AI, Web Programming, Information Security, Software Engineering
              </li>
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
}
