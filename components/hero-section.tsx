'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react';
import {
  ArrowRight,
  BarChart2,
  MessageCircle,
  Phone,
  TrendingUp,
  Users,
} from 'lucide-react';
import heroAbstractVisual from '@/src/assets/images/hero_abstract_architecture_1795004398970.jpg';
import { useBusinessConfig } from './business-config-context';
import { buildTelUrl, buildWhatsAppUrl } from '@/lib/business-config';
import {
  APPLE_EASE,
  MagneticButton,
  StaggerContainer,
  StaggerItem,
} from './motion/motion-primitives';

export function HeroSection() {
  const { config } = useBusinessConfig();
  const [imgError, setImgError] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // Hardware-accelerated transform-only parallax
  const visualParallaxY = useTransform(scrollYProgress, [0, 1], [0, 46]);
  const cardParallaxY = useTransform(scrollYProgress, [0, 1], [0, -28]);

  const whatsappUrl = buildWhatsAppUrl(
    config.whatsappDigits,
    config.whatsappMessage
  );

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-[100svh] flex items-center pt-24 pb-16 sm:pt-28 sm:pb-24 overflow-hidden bg-[#080D16]"
    >
      {/* Floating Hardware-Accelerated Background Elements */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <motion.div
          animate={
            prefersReduced
              ? undefined
              : {
                  opacity: [0.35, 0.52, 0.35],
                  scale: [1, 1.07, 1],
                  x: [0, 18, 0],
                  y: [0, -14, 0],
                }
          }
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-40 -left-32 w-[620px] h-[620px] rounded-full bg-[#2563EB]/20 blur-[140px] will-change-transform"
        />
        <motion.div
          animate={
            prefersReduced
              ? undefined
              : {
                  opacity: [0.22, 0.4, 0.22],
                  scale: [1, 1.08, 1],
                  x: [0, -16, 0],
                  y: [0, 16, 0],
                }
          }
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1.5,
          }}
          className="absolute top-1/4 -right-40 w-[640px] h-[640px] rounded-full bg-[#071426] border border-[#2563EB]/15 blur-[120px] will-change-transform"
        />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #FFFFFF 1px, transparent 1px), linear-gradient(to bottom, #FFFFFF 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column: Staggered Editorial Headline & Magnetic CTAs */}
          <StaggerContainer
            triggerOnMount
            staggerDelay={0.08}
            initialDelay={0.04}
            className="lg:col-span-6 space-y-7"
          >
            {/* Quiet unboxed metadata line */}
            <StaggerItem yOffset={12}>
              <div className="flex flex-wrap items-center gap-2.5 text-xs sm:text-sm font-medium text-[#AAB4C3] tracking-wide">
                <span className="text-white">{config.category}</span>
                <span aria-hidden="true" className="text-white/30">
                  ·
                </span>
                <span>{config.country}</span>
                <span aria-hidden="true" className="text-white/30">
                  ·
                </span>
                <span>{config.hours}</span>
              </div>
            </StaggerItem>

            <StaggerItem yOffset={18}>
              <h1 className="font-[family-name:var(--font-jakarta)] text-[clamp(2.25rem,4.3vw,3.85rem)] font-bold leading-[1.08] tracking-[-0.025em] text-white text-balance">
                Turn Your Business Vision Into Measurable Growth.
              </h1>
            </StaggerItem>

            <StaggerItem yOffset={16}>
              <p className="text-base sm:text-lg leading-[1.65] text-[#AAB4C3] max-w-xl">
                Strategic marketing solutions designed to help ambitious
                businesses build their presence, reach more customers, and grow
                with confidence.
              </p>
            </StaggerItem>

            {/* Primary & Secondary Magnetic CTAs + WhatsApp Hero Action */}
            <StaggerItem yOffset={14}>
              <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3.5 pt-2">
                <MagneticButton
                  onClick={scrollToContact}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm sm:text-base font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-xl transition-colors duration-200 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white shadow-[0_8px_24px_-6px_rgba(37,99,235,0.45)]"
                >
                  <span>Let&apos;s Grow Your Business</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </MagneticButton>

                <MagneticButton
                  onClick={scrollToContact}
                  strength={0.18}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm sm:text-base font-semibold text-white bg-white/[0.04] hover:bg-white/[0.09] border border-white/15 rounded-xl transition-colors duration-200 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
                >
                  <span>Contact Our Team</span>
                </MagneticButton>

                <MagneticButton
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  strength={0.18}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold text-white bg-[#25D366]/12 hover:bg-[#25D366]/22 border border-[#25D366]/40 rounded-xl transition-colors duration-200 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]"
                >
                  <MessageCircle
                    className="w-4 h-4 text-[#25D366]"
                    aria-hidden="true"
                  />
                  <span>Chat on WhatsApp</span>
                </MagneticButton>
              </div>
            </StaggerItem>

            {/* Direct Verified Contact Strip */}
            <StaggerItem yOffset={12}>
              <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-[#AAB4C3]">
                <a
                  href={buildTelUrl(config.phoneHref)}
                  className="inline-flex items-center gap-2 text-white hover:text-[#2563EB] transition-colors font-medium tabular-nums"
                >
                  <Phone className="w-4 h-4 text-[#2563EB]" aria-hidden="true" />
                  <span>{config.phoneDisplay}</span>
                </a>
                <span
                  className="text-white/25 hidden sm:inline"
                  aria-hidden="true"
                >
                  |
                </span>
                <span>Consultations Available {config.hours}</span>
              </div>
            </StaggerItem>
          </StaggerContainer>

          {/* Right Column: Scroll-Parallax 3D Visual + Floating Strategy Console */}
          <motion.div
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: prefersReduced ? 0 : 0.75,
              delay: prefersReduced ? 0 : 0.14,
              ease: APPLE_EASE,
            }}
            className="lg:col-span-6 relative"
          >
            <div className="relative rounded-2xl overflow-hidden border border-white/[0.1] bg-[#071426] aspect-[16/11] sm:aspect-[16/10] shadow-2xl">
              {/* Zero-Broken-Image CSS Fallback */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-br from-[#071426] via-[#0B1D3A] to-[#080D16]"
              />

              {/* Parallax Image Layer */}
              {!imgError && (
                <motion.div
                  style={prefersReduced ? undefined : { y: visualParallaxY }}
                  className="absolute -inset-6 will-change-transform"
                >
                  <Image
                    src={heroAbstractVisual}
                    alt="Abstract dark architectural 3D glass sculpture representing strategic marketing precision for Business USA"
                    fill
                    priority
                    referrerPolicy="no-referrer"
                    onError={() => setImgError(true)}
                    className="object-cover object-center transition-transform duration-700 hover:scale-[1.03]"
                  />
                </motion.div>
              )}

              {/* Measured Scrim for Readability */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#080D16]/90 via-[#080D16]/25 to-transparent"
              />

              {/* Counter-Parallax Overlaid Illustrative Marketing Console */}
              <motion.div
                style={prefersReduced ? undefined : { y: cardParallaxY }}
                className="absolute inset-x-4 bottom-4 sm:inset-x-6 sm:bottom-6 will-change-transform"
              >
                <div className="animate-subtle-float rounded-xl border border-white/[0.12] bg-[#071426]/88 backdrop-blur-md p-4 sm:p-5">
                  <div className="flex items-center justify-between gap-4 pb-3 border-b border-white/[0.08]">
                    <div className="flex items-center gap-2.5">
                      <BarChart2
                        className="w-4 h-4 text-[#2563EB]"
                        aria-hidden="true"
                      />
                      <span className="text-xs sm:text-sm font-semibold text-white">
                        Growth Strategy Framework
                      </span>
                    </div>
                    <span className="text-[11px] font-[family-name:var(--font-mono)] text-[#AAB4C3]">
                      Illustrative Preview
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-3 pt-3.5 items-end">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-[11px] text-[#AAB4C3]">
                        <Users
                          className="w-3.5 h-3.5 text-[#2563EB]"
                          aria-hidden="true"
                        />
                        <span>Audience</span>
                      </div>
                      <p className="text-sm sm:text-base font-semibold text-white font-[family-name:var(--font-mono)] tabular-nums">
                        Reach Model
                      </p>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-[11px] text-[#AAB4C3]">
                        <TrendingUp
                          className="w-3.5 h-3.5 text-[#2563EB]"
                          aria-hidden="true"
                        />
                        <span>Pipeline</span>
                      </div>
                      <p className="text-sm sm:text-base font-semibold text-white font-[family-name:var(--font-mono)] tabular-nums">
                        Lead Focus
                      </p>
                    </div>

                    {/* Crisp GPU-Animated SVG Bars */}
                    <div className="flex items-end justify-end gap-1.5 h-10">
                      {[32, 48, 42, 64, 58, 82, 96].map((h, idx) => (
                        <motion.div
                          key={idx}
                          initial={
                            prefersReduced
                              ? { scaleY: 1, opacity: 1 }
                              : { scaleY: 0.2, opacity: 0.4 }
                          }
                          animate={{ scaleY: 1, opacity: 1 }}
                          transition={{
                            duration: prefersReduced ? 0 : 0.5,
                            delay: prefersReduced ? 0 : 0.25 + idx * 0.06,
                            ease: APPLE_EASE,
                          }}
                          style={{ height: `${h}%`, transformOrigin: 'bottom' }}
                          className={`w-1.5 sm:w-2 rounded-t-sm ${
                            idx >= 5 ? 'bg-[#2563EB]' : 'bg-white/25'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
