import { useEffect, useState } from 'react';
import { Menu, X, Disc3, Sparkles } from 'lucide-react';
import { scrollToSection } from '@/lib/utils';
import { audioEngine } from '@/lib/audioEngine';
import { LiveEqualizer } from './Waveform';

const NAV_ITEMS = [
  { label: 'Repertoire', id: 'catalog' },
  { label: 'Placements', id: 'showcase' },
  { label: 'One-Stop Model', id: 'services' },
  { label: 'Licensing Desk', id: 'contact' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.scrollY > 20;
          setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const unsub = audioEngine.subscribeTrack((_, playing) => {
      setIsAudioPlaying(playing);
    });
    return unsub;
  }, []);

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    scrollToSection(id);
  };

  return (
    <header
      className={`sticky top-0 left-0 right-0 z-40 transition-colors duration-200 will-change-transform ${
        isScrolled
          ? 'glass-header py-3 sm:py-3.5 shadow-2xl'
          : 'bg-[#07080B]/80 backdrop-blur-md py-3.5 sm:py-5 border-b border-white/5'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-8">
        {/* Brand Identity */}
        <button
          onClick={() => handleNavClick('hero')}
          className="group flex items-center gap-2.5 sm:gap-3 text-left focus:outline-none min-w-0"
          aria-label="Perfect Pitch Foreva home"
        >
          <div className="flex h-8 w-8 sm:h-9 sm:w-9 flex-shrink-0 items-center justify-center rounded-xl bg-[#FF2E4D] text-white shadow-md shadow-[#FF2E4D]/25 transition-transform group-hover:scale-105">
            <Disc3 className="h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:rotate-45" />
          </div>
          <div className="min-w-0">
            <span className="block font-display text-sm sm:text-base font-bold tracking-tight text-white leading-tight truncate">
              PERFECT PITCH FOREVA
            </span>
            <span className="hidden sm:block font-mono text-[9px] uppercase tracking-[0.2em] text-[#8E95A5] truncate">
              PUBLISHING LLC • SYNC REPERTOIRE
            </span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="font-display text-sm font-medium text-[#A4A9B5] transition-colors hover:text-white"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          {isAudioPlaying && (
            <div className="hidden md:flex items-center gap-2 rounded-full border border-[#FF2E4D]/30 bg-[#FF2E4D]/10 px-3 py-1 text-[#FF2E4D]">
              <LiveEqualizer active={true} barCount={5} />
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider">AUDITIONING</span>
            </div>
          )}

          {/* License Music Button: Visible on tablet/desktop, cleanly integrated on mobile */}
          <button
            onClick={() => handleNavClick('contact')}
            className="hidden sm:flex items-center gap-1.5 rounded-xl bg-[#FF2E4D] px-4 py-2 sm:px-5 sm:py-2.5 font-display text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-[#FF2E4D]/25 transition-transform hover:scale-[1.02] active:scale-95 whitespace-nowrap"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>License Music</span>
          </button>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white lg:hidden transition-colors hover:bg-white/10"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="border-b border-white/10 bg-[#07080B]/98 px-5 py-6 backdrop-blur-2xl lg:hidden">
          <div className="flex flex-col gap-2">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="rounded-xl px-3 py-2.5 text-left font-display text-base font-semibold text-white/90 hover:bg-white/5 hover:text-[#FF2E4D] transition-colors"
              >
                {item.label}
              </button>
            ))}

            <div className="mt-3 pt-3 border-t border-white/10">
              <button
                onClick={() => handleNavClick('contact')}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#FF2E4D] py-3.5 font-display text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-[#FF2E4D]/25"
              >
                <Sparkles className="h-4 w-4" />
                <span>Request Sync License</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
