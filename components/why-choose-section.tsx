'use client';

import React from 'react';
import { Compass, LineChart, Sparkles, Users } from 'lucide-react';
import { GlowCard, SmoothReveal } from './motion/motion-primitives';

const PILLARS = [
  {
    number: '01',
    title: 'Strategic Approach',
    description:
      'Every engagement starts with structured discovery—understanding your market position, audience behavior, and commercial goals before recommending channels.',
    icon: Compass,
  },
  {
    number: '02',
    title: 'Customer-Focused Thinking',
    description:
      'Campaigns and messaging are built around real buyer questions, decision friction, and clear communication that earns customer trust.',
    icon: Users,
  },
  {
    number: '03',
    title: 'Creative Solutions',
    description:
      'Sharp brand presentation and cohesive visual communication designed to distinguish your business in competitive American markets.',
    icon: Sparkles,
  },
  {
    number: '04',
    title: 'Growth-Oriented Planning',
    description:
      'Practical marketing roadmaps focused on sustainable pipeline building, consistent execution, and continuous refinement.',
    icon: LineChart,
  },
];

export function WhyChooseSection() {
  return (
    <section className="relative py-20 sm:py-28 bg-[#071426] border-t border-white/[0.07]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Intro Column */}
          <SmoothReveal className="lg:col-span-4 space-y-4 lg:sticky lg:top-28">
            <p className="text-sm font-medium text-[#2563EB] tracking-wide">
              Why Choose Business USA
            </p>
            <h2 className="font-[family-name:var(--font-jakarta)] text-3xl sm:text-4xl font-bold leading-[1.15] tracking-[-0.02em] text-white text-balance">
              Marketing That Moves Businesses Forward.
            </h2>
            <p className="text-base text-[#AAB4C3] leading-relaxed">
              Clarity, customer alignment, and disciplined execution form the
              foundation of how we approach every consulting conversation.
            </p>
          </SmoothReveal>

          {/* Right 2x2 Architectural Grid with GlowCards */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {PILLARS.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <SmoothReveal
                  key={pillar.number}
                  delay={idx * 0.07}
                  yOffset={16}
                  className="flex"
                >
                  <GlowCard className="w-full rounded-2xl bg-[#080D16]/75 border border-white/[0.09] hover:border-[#2563EB]/55 p-6 sm:p-7 transition-colors duration-200">
                    <div>
                      <div className="flex items-center justify-between mb-5">
                        <div className="w-11 h-11 rounded-xl bg-[#2563EB]/12 border border-[#2563EB]/25 flex items-center justify-center text-[#2563EB] group-hover:bg-[#2563EB] group-hover:text-white transition-colors duration-200">
                          <Icon className="w-5 h-5" aria-hidden="true" />
                        </div>
                        <span className="font-[family-name:var(--font-mono)] text-xs text-[#AAB4C3] tabular-nums">
                          {pillar.number}
                        </span>
                      </div>

                      <h3 className="font-[family-name:var(--font-jakarta)] text-xl font-semibold text-white mb-2.5">
                        {pillar.title}
                      </h3>
                      <p className="text-sm sm:text-base leading-relaxed text-[#AAB4C3]">
                        {pillar.description}
                      </p>
                    </div>
                  </GlowCard>
                </SmoothReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
