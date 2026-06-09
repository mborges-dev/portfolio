import { SectionHeader } from './SectionHeader';
import { WorkCard, type Work as WorkType } from './WorkCard';

const works: WorkType[] = [
  {
    year: '2025',
    status: 'LIVE',
    statusExtra: 'Active',
    title: 'TheFacio',
    role: 'Founder & Engineer',
    description:
      'AI-powered customer service for restaurants and bars. WhatsApp conversations handled end-to-end by Claude agents — bookings, menu questions, complaints, all without human intervention.',
    stack: ['WhatsApp Cloud API', 'Claude', 'Supabase', 'Cloudflare Workers', 'n8n'],
    link: { label: 'thefacio.com', href: 'https://thefacio.com' },
  },
  {
    year: '2025',
    status: 'PRIVATE',
    title: 'DocFlow',
    role: 'Solo Builder',
    description:
      'Logistics dashboard with AI document extraction. Pilot built for a distribution company in Portugal — automating manual data entry across thousands of weekly delivery notes.',
    stack: ['OCR', 'GPT-4o Vision', 'Next.js', 'Supabase', 'Cloudflare'],
    noLinkLabel: 'Case study on request',
  },
  {
    year: '2026',
    status: 'ARCHITECTURE COMPLETE',
    statusExtra: 'Activating',
    title: 'Fleet HQ',
    role: 'Solo Architect & Builder',
    description:
      'A multi-agent orchestration system. 32 specialized agents running Claude Sonnet 4.6 in dedicated sessions, coordinated through a shared filesystem and an adaptive watcher daemon. Game-style HUD for human oversight. Local-first, no cloud dependencies, token economy enforced at the agent level.',
    stack: ['Claude', 'Multi-agent', 'tmux', 'Three.js', 'Bash', 'Node.js'],
    noLinkLabel: 'Architecture deep-dive on request',
    art: 'ascii',
    asciiCaption: '32 agents · Claude Sonnet 4.6 · Local-first',
  },
  {
    year: '2026',
    status: 'PRE-LAUNCH',
    statusExtra: 'v.2026.05',
    title: 'Almi',
    role: 'Co-Founder & Engineer',
    description:
      "Recruitment OS for Portuguese SMBs. AI-powered candidate scoring, pipeline tracking, interview automation, and people ops in a single platform. Built for teams that need to hire without spinning up an enterprise stack.",
    stack: ['Claude', 'Next.js', 'Supabase', 'Stripe'],
    noLinkLabel: 'Pre-launch · Available for first design partners',
    art: 'macbook',
    // Drop almi.png at /public/screenshots/almi.png and set:
    //   image: '/screenshots/almi.png',
    // Until then the macbook frame shows "screenshot pending"
  },
];

export function Work() {
  return (
    <section id="work" className="relative w-full px-6 md:px-10 py-20 md:py-40">
      <div className="mx-auto max-w-wide">
        <div className="section-enter" style={{ ['--d' as any]: '0ms' }}>
          <SectionHeader number="001" label="The work" title="Selected Work" />
        </div>

        <div className="flex flex-col gap-24 md:gap-[96px]">
          {works.map((w, i) => (
            <div
              key={w.title}
              className="section-enter"
              style={{ ['--d' as any]: `${100 + i * 100}ms` }}
            >
              <WorkCard work={w} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
