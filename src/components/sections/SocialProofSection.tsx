import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const SocialProofSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Ricardo Moreira",
      role: "Cardiologista",
      clinic: "SP",
      photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=80&h=80&fit=crop&crop=face&auto=format",
      text: "Economizei R$ 2.300 em visitas técnicas e não cancelei 8 consultas.",
      result: "R$ 2.300 economizados"
    },
    {
      name: "Ana Silva",
      role: "Ginecologista", 
      clinic: "RJ",
      photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=80&h=80&fit=crop&crop=face&auto=format",
      text: "Configuração de mamógrafo em 2 min. Melhorou a qualidade das imagens.",
      result: "Problema resolvido em 2 min"
    },
    {
      name: "Carlos Ferreira",
      role: "Radiologista",
      clinic: "BH",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face&auto=format",
      text: "Três problemas resolvidos remotamente. Pagou o serviço no primeiro mês.",
      result: "3 problemas remotos"
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 px-4 bg-navy-light/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            <span className="text-primary">Médicos</span> que já economizaram
          </h2>
          <p className="text-xl text-muted-foreground">
            Veja depoimentos reais de profissionais que resolveram seus problemas
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative bg-card rounded-lg p-8 mb-12 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={prevTestimonial}
              className="text-muted-foreground hover:text-foreground"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            
            <div className="text-center flex-1">
              <div className="flex items-center justify-center gap-4 mb-4">
                <img 
                  src={testimonials[currentTestimonial].photo}
                  alt={testimonials[currentTestimonial].name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="text-left">
                  <h4 className="font-semibold text-card-foreground">
                    {testimonials[currentTestimonial].name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {testimonials[currentTestimonial].role}
                  </p>
                  <p className="text-sm text-primary">
                    {testimonials[currentTestimonial].clinic}
                  </p>
                </div>
              </div>
              
              <blockquote className="text-lg text-card-foreground mb-4 italic">
                "{testimonials[currentTestimonial].text}"
              </blockquote>
              
              <div className="bg-primary/10 rounded-lg p-3 inline-block">
                <span className="text-primary font-semibold">
                  🎯 {testimonials[currentTestimonial].result}
                </span>
              </div>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={nextTestimonial}
              className="text-muted-foreground hover:text-foreground"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>

          <div className="flex justify-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentTestimonial ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Revenue Screenshots */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-card rounded-lg p-6 text-center">
            <div className="text-3xl mb-2">📈</div>
            <h4 className="font-semibold text-card-foreground mb-2">ClearScan Medicina</h4>
            <p className="text-primary font-bold text-xl">+R$ 3.300</p>
            <p className="text-sm text-muted-foreground">em 3 meses</p>
          </div>
          
          <div className="bg-card rounded-lg p-6 text-center">
            <div className="text-3xl mb-2">💰</div>
            <h4 className="font-semibold text-card-foreground mb-2">UltraDiag Center</h4>
            <p className="text-primary font-bold text-xl">+R$ 5.000</p>
            <p className="text-sm text-muted-foreground">em 4 meses</p>
          </div>
          
          <div className="bg-card rounded-lg p-6 text-center">
            <div className="text-3xl mb-2">🚀</div>
            <h4 className="font-semibold text-card-foreground mb-2">VitalImagem Centro Médico</h4>
            <p className="text-primary font-bold text-xl">+R$ 8.500</p>
            <p className="text-sm text-muted-foreground">em 12 meses</p>
          </div>
        </div>

        {/* User Counter */}
        <div className="text-center bg-primary/10 rounded-lg p-6">
          <p className="text-2xl font-bold text-primary mb-2">+1.270</p>
          <p className="text-muted-foreground">
            usuários ativos
          </p>
        </div>
      </div>
    </section>
  );
};