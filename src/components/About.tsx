import { motion } from 'framer-motion';
import { Disc3, Check, SlidersHorizontal } from 'lucide-react';
import { scrollToSection } from '@/lib/utils';

export default function About() {
  return (
    <section id="about" className="relative bg-[#07080B] py-24 sm:py-32 border-t border-white/5 overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          {/* Visual: Real Studio Photography */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0E1017] shadow-2xl">
              <div className="aspect-[4/3] w-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80"
                  alt="Composer mixing master track on SSL console"
                  className="h-full w-full object-cover filter brightness-[0.85] contrast-[1.1] transition-transform duration-700 hover:scale-105"
                />
              </div>

              {/* Floating metadata badge */}
              <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/10 bg-[#07080B]/90 p-4 backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FF2E4D]/20 text-[#FF2E4D]">
                      <SlidersHorizontal className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="font-display text-sm font-bold text-white block">
                        ANALOGUE &amp; HYBRID MASTERING
                      </span>
                      <span className="font-mono text-[10px] text-[#8E95A5]">
                        NEVE • SSL • 2-INCH STUDER TAPE ARCHIVE
                      </span>
                    </div>
                  </div>
                  <span className="font-mono text-[11px] font-bold text-emerald-400">
                    HI-RES 96kHz
                  </span>
                </div>
              </div>
            </div>

            {/* Accent backdrop glow */}
            <div className="absolute -bottom-6 -right-6 -z-10 h-64 w-64 rounded-full bg-[#FF2E4D]/10 blur-3xl" />
          </motion.div>

          {/* Right Column: Editorial story */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs uppercase text-[#FF2E4D]">
              <Disc3 className="h-3.5 w-3.5" />
              <span>THE REPERTOIRE VISION</span>
            </div>

            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-white sm:text-5xl leading-tight">
              MUSIC WRITTEN FOR THE CUTTING ROOM.
            </h2>

            <p className="mt-5 text-base text-[#A4A9B5] leading-relaxed">
              Perfect Pitch Foreva Publishing LLC was founded on a singular conviction: music for media
              should possess the artistic integrity of a standalone vinyl release, paired with the structural
              precision required by world-class film editors.
            </p>

            <p className="mt-4 text-base text-[#A4A9B5] leading-relaxed">
              Every composition in our 250+ catalog is crafted with dynamics, edit points, stingers,
              and rhythmic transitions in mind—making cuts feel natural, effortless, and cinematic.
            </p>

            {/* Key tenets */}
            <div className="mt-8 grid gap-3 sm:grid-cols-2 font-mono text-xs text-white">
              <div className="flex items-center gap-2 rounded-xl border border-white/5 bg-[#0E1017] p-3">
                <Check className="h-4 w-4 text-[#FF2E4D] flex-shrink-0" />
                <span>Zero Sample Clearance Issues</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-white/5 bg-[#0E1017] p-3">
                <Check className="h-4 w-4 text-[#FF2E4D] flex-shrink-0" />
                <span>Direct Rights Holder Access</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-white/5 bg-[#0E1017] p-3">
                <Check className="h-4 w-4 text-[#FF2E4D] flex-shrink-0" />
                <span>Indemnified Synchronization</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-white/5 bg-[#0E1017] p-3">
                <Check className="h-4 w-4 text-[#FF2E4D] flex-shrink-0" />
                <span>24/7 Global Licensing Support</span>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <button
                onClick={() => scrollToSection('catalog')}
                className="rounded-xl bg-[#FF2E4D] px-6 py-3 font-display text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-[#FF2E4D]/25 transition-all hover:bg-[#ff425f]"
              >
                Browse Our Complete Vault
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
