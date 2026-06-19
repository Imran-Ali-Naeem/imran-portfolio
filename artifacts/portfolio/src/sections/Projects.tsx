import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'wouter';
import { projects } from '../data/projects';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const featuredProjects = projects.filter(p => p.featured).slice(0, 3);

  useEffect(() => {
    if (!sectionRef.current) return;
    
    const ctx = gsap.context(() => {
      gsap.from('.project-item', {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="work" ref={sectionRef} className="py-32 px-8 lg:px-16 bg-[#030303]">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-20">
          <div className="font-mono text-[var(--accent-cool)] text-sm tracking-widest uppercase mb-4 flex items-center gap-4">
            <span className="w-12 h-px bg-[var(--accent-cool)] opacity-50" />
            Selected Work
          </div>
          <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-bold text-[var(--text-primary)]">
            Systems & Models
          </h2>
        </div>

        <div className="space-y-16">
          {featuredProjects.map((project, index) => (
            <div key={project.id} className="project-item group relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-t border-[var(--border-subtle)] pt-12">
              <div className="lg:col-span-1">
                <span className="font-mono text-xl text-[var(--text-secondary)] font-light">0{index + 1}</span>
              </div>
              
              <div className="lg:col-span-5">
                <h3 className="font-display text-2xl lg:text-3xl font-bold mb-4 group-hover:text-[var(--accent-warm)] transition-colors">
                  {project.title}
                </h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map(tag => (
                    <span key={tag} className="font-mono text-[10px] uppercase tracking-wider px-3 py-1 bg-[#0a0a0a] border border-[var(--border-subtle)] text-[var(--text-secondary)] rounded-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-6 flex flex-col items-start lg:items-end lg:text-right">
                <p className="text-[var(--text-secondary)] leading-relaxed mb-8 max-w-[500px]">
                  {project.description}
                </p>
                
                {project.metrics && project.metrics.length > 0 && (
                  <div className="flex flex-wrap gap-6 mb-8 lg:justify-end">
                    {project.metrics.map((metric, i) => (
                      <div key={i} className="flex flex-col items-start lg:items-end">
                        <span className={`font-display text-3xl font-bold ${project.accent === 'warm' ? 'text-[var(--accent-warm)] text-glow-warm' : 'text-[var(--accent-cool)] text-glow-cool'}`}>
                          {metric.value}
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-secondary)]">{metric.label}</span>
                      </div>
                    ))}
                  </div>
                )}

                <a
                  href={project.demoUrl && project.demoUrl !== '#' ? project.demoUrl : project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-sm uppercase tracking-widest text-[var(--text-primary)] hover:text-[var(--accent-warm)] transition-colors border-b border-transparent hover:border-[var(--accent-warm)] pb-1"
                >
                  {project.demoUrl && project.demoUrl !== '#' ? 'View Demo' : 'View on GitHub'}
                  <ArrowUpRight size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-24 flex justify-center project-item">
          <Link 
            href="/projects" 
            className="group inline-flex items-center gap-3 px-8 py-4 border border-[var(--border-subtle)] text-[var(--text-primary)] font-display font-semibold tracking-wide hover:border-[var(--accent-warm)] hover:text-[var(--accent-warm)] transition-colors rounded-sm bg-[#050505]/50 backdrop-blur-sm"
          >
            <span>View All Projects</span>
            <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
