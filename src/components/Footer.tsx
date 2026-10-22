import { AudioLines, Instagram, Twitter, Linkedin, Youtube } from 'lucide-react';
import { scrollToSection } from '@/lib/utils';

const NAV_LINKS = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Music Catalog', id: 'catalog' },
  { label: 'Services', id: 'services' },
  { label: 'Contact', id: 'contact' },
];

const SOCIALS = [
  { icon: Instagram, label: 'Instagram' },
  { icon: Twitter, label: 'Twitter' },
  { icon: Linkedin, label: 'LinkedIn' },
  { icon: Youtube, label: 'YouTube' },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-pitch-black">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Logo + tagline */}
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-pitch-red to-pitch-blue/80">
                <AudioLines className="h-5 w-5 text-white" strokeWidth={2.5} />
              </div>
              <div className="leading-tight">
                <span className="block font-heading text-sm font-bold tracking-wider text-pitch-white">
                  PERFECT PITCH FOREVA
                </span>
                <span className="block text-[10px] font-medium tracking-[0.25em] text-pitch-gray">
                  PUBLISHING LLC
                </span>
              </div>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-pitch-gray">
              Connecting great music with powerful stories.
            </p>
          </div>

          {/* Nav */}
          <div>
            <h4 className="mb-4 font-heading text-sm font-semibold uppercase tracking-wider text-pitch-white">
              Navigation
            </h4>
            <nav className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-sm text-pitch-gray transition-colors hover:text-pitch-red"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Socials */}
          <div>
            <h4 className="mb-4 font-heading text-sm font-semibold uppercase tracking-wider text-pitch-white">
              Connect
            </h4>
            <div className="flex gap-3">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-pitch-gray transition-all duration-300 hover:border-pitch-red/40 hover:text-pitch-red"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
            <p className="mt-5 text-xs text-pitch-gray/60">
              Social media icons are placeholders — replace with the company's official profiles.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-pitch-gray">
            © 2026 Perfect Pitch Foreva Publishing LLC. All rights reserved.
          </p>
          <p className="text-xs text-pitch-gray/60">
            Independent Music Publishing &amp; Sync Licensing
          </p>
        </div>
      </div>
    </footer>
  );
}
