import { useState } from 'react';
import {
  FileText,
  Download,
  ExternalLink,
  Play,
  Pause,
  Award,
  Sparkles,
  Radio,
  Music2,
  CheckCircle2,
  Disc3,
  Phone,
} from 'lucide-react';
import {
  FEATURED_EPKS,
  DISCO_CATALOG_URL,
  DREAMWORKS_PDF_URL,
  TRACKS,
  type Track,
  type ArtistEPK,
} from '@/data/tracks';
import { audioEngine } from '@/lib/audioEngine';
import { LiveEqualizer } from './Waveform';

export default function ExecutivePresentation({
  onRequestLicense,
  currentPlayingTrack,
  isPlaying,
}: {
  onRequestLicense: (track: Track) => void;
  currentPlayingTrack: Track | null;
  isPlaying: boolean;
}) {
  const [selectedEpkId, setSelectedEpkId] = useState<string>('braedn-lance');
  const activeEpk = FEATURED_EPKS.find((e) => e.id === selectedEpkId) || FEATURED_EPKS[0];

  // Map EPK to matching track for live audition
  const getEpkTrack = (epk: ArtistEPK): Track | undefined => {
    if (epk.id === 'braedn-lance') return TRACKS.find((t) => t.id === 't-bl1');
    if (epk.id === 'manuel-love') return TRACKS.find((t) => t.id === 't-ml1');
    return undefined;
  };

  const currentEpkTrack = getEpkTrack(activeEpk);
  const isEpkTrackPlaying =
    isPlaying && currentPlayingTrack?.id === currentEpkTrack?.id;

  const handleAuditionEpk = (epk: ArtistEPK) => {
    const track = getEpkTrack(epk);
    if (!track) return;
    audioEngine.toggle(track);
  };

  return (
    <section
      id="executive-pitch"
      className="relative bg-[#07080B] py-16 sm:py-28 border-t border-white/5 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 -left-32 h-96 w-96 rounded-full bg-[#FF2E4D]/10 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 h-96 w-96 rounded-full bg-[#F59E0B]/10 blur-[140px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#FF2E4D]/30 bg-[#FF2E4D]/10 px-3.5 py-1.5 backdrop-blur-md">
            <Award className="h-3.5 w-3.5 text-[#FF2E4D]" />
            <span className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#FF2E4D]">
              EXECUTIVE SYNC PRESENTATION • DREAMWORKS ANIMATION
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight">
            FILM SCORES, SOUNDTRACKS &amp; <br />
            <span className="text-gradient-red">PRE-CLEARED SYNC REPERTOIRE</span>.
          </h2>

          <p className="text-sm sm:text-base text-[#8E95A5] leading-relaxed">
            Prepared for <strong className="text-white">Alexandra Nickson</strong> (Senior Vice
            President, Television Music) and the <strong className="text-white">DreamWorks Animation Music Team</strong> (Zack &amp; Jade).
            Introducing our curated multi-genre DISCO catalog, scoring selections, and flagship artist EPKs tailored for animation,
            episodic television, theatrical release, and global advertising.
          </p>
        </div>

        {/* Executive Letter Context Card */}
        <div className="mt-8 sm:mt-12 rounded-3xl border border-white/10 bg-[#0C0E15]/90 p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#FF2E4D]/10 via-transparent to-transparent pointer-events-none" />

          <div className="grid gap-6 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-xs text-[#F59E0B] font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4" />
                  <span>DREAMWORKS ANIMATION SUBMISSION DOSSIER</span>
                </span>
                <span className="rounded-full bg-white/5 border border-white/10 px-3 py-0.5 font-mono text-[10px] text-white/70">
                  REF: EXECUTIVE REVIEW
                </span>
              </div>

              <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                Honoring Alexandra Nickson's distinguished television music leadership across{' '}
                <em className="text-[#F59E0B] not-italic font-semibold">Gabby's Dollhouse</em>,{' '}
                <em className="text-[#F59E0B] not-italic font-semibold">Jurassic World: Camp Cretaceous</em>, and{' '}
                <em className="text-[#F59E0B] not-italic font-semibold">Kung Fu Panda: The Dragon Knight</em>, along with her Emmy recognition
                and 2027 Global Media Executive of the Year honors. Perfect Pitch Foreva brings 250+ pre-cleared master titles and isolated multi-track stems
                curated to serve story, emotion, and character identity.
              </p>

              {/* Quick Deliverable Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={DREAMWORKS_PDF_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-xl bg-[#FF2E4D] px-5 py-3 font-display text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-[#FF2E4D]/25 transition-all hover:bg-[#ff425f] active:scale-95"
                >
                  <FileText className="h-4 w-4" />
                  <span>Download Pitch Deck (PDF)</span>
                  <Download className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5 opacity-80" />
                </a>

                <a
                  href={DISCO_CATALOG_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 font-display text-xs font-bold uppercase tracking-wider text-white backdrop-blur-md transition-all hover:border-white/30 hover:bg-white/10"
                >
                  <Radio className="h-4 w-4 text-[#06B6D4]" />
                  <span>Open DISCO Music Repertoire</span>
                  <ExternalLink className="h-3.5 w-3.5 text-[#8E95A5]" />
                </a>
              </div>
            </div>

            {/* Quick Metrics / Repertoire Stats */}
            <div className="lg:col-span-4 rounded-2xl border border-white/10 bg-black/40 p-5 space-y-3.5 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
                <span className="text-[#8E95A5]">CATALOG SIZE</span>
                <span className="font-bold text-white">250+ Master Titles</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
                <span className="text-[#8E95A5]">CLEARANCE</span>
                <span className="font-bold text-emerald-400">100% One-Stop Pre-Cleared</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
                <span className="text-[#8E95A5]">DELIVERABLES</span>
                <span className="font-bold text-white">Full Mix, Inst &amp; Stems</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#8E95A5]">APPROVAL SLA</span>
                <span className="font-bold text-[#F59E0B]">24-Hour Express Turnaround</span>
              </div>
            </div>
          </div>
        </div>

        {/* Multi-Genre DISCO Listening Matrix (From Page 2 of Executive Pitch) */}
        <div className="mt-12 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <span className="font-mono text-xs uppercase text-[#06B6D4] font-semibold tracking-wider">
                DISCO PLATFORM CURATION
              </span>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
                Multi-Genre Listening Portals
              </h3>
            </div>
            <a
              href={DISCO_CATALOG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-[#06B6D4] hover:underline flex items-center gap-1"
            >
              <span>Explore all portals on s.disco.ac</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {[
              {
                title: 'Music Selection',
                subtitle: 'Core Sync Highlights',
                tag: 'Flagship',
                color: '#FF2E4D',
                url: DISCO_CATALOG_URL,
              },
              {
                title: 'Additional Genres',
                subtitle: 'Including Jazz & Scores',
                tag: 'Instrumental',
                color: '#F59E0B',
                url: DISCO_CATALOG_URL,
              },
              {
                title: 'Multi-Genre Catalog',
                subtitle: 'Complete 250+ Vault',
                tag: 'Full Master',
                color: '#06B6D4',
                url: DISCO_CATALOG_URL,
              },
              {
                title: 'Manuel Love EPK',
                subtitle: 'Latin Urban & RODIO EP',
                tag: 'Featured Artist',
                color: '#10B981',
                url: DISCO_CATALOG_URL,
              },
              {
                title: 'Braedn Lance EPK',
                subtitle: 'Big Texas & Debut Reel',
                tag: 'Featured Artist',
                color: '#8B5CF6',
                url: DISCO_CATALOG_URL,
              },
            ].map((portal, i) => (
              <a
                key={i}
                href={portal.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative rounded-2xl border border-white/10 bg-[#0C0E15] p-4 transition-all hover:border-white/30 hover:bg-[#111420] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className="rounded-md px-2 py-0.5 font-mono text-[9px] uppercase font-semibold"
                      style={{
                        backgroundColor: `${portal.color}15`,
                        color: portal.color,
                        border: `1px solid ${portal.color}35`,
                      }}
                    >
                      {portal.tag}
                    </span>
                    <ExternalLink className="h-3.5 w-3.5 text-white/40 group-hover:text-white transition-colors" />
                  </div>
                  <h4 className="font-display text-sm font-bold text-white group-hover:text-[#FF2E4D] transition-colors">
                    {portal.title}
                  </h4>
                  <p className="text-xs text-[#8E95A5] mt-0.5">{portal.subtitle}</p>
                </div>
                <div className="mt-4 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-white/60">
                  <span>DISCO.ac Portal</span>
                  <span className="text-[#FF2E4D] font-bold group-hover:translate-x-0.5 transition-transform">
                    Listen →
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Featured Artist EPK Dossier (Pages 3 & 4 of Executive Presentation) */}
        <div className="mt-14 sm:mt-20 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/10 pb-5">
            <div>
              <span className="font-mono text-xs uppercase text-[#FF2E4D] font-semibold tracking-wider">
                FEATURED ROSTER EPKs
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white mt-1">
                Artist Electronic Press Kits
              </h3>
            </div>

            {/* Artist Selector Tabs */}
            <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-[#0C0E15] p-1.5 self-start sm:self-auto">
              {FEATURED_EPKS.map((epk) => (
                <button
                  key={epk.id}
                  onClick={() => setSelectedEpkId(epk.id)}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2 font-display text-xs font-bold transition-all ${
                    selectedEpkId === epk.id
                      ? 'bg-[#FF2E4D] text-white shadow-md shadow-[#FF2E4D]/25'
                      : 'text-[#8E95A5] hover:text-white'
                  }`}
                >
                  <Disc3 className="h-3.5 w-3.5" />
                  <span>{epk.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Active EPK Card Display */}
          <div className="rounded-3xl border border-white/15 bg-[#0C0E15]/95 p-6 sm:p-10 backdrop-blur-xl shadow-2xl relative overflow-hidden">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
              {/* Left Column: Artist Hero Image & Audition */}
              <div className="lg:col-span-5 space-y-4">
                <div className="relative aspect-square w-full rounded-2xl overflow-hidden border border-white/15 shadow-2xl group">
                  <img
                    src={activeEpk.heroImage}
                    alt={activeEpk.name}
                    className="h-full w-full object-cover filter brightness-[0.9] contrast-[1.1] transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                  {/* Top Genre Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="rounded-full bg-[#FF2E4D] px-3 py-1 font-mono text-[10px] uppercase font-bold text-white shadow-lg shadow-[#FF2E4D]/40">
                      {activeEpk.genre}
                    </span>
                  </div>

                  {/* Bottom Audition Button Overlay */}
                  <div className="absolute bottom-4 inset-x-4 flex items-center justify-between gap-3">
                    <button
                      onClick={() => handleAuditionEpk(activeEpk)}
                      className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-white text-black px-4 py-3 font-display text-xs font-bold uppercase tracking-wider hover:bg-[#FF2E4D] hover:text-white transition-all shadow-xl"
                    >
                      {isEpkTrackPlaying ? (
                        <>
                          <Pause className="h-4 w-4 fill-current" />
                          <span>Pause Audition</span>
                          <LiveEqualizer active={true} barCount={4} color="#000" />
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4 fill-current" />
                          <span>Audition Featured Single</span>
                        </>
                      )}
                    </button>

                    <a
                      href={activeEpk.discoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-11 w-11 items-center justify-center rounded-xl bg-black/60 border border-white/20 text-white hover:bg-black transition-colors"
                      title="Open Artist DISCO reel"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>

                {/* Social Proof Strip */}
                <div className="grid grid-cols-3 gap-2 rounded-2xl border border-white/10 bg-black/40 p-3 text-center font-mono">
                  <div>
                    <span className="block font-bold text-white text-sm sm:text-base">
                      {activeEpk.followersTikTok}
                    </span>
                    <span className="text-[9px] text-[#8E95A5] uppercase">TikTok</span>
                  </div>
                  <div className="border-x border-white/10">
                    <span className="block font-bold text-[#FF2E4D] text-sm sm:text-base">
                      {activeEpk.likesTikTok}
                    </span>
                    <span className="text-[9px] text-[#8E95A5] uppercase">Likes</span>
                  </div>
                  <div>
                    <span className="block font-bold text-white text-sm sm:text-base">
                      {activeEpk.followersInstagram}
                    </span>
                    <span className="text-[9px] text-[#8E95A5] uppercase">Instagram</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Bio, Releases, Licensing Specs */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-[#F59E0B] uppercase font-bold tracking-wider">
                      {activeEpk.title}
                    </span>
                    <span className="text-white/40">•</span>
                    <span className="font-mono text-xs text-[#8E95A5]">{activeEpk.handleInstagram}</span>
                  </div>
                  <h3 className="font-display text-3xl sm:text-4xl font-extrabold text-white mt-1">
                    {activeEpk.name}
                  </h3>
                </div>

                <p className="text-sm sm:text-base text-[#C0C5D0] leading-relaxed">
                  {activeEpk.bio}
                </p>

                {/* Lead Releases */}
                <div className="space-y-2">
                  <span className="font-mono text-xs uppercase text-white font-semibold flex items-center gap-1.5">
                    <Music2 className="h-3.5 w-3.5 text-[#FF2E4D]" />
                    <span>Lead Anthems &amp; Releases:</span>
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeEpk.leadReleases.map((release, i) => (
                      <span
                        key={i}
                        className="rounded-xl border border-white/15 bg-white/5 px-3 py-1.5 font-mono text-xs text-white"
                      >
                        {release}
                      </span>
                    ))}
                  </div>
                </div>

                {/* RIYL (Recommended If You Like) */}
                <div className="space-y-2">
                  <span className="font-mono text-xs uppercase text-[#8E95A5] font-semibold">
                    RIYL (Sonic Comparisons):
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeEpk.riyl.map((artist, i) => (
                      <span
                        key={i}
                        className="rounded-lg border border-white/10 bg-black/30 px-2.5 py-1 font-mono text-[11px] text-[#F59E0B]"
                      >
                        {artist}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Licensing Highlights */}
                <div className="space-y-2.5 rounded-2xl border border-white/10 bg-black/40 p-4">
                  <span className="font-mono text-xs uppercase text-emerald-400 font-bold block">
                    100% Pre-Cleared Sync Specifications:
                  </span>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {activeEpk.licensingHighlights.map((highlight, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-white/90">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ideal Scene Placement Suggestions */}
                <div className="space-y-2">
                  <span className="font-mono text-xs uppercase text-[#8E95A5]">
                    Ideal Scene Placements:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeEpk.idealScenes.map((scene, i) => (
                      <span
                        key={i}
                        className="rounded-lg border border-white/5 bg-white/5 px-2.5 py-1 font-mono text-[10px] text-white/80"
                      >
                        🎬 {scene}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-white/10">
                  {currentEpkTrack && (
                    <button
                      onClick={() => onRequestLicense(currentEpkTrack)}
                      className="rounded-xl bg-[#FF2E4D] px-6 py-3 font-display text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-[#FF2E4D]/30 hover:bg-[#ff425f] transition-all"
                    >
                      License {activeEpk.name} for Production
                    </button>
                  )}

                  <a
                    href={activeEpk.discoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 font-display text-xs font-bold uppercase tracking-wider text-white hover:bg-white/10 transition-colors"
                  >
                    <span>Open Artist DISCO Vault</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Executive Contacts Direct Strip */}
        <div className="mt-12 rounded-2xl border border-white/10 bg-[#0C0E15] p-5 sm:p-7">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <span className="font-mono text-xs uppercase text-[#FF2E4D] font-bold tracking-wider">
                EXECUTIVE REPRESENTATION
              </span>
              <h4 className="font-display text-lg sm:text-xl font-bold text-white mt-0.5">
                Direct Music Licensing &amp; Creative Inquiries
              </h4>
            </div>
            <span className="font-mono text-xs text-[#8E95A5]">
              Perfect Pitch Foreva Publishing LLC
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 pt-4 font-mono text-xs">
            <div className="space-y-1">
              <span className="text-[#8E95A5] block">RAY TYUS</span>
              <a href="tel:7028065405" className="text-white hover:text-[#FF2E4D] font-bold block flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5 text-[#FF2E4D]" />
                <span>(702) 806-5405</span>
              </a>
              <a href="mailto:raytyus63@gmail.com" className="text-[#8E95A5] hover:text-white block truncate">
                raytyus63@gmail.com
              </a>
            </div>

            <div className="space-y-1">
              <span className="text-[#8E95A5] block">BRENCE SKINNER</span>
              <a href="tel:4692790335" className="text-white hover:text-[#FF2E4D] font-bold block flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5 text-[#FF2E4D]" />
                <span>(469) 279-0335</span>
              </a>
              <a href="mailto:perfectpitchforeva@gmail.com" className="text-[#8E95A5] hover:text-white block truncate">
                perfectpitchforeva@gmail.com
              </a>
            </div>

            <div className="space-y-1">
              <span className="text-[#8E95A5] block">DEKUMPOZED (A&amp;R / PRODUCTION)</span>
              <span className="text-white font-bold block">Texas Production Desk</span>
              <a href="mailto:dekumpozedfrmnx@gmail.com" className="text-[#8E95A5] hover:text-white block truncate">
                dekumpozedfrmnx@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
