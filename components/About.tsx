import { SectionHeader } from './SectionHeader';

export function About() {
  return (
    <section id="about" className="relative w-full px-6 md:px-10 py-20 md:py-40">
      <div className="mx-auto max-w-wide">
        <div className="section-enter" style={{ ['--d' as any]: '0ms' }}>
          <SectionHeader title="About" />
        </div>

        <div
          className="section-enter max-w-[720px] space-y-8 text-[18px] leading-[1.7] text-muted"
          style={{ ['--d' as any]: '100ms' }}
        >
          <p>
            I build AI products that ship. Not prototypes, not demos —
            production systems running LLMs in the loop: customer-facing
            agents, multi-agent orchestration, document pipelines with
            vision models. Based in Lisbon. Mostly self-taught, fully
            self-shipped.
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
    </section>
  );
}
