import { motion } from 'framer-motion';
import { Music4, Library, MessageCircle } from 'lucide-react';
import { useInView } from '@/lib/utils';
import { scrollToSection } from '@/lib/utils';

const SERVICES = [
  {
    icon: Music4,
    title: 'Sync Licensing',
    description:
      'Music for film, television, advertising, and visual storytelling. Discover tracks that complement your creative vision.',
    accent: 'red' as const,
  },
  {
    icon: Library,
    title: 'Music Catalog Access',
    description:
      'Explore a growing collection of approximately 250 tracks with metadata prepared to support music discovery and synchronization opportunities.',
    accent: 'blue' as const,
  },
  {
    icon: MessageCircle,
    title: 'Custom Licensing Inquiries',
    description:
      'Connect with our team to discuss track availability, licensing needs, intended usage, and project requirements.',
    accent: 'red' as const,
  },
];

const ACCENT = {
  red: {
    bg: 'bg-pitch-red/10',
    text: 'text-pitch-red',
    border: 'group-hover:border-pitch-red/40',
    glow: 'group-hover:shadow-pitch-red/10',
  },
  blue: {
    bg: 'bg-pitch-blue/10',
    text: 'text-pitch-blue',
    border: 'group-hover:border-pitch-blue/40',
    glow: 'group-hover:shadow-pitch-blue/10',
  },
};

export default function Services() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section id="services" className="relative section-padding overflow-hidden">
      <div
        className="absolute right-1/3 bottom-1/4 h-80 w-80 rounded-full opacity-[0.06] blur-[100px]"
        style={{ background: 'radial-gradient(circle, #168BFF 0%, transparent 70%)' }}
      />

      <div ref={ref} className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <span className="text-xs font-semibold tracking-[0.3em] text-pitch-red">
            OUR EXPERTISE
          </span>
          <h2 className="mt-4 font-heading text-3xl font-bold leading-tight text-pitch-white sm:text-4xl md:text-5xl">
            The Right Music. The Right Moment.
          </h2>
        </motion.div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {SERVICES.map((service, i) => {
            const accent = ACCENT[service.accent];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
                className={`group relative overflow-hidden rounded-2xl border border-white/5 bg-pitch-charcoal/50 p-8 transition-all duration-500 hover:shadow-2xl ${accent.border} ${accent.glow}`}
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-white/5 transition-all duration-300 group-hover:scale-110">
                  <div className={`flex h-full w-full items-center justify-center rounded-xl ${accent.bg}`}>
                    <service.icon className={`h-6 w-6 ${accent.text}`} strokeWidth={1.5} />
                  </div>
                </div>
                <h3 className="font-heading text-xl font-bold text-pitch-white">
                  {service.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-pitch-gray">
                  {service.description}
                </p>
                {/* Hover glow line */}
                <div className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-pitch-red to-pitch-blue transition-all duration-500 group-hover:w-full" />
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <button
            onClick={() => scrollToSection('contact')}
            className="group inline-flex items-center gap-2 text-sm font-semibold text-pitch-gray transition-colors hover:text-pitch-white"
          >
            <span className="border-b border-pitch-red/30 pb-0.5 transition-colors group-hover:border-pitch-red">
              Ready to discuss your project?
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
