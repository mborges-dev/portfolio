import type { Metadata, Viewport } from 'next';
import { Inter_Tight, Instrument_Serif, JetBrains_Mono } from 'next/font/google';
import { GeistSans } from 'geist/font/sans';
import './globals.css';

const displaySerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-display',
});

const heroBlack = Inter_Tight({
  subsets: ['latin'],
  weight: '900',
  display: 'swap',
  variable: '--font-hero',
});

const bodySans = GeistSans;

const mono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
});

const SITE_URL = 'https://miguelborges.dev';
const SITE_TITLE = 'Miguel Borges — AI Engineer';
const SITE_DESCRIPTION =
  'AI Engineer based in Lisbon. Production AI systems, multi-agent orchestration, document pipelines, automations driving real backends. Available for select contract work.';
const OG_IMAGE = `${SITE_URL}/og.png`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: SITE_TITLE,
    description:
      'Production AI systems, multi-agent orchestration, document pipelines, automations driving real backends. Based in Lisbon.',
    url: SITE_URL,
    siteName: 'Miguel Borges',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Miguel Borges — AI Engineer based in Lisbon',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description:
      'Production AI systems, multi-agent orchestration, document pipelines. Based in Lisbon.',
    images: [OG_IMAGE],
  },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
  },
};

export const viewport: Viewport = {
  themeColor: '#0A0A0A',
  width: 'device-width',
  initialScale: 1,
};

// JSON-LD Person + WebSite structured data. Inlined into <head> so it
// ships with the static export and is indexed by search engines on first
// crawl. Single combined payload — schema.org allows @graph for multiple nodes.
const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${SITE_URL}#person`,
      name: 'Miguel Borges',
      url: SITE_URL,
      image: OG_IMAGE,
      jobTitle: 'AI Engineer',
      description:
        'Production AI systems, multi-agent orchestration, document pipelines, automations.',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Lisbon',
        addressCountry: 'PT',
      },
      knowsAbout: [
        'Artificial Intelligence',
        'Large Language Models',
        'Multi-agent Systems',
        'Claude',
        'OpenAI GPT',
        'n8n',
        'Supabase',
        'Cloudflare Workers',
        'Next.js',
        'TypeScript',
        'WhatsApp Cloud API',
        'Document AI',
        'Vision Models',
        'RAG',
      ],
      sameAs: [
        'https://www.linkedin.com/in/miguelcborges/',
        'https://github.com/mborges-dev',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}#website`,
      name: 'Miguel Borges',
      url: SITE_URL,
      author: { '@id': `${SITE_URL}#person` },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${displaySerif.variable} ${heroBlack.variable} ${bodySans.variable} ${mono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          // Inline JSON-LD payload. <script type="application/ld+json"> is
          // non-executable — browsers and crawlers just read the contents.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
