'use client';

import { useEffect, useState } from 'react';

const SECTIONS = [
  { id: 'work', label: 'Work' },
  { id: 'stack', label: 'Stack' },
  { id: 'services', label: 'Services' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.6);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <nav
      className={[
        'fixed top-0 left-0 right-0 z-50',
        'transition-[background-color,backdrop-filter,border-color] duration-300',
        scrolled
          ? 'bg-ink/80 backdrop-blur-md border-b border-hairline'
          : 'bg-transparent border-b border-transparent',
      ].join(' ')}
    >
      <div className="mx-auto max-w-wide px-6 md:px-10 h-16 flex items-center justify-between">
        <a
          href="#top"
          className="font-mono text-[11px] tracking-[0.18em] uppercase text-bone/90 hover:text-bone"
        >
          Miguel Borges
        </a>

        <div className="relative">
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-haspopup="menu"
            className={[
              'press inline-flex items-center gap-2 rounded-full',
              'border px-5 py-2.5 min-h-[44px]',
              'font-mono text-[11px] tracking-[0.14em] uppercase',
              'transition-colors',
              open
                ? 'border-bone/80 text-bone bg-bone/[0.06]'
                : 'border-bone/40 text-bone/90 hover:border-bone/80 hover:text-bone',
            ].join(' ')}
          >
            <span>{open ? 'Close' : 'Menu'}</span>
            <span
              aria-hidden
              className={`inline-block transition-transform duration-200 ${
                open ? 'rotate-45' : ''
              }`}
            >
              +
            </span>
          </button>

          {/* Overlay panel */}
          <div
            role="menu"
            aria-hidden={!open}
            className={[
              'absolute right-0 mt-3 w-[220px]',
              'bg-ink/95 backdrop-blur-md border border-hairline',
              'origin-top-right transition-all duration-200',
              open
                ? 'opacity-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 -translate-y-1 pointer-events-none',
            ].join(' ')}
          >
            <ul className="py-2">
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between px-5 py-2.5 font-mono text-[12px] tracking-[0.08em] uppercase text-bone/85 hover:text-flash hover:bg-bone/[0.02] transition-colors"
                  >
                    <span>{s.label}</span>
                    <span aria-hidden className="text-muted-faint">→</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
