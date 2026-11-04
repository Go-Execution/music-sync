import { Flame, ShieldCheck, Clock, Layers, Sparkles, Disc3, Radio } from 'lucide-react';

export default function MusicTicker() {
  const highlights = [
    { icon: Flame, text: 'NEW REPERTOIRE DROP: MIDNIGHT DIRECTIVE (92 BPM)' },
    { icon: ShieldCheck, text: '100% ONE-STOP PRE-CLEARED FOR ALL MEDIA' },
    { icon: Clock, text: 'GUARANTEED 24-HOUR SYNC TURNAROUND SLA' },
    { icon: Layers, text: 'FULL MULTI-TRACK STEMS & INSTANT 24-BIT WAV' },
    { icon: Radio, text: 'WORLDWIDE SYNC RIGHTS • IN PERPETUITY' },
    { icon: Sparkles, text: 'BESPOKE RESCORING & TEMP TRACK ADAPTATION' },
    { icon: Disc3, text: '250+ MASTER TITLES CONTROLLED DIRECTLY' },
  ];

  return (
    <div className="relative z-20 border-y border-white/10 bg-[#090B10] py-3 overflow-hidden select-none">
      {/* Soft gradient edge masks */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-[#07080B] to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-[#07080B] to-transparent z-10" />

      <div className="flex w-[200%] animate-marquee whitespace-nowrap">
        {Array.from({ length: 2 }).map((_, loopIdx) => (
          <div key={loopIdx} className="flex items-center gap-8 sm:gap-12 px-4 font-mono text-[11px] sm:text-xs uppercase tracking-widest text-[#8E95A5]">
            {highlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="flex items-center gap-2.5">
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#FF2E4D]/15 text-[#FF2E4D]">
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-white/90 font-medium">{item.text}</span>
                  <span className="text-[#FF2E4D]/50 ml-6">•</span>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
