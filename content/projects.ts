/**
 * Deep-dive content shown inside the per-card modal on Selected Work.
 * Keyed by project slug — matches Work.tsx entries.
 */

/** A CTA that opens an external URL */
export type CtaExternal = { label: string; href: string };

/** A CTA that closes the modal and scrolls to #contact, optionally pre-filling
 *  the subject line (read by Contact via sessionStorage). */
export type CtaContact = {
  label: string;
  action: 'contact';
  subject?: string;
};

/** A CTA that, on click, opens an inline waitlist form below the button. */
export type CtaWaitlist = {
  label: string;
  action: 'waitlist';
  /** Subject line used for the waitlist signup email (Formspree _subject). */
  subject?: string;
  /** Hidden source field — helps you filter waitlist signups in your inbox. */
  source?: string;
};

export type InlineImagePlacement =
  | 'after-header'
  | 'after-approach'
  | 'after-stack-rationale';

export type InlineImage = {
  src: string;
  caption?: string;
  /** Frame chrome — Mac (browser-style with traffic lights) or iPhone (notched, rounded) */
  frame: 'mac' | 'iphone';
  /** Where in the deep-dive flow this image renders */
  placement: InlineImagePlacement;
  /** Optional CSS max-width for the figure wrapper (e.g. '800px') */
  maxWidth?: string;
  /** Optional accent treatment — 'flash' adds a subtle green border + inner glow */
  accent?: 'flash';
};

export type ProjectDeepDive = {
  /** Optional override for the modal's metadata line (year · status · extra).
   *  Set `statusDot: true` to render a pulsing flash-green dot before status. */
  meta?: {
    year: string;
    status: string;
    statusExtra?: string;
    statusDot?: boolean;
  };
  /** Short serif-italic line shown under the metadata */
  tagline?: string;
  /** 1–2 short paragraphs framing the problem this project solves */
  problem: string[];
  /** Approach summary followed by 3–5 bullet points (split on " — " for emphasis) */
  approach: {
    intro: string;
    bullets: string[];
  };
  /** Inline screenshots — rendered at their assigned placement points */
  inlineImages?: InlineImage[];
  /** 1–2 paragraphs explaining WHY these tools (and not others) */
  stackRationale: string[];
  /** Optional architecture description — ASCII diagram, markdown, or prose */
  architecture?: string;
  /** Honest paragraph about where the project is now */
  currentState: string;
  /** Legacy single-CTA — kept for older project entries */
  cta?: {
    label: string;
    href?: string;
  };
  /** Primary + secondary CTA footer.
   *  Primary supports external link, internal "contact" action, or an inline
   *  "waitlist" form that slides down below the button on click. */
  ctas?: {
    primary: CtaExternal | CtaContact | CtaWaitlist;
    secondary?: CtaContact;
  };
};

export const projectDeepDives: Record<string, ProjectDeepDive> = {
  thefacio: {
    meta: { year: '2026', status: 'LIVE', statusExtra: 'PRE-REVENUE' },
    tagline: 'AI customer service for restaurants and bars on WhatsApp',
    problem: [
      'Restaurants and bars in Portugal live on WhatsApp. Reservations, menu questions, complaints, opening hours — every message comes through there. Owners answer manually between shifts, miss conversations after hours, lose customers who go quiet when no one replies. The bigger the place, the worse it gets. The bar that closes at 2am still has someone messaging at 11pm Friday — and no one’s there to answer. In 2026, WhatsApp is the primary customer channel in Portugal, but most independent venues still treat it like a personal inbox.',
    ],
    approach: {
      intro:
        'TheFacio is the AI customer service layer for those venues. Not an app to install. Not another dashboard. The customer messages WhatsApp like they always do — TheFacio answers in seconds, in natural Portuguese, with the venue’s menu, hours, policies, and personality.',
      bullets: [
        'WhatsApp Cloud API as the channel — meet customers where they already are, no app to download, no friction',
        'Claude as the brain — multi-turn conversations in natural Portuguese, context retention across the session',
        'Multi-tenant from day one — each venue has its own agent, menu, voice, hours, escalation rules',
        'Setup measured in hours, not weeks — onboarding flow built for non-technical owners',
        'Human handoff when needed — staff get pinged for what actually requires a human',
      ],
    },
    stackRationale: [
      'WhatsApp Cloud API instead of building a chat widget no one would install, or competing with platforms like Tidio or Intercom that aren’t built for Portuguese small businesses. Claude over GPT for the Portuguese language quality and the price-performance at scale. Cloudflare Workers proxy every API call so credentials never leave the edge, and Supabase keeps tenant state, message history, and analytics in a single place. n8n orchestrates the cross-platform pieces so we own the full pipeline without paying for ten SaaS subscriptions per venue.',
    ],
    architecture:
      'WhatsApp Cloud API → Cloudflare Worker (auth + rate limiting) → Claude → Supabase (tenant config + history) → optional handoff to staff',
    currentState:
      'Live in production at thefacio.com. Cloudflare infrastructure deployed, Anthropic API integration running, WhatsApp Business set up, outreach sequence designed and tested with Lisbon and Porto venues. ~2,000 venue leads scraped via custom n8n Google Maps pipeline. Pre-revenue: actively in outbound to first paying customers. Next milestone: first 3 paying venues, then formalize the productized service tier.',
    ctas: {
      primary: { label: 'Visit thefacio.com', href: 'https://thefacio.com' },
      secondary: {
        label: 'Discuss a use case',
        action: 'contact',
        subject: 'TheFacio inquiry',
      },
    },
  },

  docflow: {
    meta: { year: '2026', status: 'PRIVATE PILOT' },
    tagline: 'AI-powered document operations for legacy enterprises',
    problem: [
      'Large traditional companies in Portugal still run on paper. Delivery notes, supplier invoices, service orders, employee documentation, warehouse movements — all generated as physical documents that someone, somewhere, has to manually enter into SAP or another ERP. One of the largest food distribution companies in Portugal had 200,000+ historical documents waiting to be digitized, on top of thousands of new documents flowing in every week from drivers, warehouses, suppliers, and field technicians. The cost wasn’t just time. It was every typo, every misfiled document, every delivery dispute that couldn’t be resolved because no one could find the paper trail.',
    ],
    approach: {
      intro:
        'DocFlow is the document operations layer for enterprises that can’t afford to wait for digital transformation. A mobile app for field workers to capture documents at the source, a web dashboard for operations to review and approve, and an AI engine in between that reads, structures, validates, and pushes clean data into SAP — with zero manual entry.',
      bullets: [
        'Mobile-first capture — drivers, technicians, and warehouse staff photograph documents directly from where the work happens',
        'Multi-engine OCR + Vision — local OCR for predictable formats, GPT-4o Vision for handwritten or low-quality scans, Claude for structured extraction',
        'Document type detection — invoices, delivery notes, service orders, contracts each get routed to specialized extraction pipelines',
        'Real-time validation — NIF checks, duplicate detection, SAP master data lookups before anything is committed',
        'Direct SAP S/4HANA integration — extracted data lands in the right module with the right metadata, no human in the loop',
        'Full audit trail — every document, every extraction, every approval is traceable for compliance',
      ],
    },
    inlineImages: [
      {
        src: '/screenshots/docflow-web.png',
        caption:
          'Web dashboard — multi-engine pipeline with live SAP integration',
        frame: 'mac',
        placement: 'after-approach',
      },
      {
        src: '/screenshots/docflow-mobile.png',
        caption:
          'Mobile capture — field workers photograph documents from where the work happens',
        frame: 'iphone',
        placement: 'after-stack-rationale',
      },
    ],
    stackRationale: [
      'Multi-engine extraction instead of a single AI model — different document types have different failure modes, and routing them to the right engine cuts cost and improves accuracy. Mobile-first because the document doesn’t exist in a clean PDF on a desktop — it exists in a driver’s hands at a loading dock. Next.js + Supabase + Cloudflare for the dashboard side because edge deployment matters when operations span warehouses across the country. SAP S/4HANA integration over building a custom ERP module because enterprises don’t want another system — they want their existing system to stop requiring manual entry.',
    ],
    architecture:
      'Mobile app → Cloudflare Worker (auth, ingestion) → OCR / GPT-4o Vision / Claude (extraction pipeline) → Validation engine → Supabase (audit + state) → SAP S/4HANA',
    currentState:
      'Private pilot with a major Portuguese distribution enterprise. Working demo with synthetic documents matching the client’s real format. Mobile app and web dashboard built. Multi-engine extraction pipeline operational. SAP integration designed and validated against client’s environment. Status: pre-rollout. The architecture scales beyond invoices and delivery notes — assistance orders, supplier invoices, warehouse movements, HR documentation are all natural next verticals using the same foundation.',
    ctas: {
      primary: {
        label: 'Discuss a private demo',
        action: 'contact',
        subject: 'DocFlow demo request',
      },
    },
  },

  'fleet-hq': {
    meta: {
      year: '2026',
      status: 'IN PRODUCTION',
      statusExtra: '38 AGENTS',
      statusDot: true,
    },
    tagline: 'Multi-agent orchestration for autonomous business operations',
    problem: [
      'Single-agent LLM systems hit a ceiling fast. An agent that tries to do everything ends up doing nothing well — context windows fill up, decisions get muddled, costs spiral. The real unlock isn’t one bigger model. It’s many smaller, specialized agents with their own memory and personality, coordinating against shared goals, with a human in the loop only where it actually matters. But running 30+ agents simultaneously without infrastructure means chaos: agents stepping on each other, costs running wild, no observability, no way to course-correct without restarting everything.',
    ],
    approach: {
      intro:
        'Fleet HQ is the operating system for that problem. 38 specialized agents organized into command, support, and revenue verticals, each running Claude Sonnet 4.6 in a dedicated tmux session — with its own persistent memory and distinct personality. A game-aesthetic command bridge gives the human one screen to oversee everything: agents asking questions, proposals waiting for approval, ventures progressing, daily P&L. Local-first, no cloud dependencies, no SaaS subscriptions.',
      bullets: [
        'Each agent specialized in one job — researcher, analyst, copywriter, ad operator, vendor rater — no overlap, no role confusion',
        'Persistent memory and personality per agent — agents remember context, develop opinions, build domain expertise over time',
        'Shared filesystem coordination — agents communicate through structured messages, propose actions, request human approval through a single inbox',
        'Adaptive watcher daemon — replaces fragile orchestration code with event-driven coordination across all 38 sessions',
        'Game-style HUD — keyboard hotkeys, world map, live event ticker, Approval/Asks/Chat/Ventures/Schedule panels',
        'Token economy enforced per agent — daily budgets, cost tracking, automatic throttling when limits approach',
        'Local-first architecture — no cloud agent platforms, no SaaS dependencies, full data ownership',
      ],
    },
    inlineImages: [
      {
        src: '/screenshots/fleet-hq-loading.png',
        caption: 'FLEET HQ — multi-world AI agent operations',
        frame: 'mac',
        placement: 'after-header',
        maxWidth: '900px',
        accent: 'flash',
      },
      {
        src: '/screenshots/fleet-hq-map.png',
        caption:
          'Command bridge — 8 verticals, 38 agents, real-time coordination',
        frame: 'mac',
        placement: 'after-approach',
        maxWidth: '1000px',
        accent: 'flash',
      },
      {
        src: '/screenshots/fleet-hq-vertical.png',
        caption: 'Vertical detail — agents, ventures, approval queue per world',
        frame: 'mac',
        placement: 'after-stack-rationale',
        maxWidth: '1000px',
        accent: 'flash',
      },
    ],
    stackRationale: [
      'Claude Sonnet 4.6 across all agents for consistency, long-context reasoning, and agentic behavior. tmux sessions instead of a process manager — each agent gets persistent state, can be inspected live, and survives restarts gracefully. Node.js watcher daemon for event-driven coordination over a shared filesystem — no message queue, no broker, no SaaS lock-in. SSE for real-time streaming to the dashboard. Three.js for the 3D command bridge because game-like HUDs are the right metaphor for multi-agent oversight — spreadsheets don’t scale to 38 entities. SQLite + filesystem for state — no cloud database, no vendor dependency, fully portable.',
    ],
    architecture:
      'Watcher daemon (Node.js) → agent sessions (tmux × 38) → shared filesystem (state + messages + memory) → SSE stream → Three.js command bridge (web)',
    currentState:
      'In production. 38 agents organized across 8 verticals — command, research, intelligence, and revenue operations. Each agent runs Claude Sonnet 4.6 with persistent memory and a distinct personality. Adaptive watcher daemon coordinates state. Three.js command bridge for oversight. Local-first architecture, no cloud dependencies. Currently scaling agent count and refining inter-agent protocols.',
    ctas: {
      primary: {
        label: 'Architecture deep-dive on request',
        action: 'contact',
        subject: 'Fleet HQ architecture inquiry',
      },
    },
  },

  almi: {
    tagline: 'The HR Operating System for Portuguese SMBs',
    problem: [
      'Mid-sized Portuguese companies are stuck between two bad options for HR. Either they hand the work to people ops generalists drowning in tools — an ATS for hiring, a different system for documents, spreadsheets for leave, another tool for payroll, all stitched together with email. Or they buy enterprise HR platforms designed for companies 10x their size, built around workflows they don’t have and priced for budgets they don’t have. The result: hiring drags, documents expire unnoticed, compliance becomes an annual fire drill, and the founder ends up running payroll at 11pm on a Sunday.',
    ],
    approach: {
      intro:
        'Almi is the operating system for the entire HR function. Recruitment, people management, documents, leave, compliance, and the legal calendar — in one platform, designed for Portuguese SMBs from day one, not retrofitted from a US enterprise product. AI woven through every module: not as a gimmick layer on top, but as the core that makes the whole system feel one person smaller than it actually needs.',
      bullets: [
        'Recruitment pipeline — AI candidate scoring, voice-based screen calls in Portuguese, interview scheduling with AI-generated question scripts, manager-side decision flow',
        'People & Team — employee profiles, org chart, departments, career events, salary history, document trails',
        'Document Management — uploads, signatures, AI summaries, semantic search via pgvector, expiration alerts',
        'Leave & Absences — configurable policies, Portuguese public holidays, working-day calculation, year-end carry-over',
        'Compliance & Legal — automatic legal obligations calendar, compliance checker, document generator for Portuguese labor law',
        'HR Assistant — chatbot trained on Portuguese labor law and the company’s own policies, available across every screen',
        'Per-tenant branding — every client-facing email and application page uses the client’s logo, not ours',
        'Accountant program — multi-tenant dashboard for accounting firms managing HR for multiple SMB clients',
      ],
    },
    inlineImages: [
      {
        src: '/screenshots/almi-welcome.png',
        caption: 'Almi — v.2026.05',
        frame: 'mac',
        placement: 'after-header',
        maxWidth: '800px',
      },
      {
        src: '/screenshots/almi-dashboard.png',
        caption:
          'Dashboard — recruitment, pipeline, AI scoring, activity in one view',
        frame: 'mac',
        placement: 'after-approach',
        maxWidth: '900px',
      },
      {
        src: '/screenshots/almi-kanban.png',
        caption:
          'Pipeline Kanban — dual-threshold AI scoring with bottleneck detection',
        frame: 'mac',
        placement: 'after-approach',
        maxWidth: '900px',
      },
      {
        src: '/screenshots/almi-assistant.png',
        caption:
          'HR Assistant — trained on Portuguese labor law and company policy',
        frame: 'mac',
        placement: 'after-stack-rationale',
        maxWidth: '900px',
      },
    ],
    stackRationale: [
      'Next.js 16 with Turbopack for fast iteration on a feature-heavy admin spanning seven modules. Supabase + pgvector for everything — auth, application data, semantic document search — one database instead of five SaaS subscriptions. Anthropic Claude Sonnet 4.6 for the AI scoring, HR assistant, and document intelligence because Portuguese language quality at this depth matters more than benchmark numbers. ElevenLabs + Bland.ai for the screen call voice — generic AI voices kill conversion, a warm Portuguese voice gets candidates to actually finish the call. Vercel for edge deployment. Stripe for tiered subscription billing. Everything chosen to ship fast, scale predictably, and stay maintainable as a small team.',
    ],
    architecture:
      'Next.js (Vercel) → Anthropic Claude (scoring + assistant + summaries) + OpenAI embeddings (semantic search) → Supabase Postgres + pgvector → Bland.ai + ElevenLabs (voice calls) → SendGrid + Calendly + Fireflies.ai (ops) → Stripe (billing)',
    currentState:
      'Pre-launch, v.2026.05. Full platform built across all seven modules — recruitment, people, documents, leave, compliance, legal, HR assistant. Currently in private iteration before opening to first users. A lighter product line, Almi Lite, is in design for companies under 50 employees: leaner interface focused on operations and compliance, leaving recruitment as a premium tier. An accountant partner program will let accounting firms manage HR for multiple SMB clients from a single multi-tenant dashboard.',
    ctas: {
      primary: {
        label: 'Get notified at launch',
        action: 'waitlist',
        subject: 'Almi — waitlist signup',
        source: 'almi-modal',
      },
    },
  },
};

/** Derives the lookup slug from a project title. */
export function slugFor(title: string): string {
  return title
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}
