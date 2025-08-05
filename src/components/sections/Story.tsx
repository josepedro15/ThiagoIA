export const Story = () => {
  const painPoints = [
    {
      icon: "💸",
      title: "Equipamento parado = até R$ 3.000/dia de prejuízo"
    },
    {
      icon: "⏰",
      title: "Técnico presencial demora dias"
    },
    {
      icon: "💰",
      title: "Visitas técnicas de R$ 350 - 800 por ocorrência"
    },
    {
      icon: "❓",
      title: "Dúvidas rápidas nunca respondidas"
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Pare de <span className="text-primary">perder dinheiro</span> com equipamentos parados
          </h2>
          <p className="text-xl text-muted-foreground">
            Os maiores problemas que médicos enfrentam com seus aparelhos
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {painPoints.map((pain, index) => (
            <div 
              key={index}
              className="bg-card border border-border rounded-lg p-6 text-center"
            >
              <div className="text-4xl mb-4">{pain.icon}</div>
              <h3 className="text-lg font-semibold text-card-foreground">
                {pain.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};