import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export const FAQ = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = [
    {
      question: "Funciona com meu modelo de equipamento?",
      answer: "Sim! O Técnico Thiago IA tem conhecimento sobre os principais equipamentos médicos: ecocardiógrafos, mamógrafos, densitômetros e ultrassons das principais marcas do mercado."
    },
    {
      question: "Preciso instalar algum aplicativo?",
      answer: "Não. Funciona direto no WhatsApp que você já usa. Basta adicionar nosso número e começar a conversar. Zero instalação, zero complicação."
    },
    {
      question: "O que acontece se a internet cair?",
      answer: "O sistema funciona perfeitamente com conexões básicas. Em caso de queda, suas mensagens ficam salvas e são respondidas assim que a conexão voltar."
    },
    {
      question: "Meus dados estão seguros?",
      answer: "Absolutamente. Usamos criptografia de ponta a ponta do WhatsApp e somos 100% compatíveis com a LGPD. Seus dados técnicos nunca saem do seu controle."
    },
    {
      question: "Posso usar em mais de um equipamento?",
      answer: "Sim! Uma única licença permite suporte para todos os seus equipamentos médicos. Não há limite de aparelhos ou consultas por mês."
    },
    {
      question: "Como solicito reembolso dentro da garantia?",
      answer: "Simples: envie um email para suporte@tecnicothiago.com dentro de 30 dias. Devolvemos 100% do valor em até 7 dias úteis, sem perguntas."
    },
    {
      question: "Receberei atualizações futuras?",
      answer: "Sim! Todas as atualizações, melhorias e novos conhecimentos técnicos são incluídos gratuitamente. Seu acesso é vitalício."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Perguntas <span className="text-primary">frequentes</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Tire suas dúvidas antes de começar a economizar
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-card rounded-lg border border-border overflow-hidden">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
              >
                <h3 className="font-semibold text-card-foreground pr-4">
                  {faq.question}
                </h3>
                {openFAQ === index ? (
                  <ChevronUp className="h-5 w-5 text-primary flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                )}
              </button>
              
              {openFAQ === index && (
                <div className="px-6 pb-4">
                  <p className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center bg-card rounded-lg p-6">
          <h4 className="font-semibold text-card-foreground mb-2">
            Ainda tem dúvidas?
          </h4>
          <p className="text-muted-foreground">
            Entre em contato: <span className="text-primary">suporte@clinicaia.com</span>
          </p>
        </div>
      </div>
    </section>
  );
};