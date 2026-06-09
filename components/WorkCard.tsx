import Image from 'next/image';

export type Status =
  | 'LIVE'
  | 'PRIVATE'
  | 'LOCAL'
  | 'IN DEVELOPMENT'
  | 'ARCHITECTURE COMPLETE'
  | 'PRE-LAUNCH';

export type Work = {
  year: string;
  status: Status;
  statusExtra?: string;
  title: string;
  role: string;
  description: string;
  stack: string[];
  image?: string;
  link?: { label: string; href: string };
  noLinkLabel?: string;
  /** Visual variant for the left image area */
  art?: 'screenshot' | 'terminal' | 'dashed' | 'ascii' | 'macbook';
  terminalLines?: string[];
  asciiCaption?: string;
};

export function WorkCard({ work }: { work: Work; index?: number }) {
  // Visual hierarchy: live = full presence; everything else gets degrees of recess.
  const cardOpacity =
    work.status === 'IN DEVELOPMENT'
      ? 'opacity-[0.78]'
      : work.status === 'PRE-LAUNCH'
      ? 'opacity-[0.88]'
      : work.status === 'ARCHITECTURE COMPLETE'
      ? 'opacity-[0.9]'
      : work.status === 'LOCAL'
      ? 'opacity-[0.92]'
      : '';

  const artVariant = work.art ?? 'screenshot';

  return (
    <article className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center ${cardOpacity}`}>
      {/* Image / art — left 55% on desktop */}
      <div className="lg:col-span-7">
        <div
          className={[
            'relative aspect-[4/3] overflow-hidden rounded-[4px]',
            artVariant === 'dashed'
              ? 'border border-dashed border-bone/20'
              : 'border border-hairline',
          ].join(' ')}
          style={
            artVariant === 'screenshot'
              ? { background: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)' }
              : { background: '#0F0F0F' }
          }
        >
          {artVariant === 'terminal' ? (
            <TerminalArt filename={`${work.title.toLowerCase().replace(/\s+/g, '-')}.sh`} lines={work.terminalLines || []} />
          ) : artVariant === 'dashed' ? (
            <DashedArt />
          ) : artVariant === 'ascii' ? (
            <AsciiArt caption={work.asciiCaption} />
          ) : artVariant === 'macbook' ? (
            <MacbookFramedScreenshot src={work.image} alt={`${work.title} interface`} />
          ) : work.image ? (
            <Image
              src={work.image}
              alt={`${work.title} screenshot`}
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover"
              unoptimized
            />
          ) : (
            <PlaceholderArt title={work.title} status={work.status} />
          )}
        </div>
      </div>

      {/* Text — right 45% on desktop */}
      <div className="lg:col-span-5">
        {/* Metadata */}
        <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.18em] uppercase text-muted">
          <span>{work.year}</span>
          <span className="text-muted-faint">·</span>
          <StatusBadge status={work.status} />
          {work.statusExtra ? (
            <>
              <span className="text-muted-faint">·</span>
              <span className="text-muted">{work.statusExtra}</span>
            </>
          ) : null}
        </div>

        {/* Title */}
        <h3 className="card-title mt-5">{work.title}</h3>

        {/* Role */}
        <p className="mt-3 font-mono text-[11px] tracking-[0.18em] uppercase text-muted/80">
          {work.role}
        </p>

        {/* Description */}
        <p className="mt-6 text-[18px] leading-[1.55] text-muted">{work.description}</p>

        {/* Stack tags */}
        <ul className="mt-7 flex flex-wrap gap-2">
          {work.stack.map((s) => (
            <li key={s} className="pill">
              {s}
            </li>
          ))}
        </ul>

        {/* Link or no-link label */}
        <div className="mt-8">
          {work.link ? (
            <a
              href={work.link.href}
              target="_blank"
              rel="noreferrer"
              className="press group inline-flex items-center gap-2 py-2 -my-2 font-mono text-[12px] tracking-[0.06em] text-bone hover:text-flash transition-colors"
            >
              <span>{work.link.label}</span>
              <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </a>
          ) : (
            <span className="inline-flex items-center gap-2 font-mono text-[12px] tracking-[0.06em] text-muted">
              <span>{work.noLinkLabel || 'Case study on request'}</span>
              <span aria-hidden>→</span>
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

function StatusBadge({ status }: { status: Status }) {
  // No-dot variants — honest about pre-launch state
  if (
    status === 'IN DEVELOPMENT' ||
    status === 'ARCHITECTURE COMPLETE' ||
    status === 'PRE-LAUNCH'
  ) {
    return <span className="text-muted">{status}</span>;
  }
  const dotClass =
    status === 'LIVE'
      ? 'pulse-dot'
      : status === 'LOCAL'
      ? 'pulse-dot opacity-70 scale-90'
      : 'inline-block w-[7px] h-[7px] rounded-full bg-muted/40';
  const textClass =
    status === 'LIVE' || status === 'LOCAL' ? 'text-flash' : 'text-muted';
  return (
    <span className="inline-flex items-center gap-2">
      <span aria-hidden className={dotClass} />
      <span className={textClass}>{status}</span>
    </span>
  );
}

function PlaceholderArt({ title, status }: { title: string; status: Status }) {
  return (
    <div className="absolute inset-0 flex flex-col justify-between p-8 md:p-10">
      <div className="flex items-center justify-between font-mono text-[10.5px] tracking-[0.18em] uppercase text-muted-soft">
        <span>{title.toLowerCase()}.preview</span>
        <span className="inline-flex items-center gap-2">
          <span
            aria-hidden
            className={`inline-block w-[6px] h-[6px] rounded-full ${
              status === 'LIVE' ? 'bg-flash' : 'bg-muted/40'
            }`}
          />
          {status}
        </span>
      </div>
      <div>
        <p className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-flash/80 mb-3">
          → screenshot drops here
        </p>
        <p className="font-serif italic text-bone/90 text-[42px] md:text-[56px] leading-[0.95]">
          {title}
        </p>
      </div>
    </div>
  );
}

function TerminalArt({ filename, lines }: { filename: string; lines: string[] }) {
  return (
    <div className="absolute inset-0 flex flex-col">
      {/* Header bar with macOS traffic-light dots */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-hairline shrink-0">
        <span aria-hidden className="block w-[11px] h-[11px] rounded-full bg-[#FF5F57]" />
        <span aria-hidden className="block w-[11px] h-[11px] rounded-full bg-[#FEBC2E]" />
        <span aria-hidden className="block w-[11px] h-[11px] rounded-full bg-[#28C840]" />
        <span className="flex-1 text-center font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted-soft">
          {filename}
        </span>
        <span className="w-[42px]" aria-hidden />
      </div>
      {/* Terminal body */}
      <div className="flex-1 px-5 md:px-7 py-5 md:py-6 overflow-hidden">
        <pre
          className="font-mono leading-[1.7] whitespace-pre"
          style={{ color: '#84C7AE', fontSize: 'clamp(10.5px, 0.95vw, 12.5px)' }}
        >
          {lines.join('\n')}
        </pre>
      </div>
    </div>
  );
}

function DashedArt() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
      <p className="font-mono text-[12px] tracking-[0.22em] uppercase text-muted/80">
        In Development
      </p>
      <div className="relative w-[180px] md:w-[220px] h-px bg-bone/10 overflow-hidden">
        <span aria-hidden className="dashed-progress" />
      </div>
      <p className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-flash/75">
        Early Alpha
      </p>
    </div>
  );
}

function MacbookFramedScreenshot({ src, alt }: { src?: string; alt: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center px-6 md:px-12 py-6 md:py-10 bg-ink">
      {/* Bezel — MacBook display ratio 16:10 */}
      <div className="relative w-full max-w-[640px] aspect-[16/10] rounded-[10px] bg-[#1c1c1c] p-[6px] md:p-[8px] shadow-[0_30px_60px_-25px_rgba(0,0,0,0.9)]">
        {/* Inner screen */}
        <div className="relative w-full h-full overflow-hidden rounded-[5px] bg-[#0d0d0d]">
          {/* Camera notch */}
          <span
            aria-hidden
            className="absolute top-[3px] left-1/2 -translate-x-1/2 z-10 block w-[5px] h-[5px] rounded-full bg-[#0a0a0a] ring-1 ring-[#1c1c1c]"
          />
          {src ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={src}
              alt={alt}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <div
              aria-hidden
              className="absolute inset-0 flex items-center justify-center font-mono text-[10px] tracking-[0.22em] uppercase text-muted-soft"
            >
              screenshot pending
            </div>
          )}
        </div>
      </div>
      {/* Subtle base/shadow sliver below the bezel */}
      <div
        aria-hidden
        className="absolute bottom-4 md:bottom-7 left-1/2 -translate-x-1/2 h-1 w-[58%] max-w-[660px] rounded-b-md bg-gradient-to-b from-[#1c1c1c] to-transparent"
      />
    </div>
  );
}

function AsciiArt({ caption }: { caption?: string }) {
  return (
    <div className="absolute inset-0 flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 md:px-6 overflow-hidden">
        <pre
          className="font-mono leading-[1.5] text-bone/85 whitespace-pre"
          style={{ fontSize: 'clamp(9px, 0.85vw, 12px)' }}
          aria-label="Fleet HQ architecture diagram"
        >
{`  ┌─────────────────────┐
  │       HQ            │
  │  `}<span className="text-flash ascii-pulse">◉</span>{` ceo · cfo · coo  │
  └──────┬──────────────┘
         │
   ┌─────┴─────┬─────────┬─────────┐
   ▼           ▼         ▼         ▼
 research  intelligence  ops    revenue
 [5 agt]   [4 agt]     [3 agt]  [22 agt]

  ─── shared coordination layer ───
        tmux · watcher · sse`}
        </pre>
      </div>
      {caption ? (
        <p className="border-t border-hairline px-5 md:px-7 py-3 font-mono text-[10px] md:text-[10.5px] tracking-[0.18em] uppercase text-muted-soft text-center shrink-0">
          {caption}
        </p>
      ) : null}
    </div>
  );
}
