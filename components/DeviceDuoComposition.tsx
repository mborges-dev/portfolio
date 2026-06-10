type Props = {
  /** Desktop dashboard screenshot path */
  macSrc?: string;
  /** Mobile interface screenshot path */
  mobileSrc?: string;
  /** Text shown in the top bar of the Mac frame (e.g. "docflow.internal") */
  macUrl: string;
  /** Used as default alt text when desktopAlt/mobileAlt not provided */
  title: string;
  /** Descriptive alt for the desktop Mac screenshot */
  desktopAlt?: string;
  /** Descriptive alt for the mobile/iPhone screenshot */
  mobileAlt?: string;
};

export function DeviceDuoComposition({
  macSrc,
  mobileSrc,
  macUrl,
  title,
  desktopAlt,
  mobileAlt,
}: Props) {
  const macAlt = desktopAlt ?? `${title} desktop dashboard`;
  const phoneAlt = mobileAlt ?? `${title} mobile interface`;
  return (
    <div className="group relative w-full">
      {/* DESKTOP LAYOUT — Mac primary + iPhone overlapping bottom-right */}
      <div className="hidden md:block relative pb-[6%]">
        <div
          className="relative w-[88%] mx-auto transition-transform duration-300 ease-out group-hover:scale-[1.02]"
          style={{ filter: 'drop-shadow(0 30px 60px rgba(0, 0, 0, 0.4))' }}
        >
          <MacFrame src={macSrc} url={macUrl} alt={macAlt} />
        </div>

        <div
          className="absolute transition-transform duration-300 ease-out group-hover:scale-[1.04]"
          style={{
            width: '22%',
            right: '3%',
            bottom: '-4%',
            // Stacked drop-shadows: black for depth + flash-green ambient halo
            // to differentiate the phone from the Mac behind it.
            filter:
              'drop-shadow(-16px 18px 32px rgba(0, 0, 0, 0.55)) drop-shadow(0 0 28px rgba(74, 222, 128, 0.22))',
          }}
        >
          <PhoneFrame src={mobileSrc} alt={phoneAlt} />
        </div>
      </div>

      {/* MOBILE LAYOUT — Mac only, centered. iPhone is hidden on mobile
          per the post-iteration brief; the dual-device composition was
          visually noisy at narrow widths. Mac alone reads cleaner. */}
      <div className="md:hidden py-3 flex justify-center">
        <div
          className="w-full max-w-[420px]"
          style={{ filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.4))' }}
        >
          <MacFrame src={macSrc} url={macUrl} alt={macAlt} />
        </div>
      </div>
    </div>
  );
}

function MacFrame({ src, url, alt }: { src?: string; url: string; alt: string }) {
  return (
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
            alt={alt}
            loading="lazy"
            decoding="async"
            className="block w-full h-auto"
          />
        ) : (
          <div
            aria-hidden
            className="aspect-[16/10] flex items-center justify-center font-mono text-[10px] tracking-[0.22em] uppercase text-muted-soft"
          >
            desktop pending
          </div>
        )}
      </div>
    </div>
  );
}

function PhoneFrame({ src, alt }: { src?: string; alt: string }) {
  return (
    <div className="rounded-[24px] bg-[#0a0a0a] p-[3px]">
      <div className="relative rounded-[20px] bg-[#1a1a1a] overflow-hidden">
        {/* Notch — sits above the image, scales with frame */}
        <span
          aria-hidden
          className="absolute top-[2%] left-1/2 -translate-x-1/2 z-10 rounded-full bg-[#0a0a0a]"
          style={{ width: '38%', height: '3%' }}
        />
        {src ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            className="block w-full h-auto"
          />
        ) : (
          <div
            aria-hidden
            className="aspect-[9/19.5] flex items-center justify-center font-mono text-[8px] tracking-[0.18em] uppercase text-muted-soft"
          >
            mobile pending
          </div>
        )}
      </div>
    </div>
  );
}
