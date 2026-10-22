import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Search, ArrowRight, Music4, Clock, Sparkles } from 'lucide-react';
import { TRACKS, GENRE_FILTERS, type GenreFilter, type Track } from '@/data/tracks';
import { useInView } from '@/lib/utils';

export default function MusicCatalog({ onRequestLicense }: { onRequestLicense: (track: Track) => void }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const [activeFilter, setActiveFilter] = useState<GenreFilter>('All Tracks');
  const [query, setQuery] = useState('');
  const [playingId, setPlayingId] = useState<string | null>(null);

  const filteredTracks = useMemo(() => {
    return TRACKS.filter((t) => {
      const matchesGenre = activeFilter === 'All Tracks' || t.genre === activeFilter;
      const q = query.trim().toLowerCase();
      const matchesSearch =
        q === '' ||
        t.title.toLowerCase().includes(q) ||
        t.artist.toLowerCase().includes(q) ||
        t.genre.toLowerCase().includes(q) ||
        t.mood.toLowerCase().includes(q);
      return matchesGenre && matchesSearch;
    });
  }, [activeFilter, query]);

  const togglePlay = (id: string) => {
    setPlayingId(playingId === id ? null : id);
  };

  return (
    <section id="catalog" className="relative section-padding overflow-hidden">
      <div
        className="absolute left-1/4 top-0 h-96 w-96 rounded-full opacity-[0.08] blur-[120px]"
        style={{ background: 'radial-gradient(circle, #E51B36 0%, transparent 70%)' }}
      />

      <div ref={ref} className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <span className="text-xs font-semibold tracking-[0.3em] text-pitch-red">
            DISCOVER THE SOUND
          </span>
          <h2 className="mt-4 font-heading text-3xl font-bold leading-tight text-pitch-white sm:text-4xl md:text-5xl">
            Music That Brings Stories to Life.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-pitch-gray">
            Explore sounds for powerful storytelling, unforgettable campaigns, and compelling
            visual experiences.
          </p>
        </motion.div>

        {/* Search + Filters */}
        <div className="mt-12 flex flex-col gap-6">
          <div className="relative mx-auto w-full max-w-xl">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-pitch-gray" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search tracks, genres, or moods..."
              aria-label="Search tracks"
              className="w-full rounded-full border border-white/10 bg-pitch-charcoal/60 py-3.5 pl-12 pr-4 text-pitch-white placeholder:text-pitch-gray/60 transition-all duration-300 focus:border-pitch-red/50 focus:outline-none focus:ring-2 focus:ring-pitch-red/20"
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {GENRE_FILTERS.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full border px-5 py-2 text-sm font-medium transition-all duration-300 ${
                  activeFilter === filter
                    ? 'border-pitch-red bg-pitch-red text-white'
                    : 'border-white/10 bg-transparent text-pitch-gray hover:border-white/30 hover:text-pitch-white'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Track list */}
        <div className="mt-10 grid gap-4">
          <AnimatePresence mode="popLayout">
            {filteredTracks.map((track, i) => (
              <motion.div
                key={track.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className={`group relative flex flex-col gap-4 overflow-hidden rounded-2xl border bg-pitch-charcoal/40 p-4 transition-all duration-300 hover:bg-pitch-charcoal/80 sm:flex-row sm:items-center sm:p-5 ${
                  playingId === track.id ? 'border-pitch-red/40' : 'border-white/5 hover:border-white/10'
                }`}
              >
                {/* Cover art */}
                <div className="flex items-center gap-4 sm:flex-1">
                  <button
                    onClick={() => togglePlay(track.id)}
                    className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl"
                    style={{
                      background: `linear-gradient(135deg, ${track.gradient[0]}, ${track.gradient[1]})`,
                    }}
                    aria-label={playingId === track.id ? `Pause ${track.title}` : `Play ${track.title}`}
                  >
                    <div className="flex h-full w-full items-center justify-center">
                      {playingId === track.id ? (
                        <Pause className="h-6 w-6 text-white" fill="currentColor" />
                      ) : (
                        <Play className="h-6 w-6 text-white" fill="currentColor" />
                      )}
                    </div>
                    <div className="absolute inset-0 bg-black/0 transition-opacity group-hover:bg-black/20" />
                  </button>
                  <div className="min-w-0">
                    <h3 className="truncate font-heading text-lg font-semibold text-pitch-white">
                      {track.title}
                    </h3>
                    <p className="truncate text-sm text-pitch-gray">{track.artist}</p>
                    <div className="mt-1 flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-pitch-red/10 px-2.5 py-0.5 text-xs font-medium text-pitch-red">
                        {track.genre}
                      </span>
                      <span className="text-xs text-pitch-gray">{track.mood}</span>
                    </div>
                  </div>
                </div>

                {/* Waveform mini preview */}
                <div className="hidden items-center justify-center sm:flex sm:flex-shrink-0">
                  <div className="flex h-8 items-center gap-[2px]">
                    {track.waveform.slice(0, 20).map((bar, idx) => (
                      <div
                        key={idx}
                        className="rounded-full"
                        style={{
                          width: 2.5,
                          height: `${bar * 100}%`,
                          backgroundColor: playingId === track.id ? track.gradient[0] : '#3a3e48',
                          animation: playingId === track.id
                            ? `wavePulse ${0.8 + (idx % 5) * 0.15}s ease-in-out infinite`
                            : undefined,
                          animationDelay: `${idx * 0.05}s`,
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Meta */}
                <div className="flex items-center justify-between gap-3 sm:flex-shrink-0">
                  <div className="flex items-center gap-4 text-xs text-pitch-gray">
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      {track.duration}
                    </span>
                    <span className="hidden items-center gap-1.5 sm:flex">
                      <Music4 className="h-3.5 w-3.5" />
                      {track.bpm} BPM
                    </span>
                  </div>
                  <button
                    onClick={() => onRequestLicense(track)}
                    className="rounded-full border border-white/15 px-5 py-2 text-sm font-semibold text-pitch-white transition-all duration-300 hover:border-pitch-red hover:bg-pitch-red hover:text-white"
                  >
                    Request License
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredTracks.length === 0 && (
            <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
              <Search className="h-10 w-10 text-pitch-gray/40" />
              <p className="text-lg text-pitch-gray">No tracks found. Try a different search or filter.</p>
            </div>
          )}
        </div>

        {/* Demo note */}
        <p className="mt-8 flex items-center justify-center gap-2 text-center text-sm text-pitch-gray/60">
          <Sparkles className="h-4 w-4 text-pitch-blue" />
          Catalog content shown is demonstration data, pending the official catalog upload.
        </p>

        {/* CTA */}
        <div className="mt-10 text-center">
          <button
            onClick={() => onRequestLicense(TRACKS[0])}
            className="group inline-flex items-center gap-2 rounded-full border border-pitch-red/30 bg-pitch-red/10 px-8 py-4 text-base font-semibold text-pitch-white transition-all duration-300 hover:border-pitch-red hover:bg-pitch-red hover:shadow-lg hover:shadow-pitch-red/30"
          >
            Request Full Catalog Access
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
}
