import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Play, Pause, Disc3, ShieldCheck, Clock, Radio, Sparkles, Volume2 } from 'lucide-react';
import { scrollToSection } from '@/lib/utils';
import { TRACKS, type Track } from '@/data/tracks';
import { audioEngine } from '@/lib/audioEngine';
import { VinylRecord, AudioSpectrumVisualizer, LiveEqualizer } from './Waveform';

export default function Hero({
  currentPlayingTrack,
  isPlaying,
  onRequestLicense,
}: {
  currentPlayingTrack: Track | null;
  isPlaying: boolean;
  onRequestLicense: (track: Track) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeVibeId, setActiveVibeId] = useState<string>('t1');

  // Smooth scroll parallax for background
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);

  // Current featured track based on vibe selector or active playback
  const activeTrack = currentPlayingTrack || TRACKS.find((t) => t.id === activeVibeId) || TRACKS[0];
  const isThisPlaying = isPlaying && currentPlayingTrack?.id === activeTrack.id;

  const handleSelectVibe = (track: Track) => {
    setActiveVibeId(track.id);
    audioEngine.play(track);
  };

  const handleTogglePlay = () => {
    audioEngine.toggle(activeTrack);
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-[92vh] w-full overflow-hidden bg-[#07080B] flex flex-col justify-center pt-8 pb-16 sm:py-24"
    >
      {/* Background Studio Ambience with Parallax & Pulsing Studio Neon Halos */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 z-0 origin-center pointer-events-none will-change-transform transform-gpu"
      >
        <img
          src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1920&q=80"
          alt="Analogue recording studio console"
          decoding="async"
          loading="eager"
          className="h-full w-full object-cover object-center filter brightness-[0.22] contrast-[1.15]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07080B] via-[#07080B]/60 to-[#07080B]/40" />

        {/* Dynamic Studio Glow Halos that pulse with energy */}
        <div className="absolute top-1/4 left-10 sm:left-1/4 h-80 w-80 rounded-full bg-[#FF2E4D]/15 blur-[120px] animate-pulse-glow pointer-events-none" />
        <div className="absolute bottom-1/4 right-10 sm:right-1/4 h-80 w-80 rounded-full bg-[#2563EB]/15 blur-[130px] animate-pulse-glow pointer-events-none" style={{ animationDelay: '1.5s' }} />
      </motion.div>

      {/* Main Hero Grid */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-8 w-full">
        {/* Top Tagline / Category Badge */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 sm:px-4 sm:py-1.5 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF2E4D] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF2E4D]" />
            </span>
            <span className="font-mono text-[10px] sm:text-xs font-semibold tracking-widest uppercase text-white/90">
              INDEPENDENT SYNC PUBLISHING &amp; MASTER REPERTOIRE
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] text-emerald-400 border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 rounded-full">
            <Radio className="h-3 w-3 animate-pulse" />
            <span>250+ TITLES 100% PRE-CLEARED WORLDWIDE</span>
          </div>
        </div>

        {/* Two-Column Cinema Deck */}
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Bold Typography & Action Controls */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white leading-[1.03]">
              SOUND THAT <br />
              <span className="text-gradient-red">DEFINES SCENES</span>.
            </h1>

            <p className="max-w-xl text-base sm:text-lg leading-relaxed text-[#A4A9B5]">
              Music crafted for filmmakers, showrunners, and creative directors. Over 250+ pre-cleared
              master recordings with isolated multi-track stems and instant 24-hour worldwide clearance.
            </p>

            {/* Instant Vibe Quick-Audition Chips (Interactive & Happening) */}
            <div className="space-y-2.5 pt-2">
              <span className="font-mono text-[10px] sm:text-xs uppercase text-[#F59E0B] tracking-wider flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5" />
                <span>QUICK AUDITION SCENE MOODS:</span>
              </span>

              <div className="flex flex-wrap gap-2">
                {TRACKS.slice(0, 4).map((t) => {
                  const isSelected = activeTrack.id === t.id;
                  const isTrackPlaying = isPlaying && currentPlayingTrack?.id === t.id;

                  return (
                    <button
                      key={t.id}
                      onClick={() => handleSelectVibe(t)}
                      className={`group flex items-center gap-2 rounded-xl px-3.5 py-2 font-mono text-xs transition-all duration-200 border ${
                        isSelected
                          ? 'border-[#FF2E4D] bg-[#1A1117] text-white shadow-lg shadow-[#FF2E4D]/25'
                          : 'border-white/10 bg-[#0E1017]/80 text-[#8E95A5] hover:border-white/25 hover:text-white hover:bg-[#121420]'
                      }`}
                    >
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10 group-hover:bg-[#FF2E4D] group-hover:text-white transition-colors">
                        {isTrackPlaying ? (
                          <Pause className="h-2.5 w-2.5 fill-current text-white" />
                        ) : (
                          <Play className="h-2.5 w-2.5 fill-current text-white translate-x-0.5" />
                        )}
                      </div>
                      <span className="font-semibold">{t.title}</span>
                      <span className="text-[10px] opacity-60">({t.bpm} BPM)</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
              <button
                onClick={() => scrollToSection('catalog')}
                className="group flex items-center justify-center gap-2.5 rounded-xl bg-[#FF2E4D] px-7 py-4 font-display text-xs font-bold uppercase tracking-wider text-white shadow-xl shadow-[#FF2E4D]/30 transition-all hover:bg-[#ff425f] hover:shadow-2xl hover:shadow-[#FF2E4D]/50 active:scale-95"
              >
                <span>Browse Complete Vault</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => onRequestLicense(activeTrack)}
                className="flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-7 py-4 font-display text-xs font-bold uppercase tracking-wider text-white backdrop-blur-md transition-all hover:border-white/30 hover:bg-white/10"
              >
                <Sparkles className="h-4 w-4 text-[#F59E0B]" />
                <span>License "{activeTrack.title}"</span>
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Turntable / Studio Deck Station */}
          <div className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-[#0C0E15]/90 p-5 sm:p-7 shadow-2xl backdrop-blur-2xl ring-1 ring-white/10">
              {/* Header Status Bar */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2 font-mono text-xs">
                  <span className={`h-2 w-2 rounded-full ${isThisPlaying ? 'bg-[#FF2E4D] animate-ping' : 'bg-white/40'}`} />
                  <span className="text-white font-semibold">
                    {isThisPlaying ? 'NOW AUDITIONING' : 'STUDIO MONITOR READY'}
                  </span>
                </div>
                <div className="flex items-center gap-2 font-mono text-[11px] text-[#F59E0B]">
                  <span>{activeTrack.bpm} BPM</span>
                  <span>•</span>
                  <span>{activeTrack.key}</span>
                </div>
              </div>

              {/* Central Interactive Spinning Vinyl Turntable Station */}
              <div className="relative py-6 flex flex-col items-center justify-center">
                {/* Turntable Platter Outer Orbital Rings & Strobe Marks */}
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
                  {/* Rotating Strobe Dash Ring (Technics 1200 style) */}
                  <div className="h-64 w-64 sm:h-72 sm:w-72 rounded-full border border-dashed border-white/15 animate-spin-reverse-slow" />
                  {/* Subtle Outer Metal Platter Rim */}
                  <div className="absolute h-[242px] w-[242px] rounded-full border border-white/20 bg-gradient-to-b from-white/5 to-transparent" />
                  {/* Ambient dynamic glow halo behind vinyl */}
                  <div
                    className={`absolute h-48 w-48 rounded-full transition-all duration-700 ${
                      isThisPlaying ? 'bg-[#FF2E4D]/35 blur-2xl scale-125' : 'bg-white/5 blur-xl'
                    }`}
                  />
                </div>

                {/* Mechanical Studio Tonearm Overlay */}
                <div className="absolute top-2 right-4 sm:right-10 z-20 pointer-events-none hidden xs:flex flex-col items-end">
                  {/* Tonearm Gimbal Pivot */}
                  <div className="h-6 w-6 rounded-full bg-gradient-to-br from-[#35394B] to-[#121420] border border-white/30 shadow-lg flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-[#FF2E4D] shadow-[0_0_8px_#FF2E4D]" />
                  </div>
                  {/* Tonearm Wand */}
                  <div
                    className={`w-[2px] h-20 sm:h-24 bg-gradient-to-b from-[#A4A9B5] via-[#E2E8F0] to-[#FF2E4D] origin-top transition-transform duration-700 shadow-md ${
                      isThisPlaying ? 'rotate-[26deg]' : 'rotate-[12deg]'
                    }`}
                    style={{ transformOrigin: 'top center' }}
                  >
                    {/* Cartridge & Stylus Light */}
                    <div className="absolute -bottom-1.5 -left-1.5 h-3.5 w-3.5 rounded-sm bg-[#11131C] border border-white/40 flex items-center justify-center shadow-lg">
                      <span className={`h-1.5 w-1.5 rounded-full ${isThisPlaying ? 'bg-[#FF2E4D] animate-ping' : 'bg-emerald-400'}`} />
                    </div>
                  </div>
                </div>

                {/* Turntable Disc with Play / Pause trigger */}
                <div className="relative group cursor-pointer z-10" onClick={handleTogglePlay} title="Click to audition master recording">
                  <VinylRecord
                    coverImage={activeTrack.coverImage}
                    isPlaying={isThisPlaying}
                    size={220}
                  />

                  {/* Play/Pause Hover Overlay Icon */}
                  <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FF2E4D] text-white shadow-xl shadow-[#FF2E4D]/50 transform transition-transform group-hover:scale-110">
                      {isThisPlaying ? (
                        <Pause className="h-5 w-5 fill-current" />
                      ) : (
                        <Play className="h-5 w-5 fill-current translate-x-0.5" />
                      )}
                    </div>
                  </div>
                </div>

                {/* RPM & Drive Status Strip */}
                <div className="mt-3 flex items-center gap-2 font-mono text-[9px] uppercase tracking-wider text-white/50">
                  <span className="flex items-center gap-1 text-[#F59E0B]">
                    <span className={`h-1.5 w-1.5 rounded-full ${isThisPlaying ? 'bg-[#FF2E4D] animate-pulse' : 'bg-emerald-400'}`} />
                    <span>33⅓ RPM</span>
                  </span>
                  <span>•</span>
                  <span>DIRECT DRIVE MOTOR</span>
                  <span>•</span>
                  <span>PITCH SYNC 0.0%</span>
                </div>

                {/* Active Track Title & Stems Pill */}
                <div className="mt-3 text-center">
                  <span className="font-mono text-[10px] uppercase font-bold text-[#FF2E4D] tracking-widest">
                    {activeTrack.genre} • ONE-STOP PRE-CLEARED
                  </span>
                  <h3 className="font-display text-xl sm:text-2xl font-extrabold text-white mt-0.5">
                    {activeTrack.title}
                  </h3>
                  <p className="text-xs text-[#8E95A5] mt-1">{activeTrack.artist}</p>
                </div>
              </div>

              {/* Live 32-Bar Frequency Spectrum Visualizer */}
              <div className="rounded-2xl border border-white/10 bg-black/50 p-3.5 space-y-2">
                <div className="flex items-center justify-between font-mono text-[10px] text-[#8E95A5]">
                  <span className="flex items-center gap-1.5 text-white/80">
                    <Volume2 className="h-3 w-3 text-[#FF2E4D]" />
                    <span>AUDIO FREQUENCY MONITOR</span>
                  </span>
                  <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                    {isThisPlaying ? (
                      <>
                        <LiveEqualizer active={true} barCount={4} color="#10B981" />
                        <span>LIVE OUTPUT</span>
                      </>
                    ) : (
                      'CLICK VINYL TO AUDITION'
                    )}
                  </span>
                </div>

                <AudioSpectrumVisualizer isPlaying={isThisPlaying} barCount={28} />

                {/* Stems tags */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-white/5">
                  {activeTrack.stems.map((stem, i) => (
                    <span
                      key={i}
                      className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[9px] text-white/80"
                    >
                      + {stem}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Metrics Strip */}
        <div className="mt-12 sm:mt-16 grid grid-cols-3 gap-2 sm:gap-8 border-t border-white/10 pt-8 sm:pt-10 max-w-4xl mx-auto">
          <div className="flex flex-col items-center text-center">
            <span className="font-display text-2xl sm:text-4xl font-extrabold text-white">250+</span>
            <span className="text-[11px] sm:text-xs text-[#8E95A5] mt-1 flex items-center gap-1 font-mono">
              <Disc3 className="h-3.5 w-3.5 text-[#FF2E4D] hidden xs:inline" /> Master Titles
            </span>
          </div>

          <div className="flex flex-col items-center text-center">
            <span className="font-display text-2xl sm:text-4xl font-extrabold text-white">100%</span>
            <span className="text-[11px] sm:text-xs text-[#8E95A5] mt-1 flex items-center gap-1 font-mono">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400 hidden xs:inline" /> One-Stop Rights
            </span>
          </div>

          <div className="flex flex-col items-center text-center">
            <span className="font-display text-2xl sm:text-4xl font-extrabold text-white">24H</span>
            <span className="text-[11px] sm:text-xs text-[#8E95A5] mt-1 flex items-center gap-1 font-mono">
              <Clock className="h-3.5 w-3.5 text-[#F59E0B] hidden xs:inline" /> Approval SLA
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
