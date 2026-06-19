import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Mail, Phone, Linkedin, Github, Download, ChevronDown } from 'lucide-react';
import ParticleCanvas from './ParticleCanvas';

gsap.registerPlugin(ScrollTrigger);

// ── Terminal ──────────────────────────────────────────────────────────────────

const TERMINAL_LINES = [
  { text: '> initializing profile...',           warm: false, cool: false },
  { text: '> status: OPEN TO WORK',              warm: true,  cool: false },
  { text: '> roles: [AI / ML Engineer]',         warm: false, cool: false },
  { text: '> type: full-time + freelance',       warm: false, cool: false },
  { text: '> location: remote / hybrid',         warm: false, cool: false },
  { text: '> ping: imranalinaeem3397@gmail.com', warm: false, cool: true  },
];

function TerminalWidget() {
  const [doneLines, setDoneLines] = useState<typeof TERMINAL_LINES>([]);
  const [typing, setTyping]       = useState('');
  const [cursorOn, setCursorOn]   = useState(true);
  const alive = useRef(true);

  useEffect(() => {
    alive.current = true;
    const blink = setInterval(() => setCursorOn(v => !v), 530);
    let pendingTimer: ReturnType<typeof setTimeout>;
    const sleep = (ms: number) =>
      new Promise<void>(res => { pendingTimer = setTimeout(res, ms); });

    async function loop() {
      while (alive.current) {
        setDoneLines([]);
        setTyping('');
        await sleep(500);
        for (const line of TERMINAL_LINES) {
          if (!alive.current) return;
          for (let i = 1; i <= line.text.length; i++) {
            if (!alive.current) return;
            setTyping(line.text.slice(0, i));
            await sleep(40);
          }
          if (!alive.current) return;
          setDoneLines(prev => [...prev, line]);
          setTyping('');
          await sleep(160);
        }
        await sleep(2000);
      }
    }

    loop();
    return () => {
      alive.current = false;
      clearInterval(blink);
      clearTimeout(pendingTimer);
    };
  }, []);

  const lineClass = (warm: boolean, cool: boolean) =>
    warm ? 'text-[var(--accent-warm)] font-bold'
    : cool ? 'text-[var(--accent-cool)]'
    : 'text-[var(--text-secondary)]';

  const cursor = (
    <span
      className="inline-block w-[2px] h-[11px] sm:h-[13px] ml-[1px] align-middle bg-[var(--accent-cool)]"
      style={{ opacity: cursorOn ? 1 : 0 }}
    />
  );

  return (
    <div className="relative w-full">
      <div className="absolute -inset-2 bg-gradient-to-br from-[var(--accent-cool)] via-transparent to-[var(--accent-warm)] rounded opacity-[0.06] blur-2xl pointer-events-none" />

      <div className="relative bg-[#07070f] border border-[rgba(61,209,229,0.15)] rounded-sm overflow-hidden">
        {/* Title bar */}
        <div className="flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2.5 sm:py-3 bg-[#0c0c1a] border-b border-[rgba(61,209,229,0.1)]">
          <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#ff5f57]" />
          <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#febc2e]" />
          <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#28c840]" />
          <span className="font-mono text-[9px] sm:text-[10px] ml-2 sm:ml-3 tracking-[0.15em] uppercase text-[var(--text-secondary)] opacity-40 select-none">
            availability.sh
          </span>
          <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
            <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent-cool)] opacity-60" />
              <span className="relative inline-flex rounded-full h-full w-full bg-[var(--accent-cool)]" />
            </span>
            <span className="font-mono text-[8px] sm:text-[9px] text-[var(--accent-cool)] uppercase tracking-widest">live</span>
          </div>
        </div>

        {/* Body — min-h on mobile, flex-1 on lg so terminal stretches */}
        <div className="px-4 sm:px-6 py-3 sm:py-5 font-mono space-y-1.5 sm:space-y-2 min-h-[200px] sm:min-h-[240px] lg:flex-1">
          {doneLines.map((line, i) => (
            <div key={i} className={`text-[0.72rem] sm:text-sm leading-relaxed ${lineClass(line.warm, line.cool)}`}>
              {line.text}
            </div>
          ))}
          {typing && (
            <div className={`text-[0.72rem] sm:text-sm leading-relaxed ${lineClass(
              TERMINAL_LINES[doneLines.length]?.warm ?? false,
              TERMINAL_LINES[doneLines.length]?.cool ?? false
            )}`}>
              {typing}{cursor}
            </div>
          )}
          {!typing && doneLines.length === TERMINAL_LINES.length && (
            <div className="text-[0.72rem] sm:text-sm text-[var(--text-secondary)]">
              {'> '}{cursor}
            </div>
          )}
        </div>

        {/* Status bar */}
        <div className="px-4 sm:px-6 py-2.5 sm:py-3 bg-[#0c0c1a] border-t border-[rgba(61,209,229,0.1)] flex items-center justify-between">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-50" />
              <span className="relative inline-flex rounded-full h-full w-full bg-green-400" />
            </span>
            <span className="font-mono text-[9px] sm:text-[10px] text-green-400 uppercase tracking-widest">Available Now</span>
          </div>
          <span className="font-mono text-[9px] sm:text-[10px] text-[var(--text-secondary)] opacity-30 uppercase tracking-widest select-none">
            Imran Ali · 2026
          </span>
        </div>
      </div>

      <div className="absolute -top-px -right-px w-7 h-7 sm:w-8 sm:h-8 border-t-2 border-r-2 border-[var(--accent-cool)] opacity-50 rounded-tr-sm pointer-events-none" />
      <div className="absolute -bottom-px -left-px w-7 h-7 sm:w-8 sm:h-8 border-b-2 border-l-2 border-[var(--accent-warm)] opacity-40 rounded-bl-sm pointer-events-none" />
    </div>
  );
}

// ── Tagline loop ──────────────────────────────────────────────────────────────

const WORDS = [
  { text: 'Think.', color: '#f8f8f8' },
  { text: 'Build.', color: '#F59E0B' },
  { text: 'Ship.',  color: '#2DD4BF' },
];

function TaglineLoop() {
  const [shown, setShown]   = useState(0);
  const [fading, setFading] = useState(false);
  const alive = useRef(true);

  useEffect(() => {
    alive.current = true;
    let tid: ReturnType<typeof setTimeout>;
    const sleep = (ms: number) =>
      new Promise<void>(res => { tid = setTimeout(res, ms); });

    async function loop() {
      while (alive.current) {
        setShown(0);
        setFading(false);
        await sleep(300);
        setShown(1); await sleep(800);
        setShown(2); await sleep(800);
        setShown(3); await sleep(800);
        setFading(true);
        await sleep(600);
      }
    }

    loop();
    return () => { alive.current = false; clearTimeout(tid); };
  }, []);

  return (
    <div
      className="flex items-baseline gap-3 sm:gap-4 overflow-hidden"
      style={{ opacity: fading ? 0 : 1, transition: 'opacity 0.5s ease' }}
    >
      {WORDS.map((w, i) => (
        <span
          key={i}
          className="font-display font-bold"
          style={{
            fontSize: 'clamp(1.6rem, 5.5vw, 3.5rem)',
            color: w.color,
            display: 'inline-block',
            transform: shown > i ? 'translateY(0)' : 'translateY(28px)',
            opacity: shown > i ? 1 : 0,
            transition: 'transform 0.4s ease-out, opacity 0.35s ease-out',
            lineHeight: 1.1,
          }}
        >
          {w.text}
        </span>
      ))}
    </div>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 });
      tl.from('.hero-eyebrow',  { opacity: 0, x: -20, duration: 0.6, ease: 'power3.out' })
        .from('.hero-name',     { opacity: 0, y: 20,  duration: 0.8, ease: 'power4.out' }, '-=0.4')
        .from('.hero-desc',     { opacity: 0, y: 16,  duration: 0.6, ease: 'power3.out' }, '-=0.5')
        .from('.hero-tagline',  { opacity: 0, y: 16,  duration: 0.5, ease: 'power3.out' }, '-=0.4')
        .from('.hero-meta',     { opacity: 0, y: 16,  duration: 0.5, ease: 'power3.out', stagger: 0.08 }, '-=0.3')
        .from('.hero-links',    { opacity: 0, y: 16,  duration: 0.5, ease: 'power3.out' }, '-=0.3')
        .from('.hero-terminal', { opacity: 0, x: 32,  duration: 1.0, ease: 'power3.out' }, '-=1.0');

      gsap.to(contentRef.current, {
        y: '20%',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      /* fix #1: flex-col + justify-between distributes content + scroll indicator evenly */
      /* fix #3 mobile: pb-16 (4rem) so buttons never crowd the scroll indicator        */
      className="relative min-h-[100svh] lg:h-[100dvh] flex flex-col overflow-x-hidden px-5 sm:px-8 lg:px-16 pt-20 sm:pt-24 pb-16"
    >
      {/* ── Aurora background ── */}
      <div className="absolute inset-0 z-0 bg-[#050505]">
        <div
          className="absolute bottom-0 right-0 w-[52vw] h-[60vh] bg-[var(--accent-cool)] rounded-full blur-[180px]"
          style={{ animation: 'aurora-cool 9s ease-in-out infinite', animationFillMode: 'both' }}
        />
        <div
          className="absolute top-[-5%] right-0 w-[30vw] h-[40vh] bg-[var(--accent-warm)] rounded-full blur-[140px]"
          style={{ animation: 'aurora-warm 11s ease-in-out infinite', animationFillMode: 'both' }}
        />
      </div>

      <ParticleCanvas />

      {/* ── Content grid — flex-1 centers it between nav padding and bottom ── */}
      <div className="relative z-10 flex-1 flex items-center">
      <div
        ref={contentRef}
        className="w-full max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 items-center"
      >
        {/* ── LEFT ── */}
        <div className="flex flex-col">
          <div className="hero-eyebrow font-mono text-[var(--accent-warm)] text-[10px] sm:text-xs tracking-widest uppercase mb-3 sm:mb-4 lg:mb-6 flex items-center gap-3">
            <span className="w-8 sm:w-10 h-px bg-[var(--accent-warm)] opacity-50" />
            AI Engineer / Machine Learning
          </div>

          <h1
            className="hero-name font-display font-bold leading-[0.9] tracking-tighter mb-3 sm:mb-4 lg:mb-7"
            style={{ fontSize: 'clamp(3rem, 9vw, 8rem)' }}
          >
            <span className="block text-[var(--text-primary)]">Imran</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-warm)] via-[#f3d399] to-[var(--text-primary)]">
              Ali.
            </span>
          </h1>

          <p
            className="hero-desc text-[var(--text-secondary)] max-w-[480px] leading-relaxed mb-3 sm:mb-4 lg:mb-6 border-l-2 border-[var(--border-subtle)] pl-4 sm:pl-5"
            style={{ fontSize: 'clamp(0.85rem, 1.4vw, 1.1rem)' }}
          >
            Building precision AI systems—from clinical RAG pipelines to diffusion models trained from scratch. Transforming theoretical research into production-ready infrastructure.
          </p>

          {/* fix #3: tagline visible on mobile (no hidden class) */}
          <div className="hero-tagline mb-3 sm:mb-4 lg:mb-6">
            <TaglineLoop />
          </div>

          <div
            className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4 sm:mb-5 lg:mb-7 font-mono text-[var(--text-secondary)]"
            style={{ fontSize: '0.85rem', opacity: 0.85, letterSpacing: '0.02em' }}
          >
            <span className="hero-meta flex items-center gap-2">
              <MapPin size={13} style={{ color: '#F59E0B', flexShrink: 0 }} />
              Faisalabad, Pakistan
            </span>
            <span className="hero-meta flex items-center gap-2">
              <Mail size={13} style={{ color: '#F59E0B', flexShrink: 0 }} />
              imranalinaeem3397@gmail.com
            </span>
            <span className="hero-meta flex items-center gap-2">
              <Phone size={13} style={{ color: '#F59E0B', flexShrink: 0 }} />
              +92 3078546373
            </span>
          </div>

          <div className="hero-links flex flex-wrap gap-2 sm:gap-3">
            <a
              href="https://www.linkedin.com/in/imran-ali-naeem/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-[var(--text-primary)] text-black font-display font-semibold tracking-wide hover:bg-[var(--accent-warm)] transition-colors rounded-sm text-xs sm:text-sm"
            >
              <Linkedin size={13} /> LinkedIn
            </a>
            <a
              href="https://github.com/Imran-Ali-Naeem"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 border border-[var(--border-subtle)] text-[var(--text-primary)] font-display font-semibold tracking-wide hover:border-[var(--accent-cool)] hover:text-[var(--accent-cool)] transition-colors rounded-sm bg-[#050505]/50 text-xs sm:text-sm"
            >
              <Github size={13} /> GitHub
            </a>
            <a
              href="/resume.pdf"
              download="Imran_Ali_Resume.pdf"
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 border border-[#F59E0B] text-[#F59E0B] font-display font-semibold tracking-wide hover:bg-[#F59E0B]/10 transition-colors rounded-sm text-xs sm:text-sm"
            >
              <Download size={13} /> Resume
            </a>
          </div>
        </div>

        {/* ── RIGHT — terminal ── */}
        <div className="hero-terminal mt-5 lg:mt-0 max-h-[260px] lg:max-h-none overflow-hidden lg:overflow-visible">
          <TerminalWidget />
        </div>
      </div>
      </div>

      {/* ── Scroll indicator — pinned to bottom, never creates a gap ── */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1">
        <span
          className="font-mono uppercase text-[var(--text-secondary)]"
          style={{ fontSize: '0.7rem', letterSpacing: '0.15em', opacity: 0.5 }}
        >
          Scroll
        </span>
        <ChevronDown
          size={16}
          style={{ color: '#F59E0B', opacity: 0.7, animation: 'bounce-down 1.2s ease-in-out infinite' }}
        />
      </div>

      <style>{`
        @keyframes aurora-cool {
          0%, 100% { opacity: 0.04; transform: scale(1) translate(0, 0); }
          50%       { opacity: 0.08; transform: scale(1.07) translate(-2%, -3%); }
        }
        @keyframes aurora-warm {
          0%, 100% { opacity: 0.015; transform: scale(1); }
          50%       { opacity: 0.03;  transform: scale(1.05) translate(1.5%, 2%); }
        }
        @keyframes bounce-down {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(8px); }
        }
      `}</style>
    </section>
  );
}
