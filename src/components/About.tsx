import { motion } from 'framer-motion';
import { Music2, Layers, Clapperboard } from 'lucide-react';
import { useInView } from '@/lib/utils';

const FEATURES = [
  { icon: Music2, label: '250+ Music Tracks' },
  { icon: Layers, label: 'Sync-Focused Catalog' },
  { icon: Clapperboard, label: 'Music for Media &amp; Brands' },
];

export default function About() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section id="about" className="relative section-padding overflow-hidden">
      <div
        className="absolute right-0 top-1/4 h-96 w-96 rounded-full opacity-10 blur-[100px]"
        style={{ background: 'radial-gradient(circle, #168BFF 0%, transparent 70%)' }}
      />

      <div ref={ref} className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-14 text-center"
        >
          <span className="text-xs font-semibold tracking-[0.3em] text-pitch-red">
            WHO WE ARE
          </span>
          <h2 className="mt-4 font-heading text-3xl font-bold leading-tight text-pitch-white sm:text-4xl md:text-5xl">
            Where Music Meets Opportunity.
          </h2>
        </motion.div>

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="group relative overflow-hidden rounded-2xl">
              {/* Abstract studio image via CSS */}
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-pitch-charcoal">
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(135deg, #151820 0%, #08090D 100%)',
                  }}
                />
                {/* Studio console abstract */}
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <div className="grid grid-cols-12 gap-1 opacity-60">
                    {Array.from({ length: 48 }).map((_, i) => (
                      <div
                        key={i}
                        className="h-12 rounded-sm"
                        style={{
                          background: `linear-gradient(to top, ${
                            i % 3 === 0 ? '#E51B36' : i % 3 === 1 ? '#168BFF' : '#2a2e38'
                          } ${Math.random() * 60}%, transparent 100%)`,
                          opacity: 0.3 + Math.random() * 0.5,
                        }}
                      />
                    ))}
                  </div>
                  <div className="mt-3 flex gap-2">
                    {[0.3, 0.6, 0.4, 0.8, 0.5, 0.7, 0.3, 0.9, 0.4, 0.6, 0.5, 0.8].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-full bg-pitch-red/40"
                        style={{ height: `${h * 40 + 10}px` }}
                      />
                    ))}
                  </div>
                </div>
                {/* Glow */}
                <div className="absolute top-0 left-0 h-40 w-40 rounded-full bg-pitch-red/20 blur-3xl" />
                <div className="absolute bottom-20 right-0 h-32 w-32 rounded-full bg-pitch-blue/20 blur-3xl" />
              </div>
              <div className="absolute inset-0 rounded-2xl border border-white/5" />
            </div>
            {/* Floating tag */}
            <div className="absolute -bottom-4 -right-4 rounded-xl border border-white/10 bg-pitch-charcoal/90 px-5 py-3 backdrop-blur-md sm:-right-6">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-pitch-red/20">
                  <Music2 className="h-4 w-4 text-pitch-red" />
                </div>
                <div>
                  <p className="font-heading text-2xl font-bold text-pitch-white">250+</p>
                  <p className="text-xs text-pitch-gray">Sync-Ready Tracks</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <p className="text-lg leading-relaxed text-pitch-gray">
              At Perfect Pitch Foreva Publishing LLC, we believe the right music transforms moments
              into unforgettable experiences. We specialize in connecting our catalog of music with
              opportunities across film, television, advertising, and digital media.
            </p>
            <p className="mt-6 text-lg leading-relaxed text-pitch-gray">
              With approximately 250 tracks prepared for synchronization opportunities, our goal is
              to make discovering and licensing music a more seamless experience for creative
              professionals.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {FEATURES.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.15 }}
                  className="group flex flex-col items-start gap-3 rounded-xl border border-white/5 bg-pitch-charcoal/50 p-5 transition-all duration-300 hover:border-pitch-red/30 hover:bg-pitch-charcoal"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-pitch-red/10 text-pitch-red transition-colors group-hover:bg-pitch-red group-hover:text-white">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <span
                    className="text-sm font-medium text-pitch-white"
                    dangerouslySetInnerHTML={{ __html: feature.label }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
