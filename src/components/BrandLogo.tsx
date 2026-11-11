import { useCallback, useEffect, useRef } from 'react';

type BrandLogoProps = {
  variant?: 'header' | 'footer';
  className?: string;
};

/**
 * Animated video brand logo scaled cleanly across header and footer with reliable
 * React 18 muted autoplay and a subtle rotating studio light rim.
 */
export default function BrandLogo({ variant = 'header', className = '' }: BrandLogoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const tryPlay = useCallback((video: HTMLVideoElement | null) => {
    if (!video) return;

    // Set DOM attributes explicitly because React 18 omits the HTML `muted` attribute.
    video.defaultMuted = true;
    video.muted = true;
    video.playsInline = true;
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');

    if (video.paused) {
      video.play().catch(() => {
        // Gesture/visibility listeners below retry if browser policy defers autoplay.
      });
    }
  }, []);

  const setVideoRef = useCallback(
    (node: HTMLVideoElement | null) => {
      videoRef.current = node;
      tryPlay(node);
    },
    [tryPlay]
  );

  useEffect(() => {
    const resumeIfPaused = () => {
      const video = videoRef.current;
      if (!video) return;
      tryPlay(video);
      if (!video.paused) {
        window.removeEventListener('pointerdown', resumeIfPaused);
      }
    };

    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        tryPlay(videoRef.current);
      }
    };

    window.addEventListener('pointerdown', resumeIfPaused, { passive: true });
    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      window.removeEventListener('pointerdown', resumeIfPaused);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [tryPlay]);

  const frameClasses =
    variant === 'header'
      ? 'h-[58px] sm:h-[68px] md:h-[78px] rounded-xl sm:rounded-2xl shadow-[0_6px_26px_rgba(255,46,77,0.28)] group-hover:scale-[1.03] group-hover:shadow-[0_8px_32px_rgba(255,46,77,0.4)]'
      : 'h-28 sm:h-32 rounded-2xl shadow-[0_10px_32px_rgba(255,46,77,0.24)] group-hover:scale-[1.02] group-hover:shadow-[0_12px_38px_rgba(255,46,77,0.35)]';

  const innerRadius =
    variant === 'header' ? 'rounded-[10.5px] sm:rounded-[14.5px]' : 'rounded-[14.5px]';

  return (
    <span className={`inline-flex items-center ${className}`}>
      <span
        className={`relative block aspect-[960/794] overflow-hidden p-[1.5px] select-none pointer-events-none transition-all duration-300 ${frameClasses}`}
      >
        <span
          aria-hidden="true"
          className="absolute inset-[-60%] animate-spin-slow will-change-transform"
          style={{
            background:
              'conic-gradient(from 0deg, rgba(255,255,255,0.2) 0deg, #FF2E4D 90deg, #F59E0B 160deg, rgba(255,255,255,0.25) 240deg, #FF2E4D 320deg, rgba(255,255,255,0.2) 360deg)',
          }}
        />
        <span className={`relative block h-full w-full overflow-hidden bg-white ${innerRadius}`}>
          <video
            ref={setVideoRef}
            src={`/logo.mp4?slot=${variant}`}
            poster="/logo-poster.png"
            autoPlay
            loop
            muted
            playsInline
            disablePictureInPicture
            preload="auto"
            aria-hidden="true"
            onLoadedData={(e) => tryPlay(e.currentTarget)}
            onCanPlay={(e) => tryPlay(e.currentTarget)}
            className="h-full w-full object-cover"
          />
        </span>
      </span>
      <span className="sr-only">Perfect Pitch Foreva Publishing LLC</span>
    </span>
  );
}
