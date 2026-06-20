import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const navLinks = [
  { label: 'Work', href: '/#work' },
  { label: 'Expertise', href: '/#expertise' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Contact', href: '/#contact' },
];

function smoothScrollTo(href: string, onDone?: () => void) {
  if (href.startsWith('/#')) {
    const sectionId = href.replace('/#', '');
    if (window.location.pathname !== '/') {
      sessionStorage.setItem('scrollTo', sectionId);
      window.location.href = '/';
      onDone?.();
      return;
    }
    const target = document.querySelector('#' + sectionId);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  }
  onDone?.();
}

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const lastScroll = useRef(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 50);

      if (y > lastScroll.current && y > 200) {
        gsap.to(nav, { y: -100, duration: 0.4, ease: 'power3.out' });
      } else {
        gsap.to(nav, { y: 0, duration: 0.4, ease: 'power3.out' });
      }

      lastScroll.current = y;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const linkStyle: React.CSSProperties = {
    fontSize: '0.78rem',
    letterSpacing: '0.12em',
    color: 'rgba(226, 232, 240, 0.8)',
    fontWeight: 500,
    transition: 'color 0.25s ease',
    textDecoration: 'none',
    textTransform: 'uppercase',
    fontFamily: 'var(--font-mono, monospace)',
  };

  useEffect(() => {
    const scrollToSection = sessionStorage.getItem('scrollTo');
    if (scrollToSection) {
      sessionStorage.removeItem('scrollTo');
      const target = document.querySelector('#' + scrollToSection);
      if (target) setTimeout(() => target.scrollIntoView({ behavior: 'smooth' }), 800);
    }
  }, []);

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between transition-all duration-300"
        style={{
          padding: '1.8rem 3rem',
          background: 'transparent',
          borderBottom: scrolled
            ? '1px solid rgba(245, 158, 11, 0.15)'
            : '1px solid transparent',
        }}
      >
        {/* Logo */}
        <a
          href="/"
          style={{
            color: '#ffffff',
            fontSize: '1.3rem',
            fontWeight: 700,
            letterSpacing: '0.05em',
            fontFamily: 'var(--font-display, sans-serif)',
            textDecoration: 'none',
            transition: 'color 0.25s ease',
            zIndex: 10,
          }}
          onMouseEnter={e => (e.currentTarget.style.color = '#F59E0B')}
          onMouseLeave={e => (e.currentTarget.style.color = '#ffffff')}
        >
          IA.
        </a>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-12" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                style={linkStyle}
                onMouseEnter={e => (e.currentTarget.style.color = '#F59E0B')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(226, 232, 240, 0.8)')}
                onClick={e => { e.preventDefault(); smoothScrollTo(link.href); }}
              >
                <span style={{ color: '#F59E0B', opacity: 0.7, marginRight: '4px' }}>//</span>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden"
          style={{ color: '#F59E0B', background: 'none', border: 'none', cursor: 'pointer', zIndex: 10, padding: 0 }}
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="18" x2="20" y2="18" />
          </svg>
        </button>
      </nav>

      {/* Mobile fullscreen overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center md:hidden"
          style={{
            background: 'rgba(5, 10, 14, 0.97)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
          }}
        >
          <button
            style={{
              position: 'absolute', top: '1.5rem', right: '2rem',
              color: '#F59E0B', fontSize: '2rem', lineHeight: 1,
              background: 'none', border: 'none', cursor: 'pointer',
            }}
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            ×
          </button>

          <ul className="flex flex-col items-center w-full px-8" style={{ listStyle: 'none', margin: 0, padding: '0 2rem', gap: 0 }}>
            {navLinks.map((link) => (
              <li key={link.label} className="w-full text-center">
                <a
                  href={link.href}
                  style={{
                    display: 'block',
                    fontSize: '1.5rem',
                    color: '#e2e8f0',
                    padding: '1rem 0',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    fontFamily: 'var(--font-mono, monospace)',
                    fontWeight: 500,
                    textDecoration: 'none',
                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                    transition: 'color 0.25s ease',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#F59E0B')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#e2e8f0')}
                  onClick={e => { e.preventDefault(); smoothScrollTo(link.href, () => setMenuOpen(false)); }}
                >
                  <span style={{ color: '#F59E0B', opacity: 0.7, marginRight: '0.5rem' }}>//</span>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
