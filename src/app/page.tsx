import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { NetworkEcosystemScroll } from "@/components/landing/NetworkEcosystemScroll";
import { DistributionFeaturesSection } from "@/components/landing/DistributionFeaturesSection";
import { HowToUseSection } from "@/components/landing/HowToUseSection";
import { ValuePropositionSection } from "@/components/landing/ValuePropositionSection";
import { FeaturesBentoSection } from "@/components/landing/FeaturesBentoSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { CtaBanner } from "@/components/landing/CtaBanner";
import { Footer } from "@/components/layout/Footer";
import { BackToTopButton } from "@/components/landing/BackToTopButton";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#FFFFFF] flex flex-col selection:bg-[#A3FF00]/40 selection:text-[#0E3E2B]">
      {/* Top Navigation Bar: 92px height, 196x50 logo, 18px Poppins Regular */}
      <Navbar />

      {/* Unified Hero + Network Ecosystem Scroll Transition */}
      <main className="flex-1">
        <NetworkEcosystemScroll />
        <DistributionFeaturesSection />
        <HowToUseSection />
        <ValuePropositionSection />
        <FeaturesBentoSection />
        <PricingSection />
        <CtaBanner />
      </main>

      {/* Brand Footer */}
      <Footer />
      <BackToTopButton />
    </div>
  );
}
