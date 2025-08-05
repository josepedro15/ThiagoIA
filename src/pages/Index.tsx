import { Hero } from '@/components/sections/Hero';
import { Benefits } from '@/components/sections/Benefits';
import { SocialProofSection } from '@/components/sections/SocialProofSection';
import { Story } from '@/components/sections/Story';
import { Pricing } from '@/components/sections/Pricing';
import { Guarantee } from '@/components/sections/Guarantee';
import { FAQ } from '@/components/sections/FAQ';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { FixedHeader } from '@/components/FixedHeader';
import { SocialProof } from '@/components/SocialProof';

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <FixedHeader />
      <SocialProof />
      
      <main>
        <Hero />
        <Benefits />
        <SocialProofSection />
        <Story />
        <Pricing />
        <Guarantee />
        <FAQ />
        <FinalCTA />
      </main>
      
      <footer className="py-8 px-4 border-t border-border">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>&copy; 2024 ClinicaIA. Todos os direitos reservados.</p>
          <p className="mt-2">
            Política de Privacidade | Termos de Uso | Contato: suporte@clinicaia.com
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
