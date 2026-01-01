import type { Metadata } from "next";

import CTASection from "@/components/features/landing/cta-section";
import FeaturesGrid from "@/components/features/landing/features-section";
import HeroSection from "@/components/features/landing/hero-section";

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
