import { motion } from 'framer-motion';
import { Layers, FileText, MessageSquare, ArrowRight } from 'lucide-react';
import { useInView, scrollToSection } from '@/lib/utils';
import { AnimatedWave } from '@/components/Waveform';

const VALUES = [
  {
    icon: Layers,
    title: 'Curated Music Collection',
    description: 'Music for diverse creative applications.',
  },
  {
    icon: FileText,
    title: 'Sync-Ready Metadata',
    description: 'Organized track information to help streamline discovery.',
  },
  {
    icon: MessageSquare,
    title: 'Direct Licensing Conversations',
    description: "Connect about your production's unique music requirements.",
  },
];

export default function WhyWorkWithUs() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section className="relative section-padding overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-pitch-charcoal/30" />
      <div
        className="absolute left-0 top-1/3 h-96 w-96 rounded-full opacity-[0.1] blur-[120px]"
        style={{ background: 'radial-gradient(circle, #E51B36 0%, transparent 70%)' }}
      />
      <div
        className="absolute right-0 bottom-1/3 h-96 w-96 rounded-full opacity-[0.08] blur-[120px]"
        style={{ background: 'radial-gradient(circle, #168BFF 0%, transparent 70%)' }}
      />

      {/* Animated wave background */}
      <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 opacity-[0.05]">
        <AnimatedWave barCount={80} color="#E51B36" className="h-24 w-full" />
      </div>

      <div ref={ref} className="relative z-10 mx-auto max-w-5xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="font-heading text-3xl font-bold leading-[1.15] text-pitch-white sm:text-4xl md:text-5xl lg:text-6xl">
            YOUR VISION DESERVES<br />
            THE <span className="text-gradient-red">PERFECT SOUND</span>.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-pitch-gray">
            Whether you're crafting a commercial, producing a film, or building an unforgettable
            brand moment, the right soundtrack makes the difference.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {VALUES.map((value, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.15 }}
              className="group flex flex-col items-center gap-4 rounded-2xl border border-white/5 bg-pitch-black/40 p-6 text-center transition-all duration-300 hover:border-pitch-red/20"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-pitch-red/20 to-pitch-blue/20 text-pitch-red transition-transform duration-300 group-hover:scale-110">
                <value.icon className="h-6 w-6" strokeWidth={1.5} />
              </div>
              <h3 className="font-heading text-lg font-semibold text-pitch-white">
                {value.title}
              </h3>
              <p className="text-sm leading-relaxed text-pitch-gray">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-12 text-center"
        >
          <button
            onClick={() => scrollToSection('contact')}
            className="group inline-flex items-center gap-2 rounded-full bg-pitch-red px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-[#ff3349] hover:shadow-xl hover:shadow-pitch-red/30"
          >
            Let's Find Your Sound
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
