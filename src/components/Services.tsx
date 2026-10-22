import { motion } from 'framer-motion';
import { ShieldCheck, Clock, Layers, ArrowRight, Check } from 'lucide-react';
import { scrollToSection } from '@/lib/utils';

const PILLARS = [
  {
    icon: ShieldCheck,
    title: '100% One-Stop Ownership',
    badge: 'LEGAL CERTAINTY',
    description:
      'We own and administer both Master and Publishing rights for all 250+ catalog titles. One license agreement clears the entire copyright with zero co-writer delays.',
  },
  {
    icon: Clock,
    title: 'Guaranteed 24-Hour SLA',
    badge: 'RUSH CLEARANCE',
    description:
      'Direct communication with the copyright owners. Whether facing a festival deadline or a fast-breaking trailer drop, we execute quotes and licenses within 24 hours.',
  },
  {
    icon: Layers,
    title: 'Editor-Ready Stems',
    badge: 'FULL SUITE',
    description:
      'Every license includes full 24-bit/48kHz WAV master files, clean instrumentals, TV sub-mixes, and isolated multi-track stems (drums, bass, leads) for precision editing.',
  },
];

export default function Services() {
  return (
    <section id="services" className="relative bg-[#07080B] py-16 sm:py-28 border-t border-white/5 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-20">
          <span className="font-mono text-[10px] sm:text-xs uppercase text-[#FF2E4D] tracking-widest block mb-2">
            THE ONE-STOP MODEL
          </span>
          <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-extrabold text-white">
            BUILT TO ELIMINATE CLEARANCE FRICTION.
          </h2>
          <p className="mt-3 sm:mt-4 text-xs sm:text-base text-[#8E95A5] leading-relaxed">
            In sync licensing, a missing split sheet or slow co-writer can halt an entire production.
            We provide absolute copyright indemnity and instant delivery.
          </p>
        </div>

        {/* 3 Columns */}
        <div className="grid gap-4 sm:gap-8 md:grid-cols-3">
          {PILLARS.map((pillar, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="rounded-2xl sm:rounded-3xl border border-white/5 bg-[#0C0E14] p-6 sm:p-10 transition-colors hover:border-white/15"
            >
              <div className="flex items-center justify-between mb-5 sm:mb-6">
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl bg-white/5 text-[#FF2E4D]">
                  <pillar.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-[#8E95A5] rounded-full border border-white/10 px-2.5 py-0.5 sm:px-3 sm:py-1">
                  {pillar.badge}
                </span>
              </div>

              <h3 className="font-display text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">
                {pillar.title}
              </h3>

              <p className="text-xs sm:text-sm text-[#8E95A5] leading-relaxed">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Visual Studio Strip */}
        <div className="mt-10 sm:mt-16 rounded-2xl sm:rounded-3xl border border-white/10 bg-[#0C0E14] overflow-hidden">
          <div className="grid gap-6 sm:gap-8 lg:grid-cols-12 lg:items-center p-6 sm:p-12">
            <div className="lg:col-span-7 space-y-3 sm:space-y-4">
              <span className="font-mono text-[10px] sm:text-xs uppercase text-[#F59E0B] tracking-wider block">
                ANALOGUE WARMTH • MODERN EDITING
              </span>
              <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-extrabold text-white">
                Bespoke Curation &amp; Temp-Track Adapting.
              </h3>
              <p className="text-xs sm:text-sm text-[#A4A9B5] leading-relaxed">
                Have a scene where a commercial temp track is out of budget? Send us your reference cut.
                Our in-house composers adapt arrangements, dynamics, and edit hits to match your picture seamlessly.
              </p>
              <div className="flex flex-wrap gap-3 sm:gap-4 pt-1 sm:pt-2 font-mono text-[11px] sm:text-xs text-white">
                <span className="flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-emerald-400" /> Free Playlist Curation
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-emerald-400" /> No Sample Hold-ups
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-emerald-400" /> Worldwide Indemnification
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-start lg:justify-end pt-2 sm:pt-0">
              <button
                onClick={() => scrollToSection('contact')}
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 sm:px-7 sm:py-4 font-display text-xs font-bold uppercase tracking-wider text-[#07080B] shadow-xl transition-colors hover:bg-[#FF2E4D] hover:text-white"
              >
                <span>Request Custom Pitch</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
