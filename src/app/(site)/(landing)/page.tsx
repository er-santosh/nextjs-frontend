import type { Metadata } from "next";

import CTASection from "@/features/landing/components/cta-section";
import FeaturesGrid from "@/features/landing/components/features-section";
import HeroSection from "@/features/landing/components/hero-section";

export const metadata: Metadata = {
  title: "Home",
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesGrid />
      <CTASection />
    </>
  );
}
