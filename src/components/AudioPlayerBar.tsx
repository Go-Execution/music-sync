import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, SkipBack, SkipForward, X, ArrowUpRight, Radio } from 'lucide-react';
import { audioEngine, type AudioPlayerState } from '@/lib/audioEngine';
import { TRACKS, type Track } from '@/data/tracks';
import { LiveEqualizer } from './Waveform';

export default function AudioPlayerBar({
  onRequestLicense,
}: {
  onRequestLicense: (track: Track) => void;
}) {
  const [playerState, setPlayerState] = useState<AudioPlayerState>(audioEngine.getState());
  const [isMuted, setIsMuted] = useState(false);
  const [prevVolume, setPrevVolume] = useState(0.35);

  useEffect(() => {
    const unsubscribe = audioEngine.subscribe((state) => {
      setPlayerState({ ...state });
    });
    return unsubscribe;
  }, []);

  if (!playerState.currentTrack) return null;

  const track = playerState.currentTrack;

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = Math.floor(secs % 60);
    return `${mins}:${remainder < 10 ? '0' : ''}${remainder}`;
  };

  const handleTogglePlay = () => {
    audioEngine.toggle(track);
  };

  const handleNext = () => {
    const currentIndex = TRACKS.findIndex((t) => t.id === track.id);
    const nextIndex = (currentIndex + 1) % TRACKS.length;
    audioEngine.play(TRACKS[nextIndex]);
  };

  const handlePrev = () => {
    const currentIndex = TRACKS.findIndex((t) => t.id === track.id);
    const prevIndex = (currentIndex - 1 + TRACKS.length) % TRACKS.length;
    audioEngine.play(TRACKS[prevIndex]);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    audioEngine.setVolume(val);
    if (val > 0) setIsMuted(false);
  };

  const toggleMute = () => {
    if (isMuted) {
      audioEngine.setVolume(prevVolume || 0.35);
      setIsMuted(false);
    } else {
      setPrevVolume(playerState.volume);
      audioEngine.setVolume(0);
      setIsMuted(true);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    audioEngine.seek(ratio);
  };

  return (
    <AnimatePresence>
      <motion.aside
        initial={{ y: 120, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 120, opacity: 0 }}
        transition={{ type: 'spring', damping: 26, stiffness: 220 }}
        aria-label="Persistent audio preview player"
        className="fixed bottom-2 left-2 right-2 sm:bottom-5 sm:left-6 sm:right-6 z-50 mx-auto max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-[#0E1017]/95 p-3 sm:p-4 shadow-2xl backdrop-blur-xl ring-1 ring-white/10"
      >
        {/* Progress track scrubber */}
        <div
          onClick={handleSeek}
          className="group absolute top-0 left-0 right-0 h-1 cursor-pointer bg-white/10 transition-all hover:h-2"
        >
          <div
            className="h-full bg-gradient-to-r from-[#FF2E4D] to-[#F59E0B] transition-all"
            style={{ width: `${playerState.progress * 100}%` }}
          />
        </div>

        <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
          {/* Top/Left: Artwork + Track details + Mobile close */}
          <div className="flex items-center justify-between gap-3 min-w-0 flex-1">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className="relative h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0 overflow-hidden rounded-xl border border-white/10 bg-[#161822]">
                <img
                  src={track.coverImage}
                  alt={track.title}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
                {playerState.isPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <LiveEqualizer active={true} barCount={5} />
                  </div>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="truncate font-display text-xs sm:text-sm font-semibold text-white">
                    {track.title}
                  </span>
                  <span className="hidden xs:inline-flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-1.5 py-0.2 text-[9px] font-mono font-medium text-emerald-400">
                    <Radio className="h-2 w-2 animate-pulse" /> ONE-STOP
                  </span>
                </div>
                <p className="truncate text-[11px] sm:text-xs text-[#8E95A5]">
                  {track.artist} <span className="opacity-50">•</span> {track.genre}
                </p>
              </div>
            </div>

            {/* Mobile close button */}
            <button
              onClick={() => audioEngine.pause()}
              className="p-1.5 text-[#8E95A5] transition-colors hover:text-white sm:hidden flex-shrink-0"
              aria-label="Close player"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Bottom/Center: Controls + License button on mobile */}
          <div className="flex items-center justify-between sm:justify-center gap-3 sm:gap-4 sm:flex-initial pt-1 sm:pt-0 border-t sm:border-t-0 border-white/5">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                onClick={handlePrev}
                className="p-1.5 text-[#8E95A5] transition-colors hover:text-white"
                aria-label="Previous track"
              >
                <SkipBack className="h-4 w-4" />
              </button>

              <button
                onClick={handleTogglePlay}
                className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-[#FF2E4D] text-white shadow-md shadow-[#FF2E4D]/25 transition-transform hover:scale-105 active:scale-95"
                aria-label={playerState.isPlaying ? 'Pause' : 'Play'}
              >
                {playerState.isPlaying ? (
                  <Pause className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-current" />
                ) : (
                  <Play className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-current translate-x-0.5" />
                )}
              </button>

              <button
                onClick={handleNext}
                className="p-1.5 text-[#8E95A5] transition-colors hover:text-white"
                aria-label="Next track"
              >
                <SkipForward className="h-4 w-4" />
              </button>
            </div>

            <div className="flex items-center gap-1 font-mono text-[10px] sm:text-[11px] text-[#8E95A5]">
              <span>{formatTime(playerState.currentTime)}</span>
              <span>/</span>
              <span>{formatTime(playerState.duration)}</span>
            </div>

            {/* Right: Volume + License CTA */}
            <div className="flex items-center gap-2">
              <div className="hidden lg:flex items-center gap-2">
                <button
                  onClick={toggleMute}
                  className="text-[#8E95A5] transition-colors hover:text-white"
                  aria-label="Toggle mute"
                >
                  {isMuted || playerState.volume === 0 ? (
                    <VolumeX className="h-4 w-4" />
                  ) : (
                    <Volume2 className="h-4 w-4" />
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : playerState.volume}
                  onChange={handleVolumeChange}
                  className="h-1 w-16 cursor-pointer accent-[#FF2E4D] bg-white/10 rounded-full"
                  aria-label="Volume slider"
                />
              </div>

              <button
                onClick={() => onRequestLicense(track)}
                className="flex items-center gap-1 rounded-xl bg-white px-2.5 py-1.5 sm:px-3.5 sm:py-2 text-[11px] sm:text-xs font-semibold text-[#07080B] transition-colors hover:bg-[#FF2E4D] hover:text-white shadow-sm"
              >
                <span>License</span>
                <ArrowUpRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              </button>

              {/* Desktop close button */}
              <button
                onClick={() => audioEngine.pause()}
                className="hidden sm:block p-1 text-[#8E95A5] transition-colors hover:text-white"
                aria-label="Close player"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </motion.aside>
    </AnimatePresence>
  );
}
