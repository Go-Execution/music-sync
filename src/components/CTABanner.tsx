import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useInView, scrollToSection } from '@/lib/utils';

export default function CTABanner() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section className="relative overflow-hidden px-5 py-20 sm:px-8 sm:py-28">
      <div ref={ref} className="relative mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-3xl">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-pitch-black via-[#1a0a0e] to-pitch-black" />
          <div
            className="absolute left-0 top-0 h-full w-1/2 rounded-full opacity-30 blur-[100px]"
            style={{ background: 'radial-gradient(circle, #E51B36 0%, transparent 60%)' }}
          />
          <div
            className="absolute right-0 bottom-0 h-full w-1/2 rounded-full opacity-20 blur-[100px]"
            style={{ background: 'radial-gradient(circle, #168BFF 0%, transparent 60%)' }}
          />
          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }}
          />
          {/* Border glow */}
          <div className="absolute inset-0 rounded-3xl border border-pitch-red/20" />

          <div className="relative z-10 flex flex-col items-center justify-center gap-8 px-6 py-16 text-center sm:px-12 sm:py-24">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="font-heading text-3xl font-bold leading-tight text-pitch-white sm:text-4xl md:text-5xl lg:text-6xl"
            >
              LET'S MAKE SOMETHING<br />
              <span className="text-gradient-red">UNFORGETTABLE.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="max-w-xl text-lg text-pitch-gray"
            >
              Bring your next project to life with music that makes an impact.
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              onClick={() => scrollToSection('contact')}
              className="group flex items-center gap-2 rounded-full bg-pitch-red px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-white hover:text-pitch-red hover:shadow-2xl hover:shadow-pitch-red/30"
            >
              Start a Licensing Inquiry
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
