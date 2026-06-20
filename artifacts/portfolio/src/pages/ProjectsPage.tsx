import { useState, useEffect, useRef } from 'react';
import { Link } from 'wouter';
import { ArrowLeft, ArrowUpRight, Github, ExternalLink } from 'lucide-react';
import gsap from 'gsap';
import { projects, ALL_CATEGORIES } from '../data/projects';

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState('All');
  const pageRef = useRef<HTMLDivElement>(null);

  const filteredProjects = activeTab === 'All'
    ? projects
    : projects.filter(p => p.categories.includes(activeTab));

  // Sort so featured show first
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return a.id - b.id;
  });

  useEffect(() => {
    if (!pageRef.current) return;
    const ctx = gsap.context(() => {
      // Set initial state for all cards to avoid flash
      gsap.set('.project-page-card', { opacity: 0, y: 40 });
      gsap.to('.project-page-card', {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
      });
    }, pageRef);
    return () => ctx.revert();
  }, [activeTab]);

  return (
    <div ref={pageRef} className="min-h-screen bg-[#030303] pt-32 pb-24 px-8 lg:px-16">
      <div className="max-w-[1200px] mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-sm text-[var(--text-secondary)] hover:text-[var(--accent-warm)] transition-colors mb-16"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>
        <div className="mb-20">
          <h1 className="font-display text-[clamp(3rem,6vw,5rem)] font-bold text-[var(--text-primary)] mb-6">
            All Projects
          </h1>
          <p className="text-[var(--text-secondary)] text-xl max-w-2xl leading-relaxed">
            Explore my work across AI, deep learning, and systems engineering
          </p>
        </div>

        <div className="flex flex-wrap gap-3 mb-16">
          {ALL_CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`font-mono text-xs uppercase tracking-widest px-6 py-3 border transition-all duration-300 ${activeTab === category
                ? 'border-[var(--accent-warm)] bg-[var(--accent-warm)]/10 text-[var(--accent-warm)]'
                : 'border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--text-secondary)]'
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sortedProjects.map((project) => (
            <div
              key={project.id}
              className={`project-page-card group flex flex-col bg-[#0a0a0c] border border-[var(--border-subtle)] hover:border-[var(--accent-warm)] transition-colors duration-500 overflow-hidden`}
            >
              {/* Project image banner */}
              <div className="relative h-44 overflow-hidden bg-[#050508]">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c10] to-transparent" />
                <div
                  className="absolute bottom-0 left-0 right-0 h-1 opacity-60"
                  style={{ background: project.accent === 'warm' ? 'var(--accent-warm)' : 'var(--accent-cool)' }}
                />
              </div>
              <div className="flex flex-col flex-grow p-8">
                <div className="flex justify-between items-start mb-6">
                <div className={`font-mono text-[10px] uppercase tracking-widest px-3 py-1 bg-[#050505] border border-[var(--border-subtle)] ${project.accent === 'warm' ? 'text-[var(--accent-warm)]' : 'text-[var(--accent-cool)]'}`}>
                  {project.categories[0]}
                </div>
                {project.featured && (
                  <div className="w-2 h-2 rounded-full bg-[var(--accent-warm)] animate-pulse" />
                )}
              </div>

              <h3 className="font-display text-2xl font-bold text-[var(--text-primary)] mb-4 group-hover:text-[var(--accent-warm)] transition-colors">
                {project.title}
              </h3>

              <p className="text-[var(--text-secondary)] leading-relaxed mb-8 flex-grow">
                {project.longDescription}
              </p>

              <div className="space-y-8">
                {project.metrics && project.metrics.length > 0 && (
                  <div className="flex flex-wrap gap-6 pt-6 border-t border-[var(--border-subtle)]">
                    {project.metrics.map((metric, i) => (
                      <div key={i} className="flex flex-col">
                        <span className={`font-display text-xl font-bold ${project.accent === 'warm' ? 'text-[var(--accent-warm)] text-glow-warm' : 'text-[var(--accent-cool)] text-glow-cool'}`}>
                          {metric.value}
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-secondary)]">
                          {metric.label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex flex-wrap gap-2 pt-6 border-t border-[var(--border-subtle)]">
                  {project.tags.map(tag => (
                    <span key={tag} className="font-mono text-[10px] text-[var(--text-secondary)] bg-[#111] px-2 py-1">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4 pt-6">
                  {project.githubUrl && project.githubUrl !== '#' && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--text-primary)] hover:text-[var(--accent-warm)] transition-colors"
                    >
                      <Github size={14} /> Code
                    </a>
                  )}
                  {project.demoUrl && project.demoUrl !== '#' && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--text-primary)] hover:text-[var(--accent-warm)] transition-colors"
                    >
                      <ExternalLink size={14} /> Demo
                    </a>
                  )}
                </div>
              </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}