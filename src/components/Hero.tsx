import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ShieldCheck, Clock, Disc3 } from 'lucide-react';
import { scrollToSection } from '@/lib/utils';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Smooth scroll parallax optimized for GPU compositing
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '16%']);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-[80vh] sm:min-h-[85vh] w-full overflow-hidden bg-[#07080B] flex flex-col justify-center py-16 sm:py-28"
    >
      {/* Background Image with GPU-accelerated parallax */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 z-0 origin-center pointer-events-none will-change-transform transform-gpu"
      >
        <img
          src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1920&q=80"
          alt="Analogue recording studio console"
          decoding="async"
          loading="eager"
          className="h-full w-full object-cover object-center filter brightness-[0.24] contrast-[1.1]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07080B] via-[#07080B]/60 to-[#07080B]/40" />
      </motion.div>

      {/* Hero Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-8 text-center">
        {/* Subtle Category Pill */}
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 sm:px-4 sm:py-1.5 backdrop-blur-md mb-6 sm:mb-8">
          <span className="h-1.5 w-1.5 rounded-full bg-[#FF2E4D]" />
          <span className="font-mono text-[10px] sm:text-xs font-medium tracking-widest uppercase text-white/80">
            INDEPENDENT MUSIC PUBLISHING &amp; SYNC REPERTOIRE
          </span>
        </div>

        {/* Primary Editorial Headline */}
        <h1 className="font-display text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white leading-[1.06] sm:leading-[1.03]">
          SOUND THAT <br />
          <span className="text-gradient-red">DEFINES SCENES</span>.
        </h1>

        {/* Spacious Subtitle */}
        <p className="mx-auto mt-5 sm:mt-8 max-w-2xl text-sm sm:text-lg leading-relaxed text-[#A4A9B5] px-2 sm:px-0">
          Over 250+ sync-ready master recordings pre-cleared for film, television, advertising,
          and digital media. 100% one-stop ownership with guaranteed 24-hour turnaround.
        </p>

        {/* Focused CTAs */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md sm:max-w-none mx-auto">
          <button
            onClick={() => scrollToSection('catalog')}
            className="group flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-[#FF2E4D] px-6 py-3.5 sm:px-8 sm:py-4 font-display text-xs font-bold uppercase tracking-wider text-white shadow-xl shadow-[#FF2E4D]/25 transition-all hover:bg-[#ff425f]"
          >
            <span>Explore 250+ Master Tracks</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            onClick={() => scrollToSection('contact')}
            className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 sm:px-8 sm:py-4 font-display text-xs font-bold uppercase tracking-wider text-white backdrop-blur-md transition-all hover:bg-white/10"
          >
            <span>Request Licensing Quote</span>
          </button>
        </div>

        {/* Clean 3-metric strip: Responsive 3-col on all screens */}
        <div className="mt-12 sm:mt-16 grid grid-cols-3 gap-2 sm:gap-8 border-t border-white/10 pt-8 sm:pt-10 max-w-3xl mx-auto">
          <div className="flex flex-col items-center">
            <span className="font-display text-xl sm:text-3xl font-extrabold text-white">250+</span>
            <span className="text-[10px] sm:text-xs text-[#8E95A5] mt-0.5 sm:mt-1 flex items-center gap-1 font-mono text-center">
              <Disc3 className="h-3 w-3 text-[#FF2E4D] hidden xs:inline" /> Repertoire
            </span>
          </div>

          <div className="flex flex-col items-center">
            <span className="font-display text-xl sm:text-3xl font-extrabold text-white">100%</span>
            <span className="text-[10px] sm:text-xs text-[#8E95A5] mt-0.5 sm:mt-1 flex items-center gap-1 font-mono text-center">
              <ShieldCheck className="h-3 w-3 text-emerald-400 hidden xs:inline" /> One-Stop
            </span>
          </div>

          <div className="flex flex-col items-center">
            <span className="font-display text-xl sm:text-3xl font-extrabold text-white">24H</span>
            <span className="text-[10px] sm:text-xs text-[#8E95A5] mt-0.5 sm:mt-1 flex items-center gap-1 font-mono text-center">
              <Clock className="h-3 w-3 text-[#F59E0B] hidden xs:inline" /> SLA
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
