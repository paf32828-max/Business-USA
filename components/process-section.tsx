'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Compass, Layers, Rocket, SlidersHorizontal } from 'lucide-react';
import { APPLE_EASE, SmoothReveal } from './motion/motion-primitives';

const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Discover',
    shortText: 'Understand business objectives and marketing challenges.',
    detail:
      'We examine your business model, target audience, competitive landscape, and current digital footprint to surface high-leverage opportunities.',
    icon: Compass,
  },
  {
    step: '02',
    title: 'Strategize',
    shortText: 'Develop a marketing strategy aligned with business goals.',
    detail:
      'We define clear positioning, prioritize the right channels, and build a practical execution roadmap tied directly to your growth priorities.',
    icon: Layers,
  },
  {
    step: '03',
    title: 'Execute',
    shortText: 'Implement the agreed marketing initiatives.',
    detail:
      'Campaign assets, messaging frameworks, and customer acquisition workflows are launched with clear ownership and structured milestones.',
    icon: Rocket,
  },
  {
    step: '04',
    title: 'Optimize',
    shortText: 'Evaluate performance and identify opportunities for improvement.',
    detail:
      'Ongoing performance reviews highlight what resonates with your audience so campaigns and messaging improve cycle after cycle.',
    icon: SlidersHorizontal,
  },
];

export function ProcessSection() {
  const [activeStep, setActiveStep] = useState(0);
  const current = PROCESS_STEPS[activeStep];

  return (
    <section
      id="process"
      className="relative py-20 sm:py-28 bg-[#080D16] border-t border-white/[0.07]"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <SmoothReveal className="max-w-2xl space-y-3 pb-12 sm:pb-16">
          <p className="text-sm font-medium text-[#2563EB] tracking-wide">
            Our Process
          </p>
          <h2 className="font-[family-name:var(--font-jakarta)] text-3xl sm:text-4xl font-bold leading-[1.15] tracking-[-0.02em] text-white text-balance">
            A Structured Path From Insight to Execution.
          </h2>
          <p className="text-base text-[#AAB4C3] leading-relaxed">
            Four clear phases designed to align strategy, execution, and ongoing
            optimization.
          </p>
        </SmoothReveal>

        {/* Desktop Animated Horizontal Timeline Connector */}
        <div className="relative">
          <div
            aria-hidden="true"
            className="hidden lg:block absolute top-6 left-[12%] right-[12%] h-[2px] bg-white/[0.08]"
          >
            <motion.div
              className="h-full bg-[#2563EB]"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: (activeStep + 1) / PROCESS_STEPS.length }}
              transition={{ duration: 0.4, ease: APPLE_EASE }}
              style={{ transformOrigin: 'left' }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS_STEPS.map((item, idx) => {
              const Icon = item.icon;
              const isActive = idx === activeStep;
              return (
                <SmoothReveal
                  key={item.step}
                  delay={idx * 0.07}
                  yOffset={18}
                  className="flex"
                >
                  <button
                    type="button"
                    onClick={() => setActiveStep(idx)}
                    className={`w-full text-left group relative rounded-2xl p-6 border transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] ${
                      isActive
                        ? 'border-[#2563EB]/65 shadow-[0_0_28px_-10px_rgba(37,99,235,0.45)]'
                        : 'bg-[#071426]/45 border-white/[0.08] hover:border-white/20 hover:bg-[#071426]/75'
                    }`}
                  >
                    {/* Smooth shared-element active surface */}
                    {isActive && (
                      <motion.div
                        layoutId="process-active-bg"
                        transition={{ duration: 0.32, ease: APPLE_EASE }}
                        aria-hidden="true"
                        className="absolute inset-0 rounded-2xl bg-[#071426] -z-10"
                      />
                    )}

                    {/* Step Node */}
                    <div className="flex items-center justify-between mb-6">
                      <div
                        className={`relative z-10 w-12 h-12 rounded-xl flex items-center justify-center border transition-colors duration-200 ${
                          isActive
                            ? 'bg-[#2563EB] border-[#2563EB] text-white'
                            : 'bg-[#080D16] border-white/15 text-[#AAB4C3] group-hover:text-white'
                        }`}
                      >
                        <Icon className="w-5 h-5" aria-hidden="true" />
                      </div>

                      <span
                        className={`font-[family-name:var(--font-mono)] text-sm font-medium tabular-nums ${
                          isActive ? 'text-[#2563EB]' : 'text-[#AAB4C3]'
                        }`}
                      >
                        {item.step}
                      </span>
                    </div>

                    <h3 className="font-[family-name:var(--font-jakarta)] text-xl font-semibold text-white mb-2">
                      {item.step} – {item.title}
                    </h3>

                    <p className="text-sm font-medium text-white/90 mb-2.5 leading-relaxed">
                      {item.shortText}
                    </p>

                    <p className="text-sm text-[#AAB4C3] leading-relaxed">
                      {item.detail}
                    </p>
                  </button>
                </SmoothReveal>
              );
            })}
          </div>
        </div>

        {/* Smooth Animated Phase Focus Strip */}
        <div className="mt-8 rounded-2xl bg-[#071426]/70 border border-white/[0.08] p-5 sm:p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.step}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.24, ease: APPLE_EASE }}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <p className="text-xs font-[family-name:var(--font-mono)] text-[#2563EB]">
                  Active Stage · {current.step} {current.title}
                </p>
                <p className="text-sm sm:text-base text-white font-medium">
                  {current.detail}
                </p>
              </div>
              <span className="text-xs text-[#AAB4C3] whitespace-nowrap shrink-0">
                Select any phase above to inspect
              </span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
