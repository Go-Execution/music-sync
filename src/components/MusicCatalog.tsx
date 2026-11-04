import { useMemo, useState } from 'react';
import { Play, Pause, Search, Layers, ArrowUpRight, Sliders, Volume2, Sparkles } from 'lucide-react';
import { TRACKS, GENRE_FILTERS, type GenreFilter, type Track } from '@/data/tracks';
import { audioEngine } from '@/lib/audioEngine';
import { Waveform, LiveEqualizer, VinylRecord } from './Waveform';

export default function MusicCatalog({
  onRequestLicense,
  currentPlayingTrack,
  isPlaying,
}: {
  onRequestLicense: (track: Track) => void;
  currentPlayingTrack: Track | null;
  isPlaying: boolean;
}) {
  const [activeGenre, setActiveGenre] = useState<GenreFilter>('All Tracks');
  const [searchQuery, setSearchQuery] = useState('');
  const [tempoFilter, setTempoFilter] = useState<'All' | 'Slow' | 'Mid' | 'Fast'>('All');
  const [expandedTrackId, setExpandedTrackId] = useState<string | null>(null);

  const filteredTracks = useMemo(() => {
    return TRACKS.filter((t) => {
      const matchesGenre = activeGenre === 'All Tracks' || t.genre === activeGenre;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        q === '' ||
        t.title.toLowerCase().includes(q) ||
        t.artist.toLowerCase().includes(q) ||
        t.genre.toLowerCase().includes(q) ||
        t.mood.toLowerCase().includes(q) ||
        t.scenes.some((s) => s.toLowerCase().includes(q));

      const matchesTempo =
        tempoFilter === 'All' ||
        (tempoFilter === 'Slow' && t.bpm < 85) ||
        (tempoFilter === 'Mid' && t.bpm >= 85 && t.bpm <= 118) ||
        (tempoFilter === 'Fast' && t.bpm > 118);

      return matchesGenre && matchesSearch && matchesTempo;
    });
  }, [activeGenre, searchQuery, tempoFilter]);

  const handleTogglePlay = (track: Track) => {
    audioEngine.toggle(track);
  };

  const handleSeekTrack = (track: Track, ratio: number) => {
    audioEngine.play(track);
    audioEngine.seek(ratio);
  };

  return (
    <section id="catalog" className="relative bg-[#07080B] py-20 sm:py-32 border-t border-white/5">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 h-[400px] w-[700px] rounded-full bg-[#FF2E4D]/5 blur-[160px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 sm:pb-12 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[10px] sm:text-xs uppercase text-[#FF2E4D] tracking-widest mb-3">
              <Sparkles className="h-3 w-3" />
              <span>THE SYNC VAULT • 250+ MASTER REPERTOIRE</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white">
              MUSIC BUILT FOR THE SCREEN.
            </h2>
            <p className="mt-2 sm:mt-3 text-xs sm:text-base text-[#8E95A5] max-w-xl">
              Audition pre-cleared master tracks with full multi-track stems. Click any track to trigger
              real-time synthesizer previews with live audio waveform analysis.
            </p>
          </div>

          {/* Search Input: Full width on mobile */}
          <div className="relative w-full md:w-auto md:min-w-[300px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8E95A5]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, genre, tempo, mood..."
              className="w-full rounded-xl border border-white/10 bg-[#0E1017] py-3 pl-10 pr-4 font-mono text-xs text-white placeholder:text-[#8E95A5]/50 focus:border-[#FF2E4D] focus:outline-none focus:ring-1 focus:ring-[#FF2E4D]"
            />
          </div>
        </div>

        {/* Filter Controls: Genres + Dynamic Tempo Filter */}
        <div className="mt-6 sm:mt-8 flex flex-col gap-3">
          {/* Genre Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {GENRE_FILTERS.map((genre) => (
              <button
                key={genre}
                onClick={() => setActiveGenre(genre)}
                className={`rounded-xl px-3 py-1.5 sm:px-4 sm:py-2 font-display text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                  activeGenre === genre
                    ? 'bg-[#FF2E4D] text-white shadow-lg shadow-[#FF2E4D]/30 border border-[#FF2E4D]'
                    : 'bg-[#0E1017] text-[#8E95A5] border border-white/5 hover:border-white/20 hover:text-white'
                }`}
              >
                {genre}
              </button>
            ))}
          </div>

          {/* Secondary Tempo Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-white/5">
            <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#8E95A5]">
              <Sliders className="h-3.5 w-3.5 text-[#F59E0B]" />
              <span className="uppercase tracking-wider mr-1">Tempo:</span>
              {(['All', 'Slow', 'Mid', 'Fast'] as const).map((temp) => (
                <button
                  key={temp}
                  onClick={() => setTempoFilter(temp)}
                  className={`px-2.5 py-0.5 rounded-md font-mono text-[10px] transition-colors ${
                    tempoFilter === temp
                      ? 'bg-white text-black font-bold'
                      : 'bg-white/5 text-[#8E95A5] hover:text-white'
                  }`}
                >
                  {temp === 'All' ? 'All BPM' : temp === 'Slow' ? '< 85 BPM' : temp === 'Mid' ? '85-118 BPM' : '118+ BPM'}
                </button>
              ))}
            </div>

            <span className="font-mono text-xs text-[#8E95A5]">
              Showing <span className="text-white font-bold">{filteredTracks.length}</span> titles
            </span>
          </div>
        </div>

        {/* Dynamic Track Cards with Vinyl Record Peek-Out on Hover */}
        <div className="mt-8 space-y-4">
          {filteredTracks.map((track) => {
            const isCurrent = currentPlayingTrack?.id === track.id;
            const isCurrentPlaying = isCurrent && isPlaying;
            const isExpanded = expandedTrackId === track.id;

            return (
              <div
                key={track.id}
                className={`group relative rounded-2xl border p-4 sm:p-5 transition-all duration-300 will-change-transform ${
                  isCurrent
                    ? 'border-[#FF2E4D] bg-[#121422] shadow-xl shadow-[#FF2E4D]/20 ring-1 ring-[#FF2E4D]/40'
                    : 'border-white/10 bg-[#0C0E14] hover:border-white/25 hover:bg-[#10121A]'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center gap-4 sm:gap-6">
                  {/* Left: Album Sleeve + Vinyl Record Peek-Out on Hover */}
                  <div className="flex items-center gap-3 sm:gap-5 flex-shrink-0 min-w-0">
                    <div className="relative h-16 w-16 sm:h-20 sm:w-20 flex-shrink-0">
                      {/* Vinyl Record that slides out of sleeve on hover */}
                      <div className="absolute top-1/2 -translate-y-1/2 left-0 transition-transform duration-500 ease-out group-hover:translate-x-5 sm:group-hover:translate-x-8 -z-0">
                        <VinylRecord
                          coverImage={track.coverImage}
                          isPlaying={isCurrentPlaying}
                          size={64}
                        />
                      </div>

                      {/* Album Cover Sleeve Jacket */}
                      <div className="relative h-full w-full rounded-xl overflow-hidden border border-white/15 bg-[#161822] shadow-xl z-10">
                        <img
                          src={track.coverImage}
                          alt={track.title}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />

                        {/* Play/Pause Button on Cover */}
                        <button
                          onClick={() => handleTogglePlay(track)}
                          className="absolute inset-0 flex items-center justify-center bg-black/45 text-white transition-opacity hover:bg-black/60 focus:outline-none"
                          aria-label={isCurrentPlaying ? 'Pause track' : 'Play track'}
                        >
                          <div
                            className={`flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-[#FF2E4D] text-white shadow-xl shadow-[#FF2E4D]/40 transition-transform duration-200 hover:scale-110 active:scale-95 ${
                              isCurrentPlaying ? 'ring-2 ring-white animate-pulse' : ''
                            }`}
                          >
                            {isCurrentPlaying ? (
                              <Pause className="h-4 w-4 sm:h-5 sm:w-5 fill-current" />
                            ) : (
                              <Play className="h-4 w-4 sm:h-5 sm:w-5 fill-current translate-x-0.5" />
                            )}
                          </div>
                        </button>
                      </div>
                    </div>

                    {/* Track Info & Metadata */}
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[9px] sm:text-[10px] uppercase font-bold text-[#FF2E4D]">
                          {track.genre}
                        </span>
                        <span className="font-mono text-[9px] uppercase px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/20">
                          ONE-STOP
                        </span>
                      </div>

                      <h3 className="font-display text-base sm:text-lg font-bold text-white truncate mt-0.5 group-hover:text-[#FF2E4D] transition-colors">
                        {track.title}
                      </h3>

                      <p className="text-xs text-[#8E95A5] truncate">{track.artist}</p>

                      <div className="flex items-center gap-2 font-mono text-[10px] sm:text-[11px] text-[#A4A9B5] mt-1">
                        <span className="text-[#F59E0B] font-semibold">{track.bpm} BPM</span>
                        <span>•</span>
                        <span>Key: {track.key}</span>
                        <span>•</span>
                        <span>{track.duration}</span>
                      </div>
                    </div>
                  </div>

                  {/* Center: Live Waveform Scrubber with Dancing EQ when playing */}
                  <div className="flex-1 min-w-0 flex flex-col justify-center pt-1 lg:pt-0">
                    <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-[#8E95A5] mb-1.5">
                      <span className="truncate pr-2">
                        {isCurrentPlaying ? (
                          <span className="text-[#FF2E4D] flex items-center gap-1.5 font-bold">
                            <LiveEqualizer active={true} barCount={5} />
                            <span>NOW AUDITIONING SYNTHESIS</span>
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-[#8E95A5]">
                            <Volume2 className="h-3 w-3" />
                            <span>Mood: {track.mood}</span>
                          </span>
                        )}
                      </span>
                      <span className="hidden sm:inline font-mono text-white/60 flex-shrink-0">
                        {track.scenes[0]}
                      </span>
                    </div>

                    <Waveform
                      bars={track.waveform}
                      active={isCurrentPlaying}
                      color="#FF2E4D"
                      height={28}
                      onSeek={(ratio) => handleSeekTrack(track, ratio)}
                    />
                  </div>

                  {/* Right Actions: Stems Drawer Toggle + License Button */}
                  <div className="flex items-center justify-between lg:justify-end gap-2 sm:gap-3 pt-2 lg:pt-0 border-t lg:border-t-0 border-white/5">
                    <button
                      onClick={() => setExpandedTrackId(isExpanded ? null : track.id)}
                      className={`flex items-center gap-1.5 rounded-xl border px-3 py-2 font-mono text-xs transition-colors ${
                        isExpanded
                          ? 'border-[#F59E0B] bg-[#F59E0B]/10 text-[#F59E0B]'
                          : 'border-white/10 bg-white/5 text-[#8E95A5] hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <Layers className="h-3.5 w-3.5 text-[#F59E0B]" />
                      <span>{track.stems.length} Stems</span>
                    </button>

                    <button
                      onClick={() => onRequestLicense(track)}
                      className="flex items-center gap-1.5 rounded-xl bg-white px-4 py-2 font-display text-xs font-bold uppercase tracking-wider text-[#07080B] shadow-md transition-all hover:bg-[#FF2E4D] hover:text-white active:scale-95"
                    >
                      <span>License</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                {/* Expanded Multi-Track Stems Drawer */}
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-white/10 grid gap-4 sm:grid-cols-2 text-xs">
                    <div>
                      <span className="font-mono text-[#F59E0B] uppercase tracking-wider block mb-1 text-[11px] font-bold">
                        Curator Scene Fit:
                      </span>
                      <p className="text-white/90 leading-relaxed text-xs">{track.description}</p>
                      <div className="mt-2.5 flex flex-wrap gap-1">
                        {track.scenes.map((scene, i) => (
                          <span
                            key={i}
                            className="rounded bg-white/5 border border-white/5 px-2 py-0.5 text-[10px] text-[#A4A9B5]"
                          >
                            🎬 {scene}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="font-mono text-[#F59E0B] uppercase tracking-wider block mb-1 text-[11px] font-bold">
                        Isolated Stems Included:
                      </span>
                      <div className="grid grid-cols-2 gap-1.5 mt-2">
                        {track.stems.map((stem, i) => (
                          <div
                            key={i}
                            className="rounded-lg border border-white/10 bg-black/40 px-2.5 py-1.5 font-mono text-[11px] text-white flex items-center gap-2"
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            <span>{stem}</span>
                          </div>
                        ))}
                      </div>
                      <p className="mt-2 text-[10px] font-mono text-[#8E95A5]">
                        Instant 24-bit / 48kHz WAV master delivery via secure link.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
