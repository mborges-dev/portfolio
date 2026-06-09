import { SectionHeader } from './SectionHeader';

type Row = {
  label: string;
  description: string;
};

const rows: Row[] = [
  {
    label: 'AI & LLM Integration',
    description: 'Production-ready pipelines with Claude, GPT, RAG.',
  },
  {
    label: 'Automation & Workflows',
    description: 'n8n, custom backends, data pipelines.',
  },
  {
    label: 'Full-stack Product Work',
    description: 'Next.js, Supabase, Cloudflare, end-to-end builds.',
  },
];

export function Services() {
  return (
    <section id="services" className="relative w-full px-6 md:px-10 py-20 md:py-40">
      <div className="mx-auto max-w-wide">
        <div className="section-enter" style={{ ['--d' as any]: '0ms' }}>
          <SectionHeader title="Services" />
        </div>

        <div className="section-enter" style={{ ['--d' as any]: '100ms' }}>
          <ul className="border-t border-hairline">
            {rows.map((r) => (
              <li
                key={r.label}
                className="group grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-10 py-8 md:py-10 border-b border-hairline transition-colors hover:bg-bone/[0.015]"
              >
                <div className="md:col-span-4 flex items-center">
                  <h3 className="font-mono text-[12px] tracking-[0.18em] uppercase text-bone group-hover:text-flash transition-colors">
                    {r.label}
                  </h3>
                </div>
                <div className="md:col-span-8 flex items-center">
                  <p className="text-[18px] leading-[1.5] text-muted">{r.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="section-enter mt-10" style={{ ['--d' as any]: '200ms' }}>
          <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-muted-soft">
            Contract part-time · 15–25h/week · Remote
          </p>
        </div>
      </div>
    </section>
  );
}
