'use client';

import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { useBusinessConfig } from './business-config-context';
import { buildWhatsAppUrl } from '@/lib/business-config';

export function FloatingWhatsApp() {
  const { config } = useBusinessConfig();
  const [hovered, setHovered] = useState(false);

  const whatsappUrl = buildWhatsAppUrl(
    config.whatsappDigits,
    config.whatsappMessage
  );

  return (
    <div className="fixed bottom-5 right-5 z-40 flex items-center gap-3">
      {/* Tooltip ("Chat With Us") */}
      <div
        role="tooltip"
        className={`hidden sm:block pointer-events-none px-3.5 py-2 rounded-xl bg-[#071426] border border-white/15 text-xs font-semibold text-white shadow-xl whitespace-nowrap transition-all duration-200 ${
          hovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
        }`}
      >
        Chat With Us
      </div>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat With Us on WhatsApp"
        title="Chat With Us"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        className="relative inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white shadow-[0_10px_30px_rgba(37,211,102,0.38)] transition-transform duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        {/* Subtle Pulse Ring */}
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-[#25D366] animate-whatsapp-ring pointer-events-none"
        />
        <MessageCircle className="relative z-10 w-7 h-7 fill-white text-white" aria-hidden="true" />
      </a>
    </div>
  );
}
