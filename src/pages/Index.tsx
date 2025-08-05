import { Hero } from '@/components/sections/Hero';
import { Benefits } from '@/components/sections/Benefits';
import { EquipmentSpecialization } from '@/components/sections/EquipmentSpecialization';
import { SocialProofSection } from '@/components/sections/SocialProofSection';
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
        <EquipmentSpecialization />
        <SocialProofSection />
        <Pricing />
        <Guarantee />
        <FAQ />
        <FinalCTA />
      </main>
      
      <footer className="py-8 px-4 border-t border-border">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>&copy; 2024 ThiagoIA. Todos os direitos reservados.</p>
          <p className="mt-2">
            Política de Privacidade | Termos de Uso | Contato: atendesoft@gmail.com
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
