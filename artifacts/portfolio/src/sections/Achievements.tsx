import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Code2, Rocket, BookOpen } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const achievements = [
  { icon: Code2, value: '100+', label: 'DSA Problems', desc: 'Solved on LeetCode focusing on optimization.', source: 'LeetCode' },
  { icon: Rocket, value: '10+', label: 'AI Deployments', desc: '10+ end-to-end AI project demos on Hugging Face Spaces', source: 'Hugging Face' },
  { icon: BookOpen, value: 'Cert', label: 'Docker Basics', desc: 'Containerization and orchestration fundamentals.', source: 'DataCamp' },
  { icon: Award, value: 'Cert', label: 'Git Bootcamp', desc: 'Advanced version control workflows.', source: 'Udemy' },
];

export default function Achievements() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.ach-card', {
        scale: 0.9,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'back.out(1.5)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        }
      });
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section id="achievements" ref={sectionRef} className="py-32 px-8 lg:px-16 bg-[#030303] border-t border-[var(--border-subtle)]">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-20">
          <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-bold text-[var(--text-primary)] mb-6">
            Metrics & Credentials
          </h2>
          <p className="font-mono text-sm text-[var(--text-secondary)] tracking-widest uppercase">
            Quantifiable output and continuous learning
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="ach-card p-8 bg-[#0a0a0c] border border-[var(--border-subtle)] flex flex-col items-center text-center group hover:border-[var(--accent-warm)] transition-colors duration-300">
                <div className="w-12 h-12 rounded-full bg-[#050505] flex items-center justify-center border border-[var(--border-subtle)] mb-6 group-hover:border-[var(--accent-warm)] transition-colors">
                  <Icon size={20} className="text-[var(--text-secondary)] group-hover:text-[var(--accent-warm)] transition-colors" />
                </div>
                
                <div className="font-display text-4xl font-bold text-[var(--text-primary)] mb-2 group-hover:text-glow-warm transition-all duration-300">
                  {item.value}
                </div>
                
                <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--accent-warm)] mb-4">
                  {item.label}
                </div>
                
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4 flex-grow">
                  {item.desc}
                </p>
                
                <div className="text-[10px] font-mono text-[var(--text-secondary)] opacity-50 uppercase tracking-widest">
                  via {item.source}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
