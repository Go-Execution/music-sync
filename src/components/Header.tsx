import { useEffect, useState } from 'react';
import { Menu, X, AudioLines } from 'lucide-react';
import { scrollToSection } from '@/lib/utils';

const NAV_LINKS = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Music Catalog', id: 'catalog' },
  { label: 'Services', id: 'services' },
  { label: 'Contact', id: 'contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleNav = (id: string) => {
    setMenuOpen(false);
    scrollToSection(id);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass-nav border-b border-white/5 py-3' : 'py-5 bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8">
        {/* Logo */}
        <button
          onClick={() => handleNav('home')}
          className="group flex items-center gap-3 text-left"
          aria-label="Perfect Pitch Foreva Publishing home"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-pitch-red to-pitch-blue/80 transition-transform duration-300 group-hover:scale-110">
            <AudioLines className="h-5 w-5 text-white" strokeWidth={2.5} />
          </div>
          <div className="leading-tight">
            <span className="block font-heading text-sm font-bold tracking-wider text-pitch-white sm:text-base">
              PERFECT PITCH FOREVA
            </span>
            <span className="block text-[10px] font-medium tracking-[0.25em] text-pitch-gray">
              PUBLISHING LLC
            </span>
          </div>
        </button>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNav(link.id)}
              className="group relative px-4 py-2 text-sm font-medium text-pitch-gray transition-colors duration-200 hover:text-pitch-white"
            >
              {link.label}
              <span className="absolute bottom-0 left-1/2 h-px w-0 -translate-x-1/2 bg-pitch-red transition-all duration-300 group-hover:w-2/3" />
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => handleNav('contact')}
            className="hidden rounded-full bg-pitch-red px-6 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#ff3349] hover:shadow-lg hover:shadow-pitch-red/30 sm:block"
          >
            License Music
          </button>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-pitch-white transition-colors hover:border-pitch-red/50 lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 top-0 z-40 glass-nav transition-transform duration-500 lg:hidden ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ paddingTop: 80 }}
      >
        <nav className="flex flex-col gap-2 px-6">
          {NAV_LINKS.map((link, i) => (
            <button
              key={link.id}
              onClick={() => handleNav(link.id)}
              className="border-b border-white/5 py-4 text-left font-heading text-2xl font-semibold text-pitch-white transition-colors hover:text-pitch-red"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleNav('contact')}
            className="mt-6 rounded-full bg-pitch-red px-6 py-4 text-center text-base font-semibold text-white"
          >
            License Music
          </button>
        </nav>
      </div>
    </header>
  );
}
