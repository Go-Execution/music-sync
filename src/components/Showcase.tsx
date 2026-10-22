import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Award, ArrowUpRight } from 'lucide-react';
import { SHOWCASE_PLACEMENTS, TRACKS, type Track, type PlacementShowcase } from '@/data/tracks';
import { audioEngine } from '@/lib/audioEngine';
import { LiveEqualizer } from './Waveform';

export default function Showcase({
  onRequestLicense,
  currentPlayingTrack,
  isPlaying,
}: {
  onRequestLicense: (track: Track) => void;
  currentPlayingTrack: Track | null;
  isPlaying: boolean;
}) {
  const [activePlacement, setActivePlacement] = useState<PlacementShowcase>(SHOWCASE_PLACEMENTS[0]);

  const handlePlayPlacementTrack = (trackTitle: string) => {
    const track = TRACKS.find(
      (t) =>
        t.title.toLowerCase().includes(trackTitle.toLowerCase()) ||
        trackTitle.toLowerCase().includes(t.title.toLowerCase())
    );
    if (track) {
      audioEngine.toggle(track);
    }
  };

  return (
    <section id="showcase" className="relative bg-[#07080B] py-16 sm:py-28 border-t border-white/5 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 pb-8 sm:pb-12 border-b border-white/10">
          <div>
            <span className="font-mono text-[10px] sm:text-xs uppercase text-[#F59E0B] tracking-widest block mb-2">
              CURATED SYNC ARCHIVE
            </span>
            <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-extrabold text-white">
              CRAFTED FOR STORIES THAT RESONATE.
            </h2>
            <p className="mt-2 sm:mt-3 text-xs sm:text-base text-[#8E95A5] max-w-xl">
              From high-octane theatrical trailers to quiet festival character arcs, our repertoire
              is composed to meet the exact emotional timing of filmmakers and music supervisors.
            </p>
          </div>

          <div className="font-mono text-xs text-[#8E95A5] flex items-center gap-2">
            <Award className="h-4 w-4 text-[#FF2E4D]" />
            <span>Pre-Cleared Worldwide Rights</span>
          </div>
        </div>

        {/* Responsive Cinema Screen Card */}
        <div className="mt-8 sm:mt-12">
          <motion.div
            key={activePlacement.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-[#0C0E14] shadow-2xl min-h-[440px] sm:min-h-[380px] lg:min-h-[460px] flex flex-col justify-between p-5 sm:p-8"
          >
            {/* Background cinema still */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <img
                src={activePlacement.imageUrl}
                alt={activePlacement.projectTitle}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07080B] via-[#07080B]/60 to-[#07080B]/20" />
            </div>

            {/* Top tags */}
            <div className="relative z-10 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-black/70 px-3 py-1 font-mono text-[10px] sm:text-xs font-semibold text-white backdrop-blur-md border border-white/10">
                {activePlacement.category}
              </span>
              <span className="rounded-full bg-[#FF2E4D] px-3 py-1 font-mono text-[10px] sm:text-xs font-semibold text-white shadow-md">
                {activePlacement.clearanceSpeed}
              </span>
            </div>

            {/* Bottom details */}
            <div className="relative z-10 pt-8 sm:pt-0">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6">
                <div>
                  <span className="font-mono text-[11px] sm:text-xs text-[#FF2E4D] font-bold tracking-wider block">
                    {activePlacement.directorOrBrand} • {activePlacement.year}
                  </span>
                  <h3 className="font-display text-xl sm:text-3xl lg:text-4xl font-extrabold text-white mt-1 leading-tight">
                    {activePlacement.projectTitle}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-[#A4A9B5] max-w-xl leading-relaxed">
                    "{activePlacement.sceneDescription}"
                  </p>
                </div>

                {/* Actions: Clean responsive wrap */}
                <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-3 flex-shrink-0 pt-2 sm:pt-0">
                  <button
                    onClick={() => handlePlayPlacementTrack(activePlacement.trackTitle)}
                    className="flex-1 sm:flex-initial flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 sm:px-5 sm:py-3 font-display text-xs font-bold uppercase text-[#07080B] shadow-lg transition-colors hover:bg-[#FF2E4D] hover:text-white"
                  >
                    {isPlaying &&
                    currentPlayingTrack?.title.toLowerCase().includes(activePlacement.trackTitle.toLowerCase()) ? (
                      <>
                        <Pause className="h-4 w-4 fill-current" />
                        <LiveEqualizer active={true} barCount={4} color="#07080B" />
                        <span>Playing Track</span>
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4 fill-current" />
                        <span>Audition Track</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      const track = TRACKS.find(
                        (t) =>
                          t.title.toLowerCase().includes(activePlacement.trackTitle.toLowerCase()) ||
                          activePlacement.trackTitle.toLowerCase().includes(t.title.toLowerCase())
                      );
                      if (track) onRequestLicense(track);
                    }}
                    className="flex items-center justify-center gap-1.5 rounded-xl border border-white/20 bg-black/60 px-4 py-2.5 sm:px-5 sm:py-3 font-display text-xs font-bold uppercase text-white backdrop-blur-md transition-colors hover:border-[#FF2E4D] hover:bg-[#FF2E4D]"
                  >
                    <span>License</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Minimal Placement Thumbnails Switcher */}
          <div className="mt-4 sm:mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
            {SHOWCASE_PLACEMENTS.map((placement) => {
              const isActive = activePlacement.id === placement.id;
              return (
                <button
                  key={placement.id}
                  onClick={() => setActivePlacement(placement)}
                  className={`flex items-center gap-2.5 sm:gap-3 rounded-xl sm:rounded-2xl border p-2.5 sm:p-3 text-left transition-all ${
                    isActive
                      ? 'border-[#FF2E4D] bg-[#121420] shadow-md shadow-[#FF2E4D]/10'
                      : 'border-white/5 bg-[#0C0E14] hover:border-white/15'
                  }`}
                >
                  <div className="relative h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0 overflow-hidden rounded-lg sm:rounded-xl border border-white/10">
                    <img
                      src={placement.imageUrl}
                      alt={placement.projectTitle}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <span className="block font-mono text-[9px] uppercase text-[#FF2E4D] truncate">
                      {placement.category}
                    </span>
                    <h4 className="font-display text-xs font-bold text-white truncate">
                      {placement.projectTitle}
                    </h4>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
