'use client';

import React, { useState } from 'react';
import { MotionConfig, motion } from 'motion/react';
import { BusinessConfigProvider } from './business-config-context';
import { Navbar } from './navbar';
import { HeroSection } from './hero-section';
import { AboutSection } from './about-section';
import { ServicesSection } from './services-section';
import { WhyChooseSection } from './why-choose-section';
import { ProcessSection } from './process-section';
import { ResultsSection } from './results-section';
import { ContactSection } from './contact-section';
import { Footer } from './footer';
import { FloatingWhatsApp } from './floating-whatsapp';
import { OwnerEditorDrawer } from './owner-editor-drawer';
import { APPLE_EASE } from './motion/motion-primitives';

export function ConsultancyLanding() {
  const [selectedService, setSelectedService] = useState(
    'General Marketing Consultation'
  );

  return (
    <MotionConfig reducedMotion="user">
      <BusinessConfigProvider>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45, ease: APPLE_EASE }}
          className="min-h-screen flex flex-col bg-[#080D16] text-white"
        >
          <Navbar />
          <main className="flex-1">
            <HeroSection />
            <AboutSection />
            <ServicesSection onSelectServiceForContact={setSelectedService} />
            <WhyChooseSection />
            <ProcessSection />
            <ResultsSection />
            <ContactSection
              selectedService={selectedService}
              onServiceChange={setSelectedService}
            />
          </main>
          <Footer />
          <FloatingWhatsApp />
          <OwnerEditorDrawer />
        </motion.div>
      </BusinessConfigProvider>
    </MotionConfig>
  );
}
