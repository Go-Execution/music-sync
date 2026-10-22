import { Disc3, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { scrollToSection } from '@/lib/utils';

export default function Footer() {
  return (
    <footer className="relative bg-[#050608] border-t border-white/10 text-[#8E95A5] py-12 sm:py-20 pb-28 sm:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="grid gap-8 sm:gap-10 md:grid-cols-12 pb-10 sm:pb-12 border-b border-white/5">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-3 sm:space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-[#FF2E4D] text-white">
                <Disc3 className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <div>
                <span className="font-display text-sm sm:text-base font-bold text-white block leading-tight">
                  PERFECT PITCH FOREVA
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#8E95A5]">
                  PUBLISHING LLC • REPERTOIRE
                </span>
              </div>
            </div>

            <p className="text-xs leading-relaxed max-w-sm">
              Independent music publishing company and sync licensing catalog. Connecting 250+ pre-cleared
              master recordings with filmmakers, television networks, advertising agencies, and interactive creators worldwide.
            </p>

            <div className="flex items-center gap-2 font-mono text-xs text-white">
              <ShieldCheck className="h-4 w-4 text-emerald-400 flex-shrink-0" />
              <span>100% One-Stop Master &amp; Publishing Rights</span>
            </div>
          </div>

          {/* Catalog Genres */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-widest text-white font-semibold">
              Repertoire Genres
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <button onClick={() => scrollToSection('catalog')} className="hover:text-white transition-colors">
                  Cinematic Orchestral &amp; Hybrid
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('catalog')} className="hover:text-white transition-colors">
                  Gritty &amp; Anthemic Hip-Hop
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('catalog')} className="hover:text-white transition-colors">
                  Late-Night R&amp;B &amp; Neo-Soul
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('catalog')} className="hover:text-white transition-colors">
                  Cyberpunk &amp; Modular Synth
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('catalog')} className="hover:text-white transition-colors">
                  Atmospheric Indie &amp; Acoustic
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Nav & Supervisor Desk */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-widest text-white font-semibold">
              Licensing Desk
            </h4>
            <div className="rounded-2xl border border-white/5 bg-[#0E1017] p-4 text-xs space-y-2 font-mono">
              <p className="text-white">Direct Supervisor Inquiries:</p>
              <a
                href="mailto:licensing@perfectpitchforeva.com"
                className="text-[#FF2E4D] hover:underline flex items-center gap-1"
              >
                licensing@perfectpitchforeva.com <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
              <p className="text-[11px] text-[#8E95A5] pt-1">
                24-Hour turnaround for emergency film festival and broadcast trailer deliverables.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-center sm:text-left">
          <p>© 2026 Perfect Pitch Foreva Publishing LLC. All rights reserved.</p>
          <div className="flex items-center gap-4 sm:gap-6 text-[11px] sm:text-xs">
            <span>Pre-Cleared for Global Media</span>
            <span>•</span>
            <span>Indemnified Sync Licensing</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
