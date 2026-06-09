import { SectionHeader } from './SectionHeader';

export function About() {
  return (
    <section id="about" className="relative w-full px-6 md:px-10 py-20 md:py-40">
      <div className="mx-auto max-w-wide">
        <div className="section-enter" style={{ ['--d' as any]: '0ms' }}>
          <SectionHeader title="About" />
        </div>

        <div
          className="section-enter grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start"
          style={{ ['--d' as any]: '100ms' }}
        >
          {/* Photo column — order-first on mobile so it stacks above text */}
          <div className="md:col-span-5 md:order-2 flex md:justify-end">
            <figure className="w-full max-w-[260px] md:max-w-[360px]">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[4px] border border-hairline bg-[#0d0d0d]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/miguel.jpeg"
                  alt="Miguel Borges in Lisbon, three-quarter portrait"
                  width={704}
                  height={1527}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ filter: 'grayscale(20%)' }}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <figcaption className="mt-4 font-mono text-[10.5px] tracking-[0.18em] uppercase text-muted-soft">
                Lisbon · 2026
              </figcaption>
            </figure>
          </div>

          {/* Text column */}
          <div className="md:col-span-7 md:order-1 space-y-6 text-[18px] leading-[1.65] text-muted">
            <p>
              I build AI products that ship. Not prototypes, not demos —
              production systems running LLMs in the loop: customer-facing
              agents, RAG over messy real-world data, document pipelines
              with vision models, automations orchestrating Claude and GPT
              against real backends. Based in Lisbon. Mostly self-taught,
              fully self-shipped.
            </p>
            <p>
              I work embedded in small teams where decisions move fast and
              code ships weekly. I don&apos;t pitch — I deliver. If your
              roadmap is moving slower than your ambition, I&apos;m the
              senior pair of hands on the AI / agents layer that fixes
              that.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
