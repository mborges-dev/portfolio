import { SectionHeader } from './SectionHeader';

type Cell = {
  name: string;
  org?: string;
  description: string;
  example: string;
};

const alsoWorkingWith = [
  'OpenAI',
  'GPT-4o',
  'Tailwind',
  'WhatsApp Cloud API',
  'Stripe',
  'Resend',
];

const cells: Cell[] = [
  {
    name: 'Claude',
    org: 'Anthropic',
    description: 'Production agents, structured outputs, long-context document parsing.',
    example: 'Used for: WhatsApp agent persona, tool-use over restaurant menus, JSON extraction.',
  },
  {
    name: 'n8n',
    description: 'Self-hosted workflows orchestrating multi-step automations at scale.',
    example: 'Used for: lead enrichment, multi-channel notifications, cron-triggered ETL.',
  },
  {
    name: 'Supabase',
    description: 'Postgres, RLS, edge functions, real-time subscriptions.',
    example: 'Used for: customer state, vector search, row-level multi-tenant isolation.',
  },
  {
    name: 'Next.js 14',
    description: 'App Router, server components, streaming, RSCs.',
    example: 'Used for: dashboards, marketing sites, edge-rendered SSR APIs.',
  },
  {
    name: 'Cloudflare Workers',
    description: 'Edge compute, KV, R2, low-latency API gateways.',
    example: 'Used for: webhook fan-out, file pipelines, geo-aware routing.',
  },
  {
    name: 'TypeScript',
    description: 'Strict mode, type-safe APIs, no any.',
    example: 'Used for: every project — zod schemas at every boundary, never unknown shape.',
  },
];

export function Stack() {
  return (
    <section id="stack" className="relative w-full px-6 md:px-10 py-20 md:py-40">
      <div className="mx-auto max-w-wide">
        <div className="section-enter" style={{ ['--d' as any]: '0ms' }}>
          <SectionHeader title="Stack" />
        </div>

        <div className="section-enter" style={{ ['--d' as any]: '100ms' }}>
          <ul
            aria-label="Primary stack"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-hairline border border-hairline"
          >
            {cells.map((c) => (
              <li
                key={c.name}
                className="group relative bg-ink p-7 md:p-8 min-h-[170px] flex flex-col justify-between transition-colors hover:bg-bone/[0.02]"
              >
                <div>
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <h3 className="font-mono text-[16px] tracking-tight text-bone group-hover:text-flash transition-colors">
                      {c.name}
                    </h3>
                    {c.org ? (
                      <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted-soft">
                        · {c.org}
                      </span>
                    ) : null}
                  </div>
                </div>

                <div className="mt-6 relative min-h-[44px]">
                  <p className="text-[14px] leading-[1.55] text-muted transition-opacity duration-200 group-hover:opacity-0">
                    {c.description}
                  </p>
                  <p className="absolute inset-0 text-[14px] leading-[1.55] text-bone/80 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    {c.example}
                  </p>
                </div>

                {/* corner accent */}
                <span
                  aria-hidden
                  className="absolute top-0 left-0 w-[10px] h-px bg-flash scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"
                />
                <span
                  aria-hidden
                  className="absolute top-0 left-0 h-[10px] w-px bg-flash scale-y-0 origin-top transition-transform duration-300 group-hover:scale-y-100"
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="section-enter mt-12" style={{ ['--d' as any]: '200ms' }}>
          <p className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-muted-soft mb-4">
            Also working with
          </p>
          <ul className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[12.5px] text-muted leading-[1.6]">
            {alsoWorkingWith.map((tech, i) => (
              <li key={tech} className="flex items-center gap-3">
                <span className="hover:text-flash transition-colors cursor-default">{tech}</span>
                {i < alsoWorkingWith.length - 1 ? (
                  <span aria-hidden className="text-muted-faint select-none">·</span>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
