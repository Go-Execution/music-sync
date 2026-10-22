import React from 'react';

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
              height: `${Math.max(15, bar * 100)}%`,
              backgroundColor: isPlayed ? color : inactiveColor,
              opacity: isPlayed ? 1 : active ? 0.6 : 0.35,
              transformOrigin: 'bottom',
              transform: active && isPlayed ? 'scaleY(1.08)' : 'scaleY(1)',
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
}: {
  active?: boolean;
  barCount?: number;
  color?: string;
}) {
  const heights = [30, 60, 90, 45, 80, 50, 95, 40, 70, 85, 55, 75, 40, 65];

  return (
    <div className="flex items-end gap-[2px] h-3.5 select-none" aria-hidden="true">
      {Array.from({ length: barCount }).map((_, i) => (
        <span
          key={i}
          className="w-[2px] rounded-full will-change-transform"
          style={{
            backgroundColor: color,
            height: active ? `${heights[i % heights.length]}%` : '20%',
            animation: active ? `equalizer ${0.4 + (i % 5) * 0.15}s ease-in-out infinite alternate` : 'none',
            animationDelay: `${i * 0.05}s`,
          }}
        />
      ))}
    </div>
  );
}
