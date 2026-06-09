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

export const metadata: Metadata = {
  metadataBase: new URL('https://miguelborges.dev'),
  title: 'Miguel Borges — AI Engineer',
  description:
    'I build AI products that ship. Not prototypes, not demos — production systems running LLMs in the loop: customer-facing agents, RAG over messy real-world data, document pipelines with vision models, automations orchestrating Claude and GPT against real backends. Based in Lisbon.',
  openGraph: {
    title: 'Miguel Borges — AI Engineer',
    description:
      'Production AI systems, agents, RAG, and document pipelines. Based in Lisbon. Available for select contract work.',
    type: 'website',
    images: ['/og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Miguel Borges — AI Engineer',
    description:
      'Production AI systems, agents, RAG, and document pipelines. Based in Lisbon.',
    images: ['/og.png'],
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${displaySerif.variable} ${heroBlack.variable} ${bodySans.variable} ${mono.variable}`}
    >
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
