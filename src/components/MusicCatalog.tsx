import { useMemo, useState } from 'react';
import { Play, Pause, Search, Layers, ArrowUpRight } from 'lucide-react';
import { TRACKS, GENRE_FILTERS, type GenreFilter, type Track } from '@/data/tracks';
import { audioEngine } from '@/lib/audioEngine';
import { Waveform, LiveEqualizer } from './Waveform';

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

      return matchesGenre && matchesSearch;
    });
  }, [activeGenre, searchQuery]);

  const handleTogglePlay = (track: Track) => {
    audioEngine.toggle(track);
  };

  const handleSeekTrack = (track: Track, ratio: number) => {
    audioEngine.play(track);
    audioEngine.seek(ratio);
  };

  return (
    <section id="catalog" className="relative bg-[#07080B] py-16 sm:py-28 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 sm:pb-12 border-b border-white/10">
          <div>
            <span className="font-mono text-[10px] sm:text-xs uppercase text-[#FF2E4D] tracking-widest block mb-2">
              CATALOG REPERTOIRE • 250+ TITLES
            </span>
            <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-extrabold text-white">
              MUSIC BUILT FOR THE SCREEN.
            </h2>
            <p className="mt-2 sm:mt-3 text-xs sm:text-base text-[#8E95A5] max-w-xl">
              Audition pre-cleared master tracks with full isolated multi-tracks (stems).
              Cleared for all media in perpetuity.
            </p>
          </div>

          {/* Search Input: full width on mobile */}
          <div className="relative w-full md:w-auto md:min-w-[280px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8E95A5]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, genre, tempo, mood..."
              className="w-full rounded-xl border border-white/10 bg-[#0E1017] py-2.5 sm:py-3 pl-10 pr-4 font-mono text-xs text-white placeholder:text-[#8E95A5]/50 focus:border-[#FF2E4D] focus:outline-none"
            />
          </div>
        </div>

        {/* Clean Genre Filter Tabs: Wrap smoothly on mobile */}
        <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-1.5 sm:gap-2">
          {GENRE_FILTERS.map((genre) => (
            <button
              key={genre}
              onClick={() => setActiveGenre(genre)}
              className={`rounded-xl px-3 py-1.5 sm:px-4 sm:py-2 font-display text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-colors duration-150 ${
                activeGenre === genre
                  ? 'bg-[#FF2E4D] text-white shadow-md shadow-[#FF2E4D]/25'
                  : 'bg-[#0E1017] text-[#8E95A5] border border-white/5 hover:border-white/20 hover:text-white'
              }`}
            >
              {genre}
            </button>
          ))}
          <span className="ml-auto font-mono text-xs text-[#8E95A5] hidden sm:inline">
            Showing <span className="text-white font-bold">{filteredTracks.length}</span> titles
          </span>
        </div>

        {/* Track Rows with Mobile-Optimized Layout */}
        <div className="mt-6 sm:mt-8 space-y-3">
          {filteredTracks.map((track) => {
            const isCurrent = currentPlayingTrack?.id === track.id;
            const isCurrentPlaying = isCurrent && isPlaying;
            const isExpanded = expandedTrackId === track.id;

            return (
              <div
                key={track.id}
                className={`group rounded-2xl border p-3.5 sm:p-5 transition-colors duration-200 will-change-transform ${
                  isCurrent
                    ? 'border-[#FF2E4D]/40 bg-[#121420] shadow-lg'
                    : 'border-white/5 bg-[#0C0E14] hover:border-white/15 hover:bg-[#10121A]'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center gap-3.5 sm:gap-6">
                  {/* Artwork + Play button + Info */}
                  <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0 min-w-0">
                    <div className="relative h-14 w-14 sm:h-16 sm:w-16 flex-shrink-0 overflow-hidden rounded-xl border border-white/10 bg-[#161822]">
                      <img
                        src={track.coverImage}
                        alt={track.title}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <button
                        onClick={() => handleTogglePlay(track)}
                        className="absolute inset-0 flex items-center justify-center bg-black/40 text-white transition-opacity hover:bg-black/60"
                        aria-label={isCurrentPlaying ? 'Pause track' : 'Play track'}
                      >
                        <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-[#FF2E4D] text-white shadow-md shadow-[#FF2E4D]/30 transition-transform active:scale-95">
                          {isCurrentPlaying ? (
                            <Pause className="h-4 w-4 fill-current" />
                          ) : (
                            <Play className="h-4 w-4 fill-current translate-x-0.5" />
                          )}
                        </div>
                      </button>
                    </div>

                    {/* Info */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[9px] sm:text-[10px] uppercase font-bold text-[#FF2E4D]">
                          {track.genre}
                        </span>
                        <span className="font-mono text-[9px] uppercase text-emerald-400">
                          ONE-STOP
                        </span>
                      </div>
                      <h3 className="font-display text-sm sm:text-base lg:text-lg font-bold text-white truncate mt-0.5">
                        {track.title}
                      </h3>
                      <p className="text-xs text-[#8E95A5] truncate">{track.artist}</p>
                      <div className="flex items-center gap-2 font-mono text-[10px] sm:text-[11px] text-[#8E95A5] mt-0.5">
                        <span>{track.bpm} BPM</span>
                        <span>•</span>
                        <span>{track.key}</span>
                        <span>•</span>
                        <span>{track.duration}</span>
                      </div>
                    </div>
                  </div>

                  {/* Waveform Scrubber Column */}
                  <div className="flex-1 min-w-0 flex flex-col justify-center pt-1 lg:pt-0">
                    <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-[#8E95A5] mb-1">
                      <span className="truncate pr-2">
                        {isCurrentPlaying ? (
                          <span className="text-[#FF2E4D] flex items-center gap-1.5 font-semibold">
                            <LiveEqualizer active={true} barCount={4} />
                            LIVE AUDITION
                          </span>
                        ) : (
                          track.mood
                        )}
                      </span>
                      <span className="hidden sm:inline opacity-60 flex-shrink-0">{track.scenes[0]}</span>
                    </div>

                    <Waveform
                      bars={track.waveform}
                      active={isCurrentPlaying}
                      color="#FF2E4D"
                      height={24}
                      onSeek={(ratio) => handleSeekTrack(track, ratio)}
                    />
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between lg:justify-end gap-2 sm:gap-3 pt-2 lg:pt-0 border-t lg:border-t-0 border-white/5">
                    <button
                      onClick={() => setExpandedTrackId(isExpanded ? null : track.id)}
                      className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 sm:py-2 font-mono text-xs text-[#8E95A5] transition-colors hover:text-white"
                    >
                      <Layers className="h-3.5 w-3.5 text-[#F59E0B]" />
                      <span>{track.stems.length} Stems</span>
                    </button>

                    <button
                      onClick={() => onRequestLicense(track)}
                      className="flex items-center gap-1.5 rounded-xl bg-white px-3.5 py-1.5 sm:px-4 sm:py-2 font-display text-xs font-bold uppercase tracking-wider text-[#07080B] transition-colors hover:bg-[#FF2E4D] hover:text-white"
                    >
                      <span>License</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                {/* Expanded Stems Drawer */}
                {isExpanded && (
                  <div className="mt-3.5 pt-3.5 border-t border-white/10 grid gap-3 sm:gap-4 sm:grid-cols-2 text-xs">
                    <div>
                      <span className="font-mono text-[#8E95A5] uppercase tracking-wider block mb-1 text-[11px]">
                        Scene Description:
                      </span>
                      <p className="text-white/90 leading-relaxed text-xs">{track.description}</p>
                    </div>

                    <div>
                      <span className="font-mono text-[#8E95A5] uppercase tracking-wider block mb-1 text-[11px]">
                        Available Isolated Stems:
                      </span>
                      <div className="flex flex-wrap gap-1.5 mt-1.5">
                        {track.stems.map((stem, i) => (
                          <span
                            key={i}
                            className="rounded-lg border border-white/5 bg-black/40 px-2 py-0.5 font-mono text-[10px] sm:text-[11px] text-white"
                          >
                            ✓ {stem}
                          </span>
                        ))}
                      </div>
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
