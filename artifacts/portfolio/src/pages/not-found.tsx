import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#030303] px-8">
      <div className="text-center">
        <div className="font-mono text-[var(--accent-warm)] text-sm tracking-widest uppercase mb-6 flex items-center justify-center gap-4">
          <span className="w-12 h-px bg-[var(--accent-warm)] opacity-50" />
          Error 404
          <span className="w-12 h-px bg-[var(--accent-warm)] opacity-50" />
        </div>

        <h1 className="font-display text-[clamp(6rem,20vw,14rem)] font-bold text-[var(--text-primary)] leading-none opacity-10 select-none">
          404
        </h1>

        <p className="font-display text-2xl font-bold text-[var(--text-primary)] -mt-6 mb-4">
          Page Not Found
        </p>
        <p className="text-[var(--text-secondary)] font-mono text-sm mb-12">
          The route you're looking for doesn't exist.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-3 px-8 py-4 border border-[var(--border-subtle)] text-[var(--text-primary)] font-mono text-sm uppercase tracking-widest hover:border-[var(--accent-warm)] hover:text-[var(--accent-warm)] transition-all duration-300"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
