export function Waveform({
  bars,
  active = false,
  color = '#E51B36',
  className = '',
  height = 32,
}: {
  bars: number[];
  active?: boolean;
  color?: string;
  className?: string;
  height?: number;
}) {
  return (
    <div
      className={`flex items-center justify-center gap-[2px] ${className}`}
      style={{ height }}
      aria-hidden="true"
    >
      {bars.map((bar, i) => (
        <div
          key={i}
          className="rounded-full"
          style={{
            width: 3,
            height: `${bar * 100}%`,
            backgroundColor: color,
            opacity: active ? 0.9 : 0.4,
            animation: active
              ? `wavePulse ${0.8 + (i % 5) * 0.15}s ease-in-out infinite`
              : undefined,
            animationDelay: `${i * 0.05}s`,
          }}
        />
      ))}
    </div>
  );
}

export function AnimatedWave({
  barCount = 40,
  color = '#E51B36',
  className = '',
  opacity = 0.15,
}: {
  barCount?: number;
  color?: string;
  className?: string;
  opacity?: number;
}) {
  const bars = Array.from({ length: barCount }, (_, i) =>
    0.3 + Math.abs(Math.sin(i * 0.5)) * 0.7
  );

  return (
    <div
      className={`flex items-center justify-center gap-[3px] ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      {bars.map((bar, i) => (
        <div
          key={i}
          className="rounded-full"
          style={{
            width: 3,
            height: `${bar * 100}%`,
            backgroundColor: color,
            animation: `wavePulse ${1.2 + (i % 7) * 0.18}s ease-in-out infinite`,
            animationDelay: `${i * 0.06}s`,
          }}
        />
      ))}
    </div>
  );
}
