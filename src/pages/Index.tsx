import { Header } from '@/components/home/Header';
import { HeroSection } from '@/components/home/HeroSection';
import { SocialProof } from '@/components/home/SocialProof';
import { BenefitsSection } from '@/components/home/BenefitsSection';
import { ProblemVsSolution } from '@/components/home/ProblemVsSolution';
import { HowItWorks } from '@/components/home/HowItWorks';
import { ImageBanner } from '@/components/home/ImageBanner';
import { PricingSection } from '@/components/home/PricingSection';
import { FaqSection } from '@/components/home/FaqSection';
import { Footer } from '@/components/home/Footer';

const Index = () => {
  return (
    <div className="font-sans min-h-screen bg-background text-foreground dark">
      <div className="bg-[#f5f6f8] dark:bg-[#101622] text-slate-900 dark:text-slate-100 font-display overflow-x-hidden">
        <div className="relative flex min-h-screen w-full flex-col">
          <Header />
          <HeroSection />
          <SocialProof />
          <BenefitsSection />
          <ProblemVsSolution />
          <HowItWorks />
          <ImageBanner />
          <PricingSection />
          <FaqSection />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Index;

