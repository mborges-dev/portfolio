'use client';

/**
 * Browser-chromed media. Either a static <img> or an autoplay <video>,
 * wrapped in macOS-style browser chrome (traffic lights + URL bar).
 *
 * Renders an <img> when `imageSrc` is provided. Falls back to <video>
 * only if `src` is set. This is the simplest possible playback path —
 * the browser does autoplay+muted+loop on its own well-trodden
 * happy path with no GPU hints, no IntersectionObserver, no imperative
 * play() calls. Earlier iterations stacked compositor tricks (translateZ,
 * isolation, will-change) to mask source-side problems — those tricks
 * are gone.
 */
type Props = {
  /** Static image source. Wins over video if both are set. */
  imageSrc?: string;
  /** MP4 source — only used when imageSrc is not provided. */
  src?: string;
  /** Optional WebM source. */
  webmSrc?: string;
  url: string;
  title: string;
  /** CSS aspect-ratio for the media element. */
  fallbackAspect?: string;
};

export function BrowserFramedVideo({
  imageSrc,
  src,
  webmSrc,
  url,
  title,
  fallbackAspect = '1200 / 680',
}: Props) {
  return (
    <div className="relative w-[88%] mx-auto transition-transform duration-300 ease-out hover:scale-[1.02]">
      <div
        className="relative rounded-[8px] overflow-hidden bg-[#1a1a1a] border border-[#2a2a2a]"
        style={{ boxShadow: '0 30px 60px rgba(0, 0, 0, 0.4)' }}
      >
        {/* Browser chrome: traffic lights + URL */}
        <div className="flex items-center px-3 h-6 border-b border-[#2a2a2a]">
          <div className="flex items-center gap-[6px]">
            <span aria-hidden className="block w-[10px] h-[10px] rounded-full bg-[#FF5F56]" />
            <span aria-hidden className="block w-[10px] h-[10px] rounded-full bg-[#FFBD2E]" />
            <span aria-hidden className="block w-[10px] h-[10px] rounded-full bg-[#27C93F]" />
          </div>
          <span className="flex-1 text-center font-mono text-[10px] tracking-[0.14em] uppercase text-muted-soft truncate px-3">
            {url}
          </span>
          <span aria-hidden className="block w-[58px]" />
        </div>

        {/* Media — image preferred when present; video otherwise */}
        {imageSrc ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={imageSrc}
            alt={`${title} — interface preview`}
            loading="lazy"
            decoding="async"
            className="block w-full"
            style={{ aspectRatio: fallbackAspect, background: '#000' }}
          />
        ) : src ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-label={`${title} — interface walkthrough (click to open case study)`}
            className="block w-full"
            style={{ aspectRatio: fallbackAspect, background: '#000' }}
          >
            <source src={src} type="video/mp4" />
            {webmSrc ? <source src={webmSrc} type="video/webm" /> : null}
          </video>
        ) : (
          <div
            aria-hidden
            style={{ aspectRatio: fallbackAspect }}
            className="flex items-center justify-center font-mono text-[10px] tracking-[0.22em] uppercase text-muted-soft bg-black"
          >
            media pending
          </div>
        )}
      </div>
    </div>
  );
}
