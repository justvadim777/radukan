import { HeroSection } from "@/components/home/HeroSection";
import { StatsSection } from "@/components/home/StatsSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { ApproachSection } from "@/components/home/ApproachSection";
import { CaseStudySection } from "@/components/home/CaseStudySection";
import { CtaSection } from "@/components/home/CtaSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <ApproachSection />
      <CaseStudySection />
      <CtaSection />
    </>
  );
}
