export const EquipmentSpecialization = () => {
  const equipments = [
    {
      icon: "🖥️",
      name: "Ecocardiógrafo",
      services: "Configurações, calibragem, problemas de imagem"
    },
    {
      icon: "💗",
      name: "Mamógrafo", 
      services: "Ajustes, manutenção preventiva, erros do sistema"
    },
    {
      icon: "🦴",
      name: "Densitômetro",
      services: "Calibragem, software, problemas de conectividade"
    },
    {
      icon: "📱",
      name: "Ultrassom",
      services: "Transdutores, configurações, qualidade de imagem"
    }
  ];

  const features = [
    "Disponível 24 Horas",
    "Respostas em Menos de 40s", 
    "Direto no WhatsApp"
  ];

  return (
    <section className="py-20 px-4 bg-navy-light/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Especialista em <span className="text-primary">Todos os Seus Equipamentos</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Suporte técnico especializado para os principais equipamentos médicos
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {equipments.map((equipment, index) => (
            <div 
              key={index}
              className="bg-card border border-border rounded-lg p-6 text-center hover:shadow-lg transition-all duration-300"
            >
              <div className="text-4xl mb-4">{equipment.icon}</div>
              <h3 className="text-lg font-semibold text-card-foreground mb-3">
                {equipment.name}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {equipment.services}
              </p>
            </div>
          ))}
        </div>

        {/* Barra de recursos */}
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="text-primary">✅</span>
                <span className="text-card-foreground font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}; 