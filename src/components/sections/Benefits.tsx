export const Benefits = () => {
  const steps = [
    {
      number: "1",
      title: "Envie sua Dúvida no WhatsApp",
      description: "Descreva o problema do seu equipamento: configuração, manutenção, erro no display, barulho estranho... qualquer coisa!"
    },
    {
      number: "2", 
      title: "Thiago IA Responde em Menos de 40 Segundos",
      description: "Nosso especialista virtual analisa seu problema e te dá o diagnóstico instantâneo"
    },
    {
      number: "3",
      title: "Receba o Passo a Passo Detalhado", 
      description: "Instruções claras e simples para resolver o problema na hora, sem precisar chamar técnico"
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Veja Como é <span className="text-primary">Simples Resolver</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Processo rápido e eficiente para resolver seus problemas técnicos
          </p>
        </div>

        <div className="relative">
          {/* Linha vertical conectando os passos */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary/30 hidden md:block"></div>
          
          <div className="space-y-12">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start gap-6 relative">
                {/* Círculo com número */}
                <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl z-10">
                  {step.number}
                </div>
                
                {/* Conteúdo do passo */}
                <div className="flex-1 bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all duration-300">
                  <h3 className="text-xl font-semibold text-primary mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Resultado destacado */}
          <div className="mt-12 bg-primary/10 border border-primary/20 rounded-lg p-8 text-center">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-2xl font-bold text-primary mb-4">
              Resultado: Problema Resolvido em Minutos
            </h3>
            <p className="text-muted-foreground text-lg">
              Sem esperar dias, sem pagar visitas caras, sem cancelar consultas
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};