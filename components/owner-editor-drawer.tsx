'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Check, Copy, RotateCcw, X } from 'lucide-react';
import { useBusinessConfig } from './business-config-context';

export function OwnerEditorDrawer() {
  const {
    config,
    isEditorOpen,
    closeEditor,
    updateContactInfo,
    updateService,
    resetToDefaults,
  } = useBusinessConfig();
  const [copied, setCopied] = useState(false);

  const handleCopyConfig = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(config, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard fallback ignored
    }
  };

  return (
    <AnimatePresence>
      {isEditorOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex justify-end bg-[#080D16]/75 backdrop-blur-sm"
          onClick={closeEditor}
        >
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Owner Contact and Services Editor"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl h-full bg-[#071426] border-l border-white/[0.12] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-white/[0.08] flex items-center justify-between gap-4">
              <div>
                <h2 className="font-[family-name:var(--font-jakarta)] text-lg font-bold text-white">
                  Owner Content Editor
                </h2>
                <p className="text-xs text-[#AAB4C3]">
                  Customize contact info and confirm proposed services before
                  publication.
                </p>
              </div>
              <button
                type="button"
                onClick={closeEditor}
                aria-label="Close editor"
                className="w-10 h-10 rounded-lg border border-white/10 flex items-center justify-center text-[#AAB4C3] hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            {/* Scrollable Form Body */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8">
              {/* Contact Information Section */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-white">
                  Business &amp; Contact Information
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="space-y-1.5 text-xs text-[#AAB4C3]">
                    <span>Business Name</span>
                    <input
                      type="text"
                      value={config.businessName}
                      onChange={(e) =>
                        updateContactInfo({ businessName: e.target.value })
                      }
                      className="w-full rounded-lg bg-[#080D16] border border-white/12 px-3 py-2 text-sm text-white focus:border-[#2563EB] outline-none"
                    />
                  </label>

                  <label className="space-y-1.5 text-xs text-[#AAB4C3]">
                    <span>Category</span>
                    <input
                      type="text"
                      value={config.category}
                      onChange={(e) =>
                        updateContactInfo({ category: e.target.value })
                      }
                      className="w-full rounded-lg bg-[#080D16] border border-white/12 px-3 py-2 text-sm text-white focus:border-[#2563EB] outline-none"
                    />
                  </label>

                  <label className="space-y-1.5 text-xs text-[#AAB4C3]">
                    <span>Display Phone</span>
                    <input
                      type="text"
                      value={config.phoneDisplay}
                      onChange={(e) =>
                        updateContactInfo({
                          phoneDisplay: e.target.value,
                          phoneHref: e.target.value.replace(/[^\d+]/g, ''),
                        })
                      }
                      className="w-full rounded-lg bg-[#080D16] border border-white/12 px-3 py-2 text-sm text-white focus:border-[#2563EB] outline-none"
                    />
                  </label>

                  <label className="space-y-1.5 text-xs text-[#AAB4C3]">
                    <span>WhatsApp Number (Digits)</span>
                    <input
                      type="text"
                      value={config.whatsappDigits}
                      onChange={(e) =>
                        updateContactInfo({
                          whatsappDigits: e.target.value.replace(/\D/g, ''),
                        })
                      }
                      className="w-full rounded-lg bg-[#080D16] border border-white/12 px-3 py-2 text-sm text-white focus:border-[#2563EB] outline-none"
                    />
                  </label>

                  <label className="space-y-1.5 text-xs text-[#AAB4C3]">
                    <span>Business Hours</span>
                    <input
                      type="text"
                      value={config.hours}
                      onChange={(e) =>
                        updateContactInfo({ hours: e.target.value })
                      }
                      className="w-full rounded-lg bg-[#080D16] border border-white/12 px-3 py-2 text-sm text-white focus:border-[#2563EB] outline-none"
                    />
                  </label>

                  <label className="space-y-1.5 text-xs text-[#AAB4C3]">
                    <span>Optional Email</span>
                    <input
                      type="email"
                      placeholder="Add business email (optional)"
                      value={config.email}
                      onChange={(e) =>
                        updateContactInfo({ email: e.target.value })
                      }
                      className="w-full rounded-lg bg-[#080D16] border border-white/12 px-3 py-2 text-sm text-white placeholder:text-[#AAB4C3]/40 focus:border-[#2563EB] outline-none"
                    />
                  </label>
                </div>

                <label className="block space-y-1.5 text-xs text-[#AAB4C3]">
                  <span>Pre-filled WhatsApp Message</span>
                  <textarea
                    rows={2}
                    value={config.whatsappMessage}
                    onChange={(e) =>
                      updateContactInfo({ whatsappMessage: e.target.value })
                    }
                    className="w-full rounded-lg bg-[#080D16] border border-white/12 px-3 py-2 text-sm text-white focus:border-[#2563EB] outline-none resize-y"
                  />
                </label>
              </div>

              {/* Proposed Services Confirmation & Editing */}
              <div className="space-y-4 pt-6 border-t border-white/[0.08]">
                <h3 className="text-sm font-semibold text-white">
                  Proposed Services (Confirm or Edit)
                </h3>

                <div className="space-y-4">
                  {config.services.map((svc) => (
                    <div
                      key={svc.id}
                      className="rounded-xl bg-[#080D16] border border-white/[0.09] p-4 space-y-3"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="font-[family-name:var(--font-mono)] text-xs text-[#2563EB]">
                          {svc.index}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateService(svc.id, { confirmed: !svc.confirmed })
                          }
                          className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                            svc.confirmed
                              ? 'bg-[#2563EB] text-white'
                              : 'bg-white/[0.06] text-[#AAB4C3] hover:text-white'
                          }`}
                        >
                          {svc.confirmed ? 'Confirmed' : 'Mark Confirmed'}
                        </button>
                      </div>

                      <input
                        type="text"
                        aria-label={`Service ${svc.index} title`}
                        value={svc.title}
                        onChange={(e) =>
                          updateService(svc.id, { title: e.target.value })
                        }
                        className="w-full rounded-lg bg-[#071426] border border-white/10 px-3 py-2 text-sm font-semibold text-white focus:border-[#2563EB] outline-none"
                      />

                      <textarea
                        rows={2}
                        aria-label={`Service ${svc.index} description`}
                        value={svc.shortDescription}
                        onChange={(e) =>
                          updateService(svc.id, {
                            shortDescription: e.target.value,
                          })
                        }
                        className="w-full rounded-lg bg-[#071426] border border-white/10 px-3 py-2 text-xs text-[#AAB4C3] focus:border-[#2563EB] outline-none resize-y"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="px-6 py-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3 bg-[#080D16]/70">
              <button
                type="button"
                onClick={resetToDefaults}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-[#AAB4C3] hover:text-white border border-white/10 rounded-lg transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Reset Defaults</span>
              </button>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={handleCopyConfig}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-white bg-white/[0.08] hover:bg-white/[0.14] rounded-lg transition-colors cursor-pointer"
                >
                  {copied ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  <span>{copied ? 'Copied JSON' : 'Copy Config JSON'}</span>
                </button>

                <button
                  type="button"
                  onClick={closeEditor}
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
