import { useEffect, useRef, type ReactElement } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  SiPytorch, SiHuggingface, SiLangchain, SiGooglegemini,
  SiPython, SiCplusplus, SiMongodb,
  SiDocker, SiFastapi, SiGit, SiGithub, SiSelenium, SiPytest,
  SiNumpy, SiScikitlearn,
} from 'react-icons/si';
import type { IconType } from 'react-icons';

gsap.registerPlugin(ScrollTrigger);

/* ── Custom SVGs for icons not in Simple Icons ─────────────────────── */
function PlaywrightIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="#2EAD33" opacity="0.15"/>
      <path d="M9.5 7l7 5-7 5V7z" fill="#2EAD33"/>
    </svg>
  );
}
function OracleIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M8 7h8a5 5 0 010 10H8A5 5 0 018 7z" stroke="#F80000" strokeWidth="1.8" fill="none"/>
      <circle cx="8" cy="12" r="3" fill="#F80000" opacity="0.3"/>
      <circle cx="16" cy="12" r="3" fill="#F80000" opacity="0.3"/>
    </svg>
  );
}
function MssqlIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <ellipse cx="12" cy="7" rx="8" ry="3" fill="#CC2927" opacity="0.9"/>
      <path d="M4 7v4c0 1.66 3.58 3 8 3s8-1.34 8-3V7" fill="#CC2927" opacity="0.6"/>
      <path d="M4 11v4c0 1.66 3.58 3 8 3s8-1.34 8-3v-4" fill="#CC2927" opacity="0.35"/>
    </svg>
  );
}
function RagIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="2" y="3" width="6" height="6" rx="1.5" fill="#3DDDD5" opacity="0.8"/>
      <rect x="9" y="3" width="6" height="6" rx="1.5" fill="#3DDDD5" opacity="0.5"/>
      <rect x="16" y="3" width="6" height="6" rx="1.5" fill="#3DDDD5" opacity="0.3"/>
      <path d="M5 9v3M12 9v3M19 9v3" stroke="#3DDDD5" strokeWidth="1.5"/>
      <rect x="5.5" y="12" width="13" height="5" rx="1.5" fill="#3DDDD5" opacity="0.6"/>
      <circle cx="9" cy="14.5" r="1" fill="#050505"/>
      <circle cx="12" cy="14.5" r="1" fill="#050505"/>
      <circle cx="15" cy="14.5" r="1" fill="#050505"/>
    </svg>
  );
}
function VectorDbIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 3L3 7.5l9 4.5 9-4.5L12 3z" fill="#8B5CF6" opacity="0.9"/>
      <path d="M3 7.5v5L12 17l9-4.5v-5" fill="#8B5CF6" opacity="0.5"/>
      <path d="M3 12.5v5L12 22l9-4.5v-5" fill="#8B5CF6" opacity="0.25"/>
    </svg>
  );
}

/* ── Tech stack definition ─────────────────────────────────────────── */
type TechItem = {
  name: string;
  color: string;
  Icon?: IconType;
  Custom?: (props: { size: number }) => ReactElement;
};

type Category = {
  label: string;
  items: TechItem[];
};

const STACK: Category[] = [
  {
    label: 'AI / ML Engine',
    items: [
      { name: 'PyTorch',      color: '#EE4C2C', Icon: SiPytorch },
      { name: 'HuggingFace',  color: '#FFD21E', Icon: SiHuggingface },
      { name: 'LangChain',    color: '#1BCB87', Icon: SiLangchain },
      { name: 'Gemini API',   color: '#8E75B2', Icon: SiGooglegemini },
      { name: 'Scikit-learn', color: '#F7931E', Icon: SiScikitlearn },
      { name: 'RAG Pipeline', color: '#3DDDD5', Custom: (p) => <RagIcon size={p.size} /> },
      { name: 'Vector DB',    color: '#8B5CF6', Custom: (p) => <VectorDbIcon size={p.size} /> },
    ],
  },
  {
    label: 'Languages & Data',
    items: [
      { name: 'Python',     color: '#3776AB', Icon: SiPython },
      { name: 'C++',        color: '#00599C', Icon: SiCplusplus },
      { name: 'NumPy',      color: '#4DABCF', Icon: SiNumpy },
      { name: 'MongoDB',    color: '#47A248', Icon: SiMongodb },
      { name: 'Oracle SQL', color: '#F80000', Custom: (p) => <OracleIcon size={p.size} /> },
      { name: 'MS SQL',     color: '#CC2927', Custom: (p) => <MssqlIcon size={p.size} /> },
    ],
  },
  {
    label: 'Tools & Infrastructure',
    items: [
      { name: 'Docker',     color: '#2496ED', Icon: SiDocker },
      { name: 'FastAPI',    color: '#009688', Icon: SiFastapi },
      { name: 'Git',        color: '#F05032', Icon: SiGit },
      { name: 'GitHub',     color: '#e0e0e0', Icon: SiGithub },
      { name: 'Playwright', color: '#2EAD33', Custom: (p) => <PlaywrightIcon size={p.size} /> },
      { name: 'Selenium',   color: '#43B02A', Icon: SiSelenium },
      { name: 'pytest',     color: '#0A9EDC', Icon: SiPytest },
    ],
  },
];

/* ── Component ─────────────────────────────────────────────────────── */
export default function TechLogos() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.set('.tech-category', { opacity: 1 });
      gsap.set('.tech-card', { opacity: 1 });
      gsap.from('.tech-category', {
        y: 40, opacity: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true },
      });
      gsap.from('.tech-card', {
        scale: 0.88, opacity: 0, duration: 0.55, stagger: 0.04, ease: 'back.out(1.4)',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-28 px-8 lg:px-16 bg-[#050505] border-t border-[var(--border-subtle)] overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="mb-20 text-center flex flex-col items-center">
          <div className="font-mono text-[var(--accent-warm)] text-[11px] tracking-widest uppercase mb-4 flex items-center gap-4">
            <span className="w-12 h-px bg-[var(--accent-warm)] opacity-50" />
            System Stack
            <span className="w-12 h-px bg-[var(--accent-warm)] opacity-50" />
          </div>
          <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-bold text-[var(--text-primary)]">
            Technologies
          </h2>
        </div>

        {/* Category rows */}
        <div className="flex flex-col gap-14">
          {STACK.map((category) => (
            <div key={category.label} className="tech-category">
              {/* Category label */}
              <div className="flex items-center gap-4 mb-6">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-secondary)] opacity-60">
                  {category.label}
                </span>
                <span className="flex-1 h-px bg-[var(--border-subtle)]" />
              </div>

              {/* Tech cards */}
              <div className="flex flex-wrap gap-3">
                {category.items.map((tech) => (
                  <TechCard key={tech.name} tech={tech} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TechCard({ tech }: { tech: TechItem }) {
  const { name, color, Icon, Custom } = tech;

  return (
    <div
      className="tech-card group relative flex items-center gap-3 px-4 py-3 bg-[#0a0a0c] border border-[var(--border-subtle)] rounded-sm cursor-default select-none transition-all duration-300 hover:border-opacity-60 hover:-translate-y-0.5"
      style={
        {
          '--glow-color': color,
        } as React.CSSProperties
      }
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = color + '55';
        (e.currentTarget as HTMLElement).style.boxShadow = `0 0 16px ${color}22, 0 4px 24px ${color}11`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = '';
        (e.currentTarget as HTMLElement).style.boxShadow = '';
      }}
    >
      {/* Icon */}
      <span className="flex-shrink-0 w-[26px] h-[26px] flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
        {Custom ? (
          <Custom size={26} />
        ) : Icon ? (
          <Icon size={26} style={{ color }} />
        ) : null}
      </span>

      {/* Name */}
      <span
        className="font-mono text-[11px] uppercase tracking-wider text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors duration-300 whitespace-nowrap"
      >
        {name}
      </span>

      {/* Subtle color dot */}
      <span
        className="w-1 h-1 rounded-full flex-shrink-0 opacity-50 group-hover:opacity-100 transition-opacity"
        style={{ background: color }}
      />
    </div>
  );
}
