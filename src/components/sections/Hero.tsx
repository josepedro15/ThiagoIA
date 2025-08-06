import { Button } from '@/components/ui/button';
import { Timer } from '../Timer';

export const Hero = () => {
  const handleCTAClick = () => {
    // Track lead event
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'Lead', {
        event_category: 'engagement',
        event_label: 'hero_cta'
      });
    }
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Lead');
    }
    
    // Redirect to Kiwify checkout
            window.open('https://pay.kiwify.com.br/cepxNYP', '_blank');
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-dark via-background to-navy-light opacity-90"></div>
      
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
          Economize mais de <span className="text-primary">R$2000 em Manutenção</span> de Equipamentos Médicos
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
          Especialista em Ecocardiógrafos, Mamógrafos, Densitometria Óssea e ultrassom. 
          <br className="hidden md:block" />
          Disponível 24h por uma fração do custo!
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <Button 
            onClick={handleCTAClick}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            🚀 Quero economizar agora
          </Button>
          
          <div className="flex items-center gap-2">
            <Timer className="text-red-500" />
            <span className="text-sm text-muted-foreground">Oferta limitada</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            ✅ Sem setup complexo
          </span>
          <span className="flex items-center gap-1">
            ✅ Resultados em 24h
          </span>
          <span className="flex items-center gap-1">
            ✅ Suporte incluído
          </span>
        </div>
      </div>
    </section>
  );
};