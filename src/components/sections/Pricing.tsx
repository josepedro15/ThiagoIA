import { Button } from '@/components/ui/button';
import { Timer } from '../Timer';
import { LicenseCounter } from '../LicenseCounter';

export const Pricing = () => {
  const handleCTAClick = () => {
    // Track purchase event
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'Purchase', {
        event_category: 'ecommerce',
        event_label: 'pricing_cta',
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
    window.open('https://pay.kiwify.com.br/ky5ZU3k', '_blank');
  };

  return (
    <section className="py-20 px-4 bg-navy-light/30">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            <span className="text-primary">Tudo</span> o que você recebe
          </h2>
          <p className="text-xl text-muted-foreground">
            Suporte técnico completo para seus equipamentos médicos
          </p>
        </div>

        <div className="bg-card rounded-lg p-8 shadow-lg">
          <LicenseCounter />
          
          <div className="space-y-4 mb-8">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-primary">✅</span>
                <span className="text-card-foreground">Teste completo por 30 dias</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-primary">✅</span>
                <span className="text-card-foreground">Acesso imediato via WhatsApp</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-primary">✅</span>
                <span className="text-card-foreground">Disponível 24 h/7</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-primary">✅</span>
                <span className="text-card-foreground">Especialista em eco, mamógrafo, densitômetro e ultrassom</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-primary">✅</span>
                <span className="text-card-foreground">Respostas em menos de 30 s</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-primary">✅</span>
                <span className="text-card-foreground">Passo a passo detalhado</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-primary">✅</span>
                <span className="text-card-foreground">Dicas de otimização preventiva</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-primary">✅</span>
                <span className="text-card-foreground">Suporte técnico premium</span>
              </div>
            </div>
          </div>

          <div className="text-center mb-8">
            <p className="text-sm text-muted-foreground mb-2">
              <span className="line-through">R$ 297</span>
            </p>
            <div className="text-5xl font-bold text-primary mb-2">R$ 97,80</div>
            <p className="text-muted-foreground">
              <span className="bg-primary/20 px-2 py-1 rounded">
                Menos que uma pizza
              </span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <Button 
              onClick={handleCTAClick}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
            >
              🚀 Quero economizar agora
            </Button>
            
            <Timer className="text-red-500" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm text-muted-foreground">
            <span>🔒 Pagamento seguro</span>
            <span>💳 Cartão ou PIX</span>
            <span>📱 Acesso imediato</span>
            <span>🎯 Sem mensalidades</span>
          </div>
        </div>
      </div>
    </section>
  );
};