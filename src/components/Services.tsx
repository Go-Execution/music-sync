import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Clock, Layers, ArrowRight, Check, Sliders, Volume2, Sparkles } from 'lucide-react';
import { scrollToSection } from '@/lib/utils';
import { LiveEqualizer } from './Waveform';

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
  const [activeStem, setActiveStem] = useState<string>('Drums & 808s');
  const [stemLevels, setStemLevels] = useState<Record<string, number>>({
    'Drums & 808s': 85,
    'Sub Bassline': 90,
    'Hybrid Strings': 75,
    'Vocal Atmosphere': 60,
  });

  const stemKeys = ['Drums & 808s', 'Sub Bassline', 'Hybrid Strings', 'Vocal Atmosphere'];

  return (
    <section id="services" className="relative bg-[#07080B] py-20 sm:py-32 border-t border-white/5 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/4 right-10 h-72 w-72 rounded-full bg-[#2563EB]/10 blur-[130px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[10px] sm:text-xs uppercase text-[#FF2E4D] tracking-widest mb-3">
            <Sparkles className="h-3 w-3" />
            <span>THE ONE-STOP SYNC ADVANTAGE</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white">
            BUILT TO ELIMINATE CLEARANCE FRICTION.
          </h2>
          <p className="mt-3 sm:mt-4 text-xs sm:text-base text-[#8E95A5] leading-relaxed">
            In sync licensing, a missing split sheet or slow co-writer can halt an entire production.
            We provide absolute copyright indemnity and instant stem delivery.
          </p>
        </div>

        {/* 3 Pillars Cards */}
        <div className="grid gap-4 sm:gap-8 md:grid-cols-3">
          {PILLARS.map((pillar, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="group rounded-2xl sm:rounded-3xl border border-white/10 bg-[#0C0E14] p-6 sm:p-8 transition-all duration-300 hover:border-[#FF2E4D]/40 hover:bg-[#11131E] hover:shadow-xl hover:shadow-[#FF2E4D]/10"
            >
              <div className="flex items-center justify-between mb-5 sm:mb-6">
                <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl bg-white/5 text-[#FF2E4D] group-hover:bg-[#FF2E4D] group-hover:text-white transition-colors duration-200">
                  <pillar.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-[#8E95A5] rounded-full border border-white/10 px-2.5 py-0.5 sm:px-3 sm:py-1">
                  {pillar.badge}
                </span>
              </div>

              <h3 className="font-display text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3 group-hover:text-[#FF2E4D] transition-colors">
                {pillar.title}
              </h3>

              <p className="text-xs sm:text-sm text-[#8E95A5] leading-relaxed">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Interactive Stem Mixing Console Demonstration */}
        <div className="mt-12 sm:mt-16 rounded-3xl border border-white/15 bg-[#0C0E15] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          {/* Subtle neon glow inside console */}
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#FF2E4D]/5 blur-3xl pointer-events-none" />

          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            {/* Left Column: Story & Highlights */}
            <div className="lg:col-span-6 space-y-4">
              <span className="font-mono text-xs uppercase text-[#F59E0B] tracking-wider flex items-center gap-1.5 font-bold">
                <Sliders className="h-4 w-4" />
                <span>INTERACTIVE MULTI-TRACK STEM DECK</span>
              </span>

              <h3 className="font-display text-2xl sm:text-4xl font-extrabold text-white leading-tight">
                Every Master Comes With Full Multi-Track Stems.
              </h3>

              <p className="text-xs sm:text-sm text-[#A4A9B5] leading-relaxed">
                Film editors need music that adapts to picture changes. We provide 24-bit / 48kHz WAV
                deliverables with isolated sub-mixes so your cutting room can drop dialogue dips,
                automate build-ups, and strip out elements with zero phase issues.
              </p>

              <div className="flex flex-wrap gap-3 pt-2 font-mono text-xs text-white">
                <span className="flex items-center gap-1.5 rounded-lg bg-white/5 border border-white/10 px-3 py-1">
                  <Check className="h-3.5 w-3.5 text-emerald-400" /> Full Mix WAV
                </span>
                <span className="flex items-center gap-1.5 rounded-lg bg-white/5 border border-white/10 px-3 py-1">
                  <Check className="h-3.5 w-3.5 text-emerald-400" /> Instrumental Mix
                </span>
                <span className="flex items-center gap-1.5 rounded-lg bg-white/5 border border-white/10 px-3 py-1">
                  <Check className="h-3.5 w-3.5 text-emerald-400" /> 15s / 30s Cutdowns
                </span>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => scrollToSection('contact')}
                  className="flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-display text-xs font-bold uppercase tracking-wider text-[#07080B] shadow-xl transition-all hover:bg-[#FF2E4D] hover:text-white"
                >
                  <span>Request Custom Stems / Pitch</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Right Column: Virtual Mixing Console Faders */}
            <div className="lg:col-span-6 rounded-2xl border border-white/10 bg-black/60 p-5 sm:p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3 font-mono text-xs">
                <span className="text-white font-bold flex items-center gap-1.5">
                  <Volume2 className="h-4 w-4 text-[#FF2E4D]" />
                  <span>VIRTUAL STEM CONSOLE</span>
                </span>
                <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>4 CHANNELS ACTIVE</span>
                </span>
              </div>

              {/* 4 Interactive Stem Fader Strips */}
              <div className="space-y-3">
                {stemKeys.map((stem) => {
                  const level = stemLevels[stem] ?? 70;
                  const isSelected = activeStem === stem;

                  return (
                    <div
                      key={stem}
                      onClick={() => setActiveStem(stem)}
                      className={`p-3 rounded-xl border transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? 'border-[#FF2E4D] bg-[#16131D]'
                          : 'border-white/5 bg-[#0E1017] hover:border-white/15'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-mono mb-2">
                        <span className="text-white font-semibold flex items-center gap-2">
                          <span className={`h-2 w-2 rounded-full ${isSelected ? 'bg-[#FF2E4D]' : 'bg-white/30'}`} />
                          <span>{stem}</span>
                        </span>
                        <div className="flex items-center gap-3">
                          <LiveEqualizer active={true} barCount={4} color={isSelected ? '#FF2E4D' : '#F59E0B'} />
                          <span className="text-[#8E95A5] text-[10px] w-8 text-right">{level}%</span>
                        </div>
                      </div>

                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={level}
                        onChange={(e) => {
                          const val = parseInt(e.target.value, 10);
                          setStemLevels((prev) => ({ ...prev, [stem]: val }));
                        }}
                        className="w-full h-1.5 rounded-full bg-white/10 accent-[#FF2E4D] cursor-pointer"
                        aria-label={`${stem} volume`}
                      />
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/5 font-mono text-[10px] text-[#8E95A5]">
                <span>SAMPLE RATE: 48,000 Hz / 24-BIT</span>
                <span className="text-[#F59E0B]">INDEMNIFIED MASTER</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
