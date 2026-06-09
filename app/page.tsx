import { Nav } from '@/components/Nav';
import { Hero } from '@/components/Hero';
import { Work } from '@/components/Work';
import { Stack } from '@/components/Stack';
import { Services } from '@/components/Services';
import { About } from '@/components/About';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

export default function Page() {
  return (
    <main className="relative min-h-screen bg-ink text-bone">
      <Nav />
      <Hero />
      <Work />
      <Stack />
      <Services />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
