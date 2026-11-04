import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Award, ArrowUpRight, Clapperboard, Radio, Film } from 'lucide-react';
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
  const [timecodeFrames, setTimecodeFrames] = useState<number>(14);

  // Timecode counter simulation when playing
  useEffect(() => {
    if (!isPlaying) return;
    const interval = window.setInterval(() => {
      setTimecodeFrames((prev) => (prev + 1) % 60);
    }, 100);
    return () => clearInterval(interval);
  }, [isPlaying]);

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

  const isCurrentActivePlaying =
    isPlaying &&
    currentPlayingTrack?.title.toLowerCase().includes(activePlacement.trackTitle.toLowerCase());

  return (
    <section id="showcase" className="relative bg-[#07080B] py-20 sm:py-32 border-t border-white/5 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[800px] rounded-full bg-[#FF2E4D]/5 blur-[160px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 pb-8 sm:pb-12 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[10px] sm:text-xs uppercase text-[#F59E0B] tracking-widest mb-3">
              <Film className="h-3 w-3" />
              <span>SOUND STAGE &amp; SCENE SYNC SIMULATOR</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white">
              CRAFTED FOR STORIES THAT RESONATE.
            </h2>
            <p className="mt-2 sm:mt-3 text-xs sm:text-base text-[#8E95A5] max-w-xl">
              From high-octane theatrical trailers to subtle documentary character arcs, our repertoire
              is composed to hit the exact edit points, dialogue dips, and dramatic peaks of modern directors.
            </p>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs text-[#8E95A5] border border-white/10 bg-white/5 px-3.5 py-2 rounded-xl">
            <Award className="h-4 w-4 text-[#FF2E4D]" />
            <span className="text-white font-semibold">100% Pre-Cleared Worldwide Rights</span>
          </div>
        </div>

        {/* Dynamic Sound Stage Cinema Screen */}
        <div className="mt-8 sm:mt-12">
          <motion.div
            key={activePlacement.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/15 bg-[#0C0E14] shadow-2xl min-h-[480px] sm:min-h-[420px] lg:min-h-[500px] flex flex-col justify-between p-5 sm:p-8"
          >
            {/* Background cinema still with subtle zoom */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <img
                src={activePlacement.imageUrl}
                alt={activePlacement.projectTitle}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07080B] via-[#07080B]/60 to-[#07080B]/30" />
            </div>

            {/* Top Sound Stage Bar: Timecode + Sound VU Meter */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-black/80 px-3 py-1 font-mono text-[10px] sm:text-xs font-semibold text-white backdrop-blur-md border border-white/15 flex items-center gap-1.5">
                  <Clapperboard className="h-3 w-3 text-[#FF2E4D]" />
                  <span>{activePlacement.category}</span>
                </span>

                <span className="rounded-full bg-[#FF2E4D] px-3 py-1 font-mono text-[10px] sm:text-xs font-bold text-white shadow-md">
                  {activePlacement.clearanceSpeed}
                </span>
              </div>

              {/* Digital Timecode & Live Audio VU Meters */}
              <div className="flex items-center gap-4 bg-black/70 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-xl font-mono text-xs">
                <div className="flex items-center gap-1.5 text-white">
                  <span className={`h-2 w-2 rounded-full ${isCurrentActivePlaying ? 'bg-red-500 animate-ping' : 'bg-red-500/40'}`} />
                  <span className="text-[11px] font-bold tracking-wider">
                    TC: 01:24:38:{timecodeFrames < 10 ? `0${timecodeFrames}` : timecodeFrames}
                  </span>
                </div>

                <div className="hidden sm:flex items-center gap-2 border-l border-white/20 pl-3">
                  <span className="text-[9px] text-[#8E95A5]">STEREO VU:</span>
                  <LiveEqualizer active={isCurrentActivePlaying} barCount={6} color="#10B981" />
                </div>
              </div>
            </div>

            {/* Bottom details & Interactive Deck */}
            <div className="relative z-10 pt-12 sm:pt-0">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 font-mono text-xs text-[#FF2E4D] font-bold">
                    <Radio className="h-3.5 w-3.5 animate-pulse" />
                    <span>{activePlacement.directorOrBrand} • {activePlacement.year}</span>
                    <span className="text-white/40">•</span>
                    <span className="text-white">{activePlacement.syncRole}</span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
                    {activePlacement.projectTitle}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#A4A9B5] max-w-xl leading-relaxed">
                    "{activePlacement.sceneDescription}"
                  </p>

                  <div className="pt-1 flex flex-wrap gap-2 font-mono text-[10px] text-[#F59E0B]">
                    <span className="bg-black/60 px-2 py-0.5 rounded border border-white/10">
                      ⚡ Cue Point: Action Entry 00:14
                    </span>
                    <span className="bg-black/60 px-2 py-0.5 rounded border border-white/10">
                      🎚️ Stems: Full Hybrid Orchestra + Sub
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 sm:gap-3 flex-shrink-0 pt-2 sm:pt-0">
                  <button
                    onClick={() => handlePlayPlacementTrack(activePlacement.trackTitle)}
                    className="flex-1 sm:flex-initial flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 font-display text-xs font-bold uppercase text-[#07080B] shadow-xl transition-all hover:bg-[#FF2E4D] hover:text-white active:scale-95"
                  >
                    {isCurrentActivePlaying ? (
                      <>
                        <Pause className="h-4 w-4 fill-current" />
                        <LiveEqualizer active={true} barCount={4} color="#07080B" />
                        <span>Auditioning Track</span>
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4 fill-current" />
                        <span>Audition "{activePlacement.trackTitle}"</span>
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
                    className="flex items-center justify-center gap-1.5 rounded-xl border border-white/20 bg-black/70 px-5 py-3.5 font-display text-xs font-bold uppercase text-white backdrop-blur-md transition-all hover:border-[#FF2E4D] hover:bg-[#FF2E4D]"
                  >
                    <span>License</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Placement Thumbnails Switcher with Active Glow Border */}
          <div className="mt-4 sm:mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4">
            {SHOWCASE_PLACEMENTS.map((placement) => {
              const isActive = activePlacement.id === placement.id;
              return (
                <button
                  key={placement.id}
                  onClick={() => setActivePlacement(placement)}
                  className={`flex items-center gap-2.5 sm:gap-3 rounded-xl sm:rounded-2xl border p-2.5 sm:p-3 text-left transition-all duration-200 ${
                    isActive
                      ? 'border-[#FF2E4D] bg-[#141624] shadow-lg shadow-[#FF2E4D]/20 ring-1 ring-[#FF2E4D]/40'
                      : 'border-white/10 bg-[#0C0E14] hover:border-white/25 hover:bg-[#10121A]'
                  }`}
                >
                  <div className="relative h-11 w-11 sm:h-12 sm:w-12 flex-shrink-0 overflow-hidden rounded-lg sm:rounded-xl border border-white/10">
                    <img
                      src={placement.imageUrl}
                      alt={placement.projectTitle}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <span className="block font-mono text-[9px] uppercase text-[#FF2E4D] truncate font-bold">
                      {placement.category}
                    </span>
                    <h4 className="font-display text-xs font-bold text-white truncate">
                      {placement.projectTitle}
                    </h4>
                    <p className="font-mono text-[10px] text-[#8E95A5] truncate">
                      Track: {placement.trackTitle}
                    </p>
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
