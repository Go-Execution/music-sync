import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, Mail, AlertCircle, Loader2 } from 'lucide-react';
import { useInView } from '@/lib/utils';
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

const PROJECT_TYPES = ['Film', 'Television', 'Advertising', 'Digital Content', 'Other'];

const EMPTY_FORM: FormState = {
  fullName: '',
  company: '',
  email: '',
  projectType: '',
  trackOfInterest: '',
  message: '',
};

export default function Contact({ preselectedTrack }: { preselectedTrack: Track | null }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (preselectedTrack) {
      setForm((prev) => ({ ...prev, trackOfInterest: preselectedTrack.title }));
      setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  }, [preselectedTrack]);

  const validate = (): boolean => {
    const e: Errors = {};
    if (!form.fullName.trim()) e.fullName = 'Please enter your full name.';
    if (!form.email.trim()) {
      e.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = 'Please enter a valid email address.';
    }
    if (!form.projectType) e.projectType = 'Please select a project type.';
    if (!form.message.trim()) e.message = 'Please tell us about your project.';
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
      setTimeout(() => setStatus('idle'), 5000);
    }, 1500);
  };

  const inputClass = (field: keyof FormState) =>
    `w-full rounded-xl border bg-pitch-charcoal/60 px-4 py-3 text-pitch-white placeholder:text-pitch-gray/50 transition-all duration-300 focus:outline-none focus:ring-2 ${
      errors[field]
        ? 'border-pitch-red/50 focus:ring-pitch-red/20'
        : 'border-white/10 focus:border-pitch-red/40 focus:ring-pitch-red/20'
    }`;

  return (
    <section id="contact" className="relative section-padding overflow-hidden">
      <div
        className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full opacity-[0.08] blur-[120px]"
        style={{ background: 'radial-gradient(circle, #E51B36 0%, transparent 70%)' }}
      />

      <div ref={ref} className="mx-auto max-w-6xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <span className="text-xs font-semibold tracking-[0.3em] text-pitch-red">
            GET IN TOUCH
          </span>
          <h2 className="mt-4 font-heading text-3xl font-bold leading-tight text-pitch-white sm:text-4xl md:text-5xl">
            Let's Talk Music.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-pitch-gray">
            Searching for the perfect track? Tell us about your project, and let's explore the
            possibilities.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_1.5fr]">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col justify-start gap-6"
          >
            <div className="rounded-2xl border border-white/5 bg-pitch-charcoal/50 p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-pitch-red/10">
                <Mail className="h-6 w-6 text-pitch-red" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-pitch-white">
                Licensing Inquiries
              </h3>
              <p className="mt-2 text-sm text-pitch-gray">
                For sync licensing questions, catalog access, and project consultations.
              </p>
              <a
                href="mailto:licensing@perfectpitchforeva.com"
                className="mt-4 inline-block text-sm font-medium text-pitch-blue transition-colors hover:text-pitch-white"
              >
                licensing@perfectpitchforeva.com
              </a>
              <p className="mt-2 text-xs text-pitch-gray/60">
                Email placeholder — replace with the company's approved public business email.
              </p>
            </div>

            <div className="rounded-2xl border border-white/5 bg-pitch-charcoal/50 p-6">
              <p className="text-sm leading-relaxed text-pitch-gray">
                Whether you're a music supervisor, filmmaker, or creative director, we're here to
                help you find the right sound for your production.
              </p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative"
          >
            <form
              onSubmit={handleSubmit}
              noValidate
              className="rounded-2xl border border-white/5 bg-pitch-charcoal/30 p-6 sm:p-8"
            >
              <div className="grid gap-5">
                {/* Full name + company */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="fullName" className="mb-2 block text-sm font-medium text-pitch-white">
                      Full Name <span className="text-pitch-red">*</span>
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      value={form.fullName}
                      onChange={(e) => handleChange('fullName', e.target.value)}
                      placeholder="Your name"
                      className={inputClass('fullName')}
                      aria-invalid={!!errors.fullName}
                    />
                    {errors.fullName && (
                      <p className="mt-1.5 flex items-center gap-1.5 text-xs text-pitch-red">
                        <AlertCircle className="h-3.5 w-3.5" />
                        {errors.fullName}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="company" className="mb-2 block text-sm font-medium text-pitch-white">
                      Company / Organization
                    </label>
                    <input
                      id="company"
                      type="text"
                      value={form.company}
                      onChange={(e) => handleChange('company', e.target.value)}
                      placeholder="Your company"
                      className={inputClass('company')}
                    />
                  </div>
                </div>

                {/* Email + project type */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium text-pitch-white">
                      Email Address <span className="text-pitch-red">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      placeholder="you@company.com"
                      className={inputClass('email')}
                      aria-invalid={!!errors.email}
                    />
                    {errors.email && (
                      <p className="mt-1.5 flex items-center gap-1.5 text-xs text-pitch-red">
                        <AlertCircle className="h-3.5 w-3.5" />
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="projectType" className="mb-2 block text-sm font-medium text-pitch-white">
                      Project Type <span className="text-pitch-red">*</span>
                    </label>
                    <select
                      id="projectType"
                      value={form.projectType}
                      onChange={(e) => handleChange('projectType', e.target.value)}
                      className={inputClass('projectType')}
                      aria-invalid={!!errors.projectType}
                    >
                      <option value="">Select project type...</option>
                      {PROJECT_TYPES.map((type) => (
                        <option key={type} value={type} className="bg-pitch-charcoal">
                          {type}
                        </option>
                      ))}
                    </select>
                    {errors.projectType && (
                      <p className="mt-1.5 flex items-center gap-1.5 text-xs text-pitch-red">
                        <AlertCircle className="h-3.5 w-3.5" />
                        {errors.projectType}
                      </p>
                    )}
                  </div>
                </div>

                {/* Track of interest */}
                <div>
                  <label htmlFor="trackOfInterest" className="mb-2 block text-sm font-medium text-pitch-white">
                    Track of Interest <span className="text-pitch-gray/50 font-normal">(optional)</span>
                  </label>
                  <input
                    id="trackOfInterest"
                    type="text"
                    value={form.trackOfInterest}
                    onChange={(e) => handleChange('trackOfInterest', e.target.value)}
                    placeholder="e.g. Midnight Directive"
                    className={inputClass('trackOfInterest')}
                  />
                  {preselectedTrack && (
                    <p className="mt-1.5 text-xs text-pitch-blue">
                      Pre-selected from catalog: {preselectedTrack.title}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-medium text-pitch-white">
                    Project Details / Message <span className="text-pitch-red">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    value={form.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    placeholder="Tell us about your project, timeline, and music needs..."
                    className={`${inputClass('message')} resize-none`}
                    aria-invalid={!!errors.message}
                  />
                  {errors.message && (
                    <p className="mt-1.5 flex items-center gap-1.5 text-xs text-pitch-red">
                      <AlertCircle className="h-3.5 w-3.5" />
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === 'loading' || status === 'success'}
                  className="group flex items-center justify-center gap-2 rounded-full bg-pitch-red px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-[#ff3349] hover:shadow-xl hover:shadow-pitch-red/30 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Sending...
                    </>
                  ) : status === 'success' ? (
                    <>
                      <CheckCircle2 className="h-5 w-5" />
                      Inquiry Sent!
                    </>
                  ) : (
                    <>
                      Send Licensing Inquiry
                      <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>

                <AnimatePresence>
                  {status === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-3 rounded-xl border border-pitch-blue/30 bg-pitch-blue/10 px-4 py-4"
                    >
                      <CheckCircle2 className="h-6 w-6 flex-shrink-0 text-pitch-blue" />
                      <div>
                        <p className="font-medium text-pitch-white">Thank you for your inquiry!</p>
                        <p className="text-sm text-pitch-gray">
                          This is a demo notification — no email was actually sent. Your message has
                          been simulated for this presentation.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
