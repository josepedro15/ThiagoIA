export const Guarantee = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-8 md:p-12 border border-primary/20">
          <div className="text-center">
            <div className="text-6xl mb-6">🛡️</div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Garantia <span className="text-primary">Zero Risco</span> de 30 dias
            </h2>
            
            <div className="max-w-2xl mx-auto space-y-4 text-lg text-muted-foreground mb-8">
              <p>
                <strong className="text-foreground">Estou tão confiante</strong> que o ThiagoIA vai transformar 
                sua clínica que ofereço uma garantia incondicional.
              </p>
              
              <p className="text-xl font-semibold text-primary">
                Teste por 30 dias. Se não economizar o valor investido, 
                devolvemos 100%.
              </p>
              
              <p>
                Sem perguntas. Sem burocracia. Sem pegadinhas.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-card rounded-lg p-6">
                <div className="text-3xl mb-3">⚡</div>
                <h4 className="font-semibold text-card-foreground mb-2">Teste por 30 dias</h4>
                <p className="text-sm text-muted-foreground">
                  Use todas as funcionalidades sem compromisso
                </p>
              </div>
              
              <div className="bg-card rounded-lg p-6">
                <div className="text-3xl mb-3">💰</div>
                <h4 className="font-semibold text-card-foreground mb-2">Não economizou?</h4>
                <p className="text-sm text-muted-foreground">
                  Devolvemos 100% do valor investido
                </p>
              </div>
              
              <div className="bg-card rounded-lg p-6">
                <div className="text-3xl mb-3">🤝</div>
                <h4 className="font-semibold text-card-foreground mb-2">Sem burocracia</h4>
                <p className="text-sm text-muted-foreground">
                  Um email é suficiente para solicitar reembolso
                </p>
              </div>
            </div>

            <div className="bg-card rounded-lg p-6">
              <p className="text-foreground font-semibold">
                "Você não tem nada a perder e milhares de reais para ganhar. 
                O risco é todo meu."
              </p>
              <p className="text-sm text-muted-foreground mt-2">- João Silva, Criador do ThiagoIA</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};