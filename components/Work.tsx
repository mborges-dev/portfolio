'use client';

import { useState } from 'react';
import { SectionHeader } from './SectionHeader';
import { WorkCard, type Work as WorkType } from './WorkCard';
import { WorkModal } from './WorkModal';

const works: WorkType[] = [
  {
    year: '2026',
    status: 'LIVE',
    statusExtra: 'PRE-REVENUE',
    title: 'TheFacio',
    role: 'Founder & Engineer',
    description:
      'AI-powered customer service for restaurants and bars. WhatsApp conversations handled end-to-end by Claude agents — bookings, menu questions, complaints, all without human intervention.',
    stack: ['WhatsApp Cloud API', 'Claude', 'Supabase', 'Cloudflare Workers', 'n8n'],
    link: { label: 'thefacio.com', href: 'https://thefacio.com' },
    art: 'browser',
    videoSrc: '/videos/thefacio_scroll_final.mp4',
    videoWebmSrc: '/videos/thefacio_scroll_final.webm',
    browserUrl: 'thefacio.com',
  },
  {
    year: '2026',
    status: 'PRIVATE',
    title: 'DocFlow',
    role: 'Solo Engineer & Builder',
    description:
      'Logistics dashboard with AI document extraction. Pilot built for a distribution company in Portugal — automating manual data entry across thousands of weekly delivery notes.',
    stack: ['OCR', 'GPT-4o Vision', 'Next.js', 'Supabase', 'Cloudflare'],
    noLinkLabel: 'Case study on request',
    art: 'duo',
    browserUrl: 'docflow.internal',
    image: '/screenshots/docflow-web.png',
    mobileImage: '/screenshots/docflow-mobile.png',
  },
  {
    year: '2026',
    status: 'IN PRODUCTION',
    statusExtra: '38 AGENTS',
    title: 'Fleet HQ',
    role: 'Solo Architect & Builder',
    description:
      'A multi-agent orchestration system. 38 specialized agents running Claude Sonnet 4.6 in dedicated sessions, coordinated through a shared filesystem and an adaptive watcher daemon. Game-style HUD for human oversight. Local-first, no cloud dependencies, token economy enforced at the agent level.',
    stack: ['Claude', 'Multi-agent', 'tmux', 'Three.js', 'Bash', 'Node.js'],
    noLinkLabel: 'Architecture deep-dive on request',
    art: 'carousel',
    browserUrl: 'fleet-hq.local',
    images: [
      '/screenshots/fleet-hq-loading.png',
      '/screenshots/fleet-hq-map.png',
      '/screenshots/fleet-hq-3.png',
      '/screenshots/fleet-hq-vertical.png',
    ],
    asciiCaption: '38 agents · multi-world orchestration',
  },
  {
    year: '2026',
    status: 'PRE-LAUNCH',
    statusExtra: 'v.2026.05',
    title: 'Almi',
    role: 'Co-Founder & Engineer',
    description:
      "The HR Operating System for Portuguese SMBs. Recruitment, documents, leave, compliance, and HR assistant — in one platform, designed for Portuguese SMBs from day one. AI woven through every module.",
    stack: ['Claude', 'Next.js', 'Supabase', 'Stripe'],
    image: '/screenshots/almi.png',
    art: 'mac',
    browserUrl: 'almi.app',
  },
];

export function Work() {
  const [active, setActive] = useState<WorkType | null>(null);

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
              <WorkCard
                work={w}
                index={i}
                onOpen={() => setActive(w)}
              />
            </div>
          ))}
        </div>
      </div>

      <WorkModal project={active} onClose={() => setActive(null)} />
    </section>
  );
}
