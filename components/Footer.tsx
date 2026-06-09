export function Footer() {
  return (
    <footer className="border-t border-hairline">
      <div className="mx-auto max-w-wide px-6 md:px-10 h-20 flex flex-col md:flex-row md:items-center md:justify-between gap-2 py-5 md:py-0">
        <span className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-muted-soft">
          © 2026 · Miguel Borges · Lisbon
        </span>
        <span className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-muted-soft">
          Built in Next.js · Hosted on Cloudflare
        </span>
      </div>
    </footer>
  );
}
