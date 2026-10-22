import { useState } from 'react';
import { motion } from 'framer-motion';
import { Film, Tv, Radio, Gamepad2, Megaphone, Video, CheckCircle2, ArrowRight } from 'lucide-react';
import { scrollToSection } from '@/lib/utils';

type ProjectScope = {
  id: string;
  name: string;
  icon: typeof Film;
  turnaround: string;
  rightsScope: string;
  stems: string;
  typicalUse: string;
};

const PROJECT_SCOPES: ProjectScope[] = [
  {
    id: 'film',
    name: 'Feature Film & Cinema',
    icon: Film,
    turnaround: '24 Hours',
    rightsScope: 'Worldwide Theatrical, Festival & All Media',
    stems: 'Full 5.1/7.1 Stems + Instrumental',
    typicalUse: 'Opening Title, Key Dramatic Climax, Chase Sequence',
  },
  {
    id: 'tv',
    name: 'Television & Streaming',
    icon: Tv,
    turnaround: '12-24 Hours',
    rightsScope: 'Global SVOD / Linear Broadcast / In Perpetuity',
    stems: 'TV Mix, Clean Vocal, Full Multi-track',
    typicalUse: 'Season Finale, Montage, End Credit Suite',
  },
  {
    id: 'ad',
    name: 'Brand & Global Commercial',
    icon: Megaphone,
    turnaround: 'Same Day',
    rightsScope: 'Worldwide Broadcast, Digital, Cinema & OTT',
    stems: '15s/30s/60s Cutdowns, Instrumental, Vocal Up',
    typicalUse: 'Product Anthem, Super Bowl Spot, Digital Takeover',
  },
  {
    id: 'trailer',
    name: 'Theatrical Trailer & Promo',
    icon: Video,
    turnaround: 'Under 12 Hours',
    rightsScope: 'All Media Worldwide Including Digital Promos',
    stems: 'Hits, Risers, Sub-booms, Trailer FX Stems',
    typicalUse: 'Teaser Trailer, Key Art Motion Poster, TV Spot',
  },
  {
    id: 'game',
    name: 'Video Game & Interactive',
    icon: Gamepad2,
    turnaround: '24-48 Hours',
    rightsScope: 'Worldwide In-Game, DLC, Trailer & Streaming',
    stems: 'Interactive Looping Stems, Transition Hits',
    typicalUse: 'Radio Station, Boss Fight, Cinematic Cutscene',
  },
  {
    id: 'indie',
    name: 'Indie & Festival Doc',
    icon: Radio,
    turnaround: '24 Hours',
    rightsScope: 'Festival Rights with Streamer Step-Up Option',
    stems: 'Stereo Master & Instrumental WAV',
    typicalUse: 'Festival Run, Indie Premiere, Crowdfunded Film',
  },
];

export default function WhyWorkWithUs() {
  const [activeScope, setActiveScope] = useState<ProjectScope>(PROJECT_SCOPES[0]);

  return (
    <section className="relative bg-[#07080B] py-24 sm:py-32 border-t border-white/5 overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-mono text-xs uppercase text-[#FF2E4D] tracking-widest">
              SUPERVISOR WORKFLOW CALCULATOR
            </span>
            <h2 className="mt-3 font-display text-3xl sm:text-5xl font-extrabold text-white">
              EXPLORE CLEARANCE BY PROJECT TYPE.
            </h2>
            <p className="mt-4 text-base text-[#8E95A5]">
              Select your production medium below to view turnaround times, standard rights scopes,
              and stem package deliverables tailored for your schedule.
            </p>
          </motion.div>
        </div>

        {/* Project Selector Pills */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
          {PROJECT_SCOPES.map((scope) => {
            const Icon = scope.icon;
            const isSelected = activeScope.id === scope.id;
            return (
              <button
                key={scope.id}
                onClick={() => setActiveScope(scope)}
                className={`flex items-center gap-2 rounded-2xl border px-4 py-3 font-display text-xs font-bold uppercase transition-all ${
                  isSelected
                    ? 'border-[#FF2E4D] bg-[#FF2E4D] text-white shadow-xl shadow-[#FF2E4D]/25'
                    : 'border-white/10 bg-[#0E1017] text-[#8E95A5] hover:border-white/20 hover:text-white'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{scope.name}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Project Details Card */}
        <motion.div
          key={activeScope.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-8 rounded-3xl border border-white/10 bg-[#0E1017] p-6 sm:p-10 shadow-2xl backdrop-blur-xl"
        >
          <div className="grid gap-8 md:grid-cols-12 md:items-center">
            <div className="md:col-span-8 space-y-4">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-[#FF2E4D] font-bold">
                  RECOMMENDED CLEARANCE ARCHITECTURE
                </span>
                <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 font-mono text-[10px] text-emerald-400">
                  GUARANTEED {activeScope.turnaround}
                </span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                {activeScope.name}
              </h3>

              <div className="grid gap-4 sm:grid-cols-2 pt-2">
                <div className="rounded-xl border border-white/5 bg-black/30 p-4">
                  <span className="font-mono text-[10px] uppercase text-[#8E95A5] block">
                    Rights Coverage:
                  </span>
                  <span className="font-display text-sm font-semibold text-white mt-1 block">
                    {activeScope.rightsScope}
                  </span>
                </div>

                <div className="rounded-xl border border-white/5 bg-black/30 p-4">
                  <span className="font-mono text-[10px] uppercase text-[#8E95A5] block">
                    Stems Included:
                  </span>
                  <span className="font-display text-sm font-semibold text-white mt-1 block">
                    {activeScope.stems}
                  </span>
                </div>
              </div>

              <p className="text-xs text-[#8E95A5]">
                <strong className="text-white">Typical Placement Fit:</strong> {activeScope.typicalUse}
              </p>
            </div>

            <div className="md:col-span-4 flex flex-col items-center justify-center p-6 border-t md:border-t-0 md:border-l border-white/10 gap-4 text-center">
              <span className="font-mono text-xs text-[#8E95A5]">Ready to lock in a quote?</span>
              <button
                onClick={() => scrollToSection('contact')}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-white py-3.5 px-6 font-display text-xs font-bold uppercase tracking-wider text-[#07080B] shadow-lg transition-all hover:bg-[#FF2E4D] hover:text-white"
              >
                <span>Request {activeScope.name} Quote</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3" /> Turnaround: {activeScope.turnaround}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
