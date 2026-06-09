const ITEMS = [
  'CLAUDE',
  'OPENAI',
  'SUPABASE',
  'CLOUDFLARE',
  'N8N',
  'NEXT.JS',
  'TYPESCRIPT',
  'POSTGRES',
  'ANTHROPIC',
];

export function Marquee() {
  // Duplicate so the linear translateX(-50%) makes a seamless loop.
  const items = [...ITEMS, ...ITEMS];

  return (
    <div className="border-t border-hairline py-7 marquee" aria-hidden>
      <div className="marquee-track gap-12 pr-12">
        {items.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="font-mono text-[12px] tracking-[0.22em] text-muted-soft whitespace-nowrap flex items-center gap-12 pr-12"
          >
            {item}
            <span className="text-muted/25">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
