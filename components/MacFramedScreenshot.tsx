type Props = {
  /** Screenshot path served from /public */
  src?: string;
  /** Text shown in the top bar (e.g. "almi.app") */
  url: string;
  /** Used as default alt text */
  title: string;
  /** Descriptive alt for the screenshot */
  alt?: string;
};

/**
 * Standalone Mac-style framed screenshot. Same chrome family as the DocFlow
 * Mac frame and TheFacio browser frame so the three live cards read as a set.
 * Renders at natural image aspect — no cropping.
 */
export function MacFramedScreenshot({ src, url, title, alt }: Props) {
  const imgAlt = alt ?? `${title} dashboard`;
  return (
    <div
      className="relative w-[88%] mx-auto transition-transform duration-300 ease-out hover:scale-[1.02]"
      style={{ filter: 'drop-shadow(0 30px 60px rgba(0, 0, 0, 0.4))' }}
    >
      <div
        className="border border-[#2a2a2a] overflow-hidden rounded-t-[8px] rounded-b-[12px]"
        style={{ background: 'linear-gradient(to bottom, #2a2a2a 0%, #1a1a1a 100%)' }}
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
        {/* Inner content — natural image aspect, no cropping */}
        <div className="relative bg-ink">
          {src ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={src}
              alt={imgAlt}
              loading="lazy"
              decoding="async"
              className="block w-full h-auto"
            />
          ) : (
            <div
              aria-hidden
              className="aspect-[16/10] flex items-center justify-center font-mono text-[10px] tracking-[0.22em] uppercase text-muted-soft"
            >
              dashboard pending
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
