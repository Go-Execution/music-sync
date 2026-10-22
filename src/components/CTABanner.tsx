import { Sparkles, ArrowRight, ShieldCheck, Mail } from 'lucide-react';
import { scrollToSection } from '@/lib/utils';

export default function CTABanner() {
  return (
    <section className="relative bg-[#07080B] py-20 sm:py-28 px-5 sm:px-8 border-t border-white/5 overflow-hidden">
      <div className="mx-auto max-w-6xl relative">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#121420] via-[#0E1017] to-[#07080B] p-8 sm:p-16 shadow-2xl">
          {/* Subtle background photo overlay */}
          <div className="absolute inset-0 z-0 opacity-10">
            <img
              src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1600&q=80"
              alt="Atmospheric concert lights"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs uppercase text-[#FF2E4D]">
              <Sparkles className="h-3.5 w-3.5" />
              <span>CUSTOM MUSIC CURATION SERVICE</span>
            </div>

            <h2 className="mt-4 font-display text-3xl sm:text-5xl font-extrabold text-white leading-tight">
              HAVE A SCENE YOU NEED TO SCORE THIS WEEK?
            </h2>

            <p className="mt-4 text-base text-[#A4A9B5] leading-relaxed">
              Send us your scene description, storyboard, or reference tracks. Our creative sync
              team delivers a tailored, pre-cleared playlist with stems within 12 hours.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => scrollToSection('contact')}
                className="flex items-center justify-center gap-2 rounded-xl bg-[#FF2E4D] px-7 py-4 font-display text-xs font-bold uppercase tracking-wider text-white shadow-xl shadow-[#FF2E4D]/25 transition-all hover:bg-[#ff425f]"
              >
                <span>Initiate Free Curation Search</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <a
                href="mailto:licensing@perfectpitchforeva.com"
                className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-4 font-mono text-xs text-white transition-all hover:border-white/20 hover:bg-white/10"
              >
                <Mail className="h-4 w-4 text-[#FF2E4D]" />
                <span>licensing@perfectpitchforeva.com</span>
              </a>
            </div>

            <div className="mt-8 flex items-center gap-6 text-xs text-[#8E95A5] font-mono">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-400" /> Pre-cleared indemnified
              </span>
              <span>•</span>
              <span>No search fees</span>
              <span>•</span>
              <span>24h Turnaround</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
