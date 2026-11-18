'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Globe,
  Mail,
  MessageCircle,
  Phone,
  Send,
} from 'lucide-react';
import { useBusinessConfig } from './business-config-context';
import { buildTelUrl, buildWhatsAppUrl } from '@/lib/business-config';
import { MagneticButton } from './motion/motion-primitives';

interface ContactSectionProps {
  selectedService: string;
  onServiceChange: (serviceTitle: string) => void;
}

interface FormState {
  name: string;
  email: string;
  phone: string;
  serviceInterest: string;
  message: string;
}

type SubmissionStatus =
  | { state: 'idle' }
  | { state: 'submitting' }
  | { state: 'delivered'; summary: FormState }
  | { state: 'handoff_required'; summary: FormState }
  | { state: 'error'; message: string };

export function ContactSection({
  selectedService,
  onServiceChange,
}: ContactSectionProps) {
  const { config, openEditor } = useBusinessConfig();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<SubmissionStatus>({ state: 'idle' });

  const validateClient = (values: FormState): Record<string, string> => {
    const errors: Record<string, string> = {};
    if (values.name.trim().length < 2) {
      errors.name = 'Please enter your full name (at least 2 characters).';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      errors.email = 'Please enter a valid email address.';
    }
    if (values.phone.replace(/\D/g, '').length < 7) {
      errors.phone = 'Please enter a valid phone number.';
    }
    if (!values.serviceInterest.trim()) {
      errors.serviceInterest = 'Please choose a service interest.';
    }
    if (values.message.trim().length < 10) {
      errors.message =
        'Please tell us a bit about your goals (at least 10 characters).';
    }
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload: FormState = {
      ...form,
      serviceInterest: selectedService,
    };
    const errors = validateClient(payload);
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      setStatus({
        state: 'error',
        message: 'Please review the highlighted fields before submitting.',
      });
      return;
    }

    setStatus({ state: 'submitting' });

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        if (data.fieldErrors) {
          setFieldErrors(data.fieldErrors);
        }
        setStatus({
          state: 'error',
          message:
            data.error || 'Unable to process your inquiry. Please try again.',
        });
        return;
      }

      if (data.delivered) {
        setStatus({ state: 'delivered', summary: payload });
        setForm({
          name: '',
          email: '',
          phone: '',
          message: '',
        });
        onServiceChange('General Marketing Consultation');
      } else {
        setStatus({ state: 'handoff_required', summary: payload });
      }
    } catch {
      setStatus({
        state: 'error',
        message:
          'Network error while validating your inquiry. You can connect directly via WhatsApp or phone below.',
      });
    }
  };

  const buildInquiryWhatsAppUrl = (summary?: FormState) => {
    if (!summary) {
      return buildWhatsAppUrl(config.whatsappDigits, config.whatsappMessage);
    }
    const text = `Hello ${config.businessName}! My name is ${summary.name}.\nEmail: ${summary.email}\nPhone: ${summary.phone}\nService Interest: ${summary.serviceInterest}\nMessage: ${summary.message}`;
    return buildWhatsAppUrl(config.whatsappDigits, text);
  };

  return (
    <section
      id="contact"
      className="relative py-20 sm:py-28 bg-[#080D16] border-t border-white/[0.07]"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          {/* Left Column: Direct Business Info & Instant Contact CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-8"
          >
            <div className="space-y-3">
              <p className="text-sm font-medium text-[#2563EB] tracking-wide">
                Contact {config.businessName}
              </p>
              <h2 className="font-[family-name:var(--font-jakarta)] text-3xl sm:text-4xl font-bold leading-[1.15] tracking-[-0.02em] text-white text-balance">
                Let&apos;s Build Something Great Together.
              </h2>
              <p className="text-base text-[#AAB4C3] leading-relaxed">
                Reach our team directly by phone, start an instant WhatsApp
                conversation, or prepare your inquiry using the consultation
                form.
              </p>
            </div>

            {/* Verified & Editable Contact Details */}
            <div className="rounded-2xl bg-[#071426] border border-white/[0.09] divide-y divide-white/[0.08]">
              <div className="p-5 flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs text-[#AAB4C3]">Business Name</p>
                  <p className="text-base font-semibold text-white mt-0.5">
                    {config.businessName}
                  </p>
                  <p className="text-xs text-[#AAB4C3] mt-0.5">
                    {config.category} · {config.country}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={openEditor}
                  className="text-xs font-medium text-[#2563EB] hover:text-white transition-colors cursor-pointer"
                >
                  Edit Info
                </button>
              </div>

              <div className="p-5 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-[#2563EB]/12 border border-[#2563EB]/25 flex items-center justify-center text-[#2563EB] shrink-0">
                  <Phone className="w-4 h-4" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs text-[#AAB4C3]">Phone</p>
                  <a
                    href={buildTelUrl(config.phoneHref)}
                    className="text-base font-semibold text-white hover:text-[#2563EB] transition-colors tabular-nums"
                  >
                    {config.phoneDisplay}
                  </a>
                </div>
              </div>

              <div className="p-5 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-[#25D366]/12 border border-[#25D366]/30 flex items-center justify-center text-[#25D366] shrink-0">
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs text-[#AAB4C3]">WhatsApp Support</p>
                  <a
                    href={buildWhatsAppUrl(
                      config.whatsappDigits,
                      config.whatsappMessage
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-semibold text-white hover:text-[#25D366] transition-colors tabular-nums"
                  >
                    {config.phoneDisplay}
                  </a>
                </div>
              </div>

              <div className="p-5 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#AAB4C3] shrink-0">
                  <Clock className="w-4 h-4" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs text-[#AAB4C3]">Business Hours</p>
                  <p className="text-base font-semibold text-white">
                    {config.hours}
                  </p>
                </div>
              </div>

              {config.email && (
                <div className="p-5 flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#AAB4C3] shrink-0">
                    <Mail className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs text-[#AAB4C3]">Email</p>
                    <a
                      href={`mailto:${config.email}`}
                      className="text-base font-semibold text-white hover:text-[#2563EB] transition-colors"
                    >
                      {config.email}
                    </a>
                  </div>
                </div>
              )}

              <div className="p-5 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#AAB4C3] shrink-0">
                  <Globe className="w-4 h-4" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs text-[#AAB4C3]">Region</p>
                  <p className="text-base font-semibold text-white">
                    {config.country}
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Click-to-Call & Official WhatsApp CTA Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <MagneticButton
                href={buildTelUrl(config.phoneHref)}
                strength={0.18}
                className="w-full inline-flex items-center justify-center gap-2.5 px-5 py-3.5 text-sm font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-xl transition-colors whitespace-nowrap"
              >
                <Phone className="w-4 h-4" aria-hidden="true" />
                <span>Call {config.phoneDisplay}</span>
              </MagneticButton>

              <MagneticButton
                href={buildWhatsAppUrl(
                  config.whatsappDigits,
                  config.whatsappMessage
                )}
                target="_blank"
                rel="noopener noreferrer"
                strength={0.18}
                className="w-full inline-flex items-center justify-center gap-2.5 px-5 py-3.5 text-sm font-semibold text-[#080D16] bg-[#25D366] hover:bg-[#20BD5A] rounded-xl transition-colors whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                <span>WhatsApp Support</span>
              </MagneticButton>
            </div>
          </motion.div>

          {/* Right Column: Validated Consultation Form */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <form
              onSubmit={handleSubmit}
              noValidate
              className="rounded-2xl bg-[#071426] border border-white/[0.1] p-6 sm:p-8 lg:p-10 space-y-6"
            >
              <div className="space-y-1.5">
                <h3 className="font-[family-name:var(--font-jakarta)] text-xl sm:text-2xl font-bold text-white">
                  Request a Marketing Consultation
                </h3>
                <p className="text-sm text-[#AAB4C3]">
                  Share your business goals and preferred service area below.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Name */}
                <div className="space-y-2">
                  <label
                    htmlFor="contact-name"
                    className="block text-sm font-medium text-white"
                  >
                    Name <span className="text-[#2563EB]">*</span>
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={form.name}
                    onChange={(e) => {
                      setForm({ ...form, name: e.target.value });
                      if (fieldErrors.name) {
                        setFieldErrors({ ...fieldErrors, name: '' });
                      }
                    }}
                    placeholder="Your full name"
                    className="w-full rounded-xl bg-[#080D16] border border-white/12 focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/30 px-4 py-3 text-sm text-white placeholder:text-[#AAB4C3]/50 outline-none transition-colors"
                  />
                  {fieldErrors.name && (
                    <p className="text-xs text-rose-400">{fieldErrors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label
                    htmlFor="contact-email"
                    className="block text-sm font-medium text-white"
                  >
                    Email <span className="text-[#2563EB]">*</span>
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) => {
                      setForm({ ...form, email: e.target.value });
                      if (fieldErrors.email) {
                        setFieldErrors({ ...fieldErrors, email: '' });
                      }
                    }}
                    placeholder="you@company.com"
                    className="w-full rounded-xl bg-[#080D16] border border-white/12 focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/30 px-4 py-3 text-sm text-white placeholder:text-[#AAB4C3]/50 outline-none transition-colors"
                  />
                  {fieldErrors.email && (
                    <p className="text-xs text-rose-400">{fieldErrors.email}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Phone */}
                <div className="space-y-2">
                  <label
                    htmlFor="contact-phone"
                    className="block text-sm font-medium text-white"
                  >
                    Phone <span className="text-[#2563EB]">*</span>
                  </label>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={(e) => {
                      setForm({ ...form, phone: e.target.value });
                      if (fieldErrors.phone) {
                        setFieldErrors({ ...fieldErrors, phone: '' });
                      }
                    }}
                    placeholder="+1 (555) 000-0000"
                    className="w-full rounded-xl bg-[#080D16] border border-white/12 focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/30 px-4 py-3 text-sm text-white placeholder:text-[#AAB4C3]/50 outline-none transition-colors"
                  />
                  {fieldErrors.phone && (
                    <p className="text-xs text-rose-400">{fieldErrors.phone}</p>
                  )}
                </div>

                {/* Service Interest */}
                <div className="space-y-2">
                  <label
                    htmlFor="contact-service"
                    className="block text-sm font-medium text-white"
                  >
                    Service Interest <span className="text-[#2563EB]">*</span>
                  </label>
                  <select
                    id="contact-service"
                    name="serviceInterest"
                    value={selectedService}
                    onChange={(e) => {
                      onServiceChange(e.target.value);
                      if (fieldErrors.serviceInterest) {
                        setFieldErrors({ ...fieldErrors, serviceInterest: '' });
                      }
                    }}
                    className="w-full rounded-xl bg-[#080D16] border border-white/12 focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/30 px-4 py-3 text-sm text-white outline-none transition-colors"
                  >
                    <option value="General Marketing Consultation">
                      General Marketing Consultation
                    </option>
                    {config.services.map((svc) => (
                      <option key={svc.id} value={svc.title}>
                        {svc.title}
                      </option>
                    ))}
                  </select>
                  {fieldErrors.serviceInterest && (
                    <p className="text-xs text-rose-400">
                      {fieldErrors.serviceInterest}
                    </p>
                  )}
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label
                  htmlFor="contact-message"
                  className="block text-sm font-medium text-white"
                >
                  Message <span className="text-[#2563EB]">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={(e) => {
                    setForm({ ...form, message: e.target.value });
                    if (fieldErrors.message) {
                      setFieldErrors({ ...fieldErrors, message: '' });
                    }
                  }}
                  placeholder="Tell us about your business, marketing goals, and timeline..."
                  className="w-full rounded-xl bg-[#080D16] border border-white/12 focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/30 px-4 py-3 text-sm text-white placeholder:text-[#AAB4C3]/50 outline-none transition-colors resize-y"
                />
                {fieldErrors.message && (
                  <p className="text-xs text-rose-400">{fieldErrors.message}</p>
                )}
              </div>

              {/* Feedback Banners (Strict honesty: never fake email sent) */}
              {status.state === 'error' && (
                <div
                  role="alert"
                  className="rounded-xl border border-rose-500/35 bg-rose-500/10 p-4 flex items-start gap-3 text-sm text-rose-200"
                >
                  <AlertCircle
                    className="w-5 h-5 text-rose-400 shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span>{status.message}</span>
                </div>
              )}

              {status.state === 'delivered' && (
                <div
                  role="status"
                  className="rounded-xl border border-emerald-500/35 bg-emerald-500/10 p-4 flex items-start gap-3 text-sm text-emerald-100"
                >
                  <CheckCircle2
                    className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div className="space-y-1">
                    <p className="font-semibold text-white">
                      Inquiry Received
                    </p>
                    <p className="text-emerald-200/90">
                      Thank you, {status.summary.name}. Your consultation
                      request for {status.summary.serviceInterest} has been
                      forwarded to our configured server endpoint.
                    </p>
                  </div>
                </div>
              )}

              {status.state === 'handoff_required' && (
                <div
                  role="status"
                  className="rounded-xl border border-[#2563EB]/45 bg-[#2563EB]/10 p-5 space-y-4"
                >
                  <div className="flex items-start gap-3">
                    <AlertCircle
                      className="w-5 h-5 text-[#2563EB] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-white">
                        Inquiry Validated — Direct Send Required
                      </p>
                      <p className="text-xs sm:text-sm text-[#AAB4C3] leading-relaxed">
                        Automated email delivery is not connected on this server
                        yet, so your form has not been emailed automatically.
                        Send your completed inquiry directly via WhatsApp or
                        call our team right now so nothing is missed.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href={buildInquiryWhatsAppUrl(status.summary)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-[#080D16] bg-[#25D366] hover:bg-[#20BD5A] rounded-xl transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" aria-hidden="true" />
                      <span>Send Inquiry via WhatsApp</span>
                    </a>

                    <a
                      href={buildTelUrl(config.phoneHref)}
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-white/[0.08] hover:bg-white/[0.14] border border-white/15 rounded-xl transition-colors"
                    >
                      <Phone className="w-4 h-4" aria-hidden="true" />
                      <span>Call {config.phoneDisplay}</span>
                    </a>
                  </div>
                </div>
              )}

              <MagneticButton
                type="submit"
                disabled={status.state === 'submitting'}
                strength={0.18}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-sm sm:text-base font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] disabled:opacity-60 rounded-xl transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <Send className="w-4 h-4" aria-hidden="true" />
                <span>
                  {status.state === 'submitting'
                    ? 'Validating Inquiry...'
                    : 'Submit Inquiry'}
                </span>
              </MagneticButton>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
