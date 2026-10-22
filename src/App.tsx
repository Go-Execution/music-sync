import { useState, useCallback, useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import MusicCatalog from '@/components/MusicCatalog';
import Showcase from '@/components/Showcase';
import Services from '@/components/Services';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import AudioPlayerBar from '@/components/AudioPlayerBar';
import type { Track } from '@/data/tracks';
import { audioEngine } from '@/lib/audioEngine';

export default function App() {
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(audioEngine.getState().currentTrack);
  const [isPlaying, setIsPlaying] = useState<boolean>(audioEngine.getState().isPlaying);

  useEffect(() => {
    // Low-frequency listener: Only fires when track or playing status actually changes!
    const unsub = audioEngine.subscribeTrack((track, playing) => {
      setCurrentTrack(track);
      setIsPlaying(playing);
    });
    return unsub;
  }, []);

  const handleRequestLicense = useCallback((track: Track) => {
    setSelectedTrack(track);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#07080B] text-[#A4A9B5] overflow-x-hidden selection:bg-[#FF2E4D] selection:text-white">
      <Header />
      <main>
        <Hero />
        <MusicCatalog
          onRequestLicense={handleRequestLicense}
          currentPlayingTrack={currentTrack}
          isPlaying={isPlaying}
        />
        <Showcase
          onRequestLicense={handleRequestLicense}
          currentPlayingTrack={currentTrack}
          isPlaying={isPlaying}
        />
        <Services />
        <Contact preselectedTrack={selectedTrack} />
      </main>
      <Footer />

      {/* Persistent bottom audio player bar */}
      <AudioPlayerBar onRequestLicense={handleRequestLicense} />
    </div>
  );
}
