'use client';

import { useEffect, useRef, useState, type KeyboardEvent } from 'react';

type Props = {
  /** Ordered list of screenshot paths under /public */
  images?: string[];
  /** URL bar text in the Mac frame (e.g. "fleet-hq.local") */
  url: string;
  /** Caption shown below the entire frame */
  caption?: string;
  /** Used for alt text */
  title: string;
};

const AUTO_ADVANCE_MS = 3500;
const RESUME_AFTER_CLICK_MS = 5000;
const RESUME_AFTER_HOVER_MS = 2000;

export function FleetHQCarousel({ images = [], url, caption, title }: Props) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [aspect, setAspect] = useState<string>('2936 / 1668');
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Read the first image's natural dimensions so the frame matches the
  // image's aspect — no cropping, no letterboxing.
  useEffect(() => {
    if (images.length === 0) return;
    const probe = new window.Image();
    probe.src = images[0];
    const apply = () => {
      if (probe.naturalWidth && probe.naturalHeight) {
        setAspect(`${probe.naturalWidth} / ${probe.naturalHeight}`);
      }
    };
    if (probe.complete) apply();
    else probe.addEventListener('load', apply);
    return () => probe.removeEventListener('load', apply);
  }, [images]);

  // Watch prefers-reduced-motion at runtime
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener?.('change', update);
    return () => mq.removeEventListener?.('change', update);
  }, []);

  // Auto-advance loop
  useEffect(() => {
    if (paused || reduced || images.length <= 1) return;
    const id = setInterval(() => {
      setActive((i) => (i + 1) % images.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, [paused, reduced, images.length]);

  // Cleanup any pending resume timer on unmount
  useEffect(() => {
    return () => {
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
    };
  }, []);

  const scheduleResume = (delay: number) => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setPaused(false), delay);
  };

  const goTo = (i: number) => {
    setActive(((i % images.length) + images.length) % images.length);
    setPaused(true);
    scheduleResume(RESUME_AFTER_CLICK_MS);
  };

  const next = () => goTo(active + 1);
  const prev = () => goTo(active - 1);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (images.length <= 1) return;
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      next();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prev();
    }
  };

  return (
    <div>
      {/* Mac frame */}
      <div
        className="relative w-[88%] mx-auto transition-transform duration-300 ease-out hover:scale-[1.02]"
        style={{ filter: 'drop-shadow(0 20px 60px rgba(0, 0, 0, 0.4))' }}
      >
        <div
          className="overflow-hidden rounded-t-[8px] rounded-b-[12px] border"
          style={{
            background: 'linear-gradient(to bottom, #2a2a2a 0%, #1a1a1a 100%)',
            borderColor: 'rgba(74, 222, 128, 0.2)',
            boxShadow: 'inset 0 0 30px rgba(74, 222, 128, 0.1)',
          }}
        >
          {/* Top bar — 3 dots + URL */}
          <div className="flex items-center px-3 h-6 border-b border-[#2a2a2a] shrink-0">
            <div className="flex items-center gap-2 shrink-0">
              <span aria-hidden className="block w-3 h-3 rounded-full bg-[#FF5F56]" />
              <span aria-hidden className="block w-3 h-3 rounded-full bg-[#FFBD2E]" />
              <span aria-hidden className="block w-3 h-3 rounded-full bg-[#27C93F]" />
            </div>
            <span className="flex-1 text-center font-mono text-[11px] text-muted truncate px-3">
              {url}
            </span>
            <span aria-hidden className="block w-[68px] shrink-0" />
          </div>

          {/* Carousel screen area — aspect matches the natural image aspect */}
          <div
            role="region"
            aria-label={`${title} screenshots carousel`}
            aria-roledescription="carousel"
            tabIndex={0}
            onKeyDown={onKeyDown}
            onMouseEnter={() => {
              if (resumeTimer.current) clearTimeout(resumeTimer.current);
              setPaused(true);
            }}
            onMouseLeave={() => scheduleResume(RESUME_AFTER_HOVER_MS)}
            className="relative bg-ink group focus:outline-none"
            style={{ aspectRatio: aspect }}
          >
            {/* Stacked images — opacity crossfade */}
            {images.map((src, i) => (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                key={src}
                src={src}
                alt={`${title} — screen ${i + 1} of ${images.length}`}
                aria-hidden={i !== active}
                loading={i === 0 ? 'eager' : 'lazy'}
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out"
                style={{ opacity: i === active ? 1 : 0 }}
              />
            ))}

            {images.length === 0 && (
              <div
                aria-hidden
                className="absolute inset-0 flex items-center justify-center font-mono text-[10px] tracking-[0.22em] uppercase text-muted-soft"
              >
                screenshots pending
              </div>
            )}

            {/* Arrows — hidden by default, fade in on hover */}
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Previous screen"
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full border border-white/60 bg-transparent text-white text-[15px] leading-none opacity-0 group-hover:opacity-90 focus:opacity-100 hover:border-flash hover:text-flash transition-all duration-200 flex items-center justify-center"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Next screen"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full border border-white/60 bg-transparent text-white text-[15px] leading-none opacity-0 group-hover:opacity-90 focus:opacity-100 hover:border-flash hover:text-flash transition-all duration-200 flex items-center justify-center"
                >
                  ›
                </button>
              </>
            )}

            {/* Dots */}
            {images.length > 1 && (
              <div className="absolute left-1/2 -translate-x-1/2 bottom-4 flex items-center gap-2">
                {images.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={`Show screen ${i + 1}`}
                    aria-current={i === active}
                    className="rounded-full transition-all duration-200"
                    style={{
                      width: i === active ? 8 : 6,
                      height: i === active ? 8 : 6,
                      backgroundColor:
                        i === active ? '#4ADE80' : 'rgba(168, 162, 158, 0.4)',
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Caption under the frame */}
      {caption ? (
        <p className="mt-5 text-center font-mono text-[10.5px] tracking-[0.18em] uppercase text-muted-soft">
          {caption}
        </p>
      ) : null}
    </div>
  );
}
