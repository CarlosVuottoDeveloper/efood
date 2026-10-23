import { PageCanvas, SkipLink } from "@/design-system";
import { AboutSection } from "@/components/landing/AboutSection";
import { EcoRestaurantsSection } from "@/components/landing/EcoRestaurantsSection";
import { HeroSection } from "@/components/landing/HeroSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { PartnerSection } from "@/components/landing/PartnerSection";
import { PollSection } from "@/components/landing/PollSection";

export default function Home() {
  return (
    <>
      <SkipLink />
      <PageCanvas id="top">
        <LandingHeader />
        <main id="main">
          <HeroSection />
          <AboutSection />
          <EcoRestaurantsSection />
          <HowItWorksSection />
          <PollSection />
          <PartnerSection />
        </main>
        <LandingFooter />
      </PageCanvas>
    </>
  );
}
