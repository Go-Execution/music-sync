import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, Mail, AlertCircle, Loader2, Clock, ShieldCheck } from 'lucide-react';
import type { Track } from '@/data/tracks';

type FormState = {
  fullName: string;
  company: string;
  email: string;
  projectType: string;
  trackOfInterest: string;
  message: string;
};

type Errors = Partial<Record<keyof FormState, string>>;

const PROJECT_TYPES = [
  'Feature Film',
  'Television / Streaming Series',
  'Global Commercial & Brand',
  'Theatrical Trailer & Promo',
  'Video Game & Interactive',
  'Indie Doc & Festival',
  'Other',
];

const EMPTY_FORM: FormState = {
  fullName: '',
  company: '',
  email: '',
  projectType: '',
  trackOfInterest: '',
  message: '',
};

export default function Contact({ preselectedTrack }: { preselectedTrack: Track | null }) {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (preselectedTrack) {
      setForm((prev) => ({
        ...prev,
        trackOfInterest: `${preselectedTrack.title} — ${preselectedTrack.artist}`,
      }));
      setTimeout(() => {
        sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [preselectedTrack]);

  const validate = (): boolean => {
    const e: Errors = {};
    if (!form.fullName.trim()) e.fullName = 'Please enter your name.';
    if (!form.email.trim()) {
      e.email = 'Please enter your work email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = 'Please enter a valid email address.';
    }
    if (!form.projectType) e.projectType = 'Please select a project type.';
    if (!form.message.trim()) e.message = 'Please provide brief project or scene details.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setForm(EMPTY_FORM);
      setTimeout(() => setStatus('idle'), 6000);
    }, 1200);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative bg-[#07080B] py-16 sm:py-28 border-t border-white/5"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="grid gap-8 sm:gap-12 lg:grid-cols-12 lg:items-start">
          {/* Left Column */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-6">
            <div>
              <span className="font-mono text-[10px] sm:text-xs uppercase text-[#FF2E4D] tracking-widest block mb-2">
                DIRECT LICENSING DESK
              </span>
              <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
                LET'S TALK SYNC &amp; CLEARANCE.
              </h2>
              <p className="mt-3 sm:mt-4 text-xs sm:text-base text-[#8E95A5] leading-relaxed">
                Connect directly with our rights holders. We provide quick quotes, customized pitch playlists,
                and instant broadcast stems.
              </p>
            </div>

            {/* Selected Track Preview */}
            {preselectedTrack && (
              <div className="rounded-2xl border border-[#FF2E4D]/40 bg-[#121422] p-3.5 sm:p-4 flex items-center gap-3 sm:gap-4">
                <div className="h-12 w-12 rounded-xl overflow-hidden flex-shrink-0 border border-white/10">
                  <img
                    src={preselectedTrack.coverImage}
                    alt={preselectedTrack.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="font-mono text-[10px] text-[#FF2E4D] uppercase font-bold block">
                    ATTACHED TITLE:
                  </span>
                  <p className="font-display text-sm font-bold text-white truncate">
                    {preselectedTrack.title}
                  </p>
                  <p className="font-mono text-xs text-[#8E95A5]">
                    {preselectedTrack.bpm} BPM • {preselectedTrack.key} • One-Stop
                  </p>
                </div>
              </div>
            )}

            {/* Direct Contacts */}
            <div className="space-y-3 pt-1">
              <div className="rounded-2xl border border-white/5 bg-[#0C0E14] p-4 sm:p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-[#FF2E4D]">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="font-mono text-[10px] uppercase text-[#8E95A5] block">
                      EMAIL INQUIRIES
                    </span>
                    <a
                      href="mailto:licensing@perfectpitchforeva.com"
                      className="font-mono text-xs sm:text-sm text-white hover:text-[#FF2E4D] transition-colors truncate block"
                    >
                      licensing@perfectpitchforeva.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-white/5 bg-[#0C0E14] p-4 sm:p-5 space-y-2 text-xs font-mono text-[#8E95A5]">
                <div className="flex items-center gap-2 text-white">
                  <Clock className="h-4 w-4 text-[#F59E0B]" />
                  <span>24-Hour Approval SLA Guaranteed</span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  <span>100% Pre-Cleared Master &amp; Publishing</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="rounded-2xl sm:rounded-3xl border border-white/10 bg-[#0C0E14] p-5 sm:p-10 shadow-2xl space-y-4 sm:space-y-5"
            >
              <h3 className="font-display text-lg sm:text-xl font-bold text-white border-b border-white/10 pb-3 sm:pb-4">
                Sync Request
              </h3>

              <div className="grid gap-4 sm:gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="fullName" className="block font-mono text-xs text-[#8E95A5] mb-1.5">
                    Your Name <span className="text-[#FF2E4D]">*</span>
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    value={form.fullName}
                    onChange={(e) => handleChange('fullName', e.target.value)}
                    placeholder="e.g. Jordan Vane"
                    className="w-full rounded-xl border border-white/10 bg-[#07080B] px-3.5 py-2.5 sm:px-4 sm:py-3 font-mono text-xs text-white placeholder:text-[#8E95A5]/40 focus:border-[#FF2E4D] focus:outline-none"
                  />
                  {errors.fullName && (
                    <p className="mt-1 flex items-center gap-1 font-mono text-[11px] text-[#FF2E4D]">
                      <AlertCircle className="h-3 w-3" /> {errors.fullName}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="company" className="block font-mono text-xs text-[#8E95A5] mb-1.5">
                    Company / Production
                  </label>
                  <input
                    id="company"
                    type="text"
                    value={form.company}
                    onChange={(e) => handleChange('company', e.target.value)}
                    placeholder="e.g. A24 / Agency"
                    className="w-full rounded-xl border border-white/10 bg-[#07080B] px-3.5 py-2.5 sm:px-4 sm:py-3 font-mono text-xs text-white placeholder:text-[#8E95A5]/40 focus:border-[#FF2E4D] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="email" className="block font-mono text-xs text-[#8E95A5] mb-1.5">
                    Work Email <span className="text-[#FF2E4D]">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="supervisor@studio.com"
                    className="w-full rounded-xl border border-white/10 bg-[#07080B] px-3.5 py-2.5 sm:px-4 sm:py-3 font-mono text-xs text-white placeholder:text-[#8E95A5]/40 focus:border-[#FF2E4D] focus:outline-none"
                  />
                  {errors.email && (
                    <p className="mt-1 flex items-center gap-1 font-mono text-[11px] text-[#FF2E4D]">
                      <AlertCircle className="h-3 w-3" /> {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="projectType" className="block font-mono text-xs text-[#8E95A5] mb-1.5">
                    Project Type <span className="text-[#FF2E4D]">*</span>
                  </label>
                  <select
                    id="projectType"
                    value={form.projectType}
                    onChange={(e) => handleChange('projectType', e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-[#07080B] px-3.5 py-2.5 sm:px-4 sm:py-3 font-mono text-xs text-white focus:border-[#FF2E4D] focus:outline-none"
                  >
                    <option value="">Select project type...</option>
                    {PROJECT_TYPES.map((t) => (
                      <option key={t} value={t} className="bg-[#0C0E14]">
                        {t}
                      </option>
                    ))}
                  </select>
                  {errors.projectType && (
                    <p className="mt-1 flex items-center gap-1 font-mono text-[11px] text-[#FF2E4D]">
                      <AlertCircle className="h-3 w-3" /> {errors.projectType}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="trackOfInterest" className="block font-mono text-xs text-[#8E95A5] mb-1.5">
                  Track of Interest <span className="text-white/40 font-normal">(optional)</span>
                </label>
                <input
                  id="trackOfInterest"
                  type="text"
                  value={form.trackOfInterest}
                  onChange={(e) => handleChange('trackOfInterest', e.target.value)}
                  placeholder="e.g. Midnight Directive, Velvet Hours"
                  className="w-full rounded-xl border border-white/10 bg-[#07080B] px-3.5 py-2.5 sm:px-4 sm:py-3 font-mono text-xs text-white placeholder:text-[#8E95A5]/40 focus:border-[#FF2E4D] focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="message" className="block font-mono text-xs text-[#8E95A5] mb-1.5">
                  Scene Notes / Timeline <span className="text-[#FF2E4D]">*</span>
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={form.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  placeholder="Tell us about the scene mood, intended media use, and required turnaround..."
                  className="w-full rounded-xl border border-white/10 bg-[#07080B] px-3.5 py-2.5 sm:px-4 sm:py-3 font-mono text-xs text-white placeholder:text-[#8E95A5]/40 focus:border-[#FF2E4D] focus:outline-none resize-none"
                />
                {errors.message && (
                  <p className="mt-1 flex items-center gap-1 font-mono text-[11px] text-[#FF2E4D]">
                    <AlertCircle className="h-3 w-3" /> {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#FF2E4D] py-3.5 sm:py-4 font-display text-xs font-bold uppercase tracking-wider text-white shadow-xl shadow-[#FF2E4D]/25 transition-all hover:bg-[#ff425f] disabled:opacity-70"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending Request...
                  </>
                ) : status === 'success' ? (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    Request Received!
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Send Licensing Request
                  </>
                )}
              </button>

              <AnimatePresence>
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 flex items-center gap-3 text-xs text-white"
                  >
                    <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                    <p>
                      Thank you. Your sync brief has been sent to our licensing team. We will review
                      and respond with clearance quotes within 24 hours.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
