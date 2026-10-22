import { useState, useCallback } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import MusicCatalog from '@/components/MusicCatalog';
import Services from '@/components/Services';
import WhyWorkWithUs from '@/components/WhyWorkWithUs';
import CTABanner from '@/components/CTABanner';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import type { Track } from '@/data/tracks';

export default function App() {
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);

  const handleRequestLicense = useCallback((track: Track) => {
    setSelectedTrack(track);
  }, []);

  return (
    <div className="relative min-h-screen bg-pitch-black">
      <Header />
      <main>
        <Hero />
        <About />
        <MusicCatalog onRequestLicense={handleRequestLicense} />
        <Services />
        <WhyWorkWithUs />
        <CTABanner />
        <Contact preselectedTrack={selectedTrack} />
      </main>
      <Footer />
    </div>
  );
}
