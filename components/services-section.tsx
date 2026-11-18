'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowUpRight,
  Check,
  Edit3,
  MessageCircle,
  X,
} from 'lucide-react';
import { useBusinessConfig } from './business-config-context';
import { ServiceIcon } from './service-icon';
import { buildWhatsAppUrl, ProposedService } from '@/lib/business-config';
import {
  APPLE_EASE,
  GlowCard,
  MagneticButton,
  SmoothReveal,
} from './motion/motion-primitives';

interface ServicesSectionProps {
  onSelectServiceForContact: (serviceTitle: string) => void;
}

export function ServicesSection({
  onSelectServiceForContact,
}: ServicesSectionProps) {
  const { config, openEditor, updateService } = useBusinessConfig();
  const [activeService, setActiveService] = useState<ProposedService | null>(
    null
  );

  const unconfirmedCount = config.services.filter((s) => !s.confirmed).length;

  const handleInquire = (serviceTitle: string) => {
    setActiveService(null);
    onSelectServiceForContact(serviceTitle);
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      id="services"
      className="relative py-20 sm:py-28 bg-[#080D16] border-t border-white/[0.07]"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <SmoothReveal className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-12 border-b border-white/[0.08]">
          <div className="space-y-3 max-w-2xl">
            <p className="text-sm font-medium text-[#2563EB] tracking-wide">
              Consultancy Scope
            </p>
            <h2 className="font-[family-name:var(--font-jakarta)] text-3xl sm:text-4xl font-bold leading-[1.15] tracking-[-0.02em] text-white text-balance">
              Proposed Marketing Consultancy Services
            </h2>
            <p className="text-base text-[#AAB4C3] leading-relaxed">
              {unconfirmedCount > 0
                ? 'The eight service areas below are presented as proposed consultancy offerings and remain editable until confirmed by the business owner.'
                : 'Confirmed marketing consultancy services tailored to help businesses strengthen market positioning and reach.'}
            </p>
          </div>

          <MagneticButton
            onClick={openEditor}
            strength={0.16}
            className="inline-flex items-center gap-2 self-start lg:self-end px-4 py-2.5 text-sm font-medium text-[#AAB4C3] hover:text-white bg-[#071426] hover:bg-[#0C1D36] border border-white/12 rounded-xl transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
          >
            <Edit3 className="w-4 h-4 text-[#2563EB]" aria-hidden="true" />
            <span>Edit or Confirm Services</span>
          </MagneticButton>
        </SmoothReveal>

        {/* 8 Proposed Service GlowCards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 pt-10">
          {config.services.map((service, idx) => (
            <SmoothReveal
              key={service.id}
              delay={idx * 0.045}
              yOffset={18}
              className="flex"
            >
              <GlowCard className="w-full rounded-2xl bg-[#071426]/85 border border-white/[0.09] hover:border-[#2563EB]/60 p-6 transition-colors duration-200">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-xl bg-[#2563EB]/12 border border-[#2563EB]/25 flex items-center justify-center text-[#2563EB] group-hover:bg-[#2563EB] group-hover:text-white transition-colors duration-200">
                      <ServiceIcon icon={service.icon} className="w-5 h-5" />
                    </div>

                    {/* Unboxed editorial metadata */}
                    <span className="text-xs text-[#AAB4C3] font-medium">
                      {service.index} ·{' '}
                      {service.confirmed ? (
                        <span className="text-white">Confirmed</span>
                      ) : (
                        <span>Proposed</span>
                      )}
                    </span>
                  </div>

                  <h3 className="font-[family-name:var(--font-jakarta)] text-lg font-semibold text-white leading-snug">
                    {service.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-[#AAB4C3]">
                    {service.shortDescription}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/[0.07] flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveService(service)}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-white hover:text-[#2563EB] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] rounded-sm"
                  >
                    <span>Learn More</span>
                    <ArrowUpRight
                      className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      updateService(service.id, { confirmed: !service.confirmed })
                    }
                    title={
                      service.confirmed
                        ? 'Marked as confirmed by owner'
                        : 'Click to mark as confirmed'
                    }
                    className="text-xs text-[#AAB4C3] hover:text-white transition-colors cursor-pointer"
                  >
                    {service.confirmed ? 'Owner Confirmed' : 'Confirm'}
                  </button>
                </div>
              </GlowCard>
            </SmoothReveal>
          ))}
        </div>
      </div>

      {/* Learn More Service Detail Modal */}
      <AnimatePresence>
        {activeService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#080D16]/80 backdrop-blur-sm"
            onClick={() => setActiveService(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="service-modal-title"
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.24, ease: APPLE_EASE }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xl rounded-2xl bg-[#071426] border border-white/[0.12] p-6 sm:p-8 shadow-2xl space-y-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-[#2563EB]/15 border border-[#2563EB]/30 flex items-center justify-center text-[#2563EB]">
                    <ServiceIcon icon={activeService.icon} className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-[#AAB4C3]">
                      {activeService.index} ·{' '}
                      {activeService.confirmed
                        ? 'Confirmed Consultancy Service'
                        : 'Proposed Offering (Pending Owner Confirmation)'}
                    </p>
                    <h3
                      id="service-modal-title"
                      className="font-[family-name:var(--font-jakarta)] text-xl sm:text-2xl font-bold text-white"
                    >
                      {activeService.title}
                    </h3>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveService(null)}
                  aria-label="Close service details"
                  className="w-10 h-10 rounded-lg border border-white/10 flex items-center justify-center text-[#AAB4C3] hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>

              <p className="text-sm sm:text-base leading-relaxed text-[#AAB4C3]">
                {activeService.scopeSummary}
              </p>

              <div className="space-y-3 pt-2 border-t border-white/[0.08]">
                <p className="text-xs font-semibold text-white tracking-wide">
                  Illustrative Engagement Focus Areas
                </p>
                <ul className="space-y-2.5">
                  {activeService.focusAreas.map((area, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-sm text-[#AAB4C3]"
                    >
                      <Check
                        className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span>{area}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-white/[0.08] flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => handleInquire(activeService.title)}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-xl transition-colors cursor-pointer"
                >
                  <span>Inquire About This Service</span>
                </button>

                <a
                  href={buildWhatsAppUrl(
                    config.whatsappDigits,
                    `Hello Business USA! I would like to discuss your proposed ${activeService.title} service.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 rounded-xl transition-colors"
                >
                  <MessageCircle
                    className="w-4 h-4 text-[#25D366]"
                    aria-hidden="true"
                  />
                  <span>Ask on WhatsApp</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
