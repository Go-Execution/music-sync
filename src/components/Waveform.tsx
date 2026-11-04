import React, { useEffect, useState } from 'react';

export function Waveform({
  bars,
  active = false,
  progress = 0,
  color = '#FF2E4D',
  inactiveColor = '#2A2E3D',
  className = '',
  height = 26,
  onSeek,
}: {
  bars: number[];
  active?: boolean;
  progress?: number;
  color?: string;
  inactiveColor?: string;
  className?: string;
  height?: number;
  onSeek?: (ratio: number) => void;
}) {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!onSeek) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    onSeek(ratio);
  };

  return (
    <div
      onClick={handleClick}
      className={`group relative flex items-center justify-between gap-[2px] cursor-pointer select-none py-1.5 transition-opacity ${className}`}
      style={{ height }}
      aria-label="Audio waveform scrubber"
      role="slider"
      aria-valuenow={Math.round(progress * 100)}
    >
      {bars.map((bar, i) => {
        const barRatio = i / bars.length;
        const isPlayed = barRatio <= progress;
        return (
          <div
            key={i}
            className="flex-1 rounded-full will-change-transform"
            style={{
              height: `${Math.max(16, bar * 100)}%`,
              backgroundColor: isPlayed ? color : inactiveColor,
              opacity: isPlayed ? 1 : active ? 0.65 : 0.35,
              transformOrigin: 'bottom',
              transform: active && isPlayed ? 'scaleY(1.12)' : 'scaleY(1)',
              transition: 'transform 0.15s ease-out, opacity 0.15s ease-out',
            }}
          />
        );
      })}
    </div>
  );
}

export function LiveEqualizer({
  active = true,
  barCount = 14,
  color = '#FF2E4D',
  heightClass = 'h-3.5',
}: {
  active?: boolean;
  barCount?: number;
  color?: string;
  heightClass?: string;
}) {
  const heights = [35, 70, 95, 50, 85, 45, 100, 40, 75, 90, 60, 80, 45, 65, 95, 55];

  return (
    <div className={`flex items-end gap-[2px] ${heightClass} select-none`} aria-hidden="true">
      {Array.from({ length: barCount }).map((_, i) => (
        <span
          key={i}
          className="w-[2px] rounded-full will-change-transform"
          style={{
            backgroundColor: color,
            height: active ? `${heights[i % heights.length]}%` : '20%',
            animation: active ? `equalizer ${0.35 + (i % 6) * 0.12}s ease-in-out infinite alternate` : 'none',
            animationDelay: `${(i % 5) * 0.08}s`,
          }}
        />
      ))}
    </div>
  );
}

// Interactive Realistic Vinyl Disc with Concentric Grooves, Continuous Rotation & Sheen
export function VinylRecord({
  coverImage,
  isPlaying = false,
  size = 180,
  className = '',
}: {
  coverImage?: string;
  isPlaying?: boolean;
  size?: number;
  className?: string;
}) {
  return (
    <div
      className={`relative rounded-full flex-shrink-0 flex items-center justify-center select-none ${className}`}
      style={{
        width: size,
        height: size,
      }}
    >
      {/* Outer ambient glow halo */}
      <div
        className={`absolute inset-[-4px] rounded-full transition-opacity duration-700 pointer-events-none ${
          isPlaying ? 'opacity-80' : 'opacity-25'
        }`}
        style={{
          boxShadow: isPlaying
            ? '0 0 45px rgba(255, 46, 77, 0.45)'
            : '0 0 25px rgba(255, 255, 255, 0.08)',
        }}
      />

      {/* Vinyl Disc Body with concentric groove texture and continuous spinning movement */}
      <div
        className={`absolute inset-0 rounded-full border border-white/10 vinyl-grooves will-change-transform transform-gpu ${
          isPlaying ? 'animate-spin-vinyl' : 'animate-spin-slow'
        }`}
        style={{
          boxShadow: isPlaying
            ? '0 0 35px -5px rgba(255, 46, 77, 0.45), inset 0 0 25px rgba(0,0,0,0.95)'
            : '0 10px 30px -5px rgba(0,0,0,0.85), inset 0 0 20px rgba(0,0,0,0.9)',
          transition: 'box-shadow 0.5s ease',
        }}
      >
        {/* Opposing rotating sheen highlight for 3D realism */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none opacity-40 animate-spin-reverse-slow"
          style={{
            background:
              'conic-gradient(from 180deg at 50% 50%, transparent 0deg, rgba(255,255,255,0.25) 45deg, transparent 90deg, rgba(255,255,255,0.25) 225deg, transparent 270deg)',
          }}
        />

        {/* Center Label Badge */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full overflow-hidden border-2 border-[#161822] shadow-inner"
          style={{
            width: size * 0.38,
            height: size * 0.38,
          }}
        >
          {coverImage ? (
            <img
              src={coverImage}
              alt="Vinyl center label"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-tr from-[#FF2E4D] via-[#A8162D] to-[#121420] flex items-center justify-center">
              <span className="font-mono text-[8px] font-bold text-white tracking-widest">
                PPF
              </span>
            </div>
          )}

          {/* Spindle hole */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-[#07080B] border border-white/30 shadow-md" />
        </div>
      </div>
    </div>
  );
}

// Live 32-Bar Audio Spectrum Visualizer
export function AudioSpectrumVisualizer({
  isPlaying = false,
  barCount = 32,
  className = '',
}: {
  isPlaying?: boolean;
  barCount?: number;
  className?: string;
}) {
  const [randomFactors, setRandomFactors] = useState<number[]>(() =>
    Array.from({ length: barCount }, () => 0.2 + Math.random() * 0.8)
  );

  useEffect(() => {
    if (!isPlaying) return;
    const interval = window.setInterval(() => {
      setRandomFactors(Array.from({ length: barCount }, () => 0.15 + Math.random() * 0.85));
    }, 180);
    return () => clearInterval(interval);
  }, [isPlaying, barCount]);

  return (
    <div className={`flex items-end justify-between gap-[3px] h-12 w-full px-2 ${className}`}>
      {Array.from({ length: barCount }).map((_, i) => {
        const factor = isPlaying ? randomFactors[i] : 0.12;
        const normalized = Math.max(0.1, Math.sin((i / barCount) * Math.PI) * 0.4 + factor * 0.6);
        return (
          <div
            key={i}
            className="flex-1 rounded-t-full transition-all duration-150 will-change-transform"
            style={{
              height: `${normalized * 100}%`,
              background:
                i < barCount * 0.6
                  ? 'linear-gradient(to top, #FF2E4D, #FF6B82)'
                  : i < barCount * 0.85
                  ? 'linear-gradient(to top, #F59E0B, #FBBF24)'
                  : 'linear-gradient(to top, #06B6D4, #3B82F6)',
              opacity: isPlaying ? 0.9 : 0.25,
              transformOrigin: 'bottom',
            }}
          />
        );
      })}
    </div>
  );
}
