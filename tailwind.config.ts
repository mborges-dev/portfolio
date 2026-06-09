import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  future: {
    // Gate `hover:` variants to `@media (hover: hover)` so they don't stick on touch
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      colors: {
        ink: '#0A0A0A',
        'ink-rise': '#141414',
        'ink-elev': '#0F0F0F',
        bone: '#F5F0E8',
        muted: '#A8A29E',
        'muted-soft': '#7A7670',   // ~5:1 contrast on ink — for recessed labels
        'muted-faint': '#5A5752',  // ~3:1 — decorative only (separators, ©, prefixes)
        sage: '#84C7AE',
        flash: '#4ADE80',
        hairline: '#1F1F1F',
      },
      fontFamily: {
        hero: ['var(--font-hero)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-display)', 'serif'],
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        prose: '720px',
        wide: '1200px',
      },
      letterSpacing: {
        'mono-wide': '0.14em',
      },
    },
  },
  plugins: [],
};

export default config;
