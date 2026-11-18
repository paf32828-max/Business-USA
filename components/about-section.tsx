'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Briefcase, Compass, TrendingUp } from 'lucide-react';
import aboutStrategyImage from '@/src/assets/images/about_marketing_strategy_1795004398770.jpg';
import { useBusinessConfig } from './business-config-context';
import {
  ParallaxFrame,
  SmoothReveal,
  StaggerContainer,
  StaggerItem,
} from './motion/motion-primitives';

const VALUE_PROPOSITIONS = [
  {
    number: '01',
    title: 'Strategic Thinking',
    description:
      'Every recommendation begins with clarity—aligning audience insight, market positioning, and channel priorities before execution.',
    icon: Compass,
  },
  {
    number: '02',
    title: 'Growth-Focused Approach',
    description:
      'We prioritize marketing initiatives designed to expand customer reach, strengthen engagement, and support measurable business growth.',
    icon: TrendingUp,
  },
  {
    number: '03',
    title: 'Business-First Solutions',
    description:
      'Marketing plans are structured around your commercial goals, operational capacity, and customer journey—never one-size-fits-all templates.',
    icon: Briefcase,
  },
];

export function AboutSection() {
  const { config } = useBusinessConfig();
  const [imgError, setImgError] = useState(false);

  return (
    <section
      id="about"
      className="relative py-20 sm:py-28 bg-[#071426] border-t border-white/[0.07]"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-stretch">
          {/* Left Column: Scroll-Parallax Executive Studio Visual */}
          <SmoothReveal className="lg:col-span-5 flex" yOffset={20}>
            <div className="group relative w-full min-h-[340px] lg:min-h-full rounded-2xl overflow-hidden border border-white/[0.1] bg-[#080D16]">
              {/* CSS Fallback Container */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-br from-[#0B1D3A] via-[#071426] to-[#080D16] flex items-center justify-center"
              >
                <Compass className="w-12 h-12 text-[#2563EB]/40" />
              </div>

              {!imgError && (
                <ParallaxFrame
                  range={[-20, 20]}
                  className="absolute inset-0 w-full h-full"
                >
                  <div className="relative w-full h-full scale-[1.08]">
                    <Image
                      src={aboutStrategyImage}
                      alt="Modern American executive strategy conference room representing Business USA marketing consultancy"
                      fill
                      referrerPolicy="no-referrer"
                      onError={() => setImgError(true)}
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                  </div>
                </ParallaxFrame>
              )}

              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080D16]/85 via-transparent to-transparent"
              />

              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-xs text-[#AAB4C3]">
                <span className="font-semibold text-white">
                  {config.businessName}
                </span>
                <span>
                  {config.category} · {config.country}
                </span>
              </div>
            </div>
          </SmoothReveal>

          {/* Right Column: Narrative & Staggered Value Propositions */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
            <SmoothReveal delay={0.06} className="space-y-4">
              <p className="text-sm font-medium text-[#2563EB] tracking-wide">
                About {config.businessName}
              </p>
              <h2 className="font-[family-name:var(--font-jakarta)] text-3xl sm:text-4xl lg:text-[2.65rem] font-bold leading-[1.14] tracking-[-0.02em] text-white text-balance">
                Your Partner in Smarter Marketing.
              </h2>
              <p className="text-base sm:text-lg leading-[1.7] text-[#AAB4C3] max-w-2xl">
                {config.businessName} is presented as a marketing consultancy
                focused on helping businesses explore smarter marketing
                strategies and opportunities for growth.
              </p>
            </SmoothReveal>

            <StaggerContainer
              staggerDelay={0.08}
              className="divide-y divide-white/[0.08] border-y border-white/[0.08]"
            >
              {VALUE_PROPOSITIONS.map((prop) => {
                const Icon = prop.icon;
                return (
                  <StaggerItem key={prop.number} yOffset={14}>
                    <div className="py-5 sm:py-6 flex items-start gap-4 sm:gap-5 group">
                      <div className="w-10 h-10 rounded-lg bg-[#2563EB]/12 border border-[#2563EB]/25 flex items-center justify-center shrink-0 text-[#2563EB] group-hover:bg-[#2563EB] group-hover:text-white transition-colors duration-200">
                        <Icon className="w-5 h-5" aria-hidden="true" />
                      </div>
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2.5">
                          <span className="font-[family-name:var(--font-mono)] text-xs text-[#2563EB] tabular-nums">
                            {prop.number}.
                          </span>
                          <h3 className="font-[family-name:var(--font-jakarta)] text-lg font-semibold text-white">
                            {prop.title}
                          </h3>
                        </div>
                        <p className="text-sm sm:text-base leading-relaxed text-[#AAB4C3]">
                          {prop.description}
                        </p>
                      </div>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
