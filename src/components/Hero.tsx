import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Play } from 'lucide-react';
import { scrollToSection } from '@/lib/utils';
import { AnimatedWave } from '@/components/Waveform';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen w-full overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-pitch-black">
        {/* Gradient glow top-left */}
        <div
          className="absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full opacity-30 blur-[120px]"
          style={{ background: 'radial-gradient(circle, #E51B36 0%, transparent 70%)' }}
        />
        {/* Gradient glow bottom-right */}
        <div
          className="absolute -bottom-40 -right-40 h-[700px] w-[700px] rounded-full opacity-25 blur-[130px]"
          style={{ background: 'radial-gradient(circle, #168BFF 0%, transparent 70%)' }}
        />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
        {/* Floating orbs */}
        <div className="absolute left-10 top-1/3 h-32 w-32 animate-float-slow rounded-full bg-pitch-red/10 blur-3xl" />
        <div className="absolute right-20 top-1/4 h-40 w-40 animate-float-slow-2 rounded-full bg-pitch-blue/10 blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-5 pt-24 pb-16 text-center sm:px-8">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-6 text-xs font-semibold tracking-[0.3em] text-pitch-gray sm:text-sm"
        >
          <span className="text-pitch-red">●</span> INDEPENDENT MUSIC PUBLISHING &amp; SYNC LICENSING
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="max-w-4xl font-heading text-4xl font-bold leading-[1.1] tracking-tight text-pitch-white sm:text-5xl md:text-6xl lg:text-7xl"
        >
          THE{' '}
          <span className="relative">
            <span className="text-gradient-red">PERFECT SOUND</span>
          </span>
          .<br />
          FOR EVERY STORY.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 max-w-2xl text-base leading-relaxed text-pitch-gray sm:text-lg"
        >
          Discover music that moves stories forward. Perfect Pitch Foreva Publishing connects
          powerful, sync-ready music with filmmakers, brands, music supervisors, and creative
          visionaries.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <button
            onClick={() => scrollToSection('catalog')}
            className="group flex w-full items-center justify-center gap-2 rounded-full bg-pitch-red px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-[#ff3349] hover:shadow-xl hover:shadow-pitch-red/30 sm:w-auto"
          >
            Explore Our Catalog
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-white/20 px-8 py-4 text-base font-semibold text-pitch-white transition-all duration-300 hover:border-pitch-white hover:bg-white/5 sm:w-auto"
          >
            <Play className="h-4 w-4 fill-current" />
            Request Licensing
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12 flex flex-col items-center gap-6"
        >
          <div className="flex items-center gap-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-pitch-red/50" />
            <span className="text-sm font-semibold tracking-wider text-pitch-white">
              250+ TRACKS IN OUR CATALOG
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-pitch-red/50" />
          </div>
          <AnimatedWave barCount={50} color="#E51B36" opacity={0.3} className="h-10 w-full max-w-md" />
          <AnimatedWave barCount={50} color="#168BFF" opacity={0.2} className="h-8 w-full max-w-sm" />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => scrollToSection('about')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-2 text-pitch-gray transition-colors hover:text-pitch-white"
        aria-label="Scroll to about section"
      >
        <span className="text-xs tracking-widest">SCROLL</span>
        <div className="relative flex h-9 w-5 justify-center rounded-full border border-pitch-gray/40">
          <div className="mt-1.5 h-2 w-1 rounded-full bg-pitch-red animate-scroll-indicator" />
        </div>
        <ChevronDown className="h-4 w-4" />
      </motion.button>
    </section>
  );
}
