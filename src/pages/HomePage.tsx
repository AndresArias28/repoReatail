import { HeroSection } from '../components/sections/HeroSection';
import { BenefitsSection } from '../components/sections/BenefitsSection';
import { StatsSection } from '../components/sections/StatsSection';
import { HowItWorksSection } from '../components/sections/HowItWorksSection';
import { TestimonialsSection } from '../components/sections/TestimonialsSection';
import { CTASection } from '../components/sections/CTASection';

export function HomePage() {
  return (
    <div className="pt-16">
      <HeroSection />
      <BenefitsSection />
      <StatsSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
}
