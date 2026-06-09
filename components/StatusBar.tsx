export function StatusBar() {
  return (
    <div className="border-y border-hairline">
      <div className="mx-auto max-w-wide px-6 md:px-10 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3 font-mono text-[10.5px] tracking-[0.18em] uppercase text-muted">
        <span>Last updated · 02 Jun 2026</span>
        <span className="inline-flex items-center gap-3">
          <span className="pulse-ring" aria-hidden />
          <span>Available from June 15</span>
        </span>
        <span>Built in Next.js</span>
      </div>
    </div>
  );
}
