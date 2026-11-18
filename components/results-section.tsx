'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Activity, Eye, Target, Users } from 'lucide-react';
import { APPLE_EASE, SmoothReveal } from './motion/motion-primitives';

type ModelHorizon = '6m' | '12m';

interface SampleMetric {
  label: string;
  sampleValue: string;
  caption: string;
  barHeights: number[];
  icon: React.ComponentType<{ className?: string }>;
}

const SAMPLE_MODELS: Record<
  ModelHorizon,
  {
    subtitle: string;
    curvePoints: string;
    areaPoints: string;
    labels: string[];
    metrics: SampleMetric[];
  }
> = {
  '6m': {
    subtitle: 'Illustrative 6-Month Sample Curve (Demonstration Only)',
    curvePoints: '0,145 95,128 190,112 285,90 380,68 475,44 570,28',
    areaPoints:
      '0,145 95,128 190,112 285,90 380,68 475,44 570,28 570,175 0,175',
    labels: ['M1', 'M2', 'M3', 'M4', 'M5', 'M6'],
    metrics: [
      {
        label: 'Audience Growth',
        sampleValue: 'Sample Index 1.4x',
        caption: 'Illustrative audience expansion trajectory across core channels.',
        barHeights: [30, 42, 52, 66, 78, 92],
        icon: Users,
      },
      {
        label: 'Marketing Reach',
        sampleValue: 'Sample Index 1.8x',
        caption: 'Illustrative multi-channel visibility build over campaign cycles.',
        barHeights: [28, 38, 56, 68, 82, 95],
        icon: Eye,
      },
      {
        label: 'Engagement',
        sampleValue: 'Sample Index 1.6x',
        caption: 'Illustrative interaction depth from refined content pillars.',
        barHeights: [35, 44, 58, 64, 76, 88],
        icon: Activity,
      },
      {
        label: 'Lead Generation',
        sampleValue: 'Sample Index 1.5x',
        caption: 'Illustrative inbound inquiry volume through conversion optimization.',
        barHeights: [25, 36, 48, 62, 74, 90],
        icon: Target,
      },
    ],
  },
  '12m': {
    subtitle: 'Illustrative 12-Month Sample Curve (Demonstration Only)',
    curvePoints: '0,152 95,134 190,104 285,82 380,54 475,32 570,16',
    areaPoints:
      '0,152 95,134 190,104 285,82 380,54 475,32 570,16 570,175 0,175',
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    metrics: [
      {
        label: 'Audience Growth',
        sampleValue: 'Sample Index 2.1x',
        caption: 'Illustrative full-year compounding brand awareness model.',
        barHeights: [26, 46, 68, 96],
        icon: Users,
      },
      {
        label: 'Marketing Reach',
        sampleValue: 'Sample Index 2.4x',
        caption: 'Illustrative broader market penetration across target segments.',
        barHeights: [24, 52, 74, 98],
        icon: Eye,
      },
      {
        label: 'Engagement',
        sampleValue: 'Sample Index 1.9x',
        caption: 'Illustrative sustained interaction across recurring campaigns.',
        barHeights: [32, 50, 72, 92],
        icon: Activity,
      },
      {
        label: 'Lead Generation',
        sampleValue: 'Sample Index 2.2x',
        caption: 'Illustrative qualified pipeline expansion through iterative testing.',
        barHeights: [22, 44, 70, 94],
        icon: Target,
      },
    ],
  },
};

export function ResultsSection() {
  const [horizon, setHorizon] = useState<ModelHorizon>('6m');
  const current = SAMPLE_MODELS[horizon];

  return (
    <section
      id="results"
      className="relative py-20 sm:py-28 bg-[#071426] border-t border-white/[0.07]"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 space-y-10">
        {/* Header + Smooth Animated Tab Switcher */}
        <SmoothReveal className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <p className="text-sm font-medium text-[#2563EB] tracking-wide">
              Performance Visibility · Illustrative Sample Model
            </p>
            <h2 className="font-[family-name:var(--font-jakarta)] text-3xl sm:text-4xl font-bold leading-[1.15] tracking-[-0.02em] text-white text-balance">
              Built Around Clear Performance Indicators.
            </h2>
            <p className="text-base text-[#AAB4C3] leading-relaxed">
              Interactive dashboard illustration showing how audience growth,
              marketing reach, engagement, and lead generation are structured and
              monitored. Figures shown are illustrative sample data only.
            </p>
          </div>

          <div
            role="group"
            aria-label="Select illustrative timeframe model"
            className="inline-flex items-center p-1 rounded-xl bg-[#080D16] border border-white/[0.1] self-start lg:self-end"
          >
            {(['6m', '12m'] as const).map((tabKey) => {
              const active = horizon === tabKey;
              return (
                <button
                  key={tabKey}
                  type="button"
                  onClick={() => setHorizon(tabKey)}
                  className={`relative px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                    active ? 'text-white' : 'text-[#AAB4C3] hover:text-white'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="horizon-tab-pill"
                      transition={{ duration: 0.26, ease: APPLE_EASE }}
                      className="absolute inset-0 rounded-lg bg-[#2563EB]"
                      aria-hidden="true"
                    />
                  )}
                  <span className="relative z-10">
                    {tabKey === '6m' ? '6-Month Sample' : '12-Month Sample'}
                  </span>
                </button>
              );
            })}
          </div>
        </SmoothReveal>

        {/* Main Illustrative Dashboard Frame */}
        <SmoothReveal
          delay={0.08}
          className="rounded-2xl bg-[#080D16] border border-white/[0.1] p-5 sm:p-8 space-y-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-white/[0.08]">
            <div>
              <h3 className="font-[family-name:var(--font-jakarta)] text-lg font-semibold text-white">
                Marketing Growth Visualization
              </h3>
              <AnimatePresence mode="wait">
                <motion.p
                  key={horizon}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2, ease: APPLE_EASE }}
                  className="text-xs sm:text-sm text-[#AAB4C3]"
                >
                  {current.subtitle}
                </motion.p>
              </AnimatePresence>
            </div>
            <span className="text-xs font-[family-name:var(--font-mono)] text-[#AAB4C3]">
              Sample Data Only · Not Historical Client Results
            </span>
          </div>

          {/* 4 Core KPI Illustration Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {current.metrics.map((metric, idx) => {
              const Icon = metric.icon;
              return (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.45,
                    delay: idx * 0.06,
                    ease: APPLE_EASE,
                  }}
                  className="rounded-xl bg-[#071426]/90 border border-white/[0.08] p-5 flex flex-col justify-between space-y-5 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.015] hover:border-[#2563EB]/45"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-[#AAB4C3]">
                        {metric.label}
                      </span>
                      <Icon
                        className="w-4 h-4 text-[#2563EB]"
                        aria-hidden="true"
                      />
                    </div>
                    <p className="font-[family-name:var(--font-mono)] text-base sm:text-lg font-semibold text-white tabular-nums">
                      {metric.sampleValue}
                    </p>
                  </div>

                  {/* Animated Mini Bar Chart (transform scaleY only) */}
                  <div className="space-y-2.5">
                    <div
                      aria-hidden="true"
                      className="h-14 flex items-end gap-1.5"
                    >
                      {metric.barHeights.map((height, bIdx) => (
                        <motion.div
                          key={`${horizon}-${bIdx}`}
                          initial={{ scaleY: 0.15 }}
                          animate={{ scaleY: 1 }}
                          transition={{
                            duration: 0.45,
                            delay: bIdx * 0.05,
                            ease: APPLE_EASE,
                          }}
                          style={{
                            height: `${height}%`,
                            transformOrigin: 'bottom',
                          }}
                          className={`flex-1 rounded-t-sm ${
                            bIdx === metric.barHeights.length - 1
                              ? 'bg-[#2563EB]'
                              : 'bg-[#2563EB]/30'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-[#AAB4C3] leading-relaxed">
                      {metric.caption}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Wide Illustrative Trajectory Curve */}
          <div className="rounded-xl bg-[#071426]/65 border border-white/[0.08] p-5 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <span className="text-sm font-medium text-white">
                Combined Reach &amp; Inquiry Trajectory (Illustrative Sample)
              </span>
              <div className="flex items-center gap-4 text-xs text-[#AAB4C3]">
                {current.labels.map((lbl) => (
                  <span
                    key={lbl}
                    className="font-[family-name:var(--font-mono)] tabular-nums"
                  >
                    {lbl}
                  </span>
                ))}
              </div>
            </div>

            <div className="w-full h-44 sm:h-52 relative">
              <svg
                viewBox="0 0 570 175"
                preserveAspectRatio="none"
                className="w-full h-full overflow-visible"
                role="img"
                aria-label="Illustrative sample growth curve demonstrating marketing performance tracking"
              >
                <defs>
                  <linearGradient
                    id="sampleGrowthFill"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#2563EB" stopOpacity="0.38" />
                    <stop offset="100%" stopColor="#2563EB" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {[35, 75, 115, 155].map((y) => (
                  <line
                    key={y}
                    x1="0"
                    y1={y}
                    x2="570"
                    y2={y}
                    stroke="rgba(255,255,255,0.06)"
                    strokeWidth="1"
                  />
                ))}

                <motion.polygon
                  key={`area-${horizon}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.45 }}
                  points={current.areaPoints}
                  fill="url(#sampleGrowthFill)"
                />

                <motion.polyline
                  key={`line-${horizon}`}
                  initial={{ pathLength: 0, opacity: 0.5 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.75, ease: APPLE_EASE }}
                  fill="none"
                  stroke="#2563EB"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points={current.curvePoints}
                />
              </svg>
            </div>
          </div>
        </SmoothReveal>
      </div>
    </section>
  );
}
