import { Button } from '@/components/ui/button';
import { Timer } from '../Timer';

export const FinalCTA = () => {
  const handleCTAClick = () => {
    // Track final CTA click
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'Purchase', {
        event_category: 'ecommerce',
        event_label: 'final_cta',
        value: 97.80,
        currency: 'BRL'
      });
    }
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Purchase', {
        value: 97.80,
        currency: 'BRL'
      });
    }
    
    // Redirect to Kiwify checkout
            window.open('https://pay.kiwify.com.br/cepxNYP', '_blank');
  };

  return (
    <section className="py-20 px-4 bg-navy-light/30">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-card rounded-lg p-8 md:p-12 text-center shadow-lg">
          <h2 className="text-3xl md:text-4xl font-bold text-card-foreground mb-6">
            Não deixe seus equipamentos <span className="text-primary">perder mais dinheiro</span>
          </h2>
          
          <div className="max-w-2xl mx-auto space-y-4 text-lg text-muted-foreground mb-8">
            <p>
              Enquanto você está lendo isso, outros médicos já estão 
              <strong className="text-card-foreground"> resolvendo problemas técnicos</strong> e 
              <strong className="text-card-foreground"> economizando em visitas</strong>.
            </p>
            
            <p>
              <span className="text-primary font-semibold">Não fique para trás.</span> 
              Comece hoje e veja resultados em minutos.
            </p>
          </div>

          <div className="bg-primary/10 rounded-lg p-6 mb-8">
            <div className="text-2xl font-bold text-primary mb-2">R$ 97,80</div>
            <p className="text-card-foreground mb-4">
              Investimento único • Sem mensalidades • Acesso vitalício
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                onClick={handleCTAClick}
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                🚀 Quero economizar agora
              </Button>
              
              <Timer className="text-red-500" />
            </div>
          </div>

          <div className="space-y-2 text-sm text-muted-foreground">
            <p>✅ Configuração em 15 minutos</p>
            <p>✅ Garantia de 30 dias</p>
            <p>✅ Suporte prioritário incluído</p>
            <p>✅ Resultados comprovados</p>
          </div>
        </div>
      </div>
    </section>
  );
};