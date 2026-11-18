'use client';

import React, { createContext, useContext, useState, useSyncExternalStore } from 'react';
import {
  BusinessConfig,
  DEFAULT_BUSINESS_CONFIG,
  ProposedService,
} from '@/lib/business-config';

const STORAGE_KEY = 'business_usa_editable_config_v1';
const CONFIG_EVENT = 'business_usa_config_changed';

let cachedRaw: string | null = null;
let cachedConfig: BusinessConfig = DEFAULT_BUSINESS_CONFIG;

function subscribeToConfig(callback: () => void): () => void {
  if (typeof window === 'undefined') return () => {};
  const handler = () => callback();
  window.addEventListener('storage', handler);
  window.addEventListener(CONFIG_EVENT, handler);
  return () => {
    window.removeEventListener('storage', handler);
    window.removeEventListener(CONFIG_EVENT, handler);
  };
}

function getConfigSnapshot(): BusinessConfig {
  if (typeof window === 'undefined') return DEFAULT_BUSINESS_CONFIG;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      cachedRaw = null;
      cachedConfig = DEFAULT_BUSINESS_CONFIG;
      return DEFAULT_BUSINESS_CONFIG;
    }
    if (raw === cachedRaw) {
      return cachedConfig;
    }
    const parsed = JSON.parse(raw) as Partial<BusinessConfig>;
    cachedRaw = raw;
    cachedConfig = {
      ...DEFAULT_BUSINESS_CONFIG,
      ...parsed,
      services:
        Array.isArray(parsed.services) && parsed.services.length > 0
          ? parsed.services
          : DEFAULT_BUSINESS_CONFIG.services,
    };
    return cachedConfig;
  } catch {
    return DEFAULT_BUSINESS_CONFIG;
  }
}

function getServerSnapshot(): BusinessConfig {
  return DEFAULT_BUSINESS_CONFIG;
}

interface BusinessConfigContextValue {
  config: BusinessConfig;
  isEditorOpen: boolean;
  openEditor: () => void;
  closeEditor: () => void;
  updateContactInfo: (
    patch: Partial<Omit<BusinessConfig, 'services'>>
  ) => void;
  updateService: (id: string, patch: Partial<ProposedService>) => void;
  resetToDefaults: () => void;
}

const BusinessConfigContext = createContext<BusinessConfigContextValue | null>(
  null
);

export function BusinessConfigProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const config = useSyncExternalStore(
    subscribeToConfig,
    getConfigSnapshot,
    getServerSnapshot
  );
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const persist = (next: BusinessConfig) => {
    try {
      const serialized = JSON.stringify(next);
      cachedRaw = serialized;
      cachedConfig = next;
      window.localStorage.setItem(STORAGE_KEY, serialized);
      window.dispatchEvent(new Event(CONFIG_EVENT));
    } catch {
      // Ignore storage quota issues
    }
  };

  const updateContactInfo = (
    patch: Partial<Omit<BusinessConfig, 'services'>>
  ) => {
    persist({ ...config, ...patch });
  };

  const updateService = (id: string, patch: Partial<ProposedService>) => {
    const nextServices = config.services.map((svc) =>
      svc.id === id ? { ...svc, ...patch } : svc
    );
    persist({ ...config, services: nextServices });
  };

  const resetToDefaults = () => {
    try {
      cachedRaw = null;
      cachedConfig = DEFAULT_BUSINESS_CONFIG;
      window.localStorage.removeItem(STORAGE_KEY);
      window.dispatchEvent(new Event(CONFIG_EVENT));
    } catch {
      // Ignore
    }
  };

  return (
    <BusinessConfigContext.Provider
      value={{
        config,
        isEditorOpen,
        openEditor: () => setIsEditorOpen(true),
        closeEditor: () => setIsEditorOpen(false),
        updateContactInfo,
        updateService,
        resetToDefaults,
      }}
    >
      {children}
    </BusinessConfigContext.Provider>
  );
}

export function useBusinessConfig() {
  const ctx = useContext(BusinessConfigContext);
  if (!ctx) {
    throw new Error(
      'useBusinessConfig must be used inside BusinessConfigProvider'
    );
  }
  return ctx;
}
