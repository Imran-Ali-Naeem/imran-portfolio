import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Cpu, Database, Wrench, Layers } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const expertiseData = [
  {
    icon: Cpu,
    category: 'Core Competency',
    title: 'AI & Deep Learning',
    desc: 'Designing and fine-tuning neural architectures. Implementing RAG pipelines and deploying vision-language models for complex reasoning tasks.',
    tags: ['PyTorch', 'HuggingFace', 'Fine-tuning', 'RAG', 'LangChain', 'LLMs', 'Qwen2-VL', 'Gemini'],
  },
  {
    icon: Database,
    category: 'Foundation',
    title: 'Languages & Databases',
    desc: 'Robust foundational languages and scalable data storage systems optimized for high-throughput AI applications.',
    tags: ['Python', 'C++', 'Oracle SQL', 'MS SQL Server', 'MongoDB'],
  },
  {
    icon: Wrench,
    category: 'Infrastructure',
    title: 'Tools & Frameworks',
    desc: 'Building automated testing frameworks, RESTful APIs, and CI/CD pipelines to ensure reliability and scalability.',
    tags: ['Docker', 'Git', 'FastAPI', 'Playwright', 'Selenium', 'pytest', 'CI/CD'],
  },
  {
    icon: Layers,
    category: 'Domain',
    title: 'Specializations',
    desc: 'End-to-end data engineering and reporting. From raw ETL pipelines to dimensional modeling and interactive dashboards.',
    tags: ['ETL Pipelines', 'Dimensional Modeling', 'Star Schema', 'Power BI', 'Test Automation'],
  },
];

export default function Expertise() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    
    const ctx = gsap.context(() => {
      gsap.from('.expertise-card', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {expertiseData.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index} 
                className="expertise-card group relative p-10 bg-[#0a0a0c] border border-[var(--border-subtle)] hover:border-[var(--accent-cool)] transition-colors duration-500 overflow-hidden"
              >
                {/* Subtle background glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-cool)] to-transparent opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <Icon size={32} className="text-[var(--text-secondary)] group-hover:text-[var(--accent-cool)] transition-colors" />
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-secondary)]">0{index + 1} // {item.category}</span>
                  </div>
                  
                  <h3 className="font-display text-2xl font-bold mb-4 text-[var(--text-primary)]">{item.title}</h3>
                  <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-8 h-20">
                    {item.desc}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map(tag => (
                      <span key={tag} className="font-mono text-[10px] uppercase tracking-widest px-3 py-1.5 bg-[#050505] text-[var(--text-secondary)] border border-[var(--border-subtle)]">
                        {tag}
                      </span>
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
