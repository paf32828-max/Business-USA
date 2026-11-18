'use client';

import React from 'react';
import { MessageCircle, Phone, Sliders } from 'lucide-react';
import { useBusinessConfig } from './business-config-context';
import { buildTelUrl, buildWhatsAppUrl } from '@/lib/business-config';

export function Footer() {
  const { config, openEditor } = useBusinessConfig();

  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith('#')) {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <footer className="bg-[#071426] border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/[0.08]">
          {/* Brand Summary */}
          <div className="md:col-span-5 space-y-4">
            <a
              href="#home"
              onClick={(e) => handleSmoothScroll(e, '#home')}
              className="inline-block font-[family-name:var(--font-jakarta)] text-lg font-bold tracking-[0.12em] uppercase text-white"
            >
              {config.businessName}
            </a>
            <p className="text-sm sm:text-base text-[#AAB4C3] max-w-sm leading-relaxed">
              Helping businesses move forward with smarter marketing.
            </p>
            <p className="text-xs text-[#AAB4C3]/80">
              {config.category} · {config.country}
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-4">
            <h3 className="text-sm font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2.5 text-sm text-[#AAB4C3]">
              <li>
                <a
                  href="#home"
                  onClick={(e) => handleSmoothScroll(e, '#home')}
                  className="hover:text-white transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={(e) => handleSmoothScroll(e, '#about')}
                  className="hover:text-white transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => handleSmoothScroll(e, '#services')}
                  className="hover:text-white transition-colors"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => handleSmoothScroll(e, '#contact')}
                  className="hover:text-white transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Business Hours */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="text-sm font-semibold text-white">Contact</h3>
            <ul className="space-y-3 text-sm text-[#AAB4C3]">
              <li>
                <a
                  href={buildTelUrl(config.phoneHref)}
                  className="inline-flex items-center gap-2 hover:text-white transition-colors tabular-nums"
                >
                  <Phone
                    className="w-4 h-4 text-[#2563EB]"
                    aria-hidden="true"
                  />
                  <span>Phone: {config.phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={buildWhatsAppUrl(
                    config.whatsappDigits,
                    config.whatsappMessage
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-white transition-colors"
                >
                  <MessageCircle
                    className="w-4 h-4 text-[#25D366]"
                    aria-hidden="true"
                  />
                  <span>WhatsApp Support</span>
                </a>
              </li>
              <li className="pt-1">
                <span className="block text-xs text-[#AAB4C3]/80">
                  Business Hours
                </span>
                <span className="text-white font-medium">{config.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Owner Config Access */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-[#AAB4C3]">
          <p>&copy; 2026 {config.businessName}. All Rights Reserved.</p>

          <button
            type="button"
            onClick={openEditor}
            className="inline-flex items-center gap-2 text-xs text-[#AAB4C3] hover:text-white transition-colors cursor-pointer"
          >
            <Sliders className="w-3.5 h-3.5 text-[#2563EB]" aria-hidden="true" />
            <span>Owner Setup: Edit Contact Info &amp; Services</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
