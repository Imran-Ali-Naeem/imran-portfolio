import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Cpu, Database, Wrench, Layers } from 'lucide-react';
import {
  SiPytorch, SiHuggingface, SiLangchain, SiGooglegemini, SiScikitlearn,
  SiPython, SiCplusplus, SiMongodb, SiNumpy,
  SiDocker, SiFastapi, SiGit, SiGithub, SiSelenium, SiPytest,
} from 'react-icons/si';
import type { IconType } from 'react-icons';

gsap.registerPlugin(ScrollTrigger);

/* ── Brand color map ───────────────────────────────────────────────── */
const TECH_META: Record<string, { color: string; Icon?: IconType }> = {
  'PyTorch':       { color: '#EE4C2C', Icon: SiPytorch },
  'HuggingFace':   { color: '#FFD21E', Icon: SiHuggingface },
  'Fine-tuning':   { color: '#F59E0B' },
  'RAG':           { color: '#3DDDD5' },
  'LangChain':     { color: '#1BCB87', Icon: SiLangchain },
  'LLMs':          { color: '#8B5CF6' },
  'Qwen2-VL':      { color: '#1677FF' },
  'Gemini':        { color: '#8E75B2', Icon: SiGooglegemini },
  'Scikit-learn':  { color: '#F7931E', Icon: SiScikitlearn },
  'Vector DB':     { color: '#7C3AED' },
  'Vision Models': { color: '#6366F1' },
  'Python':        { color: '#3776AB', Icon: SiPython },
  'C++':           { color: '#00599C', Icon: SiCplusplus },
  'NumPy':         { color: '#4DABCF', Icon: SiNumpy },
  'Oracle SQL':    { color: '#F80000' },
  'MS SQL Server': { color: '#CC2927' },
  'MongoDB':       { color: '#47A248', Icon: SiMongodb },
  'Docker':        { color: '#2496ED', Icon: SiDocker },
  'FastAPI':       { color: '#009688', Icon: SiFastapi },
  'Git':           { color: '#F05032', Icon: SiGit },
  'GitHub':        { color: '#e0e0e0', Icon: SiGithub },
  'Playwright':    { color: '#2EAD33' },
  'Selenium':      { color: '#43B02A', Icon: SiSelenium },
  'pytest':        { color: '#0A9EDC', Icon: SiPytest },
  'CI/CD':         { color: '#21759B' },
  'RESTful APIs':  { color: '#3DDDD5' },
  'ETL Pipelines': { color: '#9CA3AF' },
  'Dimensional Modeling': { color: '#9CA3AF' },
  'Star Schema':   { color: '#9CA3AF' },
  'Power BI':      { color: '#F2C811' },
  'Test Automation':{ color: '#43B02A' },
};

function TechPill({ tag }: { tag: string }) {
  const meta = TECH_META[tag] ?? { color: '#6B7280' };
  const { color, Icon } = meta;
  return (
    <span
      className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest px-2.5 py-1.5 rounded-sm border transition-all duration-200 hover:scale-105 cursor-default"
      style={{
        background: `${color}10`,
        borderColor: `${color}30`,
        color: color,
      }}
    >
      {Icon && <Icon size={11} style={{ color, flexShrink: 0 }} />}
      {tag}
    </span>
  );
}

/* ── Expertise cards data ──────────────────────────────────────────── */
const expertiseData = [
  {
    icon: Cpu,
    accentColor: '#3DDDD5',
    category: 'Core Competency',
    title: 'AI & Deep Learning',
    desc: 'Designing and fine-tuning neural architectures. Implementing RAG pipelines and deploying vision-language models for complex reasoning tasks.',
    tags: ['PyTorch', 'HuggingFace', 'Fine-tuning', 'RAG', 'LangChain', 'LLMs', 'Qwen2-VL', 'Gemini', 'Vision Models'],
  },
  {
    icon: Database,
    accentColor: '#F59E0B',
    category: 'Foundation',
    title: 'Languages & Databases',
    desc: 'Robust foundational languages and scalable data storage systems optimized for high-throughput AI applications.',
    tags: ['Python', 'C++', 'NumPy', 'MongoDB', 'Oracle SQL', 'MS SQL Server'],
  },
  {
    icon: Wrench,
    accentColor: '#3DDDD5',
    category: 'Infrastructure',
    title: 'Tools & Frameworks',
    desc: 'Building automated testing frameworks, RESTful APIs, and CI/CD pipelines to ensure reliability and scalability.',
    tags: ['Docker', 'FastAPI', 'Git', 'GitHub', 'Playwright', 'Selenium', 'pytest', 'CI/CD', 'RESTful APIs'],
  },
  {
    icon: Layers,
    accentColor: '#F59E0B',
    category: 'Domain',
    title: 'Specializations',
    desc: 'End-to-end data engineering and reporting. From raw ETL pipelines to dimensional modeling and interactive dashboards.',
    tags: ['ETL Pipelines', 'Dimensional Modeling', 'Star Schema', 'Power BI', 'Test Automation', 'Scikit-learn'],
  },
];

/* ── Component ─────────────────────────────────────────────────────── */
export default function Expertise() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from('.expertise-card', {
        y: 50, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="expertise" ref={sectionRef} className="py-32 px-8 lg:px-16 bg-[#030303]">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-20">
          <div className="font-mono text-[var(--accent-cool)] text-sm tracking-widest uppercase mb-4 flex items-center gap-4">
            <span className="w-12 h-px bg-[var(--accent-cool)] opacity-50" />
            Capabilities
          </div>
          <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-bold text-[var(--text-primary)]">
            Technical Domain
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {expertiseData.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="expertise-card group relative p-8 bg-[#07070a] border border-[var(--border-subtle)] rounded-sm overflow-hidden transition-all duration-500 hover:-translate-y-0.5"
                style={{} as React.CSSProperties}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = item.accentColor + '40';
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 40px ${item.accentColor}0f`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = '';
                  (e.currentTarget as HTMLElement).style.boxShadow = '';
                }}
              >
                {/* Gradient corner glow */}
                <div
                  className="absolute -top-12 -right-12 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{ background: item.accentColor }}
                />

                {/* Dot-grid texture */}
                <div
                  className="absolute inset-0 opacity-[0.025] pointer-events-none"
                  style={{
                    backgroundImage: `radial-gradient(circle, ${item.accentColor} 1px, transparent 1px)`,
                    backgroundSize: '20px 20px',
                  }}
                />

                <div className="relative z-10">
                  {/* Header row */}
                  <div className="flex items-start justify-between mb-6">
                    <div
                      className="p-2.5 rounded-sm border transition-colors duration-300"
                      style={{
                        background: `${item.accentColor}12`,
                        borderColor: `${item.accentColor}25`,
                      }}
                    >
                      <Icon
                        size={22}
                        style={{ color: item.accentColor }}
                      />
                    </div>
                    <span className="font-mono text-[9px] uppercase tracking-widest text-[var(--text-secondary)] opacity-50 mt-1">
                      0{index + 1} / {item.category}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-bold mb-3 text-[var(--text-primary)]">
                    {item.title}
                  </h3>
                  <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-6" style={{ minHeight: '4rem' }}>
                    {item.desc}
                  </p>

                  {/* Tech pills with brand colors */}
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map(tag => (
                      <TechPill key={tag} tag={tag} />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
