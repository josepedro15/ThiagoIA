export const Benefits = () => {
  const benefits = [
    {
      icon: "⚡",
      title: "Resposta em < 30 s",
      description: "Suporte instantâneo, 24 h/7"
    },
    {
      icon: "🔧",
      title: "Especialista Multi-equipamento",
      description: "Eco, mamógrafo, densitômetro e ultrassom"
    },
    {
      icon: "📱",
      title: "No WhatsApp que você já usa",
      description: "Sem instalar nada"
    },
    {
      icon: "🎯",
      title: "Troubleshooting Guiado",
      description: "Passo a passo fácil de seguir"
    },
    {
      icon: "🛠️",
      title: "Prevenção & Otimização",
      description: "Dicas para evitar novas falhas"
    },
    {
      icon: "🔒",
      title: "100% Seguro e Sigiloso",
      description: "Dados protegidos por criptografia"
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Transforme falhas em <span className="text-primary">soluções rápidas</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Veja como o Técnico Thiago IA resolve os maiores problemas dos seus equipamentos
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all duration-300"
            >
              <div className="text-4xl mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-semibold text-card-foreground mb-3">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};