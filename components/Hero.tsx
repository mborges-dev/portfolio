import type { CSSProperties } from 'react';

export function Hero() {
  const d = (ms: number): CSSProperties => ({ ['--d' as any]: `${ms}ms` });

  return (
    <section
      id="top"
      className="relative w-full h-screen min-h-[720px] bg-ink overflow-hidden"
    >
      {/* TOP STACK — nav clearance + label + name + ©year, normal flow */}
      <div className="relative z-20 px-6 md:px-[8%] pt-16 md:pt-20">
        <div className="hero-enter mt-4 md:mt-8" style={d(200)}>
          <p className="font-mono text-[12px] md:text-[14px] tracking-[0.04em] text-bone/85">
            Hey 👋, I&apos;m an AI Engineer
          </p>
        </div>

        <h1 className="hero-name hero-enter mt-3 md:mt-4 select-none" style={d(500)}>
          MIGUEL BORGES
        </h1>

        <p
          className="hero-enter mt-3 md:mt-4 font-mono text-[11px] tracking-[0.14em] uppercase text-muted-soft"
          style={d(700)}
        >
          © 2026
        </p>
      </div>

      {/* PHOTO — dead-centered horizontally, anchored to section bottom */}
      <figure
        className="hero-enter absolute inset-x-0 bottom-0 flex justify-center pointer-events-none z-10"
        style={{ ...d(900), height: 'min(68vh, 680px)' }}
      >
        <div className="relative h-full pointer-events-auto">
          {/* Spotlight glow centered behind subject */}
          <div
            aria-hidden
            className="absolute pointer-events-none"
            style={{
              inset: '-50% -180% 0 -180%',
              background:
                'radial-gradient(ellipse 32% 42% at 50% 50%, rgba(74,222,128,0.55) 0%, rgba(74,222,128,0.36) 18%, rgba(74,222,128,0.20) 38%, rgba(74,222,128,0.10) 58%, rgba(74,222,128,0.04) 76%, transparent 92%)',
              filter: 'blur(70px)',
            }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/miguel-cutout.webp"
            alt="Miguel Borges — three-quarter portrait, looking up and to the right"
            width={1024}
            height={1053}
            loading="eager"
            decoding="async"
            fetchPriority="high"
            className="hero-photo relative h-full w-auto object-contain"
            style={{
              filter: 'brightness(1) contrast(1.04)',
              // Soft left-edge fade hides the cropped arm side, blends into bg
              WebkitMaskImage:
                'linear-gradient(to right, transparent 0%, #000 11%, #000 100%)',
              maskImage:
                'linear-gradient(to right, transparent 0%, #000 11%, #000 100%)',
            }}
          />
        </div>
      </figure>

      {/* DESCRIPTION — right side, mid-height, anchored to photo's vertical range */}
      <div
        className="hero-enter hidden md:block absolute right-[8%] z-20"
        style={{ ...d(1000), top: 'calc(50% + 40px)', maxWidth: '280px' }}
      >
        <p className="text-[13.5px] leading-[1.55] text-bone/75">
          I build AI products that ship — production systems with LLMs in
          the loop. Agents, RAG, document pipelines, automations driving
          real backends.
        </p>
      </div>

      {/* BOTTOM META — absolute, sits at section bottom (over the t-shirt area) */}
      <div
        className="hero-enter absolute inset-x-0 bottom-5 md:bottom-7 px-6 md:px-[8%] z-30 flex flex-col md:flex-row md:items-end md:justify-between gap-3"
        style={d(1200)}
      >
        <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-bone/90 flex items-center gap-3">
          <span className="text-muted-faint" aria-hidden>E</span>
          <a
            href="mailto:hello@miguelborges.dev"
            className="press inline-flex items-center py-2 -my-2 hover:text-flash transition-colors"
          >
            hello@miguelborges.dev
          </a>
        </div>

        <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-bone/90 flex flex-wrap items-center gap-5">
          <a
            href="https://www.linkedin.com/in/miguelcborges/"
            target="_blank"
            rel="noreferrer"
            className="press inline-flex items-center py-2 -my-2 hover:text-flash transition-colors"
          >
            / LinkedIn
          </a>
          <a
            href="https://github.com/miguelcborges"
            target="_blank"
            rel="noreferrer"
            className="press inline-flex items-center py-2 -my-2 hover:text-flash transition-colors"
          >
            / GitHub
          </a>
        </div>
      </div>

      {/* SCROLL — right edge middle, vertical */}
      <div
        className="hidden md:flex absolute right-5 lg:right-8 top-1/2 -translate-y-1/2 z-20 flex-col items-center gap-4 pointer-events-none"
        aria-hidden
      >
        <span className="block w-px h-[56px] bg-bone/35" />
        <span
          className="font-mono text-[10.5px] tracking-[0.28em] uppercase text-muted-soft"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          Scroll
        </span>
      </div>
    </section>
  );
}
